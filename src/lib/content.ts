// Shared site content. Copy is tuned to the Ideal Client Profile
// (see docs/ideal-client-profile.md): founder-led UK digital/marketing agencies,
// £500k to £5m turnover, scaling toward a 5 to 10 year exit.

export const site = {
  name: "Simon Jacobs",
  firm: "Jacobs Taxes",
  legalName: "SRJ International Limited",
  role: "Chartered Tax Adviser",
  email: "simon@jacobs-taxes.com",
  phone: "07821 900 992",
  bookSubject: "Agency tax planning discovery call",
  tagline:
    "I help UK marketing agencies keep more of what they earn.",
} as const;

// The full compliance service list (carried over from SRJ International).
export const servicesFull = [
  "Corporation tax",
  "Accounts preparation",
  "VAT & CIS",
  "Tax planning",
  "Payroll",
  "Company secretarial & registered address",
  "Self-assessment & MTD",
  "Bookkeeping",
];

// Real client testimonials, lightly edited for length. `highlight` is an exact
// substring of `quote` that gets emphasised (the payoff that matters most).
export const testimonials = [
  {
    quote:
      "Simon helped me save thousands on my tax bill and prevented me from losing my Personal Allowance. He also gave me very good insights and advice into cryptocurrency, which will save me thousands of pounds in the future.",
    highlight: "save thousands on my tax bill and prevented me from losing my Personal Allowance",
    name: "Joe G",
    role: "Digital marketing agency",
  },
  {
    quote:
      "Simon helped me reclaim money I did not even realise I was entitled to, saved me a significant amount in tax through proper structuring, and ensured everything is compliant and future-proof. What really separates him is how proactive and responsive he is. He advises, explains, and genuinely fights your corner with HMRC. You feel protected, informed, and strategically guided at all times.",
    highlight: "saved me a significant amount in tax through proper structuring",
    name: "Hamish B",
    role: "Dentist",
  },
  {
    quote:
      "Simon has always given the best he can for the customer. Understanding my situation has allowed him to advise and guide me in the right direction and be more tax efficient where possible.",
    highlight: "be more tax efficient where possible",
    name: "Jaison M",
    role: "Landlord",
  },
];

export const bookHref = "https://calendar.app.google/LjoJzvA8E1p9E8oV7";
export const scorecardHref = "/scorecard";

// Home-page section copy (Gate 3, drawn from docs/copy-research/Language of the Customer.docx)
export const hero = {
  eyebrow: "Chartered Tax Adviser · Ex-PwC · Agencies only",
  titleLead: "Tax, profit and accounts for UK",
  titleAccent: "marketing agencies.",
  sub: "I help founder-led UK marketing agencies keep more of what they earn and build a business that's actually worth selling.",
  subAside: "(No, ChatGPT can't do this part.)",
};

// Lead statement: the opening line that leads the reader into the whole page.
export const lead = {
  partA: "Most agency owners are brilliant at winning clients but ",
  inkAccent: "terrible at keeping what they make.",
  partB: " Because nobody ever showed them ",
  tealAccent: "what's actually possible.",
};

export const exitAngle = {
  eyebrow: "Plan your exit",
  headingLead: "The",
  headingAccent: "long game",
  headingTail: " as a founder.",
  body: "Every agency gets sold eventually. To sell for a serious multiple, founders need clean, profitable books and the right structure, built 12 to 24 months before the offer ever lands. I handle the structuring, the tax and the accounts quietly in the background, so when a buyer comes knocking your agency is worth more, and you walk away with far more of the sale.",
};

export const scorecardBand = {
  eyebrow: "Free Profit-Rich Scorecard",
  headingLead: "Find out exactly where your agency is ",
  headingAccent: "leaking profit.",
  sub: "Answer a few quick questions and Simon sends back your score across 7 areas, plus a 90-day plan to plug the leaks. Free, and no sales pitch.",
  cta: "Take the Scorecard",
  time: "est. ~5 minutes",
};

// The Profit-Rich DIGITAL Scorecard. Area D's questions are Simon's exact wording
// from the live Google Form; D-I-G-I-T-A-L areas the rest are drafted in the same
// style and format (CONFIRM wording with Simon). Each question scores No 0 /
// Sometimes 1 / Yes 2, so each area is out of 6 and the whole thing out of 42.
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
      "Is your company structure reviewed as the agency grows?",
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
    title: "Agency VAT & revenue",
    questions: [
      "Are you on the right VAT scheme for an agency?",
      "Do you handle VAT correctly on pass-through costs and overseas clients?",
      "Is revenue recognised correctly across retainers and projects?",
    ],
  },
  {
    letter: "L",
    title: "Long-term wealth & exit",
    questions: [
      "Are you building the agency with a future sale or exit in mind?",
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
      "CTA and ACA mean Simon is trained in both tax advice (Chartered Institute of Taxation) and accountancy (ICAEW). In plain English: your agency gets advice that connects tax planning with the real numbers.",
  },
  {
    label: "Background",
    value: "Ex-PwC",
    description:
      "Ex-PwC means Simon has Big Four advisory experience. In plain English: you get structured thinking usually reserved for larger businesses, applied to your agency.",
  },
  {
    label: "Specialism",
    value: "UK Marketing Agencies",
    description:
      "This means the advice is shaped around UK agency realities like retainers, margins, payroll, dividends, and reinvestment decisions.",
  },
];

export const services = [
  {
    title: "Tax planning",
    body: "Pay less, legally, and never get blindsided by a year-end bill again. We make the call before the money moves: corporation tax, VAT, and how you take money out.",
    includes: [
      "Corporation tax forecasting and timing",
      "A VAT position and scheme that fits an agency",
      "Director extraction: salary, dividends, pension",
      "Allowances and reliefs where they genuinely apply",
      "Decisions modelled before you commit, not after",
    ],
  },
  {
    title: "Profit extraction",
    body: "Keep more of what you earn. The right salary, dividend and pension mix for your numbers, so the agency funds your life, not just the taxman's.",
    includes: [
      "The right salary and dividend split for your numbers",
      "Pension used as a tax-efficient extraction route",
      "Withdrawals timed around the tax year",
      "A balance between what you take and what funds growth",
      "Extraction planned with an eventual sale in mind",
    ],
  },
  {
    title: "Agency accountancy",
    body: "The boring stuff, handled. Bookkeeping, VAT, payroll and year-end done properly, with management accounts you can actually read, and books clean enough to survive a buyer's due diligence.",
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
  "You run a UK marketing or digital agency turning over roughly £500k to £2.5m.",
  "You're the founder, and the one who actually makes the call.",
  "Corporation, VAT and personal tax take a bigger bite every year.",
  "You're done doing your tax DIY and hoping for the best.",
  "You want to build something worth selling, not just a job that pays well.",
];

export const resultItems = [
  "Clearer monthly profit visibility",
  "Fewer last-minute tax surprises",
  "Better director pay decisions",
  "A cleaner, more valuable agency to sell",
];

export const processSteps = [
  {
    title: "Diagnose",
    body: "We start with a discovery call and a look at the numbers: turnover, margins, current extraction, your tax position, and your goals for the next few years. The aim is to find where profit is quietly leaking and where the easy wins are.",
  },
  {
    title: "Plan",
    body: "You get a focused tax and profit plan written in plain English, with the trade-offs spelled out, what each choice is likely to cost, and what it means for both your take-home and the agency's value at exit.",
  },
  {
    title: "Maintain",
    body: "The plan is kept live through the year with regular check-ins, so big decisions like hiring, dividends, and reinvestment happen with the numbers in front of you, before deadlines force your hand.",
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
    body: "Even routine decisions are made with one eye on the agency's value, so you're building something sellable.",
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
    title: "Ex-PwC",
    body: "Big Four advisory experience, applied to the practical decisions agency founders face.",
  },
  {
    title: "Agency specialist",
    body: "Focused on UK marketing and digital agencies: retainers, margins, and founder incentives.",
  },
];

export const faqs = [
  {
    question: "What does Big Four mean?",
    answer:
      "Big Four means PwC, Deloitte, EY, and KPMG: the four largest global accounting and advisory firms. Ex-PwC means Simon has experience from one of those firms, then applies that structured thinking to the practical decisions agency owners actually face.",
  },
  {
    question: "Do I need to understand tax before we speak?",
    answer:
      "No. That is the point. You should be able to explain what you want from the agency, what feels messy, and what you are unsure about. Simon can translate the tax and accountancy part into plain English.",
  },
  {
    question: "Is this just someone telling me to spend less?",
    answer:
      "No. Most agency owners do not need a lecture about costs. They need a clearer plan for profit, tax, director pay, reinvestment, and what to do before the year-end panic starts.",
  },
  {
    question: "Am I too small for this?",
    answer:
      "Probably not if the agency is making real money and you are unsure how much you should keep, pay yourself, save for tax, or put back into growth. The work is about better decisions, not acting like a giant company.",
  },
  {
    question: "Can my normal accountant not just do this?",
    answer:
      "Maybe. Some accountants are excellent at proactive planning. Others mainly handle compliance after the fact. This is for founders who want the advice before decisions are made, not only after the numbers are already history.",
  },
  {
    question: "Do you only work with marketing agencies?",
    answer:
      "The focus is UK marketing and digital agencies because the advice is strongest when it understands the business model, margins, retainers, and founder incentives.",
  },
  {
    question: "Can you help me build toward selling the agency?",
    answer:
      "Yes. A lot of the value is getting the numbers clean and the profit story clear well before an exit, so the agency is easier to sell and holds up under a buyer's scrutiny.",
  },
  {
    question: "What happens after I book?",
    answer:
      "You will have a short discovery call to understand where the agency is today, what is bothering you financially, and whether Simon can help.",
  },
  {
    question: "Is this going to be really boring?",
    answer:
      "The tax bits might be. The useful part should not be. The goal is to make the money side feel calmer and clearer, so you can run the agency with fewer surprises.",
  },
];

export type NavLink = { href: string; label: string };

export const navLinks: NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
