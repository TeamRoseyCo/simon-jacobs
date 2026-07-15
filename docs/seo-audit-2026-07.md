# SEO Audit — SRJ International (srjinternational.co.uk)

_Date: 2026-07-15 · Framework: SEO-Resources `skills/seo-audit` · Auditor: source-level review of the Next.js codebase_

## Scope & method

This is a **pre-launch, source-level audit** of the Next.js site. I read the actual
route/metadata/schema code rather than a live crawl, which is more reliable for schema
and metadata than `web_fetch` (which can't see JS-injected JSON-LD).

**Out of scope until the site is live** (can't be measured yet, revisit post go-live):
- Real Core Web Vitals / PageSpeed (needs a deployed URL)
- Google Search Console coverage & index status
- Backlink / authority profile
- Live schema validation via Rich Results Test

---

## Executive summary

The technical foundation is **well above average for a pre-launch site**. Metadata,
canonicals, sitemap, and three schema types are already in place, and every image is
optimised. This is not a "start from zero" job.

**Top priorities:**
1. **Fix the robots.ts domain mismatch** (Critical — breaks sitemap discovery)
2. **Add an H1 to the homepage** (High — the top page has no primary heading)
3. **Trim 5 over-length title tags** (High — truncated in search results)
4. **Gate GA4 behind consent** (High — UK PECR/GDPR + it's a launch blocker)
5. **Strengthen E-E-A-T for a YMYL niche** (Medium — tax is "Your Money Your Life"; Google demands higher trust signals)

**Decision needed from Simon:** is the canonical domain `srjinternational.co.uk` or
`simonjacobs.co.uk`? The whole site uses the former; robots.ts is the lone outlier. See TECH-1.

---

## Technical SEO findings

### TECH-1 — robots.ts advertises the sitemap on the wrong domain · Impact: HIGH · Priority: 1
- **Evidence:** `src/app/robots.ts` sets `siteUrl = "https://simonjacobs.co.uk"` and emits
  `sitemap: https://simonjacobs.co.uk/sitemap.xml`. Everything else — `layout.tsx`
  `metadataBase`, `sitemap.ts`, all emails, all legal pages — uses `srjinternational.co.uk`.
- **Why it matters:** crawlers read robots.txt to find the sitemap. Pointed at the wrong
  host, sitemap discovery fails (or points at a domain you may not control).
- **Fix:** change robots.ts `siteUrl` to `https://srjinternational.co.uk`. **First, confirm
  with Simon which domain is canonical** — if he owns and prefers simonjacobs.co.uk, the fix
  runs the other way and the rest of the site needs updating + a 301 strategy.

### TECH-2 — Google Search Console not yet connected · Impact: HIGH · Priority: 1 (at launch)
- **Evidence:** pre-launch; DNS not yet pointed per project notes.
- **Fix:** at go-live, verify the domain in GSC, submit `sitemap.xml`, request indexing on
  key pages. Nothing gets measured until this exists. Also add Bing Webmaster Tools.

### TECH-3 — HTTPS / mobile / crawlability · Impact: PASS
- Canonical HTTPS domain, Tailwind responsive layout, `robots` set to `index, follow` with
  `max-image-preview: large`. Sitemap includes all static routes + blog posts with sensible
  priorities. No blocking issues found.

---

## On-page SEO findings

### PAGE-1 — Homepage H1 · Impact: PASS (corrected on verification)
- **Correction:** initial finding was a false positive. The homepage H1 lives in the
  `<Hero />` component (`src/components/Hero.tsx` line 21: "Tax, profit and accounts for UK
  marketing agencies"), not inline in `page.tsx`. One keyword-bearing H1 is present. No fix needed.

### PAGE-2 — Five title tags exceed 60 characters · Impact: MEDIUM–HIGH · Priority: 2
- **Evidence (chars incl. `| SRJ International` template, ~19 chars):**
  home 68, about 76, services 82, blog 66, scorecard 78. Google truncates ~60.
- **Fix:** tighten titles so front-loaded keywords survive truncation. e.g. services →
  "Tax planning & profit extraction for agencies" (fits with suffix). Consider dropping the
  brand suffix on the longest pages (Google appends the brand anyway).

### PAGE-3 — Scorecard H1 · Impact: PASS (corrected on verification)
- **Correction:** false positive. The intro/start screen renders an `<h1>` ("The Profit-Rich
  Scorecard") at `components/ScorecardForm.tsx` line 194; the line-99 `<h2>` is the post-submit
  success state. Initial view has a proper H1. No fix needed.

### PAGE-4 — Metadata coverage · Impact: PASS
- Every public page has a **unique** title, description, and self-referencing canonical.
  `metadataBase`, OpenGraph, and Twitter cards all set in `layout.tsx`. Blog uses
  `generateMetadata` with per-post title/excerpt/canonical. This is done well.

### PAGE-5 — Images · Impact: PASS
- All 5 images use `next/image` (auto WebP, lazy load, responsive). No raw `<img>`. No missing
  alt text detected.

---

## Content & E-E-A-T findings

### CONTENT-1 — Blog posts are thin · Impact: MEDIUM · Priority: 3
- **Evidence:** 9 posts in `src/lib/posts.ts`; bodies average roughly 150–200 words each
  (`body: string[]` short-note format).
- **Why it matters:** short notes rarely rank for competitive queries; ranking content is
  usually 800–1,500+ words that fully answer intent.
- **Fix (choose per strategy):** either (a) keep these as fast brand "notes" and build a few
  dedicated long-form **pillar pages** for target keywords, or (b) expand the 2–3
  highest-intent posts (e.g. "how much should agency founders pay themselves", "VAT for
  agencies") into comprehensive guides. Recommend (a) — don't dilute the voice; add pillars.

### CONTENT-2 — E-E-A-T weak for a YMYL niche · Impact: MEDIUM · Priority: 3
- **Context:** tax advice is **YMYL** (Your Money or Your Life) — Google applies a higher
  E-E-A-T bar. Simon's credentials (CTA · ACA · ex-PwC) are a genuine ranking asset and are
  under-exploited in structured signals.
- **Evidence:** `BlogPosting` schema uses `author: { @type: Organization }` — no named human
  expert. No `Person` schema for Simon. `AccountingService` schema omits `founder`, `sameAs`,
  `address`, `priceRange`.
- **Fix:** add a `Person` entity for Simon Jacobs (jobTitle, credentials, sameAs → LinkedIn),
  set him as `author` on posts and `founder` on the org, and enrich `AccountingService` with
  `address`, `sameAs`, `priceRange`. Surface the credentials visibly on an author/about block.

---

## Schema / structured data findings

### SCHEMA-1 — Good coverage already present · Impact: PASS
- `AccountingService` (layout, sitewide), `FAQPage` (faq page), `BlogPosting` (blog posts).

### SCHEMA-2 — AccountingService is minimal · Impact: MEDIUM · Priority: 3
- **Missing:** `address`/`postalAddress`, `sameAs` (LinkedIn/socials), `priceRange`,
  `founder`, `areaServed` is present but could be more specific.
- **Fix:** enrich per CONTENT-2. For a professional service, `sameAs` + `founder` +
  `address` materially strengthen the entity in Google's Knowledge Graph.

### SCHEMA-3 — Opportunities · Impact: LOW · Priority: 4
- Add `BreadcrumbList` to blog posts; give posts dedicated OG images (currently default).

---

## AI search (GEO/AEO) findings

### AI-1 — No llms.txt · Impact: LOW (quick win) · Priority: 4
- The repo flags `llms.txt` as a fast, under-adopted win. Add a `/llms.txt` describing the
  site so ChatGPT/Perplexity can parse it. FAQ + clear answer blocks already help AEO.

---

## Compliance (adjacent to analytics-tracking) 

### COMPLY-1 — GA4 fires without consent · Impact: HIGH (launch blocker) · Priority: 2
- **Evidence:** `layout.tsx` loads gtag `G-FJGM7PLZEC` via `<Script strategy="afterInteractive">`
  unconditionally. `components/CookieConsent.tsx` only toggles a banner + a `localStorage`
  flag — it does **not** gate GA, and there's no Google Consent Mode.
- **Why it matters:** UK PECR/GDPR require consent before non-essential analytics cookies.
  This also matches the known launch requirement that GA/Pixel sit behind consent.
- **Fix:** implement **Google Consent Mode v2** — set `analytics_storage: denied` by default,
  update to `granted` on accept. Don't fire config until consent, or use consent-mode defaults.

---

## Prioritised action plan

**1. Critical (do before / at launch):**
- TECH-1 robots.ts domain fix (after confirming canonical domain with Simon)
- COMPLY-1 GA behind consent (Consent Mode v2)
- TECH-2 Search Console verify + submit sitemap (at go-live)

**2. High-impact on-page (this week, pre-launch is fine):**
- PAGE-1 homepage H1
- PAGE-2 trim over-length titles
- PAGE-3 scorecard H1

**3. Authority & content (the billable core — 2–6 weeks):**
- CONTENT-2 / SCHEMA-2 E-E-A-T: Person schema, founder, sameAs, enriched AccountingService
- CONTENT-1 pillar content for target keywords (pairs with keyword research + topical map)

**4. Long-term / quick wins:**
- AI-1 llms.txt · SCHEMA-3 breadcrumbs + blog OG images

---

## Implementation log — 2026-07-15

Applied in this session (verified against `npm run build` output):

- **TECH-1 fixed** — robots.ts now uses `site.url`; `robots.txt` advertises
  `https://srjinternational.co.uk/sitemap.xml`. The domain is now centralised through
  `content.ts`'s `site.url` (robots, sitemap, layout, blog all import it) so the mismatch
  cannot recur. Also added `Disallow: /admin`.
- **PAGE-2 fixed** — home/about/services/blog/scorecard titles trimmed; all 7 public titles
  now ≤ 60 chars including the `| SRJ International` suffix.
- **COMPLY-1 fixed** — Google Consent Mode v2 added. `layout.tsx` sets all storage to
  `denied` (except security) before gtag loads; `CookieConsent` flips analytics/ads/functional
  to `granted` on opt-in and re-applies stored choices for returning visitors. GA no longer
  sets cookies without consent.
- **SCHEMA-2 / CONTENT-2 (partial) done** — `AccountingService` enriched with `@id`,
  `PostalAddress` (10 Northcliffe Drive, N20 8JZ), `sameAs` (LinkedIn + Instagram), and a
  `founder` Person (Simon Jacobs, CTA · ACA, ex-PwC). Blog `BlogPosting` now uses a named
  **Person** author, a `publisher` Organization with logo, `image`, `dateModified`, and
  `mainEntityOfPage`. Added `BreadcrumbList` and OG images to blog posts (SCHEMA-3).
- **AI-1 done** — `public/llms.txt` created per the SEO-Resources format.

**Still open (needs Simon's input or is a separate paid phase):**
- `priceRange` intentionally omitted from schema (no pricing to state yet) — add if desired.
- **CONTENT-1** thin blog posts + keyword research + topical map + pillar content — this is the
  billable content/authority phase, not done here.
- **TECH-2** GSC/Bing verification + sitemap submission — do at go-live once DNS is pointed.

## What's already strong (don't touch)
Unique metadata + canonicals sitewide · metadataBase/OG/Twitter · AccountingService +
FAQPage + BlogPosting schema · all images via next/image with alt · sitemap incl. posts ·
responsive · index/follow robots. Solid base — the work now is authority + content, not plumbing.
