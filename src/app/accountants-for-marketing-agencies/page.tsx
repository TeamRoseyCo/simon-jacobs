import type { Metadata } from "next";
import Link from "next/link";
import ConsultCta from "@/components/ConsultCta";
import Testimonials from "@/components/Testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import { site, bookCtaHref, scorecardHref } from "@/lib/content";

const siteUrl = site.url;

export const metadata: Metadata = {
  title: "Accountants for Marketing Agencies",
  description:
    "Specialist accountants and Chartered Tax Advisers for UK marketing agencies. Corporation tax, VAT, profit extraction, and exit planning built around how founder-led agencies actually run.",
  alternates: { canonical: "/accountants-for-marketing-agencies" },
  openGraph: {
    type: "website",
    title: "Accountants for Marketing Agencies | SRJ International",
    description:
      "Specialist accountants and Chartered Tax Advisers for UK marketing agencies, built around how founder-led agencies actually run.",
    url: `${siteUrl}/accountants-for-marketing-agencies`,
    images: [{ url: "/simon-jacobs.jpg" }],
  },
};

// Agency-specific FAQ. Answers are 40-60 words (featured-snippet / AI-citation
// friendly) and kept descriptive rather than prescriptive — specifics are
// always "we look at your numbers", so nothing here reads as filed tax advice.
const faqs = [
  {
    question: "Do marketing agencies need a specialist accountant?",
    answer:
      "Not strictly, but it helps. Agencies have quirks a generalist rarely sees daily: rebilled ad spend and VAT, freelancers and IR35, lumpy retainer and project cashflow, and how founders take money out. A specialist spots the planning opportunities and the traps that a general practice can miss.",
  },
  {
    question: "How is accounting different for a marketing agency?",
    answer:
      "The mechanics are the same, the risk areas are not. Pass-through client costs distort margins, ad spend affects VAT, subcontractors raise status questions, and income arrives unevenly. Agency accounts are most useful when they separate real profit from money that is only passing through.",
  },
  {
    question: "Can you help my agency pay less tax?",
    answer:
      "We plan corporation tax, VAT, and profit extraction together, before the money moves rather than after year-end. How much that saves depends entirely on your numbers and structure, so the honest answer is that we look at your specific position on a call first, then tell you.",
  },
  {
    question: "Do you work with agencies that have international clients or founders abroad?",
    answer:
      "Yes. We advise UK agencies serving clients worldwide, and founders weighing a move abroad. That means looking at both sides, UK residence and the overseas position, rather than only one. Getting the UK rules right first usually matters more than people expect.",
  },
  {
    question: "What size of agency do you work with?",
    answer:
      "Typically founder-led UK agencies from around £500k to £5m in turnover, usually 1 to 20 people. That is the point where tax and profit extraction start to matter a lot, and where a specialist adds the most value ahead of a future sale.",
  },
  {
    question: "Can you help me plan for selling my agency?",
    answer:
      "Yes, and the earlier the better. A clean, well-structured set of books built 12 to 24 months before an offer lands makes an agency worth more and the sale far more tax-efficient. We handle the structuring and accounts quietly in the background so you are ready when a buyer appears.",
  },
  {
    question: "How much does an accountant for a marketing agency cost?",
    answer:
      "It depends on your size, structure, and what you need handled. Rather than quote a misleading number, we scope it on a short discovery call and give you a clear figure. Most agency owners find the tax planning pays for the fee several times over.",
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
      name: "Accountants for marketing agencies",
      item: `${siteUrl}/accountants-for-marketing-agencies`,
    },
  ],
};

// The five agency-specific areas, each linking down to its cluster post (the
// hub-and-spoke internal linking that builds topical authority).
const areas = [
  {
    title: "Rebilled costs & VAT",
    body: "Ad spend, software, and media you buy on a client's behalf distort your VAT position and your true margin. We make sure VAT is handled on the right scheme for an agency, and that pass-through money is never mistaken for profit.",
    href: "/blog/vat-for-agencies",
    linkText: "VAT for agencies",
  },
  {
    title: "Freelancers & IR35",
    body: "Most agencies flex capacity with freelancers and subcontractors. That raises employment-status and off-payroll questions that can get expensive if they are ignored. We keep the arrangement clean and defensible.",
    href: "/blog/agency-expenses-checklist",
    linkText: "What agencies can claim",
  },
  {
    title: "How you pay yourself",
    body: "Salary, dividends, pension, and interest all pull in different directions. We plan how you take money out of the company so more of it reaches you, decided before the money moves rather than after.",
    href: "/blog/how-much-should-agency-founders-pay-themselves",
    linkText: "How much to pay yourself",
  },
  {
    title: "Retainer & project cashflow",
    body: "Agency income arrives unevenly, which makes tax bills feel like an ambush. We plan around your real cashflow so corporation tax and VAT are visible early, never a year-end surprise.",
    href: "/blog/vat-for-agencies",
    linkText: "Agency VAT & cashflow",
  },
  {
    title: "Building toward an exit",
    body: "Every agency gets sold eventually. Clean books and the right structure, in place well before an offer, raise the multiple and cut the tax on the sale. We build that quietly in the background.",
    href: "/blog/plan-tax-around-your-exit",
    linkText: "Plan tax around your exit",
  },
];

export default function AccountantsForMarketingAgenciesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-8 pt-20 text-center md:px-10 md:pt-28 lg:px-16">
        <div className="reveal mx-auto max-w-3xl">
          <p className="eyebrow">Chartered Tax Adviser · Ex-PwC · Agencies only</p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Accountants for{" "}
            <span className="em-display text-teal">marketing agencies.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-base leading-8 text-muted">
            SRJ International is a firm of specialist accountants and Chartered
            Tax Advisers for UK marketing agencies. We handle corporation tax,
            VAT, profit extraction, and accounts around how founder-led agencies
            actually run, so you keep more of what you earn and build a business
            that is genuinely worth selling.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={bookCtaHref} className="hv-btn-primary">
              Book a discovery call
              <span aria-hidden="true">→</span>
            </Link>
            <Link href={scorecardHref} className="hv-btn-ghost">
              Take the free scorecard
            </Link>
          </div>
        </div>
      </section>

      {/* Why a specialist */}
      <section className="section-white mx-auto w-full max-w-3xl px-6 pb-12 pt-6 md:px-10 md:pb-16 lg:px-16">
        <div className="reveal">
          <h2 className="font-serif text-3xl font-normal leading-tight md:text-4xl">
            Why marketing agencies need a{" "}
            <span className="em-display text-teal">specialist accountant.</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-muted">
            A general accountant will file your accounts correctly and keep you
            compliant. That is the floor, not the ceiling. Marketing agencies
            carry quirks that a generalist rarely sees every day: ad spend and
            media rebilled to clients, freelancers and subcontractors, lumpy
            retainer and project income, and the constant question of how the
            founder should actually take money out of the business.
          </p>
          <p className="mt-4 text-base leading-8 text-muted">
            Because we only work with agencies, we see those patterns
            constantly. We know where the profit leaks, where the planning
            opportunities sit, and where the traps are, so the advice is
            specific to how your agency runs rather than generic small-business
            box-ticking. And because our founder is a Chartered Tax Adviser
            (CTA · ACA) who trained at PwC, the tax planning goes well beyond
            what most high-street firms offer.
          </p>
        </div>
      </section>

      {/* The agency-specific areas (hub → cluster links) */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="eyebrow">What actually moves the numbers</p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            The five areas we get right for{" "}
            <span className="em-display text-teal">agencies.</span>
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

      {/* Proof */}
      <Testimonials />

      <section className="section-white mx-auto w-full max-w-3xl px-6 py-14 text-center md:px-10 md:py-16 lg:px-16">
        <p className="reveal text-base leading-8 text-muted">
          Want the detail on outcomes and how we work?{" "}
          <Link href="/results" className="font-semibold text-accent hover:text-ink">
            See client results
          </Link>{" "}
          or read the{" "}
          <Link href="/blog" className="font-semibold text-accent hover:text-ink">
            agency tax notes
          </Link>
          .
        </p>
      </section>

      {/* FAQ */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 pt-2 md:px-10 md:pb-24 lg:px-16">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="eyebrow">Agency FAQ</p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Questions agency owners{" "}
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
        heading="See what a specialist agency accountant could save you."
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
    </>
  );
}
