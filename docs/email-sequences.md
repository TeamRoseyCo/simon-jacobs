# Email welcome/follow-up sequences (plan, not built yet)

Modeled on a copywriter (Tyson 4D) welcome sequence that reliably lands in the
inbox. Sending is wired via **Resend** (from `noreply@srjinternational.co.uk`,
replyTo = the lead), with FormSubmit as fallback. This doc is the spec to build
from. Nothing here is implemented yet.

## The deliverability engine (UNIVERSAL, use on every entry point)
Inbox providers (Gmail etc.) place mail mostly on **engagement signals**. The
sequence manufactures the three strongest ones:
1. **Replies (the #1 signal).** Explicitly ask the subscriber to reply. Make the
   ask useful, not "reply with a random word" but "reply and tell me X" so the
   reply also gives us something (call ammo, context).
2. **Whitelisting.** Ask them to add the sender to contacts / mark important so
   future mail skips Promotions and Spam.
3. **Tab-training.** Tell them: if it lands in Promotions, drag it to Primary.

Email 1 of every entry point includes a short "here's how to make sure you see
my emails" block. That block is the spam-proofing.

## Technical hygiene (table stakes, must all be true)
- Send through a real ESP (Resend) with SPF/DKIM/DMARC on srjinternational.co.uk.
- Personal From name + own domain + Reply-To set (invites replies).
- One-click List-Unsubscribe header (Resend adds it). Easy unsub PREVENTS spam
  complaints, which hurt far more.
- Physical mailing address in footer (CAN-SPAM).
- Plain, conversational, low-image copy. One CTA per email. Reads like a person.
- Personalize with first name. Use the preheader/preview text deliberately.

## Map: entry point -> sequence (each shares the engine above)
| Entry point | Funnel stage | Sequence goal |
|---|---|---|
| **Scorecard** | mid | deliver score -> educate/nurture -> convert to consult |
| **Consultation form, qualified** | hot (hand-raiser) | confirm -> get them to book + show up -> arm Simon |
| **Consultation form, unqualified** | cold | drop into the slow scorecard-style nurture |
| **Newsletter (footer)** | cold | pure value nurture |

We already capture the `qualified` flag + form fields (turnover/role/intent/
question), so sequences can branch and personalize automatically.

## Consultation-form sequence (the hand-raiser version) — 3 emails
The reply-bait does double duty: it triggers the deliverability signal AND hands
Simon ammo for the call.

1. **Confirm + prime (instant).** Acknowledge the message, set expectation, bait
   a useful reply: "Got your message, [Name]. So Simon comes prepared, reply and
   tell him the #1 thing you want to fix about your agency's numbers. (Also add
   him to your contacts so his reply doesn't land in Promotions.)"
2. **Book nudge (+1 day).** If not booked: "Skip the back-and-forth, grab a time:
   [calendar link]." If booked: "Looking forward to [date], here's what to have
   handy."
3. **Pre-call value / no-show kill (day before).** One short relevant resource +
   "see you [time], bring your messiest tax question."

Note: if they book directly via the Google Calendar link, Google sends its own
confirmation + reminders, so this sequence is mainly for form submits that have
NOT booked yet. Do not double up on calendar confirmations.

## Scorecard sequence (the nurture version) — outline
1. **Deliver + prime.** Send their score/result + the deliverability "see my
   emails" block.
2. **Engage (+1-2 days).** Ultra-short personal "how did your score land for
   you?" One job: get a reply.
3. **Value + ascend.** A free tax resource, then pull toward a consultation /
   booking.

## Source
Pattern reverse-engineered from Tyson 4D's first 3 list emails (delivered via
ActiveCampaign). Caveat: the "reply" play is for WARM opt-in lists (these are).
Cold outreach has different rules (volume warm-up, plain text, no tracking
links), do not mix the two.
