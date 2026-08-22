import * as React from "react";
import { Layout, H, P, B, Callout, CTA, Signoff, PS } from "./shell";

export type EmailProps = {
  firstName: string;
  bookingLink: string;
  instagramLink: string;
  resourceLink?: string;
  unsubLink: string;
};

const hi = (name: string) => `Hey ${name || "there"},`;

// Positioning note: SRJ is a general chartered practice with three spikes —
// cross-border tax, exit planning, and sectors. Copy speaks to owner-managed UK
// business owners (not agencies specifically); the value nuggets below are
// general tax truths that land for any owner-managed company. See
// docs/general-practice-repositioning-2026-08.md.

// 1 — Qualified contact lead, sent instantly. Gets them to the booking link,
// but opens with a genuine value idea so the first email already gives something.
export function CallEmail1({ firstName, bookingLink, unsubLink }: EmailProps) {
  return (
    <Layout preview="Your call link is inside — plus one thing worth knowing first" unsubLink={unsubLink}>
      <H>Here&rsquo;s your link to get booked in</H>
      <P>{hi(firstName)}</P>
      <P>Got your message — thanks for reaching out. Here&rsquo;s your link to grab a time that suits you:</P>
      <CTA href={bookingLink}>Book your call →</CTA>
      <P>
        Pick a slot and bring your questions. I&rsquo;ll have read what you sent before we speak, so
        there&rsquo;s nothing to prep your end.
      </P>
      <Callout>
        One thing worth knowing before we talk: most business owners I meet aren&rsquo;t overpaying
        because they did something wrong — they&rsquo;re overpaying because nobody told them the{" "}
        <B>order</B> to do things in. How you pay yourself, when to buy the kit, how profit leaves
        the company, what an exit or a move abroad does to the bill. Small timing calls, big
        difference by year-end. We&rsquo;ll go through yours on the call.
      </Callout>
      <Signoff />
      <PS>
        P.S. So my emails actually reach you (and don&rsquo;t get binned in Promotions), do me one
        favour — hit reply with anything, even a full stop. Gmail takes the hint.
      </PS>
    </Layout>
  );
}

// 2 — Call nudge, +2 days if no booking. Leads with a real reel-style tax nugget.
export function CallEmail2({ firstName, bookingLink, unsubLink }: EmailProps) {
  return (
    <Layout preview="The 60% tax trap most business owners walk into by accident" unsubLink={unsubLink}>
      <H>The 60% tax trap most business owners miss</H>
      <P>{hi(firstName)}</P>
      <P>Quick one, because it catches so many owners out.</P>
      <Callout>
        There&rsquo;s a slice of income — between <B>£100,000 and £125,140</B> — where every extra
        pound is effectively taxed at about <B>60%</B>. No tax table anywhere says &ldquo;60%&rdquo;.
        It&rsquo;s your tax-free allowance quietly disappearing as your income climbs. Have a good
        year, take a bigger dividend to fund something, and you walk straight into it without
        realising.
      </Callout>
      <P>
        The fix is almost always <B>timing</B> and how you pay yourself — decided before the money
        moves, not after. That&rsquo;s exactly the kind of thing we&rsquo;d sort on your call. You
        asked for one the other day but haven&rsquo;t grabbed a time yet:
      </P>
      <CTA href={bookingLink}>Grab your time →</CTA>
      <P>Or just hit reply with the question on your mind. I read every one.</P>
      <Signoff />
    </Layout>
  );
}

// 3 — Scorecard finisher, sent instantly. Value while they wait for their result.
export function ScorecardEmail1({ firstName, resourceLink, unsubLink }: EmailProps) {
  return (
    <Layout preview="I&rsquo;m scoring your answers now — one idea to sit with in the meantime" unsubLink={unsubLink}>
      <H>Your Profit-Rich Scorecard is on its way</H>
      <P>{hi(firstName)}</P>
      <P>
        Nice work finishing the Scorecard — most business owners never actually stop to look at
        where the money leaks, so you&rsquo;re already ahead.
      </P>
      <P>
        Here&rsquo;s what happens next: I score your answers across all 7 areas myself and send back
        your full result plus a <B>90-day plan</B> — the specific moves to plug the leaks, in the
        order that matters. It lands within 2 working days.
      </P>
      <Callout>
        While I build yours, one idea worth sitting with: on most P&amp;Ls I see, the biggest leak
        isn&rsquo;t a missed expense — it&rsquo;s profit leaving the company the expensive way.{" "}
        <B>How you pay yourself moves the needle more than any receipt ever will.</B> Your scorecard
        will show where yours stands.
      </Callout>
      {resourceLink ? (
        <>
          <P>Something worth a read while you wait:</P>
          <CTA href={resourceLink}>Read this next →</CTA>
        </>
      ) : null}
      <Signoff />
      <PS>
        P.S. So your result doesn&rsquo;t land in Promotions — hit reply with anything, even one
        word. It&rsquo;s the single best nudge to Gmail to put me in your primary inbox.
      </PS>
    </Layout>
  );
}

// 4 — Scorecard follow-up, +5 days. Value nugget + a real reply prompt.
export function ScorecardEmail2({ firstName, unsubLink }: EmailProps) {
  return (
    <Layout preview="How did your scorecard land? Plus one move worth doing anyway" unsubLink={unsubLink}>
      <H>How did your scorecard land?</H>
      <P>{hi(firstName)}</P>
      <P>
        I sent your Profit-Rich Scorecard and 90-day plan over a few days back. How did it land?
        Anything in there catch you off guard?
      </P>
      <Callout>
        If it&rsquo;s still on the &ldquo;I&rsquo;ll get to it&rdquo; pile, here&rsquo;s one move
        worth doing regardless of your score: get your bookkeeping genuinely clean and current. Not
        exciting, I know. But clean books let you make tax decisions <B>before</B> year-end instead
        of finding out after — and if you ever sell the business, they quietly raise what a buyer
        will pay. I&rsquo;ve watched messy books knock real money off a valuation.
      </Callout>
      <P>
        Hit reply and tell me the area you scored worst in — I&rsquo;ll point you at the fastest fix.
      </P>
      <Signoff />
    </Layout>
  );
}

// 5 — Shared final step for both tracks. Points them at the daily free value on IG.
export function InstagramEmail3({ firstName, instagramLink, unsubLink }: EmailProps) {
  return (
    <Layout preview="Where I post the free stuff — most days, plain-English tax" unsubLink={unsubLink}>
      <H>Where I post the free stuff (most days)</H>
      <P>{hi(firstName)}</P>
      <P>
        Whether we&rsquo;ve spoken yet or not, I don&rsquo;t want you waiting on my next email to get
        something useful.
      </P>
      <P>
        The day-to-day stuff lives on my Instagram — most days, for business owners: cutting the tax
        bill, paying yourself properly, and building something actually worth selling. Short, plain,
        no jargon. The stuff most accountants keep behind a bill. I just put it out.
      </P>
      <CTA href={instagramLink}>Follow @simonjacobs_cta →</CTA>
      <P>Turn post notifications on so you catch the good ones, and take whatever works for your business.</P>
      <Signoff />
      <PS>
        P.S. It&rsquo;s where I break down real (anonymised) numbers and test ideas first. Got a
        question about yours? Drop it in the comments — good chance I turn it into a post.
      </PS>
    </Layout>
  );
}
