// Blog posts. Static content for now; swap for a CMS/MDX later if needed.
// Copy is tuned to the Ideal Client Profile (see docs/ideal-client-profile.md).

export type Faq = { question: string; answer: string };

export type Post = {
  slug: string;
  title: string;
  tag: string;
  date: string; // ISO date (first published)
  updated?: string; // ISO date; when set, shown as "Updated" + used as dateModified
  readingTime: string;
  excerpt: string;
  // Each entry is a block. A "## " prefix renders as an H2 subheading; every
  // other entry is a paragraph. Inline [label](/path) markup becomes a link.
  body: string[];
  faqs?: Faq[]; // rendered as an accordion + FAQPage schema
  related?: string[]; // slugs of related posts, shown as internal links
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
      "A lot of agency founders eventually think about leaving, whether it is Dubai, Lisbon, or somewhere with a kinder tax regime and better weather. The instinct is that once you land somewhere else, the UK is no longer your problem. It is rarely that clean, and the gap between what people assume and how the rules actually work is where the expensive surprises live.",
      "## Tax follows residence, not your postcode",
      "The single most important idea is that the UK taxes you based on residence, not on where you happen to be on a given day. Residence is decided by the [Statutory Residence Test](https://www.gov.uk/tax-foreign-income/residence), which weighs how many days you spend in the UK against the ties you keep here: a home, family, work, and so on. You can move your body abroad and still be UK tax resident on paper if those ties pull hard enough. Booking a one-way flight does not, by itself, end your relationship with HMRC.",
      "## The year you leave is its own problem",
      "Even when you do break UK residence cleanly, the year of departure needs its own thought. Split-year treatment can tax part of that year as resident and part as not, but it comes with conditions, and getting the timing wrong can mean an entire year taxed the way you were trying to avoid. This is exactly the kind of detail that is cheap to plan around in advance and painful to fix afterwards.",
      "## You can be resident in two places at once",
      "Then there is the country you have moved to. It will have its own rules for when you become tax resident there, and it is entirely possible to be in scope in two places at the same time. Double taxation treaties exist precisely to settle who gets to tax what, so the same income is not taxed twice, but they have to be read and applied properly rather than assumed. Relying on a broad sense that a treaty will sort it out is how people end up with an unexpected bill.",
      "## Your company does not move just because you do",
      "For an agency owner it is more tangled still, because the business has its own tax residence. Where a company is genuinely managed and controlled can matter as much as where you personally live, so moving yourself does not automatically move the company. That mismatch, founder abroad, company still effectively run from and taxable in the UK, is one of the most common and most expensive misunderstandings. It is also why [optimising your UK position first](/blog/dubai-agency-optimise-uk-tax-first) usually matters more than people expect before any move.",
      "## Plan the move, do not stumble into it",
      "The honest summary: relocating can genuinely lower your tax, but it is a planned move, not a side effect of buying a plane ticket. Work out the residence position in both countries, and the position of your company, before you go rather than after. The most costly version of this is discovering, a year later, that you never really left the UK net at all. This is general information, not advice, and residence rules are detailed and change, so take proper advice on your own situation. If a move is on your mind, we look at both sides on the [accountants for marketing agencies](/accountants-for-marketing-agencies) page, or book a call.",
    ],
    faqs: [
      {
        question: "Do I still pay UK tax if I move abroad?",
        answer:
          "Possibly. The UK taxes on residence, not location, and residence is decided by the Statutory Residence Test, which weighs your UK days against ties like a home, family, and work. You can live abroad and still be UK tax resident on paper if those ties pull hard enough.",
      },
      {
        question: "What is the Statutory Residence Test?",
        answer:
          "It is the set of rules HMRC uses to decide whether you are UK tax resident in a given year. It balances how many days you spend in the UK against the connections you keep here. Because the outcome turns on the detail, it is worth checking carefully before assuming you have left.",
      },
      {
        question: "Does moving abroad move my agency's tax residence too?",
        answer:
          "Not automatically. A company has its own tax residence, and where it is genuinely managed and controlled can matter as much as where you live. A founder can relocate while the business remains effectively run from, and taxable in, the UK, which is a common and costly surprise.",
      },
      {
        question: "Can I be taxed in two countries at once?",
        answer:
          "Yes, if you are resident in both under their respective rules. Double taxation treaties exist to decide who taxes what so the same income is not taxed twice, but they must be applied properly rather than assumed. Getting this right is part of planning a move before you make it.",
      },
    ],
    related: [
      "dubai-agency-optimise-uk-tax-first",
      "plan-tax-around-your-exit",
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
      "Ask ten agency owners how they decide what to pay themselves and you will get ten versions of the same answer: a bit of salary, then dividends when the bank balance looks healthy. It works until it does not, usually right before a tax bill or a slow quarter. The problem is not the amounts. It is that pay is being treated as a personal withdrawal rather than a business decision.",
      "## Stop treating your pay as a withdrawal",
      "The founders who get this right separate three questions that most people blur together. What does the business need to keep to operate and grow? What do you need personally to live without stress? And what is the most tax-efficient way to move the difference from one to the other? Answer them in that order and the number almost sets itself. Answer them by watching the bank balance and you end up over-drawing in good months and squeezed in slow ones.",
      "Keeping the two accounts genuinely separate matters for more than tidiness. As covered in [why clean books raise your valuation](/blog/clean-books-higher-valuation), a clear line between owner spending and the company is one of the things that makes the whole business more legible and, eventually, more sellable.",
      "## Salary, dividends, and the underused pension route",
      "For most UK agencies, efficient extraction is a mix rather than a single lever. A modest salary that uses your allowances sensibly, [dividends](https://www.gov.uk/tax-on-dividends) on top from post-tax profit, and pension contributions, which are the genuinely underused route, often carry real advantages that founders overlook because they feel like money locked away. The right blend depends on your profit level, your other income, and the rules in the current year, so there is no single correct split that applies to everyone.",
      "That last point is the whole argument for reviewing your pay more than once a year. Thresholds and rates move, dividend treatment changes, and your profit is not the same at £600k as it was at £300k. A split that was efficient two years ago can quietly become a poor one without anything obvious signalling the change.",
      "## Take a steady number, build value underneath it",
      "The goal is not to take the maximum today. It is to take a steady, predictable amount that keeps both you and the agency healthy, while quietly building value you can realise later, whether through a future sale or simply a stronger balance sheet. Over-extracting to the limit every year can starve the business of the cash it needs to grow, which is often the more expensive mistake.",
      "This is general guidance, not advice on your specific numbers, and the rules change, so check the current position or take advice before acting. If you want the split worked out around your actual figures, see how we handle [profit extraction for agencies](/accountants-for-marketing-agencies) or book a call.",
    ],
    faqs: [
      {
        question: "Should agency founders pay themselves salary or dividends?",
        answer:
          "Usually a mix. A modest salary that uses your allowances, dividends on top from post-tax profit, and pension contributions each play a role. The efficient blend depends on your profit level, other income, and the current year's rules, so it is worth reviewing rather than fixing once.",
      },
      {
        question: "How do I decide how much to take out of my agency?",
        answer:
          "Answer three questions in order: what the business needs to keep to operate and grow, what you need personally to live without stress, and the most tax-efficient way to move the difference across. Deciding by watching the bank balance is what leads to over-drawing in good months.",
      },
      {
        question: "Why are pension contributions called an underused extraction route?",
        answer:
          "Because founders often overlook them, treating pension money as locked away rather than as an efficient way to take value out of the company. Used sensibly alongside salary and dividends, contributions can carry real advantages, though the right amount depends on your circumstances and the current rules.",
      },
      {
        question: "How often should I review my own pay?",
        answer:
          "More than once a year. Rates and thresholds move, dividend treatment changes, and your profit shifts as the agency grows. A split that was efficient two years ago can quietly become a poor one, with nothing obvious to flag that it has stopped working.",
      },
    ],
    related: ["plan-tax-around-your-exit", "clean-books-higher-valuation"],
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
      "Plenty of agency owners are quietly building toward an exit: sell in five to ten years, ideally at a number that changes their life. Yet most tax advice they receive is backward-looking, sorting out what already happened rather than shaping what comes next. The result is a business optimised for last year's tax bill and unprepared for the one moment that matters most.",
      "## Year-end tidy-ups miss the point",
      "Most routine tax work is retrospective. It records what happened and files it correctly, which is necessary but does nothing to change the outcome. Exit-minded planning flips that around. It asks what the business needs to look like on the day a buyer runs the numbers, and then works backward to the decisions you make this year to get there.",
      "That reframing matters because the biggest tax event in an agency owner's life is usually the sale itself, not any single year of trading. Decisions that look small now, how you own the shares, how you take money out, how clean the accounts are, compound into both the multiple a buyer will pay and the tax you keep on the way through.",
      "## The levers that move an exit",
      "Four things do most of the work. How you extract profit in the years before a sale. How ownership is structured, including who sits on the cap table and in what form. How clean and legible your accounts are, since [clean books quietly raise your valuation](/blog/clean-books-higher-valuation). And how dependent the business is on you personally, because an agency that is just the founder with a logo is worth far less than one that runs without them.",
      "The earliest wins are usually the structural ones, and they are also the cheapest. Getting the right ownership in place, keeping management accounts a buyer can trust, and reducing owner-dependency all take time to do properly. That is precisely why they belong in a plan now rather than a panic once an offer is on the table.",
      "## Reliefs reward planning, not hindsight",
      "The tax treatment of a sale is not automatic. Reliefs such as [Business Asset Disposal Relief](https://www.gov.uk/business-asset-disposal-relief) come with conditions about how long you have held the shares and how the business is structured, and those conditions are far easier to meet if you have been building toward them than if you discover them the week a buyer appears. There is also ongoing speculation about how gains might be taxed in future, which is another argument for knowing your position early rather than reacting to a headline. This is general information, not advice, and the rules change, so check the current position or take advice before acting.",
      "## Plan now, sell later",
      "None of this requires acting like a giant company. It requires making this year's decisions with one eye on the year you sell. Handled early and quietly in the background, the structuring, the accounts, and the profit-extraction plan all line up so that when a buyer does appear, you are ready rather than scrambling. If a sale is anywhere on your horizon, see how we approach [tax planning for agency owners](/accountants-for-marketing-agencies) or book a call to map your own timeline.",
    ],
    faqs: [
      {
        question: "How early should I start planning my agency's exit?",
        answer:
          "Ideally several years out. The structural wins, ownership, clean accounts, and reducing owner-dependency, all take time to do properly and are far cheaper handled early. Reliefs on a sale also carry conditions that are easier to meet when you have been building toward them rather than reacting to an offer.",
      },
      {
        question: "What actually raises the price a buyer will pay?",
        answer:
          "Confidence and independence. Legible accounts a buyer can trust, a clear story behind the margins, and a business that runs without the founder all push the multiple up. An agency that is just the owner with a logo is worth far less than one that keeps performing after they step back.",
      },
      {
        question: "Does profit extraction affect my exit?",
        answer:
          "Yes. How you take money out in the years before a sale shapes both your ongoing tax and how the business looks to a buyer. It is one of the four main levers, alongside ownership structure, clean accounts, and owner-dependency, that together set what you keep from an eventual sale.",
      },
      {
        question: "Is exit planning only worth it if I am definitely selling?",
        answer:
          "No. The same work, clean books, sensible structure, and a business less dependent on you, makes the agency easier and more profitable to run in the meantime. If a sale never happens you have simply built a stronger business; if it does, you are ready for it.",
      },
    ],
    related: [
      "clean-books-higher-valuation",
      "how-much-should-agency-founders-pay-themselves",
    ],
  },
  {
    slug: "vat-for-agencies",
    title: "VAT for agencies: where the money quietly leaks",
    tag: "VAT",
    date: "2026-04-22",
    readingTime: "4 min read",
    excerpt:
      "VAT rarely gets founders excited, but the wrong scheme or a missed recharge quietly costs agencies real money every quarter.",
    body: [
      "VAT is the tax agencies think about least and overpay on most. The mechanics feel settled once you are registered, so the question of whether your setup still fits the business rarely gets revisited. Meanwhile the agency changes underneath it, and a scheme that made sense at one size quietly costs money at another.",
      "## Scheme choice is not a set-and-forget decision",
      "The scheme you picked when you first registered was the right answer for the business you were then. As margins, headcount, and the mix of your costs change, that answer moves. The [VAT Flat Rate Scheme](https://www.gov.uk/vat-flat-rate-scheme) can suit a lean agency with few VATable costs, but the same scheme can become expensive once you are spending more on software, freelancers, and other input VAT you could otherwise reclaim. The scheme that suited you at £400k of turnover may not at £1.5m.",
      "The point is not that one scheme is always better. It is that scheme choice deserves a look whenever the shape of the business shifts, rather than being left on autopilot for years. A short annual review is usually enough to catch the moment it stops fitting.",
      "## Recharges and disbursements: the quiet leak",
      "The second area is how you handle client costs. Agencies routinely pay for things on a client's behalf, media spend, stock images, third-party tools, and then bill them on. Whether VAT should be added when you recharge those costs depends on whether they are genuine disbursements or simply your own costs passed through, and the two are treated differently. Get the distinction wrong and you either overcharge VAT, undercharge it, or create avoidable VAT on money that was only ever passing through.",
      "This is exactly the kind of detail a generalist rarely sees every day but a [specialist agency accountant](/accountants-for-marketing-agencies) does. It rarely shows up as a single dramatic error. It shows up as a small, steady overpayment, quarter after quarter, that nobody thinks to question.",
      "## When to register, and staying clean under MTD",
      "Timing also matters at the edges. If your turnover is approaching the [VAT registration threshold](https://www.gov.uk/vat-registration/when-to-register), it is worth planning the transition rather than tripping over it, because registration changes your pricing and your admin at the same time. Once registered, returns run under Making Tax Digital, so accurate, current bookkeeping is what keeps VAT from becoming a scramble every quarter.",
      "None of this is exotic. It is the kind of thing that, reviewed once with someone who knows agencies, stops leaking money quarter after quarter. Rules and thresholds change, so check the current position on gov.uk or take advice before acting, and if you want a second pair of eyes on your setup, book a call.",
    ],
    faqs: [
      {
        question: "Which VAT scheme is best for a marketing agency?",
        answer:
          "There is no single best scheme. The Flat Rate Scheme can suit a lean agency with few VATable costs, but standard VAT often wins once you spend more on software and freelancers you can reclaim VAT on. The right answer depends on your cost mix and changes as you grow.",
      },
      {
        question: "Do I charge VAT when I recharge client costs?",
        answer:
          "It depends whether the cost is a genuine disbursement or your own cost passed through, and the two are treated differently for VAT. Getting the distinction right on media spend and third-party tools is where agencies most often overpay or undercharge without realising.",
      },
      {
        question: "When does my agency have to register for VAT?",
        answer:
          "Once your VAT-taxable turnover crosses the current registration threshold on gov.uk, or if you expect to soon. Because registration changes both your pricing and your admin, it is worth planning the transition in advance rather than tripping over the threshold mid-year.",
      },
      {
        question: "How often should I review my VAT setup?",
        answer:
          "At least once a year, and whenever the business changes shape, a jump in turnover, more staff, or a different cost base. Scheme choice is easy to leave on autopilot, and that is precisely when it quietly starts costing money.",
      },
    ],
    related: ["agency-expenses-checklist", "clean-books-higher-valuation"],
  },
  {
    slug: "clean-books-higher-valuation",
    title: "Why clean books quietly raise your agency's valuation",
    tag: "Exit",
    date: "2026-04-03",
    updated: "2026-07-15",
    readingTime: "6 min read",
    excerpt:
      "Buyers pay more for businesses they can understand. The work that makes your numbers legible is the same work that makes them defensible.",
    body: [
      "When an agency is sold, the price is set as much by confidence as by performance. A buyer who can clearly see how the business makes money, and trust that the numbers hold up, will pay a higher multiple than one squinting at messy accounts. Two agencies with identical profit can sell for very different amounts, and the gap is usually legibility.",
      "## What a buyer is actually paying for",
      "A buyer is not just paying for last year's profit. They are paying for their confidence that the profit is real, repeatable, and not quietly dependent on the founder. Every question your accounts cannot answer becomes a reason to lower the offer, add conditions, or hold money back until they are sure. Clean numbers remove those reasons before they are raised.",
      "This matters more for agencies than for many businesses, because agency accounts are easy to muddy. Rebilled ad spend and other pass-through costs inflate turnover, retainers and projects land unevenly, and founder expenses blur into the company. Left unaddressed, all of that makes the real, underlying margin harder to see, which is exactly what a buyer is trying to establish.",
      "## The habits that make numbers legible",
      "Three habits do most of the work. First, consistent management accounts produced every month, not reconstructed in a panic once a year. Second, a clean separation between the owner's spending and the business, so profit is not distorted by personal costs run through the company. Third, a clear story behind the margins: what is genuine agency revenue versus money that is only passing through on the way to a media platform or a freelancer.",
      "None of this requires acting like a large company. It is ordinary discipline, applied consistently, and it is the same [bookkeeping and accounts work](/services) an agency should be doing anyway. The difference is treating those numbers as something a stranger will one day read, rather than a private note to yourself.",
      "## Start 12 to 24 months before a sale, not after an offer",
      "Due diligence is where messy books cost real money. A buyer's advisers will test the numbers, and anything that looks inconsistent slows the deal, invites a lower offer, or triggers a retention where part of the price is held back. The cleanup that would have been routine over a year becomes a scramble under scrutiny, at the worst possible moment to be improvising.",
      "That is why the useful window opens well before you are ready to sell. A clean, well-structured set of accounts built a year or two ahead of any offer is far more convincing than a tidy-up done once a buyer is already asking questions. It also sits alongside the wider structuring work covered in [planning your tax around the exit](/blog/plan-tax-around-your-exit), which shapes what you keep from the sale as much as the headline price.",
      "## The everyday payoff",
      "The quiet bonus is that legible numbers are useful to you every month, not just to a buyer once. The same accounts that reassure an acquirer tell you which clients are actually profitable, where margin is leaking, and whether your own pay is set sensibly. Clean books are not paperwork for a future event. They are a management tool you happen to also be able to sell behind.",
      "If an exit is anywhere on your horizon, the work starts now, not when a buyer appears. We handle the structuring and accounts quietly in the background so you are ready when one does. You can see how we approach this on the [accountants for marketing agencies](/accountants-for-marketing-agencies) page, or book a call to talk through your own numbers.",
    ],
    faqs: [
      {
        question: "How far ahead of a sale should I clean up my books?",
        answer:
          "Usually 12 to 24 months. A buyer's advisers test your numbers during due diligence, and a clean, consistent set of accounts built well before an offer is far more convincing than a rushed tidy-up once questions are already being asked.",
      },
      {
        question: "Do clean books really raise the sale price?",
        answer:
          "They raise confidence, and confidence sets the multiple. A buyer who can clearly see how an agency makes money, and trust the numbers hold up, will typically pay more and attach fewer conditions than one squinting at messy accounts for the same underlying profit.",
      },
      {
        question: "What makes agency accounts look messy to a buyer?",
        answer:
          "Rebilled ad spend and pass-through costs inflating turnover, personal spending run through the company, uneven retainer and project income, and margins with no clear story. Each is fixable, but each is a question a buyer would rather see answered before they make an offer.",
      },
      {
        question: "Is this worth doing if I am not planning to sell?",
        answer:
          "Yes. The same habits that reassure a buyer, consistent management accounts and a clean owner-business split, also show you which clients are profitable and where margin leaks. Legible numbers are a monthly management tool, not just preparation for a future exit.",
      },
    ],
    related: [
      "plan-tax-around-your-exit",
      "how-much-should-agency-founders-pay-themselves",
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
