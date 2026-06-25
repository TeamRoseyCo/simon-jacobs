// Blog posts. Static content for now; swap for a CMS/MDX later if needed.
// Copy is tuned to the Ideal Client Profile (see docs/ideal-client-profile.md).

export type Post = {
  slug: string;
  title: string;
  tag: string;
  date: string; // ISO date
  readingTime: string;
  excerpt: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "how-much-should-agency-founders-pay-themselves",
    title: "How much should an agency founder actually pay themselves?",
    tag: "Profit extraction",
    date: "2026-05-28",
    readingTime: "5 min read",
    excerpt:
      "Most founders treat their pay as a personal withdrawal rather than a business decision. Here is a cleaner way to think about salary, dividends, and what to leave in.",
    body: [
      "Ask ten agency owners how they decide what to pay themselves and you will get ten versions of the same answer: a bit of salary, then dividends when the bank balance looks healthy. It works until it does not, usually right before a tax bill or a slow quarter.",
      "The cleaner approach starts by separating three questions that founders tend to blur together. What does the business need to keep to operate and grow? What do you need personally to live without stress? And what is the most tax-efficient way to move the difference from one to the other?",
      "For most UK agencies, that means a modest salary that uses your allowances efficiently, dividends on top, and pension contributions as a genuinely underused extraction route. The exact split changes with profit levels and the rules each year, which is the whole argument for reviewing it more than once a year.",
      "The goal is not to take the maximum today. It is to take a steady, predictable amount that keeps both you and the agency healthy, while quietly building value you can realise later.",
    ],
  },
  {
    slug: "plan-tax-around-your-exit",
    title: "Plan your tax around the exit, not just the year-end",
    tag: "Tax planning",
    date: "2026-05-12",
    readingTime: "6 min read",
    excerpt:
      "If the plan is to sell in five to ten years, the decisions you make now shape both your tax bill and your valuation. Year-end tidy-ups miss most of that.",
    body: [
      "Plenty of agency owners are quietly building toward an exit: sell in five to ten years, ideally at a number that changes their life. Yet most tax advice they receive is backward-looking, sorting out what already happened rather than shaping what comes next.",
      "Exit-minded planning flips that. Profit extraction, how you structure ownership, how clean and legible your accounts are, and how dependent the business is on you all feed into the multiple a buyer will pay and the tax you keep on the way through.",
      "The earliest, cheapest wins are usually structural: getting the right people on the cap table, keeping management accounts a buyer can trust, and reducing owner-dependency so the agency is not just you with a logo. These take time, which is why they belong in a plan now rather than a panic later.",
      "None of this requires acting like a giant company. It requires making this year's decisions with one eye on the year you sell.",
    ],
  },
  {
    slug: "vat-for-agencies",
    title: "VAT for agencies: the parts worth getting right",
    tag: "VAT",
    date: "2026-04-22",
    readingTime: "4 min read",
    excerpt:
      "VAT rarely gets founders excited, but the wrong scheme or a missed recharge quietly costs agencies real money every quarter.",
    body: [
      "VAT is the tax agencies think about least and overpay on most. The mechanics feel settled once you are registered, so the question of whether your setup still fits the business rarely gets revisited.",
      "Two areas reward attention. The first is scheme choice: as margins and headcount change, the scheme that suited you at £400k of turnover may not at £1.5m. The second is recharges and disbursements, where agencies routinely handle client costs in a way that creates avoidable VAT.",
      "None of this is exotic. It is the kind of thing that, reviewed once with someone who knows agencies, stops leaking money quarter after quarter.",
    ],
  },
  {
    slug: "clean-books-higher-valuation",
    title: "Why clean books quietly raise your agency's valuation",
    tag: "Exit",
    date: "2026-04-03",
    readingTime: "5 min read",
    excerpt:
      "Buyers pay more for businesses they can understand. The work that makes your numbers legible is the same work that makes them defensible.",
    body: [
      "When an agency is sold, the price is set as much by confidence as by performance. A buyer who can clearly see how the business makes money, and trust that the numbers hold up, will pay a higher multiple than one squinting at messy accounts.",
      "That confidence is built long before a sale. Consistent management accounts, clean separation between the owner's spending and the business, and a clear story behind the margins all make due diligence faster and less frightening.",
      "The happy accident is that the same habits help you run the agency better in the meantime. Legible numbers are useful to you every month, not just to a buyer once.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
