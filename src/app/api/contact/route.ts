import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { site } from "@/lib/content";
import { unsubscribeUrl } from "@/lib/unsubscribe";
import { callEmail1, scorecardEmail1 } from "@/lib/emailTemplates";
import { looksLikeBot, looksLikeGibberishName } from "@/lib/spam";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TARGET = "simon@srjinternational.co.uk";
const CC = "hazem.dweik@elevateoco.com";
const RESOURCE_LINK = `${site.url}/blog/dont-use-claude-for-taxes`;
const DAY_MS = 24 * 60 * 60 * 1000;

// Lead notifications go out via Resend (branded sender on srjinternational.co.uk),
// with the FormSubmit relay as an automatic fallback so a submission never fails
// just because Resend's domain isn't verified yet (or the key is missing).
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const FROM = "SRJ International <simon@srjinternational.co.uk>";

async function notify(payload: Record<string, unknown>, replyTo: string) {
  const subject = String(payload._subject ?? "New enquiry from the website");
  const body =
    Object.entries(payload)
      .filter(([k, v]) => !k.startsWith("_") && v !== "" && v != null)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n") + `\n\n---\nSee every lead anytime: ${site.url}/admin`;

  if (resend) {
    try {
      const { error } = await resend.emails.send({
        from: FROM,
        to: [TARGET, CC],
        replyTo,
        subject,
        text: body,
      });
      if (!error) return true;
      // Log the reason. A dead or rotated API key and an unverified sending
      // domain both surface here, and both are invisible without this line.
      console.error("[notify] resend rejected the send:", error.message);
    } catch (err) {
      console.error(
        "[notify] resend threw:",
        err instanceof Error ? err.message : err,
      );
    }
  } else {
    console.error("[notify] RESEND_API_KEY is not set");
  }

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${TARGET}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...payload, _cc: CC }),
    });
    // FormSubmit answers HTTP 200 even when it refuses to deliver (an
    // unactivated address, or a server-to-server call with no browser
    // Referer, both come back as 200 with success:"false"). Trusting res.ok
    // alone reports a delivered email that never left, so check the body.
    const data = (await res.json().catch(() => null)) as {
      success?: string;
      message?: string;
    } | null;
    const delivered = res.ok && String(data?.success) === "true";
    if (!delivered) {
      console.error(
        `[notify] formsubmit relay failed (HTTP ${res.status}):`,
        data?.message ?? "no message",
      );
    }
    return delivered;
  } catch (err) {
    console.error(
      "[notify] formsubmit relay threw:",
      err instanceof Error ? err.message : err,
    );
    return false;
  }
}

// Persist a lead to Supabase if it's configured. Never throws: storage is a
// bonus on top of the email relay, so a DB hiccup must not break submissions.
// Returns the new row's id (for queuing follow-ups) or null on any failure.
async function storeLead(row: Record<string, unknown>): Promise<string | null> {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return null;
    const { data, error } = await supabase.from("leads").insert(row).select("id").single();
    if (error) return null;
    return (data?.id as string) ?? null;
  } catch {
    return null;
  }
}

// Kicks off the lead-facing welcome sequence (see docs/email-sequences.md):
// Email 1 sends synchronously here; Emails 2 and 3 are queued for the cron
// job at /api/cron/send-sequence to pick up later. Only "call" (qualified
// contact-form) and "scorecard" tracks have approved copy — unqualified
// contact submissions and newsletter signups get no sequence yet (gap, see
// docs/email-copy.md).
async function startSequence(opts: {
  leadId: string | null;
  track: "call" | "scorecard";
  email: string;
  firstName: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  const supabase = getSupabaseAdmin();
  if (!resendKey) return;

  if (supabase) {
    const { data: suppressed } = await supabase
      .from("suppressed_emails")
      .select("email")
      .eq("email", opts.email.toLowerCase())
      .maybeSingle();
    if (suppressed) return;
  }

  const unsubLink = unsubscribeUrl(site.url, opts.email);
  const resend = new Resend(resendKey);
  const { subject, text } =
    opts.track === "scorecard"
      ? scorecardEmail1({ firstName: opts.firstName, resourceLink: RESOURCE_LINK, unsubLink })
      : callEmail1({ firstName: opts.firstName, unsubLink });

  try {
    await resend.emails.send({
      from: FROM,
      to: opts.email,
      replyTo: TARGET,
      subject,
      text,
      headers: {
        "List-Unsubscribe": `<mailto:${TARGET}?subject=unsubscribe>, <${unsubLink}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
  } catch {
    // Email 1 failing shouldn't block the rest of the request; the internal
    // notify() above already alerted the team about this lead regardless.
    return;
  }

  if (!supabase) {
    console.error("[sequence] no supabase client, skipping enqueue");
    return;
  }
  const now = Date.now();
  const step2Delay = opts.track === "scorecard" ? 5 * DAY_MS : 2 * DAY_MS;
  const step2At = new Date(now + step2Delay).toISOString();
  const step3At = new Date(now + step2Delay + 2 * DAY_MS).toISOString();
  const { error: queueError } = await supabase.from("email_queue").insert([
    {
      lead_id: opts.leadId,
      email: opts.email,
      first_name: opts.firstName,
      track: opts.track,
      step: 2,
      vars: {},
      send_after: step2At,
    },
    {
      lead_id: opts.leadId,
      email: opts.email,
      first_name: opts.firstName,
      track: opts.track,
      step: 3,
      vars: opts.track === "scorecard" ? { resourceLink: RESOURCE_LINK } : {},
      send_after: step3At,
    },
  ]);
  if (queueError) console.error("[sequence] enqueue failed:", queueError.message);
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

  // Spam gate. Bots fill the hidden honeypot field, submit synthetic Gmail
  // dot-abuse addresses, or post keyboard-mash names. When any of those trip,
  // we return a normal-looking success WITHOUT storing or notifying: a silent
  // drop means the bot sees 200 OK and moves on instead of retrying or adapting,
  // while Simon's inbox and the leads table stay clean.
  const honeypot = String(body.company_url ?? "").trim();
  const spamName =
    kind === "scorecard"
      ? String(body.name ?? "")
      : `${String(body.firstName ?? "")} ${String(body.lastName ?? "")}`.trim();
  const spamReason = honeypot
    ? "honeypot filled"
    : looksLikeBot(email)
      ? "synthetic gmail pattern"
      : spamName && looksLikeGibberishName(spamName)
        ? "gibberish name"
        : null;
  if (spamReason) {
    // Logged, not silent to us. A silent drop is the right answer for the bot
    // but the wrong answer for us: without this line a false positive loses a
    // real lead with no trace anywhere. Check these logs if someone reports
    // submitting and never hearing back.
    console.error(`[spam] dropped ${kind} (${spamReason}): ${email}`);
    return NextResponse.json({ ok: true });
  }

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
  let sequence: { track: "call" | "scorecard"; firstName: string } | null = null;
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
    const answerDetail = Array.isArray(body.answerDetail)
      ? (body.answerDetail as Array<Record<string, unknown>>)
      : [];
    const answers = answerDetail
      .map((a) => `- [${String(a.area)}] ${String(a.question)} -> ${String(a.answer)}`)
      .join("\n");
    // Marketing channel from the UTM-tagged link Simon shares (e.g. LinkedIn).
    // "source / campaign" when both are present, so the notification and the
    // stored lead show where each scorecard lead actually came from.
    const utmSource = String(body.utm_source ?? "").trim();
    const utmCampaign = String(body.utm_campaign ?? "").trim();
    const channel = [utmSource, utmCampaign].filter(Boolean).join(" / ");
    payload = {
      _subject: `New Profit-Rich Scorecard, ${String(body.name)} (${String(body.total)}/${String(body.max)}, ${String(body.rating)})`,
      name: String(body.name),
      email,
      channel,
      total: `${String(body.total)}/${String(body.max)}, ${String(body.rating)}`,
      results,
      answers,
    };
    lead = {
      source: "scorecard",
      name: String(body.name),
      email,
      score: `${String(body.total)}/${String(body.max)}, ${String(body.rating)}`,
      message: `${channel ? `Lead source: ${channel}\n\n` : ""}${answers ? `${results}\n\n${answers}` : results}`,
    };
    sequence = { track: "scorecard", firstName: String(body.name).trim().split(/\s+/)[0] ?? "" };
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
    if (qualified) {
      sequence = { track: "call", firstName: String(body.firstName ?? "").trim() };
    }
  }

  const leadId = await storeLead(lead);

  if (sequence) {
    await startSequence({ leadId, track: sequence.track, email, firstName: sequence.firstName });
  }

  const sent = await notify(payload, email);

  // The lead is safe if EITHER path worked: the notification email, or the row
  // in Supabase (which /admin reads). Only a submission that achieved neither
  // is genuinely lost, and only that one deserves an error.
  //
  // This used to gate solely on `sent`, which cost a real enquiry on 28 July
  // 2026: the row stored fine, the relay was down, and the lead was told to go
  // away and email Simon directly. Never send someone away when we have their
  // details.
  if (sent || leadId) {
    if (!sent) {
      console.error(
        `[lead] STORED BUT NOT EMAILED, lead ${leadId} (${email}). Visible at ${site.url}/admin only. Fix the relay.`,
      );
    }
    return NextResponse.json({ ok: true });
  }

  console.error(`[lead] LOST, neither stored nor emailed: ${email}`);
  return NextResponse.json(
    {
      error:
        "Could not send right now. Please email simon@srjinternational.co.uk directly.",
    },
    { status: 502 },
  );
}
