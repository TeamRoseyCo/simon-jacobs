# SRJ International: AEO / SEO Master Plan (2026-07)

The goal: become the answer AI engines (ChatGPT, Gemini, Perplexity) and Google
give when someone looks for a tax adviser for a UK marketing / creative /
advertising agency. Built from real data: the 54 "People also ask" questions
harvested from Google, and the internal search queries ChatGPT actually ran.

Guardrails on everything below: SAFE METHOD only (Simon's own positions +
paraphrased/cited HMRC, never invented tax advice or figures), no em dashes,
hype tempered for a regulated (CIOT/ICAEW/ASA) brand.

---

## 1. What we learned (the evidence)

**ChatGPT's internal queries** for "tax adviser for marketing/creative/advertising
agency" consistently combined: `UK` + `chartered tax adviser / CTA` +
`marketing / creative / advertising agencies`. It rarely used "accountant". It
treated "creative agency" and "advertising agency" as distinct phrases.

**SRJ was not cited** in any of the four runs. Cited instead: alto-accounting.com,
goodmanjones.com (Graeme Blair, CTA), srlv.co.uk, leonandcompany.co.uk,
raedan.co.uk, tax.org.uk (the CIOT register).

**Why they win (page teardown):**
- A page *architecture*: a dedicated landing page per agency subtype
  (marketing / creative / advertising / PPC / PR), not one page.
- A "how to find the best agency accountant" page structured as: What makes a
  good one -> Questions to ask -> Red flags -> Pricing -> How to switch -> FAQ.
- Agency jargon on-page: retainers, project billing, media/ad-spend passthrough,
  WIP, utilisation, IR35, contractor VAT, R&D credits, director remuneration.
- Proof (testimonials / case studies) on the page itself.

**Our edge competitors lack:** a *named* Chartered Tax Adviser (Simon Jacobs,
CTA - ACA - ex-PwC). Alto and Raedan name no individual. Lead with the named
CTA on every page (this is what gets Goodman Jones / Graeme Blair cited).

---

## 2. Part A: Page architecture (the "pages that win")

Model each on `/accountants-for-marketing-agencies` (same shell: hero with named
CTA, agency-specific areas, FAQ + FAQPage schema, breadcrumb, testimonials,
ConsultCta). Each page must be GENUINELY differentiated (not spun duplicates,
those get treated as doorway pages). Exact-match H1 and title per subtype.

- [ ] `/accountants-for-creative-agencies` - angle: IP / production costs /
      project WIP / creative industry reliefs. H1 "Accountants for creative agencies".
- [ ] `/accountants-for-advertising-agencies` - angle: media buying, ad-spend
      passthrough / rebilling, VAT on media, commission income. H1 "Accountants
      for advertising agencies".
- [ ] `/accountants-for-digital-marketing-agencies` - angle: PPC/paid-media
      passthrough, retainers, SaaS costs, contractor mix. (Wave 2)
- [ ] (later) PR agencies, SEO agencies, and city pages (London first) if the
      subtype pages prove out.

Each subtype page: name Simon (CTA - ACA - ex-PwC) high up, 4-6 subtype-specific
"areas", a 6-8 question FAQ drawn from the PAA list, internal links up to the
main money page and across to relevant blog posts, breadcrumb + FAQPage schema.

## 3. Part A2: The comparison / "best" page

- [ ] Upgrade the blog post `how-to-choose-a-tax-adviser-for-your-marketing-agency`
      OR create a dedicated page, structured like Alto's cited page:
      What makes a good agency tax adviser -> Questions to ask -> Red flags ->
      What pricing looks like -> How to switch -> FAQ. This is what wins "best"
      queries. Keep the named-CTA differentiator front and centre.

---

## 4. Part B: Existing page upgrades

- [ ] Money page: add explicit jargon currently thin or missing (media/ad-spend
      passthrough, WIP, utilisation, contractor VAT alongside the existing IR35).
- [ ] Money page: make Simon's name + CTA-ACA-ex-PwC prominent in the hero (not
      just the eyebrow).
- [ ] Money page: surface a testimonial / case-study proof block on the page
      itself (currently only on /results).
- [ ] Money page FAQ: fold in the high-intent PAA questions mapped in Part E.
- [ ] Home + Services: add internal links to the new subtype pages.
- [ ] About: already strong E-E-A-T; add "knowsAbout" via schema (Part F).

---

## 5. Part C: Blog roadmap (topical depth, from PAA clusters)

Reuse before creating. Existing posts get FAQ add-ons; only gaps become new posts.

**New posts (Wave 1, the moat):**
- [ ] Overseas-client VAT (place of supply, EU/US clients) - our distinctive
      niche. Cite HMRC place-of-supply, keep general.
- [ ] Non-resident / overseas owner of a UK agency - residency, UK-source income.
- [ ] How to reduce your agency's corporation tax - reduce/offset/25%/marginal/£100k.
- [ ] The 60% tax trap - surfaced across 3 seeds; standalone explainer.

**Existing posts get FAQ blocks (Wave 2):**
- [ ] `how-much-should-agency-founders-pay-themselves` - the dividend cluster.
- [ ] `plan-tax-around-your-exit` + `capital-gains-tax-rising-agency-owners` - selling/CGT.
- [ ] `vat-for-agencies` - professional-services rate + exempt services.

**Later (Wave 3):**
- [ ] IR35 / contractors for agencies (dedicated).
- [ ] Sole trader vs limited company for agency founders.
- [ ] Freelancer tax cluster (adjacent; lower priority).

Done already: `how-to-choose-a-tax-adviser-for-your-marketing-agency`.

---

## 6. Part E: FAQ mapping (the 54 PAA questions -> homes)

Every FAQ answer 40-60 words, descriptive not prescriptive (safe method), each
set emits FAQPage schema. Mapping by cluster:

- **Salary vs dividends (10 Qs)** -> money page FAQ + salary/dividends post FAQ.
- **Corporation tax (8 Qs)** -> new corp-tax post FAQ + money page.
- **VAT / overseas clients (8 Qs)** -> new overseas-VAT post + advertising page FAQ.
- **Selling / CGT (6 Qs)** -> exit post FAQ + money page.
- **Non-resident owner (7 Qs)** -> new non-resident post + money page.
- **Cost / do I need one / sole-trader-vs-ltd (7 Qs)** -> money page FAQ + choose-adviser page.
- **60% trap (3 Qs)** -> standalone post.
- **Freelancer/commission (5 Qs)** -> parked freelancer post.

---

## 7. Part F: Schema & technical AEO

- [ ] AccountingService schema: add `areaServed: United Kingdom`, `knowsAbout`
      (agency corporation tax, VAT, profit extraction, non-resident director tax,
      agency exit planning), `founder` (Simon Jacobs, Person, CTA/ACA), `serviceType`.
- [ ] Person schema for Simon (jobTitle Chartered Tax Adviser, alumniOf PwC, sameAs LinkedIn).
- [ ] FAQPage schema on every page/post with an FAQ (already the pattern).
- [ ] BreadcrumbList on every landing page (already the pattern).
- [ ] Service schema per subtype landing page.
- Confirmed OK: robots allows AI bots (GPTBot/OAI-SearchBot not blocked); sitemap auto-includes all routes.

## 8. Part G: llms.txt + sitemap

- [ ] Add every new landing page + blog post to `public/llms.txt` with a clean,
      liftable one-line description (already added: money page + choose-adviser post).
- Sitemap is automatic (sitemap.ts maps all posts + static routes).

---

## 9. Part H: Off-site citations (corroboration - what actually flips ChatGPT)

On-page makes us liftable; off-page makes AI *confident* enough to name us.
These are Hazem/Simon actions, not code. Highest leverage first:
- [ ] CIOT "Find a Chartered Tax Adviser" register (tax.org.uk) - ChatGPT's #1
      source; Simon is a CTA. Complete listing, specialism = marketing agencies.
- [ ] ICAEW "Find a Chartered Accountant" directory (Simon is ACA).
- [ ] Google Business Profile + build reviews (rivals have 100+; SRJ has a gap).
- [ ] Directories: unbiased.co.uk, Clutch, UpCity.
- [ ] Get into "best accountants for marketing agencies UK" listicles (outreach).
- [ ] Simon's LinkedIn optimised with the exact phrases ("Chartered Tax Adviser
      for UK marketing agencies") + link to the money page.
- [ ] Genuine community mentions (Reddit r/agency, r/UKPersonalFinance, LinkedIn).
See memory [[srj-aeo-offsite-footprint]].

---

## 10. Part I: Measurement

- [ ] Monthly: re-run the four ChatGPT + Gemini prompts; log whether SRJ is cited.
- [ ] GSC + Bing: track impressions/position for the target queries and each new page.
- [ ] Track which new pages/posts get indexed (GSC Pages report).

---

## 11. Build sequence (waves)

- **Wave 0 (now):** creative-agency + advertising-agency landing pages; nav +
  llms.txt + schema. (Exact-phrase gaps ChatGPT showed.)
- **Wave 0.5:** money-page upgrades (jargon, named CTA, proof, FAQ) + comparison
  page structure.
- **Wave 1:** the 4 moat blog posts (overseas VAT, non-resident owner, corp tax, 60% trap).
- **Wave 2:** FAQ add-ons to existing posts; digital-marketing subtype page.
- **Wave 3:** IR35/contractor + sole-trader-vs-ltd posts; PR/SEO/city pages if proven.
- **Ongoing (Hazem/Simon):** Part H off-site citations + Part I measurement.
