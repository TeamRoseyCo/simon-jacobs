/**
 * Blog thumbnail card data. Single source of truth.
 *
 * One entry per blog post that needs a thumbnail, plus the `_default` card
 * used as the fallback for any post with no image of its own.
 *
 *   slug      must match the post slug in src/lib/posts.ts (output is
 *             public/blog/<slug>.webp)
 *   hook      the headline on the card. 4 to 7 words, hard maximum. The card
 *             is displayed in a 400x190 slot on the blog index, so anything
 *             longer stops being legible.
 *   highlight a substring of `hook` (exact, case-sensitive) that the
 *             hand-drawn red squiggle underlines. Keep it to one or two words.
 *
 * Copy rules, non-negotiable, this is a regulated YMYL brand (CIOT/ICAEW/ASA):
 *   - No em dashes anywhere.
 *   - No promised outcomes, no invented figures, no advice. Punchy and
 *     curiosity-driven is fine; "slash your tax bill" is not.
 *   - Every hook must be faithful to what its post actually says. Read the
 *     post's `title` and `excerpt` in src/lib/posts.ts before writing one.
 */

export const cards = [
  {
    slug: "_default",
    hook: "Tax notes for agency owners",
    highlight: "owners",
    // flip: true stands Simon on the right instead of the left (tweet layout
    // only). The photo is never mirrored, only its side of the card.
  },
  {
    slug: "laptop-tax-relief-agency-annual-investment-allowance",
    hook: "A new laptop is not an expense",
    highlight: "not an expense",
  },
  {
    slug: "tax-when-you-sell-stocks-and-shares-agency-owner",
    hook: "Selling shares: what the taxman takes",
    highlight: "taxman takes",
  },
  {
    slug: "vat-on-overseas-clients-for-agencies",
    hook: "VAT follows your client, not you",
    highlight: "your client",
  },
  {
    slug: "non-resident-owner-uk-agency",
    hook: "You left. Your company did not.",
    highlight: "did not.",
  },
  {
    slug: "how-to-reduce-your-agencys-corporation-tax",
    hook: "Dividends do not cut corporation tax",
    highlight: "do not",
  },
  {
    slug: "the-60-percent-tax-trap",
    hook: "No tax table lists 60%",
    highlight: "60%",
  },
  {
    slug: "how-to-choose-a-tax-adviser-for-your-marketing-agency",
    hook: "Most founders inherit their tax adviser",
    highlight: "inherit",
  },
  {
    slug: "three-tax-moves-agency-owners-2026-27",
    hook: "Three allowances founders forget to use",
    highlight: "forget to use",
  },
  {
    slug: "ai-bookkeeping-cost-20k-tax",
    hook: "AI replaced his bookkeeper. It cost him.",
    highlight: "cost him.",
  },
  {
    slug: "dubai-agency-optimise-uk-tax-first",
    hook: "Dubai does not switch off UK tax",
    // "switch off" straddles a line break at the fitted size, which would
    // leave a squiggle under a lone "off". "UK tax" lands on the last line.
    highlight: "UK tax",
  },
  {
    slug: "capital-gains-tax-rising-agency-owners",
    hook: "Plan capital gains before you sell",
    highlight: "before you sell",
  },

  /* Added 2 August 2026 so every published post has a card of its own rather
     than falling back to the shared brand photo. Each hook is drawn from its
     post's own title or excerpt, no new claims. */
  {
    slug: "carry-back-a-loss-reclaim-corporation-tax",
    hook: "Made a loss? Look at last year",
    highlight: "last year",
  },
  {
    slug: "selling-a-business-car-capital-allowances-vs-mileage",
    hook: "Sold the car? How you claimed matters",
    highlight: "How you claimed",
  },
  {
    slug: "private-residence-relief-rent-out-home-before-selling",
    hook: "You rented out your home before selling",
    highlight: "before selling",
  },
  {
    slug: "dont-use-claude-for-taxes",
    hook: "Confident and wrong is expensive",
    highlight: "and wrong",
  },
  {
    slug: "agency-expenses-checklist",
    hook: "Most agencies under-claim, not over-claim",
    highlight: "under-claim",
  },
  {
    slug: "tax-when-you-move-abroad",
    hook: "A one-way flight is not an exit",
    highlight: "not an exit",
  },
  {
    slug: "how-much-should-agency-founders-pay-themselves",
    hook: "Your pay is a business decision",
    highlight: "business decision",
  },
  {
    slug: "plan-tax-around-your-exit",
    hook: "Plan around the exit, not year-end",
    highlight: "not year-end",
  },
  {
    slug: "vat-for-agencies",
    hook: "VAT is where the money leaks",
    highlight: "money leaks",
  },
  {
    slug: "clean-books-higher-valuation",
    hook: "Clean books quietly raise your valuation",
    highlight: "your valuation",
  },
  {
    slug: "company-capital-losses-carry-forward",
    hook: "A capital loss does not disappear",
    highlight: "not disappear",
    flip: true,
  },
  {
    slug: "employment-allowance-national-insurance-agency",
    hook: "The relief most agencies never claim",
    highlight: "never claim",
  },
  {
    slug: "vat-flat-rate-scheme-for-agencies",
    hook: "Flat Rate VAT: saving or trap?",
    highlight: "or trap?",
    flip: true,
  },
  {
    slug: "subcontractors-employment-status-ir35-agency",
    hook: "Are they really subcontractors?",
    highlight: "subcontractors?",
  },
  {
    slug: "emi-share-options-incentivise-staff",
    hook: "Reward your best employee, not HMRC",
    highlight: "not HMRC",
    flip: true,
  },
  {
    slug: "client-entertaining-vs-staff-entertaining-tickets",
    hook: "Same seat, different guest, different tax",
    highlight: "different tax",
  },
  {
    slug: "pre-trading-expenses-agency",
    hook: "Costs you paid before you started",
    highlight: "before you started",
    flip: true,
  },
  {
    slug: "travel-to-your-own-office-is-not-an-expense",
    hook: "Your commute is not an expense",
    highlight: "not an expense",
  },
  {
    slug: "trivial-benefits-staff-gifts-directors",
    hook: "A gift with no tax bill",
    highlight: "no tax bill",
    flip: true,
  },
  {
    slug: "dividends-your-company-receives-are-usually-tax-free",
    hook: "Dividends your company receives",
    highlight: "receives",
  },
  {
    slug: "giving-away-shares-in-your-agency-control",
    hook: "Shares are not just a payment",
    highlight: "a payment",
    flip: true,
  },
  {
    slug: "sell-your-agency-holdco-or-non-resident",
    hook: "Selling up without a tax shock",
    highlight: "tax shock",
  },
  {
    slug: "too-much-cash-in-your-agency-badr",
    hook: "Too much cash can cost relief",
    highlight: "cost relief",
    flip: true,
  },
  {
    slug: "reclaim-vat-paid-before-you-registered",
    hook: "VAT you paid before registering",
    highlight: "before registering",
  },
  {
    slug: "reclaim-vat-on-agency-equipment",
    hook: "Laptops, cameras, chairs and VAT",
    highlight: "and VAT",
    flip: true,
  },
  {
    slug: "closing-your-company-to-avoid-tax-phoenixing",
    hook: "Closing down is not a strategy",
    highlight: "not a strategy",
  },
  {
    slug: "branded-clothing-and-staff-uniform-tax-relief",
    hook: "The logo does the work",
    highlight: "the work",
    flip: true,
  },
  {
    slug: "phones-for-staff-tax-free",
    hook: "One phone per employee",
    highlight: "per employee",
  },
  {
    slug: "are-subscriptions-a-business-expense",
    hook: "Which subscriptions can you claim?",
    highlight: "you claim?",
    flip: true,
  },
  {
    slug: "courses-and-books-as-business-expenses",
    hook: "Business expense or personal one?",
    highlight: "personal one?",
  },
  {
    slug: "what-happens-if-you-lose-a-receipt",
    hook: "Lost the receipt. Now what?",
    highlight: "Now what?",
    flip: true,
  },
  {
    slug: "audit-your-agency-software-spend",
    hook: "Audit what you spend on tools",
    highlight: "on tools",
  },
  {
    slug: "unpaid-invoices-profit-on-paper-no-cash",
    hook: "Profitable, but no cash",
    highlight: "no cash",
    flip: true,
  },
  {
    slug: "personal-costs-through-the-business-hmrc-enquiry",
    hook: "When HMRC finds a personal cost",
    highlight: "personal cost",
  },
  {
    slug: "hmrc-connect-social-media-lifestyle",
    hook: "HMRC can read your feed too",
    highlight: "your feed too",
    flip: true,
  },
  {
    slug: "hmrc-reward-scheme-reporting-tax-evasion",
    hook: "HMRC pays for serious information",
    highlight: "serious information",
  },
  {
    slug: "tax-avoidance-vs-tax-evasion",
    hook: "Evasion is the illegal one",
    highlight: "illegal one",
    flip: true,
  },
  {
    slug: "four-tax-free-allowances-agency-owners",
    hook: "Four allowances worth knowing",
    highlight: "worth knowing",
  },
  {
    slug: "high-income-child-benefit-charge",
    hook: "The Child Benefit clawback",
    highlight: "clawback",
    flip: true,
  },
  {
    slug: "is-gold-exempt-from-capital-gains-tax",
    hook: "Is your gold really tax-free?",
    highlight: "tax-free?",
  },
  {
    slug: "seis-rd-credits-emi-reliefs-agencies",
    hook: "Three reliefs most owners miss",
    highlight: "most owners miss",
    flip: true,
  },
  {
    slug: "overseas-business-trip-expenses",
    hook: "Prove the business purpose",
    highlight: "business purpose",
  },
  {
    slug: "side-hustle-sole-trader-or-limited-company",
    hook: "Your side hustle stacks on your salary",
    highlight: "on your salary",
  },
];

export default cards;
