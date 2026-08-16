# Repositioning SRJ from agency specialist to general practice, August 2026

Written 15 August 2026, after Simon asked to move off "accountants for marketing
agencies" and position as a general accountancy practice.

Short version: the data supports him, and it supports him more strongly than he
probably realises. But "general" has a winning version and a losing version, and
the difference between them is the whole plan. This document argues for the
winning version, lays out the migration in an order that does not throw away the
only search traction the site has, and flags the two decisions only Simon can
make.

---

## 1. The case for the pivot, from evidence already on file

Four findings, none of which required new research. All of them were sitting in
the repo and the Search Console export.

### 1.1 The niche is not ranking, and the general terms are

Search Console, 20 days to 4 August 2026, 354 impressions. Every single
agency-intent query is buried:

| Query | Impressions | Position |
| --- | --- | --- |
| accountants for media agencies | 20 | 71.6 |
| accounting services for media agency | 16 | 83.0 |
| accountants for marketing agencies | 11 | 59.2 |
| accountants for marketing agency | 10 | 70.2 |
| accountants for branding agencies | 10 | 72.5 |
| accountants for creative agencies | 4 | 73.0 |

Now the best non-brand positions on the entire property:

| Query | Impressions | Position |
| --- | --- | --- |
| international business tax consultants | 1 | **3.0** |
| international tax consulting | 1 | **7.0** |
| international business tax adviser | 1 | **11.0** |
| uk to dubai tax advice | 19 | 38.6 |
| uk to uae tax planning | 16 | 39.1 |
| tax consultant for british expats dubai | 6 | 43.7 |

The single-impression queries at positions 3, 7 and 11 are statistically noise on
their own and should not be over-read. But they point the same direction as the
Dubai and UAE cluster, which is roughly 43 impressions sitting 20 to 30 positions
better than anything agency-related. The site is closer to ranking for
cross-border tax, which nobody planned, than for the niche it was built around.

The firm is called SRJ **International**. The name has been fighting the
positioning for five months.

### 1.2 Simon's own clients are already general

The three testimonials published on the site are from:

- a digital marketing agency
- **a dentist**
- **a landlord**

Two of the three public proof points contradict the niche. The site was spending
its best social proof apologising for itself.

### 1.3 Simon's own content is already general

Of 44 published posts, 28 are agency-framed and **16 are general**. Of the 10
still scheduled, 5 are general. These are built from Simon's own Telegram
captions, which is to say they reflect what he actually chooses to talk about:
the high income child benefit charge, capital gains on gold, private residence
relief, what to do when you lose a receipt, EMI share options, side hustle sole
trader or limited company, tax when you move abroad.

None of that is agency content. Left alone, Simon produces general practice
content, and it was being bolted onto a brand that had no place to put it.

The service list in `src/lib/content.ts` tells the same story. Corporation tax,
accounts preparation, VAT and CIS, payroll, company secretarial,
self-assessment, bookkeeping. That is a general compliance practice with one
sentence of agency flavour added to the VAT line.

### 1.4 The firms that win this market are general practices with sector pages

From `competitor-keyword-gap-2026-08.md`, which studied 14 competitors:

| Firm | Structure |
| --- | --- |
| Alto | 16 vertical pages on top of 227 insight articles |
| Sidekick | 10 sector pages on top of 1,128 insight pages |
| SRLV | 13 industries, general chartered practice |
| A&C | agencies is 1 sector out of 15 |
| Goodman Jones | general practice, 24 named client stories |

Not one of them is a single-vertical firm. SRJ is the outlier. The study's own
conclusion was that Alto's thin 867-word vertical pages rank **because of the
general corpus underneath them**, not on their own merit, and that SRJ had built
the harvesting layer without the earning layer. SRJ's ratio is 5.5 supporting
posts per vertical page against Alto's 14 and Sidekick's 113.

Going general is not a retreat from that plan. It is the missing half of it.

### 1.5 Why this unblocks the actual constraint

The August SEO plan concluded that relevance is solved and the binding
constraint is off-site authority plus corpus mass. Under a niche-only brand,
every general post Simon wrote was off-strategy and had to be justified. Under a
general brand, the same posts are core inventory. The pivot converts work he is
already doing from a distraction into the thing the plan says is missing.

---

## 2. The risk, stated plainly

General has a losing version, and it is the obvious one: become "SRJ
International, Chartered Accountants, London", competing for "accountant London"
against firms with 15-year domains and 137 Google reviews. That query is
unwinnable and the AEO edge disappears with it. The reason ChatGPT names Simon
at all today is specificity.

The whole point of the niche was that specificity beats domain age. That logic
was correct. What was wrong was the choice of specific thing: marketing agencies
was a lane Simon picked, while cross-border tax is a lane the market and his own
credential were already handing him.

**So the rule for everything below: general practice, specific spikes.** Broad
enough to take any decent UK client, sharp enough that there is always a reason
to name Simon rather than a firm down the road.

---

## 3. Recommended positioning

> **A chartered tax adviser running a full accountancy practice, for UK business
> owners whose tax is more complicated than their accountant is equipped for.**

Three spikes, ranked by evidence:

**Spike 1: international and cross-border tax.** Strongest evidence in the
dataset. Roughly 43 impressions already, best non-brand positions on the site,
the firm name supports it, and it is squarely Chartered Tax Adviser territory
where the ACCA bookkeeper competitors cannot follow. The August study called the
UK-to-Dubai angle "the strongest defensible lane in the report" and noted every
competitor covering it is mis-angled at company formation rather than personal
UK tax consequences.

**Spike 2: exit and business sale planning.** Simon's ex-PwC and CTA credentials
fit it, it is high value work, and it is the natural top of a general practice
funnel. Caveat from the August study: this lane is no longer empty. Alto has 9
exit pages, Rise has 12. Contested but credible.

**Spike 3: sectors, with agencies as the first of several.** Agencies stay. They
become one named sector rather than the entire brand, which is exactly how every
winning competitor structures it. Dentists and landlords are the obvious next two
because Simon already has proof in both.

The general practice is the base that catches everything else and gives the
spikes something to sit on.

---

## 4. Migration plan

Ordered so that nothing already ranking gets damaged. This matters: the agency
pages hold essentially all of the site's impressions, and they are the asset
being restructured.

### Phase 0: decisions (Simon, blocking)

Two questions in section 6. Phase 1 can start without them; phases 2 and 5
cannot.

### Phase 1: rebuild the general core

The niche language is more shallow than it looks. Grep across `src/` finds about
350 occurrences of "agenc", but 230 of them are inside the five vertical landing
pages. The core pages carry 7 to 12 each. This is a copy job, not a rebuild.

Files to change:

- `src/lib/content.ts` (41 hits, the main one: `tagline`, hero `titleAccent` and
  `sub`, the scorecard questions, the "who this is for" list, the FAQ block)
- `src/app/page.tsx`, `src/app/services/page.tsx`, `src/app/about/page.tsx`,
  `src/app/results/page.tsx`
- `src/app/layout.tsx` (12 hits, including the org JSON-LD `description`)
- `src/components/SiteFooter.tsx`, `ContactForm.tsx`, `ScorecardForm.tsx`
- `src/lib/emailTemplates.ts` (6 hits, the welcome and sequence emails)

Specific moves:

1. Hero stops saying "marketing agencies" and starts saying what Simon does.
   The `RotatingWord` component already exists and can rotate the client type
   instead of deleting it, which keeps the sector signals on the homepage
   without narrowing the promise.
2. Services page becomes the general compliance list it already is, with the
   sector and spike pages linked from it.
3. Scorecard questions get de-agencied. Currently four of them say "agency"
   outright. They work fine as general business questions.
4. Testimonials stop being an embarrassment. Dentist and landlord become
   evidence of range instead of noise.
5. Nav gains a Sectors entry.

### Phase 2: restructure the vertical pages, do not delete them

**Do not 301 the four agency pages into oblivion.** They carry the only
impressions the site has. The August study already recommended consolidating
them for a different reason (they cannibalise each other, all five sitting at
50 to 83 while Google picks one), and that recommendation gets easier under a
general brand, not harder.

- Keep `/accountants-for-digital-marketing-agencies` as the canonical agency
  hub. Google has already chosen it: 44% of all site impressions.
- Expand it to 2,500 to 3,000 words, absorbing creative, advertising, PR and
  branding as named sections with their own FAQ entries.
- 301 `/accountants-for-marketing-agencies`, `/accountants-for-creative-agencies`
  and `/accountants-for-advertising-agencies` into it. Consolidating four split
  signals into one is a gain regardless of the repositioning.
- Leave `/chartered-tax-adviser-london-marketing-agencies` alone for now and
  reassess once the hub moves.
- Introduce `/sectors/` as the parent. The agency hub sits under it alongside
  new sector pages as they are built.
- Build `/sectors/media-agencies`. This was already the number one ranked
  opportunity: SRJ's single highest-impression query at 20, and zero dedicated
  pages across all 14 competitors studied.

Ship the 301s in the same deploy as the expanded hub, submit through IndexNow,
and expect a 4 to 8 week wobble before positions settle. That wobble is the cost
of the pivot and it is worth paying now rather than at three times the page
count.

### Phase 3: build the international spike

This is the highest-value new construction and it should not wait behind the
sector work.

- `/international-tax` as a money page hub, angled at the gap nobody occupies:
  UK tax consequences for people and businesses moving out of or into the UK.
  Not company formation, which Rise owns and is the wrong intent anyway.
- A UK-to-UAE and Dubai page underneath it. Four existing queries, roughly 41
  impressions, no landing page at all today, only blog posts.
- The supporting cluster the study identified: statutory residence test, split
  year treatment, the FIG regime, overseas workday relief. Only three of 14
  competitors touch these and they are all CTA territory.
- The three existing Dubai and moving-abroad blog posts get linked into the hub
  rather than floating loose.

Open question from the earlier handover, now answered: yes, build the
UK-to-UAE page. The objection was that those searchers are individuals rather
than agency owners, so they sit outside the ICP. Under a general practice the
ICP includes them, and this was the best evidence in the file.

### Phase 4: corpus, credibility, off-site

Unchanged from the August plan, but now unblocked.

- **Keep the blog queue running.** It empties 20 August. Under the general
  positioning the caption backlog that was previously rejected as off-ICP
  becomes usable, which should make topping up considerably easier.
- **Visible E-E-A-T**, still the cheapest on-site win and still not done. Simon
  is in `BlogPosting` schema on every post but there is no visible byline, photo,
  credential line or bio anywhere. Add byline, author bio block, and an editorial
  policy page. This matters more under a general positioning, not less: when the
  niche stops doing the differentiating, the named chartered adviser has to.
- **Calculators.** 34 across four competitors, and Alto's 12 are its main
  link-earning layer. A statutory residence day counter now supports spike 1
  directly.
- **Off-site remains the binding constraint** and remains Simon's job: Google
  Business Profile and reviews, the CIOT firms register, the ICAEW firm
  directory, the two pitchable roundups. Going general widens which directories
  and listicles are relevant, which helps here.
- `knowsAbout` on the `AccountingService` schema should be rewritten to the new
  spread.

### Phase 5: identity

Covered in section 5.

### Sequencing

| Phase | Depends on | Rough size |
| --- | --- | --- |
| 1 core copy | nothing | one working session |
| 2 sector restructure | Q1 answered | one session plus the hub rewrite |
| 3 international spike | nothing | two sessions, mostly writing |
| 4 corpus and E-E-A-T | ongoing | continuous |
| 5 logo | Q2 answered | separate |

Phases 1 and 3 can run immediately and in parallel. Phase 2 needs the naming
call because it decides the URL parent.

---

## 5. The logo

### What exists today

There is no logo. The header renders the plain text string "SRJ International"
in Georgia bold at 26px. The only files in `public/logo/` are an SVG containing
the word "SRJ" set in **Arial**, and PNG exports of the same. Georgia and Arial
are both system fallbacks, so the brand currently has no typographic identity at
all.

The colour palette does exist and is decent: ink `#08131F`, accent `#2F6FC6`,
seafoam `#9FE7DC`, teal `#1A8275` on a cool off-white `#F6FAFC`.

### The problem the logo has to solve

"SRJ" is a weak brand token and always was. The AEO diagnosis from July found
that the name collides with SRJ Chartered Professional Accountants in Toronto,
which is the same profession, plus an IT firm and a freight company. The Search
Console export shows the collision live: the site picks up impressions for "srj
convenience" and "sr&i".

Meanwhile the entity that actually ranks for Simon is **Simon Jacobs**. His
LinkedIn and ICAEW profiles outrank his own website. The About page already
carries "(previously Jacobs Taxes)" and the org schema already declares
`alternateName: "Jacobs Taxes"`.

Three initials that collide with a same-profession competitor is a bad asset to
build an identity on, and the repositioning is the natural moment to fix it.

### Direction

Conservative and typographic. This is a regulated CIOT and ICAEW brand in a YMYL
category, so nothing playful, no abstract swoosh, no gratuitous geometry. What
it needs to do is look like a chartered practice rather than a startup, hold up
at 26px in a header and on a letterhead, and work in one colour.

Recommended: a wordmark leading on **Jacobs**, with a real typeface rather than
Georgia, plus a compact monogram for the favicon and social avatars. Concepts to
follow separately as SVGs so they can be judged rather than described.

---

## 6. Decisions for Simon

**Q1. How far does the name move?** This is the one that gates the URL
structure and the logo.

- *Keep SRJ International as-is.* Zero migration risk. Keeps the collision and
  keeps the weak token.
- *Lead with Jacobs, retain SRJ International Limited as the legal entity.*
  Recommended. The site becomes "Jacobs" or similar in the wordmark and H1s while
  the company, invoices and engagement letters are untouched. Captures the entity
  that already ranks, no legal work, reversible.
- *Full rename including the domain.* Highest upside on brand ownability,
  highest cost. A five-month-old domain is cheap to move, which is an argument
  for doing it now if ever, but it discards the GSC history and the IndexNow and
  Bing work.

**Q2. How general is general?** Confirm the three spikes are right. In
particular, is Simon willing to take dentists, landlords and other owner-managed
businesses as core clients rather than as exceptions, given his own testimonials
are already two-thirds that? And is the international lane something he wants to
be known for, or is it accidental traffic he has no appetite to serve?

Q2 is the more important of the two. Everything in section 3 assumes the answer
is yes to both.

**Not a decision, just a warning:** expect positions to move around for 4 to 8
weeks after phase 2 ships. The site is small and young enough that this is
survivable, and it gets more expensive the longer it is deferred.

---

## 7. What this supersedes

- The ICP in `docs/ideal-client-profile.md` and the header comment in
  `src/lib/content.ts` both define the client as founder-led UK marketing
  agencies at £500k to £5m. Both need rewriting once Q2 is answered.
- The August study's "do not chase freelancers and sole traders, off-ICP" line
  no longer applies. Under a general practice they are prospects. The rest of
  that study's do-not-chase list still stands, particularly Making Tax Digital
  and Dubai company formation.
- The earlier instruction not to add subtype pages still stands and gets
  stronger. Consolidate first, then add sectors deliberately, one at a time,
  each with a reason.
