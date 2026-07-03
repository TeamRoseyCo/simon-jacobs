import { NextResponse } from "next/server";
import { checkCredentials, expectedToken, ADMIN_COOKIE } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  const { username, password } = await request
    .json()
    .catch(() => ({ username: "", password: "" }));

  if (!process.env.ADMIN_USERNAME || !process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin login is not configured." },
      { status: 503 },
    );
  }

  const ip = clientIp(request);
  const supabase = getSupabaseAdmin();

  // Lockout is a bonus safety net on top of the credential check, not a
  // dependency: if Supabase is unavailable, login just behaves as before
  // (no lockout) rather than failing closed.
  if (supabase) {
    const { data: row } = await supabase
      .from("login_attempts")
      .select("fail_count, locked_until")
      .eq("ip", ip)
      .maybeSingle();

    if (row?.locked_until && new Date(row.locked_until).getTime() > Date.now()) {
      const minsLeft = Math.ceil((new Date(row.locked_until).getTime() - Date.now()) / 60000);
      return NextResponse.json(
        { error: `Too many failed attempts. Try again in ${minsLeft} minute${minsLeft === 1 ? "" : "s"}.` },
        { status: 429 },
      );
    }

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !checkCredentials(username, password)
    ) {
      const failCount = (row?.fail_count ?? 0) + 1;
      const lockedUntil =
        failCount >= MAX_ATTEMPTS ? new Date(Date.now() + LOCKOUT_MS).toISOString() : null;
      await supabase
        .from("login_attempts")
        .upsert({ ip, fail_count: lockedUntil ? 0 : failCount, locked_until: lockedUntil, updated_at: new Date().toISOString() });
      return NextResponse.json(
        { error: "Incorrect username or password." },
        { status: 401 },
      );
    }

    // Success: clear any prior failures for this IP.
    await supabase.from("login_attempts").delete().eq("ip", ip);
  } else if (
    typeof username !== "string" ||
    typeof password !== "string" ||
    !checkCredentials(username, password)
  ) {
    return NextResponse.json(
      { error: "Incorrect username or password." },
      { status: 401 },
    );
  }

  const token = expectedToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token ?? "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12h
  });
  return res;
}
