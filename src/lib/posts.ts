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
    slug: "three-tax-moves-agency-owners-2026-27",
    title: "Three tax moves for agency owners in 2026/27",
    tag: "Profit extraction",
    date: "2026-07-14",
    readingTime: "4 min read",
    excerpt:
      "Three straightforward, legitimate moves for UK agency owners this tax year: a salary set to your allowance, tax-free company interest, and your ISA allowance.",
    body: [
      "If you run a marketing agency and want to save tax in 2026/27, a handful of ordinary moves do more than most people expect. None of these are clever schemes. They are the everyday allowances that founders keep meaning to use and never quite get round to.",
      "First, consider keeping your salary at £12,570. That amount is covered by your personal allowance, so there is no income tax on it. If you have other employees on the payroll, there is typically no National Insurance to pay on it either. It is the simplest layer of a sensible profit-extraction plan.",
      "Second, £1,000 of company interest. If your company owes you money because you have lent it cash, you can pay yourself interest on that loan. The first £1,000 is tax-free if you are a basic rate taxpayer. It is a small, legitimate route that founders routinely forget they have.",
      "Third, your £20,000 tax-free ISA. If you have spare cash sitting around, an ISA lets you earn interest and dividends tax-free, up to £20,000 a year, with everything made inside it tax-free. Worth noting: the rules are set to change from April 2027, with tighter restrictions on how much you can put in, so it is worth making the most of the current allowance while it lasts.",
      "Rules and thresholds can change, so always check the current position before acting, and take advice on how these fit your own numbers. Used together and reviewed each year, the ordinary allowances quietly add up to real money kept.",
    ],
  },
  {
    slug: "ai-bookkeeping-cost-20k-tax",
    title: "AI replaced his bookkeeper. It cost £20k in extra tax.",
    tag: "Bookkeeping",
    date: "2026-07-13",
    readingTime: "4 min read",
    excerpt:
      "One agency owner automated his bookkeeping with AI. It treated expenses as income and left his accounts unbalanced, pushing his tax bill around £20k too high.",
    body: [
      "“AI has just replaced my bookkeeper, and it is doing a better job.” That is exactly what one marketing agency owner thought, before he came to us.",
      "Before working with us, he had built AI software to automate his company's bookkeeping. It ended up treating expenses as income, missing expenses entirely, and leaving his bank accounts not balancing.",
      "Here is the problem with automating bookkeeping using AI: the errors it creates can take just as long to fix as it would have taken to do the job properly in the first place. By the time he came to us, this had pushed his tax bill around £20k higher than it should have been.",
      "We went back to basics and rebuilt his bookkeeping from scratch. Once it was corrected, his tax bill came down to nil.",
      "AI can be brilliant for a lot of things. But relying on it for your bookkeeping can end up costing you far more in tax than paying a human to do it properly. This is one example, and the numbers will vary from business to business, but the pattern is common: confident output, quietly wrong, expensive to unwind.",
    ],
  },
  {
    slug: "dubai-agency-optimise-uk-tax-first",
    title: "Set up in Dubai and pay no tax? Optimise your UK position first",
    tag: "International",
    date: "2026-07-11",
    readingTime: "6 min read",
    excerpt:
      "Before you move your agency to Dubai for a zero-tax life, get your UK position efficient first, and understand the UK rules that can follow you abroad.",
    body: [
      "“Set up a marketing agency in Dubai and pay no taxes ever again.” It is one of the most repeated pitches aimed at agency founders, and it is nowhere near as simple as it sounds.",
      "Before you think about leaving the UK for Dubai or any other low-tax haven, optimise your UK taxes first. If you actually like living here, do not slowly start resenting the tax system until moving abroad feels like the only answer. That decision means leaving behind everything you value about the UK, family, culture, business opportunities, for a country that might not suit your lifestyle or work for your business at all.",
      "The alternative most people do not consider is this: you can stay in the UK and still bring your tax bill down significantly. The right adviser can put together strategies and structures that make you genuinely efficient here, without uprooting your life. Once you know what tax-efficient actually looks like in the UK, you are in a much better position to decide whether leaving is even worth it.",
      "There is also a blind spot in only listening to a UAE accountant: a lot of them focus purely on the Dubai side. They are not necessarily thinking about the UK implications of moving abroad. And there is plenty that can catch you out, including controlled foreign company rules, central management and control, economic substance requirements, and the UK statutory residence test. Get any of these wrong, and you could find you are not actually free from UK tax at all.",
      "As a UK tax adviser with international exposure, the job is to look at both sides, the UK and the UAE, and advise accordingly. So unless a UAE firm is genuinely reputable, comes recommended, and has real experience dealing with UK clients, be careful about relying on them alone for your international tax position.",
      "Relocating can genuinely lower your tax. But it is a decision to make from a position of knowledge, with the UK side handled first, not a leap taken on the strength of a social media pitch.",
    ],
  },
  {
    slug: "capital-gains-tax-rising-agency-owners",
    title: "If capital gains tax rises, what should agency owners do?",
    tag: "Capital gains",
    date: "2026-07-08",
    readingTime: "4 min read",
    excerpt:
      "There is speculation that capital gains tax could be aligned with income tax rates. Nothing is confirmed, but if you plan to sell assets soon, it is worth planning now.",
    body: [
      "Capital gains tax has been back in the headlines, with speculation that it could be aligned with income tax rates, which would take the top rate as high as 45%.",
      "Right now, you pay 18% or 24% capital gains tax when you sell assets like crypto, property, or stocks and shares. Under a proposal that aligned the rates, that could rise as high as 45% for additional-rate taxpayers.",
      "The thinking behind an idea like this is to raise more tax from wealth-generating assets, on the basis that the current system leans too heavily on taxing people who work rather than people who hold assets.",
      "Nothing is confirmed, and this is still speculation. But if you are planning to sell shares, property, or other assets in the near future, now is a sensible time to speak to a tax adviser about capital gains planning, so you are prepared whichever way it goes.",
      "Rules and rates change, sometimes at short notice. The point is not to panic about a headline, it is to know your position and your options before you commit to a sale.",
    ],
  },
  {
    slug: "dont-use-claude-for-taxes",
    title: "Why you should not use Claude for your taxes",
    tag: "Tax planning",
    date: "2026-06-18",
    readingTime: "5 min read",
    excerpt:
      "AI is brilliant at sounding certain. Tax is the one place where confident and wrong is the most expensive combination there is.",
    body: [
      "Ask an AI a tax question and you get a fast, fluent, confident answer. That is exactly the problem. Tax is not a knowledge quiz. It is a moving set of rules that depend on your numbers, your structure, the current year, and the country you are sitting in. Fluent and wrong is the most expensive combination in this entire field.",
      "A language model cannot see your full picture. It has not read your management accounts, your dividend history, your VAT position, or the plan you have for the business in three years. It answers the narrow question you typed, not the broader one you should have asked. Most costly tax mistakes are not wrong answers to the right question. They are confident answers to the wrong one.",
      "It is also frozen in time and blind to nuance. Thresholds, allowances, and reliefs change, sometimes mid-year. A model trained months ago will happily quote last year's numbers with total conviction, and it has no idea which grey areas get pushed back on in practice. You find out when the return is questioned, not before.",
      "Then there is accountability. When a real adviser signs off on a position, they are on the hook for it, and they are thinking about your next decision, not only this one. An AI carries no responsibility for the penalty, the interest, or the planning opportunity you quietly missed. You carry all of it.",
      "None of this makes AI useless. It is genuinely good for explaining a concept in plain English or helping you frame a question before you speak to someone. Use it as a translator, not as your adviser. For anything that touches what you file, what you pay, or what you keep, talk to a person who can see the whole board.",
      "Because that is the real job. Not answering tax questions, but making the decisions around them before the money moves. No model does that for you.",
    ],
  },
  {
    slug: "agency-expenses-checklist",
    title: "What your agency can actually claim as an expense: a 2026 checklist",
    tag: "Expenses",
    date: "2026-06-09",
    readingTime: "6 min read",
    excerpt:
      "Most agencies under-claim, not over-claim. As work has gone remote and software-heavy, the list of legitimate business expenses has quietly grown.",
    body: [
      "The rule underneath all of this is short: to be deductible, a cost has to be incurred wholly and exclusively for the business. That single phrase decides most arguments. If a cost is genuinely for running the agency, it usually qualifies. If it has a real personal element, it usually does not, or only in part.",
      "It is worth revisiting because the shape of an agency has changed. Teams are remote or hybrid, the stack is almost entirely software, and a lot of delivery is freelance. That has broadened what a normal agency legitimately spends on, and plenty of founders are still claiming like it is 2018.",
      "The usual allowable list for a UK agency: software and SaaS subscriptions, freelancer and subcontractor costs, salaries and employer pension contributions, business travel and accommodation, professional subscriptions and training that maintains your existing skills, accountancy and legal fees, marketing and advertising, and a reasonable proportion of home-working costs where you genuinely work from home.",
      "Equipment is its own category. Laptops, cameras, and similar are usually handled through capital allowances, and the Annual Investment Allowance lets most agencies write off the full cost in the year of purchase rather than spreading it over years. That timing is worth more than people assume.",
      "The grey areas are where confidence gets expensive. Everyday clothing is not allowable even if you only wear it for work. Client entertaining is generally not deductible for tax even when it is a genuine business cost. Anything with mixed personal use needs apportioning honestly. The test is never whether it felt like a business cost. It is whether it was wholly and exclusively one.",
      "Treat this as a prompt, not gospel. The categories are stable, but the detail and the limits move, and your specific setup changes the answer. The real win is rarely some exotic deduction. It is claiming the ordinary things properly and consistently.",
    ],
  },
  {
    slug: "tax-when-you-move-abroad",
    title: "You moved abroad. Do you still owe UK tax?",
    tag: "Residency",
    date: "2026-06-02",
    readingTime: "6 min read",
    excerpt:
      "Booking a one-way flight does not end your tax relationship with the UK. Where you pay is decided by residence rules, not your postcode.",
    body: [
      "A lot of agency founders eventually think about leaving, whether it is Dubai, Lisbon, or somewhere with a kinder tax regime and better weather. The instinct is that once you land somewhere else, the UK is no longer your problem. It is rarely that clean.",
      "Tax follows residence, not where you happen to be on a given day. The UK decides whether you are still tax resident using the Statutory Residence Test, which weighs how many days you spend here against the ties you keep: a home, family, work, and so on. You can move your body abroad and still be UK tax resident on paper if those ties pull hard enough.",
      "Even when you do break UK residence, there is the year you leave to think about. Split-year treatment can tax part of the year as resident and part as not, but it has conditions, and getting the timing wrong can mean a whole year taxed the way you were trying to avoid.",
      "Then there is the country you moved to. It will have its own rules for when you become resident there, and you can end up in scope in two places at once. Double taxation treaties exist precisely to settle who gets to tax what, so the same income is not taxed twice, but they have to be applied properly rather than assumed.",
      "For an agency owner it is more tangled still, because the business has its own tax residence, and where it is managed and controlled can matter as much as where you personally live. Moving yourself does not automatically move the company, and that mismatch is where the expensive surprises live.",
      "The honest summary: relocating can genuinely lower your tax, but it is a planned move, not a side effect of buying a plane ticket. Work out the residence position in both countries before you go, not after. The most costly version of this is discovering you never really left the UK net at all.",
    ],
  },
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
