import { NextResponse } from "next/server";
import { checkCredentials, expectedToken, ADMIN_COOKIE } from "@/lib/adminAuth";

export const runtime = "nodejs";

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
  if (
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
