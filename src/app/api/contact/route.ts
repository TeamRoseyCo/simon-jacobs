import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TARGET = "simon@jacobs-taxes.com";

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
    payload = {
      _subject: `Agency question from ${fullName}`.trim(),
      name: fullName,
      email,
      phone: String(body.phone ?? ""),
      website: String(body.website ?? ""),
      question: String(body.question ?? ""),
    };
    lead = {
      source: "contact",
      name: fullName,
      email,
      phone: String(body.phone ?? "") || null,
      website: String(body.website ?? "") || null,
      message: String(body.question ?? ""),
    };
  }

  await storeLead(lead);

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${TARGET}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "Could not send right now. Please email simon@jacobs-taxes.com directly.",
      },
      { status: 502 },
    );
  }
}
