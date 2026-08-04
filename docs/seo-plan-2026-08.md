# SRJ International: SEO plan, August 2026

The next iteration of [the AEO master plan](./aeo-master-plan-2026-07.md), not a
replacement for it. Two things are new since that was written: 20 days of real
Search Console data, and a pass through the methodology in
`~/Desktop/business/SEO-Resources` (GEO/AEO/LLMO research, the E-E-A-T framework,
topical authority, local SEO).

Same guardrails as everything else on this brand: Simon's own positions plus
paraphrased or cited HMRC, never invented tax advice or figures, no em dashes,
hype tempered for a regulated CIOT / ICAEW / ASA business.

---

## 1. The baseline, so we can tell whether any of this worked

Search Console, 14 July to 2 August 2026. Note the export is labelled "last 3
months" but data only starts on 14 July, so this is 20 days.

| Metric | Value |
| --- | --- |
| Impressions | 354 |
| Clicks | 1 |
| Average position | 42 |
| Impressions, first week vs last week | about 10/day, rising to about 26/day |
| Share of impressions from ICP commercial queries | roughly 45% |
| Impressions on the Dubai / UAE cluster | 44 |
| Top page | `/accountants-for-digital-marketing-agencies`, 154 impressions, position 62 |

Re-measure on 4 September 2026 against these exact numbers.

## 2. The diagnosis

**Relevance is solved. Corroboration is not.**

Update, 4 August, from the competitor study, and it is the most encouraging fact
in any of these documents. The firm beating SRJ hardest is Alto Accounting, whose
domain was registered on 4 January 2025. SRJ's was registered on 2 March 2026.
Both dates verified by whois. Alto is fourteen months older, not ten years, and
it holds SRJ's exact query set including a Wallington page. Meanwhile Raedan has
been running since February 2012 with six overlapping agency pages and is not
winning. So the moat is not domain age. Alto's lead is architecture and corpus
volume: 322 URLs, 19 city pages, 227 insight posts, 12 calculators. That is
replicable, and considerably faster than "wait for the domain to age".

Google is already matching SRJ to the right commercial queries: accountants for
media, marketing, digital, branding, PR, creative and advertising agencies. That
is the hard half of the problem and it is done. Every one of those queries sits
at position 50 to 83.

A site that is topically correct and uniformly buried does not have a content
problem. It has an authority problem. The July AEO plan predicted this in Part H
("on-page makes us liftable, off-page makes AI confident enough to name us") and
listed it as ongoing background work. The Search Console data promotes it to the
binding constraint. Nothing else in this document moves the numbers if Part H
stays open.

The second finding is a correction to an assumption. Google has picked **one**
URL to represent the whole "accountants for X agencies" cluster, and the other
three subtype pages get almost no impressions. So the answer to the missing
verticals, media agencies especially, is not three more subtype pages yet. More
near-identical pages split a signal Google is already trying to consolidate. The
architecture from the July plan is sound; it just cannot outrank anyone until the
domain is trusted.

## 3. Already built, do not redo

Checking the site against the SEO-Resources checklists, the technical and schema
layer is in good shape:

- Schema in place: AccountingService, Person (jobTitle, alumniOf PwC, knowsAbout,
  sameAs), Service per landing page, FAQPage, BreadcrumbList, BlogPosting,
  ProfilePage, Organization. Part F of the July plan is substantially done.
- `public/llms.txt` exists and is maintained.
- IndexNow submission wired up, which matters because the AI engines read Bing.
- Robots allows the AI crawlers.
- FAQ blocks with FAQPage schema on posts and landing pages.
- Every gov.uk citation verified, which is exactly the "authoritative citations"
  signal the GEO research rates highest.
- A blog queue that publishes twice a day without anyone remembering to, which
  covers the freshness cadence the GEO checklist asks for.

## 4. The plan

Four workstreams, in priority order. W1 is the constraint, W2 is cheap and
YMYL-specific, W3 compounds, W4 is discipline more than work.

### W1: Authority and corroboration (the constraint)

Mostly Hazem and Simon actions, not code. Highest leverage first.

- [ ] **CIOT "Find a Chartered Tax Adviser" register.** ChatGPT's most-cited
      source in the earlier teardown. Simon is a CTA. Specialism set to marketing
      agencies. This is the single highest-value listing available.
- [ ] **ICAEW "Find a Chartered Accountant" directory.** Simon is ACA.
- [ ] **Google Business Profile, claimed, fully completed, then reviews.**
      Rivals have 100+ reviews and SRJ has a gap. This also serves the local
      intent showing up in the data ("accountant for digital agencies near me",
      9 impressions at position 21, plus a Wallington and a London variant).
      The local SEO checklist wants every field filled, weekly posts, and all
      reviews answered inside 48 hours.
- [ ] **Review generation as a system, not a one-off.** A named ask at a fixed
      point in the client cycle. This is the slowest-compounding item, so it
      should start first.
- [ ] Directories: unbiased.co.uk, Clutch, UpCity. NAP identical everywhere,
      which the local checklist is emphatic about.
- [ ] Outreach for "best accountants for marketing agencies UK" listicles.
- [ ] Simon's LinkedIn carrying the exact phrase "Chartered Tax Adviser for UK
      marketing agencies", linked to the money page.
- [ ] Genuine community presence where agency owners actually ask, which is
      Reddit and LinkedIn rather than forums nobody reads.

See memory `srj-aeo-offsite-footprint` and
[the off-site listings pack](./off-site-listings-pack-2026-07.md).

### W2: Make E-E-A-T visible, not just structural

The E-E-A-T framework's blunt finding is that author bios are now ranking
infrastructure rather than optional metadata, and that sites adding structured
author pages with verifiable credentials saw measurable gains after the December
2025 core update. For a YMYL finance brand this is the highest-fit on-site work
available.

The gap: Simon is named as author in `BlogPosting` schema on every post, but a
reader sees no byline, no photo, no credentials and no bio anywhere on a post.
The machines are told; the humans and the quality raters are not.

- [ ] **Author byline block on every post.** Simon's name, photo, CTA and ACA,
      ex-PwC, one line of bio, linked to `/about`. Top of the post or directly
      under the title.
- [ ] **Author bio block at the foot of every post**, fuller version, with the
      links to LinkedIn and the ICAEW profile that the schema already carries.
- [ ] **An editorial and review policy page.** The finance and legal section of
      the E-E-A-T framework asks specifically for a published editorial policy,
      clear disclosures and a content review schedule. For this brand it writes
      itself and it is true: posts are built from Simon's own positions, HMRC is
      cited not paraphrased loosely, every gov.uk link is verified, figures are
      not invented, nothing is advice on a reader's own facts. Publishing that
      process is a trust signal competitors will not copy.
- [ ] **A visible "reviewed by Simon Jacobs, CTA ACA" line** with a date on posts
      that carry technical content.
- [ ] **Surface the "last updated" date** more prominently where `updated` is set.

### W3: GEO and AEO extraction upgrades

From the GEO research, the tactics with the largest measured visibility lift are
authoritative citations (+31.4%), statistics and data points, and direct expert
quotation. SRJ already does the first properly. The other two are underused, and
the extraction furniture is missing.

- [ ] **Quick answer block above the fold** on posts and landing pages: a two or
      three sentence direct answer before the body. This is what gets lifted into
      AI Overviews and it is currently absent.
- [ ] **Comparison tables** where a post is genuinely a comparison. Several
      queued posts are structurally "X vs Y" (client versus staff entertaining,
      capital allowances versus mileage, avoidance versus evasion) and a table is
      the format AI engines extract most reliably.
- [ ] **Prompt-aligned FAQ headings.** Match the exact phrasing people type into
      ChatGPT rather than tidy editorial phrasing.
- [ ] **Definition blocks** at the head of each section for the terms that carry
      the topic: wholly and exclusively, trivial benefits, BADR, AIA.
- [ ] Keep `llms.txt` current as each queued post lands, with a liftable
      one-line description per URL.
- [ ] **Monthly prompt audit.** Re-run the four ChatGPT and Gemini prompts, log
      whether SRJ is cited and in which position. That is the only real
      measurement of whether any of the AEO work is landing.

### W4: Architecture discipline

- [ ] **Strengthen the page Google already chose** rather than adding siblings.
      Fold media, PR, branding and social media agency language into
      `/accountants-for-digital-marketing-agencies` and the main money page,
      where those queries already produce impressions.
- [ ] **Build `/accountants-for-media-agencies`, and only that one.** Revised
      4 August on competitor evidence (see
      [the competitor gap study](./competitor-keyword-gap-2026-08.md)). It is
      SRJ's single biggest query at 20 impressions, and not one of the 14
      competitors studied has a dedicated page for it. Sidekick's "media" pages
      are all social media. This is the cleanest open lane on the board and it
      earns the exception to the consolidate rule.
- [ ] **Hold PR and branding as sections of the hub, not as pages.** Same
      evidence: Alto's 16 vertical pages are template clones of 867 to 923 words
      with byte-identical H2s, and they rank on the 227 insight posts beneath
      them rather than on their own merit. Raedan is the control experiment, six
      overlapping agency URLs on a 14 year old domain, not winning.
- [ ] **A UK to UAE page is the one genuine gap.** 44 impressions with no
      dedicated page, served entirely by one blog post at position 37. Flag
      before building: those queries are mostly individuals moving abroad, not
      agency owners, so this is adjacent to the ICP rather than in it. Hazem's
      call whether SRJ wants that traffic.
- [ ] **301 www to the apex.** Four URLs are indexed on `www` alongside the apex.
      Canonicals are correct so Google will mostly consolidate, but `www`
      currently returns 200 rather than redirecting.
- [ ] Internal linking: every queued post should link up to a money page, and
      money pages should link down to the strongest posts in their cluster. The
      topical authority method is bidirectional, and right now the links mostly
      run one way.

## 5. Deliberately not doing yet

- **Title and meta description CTR work.** Meaningless when almost nothing is on
  page one. Revisit when positions move under 20.
- **More subtype landing pages.** See W4.
- **Programmatic or city pages.** Nothing to templatise until one page proves it
  can rank.
- **New keyword research.** The Search Console query list is better evidence than
  any tool would give us, and the July topic map is not exhausted.
- **The log file analysis and n8n automation in the resource repo.** Both are
  good, both are for sites with traffic. 354 impressions does not justify either.

## 6. Cadence

| When | What |
| --- | --- |
| Weekly | Blog queue keeps draining twice a day. Top up the queue before it empties. |
| Weekly | One W1 off-site item completed. It is a list of about eight, so about two months. |
| Monthly | Prompt audit across ChatGPT, Gemini, Perplexity. Log citations. |
| Monthly | Search Console pull, compared against the section 1 baseline. |
| 4 Sep 2026 | First real comparison point. Judge W1 by position change on the ICP cluster, not by clicks. |

## 7. What success looks like at the next check

Not clicks. At position 42 average, clicks are noise. The honest signals for
early September:

1. ICP commercial queries moving from position 50 to 80 into the 20s and 30s.
2. `/accountants-for-digital-marketing-agencies` moving off position 62.
3. SRJ appearing in at least one of the monthly AI prompt runs.
4. Impressions continuing to compound as the queue publishes.
5. A Google Business Profile that exists and has reviews on it.

If W1 gets done and positions have not moved by early October, the diagnosis was
wrong and we revisit the architecture. That is the falsifiable version.
