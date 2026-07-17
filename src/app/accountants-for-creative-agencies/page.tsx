import type { Metadata } from "next";
import Link from "next/link";
import ConsultCta from "@/components/ConsultCta";
import Testimonials from "@/components/Testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import { site, bookCtaHref, scorecardHref } from "@/lib/content";

const siteUrl = site.url;

export const metadata: Metadata = {
  title: "Accountants for Creative Agencies",
  description:
    "Specialist accountants and Chartered Tax Advisers for UK creative agencies: design, branding, content, and production studios. Project WIP, freelancers and IR35, VAT, profit extraction, and exit planning.",
  alternates: { canonical: "/accountants-for-creative-agencies" },
  openGraph: {
    type: "website",
    title: "Accountants for Creative Agencies | SRJ International",
    description:
      "Chartered Tax Advisers for UK creative agencies and studios, built around how creative work actually bills and runs.",
    url: `${siteUrl}/accountants-for-creative-agencies`,
    images: [{ url: "/simon-jacobs.jpg" }],
  },
};

// Creative-specific FAQ. Answers 40-60 words, descriptive not prescriptive
// (safe method): specifics are always "we look at your numbers".
const faqs = [
  {
    question: "Do creative agencies need a specialist accountant?",
    answer:
      "It helps a lot. Creative studios bill unevenly, carry work in progress across long projects, use freelancers, and hold real value in their people and reputation rather than stock. A specialist reads those patterns and plans tax around them, instead of treating a studio like any other small company.",
  },
  {
    question: "How is accounting different for a creative agency?",
    answer:
      "The risk areas differ. Project income arrives in lumps, work in progress distorts a single month, rebilled production costs can be mistaken for profit, and freelancers raise IR35 status questions. Creative accounts are most useful when they separate real profit from money that is only passing through a project.",
  },
  {
    question: "Can you help with lumpy project income and cashflow?",
    answer:
      "Yes. We plan corporation tax and VAT around how creative income actually lands, in project stages rather than evenly, so a big invoice does not turn into a nasty tax surprise later. The aim is for the bill to be visible early and never an ambush at year-end.",
  },
  {
    question: "Do you handle freelancers and IR35 for creative studios?",
    answer:
      "Yes. Studios lean heavily on freelancers and contractors, which raises employment status and IR35 questions. We help you engage people in a way that is clean and defensible, so the flexibility that makes creative work possible does not create a compliance problem down the line.",
  },
  {
    question: "Can you help me plan the sale of my creative agency?",
    answer:
      "Yes, and the earlier the better. Much of a studio's value sits in goodwill, client relationships, and IP rather than assets. Clean, well-structured books built 12 to 24 months before an offer make that value legible to a buyer and the sale far more tax-efficient.",
  },
  {
    question: "Do you work with creative agencies that have overseas clients?",
    answer:
      "Yes. We advise UK studios serving clients worldwide, where the VAT position depends on where the client is based (place of supply), and founders who live or operate abroad. We look at both the UK and the overseas side rather than only one.",
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
      name: "Accountants for creative agencies",
      item: `${siteUrl}/accountants-for-creative-agencies`,
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Accountancy and tax advice for creative agencies",
  serviceType: "Tax planning and accountancy for UK creative agencies",
  areaServed: { "@type": "Country", name: "United Kingdom" },
  provider: {
    "@type": "AccountingService",
    name: "SRJ International",
    url: siteUrl,
  },
};

const areas = [
  {
    title: "Project income & work in progress",
    body: "Creative income arrives in stages, not evenly, and long projects leave value sitting in work in progress. We plan tax around how the money actually lands, so a completed project does not become a year-end surprise.",
    href: "/blog/clean-books-higher-valuation",
    linkText: "Why clean books matter",
  },
  {
    title: "Freelancers & IR35",
    body: "Studios run on freelancers and contractors, which raises employment status and IR35 questions. We help you engage people cleanly so the flexibility creative work needs never turns into a compliance problem.",
    href: "/blog/agency-expenses-checklist",
    linkText: "What you can claim",
  },
  {
    title: "VAT on rebilled production costs",
    body: "Print, media, and production you buy for a client distort your VAT position and your true margin. We make sure VAT sits on the right scheme and that pass-through money is never mistaken for profit.",
    href: "/blog/vat-for-agencies",
    linkText: "VAT for agencies",
  },
  {
    title: "Paying yourself from creative profit",
    body: "How you split salary and dividends decides how much of the studio's profit you actually keep. We plan director pay and profit extraction around your numbers, not a generic template.",
    href: "/blog/how-much-should-agency-founders-pay-themselves",
    linkText: "Salary vs dividends",
  },
  {
    title: "Protecting the value you build",
    body: "A studio's worth sits in goodwill, relationships, and IP, not stock. We structure the business and keep the books clean so that value is legible, defensible, and tax-efficient when you sell.",
    href: "/blog/plan-tax-around-your-exit",
    linkText: "Plan tax around your exit",
  },
  {
    title: "Overseas clients & founders abroad",
    body: "Serving clients worldwide changes your VAT position, and running a UK studio from abroad brings in residency. We handle both the UK and the overseas side rather than only one.",
    href: "/blog/tax-when-you-move-abroad",
    linkText: "Tax when you move abroad",
  },
];

export default function AccountantsForCreativeAgenciesPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-8 pt-20 text-center md:px-10 md:pt-28 lg:px-16">
        <div className="reveal mx-auto max-w-3xl">
          <p className="eyebrow">Chartered Tax Adviser · CTA · ACA · Ex-PwC</p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Accountants for{" "}
            <span className="em-display text-teal">creative agencies.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-lg font-medium leading-8 text-ink">
            Creative work sells beautifully and bills unevenly, and the tax
            quietly eats the difference.
          </p>
          <p className="mx-auto mt-4 max-w-[640px] text-base leading-8 text-muted">
            SRJ International is a firm of specialist accountants and Chartered
            Tax Advisers for UK creative agencies: design, branding, content, and
            production studios. Led by Simon Jacobs, a Chartered Tax Adviser
            (CTA · ACA) and ex-PwC, we handle VAT, project accounting, profit
            extraction, and exit planning around how creative studios actually
            run.
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
            Why creative agencies need a{" "}
            <span className="em-display text-teal">specialist accountant.</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-muted">
            A general accountant will file your accounts and keep you compliant.
            That is the floor, not the ceiling. Creative studios carry quirks a
            generalist rarely sees: income that lands in project stages, work in
            progress that distorts a single month, rebilled production costs,
            heavy use of freelancers, and value that lives in people and IP
            rather than stock.
          </p>
          <p className="mt-4 text-base leading-8 text-muted">
            Because we only work with agencies, we see those patterns constantly,
            and because our founder is a Chartered Tax Adviser (CTA · ACA) who
            trained at PwC, the planning goes well beyond high-street
            box-ticking. The advice is specific to how a creative business earns,
            not generic small-company admin.
          </p>
        </div>
      </section>

      {/* Creative-specific areas */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="eyebrow">What actually moves the numbers</p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Built around how creative{" "}
            <span className="em-display text-teal">studios run.</span>
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
            href="/accountants-for-advertising-agencies"
            className="font-semibold text-accent hover:text-ink"
          >
            advertising agencies
          </Link>{" "}
          and{" "}
          <Link
            href="/accountants-for-digital-marketing-agencies"
            className="font-semibold text-accent hover:text-ink"
          >
            digital marketing agencies
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
          <p className="eyebrow">Creative agency FAQ</p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Questions creative founders{" "}
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
        heading="See what a specialist creative-agency accountant could save you."
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
