import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { verifyUnsubscribeToken } from "@/lib/unsubscribe";

async function suppress(email: string) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;
  await supabase
    .from("suppressed_emails")
    .upsert({ email: email.toLowerCase(), reason: "unsubscribe" }, { onConflict: "email" });
}

function invalid() {
  return new NextResponse("Invalid or expired unsubscribe link.", { status: 400 });
}

// One-click unsubscribe (RFC 8058): mailbox providers POST here directly with
// no page load. Kept token-verified so it can't be used to suppress anyone
// else's address.
export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";
  if (!email || !verifyUnsubscribeToken(email, token)) return invalid();
  await suppress(email);
  return new NextResponse("OK", { status: 200 });
}

// Clicking the link in the email body itself.
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email") ?? "";
  const token = searchParams.get("token") ?? "";
  if (!email || !verifyUnsubscribeToken(email, token)) return invalid();
  await suppress(email);
  return new NextResponse(
    `<!doctype html><meta charset="utf-8"><title>Unsubscribed</title>` +
      `<body style="font-family:sans-serif;max-width:32rem;margin:4rem auto;text-align:center;color:#08131F">` +
      `<h1 style="font-size:1.4rem">You're unsubscribed</h1>` +
      `<p>${email} won't receive any more follow-up emails.</p></body>`,
    { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}
