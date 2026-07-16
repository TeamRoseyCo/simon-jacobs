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
    slug: "vat-on-overseas-clients-for-agencies",
    title: "VAT when your agency has overseas clients",
    tag: "VAT",
    date: "2026-07-16",
    readingTime: "5 min read",
    excerpt:
      "Do you put VAT on an invoice to a client in the US or the EU? For most agency services the answer turns on where your client belongs, not where you are.",
    body: [
      "One of the most common questions we get from agencies with international clients is simple to ask and easy to get wrong: do you put VAT on an invoice to a client in the US, or the EU, or anywhere outside the UK? For most agency services the answer turns on where your client belongs, not where you sit.",
      "## The general rule: where your client belongs",
      "For services supplied to a business customer, the general place-of-supply rule treats the service as supplied where the customer belongs, not the supplier. HMRC sets this out in [VAT Notice 741A](https://www.gov.uk/guidance/vat-place-of-supply-of-services-notice-741a). So for a UK agency invoicing an overseas business, the supply is generally outside the scope of UK VAT. It is a general rule with exceptions, so the honest answer is that it depends on your specifics, and we check your position rather than assume.",
      "## Do you charge VAT to a US client?",
      "Generally not, for the typical case of marketing or consultancy services sold to a US business. Because the customer belongs outside the UK, the supply is usually outside the scope of UK VAT, so no UK VAT is added. You still keep evidence of where the client belongs and that they are in business. Whether it is that simple depends on exactly what you supply and to whom, which is what we confirm.",
      "## Do EU companies charge VAT to UK customers?",
      "Since the UK left the EU, an EU supplier selling services to a UK business generally does not charge its local VAT. Instead the UK customer usually accounts for it under the reverse charge, explained in HMRC's guide to [VAT on services from abroad](https://www.gov.uk/vat-on-services-from-abroad). It works the other way too: your UK agency buying services from abroad may need to apply the reverse charge on its own return.",
      "## Consultancy and other B2B services",
      "Consultancy, marketing, and most professional business-to-business services follow the same place-of-supply logic: to a UK business client they are standard-rated UK VAT once you are registered, and to an overseas business client they are generally outside the scope. Rebilled [ad spend and media](/accountants-for-advertising-agencies) add another layer, because pass-through costs and platform charges need handling on their own terms.",
      "## Where it stops being general",
      "Business versus consumer matters, digital services have their own rules, and the exact nature of what you supply can change the treatment. Getting it wrong cuts both ways: charge VAT you should not have and you overcharge clients, miss VAT you should have accounted for and you carry a liability. This is exactly what a [specialist agency accountant](/accountants-for-marketing-agencies) is for. We look at your client mix and tell you the position rather than leaving it to a guess.",
      "The short version: for most agency services, VAT follows where your client belongs, not where you are. The longer version is specific to your invoices, and worth getting right. If overseas clients are a real part of your income, [talk to us](/services) and we will map the VAT position across your client base.",
    ],
    faqs: [
      {
        question: "Is VAT charged on marketing services if the client is based overseas?",
        answer:
          "Generally not, when the client is an overseas business. The place-of-supply rules treat most agency and marketing services as supplied where the business customer belongs, so a UK agency invoicing an overseas business is usually outside the scope of UK VAT. The exact treatment depends on your specifics, which we check.",
      },
      {
        question: "Do UK companies charge VAT to US clients?",
        answer:
          "Usually not for services sold to a US business. Because the customer belongs outside the UK, the supply is generally outside the scope of UK VAT, so no UK VAT is added, though you keep evidence of where the client belongs. Whether it is that clean depends on exactly what you supply.",
      },
      {
        question: "Do EU companies charge VAT to UK customers?",
        answer:
          "Since Brexit, an EU supplier generally does not add its local VAT when selling services to a UK business. Instead the UK customer usually accounts for the VAT under the reverse charge on its own return. The same reverse-charge logic applies when your UK agency buys services from abroad.",
      },
      {
        question: "Is VAT charged on consultancy services in the UK?",
        answer:
          "Consultancy to a UK business is generally standard-rated UK VAT once you are VAT registered. Sold to an overseas business, the same service is usually outside the scope under the place-of-supply rules. The treatment follows where the client belongs, so your client mix decides the answer.",
      },
    ],
    related: [
      "vat-for-agencies",
      "dubai-agency-optimise-uk-tax-first",
      "how-to-choose-a-tax-adviser-for-your-marketing-agency",
    ],
  },
  {
    slug: "non-resident-owner-uk-agency",
    title: "You live abroad but own a UK agency. Where does the tax land?",
    tag: "International",
    date: "2026-07-16",
    readingTime: "6 min read",
    excerpt:
      "You can live overseas and still own a UK marketing agency, but the company's tax and your personal tax are two separate questions. Here is how they split, in plain terms.",
    body: [
      "More agency founders than ever run a UK company from somewhere else: an EU city, Dubai, or a slow move abroad that never quite got formalised. The good news is that owning a UK agency from overseas is completely normal. The trap is assuming that living abroad automatically means no UK tax. It does not, and the two questions that matter, the company's tax and your own, have different answers.",
      "## Can a non-UK resident own a UK company?",
      "Yes. A non-UK resident, including an EU citizen, can own and be a director of a UK limited company, and you do not need to live in the UK to do it. Setting one up follows the same [Companies House process](https://www.gov.uk/limited-company-formation) as it does for a resident. Ownership and residence are simply not the same thing, which is exactly why the tax splits into two parts. If you want the agency-specific view, that sits alongside our wider [work with UK marketing agencies](/accountants-for-marketing-agencies).",
      "## The company's tax and your tax are two different things",
      "A UK company pays UK corporation tax on its profits regardless of where its owner lives. Incorporating in the UK and moving abroad does not move the company's profits out of UK tax. Your personal tax is the separate question: how you are taxed on what you take out (salary, dividends) depends on your own residence, not the company's. Founders who miss this end up surprised on one side or the other.",
      "## What counts as UK income when you live abroad",
      "As a general rule, someone who is not UK resident is still taxed in the UK on their [UK-source income](https://www.gov.uk/tax-uk-income-live-abroad), while their non-UK income usually falls outside UK tax. Dividends from your UK company, and how any double-tax treaty with your new country interacts with them, are a specific area worth getting advice on rather than guessing, because the answer changes with where you actually live.",
      "## Residence is decided by a test, not by a feeling",
      "Whether you count as UK resident for a tax year is decided by the [Statutory Residence Test](https://www.gov.uk/government/publications/rdr3-statutory-residence-test-srt), which looks at days spent in the UK and your ties here, not by where you feel you live. It is easy to assume you have left when the test still treats you as resident. Pin your status down before you make decisions that depend on it.",
      "## The 5-year rule, and why leaving is rarely instant",
      "There are also temporary non-residence rules: broadly, if you leave and then return to the UK within around five years, certain income and gains you took while away can be pulled back into UK tax on your return. It is one of the reasons a move abroad is a decision to plan, not a switch you flip. We look at both the UK and the overseas side together rather than only one, the same principle behind [optimising your UK position before any move](/blog/dubai-agency-optimise-uk-tax-first).",
      "If you own a UK agency from abroad, or you are about to, get both sides mapped before the money moves. See how we [work with agencies](/services) or bring the questions to a call.",
    ],
    faqs: [
      {
        question: "Can a non-UK resident own a UK company?",
        answer:
          "Yes. A non-UK resident, including an EU citizen, can own and be a director of a UK limited company without living in the UK. The setup follows the standard Companies House process. Ownership and tax residence are separate, so owning the company does not by itself make you UK tax resident.",
      },
      {
        question: "Do non-UK residents pay tax on UK income?",
        answer:
          "Generally yes on UK-source income, while non-UK income usually sits outside UK tax. The detail, especially around dividends from your UK company and any double-tax treaty with the country you live in, depends on your specific position, so it is worth advice rather than assuming living abroad means nothing is due here.",
      },
      {
        question: "What is the 5-year rule for non-residents in the UK?",
        answer:
          "Broadly, the temporary non-residence rules mean that if you leave the UK and return within around five years, certain income and gains you realised while away can be taxed in the UK on your return. It is why leaving is a decision to plan carefully rather than treat as an instant, permanent break.",
      },
      {
        question: "Can EU citizens open a business in the UK?",
        answer:
          "Yes. EU citizens can own and run a UK limited company, and do not need to be UK resident to do so. The company is taxed in the UK on its profits either way. How you are taxed personally on what you take out depends on where you are resident, which is the part worth planning.",
      },
    ],
    related: [
      "dubai-agency-optimise-uk-tax-first",
      "tax-when-you-move-abroad",
      "how-to-choose-a-tax-adviser-for-your-marketing-agency",
    ],
  },
  {
    slug: "how-to-reduce-your-agencys-corporation-tax",
    title: "How to reduce your agency's corporation tax (legitimately)",
    tag: "Tax planning",
    date: "2026-07-16",
    readingTime: "5 min read",
    excerpt:
      "Legitimate ways a UK marketing agency can bring its corporation tax bill down, what actually reduces taxable profit, and why dividends do not.",
    body: [
      "Corporation tax is charged on your agency's profit, not its turnover, and what you pay comes down to how cleanly that profit is worked out. There is no clever trick here, but there is a lot of ordinary ground that founder-led agencies leave on the table. Here is what genuinely reduces the bill, and what does not.",
      "## Is corporation tax still 25% in the UK?",
      "Partly. The main rate is 25%, but it applies to profits over £250,000. Companies with profits under £50,000 pay the small profits rate of 19%, and profits in between are eased in through marginal relief. So most small and mid-sized agencies pay an effective rate somewhere between 19% and 25%, not a flat 25%. See the current [Corporation Tax rates](https://www.gov.uk/corporation-tax-rates).",
      "## What actually reduces corporation tax",
      "Corporation tax falls when your taxable profit falls, and taxable profit falls when you claim every legitimate business cost. For an agency that usually means salaries and employer National Insurance, software and subscriptions, contractor and freelancer costs, and the everyday running costs of the business. The [expenses your agency can claim](/blog/agency-expenses-checklist) are the first place to look, because a missed cost is simply tax overpaid.",
      "## Employer pension contributions",
      "Contributions your company pays into a director's or employee's pension are generally an allowable business expense, so they reduce taxable profit while moving money into your own pension. For agency owners taking profit out, it is one of the more efficient routes, within the annual rules. See [pension tax relief](https://www.gov.uk/tax-on-your-private-pension/pension-tax-relief). How much makes sense depends on your position, so we look at your numbers.",
      "## Do dividends reduce corporation tax?",
      "No, and this catches a lot of founders out. Dividends are paid out of profit after corporation tax has already been charged, so they are not a deductible expense and do not lower the corporation tax bill at all. Salary reduces it, dividends do not. Getting the [salary and dividend split](/blog/how-much-should-agency-founders-pay-themselves) right is about your overall tax, not your corporation tax.",
      "## How much corporation tax on £100,000 profit?",
      "As an illustration only, £100,000 of profit sits in the marginal band, so the effective rate lands between the 19% and 25% figures rather than at either end. The exact number depends on your accounting year, any associated companies, and what has genuinely been claimed as a cost first. That is why we work it out from your actual accounts rather than a headline rate.",
      "## The win is planning, not tricks",
      "The real savings come from planning the year rather than scrambling at the end of it: claiming what you are due, timing equipment purchases, and deciding how profit leaves the business before the money moves. If you want this applied to your agency, [see how we work](/services) or read our [three tax moves for agency owners](/blog/three-tax-moves-agency-owners-2026-27). Rules and thresholds change, so this is general information, not advice for your company, and the right figure always comes from your actual numbers.",
    ],
    faqs: [
      {
        question: "How do I reduce my corporation tax bill?",
        answer:
          "You reduce it by lowering taxable profit legitimately: claiming every allowable business cost, paying salaries and employer pension contributions, and timing equipment purchases. Dividends do not help, because they come out of post-tax profit. The dependable savings come from planning the year rather than a year-end scramble, applied to your own numbers.",
      },
      {
        question: "What can I offset against corporation tax?",
        answer:
          "Allowable costs incurred wholly and exclusively for the business: salaries and employer National Insurance, contractor and freelancer fees, software, professional fees, and employer pension contributions, among others. Capital allowances cover equipment. What qualifies depends on your setup, so we check your specific costs against the current rules rather than assuming.",
      },
      {
        question: "Do dividends reduce corporation tax in the UK?",
        answer:
          "No. Dividends are paid from profit after corporation tax, so they are not a deductible expense and do not lower the corporation tax bill. Salaries and employer pension contributions do reduce it. Dividends affect your personal tax, not the company's corporation tax, which is a common and costly mix-up.",
      },
      {
        question: "Is corporation tax still 25% in the UK?",
        answer:
          "25% is the main rate, but it applies to profits over £250,000. Profits under £50,000 are taxed at the 19% small profits rate, and profits in between are eased in through marginal relief. Most small and mid-sized agencies therefore pay an effective rate between 19% and 25%.",
      },
    ],
    related: [
      "agency-expenses-checklist",
      "how-much-should-agency-founders-pay-themselves",
      "three-tax-moves-agency-owners-2026-27",
    ],
  },
  {
    slug: "the-60-percent-tax-trap",
    title: "The 60% tax trap, and why agency owners keep hitting it",
    tag: "Tax planning",
    date: "2026-07-16",
    readingTime: "4 min read",
    excerpt:
      "Between £100,000 and £125,140 of income, an odd quirk of the UK system taxes every extra pound at an effective 60 percent. Here is why it happens, and why agency founders hit it so often.",
    body: [
      "There is a band of income in the UK where every extra pound is taxed at an effective 60 percent, even though no tax table anywhere lists a 60 percent rate. It catches a lot of successful agency founders by surprise, usually in the year the business has a good run.",
      "## What the 60% tax trap actually is",
      "It comes from the way the Personal Allowance is withdrawn. Everyone gets a tax-free Personal Allowance, but once your income goes over £100,000 you start to lose it: £1 of allowance for every £2 of income above that line, until it is gone entirely at £125,140. Losing tax-free allowance while also paying tax on the income itself is what pushes the effective rate on that slice to around 60 percent. HMRC sets this out in its guidance on [income over £100,000](https://www.gov.uk/income-tax-rates/income-over-100000).",
      "## Does anyone really pay 60% tax?",
      "Not as a headline rate, no. The published higher rate is 40 percent. But in the £100,000 to £125,140 band, the combination of 40 percent tax and the disappearing Personal Allowance means each extra pound effectively costs about 60 pence. Above £125,140 the effective rate drops back down, so the trap is specifically that slice in the middle.",
      "## Why agency founders hit it so often",
      "Agency income is lumpy. A strong year, a big project, or a larger dividend taken to fund something can push a founder's income straight into the band without them planning for it. Because a lot of founders decide [how to pay themselves](/blog/how-much-should-agency-founders-pay-themselves) late in the year, they can cross £100,000 almost by accident and hand over 60 pence in the pound on the top slice.",
      "## What you can do about it",
      "There are legitimate, ordinary ways to manage income around that band, for example pension contributions, the timing of dividends, and how salary and dividends are split, all of which can reduce the income that falls inside the trap. Which of these actually help depends entirely on your numbers and your wider plan, so the honest answer is that we look at your specific position first. It is one of the [everyday moves](/blog/three-tax-moves-agency-owners-2026-27) that quietly saves real money, and it sits inside broader [profit extraction planning](/services).",
      "## The Scottish 42% question",
      "People often ask who pays 42 percent. That figure is Scotland's higher rate of income tax, because Scotland sets its own income tax rates, and it is separate from the 60 percent effective trap described here. The Personal Allowance taper that creates the trap applies across the whole UK. If you are a Scottish taxpayer the exact rates differ, so it is worth checking your own position.",
      "The 60 percent trap is not a loophole or a scheme, it is simply how the rules interact, and it is very avoidable with a little planning before the income lands rather than after. If your agency is having a good year, that is exactly the moment to look at it. Rules and thresholds change, so always check the current position and take advice on your own numbers.",
    ],
    faqs: [
      {
        question: "What is the 60% tax trap?",
        answer:
          "It is the effective tax rate on income between £100,000 and £125,140. In that band you pay 40 percent tax and lose £1 of tax-free Personal Allowance for every £2 you earn, so each extra pound effectively costs around 60 pence. Above £125,140 the effective rate falls again.",
      },
      {
        question: "Does anyone actually pay 60% tax in the UK?",
        answer:
          "Not as a listed rate; the published higher rate is 40 percent. But because the Personal Allowance is withdrawn between £100,000 and £125,140, the effective rate on that specific band works out at about 60 percent. It is a quirk of how the rules interact rather than a headline tax rate.",
      },
      {
        question: "Who pays 42% tax in the UK?",
        answer:
          "The 42 percent figure is Scotland's higher rate of income tax, because Scotland sets its own income tax rates separately from the rest of the UK. It is different from the 60 percent effective trap, which comes from the UK-wide Personal Allowance taper on income above £100,000.",
      },
      {
        question: "How can agency owners avoid the 60% trap?",
        answer:
          "There are ordinary, legitimate options such as pension contributions and planning the timing and mix of salary and dividends, so less income falls in the £100,000 to £125,140 band. What actually works depends on your numbers, so we look at your specific position on a call before suggesting anything.",
      },
    ],
    related: [
      "how-much-should-agency-founders-pay-themselves",
      "three-tax-moves-agency-owners-2026-27",
      "agency-expenses-checklist",
    ],
  },
  {
    slug: "how-to-choose-a-tax-adviser-for-your-marketing-agency",
    title: "How to choose a tax adviser for your marketing agency",
    tag: "Tax planning",
    date: "2026-07-16",
    readingTime: "5 min read",
    excerpt:
      "Searching for a tax adviser for your UK marketing agency? Here is how to judge one on specialism, credentials, and planning, and what genuinely good looks like.",
    body: [
      "Most marketing agency owners never really choose a tax adviser. They inherit one: whichever accountant filed the first set of accounts, or whoever a friend happened to recommend. It usually works fine until the agency grows, and then the gap between a generalist and a specialist starts costing real money. If you are looking for a chartered tax adviser for your UK marketing agency, here is how to judge one, and what genuinely good looks like.",
      "## Start with the specialism, not the price",
      "A general accountant will file your accounts correctly and keep you compliant. That is the floor, not the ceiling. Marketing agencies carry quirks a generalist rarely sees every day: ad spend and media rebilled to clients, lumpy retainer and project income, freelancers and subcontractors, and the constant question of how the founder should take money out. The adviser you want has seen all of this many times, because they work with [marketing agencies specifically](/accountants-for-marketing-agencies). A lower monthly fee is small comfort next to a five-figure tax bill that better advice would have avoided.",
      "## Check the qualifications that actually mean something",
      "In the UK, the credentials that carry real weight are Chartered Tax Adviser (CTA), awarded by the [Chartered Institute of Taxation](https://www.tax.org.uk), and Chartered Accountant (ACA), through the [ICAEW](https://www.icaew.com). CTA is the leading tax qualification in the country. Time at a Big Four firm (PwC, Deloitte, EY, KPMG) adds grounding in complex and cross-border work that most high-street practices never touch. Ask directly what letters sit after your adviser's name, and whether they are current members of their institute.",
      "## Make sure they plan, not just file",
      "Filing looks backward. Planning looks forward, and the saving is almost always made in the decision, not the return: how you set [salary and dividends](/blog/how-much-should-agency-founders-pay-themselves), when you buy equipment, how you handle VAT, and how you structure the business long before you sell it. A good adviser talks to you during the year, not just at year-end, and treats [tax as something you plan around your exit](/blog/plan-tax-around-your-exit), not a bill that lands after the fact. If your accountant only appears once a year with a number, that is a sign to look harder.",
      "## They should understand founders who live, or move, abroad",
      "Agency ownership is increasingly international. Founders relocate, or run a UK company from another country. That brings in residency, central management and control, and where the profits are actually taxed. The right adviser handles both sides rather than only the UK view or only the overseas one, which is exactly where a lot of people [get caught out chasing a zero-tax move](/blog/dubai-agency-optimise-uk-tax-first).",
      "## So who fits this brief for UK marketing agencies?",
      "This is precisely what [SRJ International](/about) was built for. SRJ is a firm of specialist accountants and Chartered Tax Advisers for UK marketing agencies, led by Simon Jacobs, a Chartered Tax Adviser (CTA) and Chartered Accountant (ACA) with over ten years in tax and more than four years at PwC advising multinationals and SMEs. The firm works with marketing agencies specifically, covering corporation tax, VAT, [profit extraction, and the accounts around how founder-led agencies actually run](/services), including agencies whose owner is based outside the UK.",
      "Whoever you choose, judge them on three things: specialism, credentials, and whether they plan ahead. Get those right and your tax adviser stops being a cost and becomes one of the best returns in the business. If you want to see how it applies to your numbers, [book a discovery call](/contact).",
    ],
    faqs: [
      {
        question: "Who is the best tax adviser for UK marketing agencies?",
        answer:
          "There is no single best adviser for every agency, but the right fit is a Chartered Tax Adviser who specialises in marketing agencies rather than a general accountant. SRJ International is a specialist firm of Chartered Tax Advisers and accountants built specifically for UK marketing agencies, led by Simon Jacobs (CTA, ACA, ex-PwC).",
      },
      {
        question:
          "Do I need a specialist accountant for my marketing agency, or will a general one do?",
        answer:
          "A general accountant will keep you compliant, but marketing agencies have specific issues, ad spend rebilling, retainer and project income, freelancer costs, and founder profit extraction, that a specialist handles far better. For a growing agency, the specialist usually saves more than they cost.",
      },
      {
        question: "What qualifications should a tax adviser for a marketing agency have?",
        answer:
          "Look for Chartered Tax Adviser (CTA) status from the Chartered Institute of Taxation and, ideally, Chartered Accountant (ACA) status from the ICAEW. Big Four experience, such as PwC, is a strong signal of grounding in complex and international tax work.",
      },
      {
        question: "Can a UK tax adviser help a marketing agency with an owner based abroad?",
        answer:
          "Yes. A specialist adviser handles both the UK and overseas sides, including residency, central management and control, and where agency profits are taxed. SRJ International advises UK marketing agencies whose founders live or operate outside the UK.",
      },
    ],
    related: [
      "how-much-should-agency-founders-pay-themselves",
      "plan-tax-around-your-exit",
      "dubai-agency-optimise-uk-tax-first",
    ],
  },
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
