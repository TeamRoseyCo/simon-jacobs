import type { Metadata } from "next";
import Link from "next/link";
import ConsultCta from "@/components/ConsultCta";
import Testimonials from "@/components/Testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import { site, bookCtaHref, scorecardHref } from "@/lib/content";

const siteUrl = site.url;

export const metadata: Metadata = {
  title: "Accountants for Advertising Agencies",
  description:
    "Specialist accountants and Chartered Tax Advisers for UK advertising and media agencies. Media passthrough, VAT on ad spend, commission income, profit extraction, and exit planning.",
  alternates: { canonical: "/accountants-for-advertising-agencies" },
  openGraph: {
    type: "website",
    title: "Accountants for Advertising Agencies | SRJ International",
    description:
      "Chartered Tax Advisers for UK advertising and media agencies, built around media buying, passthrough, and how the money really flows.",
    url: `${siteUrl}/accountants-for-advertising-agencies`,
    images: [{ url: "/simon-jacobs.jpg" }],
  },
};

// Advertising-specific FAQ. Answers 40-60 words, descriptive not prescriptive
// (safe method): specifics are always "we look at your numbers".
const faqs = [
  {
    question: "Do advertising agencies need a specialist accountant?",
    answer:
      "It helps a lot. Advertising agencies move large sums of client media spend through their own accounts, earn a mix of commission and fees, and carry VAT complications a generalist rarely handles. A specialist separates money that is genuinely yours from money only passing through, so you are taxed correctly.",
  },
  {
    question: "How should ad spend and media passthrough be handled in the accounts?",
    answer:
      "Carefully. Media you buy on a client's behalf is not your income, but if it is booked wrongly it inflates turnover, distorts margin, and confuses your VAT. We make sure pass-through spend is treated as pass-through, so your accounts show real agency profit rather than money in transit.",
  },
  {
    question: "Is there VAT on advertising and media buying?",
    answer:
      "Advertising and media services are generally standard-rated in the UK, but where your client is based changes the position under the place-of-supply rules, and rebilled ad spend needs handling carefully. We make sure VAT sits on the right scheme for your client mix rather than leaving it to chance.",
  },
  {
    question: "How is commission income taxed for an advertising agency?",
    answer:
      "Commission and fee income are both taxable, but they behave differently in the accounts and can distort your margin if mixed in with rebilled media. We separate what is genuinely yours from money passing through, so you are taxed on real profit rather than turnover that was never really income.",
  },
  {
    question: "Do you work with agencies whose clients or ad platforms are overseas?",
    answer:
      "Yes. Serving overseas clients, or being billed by ad platforms based abroad, changes your VAT and can raise wider international questions. We look at both the UK and the overseas side, so the position is handled correctly rather than assumed.",
  },
  {
    question: "Can you help plan the sale of my advertising agency?",
    answer:
      "Yes, and the earlier the better. Buyers look hard at how clean the numbers are and whether reported profit is real once passthrough is stripped out. Clean, well-structured books built 12 to 24 months ahead make the agency worth more and the sale far more tax-efficient.",
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
      name: "Accountants for advertising agencies",
      item: `${siteUrl}/accountants-for-advertising-agencies`,
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Accountancy and tax advice for advertising agencies",
  serviceType: "Tax planning and accountancy for UK advertising and media agencies",
  areaServed: { "@type": "Country", name: "United Kingdom" },
  provider: {
    "@type": "AccountingService",
    name: "SRJ International",
    url: siteUrl,
  },
};

const areas = [
  {
    title: "Media passthrough & true margin",
    body: "Client media spend runs through your accounts but was never your income. Booked wrongly, it inflates turnover and hides your real margin. We treat pass-through as pass-through, so the numbers show genuine agency profit.",
    href: "/blog/vat-for-agencies",
    linkText: "VAT for agencies",
  },
  {
    title: "VAT on ad spend & media",
    body: "Rebilled ad spend, platform fees, and overseas media all complicate VAT. We make sure you are on the right scheme and that VAT on media is handled correctly for your specific client mix.",
    href: "/blog/vat-for-agencies",
    linkText: "How agency VAT works",
  },
  {
    title: "Commission vs fee income",
    body: "Commission and fees are taxed as income but behave differently in the accounts. We keep them clean and separate from money in transit, so you pay tax on real profit, not turnover.",
    href: "/blog/three-tax-moves-agency-owners-2026-27",
    linkText: "Tax moves for owners",
  },
  {
    title: "Freelancers, contractors & IR35",
    body: "Media and creative production lean on contractors, which raises employment status and IR35 questions. We help you engage people in a way that stays clean and defensible.",
    href: "/blog/agency-expenses-checklist",
    linkText: "What you can claim",
  },
  {
    title: "Profit extraction for owners",
    body: "How you split salary and dividends decides how much of the agency's profit you keep. We plan director pay and extraction around your numbers, not a generic template.",
    href: "/blog/how-much-should-agency-founders-pay-themselves",
    linkText: "Salary vs dividends",
  },
  {
    title: "Building toward a sale",
    body: "Buyers scrutinise whether reported profit survives once passthrough is stripped out. We structure and clean the books early so the agency is worth more and the sale is tax-efficient.",
    href: "/blog/plan-tax-around-your-exit",
    linkText: "Plan tax around your exit",
  },
];

export default function AccountantsForAdvertisingAgenciesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-8 pt-20 text-center md:px-10 md:pt-28 lg:px-16">
        <div className="reveal mx-auto max-w-3xl">
          <p className="eyebrow">Chartered Tax Adviser · CTA · ACA · Ex-PwC</p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Accountants for{" "}
            <span className="em-display text-teal">advertising agencies.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-lg font-medium leading-8 text-ink">
            In advertising, huge sums flow through your books that were never
            really yours, and it is easy to end up taxed as if they were.
          </p>
          <p className="mx-auto mt-4 max-w-[640px] text-base leading-8 text-muted">
            SRJ International is a firm of specialist accountants and Chartered
            Tax Advisers for UK advertising and media agencies. Led by Simon
            Jacobs, a Chartered Tax Adviser (CTA · ACA) and ex-PwC, we handle
            media passthrough, VAT on ad spend, commission income, profit
            extraction, and exit planning around how the money really flows.
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
            Why advertising agencies need a{" "}
            <span className="em-display text-teal">specialist accountant.</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-muted">
            A general accountant will file your accounts and keep you compliant.
            That is the floor, not the ceiling. Advertising agencies carry a
            problem most businesses do not: enormous client media spend flowing
            through the books that is not really income, alongside a mix of
            commission and fees, VAT on media, and heavy contractor use.
          </p>
          <p className="mt-4 text-base leading-8 text-muted">
            Booked wrongly, all of that hides your true profit and inflates your
            tax. Because we only work with agencies, we see it constantly, and
            because our founder is a Chartered Tax Adviser (CTA · ACA) who
            trained at PwC, the planning goes well beyond high-street
            box-ticking. The advice fits how an advertising business actually
            earns.
          </p>
        </div>
      </section>

      {/* Advertising-specific areas */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="eyebrow">What actually moves the numbers</p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Built around how the money{" "}
            <span className="em-display text-teal">really flows.</span>
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
          </Link>{" "}
          and{" "}
          <Link
            href="/accountants-for-creative-agencies"
            className="font-semibold text-accent hover:text-ink"
          >
            creative agencies
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
          <p className="eyebrow">Advertising agency FAQ</p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Questions advertising founders{" "}
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
        heading="See what a specialist advertising-agency accountant could save you."
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
