// Shared site content. Copy is tuned to the Ideal Client Profile
// (see docs/ideal-client-profile.md): founder-led UK digital/marketing agencies,
// £500k–£5m turnover, scaling toward a 5–10 year exit.

export const site = {
  name: "Simon Jacobs",
  role: "Chartered Tax Adviser",
  email: "hello@simonjacobs.co.uk",
  bookSubject: "Agency tax planning discovery call",
  tagline:
    "Tax planning, profit extraction, and accountancy for UK marketing agencies.",
} as const;

export const bookHref = `mailto:${site.email}?subject=${encodeURIComponent(
  site.bookSubject,
)}`;

export const trustItems = [
  {
    label: "Qualified",
    value: "CTA · CA",
    description:
      "CTA and CA mean Simon is trained in both tax advice and accountancy. In plain English: your agency gets advice that connects tax planning with the real numbers.",
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
    body: "Make cleaner decisions before the money moves, from corporation tax and VAT to director extraction and timing.",
  },
  {
    title: "Profit extraction",
    body: "Build a practical route for paying yourself well without blunting the agency's ability to grow.",
  },
  {
    title: "Agency accountancy",
    body: "Management accounts, compliance, and calm financial visibility shaped around the way agencies actually run.",
  },
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
    body: "We review the numbers, owner goals, current extraction, and the places profit is quietly leaking.",
  },
  {
    title: "Plan",
    body: "You get a focused tax and profit plan with plain-English trade-offs, not a pile of abstract options.",
  },
  {
    title: "Maintain",
    body: "The plan is kept live through the year, so decisions happen before deadlines force your hand.",
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
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];
