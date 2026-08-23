# Lead email copy (send-ready)

**Canonical source is the code**, not this file: the emails are authored as
branded [react-email](https://react.email) components in `src/emails/templates.tsx`
(shared shell/brand in `src/emails/shell.tsx`) and rendered to HTML + plaintext
in `src/lib/emailTemplates.tsx`. This doc mirrors that copy for review/sign-off.

**Rewritten 2026-08-15 for the general-practice repositioning** (see
`general-practice-repositioning-2026-08.md`): copy speaks to **owner-managed UK
business owners**, not agencies. Value-first, in Simon's reel voice. Branding
matched to the live site: serif "SRJ International" masthead, teal editorial
eyebrows, dark ink CTA buttons, Simon's photo in the signature, value-callout
blocks. **No em dashes anywhere** (house rule).

Delivery: Email 1 (per track) sends instantly from `/api/contact`; Emails 2 and
3 are queued to `email_queue` and sent by the daily `/api/cron/send-sequence`
cron. Every send carries `List-Unsubscribe` plus one-click headers and checks
`suppressed_emails` first.

---

## Track: wants a call (qualified contact-form lead)

### Email 1 (instant) · Subject: "Here's your link to get booked in" · Eyebrow: Your call
> Hey {first_name},
> Got your message, and thanks for reaching out. Here's your link to grab a time that suits you: **[Book your call →]**
> Pick a slot and bring your questions. I'll have read what you sent before we speak, so there's nothing to prep your end.
> *(callout)* One thing worth knowing before we talk. Most business owners I meet aren't overpaying because they did something wrong. They're overpaying because nobody told them the **order** to do things in. How you pay yourself, when to buy the kit, how profit leaves the company, what an exit or a move abroad does to the bill. Small timing calls make a big difference by the year end. We'll go through yours on the call.
> *(signature: Simon's photo)* Talk soon, Simon Jacobs, Chartered Tax Adviser · CTA · ACA · ex-PwC
> *P.S. So my emails actually reach you and don't get binned in Promotions, do me one favour. Hit reply with anything, even a full stop. Gmail takes the hint.*

### Email 2 (+2 days if no booking) · Subject: "The 60% tax trap most business owners miss" · Eyebrow: Before you book
> Hey {first_name},
> Quick one, because it catches so many owners out.
> *(callout)* There's a slice of income, between **£100,000 and £125,140**, where every extra pound is effectively taxed at about **60%**. No tax table anywhere lists a 60% rate. It's your tax-free allowance quietly disappearing as your income climbs. Have a good year, take a bigger dividend to fund something, and you can walk straight into it without realising.
> The fix is almost always **timing**, and how you pay yourself, decided before the money moves rather than after. That's exactly the kind of thing we'd sort on your call. You asked for one the other day but haven't grabbed a time yet: **[Grab your time →]**
> Or just hit reply with the question on your mind. I read every one.

---

## Track: scorecard (Profit-Rich Scorecard finisher)

### Email 1 (instant) · Subject: "Your Profit-Rich Scorecard is on its way" · Eyebrow: Your scorecard
> Hey {first_name},
> Nice work finishing the Scorecard. Most business owners never actually stop to look at where the money leaks, so you're already ahead.
> Here's what happens next. I score your answers across all 7 areas myself and send back your full result, plus a **90-day plan** with the specific moves to plug the leaks in the order that matters. It lands within 2 working days.
> *(callout)* While I build yours, one idea worth sitting with. On most P&Ls I see, the biggest leak isn't a missed expense. It's profit leaving the company the expensive way. **How you pay yourself moves the needle more than any receipt ever will.** Your scorecard will show where yours stands.
> Something worth a read while you wait: **[Read this next →]**
> *P.S. So your result doesn't land in Promotions, hit reply with anything, even one word. It's the single best nudge to Gmail to put me in your primary inbox.*

### Email 2 (+5 days) · Subject: "How did your scorecard land?" · Eyebrow: Following up
> Hey {first_name},
> I sent your Profit-Rich Scorecard and 90-day plan over a few days back. How did it land? Did anything in there catch you off guard?
> *(callout)* If it's still on the "I'll get to it" pile, here's one move worth doing regardless of your score. Get your bookkeeping genuinely clean and current. Not exciting, I know. But clean books let you make tax decisions **before** the year end instead of finding out after. And if you ever sell the business, they quietly raise what a buyer will pay. I've watched messy books knock real money off a valuation.
> Hit reply and tell me the area you scored worst in, and I'll point you at the fastest fix.

---

## Shared final step (both tracks)

### Email 3 · Subject: "Where I post the free stuff (most days)" · Eyebrow: More, most days
> Hey {first_name},
> Whether we've spoken yet or not, I don't want you waiting on my next email to get something useful.
> The day to day stuff lives on my Instagram. Most days, for business owners, on cutting the tax bill, paying yourself properly, and building something actually worth selling. Short, plain, no jargon. The sort of thing most accountants keep behind a bill. I just put it out.
> **[Follow @simonjacobs_cta →]**
> Turn post notifications on so you catch the good ones, and take whatever works for your business.
> *P.S. It's where I break down real (anonymised) numbers and test ideas first. Got a question about yours? Drop it in the comments and there's a good chance I turn it into a post.*

---

## Gap (not yet built)
Newsletter subscribers (`source=subscribe`) and **unqualified** contact-form
leads get no sequence. A short, value-led welcome for them (same voice) is the
obvious next add.
