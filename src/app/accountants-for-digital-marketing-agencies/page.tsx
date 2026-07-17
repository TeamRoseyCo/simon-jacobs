import type { Metadata } from "next";
import Link from "next/link";
import ConsultCta from "@/components/ConsultCta";
import Testimonials from "@/components/Testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import { site, bookCtaHref, scorecardHref } from "@/lib/content";

const siteUrl = site.url;

export const metadata: Metadata = {
  title: "Accountants for Digital Marketing Agencies",
  description:
    "Specialist accountants and Chartered Tax Advisers for UK digital marketing agencies: PPC, paid media, and performance shops. Ad-spend pass-through and VAT, retainers, software costs, contractors, profit extraction, and exit planning.",
  alternates: { canonical: "/accountants-for-digital-marketing-agencies" },
  openGraph: {
    type: "website",
    title: "Accountants for Digital Marketing Agencies | SRJ International",
    description:
      "Chartered Tax Advisers for UK digital and performance marketing agencies, built around how paid-media work actually bills and runs.",
    url: `${siteUrl}/accountants-for-digital-marketing-agencies`,
    images: [{ url: "/simon-jacobs.jpg" }],
  },
};

// Digital-marketing-specific FAQ. Answers 40-60 words, descriptive not
// prescriptive (safe method): specifics are always "we look at your numbers".
const faqs = [
  {
    question: "Do digital marketing agencies need a specialist accountant?",
    answer:
      "It helps a lot. Performance and PPC shops move large amounts of client ad spend, bill on monthly retainers plus performance fees, and carry a stack of software subscriptions. A specialist keeps ad spend out of your profit figure, gets the VAT treatment right, and plans tax around how the model actually runs.",
  },
  {
    question: "How is accounting different for a digital marketing agency?",
    answer:
      "The ad spend is the difference. Paid media bought on a client's behalf can dwarf your own fee income, so gross revenue looks huge while real margin is thin. Digital-agency accounts are most useful when they separate media that is only passing through from the fee you actually keep.",
  },
  {
    question: "How should client ad spend be treated for VAT and margin?",
    answer:
      "It depends on whether you buy the media as principal or arrange it as the client's agent, and how you invoice it. That distinction changes both your VAT position and what counts as your turnover. We look at how your contracts and invoices are structured, then set the treatment that reflects reality.",
  },
  {
    question: "Do you handle contractors and freelancers for digital agencies?",
    answer:
      "Yes. Paid-media and performance teams flex with freelancers, specialists, and offshore contractors, which raises employment status and off-payroll questions. We help you engage people in a way that is clean and defensible, so flexing capacity does not turn into a compliance problem later.",
  },
  {
    question: "Can you help plan the sale of a digital marketing agency?",
    answer:
      "Yes, and the earlier the better. Buyers look hard at recurring retainer revenue, client concentration, and how clean the numbers are. Well-structured books built 12 to 24 months before an offer make the real profit legible to a buyer and the sale far more tax-efficient.",
  },
  {
    question: "Do you work with digital agencies that have overseas clients?",
    answer:
      "Yes. We advise UK digital agencies serving clients worldwide, where the VAT position depends on where the business client belongs (place of supply), and founders who live or operate abroad. We look at both the UK and the overseas side rather than only one.",
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
      name: "Accountants for digital marketing agencies",
      item: `${siteUrl}/accountants-for-digital-marketing-agencies`,
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Accountancy and tax advice for digital marketing agencies",
  serviceType: "Tax planning and accountancy for UK digital marketing agencies",
  areaServed: { "@type": "Country", name: "United Kingdom" },
  provider: {
    "@type": "AccountingService",
    name: "SRJ International",
    url: siteUrl,
  },
};

const areas = [
  {
    title: "Ad spend & pass-through revenue",
    body: "In a PPC or paid-media shop the media you buy for clients can dwarf your own fee. We make sure that spend is never counted as profit, so your numbers show the fee you actually keep rather than a headline figure that flatters the business.",
    href: "/blog/vat-for-agencies",
    linkText: "VAT for agencies",
  },
  {
    title: "VAT on media & principal vs agent",
    body: "Whether you buy media as principal or arrange it as the client's agent changes your VAT position and your turnover. We look at how your contracts and invoices work, then set the treatment that reflects what is really happening.",
    href: "/blog/vat-for-agencies",
    linkText: "Agency VAT explained",
  },
  {
    title: "Retainers & performance fees",
    body: "Digital income mixes monthly retainers with performance and project fees, which lands unevenly. We plan corporation tax and VAT around that real cashflow so the bill is visible early, never a year-end ambush.",
    href: "/blog/how-to-reduce-your-agencys-corporation-tax",
    linkText: "Reduce your corporation tax",
  },
  {
    title: "Software & subscription costs",
    body: "Ad platforms, analytics, reporting, and the wider SaaS stack are a real cost of running a digital agency. We make sure the tools you genuinely use for the business are captured and treated correctly against your profit.",
    href: "/blog/agency-expenses-checklist",
    linkText: "What you can claim",
  },
  {
    title: "Contractors & freelancers",
    body: "Performance teams flex with specialists, freelancers, and offshore contractors. That raises employment-status and off-payroll questions. We help you engage people cleanly so the flexibility never turns into a compliance problem.",
    href: "/blog/agency-expenses-checklist",
    linkText: "Contractors & IR35",
  },
  {
    title: "How you pay yourself & the exit",
    body: "Salary, dividends, and pension decide how much of the profit you keep, and a clean, well-structured set of books raises what the agency is worth when you sell. We plan both around your numbers, quietly in the background.",
    href: "/blog/plan-tax-around-your-exit",
    linkText: "Plan tax around your exit",
  },
];

export default function AccountantsForDigitalMarketingAgenciesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-8 pt-20 text-center md:px-10 md:pt-28 lg:px-16">
        <div className="reveal mx-auto max-w-3xl">
          <p className="eyebrow">Chartered Tax Adviser · CTA · ACA · Ex-PwC</p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Accountants for{" "}
            <span className="em-display text-teal">digital marketing agencies.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-lg font-medium leading-8 text-ink">
            You move a fortune in client ad spend, and the fee you actually
            keep is the part that gets lost in the numbers.
          </p>
          <p className="mx-auto mt-4 max-w-[640px] text-base leading-8 text-muted">
            SRJ International is a firm of specialist accountants and Chartered
            Tax Advisers for UK digital marketing agencies: PPC, paid media, SEO,
            and performance shops. Led by Simon Jacobs, a Chartered Tax Adviser
            (CTA · ACA) and ex-PwC, we handle ad-spend VAT, profit extraction,
            and exit planning around how digital agencies actually run.
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

      {/* Why a specialist */}
      <section className="section-white mx-auto w-full max-w-3xl px-6 pb-12 pt-6 md:px-10 md:pb-16 lg:px-16">
        <div className="reveal">
          <h2 className="font-serif text-3xl font-normal leading-tight md:text-4xl">
            Why digital agencies need a{" "}
            <span className="em-display text-teal">specialist accountant.</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-muted">
            A general accountant will file your accounts and keep you compliant.
            That is the floor, not the ceiling. Digital agencies carry quirks a
            generalist rarely sees: client ad spend that dwarfs your own fee,
            VAT that turns on whether you buy media as principal or agent, a deep
            stack of software subscriptions, and teams that flex with freelancers
            and offshore contractors.
          </p>
          <p className="mt-4 text-base leading-8 text-muted">
            Because we only work with agencies, we see those patterns constantly,
            and because our founder, Simon Jacobs, is a Chartered Tax Adviser
            (CTA · ACA) who trained at PwC, the planning goes well beyond
            high-street box-ticking. The advice is specific to how a
            performance business earns, not generic small-company admin.
          </p>
        </div>
      </section>

      {/* Digital-specific areas */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="eyebrow">What actually moves the numbers</p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Built around how digital{" "}
            <span className="em-display text-teal">agencies run.</span>
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
          We also work with{" "}
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
          </Link>
          , and{" "}
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
          <p className="eyebrow">Digital agency FAQ</p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Questions digital founders{" "}
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
        heading="See what a specialist digital-agency accountant could save you."
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
