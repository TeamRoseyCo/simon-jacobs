# Lead-source attribution, July 2026

## Goal

Simon asked on 21 July 2026 how he can tell where a lead came from, and nobody could answer him: the two enquiries received so far are completely unattributed. He shares links from his Instagram bio and his LinkedIn profile, and the UTM tags on those links were being lost the moment a visitor clicked through from the landing page to `/contact`. The goal of this work is that every future enquiry, from any of the three forms on the site (contact, Scorecard, newsletter), arrives with the channel that produced it attached: in the notification email, in the stored lead visible at `/admin`, and as a GA4 event. Plus a pack of ready-made tagged links Simon can paste into his profiles himself.

## Picking this up later: what is still owed

The code is finished, type-checks, builds, and was tested end to end locally. Four things are outstanding, none of them code:

1. **Simon pastes five links.** The pack is in "The tagged link pack for Simon" below. Nothing else is needed from him.
2. **Someone registers six custom dimensions in GA4.** Until that happens the event arrives but its detail is invisible in reports, and it is not retroactive. A ready-to-paste prompt for a browser agent is in "GA4 setup, as a prompt for a browser agent" below.
3. **One live smoke test, by a human.** Open the site, accept cookies, submit the contact form once, watch GA4 Realtime. It creates a real notification email and a real leads row, so use an address Simon will recognise and ignore.
4. **Decide whether the privacy policy mentions the session record.** See the last note under "Notes".

## How it works, in plain English

Think of a name tag at the door.

When Simon puts `srjinternational.co.uk/ig` in his Instagram bio, that short link does not go straight to the site. It bounces through the server, which quietly turns it into `srjinternational.co.uk/scorecard?utm_source=instagram&utm_medium=social&utm_campaign=bio`. The `?utm_source=instagram` part is the name tag. It sits in the address bar and the visitor never has to notice it.

The old problem was that the name tag was stuck to the page, not to the person. The moment they clicked "Contact" in the menu they got a fresh page with a clean address, the tag was gone, and the contact form had nothing to send. That is why Simon's enquiries arrived anonymous.

What happens now: the instant someone lands, the browser copies the name tag onto a small notepad that lives in that browser tab. They can read three blog posts and come back an hour later, and the notepad still says "instagram". When they finally submit a form, the form reads the notepad and staples it to the enquiry. Two extra things go on the notepad: the first page they saw, and the website they arrived from if it was not ours.

The notepad is write-once on purpose. If the same visitor later clicks one of Simon's LinkedIn links in the same visit, the notepad is not overwritten, because Instagram is what actually brought them in and is what deserves the credit. That is what "first touch" means, and it is the honest answer to "which of my links earns me work".

## Tasks

- [x] 1. Read the two commits that shipped today (759f2f7, 46f3616) and the existing Scorecard UTM implementation, so nothing here regresses them
- [x] 2. Build the shared first-touch attribution module (`src/lib/attribution.ts`)
- [x] 3. Run the capture on every entry page, not just the homepage (`src/components/AttributionCapture.tsx`, mounted in the root layout)
- [x] 4. Point `ScorecardForm.tsx` at the shared module instead of its own URL-only read
- [x] 5. Send the persisted attribution with the contact form POST (no visible fields, not in the saved draft)
- [x] 6. Surface attribution server-side in the `contact` branch: notification email plus the stored lead's `message`
- [x] 7. Do the same for the `subscribe` (newsletter) branch
- [x] 8. Add the consent-gated GA4 helper (`src/lib/analytics.ts`)
- [x] 9. Fire `generate_lead` on successful submit from all three forms
- [x] 10. Add the new short links to `next.config.ts` for the link pack
- [x] 11. `npx tsc --noEmit` and `npm run build` both pass
- [x] 12. Local end-to-end test: land with UTMs, navigate to `/contact`, submit, confirm the channel arrives (no production email, no production Supabase row)
- [x] 13. Write the tagged link pack and the "How Simon reads attribution" section below

## Notes

**Item 2.** First touch wins: once a session has an attribution record it is never overwritten. An internal navigation, or a second click from a different link in the same session, must not be able to steal credit from the link that actually earned the enquiry. `sessionStorage` (not `localStorage`) is the right store: attribution should describe this visit, not a visit from three weeks ago.

**Item 2.** Every storage read and write is inside `try/catch`, and there is a module-level in-memory fallback for browsers where storage throws. The Instagram and LinkedIn in-app browsers, which are exactly the traffic we care about here, can have storage disabled. The fallback survives client-side navigation (the case that matters) and is lost on a full page load, which is the best that can be done without cookies. A storage failure can never break a form: worst case the lead arrives unattributed, as all leads did before this work.

**Item 2.** `getAttribution()` captures on first call rather than relying on the layout component having run first. React fires child effects before parent effects, so a form's effect can run before the layout's: making the read self-healing removes that ordering trap entirely.

**Item 2.** `landing_page` stores the path only, not the full URL with its query string. The UTM values are already captured as their own fields, so keeping the query would only make the notification email harder to read. `referrer` is stored only when it is off-site: an internal referrer would just record the previous step in the funnel and hide the real origin.

**Item 4.** The Scorecard's own `utm` state and its `useEffect` are gone, replaced by the shared module. This is a small behaviour improvement as well as a de-duplication: the old code only read the URL of the page the form was on, so a visitor who arrived on `/ig` and then browsed to the blog and back lost their tags. Same `channel` string as before, so Simon's Scorecard notifications look unchanged.

**Item 6, the same call in plain English, since it will get questioned again.** Supabase is a spreadsheet with fixed columns. Adding a column is a manual job someone does by hand in the Supabase dashboard, and it is entirely separate from pushing code to the site. So there is an ordering trap: if the code says "put the source in the `channel` column" and gets deployed before anyone creates that column, Supabase rejects every single save, not just the source but the whole lead. The next real enquiry would vanish. That is precisely the failure that cost a real lead on 28 July 2026, and it is not worth re-creating for tidiness. The `message` field already exists, already displays at `/admin`, already exports to CSV, and the Scorecard has been storing its source there for weeks.

**Item 6, judgment call: no new Supabase column.** Attribution is prepended to the `message` field, the way the Scorecard branch already does it, and no column was added. Reason: a migration cannot be applied atomically with a deploy here. If the code inserted a `channel` column before someone ran the SQL in the Supabase dashboard, every insert would fail with an unknown-column error, `storeLead()` would return `null`, and lead storage would be silently broken for real enquiries. Weighed against a volume of roughly two enquiries a month, a sortable column buys nothing that the message prefix does not already give. The SQL is written out under "If attribution ever needs its own column" below, for whenever someone wants it and can run the migration first.

**Item 6, hardening.** Attribution values are stripped of newlines and truncated server-side before they go anywhere near the email body. They come from a URL, so they are attacker-controlled: without stripping, a crafted `utm_source` could forge extra lines in Simon's notification.

**Item 6, extra logging.** The route now logs one line per lead with its channel. If both the notification email and the Supabase insert fail, as happened on 28 July 2026, the Vercel log still records which link produced the enquiry.

**Item 9.** GA4 params are deliberately named `lead_source` / `lead_medium` / `lead_campaign` rather than `source` / `medium` / `campaign`. The bare names collide with GA4's own built-in traffic-source dimensions and are silently dropped.

**Item 12, how the test was isolated.** Nothing here touched production. `next dev` ran on port 3100 with outbound network egress blocked at the Node process (`NODE_USE_ENV_PROXY` pointed at an unreachable proxy, with localhost exempt), so neither Resend nor the FormSubmit relay could deliver a test email, and with the Supabase URL pointed at a throwaway local server that logged every row instead of storing it. Both blocks were confirmed in the server log after the run. In the test browser, Google Tag Manager and Google Analytics were blocked at the network layer so the run could not reach Simon's real GA4 property; the `generate_lead` event was asserted on the `dataLayer` queue instead.

**Item 12, what the test proved.** Landed on `/?utm_source=test&utm_medium=email&utm_campaign=verify`, accepted cookies through the real banner, then clicked a real in-app link to `/contact`. A marker set on `window` before the click was still there afterwards, which confirms it was a client-side navigation and not a full page load, so the tags could only have survived through session storage. The POST body then carried `utm_source`, `utm_medium`, `utm_campaign` and `landing_page` with no visible fields added to the form; the stored row's message opened with `Lead source: test / verify`; the server logged `[lead] contact from ... via test / verify (landed on /)`; the qualified success screen (booking link) appeared as before; and one `generate_lead` event was queued with the right params. The `subscribe` and `scorecard` branches were checked the same way against the local server.

**Item 12, injection check.** A `utm_source` containing newlines and a forged `qualified: Yes` line was submitted deliberately. It came out collapsed onto one line inside the source value, unable to forge a field in the notification, which is what the server-side stripping is for.

**Not done, deliberately.** The privacy and cookie pages were not edited. The new storage is first-party, session-scoped, set no matter what the visitor chooses about cookies, and exists to answer the enquiry they are submitting, which is a defensible basis, but it is a call for Simon rather than for us. Worth a line in the privacy policy the next time it is touched: "if you arrive from a link we have shared, we record which link it was for the duration of your visit, so we know how you found us."

## What changed, file by file

| File | Change |
| --- | --- |
| `src/lib/attribution.ts` | New. First-touch capture, session persistence, and the POST payload shape. Single implementation used by all three forms. |
| `src/lib/analytics.ts` | New. Consent-gated `trackEvent()` and the `generate_lead` helper. |
| `src/components/AttributionCapture.tsx` | New. Renders nothing; runs the capture on whatever page the visitor lands on. |
| `src/app/layout.tsx` | Mounts `AttributionCapture`. |
| `src/components/ContactForm.tsx` | Sends attribution with the POST; fires `generate_lead` on success. |
| `src/components/ScorecardForm.tsx` | Uses the shared module instead of its own URL-only read; fires `generate_lead`. |
| `src/components/NewsletterSignup.tsx` | Sends attribution; fires `generate_lead`. |
| `src/app/api/contact/route.ts` | One `attribution()` helper used by all three branches: channel in the notification email, channel prefixed to the stored lead's message, one log line per lead. |
| `next.config.ts` | Three new tagged short links: `/li-button`, `/li-featured`, `/call`. |

## GA4 event names

One event name, `generate_lead`, fired on a successful submission from all three forms. It fires only when the visitor has accepted analytics cookies (the same `sj-cookie-consent` record the cookie banner writes, plus Google Consent Mode v2 underneath).

| Param | Values | Meaning |
| --- | --- | --- |
| `form_type` | `contact`, `scorecard`, `newsletter` | Which form was submitted |
| `lead_source` | e.g. `instagram`, `linkedin`, `email`, or `untagged` | `utm_source` from the link they arrived on |
| `lead_medium` | e.g. `social`, `signature` | `utm_medium` |
| `lead_campaign` | e.g. `bio`, `profile`, `featured` | `utm_campaign` |
| `qualified` | `yes`, `no`, `n/a` | Contact form only: decision-maker at or above the turnover floor. `n/a` for the Scorecard and newsletter, which have no qualification step. |
| `landing_page` | e.g. `/scorecard` | First page of the visit |

**For Emil or whoever owns GA4:** the event shows up in Realtime and in Reports > Engagement > Events within minutes, but the params above are custom dimensions and stay invisible in reports until they are registered once, under Admin > Data display > Custom definitions > Create custom dimension, scope Event, with the exact parameter names in the table. Do that for `form_type`, `lead_source`, `lead_medium`, `lead_campaign`, `qualified`, `landing_page`. Both GA4 properties on the site (`G-FJGM7PLZEC` and `G-6S1EHH7C90`) receive the event, so register the dimensions in whichever one is actually being read.

Registration is not retroactive. GA4 only attaches a custom dimension to events that arrive after it is created, so an event fired today with a dimension registered next week will show as "(not set)" forever. Register before the tagged links go out if possible.

### GA4 setup, as a prompt for a browser agent

The registration is pure clicking in the GA4 UI, so it can be handed to Claude in Chrome, signed in to the Google account that owns the property. Paste the block below. It is deliberately read-mostly: it creates dimensions and toggles one key event, and is told to change nothing else.

```text
You are working in Google Analytics 4 for the site srjinternational.co.uk. Do
only what is listed here. Do not delete anything, do not change data retention,
data filters, users, or any existing dimension. If a step does not match what you
see, stop and report rather than improvising.

1. Open https://analytics.google.com and go to Admin (the gear, bottom left).
2. Two GA4 measurement IDs are installed on this site: G-FJGM7PLZEC and
   G-6S1EHH7C90. Under Admin > Data collection and modification > Data streams,
   work out which property owns which ID, and tell me both property names.
   Do the rest of these steps in BOTH properties.
3. Go to Admin > Data display > Custom definitions > Custom dimensions tab.
4. Create six event-scoped custom dimensions. For each one click "Create custom
   dimension", set Scope to "Event", and use these exact values. The "Event
   parameter" must match character for character, it is case sensitive, and if
   the parameter is not yet in the dropdown list, type it in manually and pick
   the "use anyway" option.

   Dimension name: Form type          | Event parameter: form_type
   Dimension name: Lead source        | Event parameter: lead_source
   Dimension name: Lead medium        | Event parameter: lead_medium
   Dimension name: Lead campaign      | Event parameter: lead_campaign
   Dimension name: Lead qualified     | Event parameter: qualified
   Dimension name: Lead landing page  | Event parameter: landing_page

   If a dimension with that parameter already exists, leave it alone and say so.
5. Go to Admin > Data display > Events. Find the event named "generate_lead".
   If it is listed, switch on "Mark as key event". If it is not listed yet, that
   is expected on a brand new setup: say so and skip this step, it appears once
   the first real enquiry comes through.
6. Report back with: the two property names, which of the six dimensions you
   created versus which already existed, whether generate_lead was there to be
   marked, and how many of the 50 event-scoped custom dimension slots each
   property has used.
```

To test it end to end afterwards, a human needs to open the live site, accept cookies, submit the contact form once, and watch GA4 Realtime for a `generate_lead` event. Do that with a real address that Simon can recognise and ignore, because it does produce a real notification email and a real row in the leads table.

## The tagged link pack for Simon

Paste these exactly as written. Each one records a different placement, so a lead can be traced back to the individual link that produced it. They are all short on purpose: nothing to mistype, and nothing ugly on a profile.

| Where it goes | Link to paste | Lands on |
| --- | --- | --- |
| Instagram bio | `srjinternational.co.uk/ig` | The Scorecard |
| LinkedIn profile, the "website" link | `srjinternational.co.uk/li` | The Scorecard |
| LinkedIn custom profile button | `https://srjinternational.co.uk/li-button` | The contact form |
| LinkedIn Featured section | `https://srjinternational.co.uk/li-featured` | The Scorecard |
| LinkedIn banner image (text on the image, people type it) | `srjinternational.co.uk/li` | The Scorecard |
| Email signature | `srjinternational.co.uk/call` | The contact form |

Notes on the pack:

- The LinkedIn custom button needs the full `https://` form, LinkedIn rejects a bare domain. Everywhere else the short form is fine, browsers add the rest.
- A LinkedIn banner is an image and cannot be clicked. Put the short link on the image as text so someone reading the profile can type it, which is exactly why these are three characters long.
- Instagram Stories: use `srjinternational.co.uk/ig` in a link sticker as well. It will be counted alongside bio traffic, which is fine unless Simon wants Stories counted separately, in which case ask for another short link.
- Do not edit the tags on the end of these links by hand, and do not paste a link with `?utm_...` visible on a profile. The short link carries the tags invisibly.

## If attribution ever needs its own column

Not done, deliberately: see the Item 6 note above. For whenever it is wanted, run this in the Supabase SQL editor **before** deploying any code that writes to it.

```sql
alter table public.leads add column if not exists channel text;
alter table public.leads add column if not exists utm_source text;
alter table public.leads add column if not exists utm_medium text;
alter table public.leads add column if not exists utm_campaign text;
alter table public.leads add column if not exists landing_page text;
alter table public.leads add column if not exists referrer text;
```

## How Simon reads attribution from now on

Three places, in the order you will actually use them.

**1. The email you already get.** Every enquiry notification now has a line near the top that says where the lead came from:

```
channel: instagram / bio
medium: social
landing_page: /scorecard
```

`instagram / bio` means they came from the link in your Instagram bio. `linkedin / profile` means the website link on your LinkedIn profile. `linkedin / profile-button` is the button on your profile, `linkedin / featured` is your Featured section, `email / email-signature` is the link in your email signature. If those lines are missing entirely, the person arrived without a tagged link: they typed the address in, found you on Google, or came from a link you shared before this was set up. That is normal and will shrink as the tagged links spread.

**2. The dashboard.** At `srjinternational.co.uk/admin` the same information sits at the top of each lead's message, so you can scan the whole list without opening emails. The CSV export includes it too.

**3. Google Analytics, for counting rather than reading.** Emil's GA4 now receives a `generate_lead` event with the source on it every time someone submits a form. That is the place to answer "which of my links is working", as opposed to "where did this one person come from". It only counts visitors who accepted cookies, so treat it as a trend, not a total, and treat the emails as the real record.

**One thing to be careful of.** Attribution is first touch: whichever tagged link brought someone to the site is the one credited, even if they come back a week later through Google and enquire then. That is the honest answer to "which link earns me work". It also means the count is per browser session, so someone who reads on their phone and enquires later on a laptop shows up as two separate stories. At this volume, read the emails as the record of truth and use GA4 for the pattern.
