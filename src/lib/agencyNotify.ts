/**
 * RoseyCo agency lead notification — the ONE standard shape.
 *
 * Sends a branded, zero-PII "a lead came in" ping to the agency inbox. Every
 * live lead-gen client must use this and nothing else, so the notification
 * looks identical whichever client it came from.
 *
 * Reference implementation: RB-Counselling `supabase/functions/notify-lead`.
 * Standard: marketing-ide/docs/LEAD-NOTIFICATION-STANDARD.md
 *
 * Dependency-free. Runs on Deno (Supabase edge functions) and Node 18+ / Next
 * route handlers, because it only uses global fetch.
 *
 * THE RULES, which this function enforces by construction:
 *   1. It is a SEPARATE email, never a cc on the client's alert. A cc would put
 *      the enquirer's own words in our inbox.
 *   2. It carries NO personal data. There is deliberately no parameter for a
 *      name, email, phone or message, so a caller cannot leak one by accident.
 *      Free-text enquiries to a therapy or health client are special-category
 *      data under UK GDPR Article 9 and must never reach us.
 *   3. It is best-effort. It never throws and never rejects, so a failure here
 *      can never break the client's own alert. Call it without awaiting if you
 *      prefer, but awaiting is fine.
 */

export interface AgencyNotifyOptions {
  /** Client's display name, e.g. "RB Counselling". Appears in the subject and header. */
  client: string;
  /** Resend API key. */
  apiKey: string;
  /** Where the lead came from, e.g. "Website Contact Form", "Booking form", "Meta lead form". */
  source?: string;
  /** When it landed. Defaults to now. */
  when?: Date | string;
  /**
   * Who holds the full enquiry, e.g. "Raymond" or "the client". Used in the
   * closing line so the reader knows where the real detail lives.
   */
  ownerLabel?: string;
  /** Agency recipients. Defaults to the central inbox. */
  to?: string[];
  /** Envelope from. Defaults to `<client> Website <leads@roseyco.com>`. */
  from?: string;
  /** IANA zone for the timestamp. Defaults to Europe/London. */
  timeZone?: string;
  /** Header band colour. Defaults to RoseyCo dark teal. */
  accent?: string;
}

export interface AgencyNotifyResult {
  ok: boolean;
  id?: string;
  status?: number;
  error?: string;
  skipped?: string;
}

const DEFAULT_TO = ["leads@roseyco.com"];
const DEFAULT_ACCENT = "#0f3d3e";
const DEFAULT_TZ = "Europe/London";

const esc = (s: string): string =>
  (s ?? "").replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Build the email without sending it. Exported so it can be unit-tested. */
export function buildAgencyEmail(o: AgencyNotifyOptions): { subject: string; html: string; text: string } {
  const client = o.client.trim();
  const source = (o.source ?? "Website").trim();
  const owner = (o.ownerLabel ?? "the client").trim();
  const accent = o.accent ?? DEFAULT_ACCENT;
  const d = o.when ? new Date(o.when) : new Date();
  const when = isNaN(d.getTime())
    ? ""
    : d.toLocaleString("en-GB", { timeZone: o.timeZone ?? DEFAULT_TZ });

  const subject = `New website enquiry received — ${client}`;

  const text =
`A new enquiry came in through the ${client} website (${source})${when ? " · " + when : ""}.

This is a lead-volume notification only. For client confidentiality, no personal details or message content are included — the full enquiry is available to ${owner}.

— ${client} lead monitoring`;

  const html =
`<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1a1a1a">
  <div style="background:${esc(accent)};color:#fff;padding:20px 24px;border-radius:10px 10px 0 0">
    <div style="font-size:13px;letter-spacing:.06em;text-transform:uppercase;opacity:.8">${esc(client)} — Lead Monitoring</div>
    <div style="font-size:20px;font-weight:600;margin-top:4px">New website enquiry received</div>
  </div>
  <div style="border:1px solid #e3e8e8;border-top:none;border-radius:0 0 10px 10px;padding:24px;font-size:15px;line-height:1.6">
    <p style="margin:0 0 12px">A new enquiry came in through the website${when ? ` on <strong>${esc(when)}</strong>` : ""} (source: ${esc(source)}).</p>
    <p style="margin:0;color:#5b6b6b;font-size:13px">Lead-volume notification only. For client confidentiality, no personal details or message content are included — the full enquiry is available to ${esc(owner)}.</p>
  </div>
</div>`;

  return { subject, html, text };
}

/**
 * Send the agency ping. Never throws.
 *
 * Retries on 429 and 5xx, because Resend rate-limits at roughly two requests a
 * second and this send usually follows the client's alert in the same handler.
 */
export async function notifyAgencyLead(o: AgencyNotifyOptions): Promise<AgencyNotifyResult> {
  try {
    if (!o.apiKey) return { ok: false, skipped: "no api key" };
    const to = (o.to ?? DEFAULT_TO).map((s) => s.trim()).filter(Boolean);
    if (!to.length) return { ok: false, skipped: "no recipients" };

    const { subject, html, text } = buildAgencyEmail(o);
    const payload = {
      from: o.from ?? `${o.client} Website <leads@roseyco.com>`,
      to,
      subject,
      html,
      text,
    };

    let last: AgencyNotifyResult = { ok: false };
    for (let attempt = 0; attempt < 3; attempt++) {
      if (attempt > 0) await sleep(700);
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${o.apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
      last = { ok: res.ok, status: res.status, id: body.id, error: res.ok ? undefined : (body.message ?? String(res.status)) };
      if (res.ok || (res.status !== 429 && res.status < 500)) break;
    }
    if (!last.ok) console.error(`[agency-notify] ${o.client} failed ${last.status}: ${last.error}`);
    return last;
  } catch (e) {
    console.error("[agency-notify] threw:", String(e));
    return { ok: false, error: String(e) };
  }
}
