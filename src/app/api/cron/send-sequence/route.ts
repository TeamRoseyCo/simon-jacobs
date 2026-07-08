import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { site } from "@/lib/content";
import { unsubscribeUrl } from "@/lib/unsubscribe";
import { callEmail2, scorecardEmail2, instagramEmail3 } from "@/lib/emailTemplates";

const FROM = "SRJ International <simon@srjinternational.co.uk>";
const BATCH_LIMIT = 50;

type QueueRow = {
  id: string;
  email: string;
  first_name: string;
  track: string;
  step: number;
  vars: Record<string, unknown>;
};

function auth(req: Request) {
  const header = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  return Boolean(process.env.CRON_SECRET) && header === expected;
}

function buildTemplate(row: QueueRow, unsubLink: string) {
  const vars = {
    firstName: row.first_name,
    resourceLink: typeof row.vars.resourceLink === "string" ? row.vars.resourceLink : undefined,
    unsubLink,
  };
  if (row.step === 2) {
    return row.track === "scorecard" ? scorecardEmail2(vars) : callEmail2(vars);
  }
  return instagramEmail3(vars);
}

// Vercel Cron hits this on a schedule (see vercel.json). Not user-facing.
export async function GET(req: Request) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return NextResponse.json({ error: "Resend not configured" }, { status: 500 });
  const resend = new Resend(resendKey);

  const { data: due, error: fetchError } = await supabase
    .from("email_queue")
    .select("id, email, first_name, track, step, vars")
    .eq("status", "pending")
    .lte("send_after", new Date().toISOString())
    .limit(BATCH_LIMIT);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }
  if (!due || due.length === 0) {
    return NextResponse.json({ sent: 0, skipped: 0, failed: 0 });
  }

  const emails = [...new Set(due.map((r) => r.email.toLowerCase()))];
  const { data: suppressedRows } = await supabase
    .from("suppressed_emails")
    .select("email")
    .in("email", emails);
  const suppressed = new Set((suppressedRows ?? []).map((r) => r.email));

  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const row of due as QueueRow[]) {
    if (suppressed.has(row.email.toLowerCase())) {
      await supabase.from("email_queue").update({ status: "skipped" }).eq("id", row.id);
      skipped++;
      continue;
    }

    const unsubLink = unsubscribeUrl(site.url, row.email);
    const { subject, text } = buildTemplate(row, unsubLink);

    try {
      const { error } = await resend.emails.send({
        from: FROM,
        to: row.email,
        replyTo: "simon@srjinternational.co.uk",
        subject,
        text,
        headers: {
          "List-Unsubscribe": `<mailto:simon@srjinternational.co.uk?subject=unsubscribe>, <${unsubLink}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      });
      if (error) throw new Error(error.message);
      await supabase
        .from("email_queue")
        .update({ status: "sent", sent_at: new Date().toISOString() })
        .eq("id", row.id);
      sent++;
    } catch {
      await supabase.from("email_queue").update({ status: "failed" }).eq("id", row.id);
      failed++;
    }
  }

  return NextResponse.json({ sent, skipped, failed });
}
