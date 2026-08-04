# Keyword demand discovery, August 2026

The purpose of this document is narrow. Search Console can only show queries
srjinternational.co.uk already appears for, so it is survivorship-biased and
structurally blind to demand where the site ranks nowhere at all. This is an
attempt to see that blind spot using autocomplete corpora rather than the
site's own impression log.

Companion documents: [the competitor and page-architecture gap](./competitor-keyword-gap-2026-08.md)
(supply side, what rivals have built) and [the August SEO plan](./seo-plan-2026-08.md)
(what we are already doing). This one is the demand side only.

---

## Method, and what it cannot tell you

**What was done.** 159 seed phrases across three rounds, each expanded through
UK-targeted Google autocomplete (`suggestqueries.google.com`, `hl=en-GB&gl=gb`)
and Bing autosuggest (`api.bing.com/osjson.aspx`, `market=en-GB`), using
alphabet soup (a to z appended), suffix modifiers (uk, london, cost, near me,
vs, best, specialist) and question prefixes (how, what, do, does, can, should,
why, is, when, best, cheapest). Roughly 11,800 raw suggestion strings were
collected and deduplicated, then filtered by regex and by hand.

**Three limits, stated plainly.**

1. **Autocomplete proves suggestion, not volume.** A phrase appearing in the
   dropdown means Google or Bing has seen enough real people type it to justify
   completing it, so the query exists and is not invented. It says nothing about
   how many people type it, whether they convert, or whether it is worth a page.
   Every ranking in this document is qualitative and labelled as such. There are
   no volume figures here because we have no volume data. A clearly labelled
   judgement is more honest than a fabricated number.
2. **Bing echoes the seed back.** Bing's first suggestion is very often the query
   as typed. So a phrase marked "G+B" that happens to be one of my own seeds is
   not two independent sources, it is one source plus an echo. Where that matters
   I have marked the evidence column as "seed echo" rather than "both engines".
   DuckDuckGo was checked as a third source and dropped: its autosuggest is
   Bing-derived, so it corroborates nothing.
3. **Google rate-limited us partway through round three.** After roughly 4,500
   requests `suggestqueries.google.com` began returning HTTP 403. Round three
   (comparison, local, brand, pension and corporation-tax stems) therefore rests
   mainly on Bing, which is noisier and skews US. Round three findings are marked
   with lower confidence for that reason, not because they look weaker.

**Also worth saying:** autocomplete is a lagging, popularity-weighted index. It
under-represents genuinely new phrasings and it over-represents anything with a
big generic head term nearby. Both distortions matter below.

Confidence column key: **High** = suggested by both engines independently, clean
UK phrasing, unambiguous ICP. **Medium** = one engine, or UK-clean but ICP
inference required. **Low** = one engine only, or plausible but contaminated by
an adjacent audience.

---

## Coverage baseline used for the "SRJ covers it" column

Live as at 4 August 2026, from the live sitemap: five money pages
(`/accountants-for-marketing-agencies`, `-digital-marketing-agencies`,
`-creative-agencies`, `-advertising-agencies`,
`/chartered-tax-adviser-london-marketing-agencies`) plus `/services`, `/about`,
`/results`, `/scorecard`, `/faq`, and 22 live blog posts. Plus the 31 posts
queued 5 to 20 August in [the backlog](./caption-to-blog-backlog-2026-08.md).

One correction to a note circulating in the docs: `digital-marketing-agency-valuation`
and `digital-marketing-agency-valuation-multiples-2026` are **competitor URLs**
(FE International and Breakwater M&A) cited in `industry-primer.md`. They are
not SRJ pages. SRJ has no valuation page. The only adjacent live post is
`clean-books-higher-valuation`, which is about bookkeeping hygiene, not
valuation methodology.

---

## Group 1: Commercial-shopping intent

Someone actively looking to hire. This is the buyer.

| Query | Intent | SRJ covers it | Confidence UK + ICP |
|---|---|---|---|
| accountants for marketing agencies | Commercial | Yes, money page | High |
| accountants for digital agencies | Commercial | Yes | High |
| accountants for creative agencies | Commercial | Yes | High |
| accountants for advertising agencies | Commercial | Yes | High |
| accountants for media agencies | Commercial | No dedicated page | High |
| accountants for pr agencies / accountants for pr agency | Commercial | No | High |
| accountants for branding agencies | Commercial | No | High |
| **accountants for seo agencies** | Commercial | No | High, both engines |
| **accountants for ppc agencies** | Commercial | No | High, both engines |
| **accountants for design agencies** | Commercial | No | High, both engines |
| **accountants for social media agencies** | Commercial | No | High, both engines |
| **accountants for influencer agencies** | Commercial | No | Medium, ICP drift toward creators |
| **accountants for content creators agency** | Commercial | No | Low, off-ICP creators |
| accountants for recruitment agencies | Commercial | No | Medium UK, off-ICP vertical |
| accountancy for marketing agencies | Commercial | Partial | High |
| accounting for marketing agencies / for digital marketing agency | Commercial | Partial | High |
| bookkeeping for marketing agencies / for digital marketing agencies | Commercial | No | High |
| marketing agency accountant uk / digital agency accountant uk | Commercial | Partial | High |
| creative agency accountant / creative agency accountants | Commercial | Partial | High |
| specialist accountant for agencies / specialist accountants for marketing agencies | Commercial | Partial | High |
| best accountant for creative agencies | Commercial | No | High |
| best accountants for marketing agencies uk | Commercial, listicle | No | Medium, round 3 Bing only |
| best accountants for creative agencies uk | Commercial, listicle | No | Medium, round 3 Bing only |
| tax adviser for marketing agencies / tax advisor for agencies | Commercial | Partial | High |
| tax accountant for marketing agency | Commercial | Partial | High |
| chartered tax adviser marketing agency | Commercial | Yes, London page | High |
| outsourced finance director marketing agency | Commercial, adjacent service | No | Medium |
| agency cfo services uk | Commercial, adjacent service | No | Medium |
| marketing agency financial management | Commercial or informational | No | Medium |
| how much does an accountant cost for a limited company uk | Commercial, price research | No | Medium, generic not agency |
| accountant cost for marketing agency | Commercial, price research | No | Medium, Bing only |
| how to switch accountants / change of accountant letter | Commercial, switching | No | Medium, generic |

The headline here: Google **and** Bing both independently suggest SEO agencies,
PPC agencies, design agencies and social media agencies as vertical
qualifiers, and none of these appear in Search Console at all because SRJ has
no page anywhere near them. Search Console shows media, PR and branding because
some existing page brushes those terms. SEO, PPC, design and social are the part
of the vertical matrix that is genuinely invisible to us.

## Group 2: Problem-aware informational

The owner has a specific tax problem and has not yet decided they need anyone.

| Query cluster | Representative suggested queries | SRJ covers it | Confidence |
|---|---|---|---|
| **VAT principal vs agent** | agency principal vat; agency vs principal vat; vat agency model; disclosed agency vat; undisclosed agency vat; vat treatment of disclosed agency; agency rules for vat; agency commission vat; agency fees vat treatment; recharged expenses vat agency; disbursements vat marketing agency; do marketing agencies charge vat | **GAP.** `vat-for-agencies` and the two queued reclaim posts do not touch principal vs agent | High |
| **Employee ownership trust** | employee ownership trust uk; how does an employee ownership trust work; employee ownership trust valuation; employee ownership trust disadvantages; employee ownership trust pros and cons; employee ownership trust tax exemption; eot vs esop; employee ownership trust marketing agency; sell agency to employees | **GAP.** Nothing live or queued | High for UK, Medium for ICP |
| **BADR mechanics and rate change** | business asset disposal relief lifetime limit; badr rates 2026/27; is business asset disposal relief changing; badr on liquidation; badr mvl; badr excess cash; badr emi shares; how to claim business asset disposal relief; badr anti avoidance | **PARTIAL.** `too-much-cash-in-your-agency-badr` and `plan-tax-around-your-exit` queued/live, no dedicated BADR page | High |
| **Place of supply and reverse charge** | place of supply of services uk; place of supply for advertising; place of supply agent services; place of supply of services reverse charge; reverse charge vat uk services; b2b services reverse charge; reverse charge on professional services | **PARTIAL.** `vat-on-overseas-clients-for-agencies` is live but does not carry the entity language | Medium, heavy DE/IT noise in the corpus |
| **Associated companies / corporation tax thresholds** | associated companies corporation tax; associated companies for corporation tax hmrc; associated company rules corporation tax; associated companies corporation tax rates; qualifying asset holding company hmrc | **GAP.** `sell-your-agency-holdco-or-non-resident` and `giving-away-shares` queued, neither covers associated-company thresholds | Medium to High UK, Medium ICP |
| **Director pension as profit extraction** | best pension for limited company director; company contributions to directors pension; can my company pay into my pension; pension contributions reduce corporation tax; limited company director pension contribution; company pension for directors | **GAP.** Director pay covered via salary and dividends only, pension is absent everywhere | Medium to High UK, High ICP |
| **Reduce corporation tax** | how to reduce corporation tax limited company; how to pay less corporation tax uk; how to lower corporation tax | Yes, `how-to-reduce-your-agencys-corporation-tax` | Medium, generic head term |
| **Management buyout** | what is a management buyout uk; how does a management buyout work uk; management buyout funding options; management buyout vs buy in; financing a management buyout | **GAP** | Medium UK, Medium ICP |
| **Vendor due diligence on a sale** | due diligence when selling a business; sell side due diligence; financial due diligence services; vendor due diligence vs buyer due diligence; due diligence for sale of business | **GAP** | Medium, contaminated by property |
| **Earn-outs** | what are earn outs; what does earn out mean in business; earn out m&a | **GAP** | Low, thin suggestion depth |
| **Creative industries tax relief / AVEC** | creative industries tax relief hmrc; creative industry tax credits; audio visual tax relief; audio-visual expenditure credit avec; video games tax credits | **GAP, but flag before writing** | Medium UK, **Low ICP, see false positives** |
| **R&D tax relief** | r&d tax relief explained; r&d tax relief rates; r&d tax credits and subcontractors; r&d tax credits marketing agency; r&d tax credits creative agency | **PARTIAL.** `seis-rd-credits-emi-reliefs-agencies` queued | Medium |
| **Employment status of freelancers, employer side** | hmrc subcontractor or employee; when does a subcontractor become an employee; freelancer classed as employee; is a freelancer an employee; does ir35 apply to agency workers | Yes, `subcontractors-employment-status-ir35-agency` queued | Medium, heavily contaminated by freelancer-side intent |
| **Agency profitability benchmarks** | are marketing agencies profitable; marketing agency profit margin uk; marketing agency profit margins; marketing agency gross profit; agency financial kpis; what is labour utilisation rate; how to calculate utilisation | **GAP** | Medium UK, High ICP |
| **What to do with company cash** | what to do with cash in my limited company; how to cash in shares uk; extracting profit from a limited company uk | **PARTIAL**, via the BADR excess-cash post | Medium |
| **Agency cash flow and retainers** | agency cash flow tax; marketing agency retainer accounting; marketing agency financial kpis and cash flow; unpaid invoices | Partial, `unpaid-invoices-profit-on-paper-no-cash` queued | Medium |

## Group 3: Comparison intent

| Query | Intent | SRJ covers it | Confidence |
|---|---|---|---|
| chartered tax adviser vs accountant | Comparison, credential | No | Medium, Bing only |
| specialist accountant vs generalist | Comparison | Partial, argued inside the money page | Low, seed echo |
| agency vs principal vat | Comparison, technical | No | High |
| employee ownership trust vs esop | Comparison | No | Medium, US-leaning |
| management buyout vs buy in | Comparison | No | Medium |
| freelance vs employed / freelancer vs self employed / difference between freelance and paye | Comparison | Partial | Low, wrong side of the transaction |
| vendor due diligence vs buyer due diligence | Comparison | No | Medium |
| domestic reverse charge vs reverse charge | Comparison, technical | No | Medium |
| how to choose a tax adviser for your marketing agency | Comparison, decision | Yes, blog post | High |

Comparison intent is the thinnest group in the whole corpus, and that is a
finding rather than a failure of method. There is almost no "X accountants vs Y
accountants" demand in this niche. The comparison demand that exists is
**technical** (agent vs principal, EOT vs ESOP, MBO vs MBI), not vendor
comparison. Alto's ten comparison pages are therefore probably chasing a
structure Google likes rather than a query people type. Worth knowing before
copying them.

## Group 4: Local intent

| Query | Intent | SRJ covers it | Confidence |
|---|---|---|---|
| agency accountant london / accounting agency london | Local commercial | Yes, London CTA page | High |
| accountant for marketing agencies london | Local commercial | Yes | Medium, Bing only |
| creative agency accountant london / digital agency accountant london | Local commercial | Partial | Medium |
| accountant for creative agencies surrey | Local commercial | No | Medium, Google, matches the Wallington GSC signal |
| accountants for agencies manchester | Local commercial | No | Low, Bing seed echo |
| accountants for agencies birmingham | Local commercial | No | Low, Bing seed echo |
| best accounting agencies in london | Local, listicle | No | Medium |
| marketing agency accountant near me | Local | No | Medium |
| chartered tax advisor near me | Local, credential | No | Medium |
| bookkeeping agency london | Local, adjacent | No | Medium |
| company accountant london agencies | Local | No | Low |

The Surrey result is the interesting one. It corroborates the odd Wallington
query in Search Console from a completely independent data source, which means
that signal is real and not a fluke of one searcher. Manchester and Birmingham,
by contrast, only came back as Bing seed echoes and should not be treated as
evidence.

## Group 5: Brand intent

| Query | Intent | SRJ covers it | Confidence |
|---|---|---|---|
| srj international | Brand, ambiguous | Yes, homepage | Low as ours |
| simon jacobs tax | Brand | Yes, `/about` | Low, seed echo |

Brand demand is effectively zero, which is the expected result for a domain
registered in March 2026. Worse, "srj" autocompletes to SRJ Technologies Group
plc, SRJ Windows and Doors, SRJ Edu Services and SRJ Real Estate Investments.
The brand acronym is contested by at least four unrelated entities, so brand
search will stay a poor channel for a while and "srj" alone is not a term worth
optimising for.

---

## Top 15 opportunities, ranked

Ranked on three factors I can actually observe: **ICP fit**, **evidence of
demand** (how many independent engines suggested it, and how deep the suggestion
tree went), and **page leverage** (whether an existing page could target it, so
the work is an edit rather than a new build). No volume estimates. Reasoning
shown for each.

**1. The VAT principal-vs-agent cluster.**
Deepest technically-specific suggestion tree in the entire corpus, from both
engines, unambiguously UK, and unambiguously an agency problem: pass-through
media spend, recharged production costs, commission. Every SRJ VAT asset is
about flat rate or reclaim, so this is a clean gap on a topic a CTA is uniquely
credible on. Leverage is high because `vat-for-agencies` already exists and can
absorb it.

**2. A dedicated "accountants for media agencies" page.**
Not discovered here, it is already SRJ's top GSC query, but this exercise adds
that no competitor holds it and autocomplete confirms the phrasing. Included
because ranking it below newly discovered items would be dishonest about
relative value. Highest ICP fit, best-evidenced demand, zero competition.

**3. Director pensions as profit extraction.**
"Best pension for limited company director", "can my company pay into my
pension", "pension contributions reduce corporation tax" all surfaced with real
UK depth. SRJ owns director pay via salary and dividends and covers pensions
nowhere. It is the missing third leg of the profit-extraction argument, high ICP
fit, and it slots into the existing director-pay post rather than needing a new
page.

**4. Employee ownership trusts.**
Enormous UK suggestion tree, HMRC-anchored, and a real exit route for a
founder-led agency who cannot find a trade buyer. SRJ has nothing. Ranked fourth
not third because ICP fit needs an inference: most EOT search is not agency
owners. The agency-qualified variant does exist ("employee ownership trust
marketing agency"), which is why it beats items 5 onward.

**5. The agency valuation cluster.**
"How to value a marketing agency", "digital agency valuation multiple(s)",
"marketing agency valuation calculator", "what multiple do digital marketing
agencies sell for", plus creative, design and advertising variants. Very deep,
clearly UK-inclusive, exactly the ICP's five-to-ten-year question. Ranked fifth
only because the SERP is owned by M&A brokers with proprietary multiple data
SRJ does not have, so the winnable angle is the tax consequence of the
valuation, not the multiple itself.

**6. SEO, PPC, design and social media agency verticals folded into the hub.**
Both engines, independently, for all four. This is the purest example of the
blind spot the brief asked about: real suggested demand, zero GSC impressions,
because no page exists. Ranked here rather than higher because the August plan
is explicit that spinning more near-identical subtype pages splits a signal
Google is consolidating. The right action is vertical language and an FAQ inside
the existing hub, not four new pages.

**7. A dedicated BADR page.**
Suggestion depth here is extraordinary, and unusually it is depth on *rate
change and eligibility* rather than definition, which is high-intent. Two SRJ
assets touch it obliquely. Ranked seventh because Alto already has nine exit
pages including a BADR calculator, so this is contested, not open.

**8. Associated companies and the corporation tax thresholds.**
Strong UK depth. Directly bites the ICP the moment a founder sets up a holdco or
a second trading company, which the queued holdco post encourages. Writing that
post without the associated-company consequence is an incomplete answer.
Medium ICP inference cost, hence eighth.

**9. Agency profitability and financial benchmarks.**
"Are marketing agencies profitable", "marketing agency profit margin uk",
"agency financial kpis", "utilisation rate". High ICP fit, medium evidence, and
it is the natural top of funnel for someone who has not yet framed their problem
as tax. The Wow Company's BenchPress proves the format works in this niche.

**10. Place of supply and reverse charge, in the entity language people type.**
`vat-on-overseas-clients-for-agencies` is live and could rank for this with a
terminology pass alone, which is the cheapest item on this list. Ranked tenth
rather than higher because the suggestion corpus was badly contaminated by
German and Italian phrasing, so the UK-only share of that demand is uncertain.

**11. Management buyout.**
Clean UK depth, genuine ICP exit route, and completely absent from SRJ. Ranked
below EOT because the suggestion tree is shallower and skews toward funding
mechanics, which is a corporate-finance question rather than a tax one.

**12. Vendor due diligence when selling.**
Real demand, correct audience, and it sets up the "clean books" argument SRJ
already makes. Deducted for heavy property and real-estate contamination in the
corpus, which makes the UK business-sale share hard to isolate.

**13. Local: Surrey and the south-west London belt.**
Independently corroborated by autocomplete and by GSC. Small, but it is
demonstrably real, and Alto has already built `/locations/wallington`. Ranked
low because it is a Google Business Profile and NAP job more than a content job,
and that work is already W1 in the August plan.

**14. "How much does an accountant cost" and switching-accountant intent.**
Genuine commercial demand at the exact moment someone leaves a generalist. Not
higher because the phrasing is generic rather than agency-qualified, so SRJ
would be competing against every accountancy site in the UK on a term with no
ICP filter in it. Only worth it if answered in agency terms with real numbers,
which is Simon's and Hazem's pricing decision, not mine.

**15. Bookkeeping for marketing agencies.**
Both engines, clean UK, clean ICP. Ranked last because it is a service SRJ may
not want to sell, and ranking for bookkeeping attracts a cheaper buyer than the
CTA positioning is built for. Flagging it as real demand and letting Hazem
decide whether it is wanted demand.

---

## False positives discarded, so nobody re-adds them

**Marketing to accountants, the inverse of our business.** The single largest
contaminant, and it looks superficially perfect. Discarded: "marketing for
accountants", "digital marketing consultant for accountants", "content
marketing for accountants", "marketing ideas for accounting firms", "lead
generation for accountants", "account based marketing agency". These are
agencies selling to accountants. We are an accountant selling to agencies. Same
words, opposite direction, zero commercial value to SRJ.

**Recruitment and staffing, triggered by the word "agency".** The biggest
volume sink in the corpus by a wide margin. "Accountancy recruitment agencies
near me", "accounting staffing agencies dallas tx", "best recruitment agencies
for chartered accountants", "accountant placement agency london", "which agency
hires accountants". "Agency" means employment agency to most searchers, and this
is why raw agency-keyword volume numbers from any tool will be badly inflated.

**The Valuation Office Agency.** Roughly sixty distinct suggestions, all UK, all
worthless: "valuation office agency business rates login", "valuation office
agency birmingham", and so on. This is a genuine trap because it pollutes every
"agency valuation" seed and makes the valuation cluster look larger than it is.
Any volume figure quoted for "agency valuation" terms should be treated as
suspect for exactly this reason.

**Government bodies' VAT numbers.** "Environment agency vat number", "uk space
agency vat number", "european medicines agency vat number", "uk health security
agency vat number". These dominate every "agency vat" seed. The genuine
principal-vs-agent demand sits underneath this noise, which is probably why
nobody has targeted it.

**US "tax mediation agency" scam-check queries.** Around thirty variants
("tax mediation agency scam", "tax relief and mediation agency"). Entirely US,
entirely people checking whether a cold caller is a fraud.

**Freelancer-side and job-seeker intent.** "Working as a freelancer uk", "how
much do freelancers charge per hour", "how do freelancers get paid", "marketing
accountant job description", "chartered tax advisor salary", "aca vs cta exam
structure", "career change to accounting". Wrong side of every transaction SRJ
is in. Note the trap inside this: the employment-status cluster contains both
employer-side queries (keep) and freelancer-side queries (discard) in nearly
identical phrasing.

**Software and tooling.** "Accounting software for marketing agencies",
"digital agency bookkeeping tools", "best payroll system for small agencies",
"agency analytics vat on invoices". Different intent, and the SERP is owned by
SaaS vendors. This is a review-site query, not an adviser query.

**Client-side agency shopping.** "How much do marketing agencies charge", "how
to evaluate a digital marketing agency", "marketing agency evaluation criteria",
"why do companies use marketing agencies", "best marketing agency london". These
are people hiring an agency, not running one.

**Agency for sale, buy side.** "Marketing agencies for sale", "marketing agency
for sale", "buying a marketing agency". Mixed: a seller does search this to
check the market, so it is not pure noise, but the dominant intent is acquirers
and brokers. Not worth a page.

**US geography and terminology.** Anything with CPA, IRS, 401k, LLC, a US state
or city, plus Melbourne, Toronto, Canada and Ireland. Google's UK parameters
leaked US results constantly on generic accounting seeds.

**Off-ICP verticals that the engines volunteered.** Influencer agencies,
OnlyFans creators, content creators, recruitment agencies, insurance agencies,
estate agencies, travel agencies, care and nursing agencies. Influencers are the
closest call, and Alto and Smooth both chase them, but a £500k to £2.5m
founder-led agency and a solo creator are different businesses with different
price points.

**Creative industries tax relief, flagged rather than discarded.** Real UK
demand, and it looks like a perfect fit for a creative-agency accountant. It
mostly is not: the film, TV, animation, video games and AVEC reliefs attach to
qualifying productions, not to a marketing agency making a client's TV
commercial. A page implying otherwise would be both wrong and regulated-brand
risky. Do not write this without Simon confirming the eligibility boundary
first. It is in the ranked list nowhere for that reason.

---

## What surprised me

**Comparison intent barely exists in this niche.** I expected a vendor
comparison layer and there is almost none. What comparison demand exists is
technical, agent vs principal and EOT vs ESOP. That makes Alto's ten comparison
pages look like an architecture play rather than demand capture, and it means
copying them is a weaker idea than the competitor study's supply-side view
implies.

**The vertical matrix is wider than Search Console suggests, and both engines
agree on where.** SEO, PPC, design and social media agency variants are
suggested independently by Google and Bing and produce literally zero SRJ
impressions. That is precisely the survivorship bias the brief predicted, caught
in the act. The August plan's instruction not to build four more subtype pages
still stands, but the language belongs in the hub.

**"Agency" is a catastrophically ambiguous keyword head.** Employment agencies,
the Valuation Office Agency, government bodies' VAT numbers, estate agencies,
insurance agencies. Roughly two thirds of everything the word "agency" pulled
back was irrelevant. Any volume number anyone ever quotes for these terms,
including from a paid tool, is inflated by this unless it was manually cleaned.
That is worth remembering the next time a tool is proposed as a shortcut.

**The technically hardest topics are the least contested.** Principal vs agent
VAT, place of supply, associated companies, disclosed and undisclosed agency.
Deep suggestion trees, meaning real people ask, and thin coverage from the
agency-accountant set, because it takes a chartered tax adviser to answer.
That is the sharpest available expression of Simon's actual advantage, and it is
a better differentiator than another vertical landing page.

**Pensions are completely missing from SRJ's profit-extraction story.** Every
asset is salary and dividends. Autocomplete says company pension contributions
are a live, high-intent UK director question. For an owner heading toward an exit
in five to ten years this is arguably the largest single lever available, and
there is not one word about it on the site.

**Brand search is contested by four unrelated SRJs.** SRJ Technologies Group
plc, SRJ Windows and Doors, SRJ Edu Services, SRJ Real Estate Investments. Brand
search will not be a meaningful channel, and "srj" alone should never be treated
as a target.
