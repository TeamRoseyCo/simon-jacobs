import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TARGET = "simon@jacobs-taxes.com";

// Lead notifications go out via Resend (branded sender on srjinternational.co.uk),
// with the FormSubmit relay as an automatic fallback so a submission never fails
// just because Resend's domain isn't verified yet (or the key is missing).
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const FROM = "SRJ International <noreply@srjinternational.co.uk>";

async function notify(payload: Record<string, unknown>, replyTo: string) {
  const subject = String(payload._subject ?? "New enquiry from the website");
  const body = Object.entries(payload)
    .filter(([k, v]) => !k.startsWith("_") && v !== "" && v != null)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  if (resend) {
    try {
      const { error } = await resend.emails.send({
        from: FROM,
        to: TARGET,
        replyTo,
        subject,
        text: body,
      });
      if (!error) return true;
    } catch {
      // fall through to the FormSubmit relay below
    }
  }

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${TARGET}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Persist a lead to Supabase if it's configured. Never throws: storage is a
// bonus on top of the email relay, so a DB hiccup must not break submissions.
async function storeLead(row: Record<string, unknown>) {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return;
    await supabase.from("leads").insert(row);
  } catch {
    // swallow, the email relay is the source of truth
  }
}

// Handles both the contact form and the email-capture. Re-validates everything
// server-side (never trusts the client) and relays to Simon's inbox via
// FormSubmit (no API key needed; first delivery requires a one-time confirm).
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const kind =
    body._kind === "subscribe"
      ? "subscribe"
      : body._kind === "scorecard"
        ? "scorecard"
        : "contact";
  const email = String(body.email ?? "").trim();

  if (!EMAIL.test(email)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 422 },
    );
  }

  if (kind === "contact") {
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const question = String(body.question ?? "").trim();
    if (!firstName || !lastName || !question) {
      return NextResponse.json(
        { error: "Please complete the required fields." },
        { status: 422 },
      );
    }
  }

  if (kind === "scorecard" && !String(body.name ?? "").trim()) {
    return NextResponse.json(
      { error: "Please add your name." },
      { status: 422 },
    );
  }

  let payload: Record<string, unknown>;
  let lead: Record<string, unknown>;
  if (kind === "subscribe") {
    payload = {
      _subject: "New consult / scorecard signup",
      source: "Email capture",
      email,
    };
    lead = { source: "subscribe", email };
  } else if (kind === "scorecard") {
    const breakdown = Array.isArray(body.breakdown)
      ? (body.breakdown as Array<Record<string, unknown>>)
      : [];
    const results = breakdown
      .map(
        (b) =>
          `${String(b.area)}: ${String(b.score)}/${String(b.max)} (${String(b.rating)})`,
      )
      .join("\n");
    payload = {
      _subject: `New Profit-Rich Scorecard, ${String(body.name)} (${String(body.total)}/${String(body.max)}, ${String(body.rating)})`,
      name: String(body.name),
      email,
      total: `${String(body.total)}/${String(body.max)}, ${String(body.rating)}`,
      results,
    };
    lead = {
      source: "scorecard",
      name: String(body.name),
      email,
      score: `${String(body.total)}/${String(body.max)}, ${String(body.rating)}`,
      message: results,
    };
  } else {
    const fullName =
      `${String(body.firstName ?? "")} ${String(body.lastName ?? "")}`.trim();
    const qualified = body.qualified === true;
    const turnover = String(body.turnover ?? "");
    const role = String(body.role ?? "");
    const intent = String(body.intent ?? "");
    payload = {
      _subject: `${qualified ? "QUALIFIED" : "Lead"} — agency question from ${fullName}`.trim(),
      name: fullName,
      email,
      phone: String(body.phone ?? ""),
      website: String(body.website ?? ""),
      turnover,
      role,
      intent,
      qualified: qualified ? "Yes" : "No",
      question: String(body.question ?? ""),
    };
    lead = {
      source: "contact",
      name: fullName,
      email,
      phone: String(body.phone ?? "") || null,
      website: String(body.website ?? "") || null,
      turnover: turnover || null,
      role: role || null,
      intent: intent || null,
      qualified,
      message: String(body.question ?? ""),
    };
  }

  await storeLead(lead);

  const sent = await notify(payload, email);
  if (sent) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.json(
    {
      error:
        "Could not send right now. Please email simon@jacobs-taxes.com directly.",
    },
    { status: 502 },
  );
}
