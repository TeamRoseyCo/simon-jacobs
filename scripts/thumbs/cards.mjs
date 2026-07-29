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
];

export default cards;
