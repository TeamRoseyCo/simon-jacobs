import type { Metadata } from "next";
import Link from "next/link";
import ConsultCta from "@/components/ConsultCta";
import Testimonials from "@/components/Testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import { site, bookCtaHref, scorecardHref } from "@/lib/content";

const siteUrl = site.url;

// Exact-match page for the query "chartered tax adviser/advisor London for
// marketing agency". Our wedge vs the ranking firms (Alto, SRLV, BKL, Brebners,
// Hayes): most are chartered ACCOUNTANTS with a tax team; Simon is personally a
// Chartered Tax ADVISER (CTA), which is exactly what this query asks for. So the
// page owns the CTA angle, carries London local signals (NAP + LocalBusiness
// schema), and names the agency-specific hooks AI Overviews reward. Safe method
// throughout: descriptive not prescriptive, no invented figures.
export const metadata: Metadata = {
  title: "Chartered Tax Adviser in London for Marketing Agencies",
  description:
    "A London-based Chartered Tax Adviser (CTA, ACA, ex-PwC) for marketing agencies. Retainer revenue, media pass-through VAT, IR35, profit extraction and exit planning. Deal with the adviser, not an account manager.",
  keywords: [
    "chartered tax adviser London",
    "chartered tax advisor London",
    "tax adviser for marketing agencies",
    "CTA for marketing agencies",
    "London agency accountant",
    "marketing agency tax planning",
  ],
  alternates: { canonical: "/chartered-tax-adviser-london-marketing-agencies" },
  openGraph: {
    type: "website",
    title:
      "Chartered Tax Adviser in London for Marketing Agencies | SRJ International",
    description:
      "London Chartered Tax Adviser (CTA, ACA, ex-PwC) built for marketing agencies. Retainers, media pass-through VAT, IR35, profit extraction, exit.",
    url: `${siteUrl}/chartered-tax-adviser-london-marketing-agencies`,
    images: [{ url: "/simon-jacobs.jpg" }],
  },
};

// Descriptive, 40-70 word answers (safe method). Specifics always resolve to
// "we look at your numbers" rather than a prescriptive figure.
const faqs = [
  {
    question:
      "What is the difference between a chartered tax adviser and an accountant for my agency?",
    answer:
      "Most agency accountants are Chartered Accountants who file accounts and keep you compliant, with tax handled by a separate team. A Chartered Tax Adviser (CTA) is the CIOT's specialist tax qualification, so tax planning is the core skill rather than an add-on. Simon holds both the CTA and the ACA, so the planning and the accounts sit with one person.",
  },
  {
    question: "Are you based in London?",
    answer:
      "Yes. SRJ International is a London practice (North London, N20), and we work with marketing agencies across London and the wider UK. Most of the work runs by video call and shared cloud accounting, so you get a London-qualified Chartered Tax Adviser without needing to be in the same postcode.",
  },
  {
    question: "Do you work specifically with marketing agencies?",
    answer:
      "Yes. Marketing, digital, creative and advertising agencies are the focus, because the advice is strongest when it understands retainers, project margins, media pass-through, freelancers and how founders take profit. We are not a generalist firm that happens to have a few agency clients.",
  },
  {
    question: "How do you handle retainer and project revenue for an agency?",
    answer:
      "Retainers and project fees can be recognised in different ways, and getting it wrong distorts both your margin and your tax. We make sure revenue is recognised on the right basis for how you actually invoice and deliver, so the accounts show real profit across retainers and one-off projects rather than a misleading spike.",
  },
  {
    question: "Can you help with VAT on media and pass-through costs?",
    answer:
      "Yes. Media and ad spend bought on a client's behalf is not your income, and booked wrongly it inflates turnover and confuses your VAT. We separate genuine agency income from money in transit and check you are on the right VAT scheme for your client mix, including overseas clients under the place-of-supply rules.",
  },
  {
    question: "Do you deal with IR35 and freelancers?",
    answer:
      "Yes. Agencies lean heavily on freelancers and contractors, which raises employment status and off-payroll (IR35) questions. We help you engage people in a way that is clean and defensible, so a cost-effective freelance model does not turn into an unexpected tax liability later.",
  },
  {
    question: "Can you help me plan the sale of my agency?",
    answer:
      "Yes, and the earlier the better. Buyers scrutinise how clean the numbers are and whether reported profit is real. Structuring and cleaning the books 12 to 24 months before a sale tends to make the agency worth more and the exit far more tax-efficient. We plan the tax around the exit, not just the year-end.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
    {
      "@type": "ListItem",
      position: 2,
      name: "Chartered Tax Adviser in London for marketing agencies",
      item: `${siteUrl}/chartered-tax-adviser-london-marketing-agencies`,
    },
  ],
};

// Service + local provider. areaServed leads with London so the page carries a
// geo signal for "London" queries, backed by the NAP rendered on-page below.
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Chartered Tax Adviser for marketing agencies in London",
  serviceType:
    "Tax planning, profit extraction and accountancy for UK marketing agencies",
  areaServed: [
    { "@type": "City", name: "London" },
    { "@type": "Country", name: "United Kingdom" },
  ],
  provider: {
    "@type": "AccountingService",
    "@id": `${siteUrl}/#organization`,
    name: "SRJ International",
    alternateName: "Jacobs Taxes",
    url: siteUrl,
    telephone: "+447821900992",
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "10 Northcliffe Drive",
      addressLocality: "London",
      addressRegion: "England",
      postalCode: "N20 8JZ",
      addressCountry: "GB",
    },
    areaServed: "GB",
    founder: {
      "@type": "Person",
      name: "Simon Jacobs",
      jobTitle: "Chartered Tax Adviser (CTA · ACA)",
      sameAs: [site.linkedin, site.instagram, site.icaew],
    },
  },
};

const areas = [
  {
    title: "Retainer & project revenue",
    body: "Retainers and project fees can be recognised in different ways, and the wrong basis distorts both margin and tax. We recognise revenue the way you actually invoice and deliver, so the numbers show real profit.",
    href: "/blog/clean-books-higher-valuation",
    linkText: "Why clean books matter",
  },
  {
    title: "Media pass-through VAT",
    body: "Ad spend and media bought for clients is not your income. Booked wrongly it inflates turnover and confuses VAT. We keep pass-through as pass-through and put you on the right VAT scheme.",
    href: "/blog/vat-for-agencies",
    linkText: "How agency VAT works",
  },
  {
    title: "IR35 & freelancers",
    body: "Agencies run on contractors, which raises employment status and off-payroll questions. We help you engage freelancers in a way that stays clean and defensible under IR35.",
    href: "/blog/agency-expenses-checklist",
    linkText: "What you can claim",
  },
  {
    title: "Profit extraction",
    body: "How you split salary, dividends and pension decides how much of the agency's profit you actually keep. We plan director pay around your numbers, not a generic template.",
    href: "/blog/how-much-should-agency-founders-pay-themselves",
    linkText: "Salary vs dividends",
  },
  {
    title: "Corporation tax planning",
    body: "We forecast and plan your corporation tax before the year-end, so decisions on hiring, dividends and reinvestment happen with the tax bill in view rather than as a nasty surprise.",
    href: "/blog/how-to-reduce-your-agencys-corporation-tax",
    linkText: "Reduce corporation tax",
  },
  {
    title: "Exit & sale planning",
    body: "Buyers look hard at whether reported profit is real. Clean, well-structured books built 12 to 24 months ahead make the agency worth more and the sale far more tax-efficient.",
    href: "/blog/plan-tax-around-your-exit",
    linkText: "Plan tax around your exit",
  },
];

export default function CharteredTaxAdviserLondonPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-8 pt-20 text-center md:px-10 md:pt-28 lg:px-16">
        <div className="reveal mx-auto max-w-3xl">
          <p className="eyebrow">Chartered Tax Adviser (CTA) · London · Agencies only</p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            A Chartered Tax Adviser in London, built for{" "}
            <span className="em-display text-teal">marketing agencies.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-lg font-medium leading-8 text-ink">
            Most &ldquo;agency accountants&rdquo; are accountants with a tax team.
            You would be dealing with a Chartered Tax Adviser directly.
          </p>
          <p className="mx-auto mt-4 max-w-[640px] text-base leading-8 text-muted">
            SRJ International is a London practice led by Simon Jacobs, a
            Chartered Tax Adviser (CTA · ACA) and ex-PwC. We work only with UK
            marketing, digital and creative agencies on retainer revenue, media
            pass-through VAT, IR35, profit extraction and exit planning. You deal
            with the adviser, not an account manager.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={bookCtaHref} className="hv-btn-primary">
              Book a discovery call
              <span aria-hidden="true">→</span>
            </Link>
            <Link href={scorecardHref} className="hv-btn-ghost-ink">
              See where your profit leaks
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* The wedge: adviser, not just an accountant */}
      <section className="section-white mx-auto w-full max-w-3xl px-6 pb-12 pt-6 md:px-10 md:pb-16 lg:px-16">
        <div className="reveal">
          <h2 className="font-serif text-3xl font-normal leading-tight md:text-4xl">
            A tax adviser, not just{" "}
            <span className="em-display text-teal">an accountant.</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-muted">
            When you search for a chartered tax advisor in London for your
            marketing agency, most of the firms you find are Chartered
            Accountants who file your accounts and hand the tax to a separate
            team. That keeps you compliant. It rarely keeps more of your profit.
          </p>
          <p className="mt-4 text-base leading-8 text-muted">
            The Chartered Tax Adviser (CTA) qualification, awarded by the
            Chartered Institute of Taxation, is the UK&apos;s specialist tax
            credential. Simon holds the CTA and the ACA and trained at PwC, so
            the tax planning and the accounts sit with one person who actually
            understands how an agency earns: retainers, project margins, media
            pass-through, freelancers, and how founders take money out.
          </p>
        </div>
      </section>

      {/* Agency-specific areas */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="eyebrow">What actually moves the numbers</p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Built around how an agency{" "}
            <span className="em-display text-teal">really earns.</span>
          </h2>
        </div>
        <div className="mt-10 grid gap-4 text-left md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area, index) => (
            <article
              key={area.title}
              className="finance-card reveal flex h-full flex-col p-6 md:p-7"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <h3 className="font-serif text-2xl font-normal text-ink">
                {area.title}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-muted">
                {area.body}
              </p>
              <Link
                href={area.href}
                className="mt-5 text-sm font-semibold text-accent transition hover:text-ink"
              >
                {area.linkText} →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* London local signal */}
      <section className="section-blue-soft px-6 py-16 md:px-10 md:py-20 lg:px-16">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="eyebrow">Based in London, working across the UK</p>
          <h2 className="mt-4 font-serif text-3xl font-normal leading-tight md:text-4xl">
            A London Chartered Tax Adviser,{" "}
            <span className="em-display text-teal">wherever your agency is.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-muted">
            The practice is based in North London ({site.physicalAddress}). We
            work with agencies across London and the wider UK, mostly by video
            call and shared cloud accounting, so you get a London-qualified CTA
            without being tied to one postcode. Prefer to talk it through? Call{" "}
            <a
              href="tel:+447821900992"
              className="font-semibold text-accent hover:text-ink"
            >
              {site.phone}
            </a>
            .
          </p>
        </div>
      </section>

      {/* Proof */}
      <Testimonials />

      {/* Cross-links */}
      <section className="section-white mx-auto w-full max-w-3xl px-6 py-14 text-center md:px-10 md:py-16 lg:px-16">
        <p className="reveal text-base leading-8 text-muted">
          More on how we work with{" "}
          <Link
            href="/accountants-for-marketing-agencies"
            className="font-semibold text-accent hover:text-ink"
          >
            marketing agencies
          </Link>
          ,{" "}
          <Link
            href="/accountants-for-creative-agencies"
            className="font-semibold text-accent hover:text-ink"
          >
            creative agencies
          </Link>{" "}
          and{" "}
          <Link
            href="/accountants-for-advertising-agencies"
            className="font-semibold text-accent hover:text-ink"
          >
            advertising agencies
          </Link>
          . See{" "}
          <Link href="/results" className="font-semibold text-accent hover:text-ink">
            client results
          </Link>{" "}
          or meet{" "}
          <Link href="/about" className="font-semibold text-accent hover:text-ink">
            Simon
          </Link>
          .
        </p>
      </section>

      {/* FAQ */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 pt-2 md:px-10 md:pb-24 lg:px-16">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="eyebrow">London agency tax FAQ</p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            What agency founders{" "}
            <span className="em-display text-teal">ask us first.</span>
          </h2>
        </div>
        <div className="mt-10">
          <FaqAccordion items={faqs} />
        </div>
        <p className="reveal mx-auto mt-8 max-w-[640px] text-center text-xs leading-6 text-muted">
          General information, not personal tax advice. Rules and thresholds
          change; we advise on your specific position on a call.
        </p>
      </section>

      <ConsultCta
        heading="Talk to a Chartered Tax Adviser who only works with agencies."
        sub="Book a short discovery call and we will look at where your profit is going."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
    </>
  );
}
