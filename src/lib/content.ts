
export const site = {
  url: "https://srjinternational.co.uk",
  name: "SRJ International",
  firm: "SRJ International",
  legalName: "SRJ International Limited",
  role: "Chartered Tax Adviser",
  email: "simon@srjinternational.co.uk",
  phone: "07821 900 992",
  linkedin: "https://uk.linkedin.com/in/simon-r-jacobs",
  instagram: "https://www.instagram.com/simonjacobs_cta",
  icaew: "https://find.icaew.com/members/london/simon-jacobs/tPW1A",
  bookSubject: "Tax planning discovery call",
  physicalAddress: "10 Northcliffe Drive, London, England, N20 8JZ",
  tagline:
    "SRJ International helps UK business owners keep more of what they earn.",
} as const;
export const servicesFull = [
  {
    title: "Corporation tax",
    body: "We calculate, plan for, and file your corporation tax return, timed around your year-end so there are no surprises.",
  },
  {
    title: "Accounts preparation",
    body: "Statutory year-end accounts prepared and filed with Companies House, reconciled against your real numbers.",
  },
  {
    title: "VAT & CIS",
    body: "VAT returns filed on the right scheme for your business, plus CIS handled if you use subcontractors.",
  },
  {
    title: "Tax planning",
    body: "Ongoing planning around corporation tax, VAT, and how you take money out, decided before the money moves.",
  },
  {
    title: "Payroll",
    body: "Monthly payroll run for you and your team, including PAYE, NI, and pension auto-enrolment.",
  },
  {
    title: "Company secretarial & registered address",
    body: "Companies House filings, statutory registers, and a registered office address kept up to date.",
  },
  {
    title: "Self-assessment & MTD",
    body: "Your personal tax return filed on time, ready for Making Tax Digital as the rules roll out.",
  },
  {
    title: "Bookkeeping",
    body: "Your books kept accurate and current, so management accounts and tax filings are never a scramble.",
  },
];
export type Testimonial = {
  quote: string[];
  highlight?: string;
  name: string;
  role: string;
  rating?: number;
};

export const testimonials: Testimonial[] = [
  {
    quote: [
      "Simon helped me save thousands on my tax bill and prevented me from losing my Personal Allowance. He also gave me very good insights and advice into cryptocurrency, which will save me thousands of pounds in the future.",
    ],
    highlight: "save thousands on my tax bill and prevented me from losing my Personal Allowance",
    rating: 5,
    name: "Joe G",
    role: "Digital marketing agency",
  },
  {
    quote: [
      "Simon helped me reclaim money I did not even realise I was entitled to, saved me a significant amount in tax through proper structuring, and ensured everything is compliant and future-proof.",
      "What really separates him is how proactive and responsive he is. He advises, explains, and genuinely fights your corner with HMRC. You feel protected, informed, and strategically guided at all times.",
    ],
    highlight: "saved me a significant amount in tax through proper structuring",
    rating: 5,
    name: "Hamish B",
    role: "Dentist",
  },
  {
    quote: [
      "Simon has always given the best he can for the customer. Understanding my situation has allowed him to advise and guide me in the right direction and be more tax efficient where possible.",
    ],
    highlight: "be more tax efficient where possible",
    rating: 5,
    name: "Jaison M",
    role: "Landlord",
  },
];
export const bookHref = "https://calendar.app.google/LjoJzvA8E1p9E8oV7";
export const bookCtaHref = "/contact";
export const scorecardHref = "/scorecard";
export const hero = {
  eyebrow: "Chartered Tax Adviser · PwC Trained",
  titleLead: "Your chartered tax adviser",
  titleAccent: "and accountant in London.",
  sub: "Accounts and tax advice for UK business owners who are tired of finding out after year-end.",
};

export const heroSupport =
  "We help UK business owners keep more of what they earn and build something that is actually worth selling.";
export const lead = {
  partA: "Your accounts can be correct and still arrive ",
  inkAccent: "too late to help.",
  partB: " We keep the numbers current, so you can decide ",
  tealAccent: "before the money moves.",
};

export const exitAngle = {
  eyebrow: "Plan your exit",
  headingLead: "The",
  headingAccent: "long game",
  headingTail: " as a founder.",
  body: "Most owners sell eventually. Selling for a serious multiple takes clean, profitable books and the right structure, built 12 to 24 months before the offer ever lands. We handle the structuring, the tax and the accounts in the background, so when a buyer comes knocking the business is in a stronger position and the tax on the sale is a number you worked out months earlier.",
};

export const scorecardBand = {
  eyebrow: "Profit-Rich Scorecard",
  headingLead: "Find out exactly where your business is ",
  headingAccent: "leaking profit.",
  sub: "Answer a few quick questions and we'll send back your score across 7 areas, plus a 90-day plan to plug the leaks. No sales pitch.",
  cta: "Take the Scorecard",
  time: "est. ~5 minutes",
};
export const scorecardAreas = [
  {
    letter: "D",
    title: "Diagnose tax leakage",
    questions: [
      "Do you review your expected corporation tax bill before year-end?",
      "Do you have a tax plan before profits are finalised?",
      "Do you regularly identify underclaimed expenses or missed tax reliefs?",
    ],
  },
  {
    letter: "I",
    title: "Improve profit extraction",
    questions: [
      "Do you take profit through a planned mix of salary, dividends and pension?",
      "Have you reviewed your director pay against this year's tax thresholds?",
      "Do you use a pension as a tax-efficient way to extract profit?",
    ],
  },
  {
    letter: "G",
    title: "Growth-proof structure",
    questions: [
      "Is your company structure reviewed as the business grows?",
      "Are you confident your structure protects retained profit?",
      "Have you considered the right setup for investment, partners, or a holding company?",
    ],
  },
  {
    letter: "I",
    title: "Incentivise key people",
    questions: [
      "Do you reward or retain key team members beyond salary?",
      "Have you explored share options or equity incentives such as EMI?",
      "Is there a clear plan to keep your best people through growth?",
    ],
  },
  {
    letter: "T",
    title: "Tighten HMRC protection",
    questions: [
      "Are your filings and records consistently accurate and up to date?",
      "Would your books hold up under an HMRC enquiry?",
      "Do you have a plan or protection in place for an HMRC investigation?",
    ],
  },
  {
    letter: "A",
    title: "VAT & revenue",
    questions: [
      "Are you on the right VAT scheme for how you actually trade?",
      "Do you handle VAT correctly on pass-through costs and overseas clients?",
      "Is revenue recognised correctly across retainers and projects?",
    ],
  },
  {
    letter: "L",
    title: "Long-term wealth & exit",
    questions: [
      "Are you building the business with a future sale or exit in mind?",
      "Is your personal wealth growing alongside the business?",
      "Are your books and structure clean enough to survive buyer due diligence?",
    ],
  },
];

export const scorecardAnswers = ["No", "Sometimes", "Yes"];

export const trustItems = [
  {
    label: "Qualified",
    value: "CTA · ACA",
    description:
      "CTA and ACA mean our team is trained in both tax advice (Chartered Institute of Taxation) and accountancy (ICAEW). In plain English: you get advice that connects tax planning with the real numbers.",
  },
  {
    label: "Background",
    value: "PwC Trained",
    description:
      "PwC trained means our team has Big Four advisory experience. In plain English: you get structured thinking usually reserved for much larger businesses.",
  },
  {
    label: "Specialism",
    value: "Cross-border & exits",
    description:
      "Where a Chartered Tax Adviser earns their keep: moving between countries, selling a business, and the structuring decisions either one forces.",
  },
];

export const services = [
  {
    title: "Tax planning",
    body: "See the corporation tax, VAT and personal-tax consequence before you commit. The useful conversation happens during the year, while timing and structure can still change.",
    includes: [
      "Corporation tax forecasting and timing",
      "A VAT position and scheme that fits how you trade",
      "Director extraction: salary, dividends, pension",
      "Allowances and reliefs where they genuinely apply",
      "Decisions modelled before you commit, not after",
    ],
  },
  {
    title: "Owner pay and extraction",
    body: "Know what can come out, what should stay in the company, and what must be reserved. Salary, dividends and pension are modelled against your actual numbers and plans.",
    includes: [
      "The right salary and dividend split for your numbers",
      "Pension used as a tax-efficient extraction route",
      "Withdrawals timed around the tax year",
      "A balance between what you take and what funds growth",
      "Extraction planned with an eventual sale in mind",
    ],
  },
  {
    title: "Accounts and financial control",
    body: "Bookkeeping, VAT, payroll and year-end remain accurate and current. You get numbers you can use before a dividend, investment, move abroad or possible sale.",
    includes: [
      "Management accounts you can actually read",
      "Year-end accounts and corporation tax returns",
      "VAT returns and payroll oversight",
      "Clean books that hold up in due diligence",
      "A clear monthly view of profit and cash",
    ],
  },
];

export const whoFor = [
  "You own and run a UK business, and the company's money affects your own.",
  "The filings get done, but the useful advice keeps arriving after year-end.",
  "You are deciding how to take profit, grow, move country, or prepare for a sale.",
  "You want one named adviser who can explain what changes before you act.",
  "You value clean records and straight answers more than the cheapest monthly package.",
];

export const resultItems = [
  "Clearer monthly profit visibility",
  "Fewer last-minute tax surprises",
  "Better director pay decisions",
  "A cleaner, more valuable business to sell",
];

export const processSteps = [
  {
    title: "Diagnose",
    body: "We start with the company, the owner, the records and the next decision. You leave knowing what is urgent, what needs a proper review, and whether we are the right firm to handle it.",
  },
  {
    title: "Plan",
    body: "We compare the options in plain English: tax, cash, timing and the trade-offs. Where another UK or overseas specialist is needed, that boundary is made clear before anything is implemented.",
  },
  {
    title: "Maintain",
    body: "The books and filings stay current, with reviews at an agreed rhythm. Dividends, pensions, investment and other material choices are revisited while there is still time to act.",
  },
];

export const principles = [
  {
    title: "Plain English",
    body: "You see the options and the trade-offs without wading through technical fog. If you can't explain it back, it isn't done.",
  },
  {
    title: "Year-round",
    body: "Advice happens while it can still change the outcome, not in a panic the week before a deadline.",
  },
  {
    title: "Direct",
    body: "You hear what each choice is likely to cost and what it's worth before you commit. No padding, no upsell.",
  },
  {
    title: "Exit-minded",
    body: "Even routine decisions are made with one eye on what the business is worth, so you're building something sellable.",
  },
];

export const credentials = [
  {
    title: "Chartered Tax Adviser (CTA)",
    body: "Awarded by the Chartered Institute of Taxation, the leading UK qualification for tax advice and the technical depth behind every plan.",
  },
  {
    title: "Chartered Accountant (ACA)",
    body: "An ICAEW Chartered Accountant, trained in accountancy as well as tax, so advice connects to the real numbers.",
  },
  {
    title: "PwC Trained",
    body: "Big Four advisory experience, applied to the practical decisions owners actually face.",
  },
  {
    title: "Cross-border tax",
    body: "Leaving the UK, arriving in it, or trading across it. Residence, double taxation, and what actually follows you.",
  },
];

export const faqs = [
  {
    question: "What does Big Four mean?",
    answer:
      "Big Four means PwC, Deloitte, EY, and KPMG: the four largest global accounting and advisory firms. PwC trained means our team has experience from one of those firms, then applies that structured thinking to the practical decisions business owners actually face.",
  },
  {
    question: "Do I need to understand tax before we speak?",
    answer:
      "No. That is the point. You should be able to explain what you want from the business, what feels messy, and what you are unsure about. We can translate the tax and accountancy part into plain English.",
  },
  {
    question: "Is this just someone telling me to spend less?",
    answer:
      "No. Most owners do not need a lecture about costs. They need a clearer plan for profit, tax, director pay, reinvestment, and what to do before the year-end panic starts.",
  },
  {
    question: "Am I too small for this?",
    answer:
      "Probably not if the business is making real money and you are unsure how much you should keep, pay yourself, save for tax, or put back into growth. The work is about better decisions, whatever size you are.",
  },
  {
    question: "Can my normal accountant not just do this?",
    answer:
      "Maybe. Some accountants are excellent at proactive planning. Others mainly handle compliance after the fact. This is for founders who want the advice before decisions are made, not only after the numbers are already history.",
  },
  {
    question: "What kinds of business do you work with?",
    answer:
      "Owner-managed UK businesses of most kinds: agencies, professional practices, property, and trading companies. The work is strongest where the tax is genuinely complicated, which usually means cross-border income, a sale on the horizon, or a structure that has outgrown itself.",
  },
  {
    question: "Can you help me build toward selling the business?",
    answer:
      "Yes. A lot of the value is getting the numbers clean and the profit story clear well before an exit, so the business is easier to sell and holds up under a buyer's scrutiny.",
  },
  {
    question: "What happens after I book?",
    answer:
      "You will have a short discovery call to understand where the business is today, what is bothering you financially, and whether we can help.",
  },
  {
    question: "Is this going to be really boring?",
    answer:
      "The tax bits might be. The useful part should not be. The goal is to make the money side feel calmer and clearer, so you can run the business with fewer surprises.",
  },
];

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/results", label: "Results" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
