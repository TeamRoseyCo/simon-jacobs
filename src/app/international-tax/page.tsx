import type { Metadata } from "next";
import Link from "next/link";
import ConsultCta from "@/components/ConsultCta";
import Testimonials from "@/components/Testimonials";
import FaqAccordion from "@/components/FaqAccordion";
import { site, bookCtaHref, scorecardHref } from "@/lib/content";

const siteUrl = site.url;
export const metadata: Metadata = {
  title: "International & Cross-Border Tax Advice",
  description:
    "Chartered Tax Adviser for UK residence and cross-border tax: leaving the UK, returning to it, UK-to-UAE and Dubai moves, double taxation, and foreign income. CTA, ACA and PwC trained.",
  alternates: { canonical: "/international-tax" },
  openGraph: {
    type: "website",
    title: "International & Cross-Border Tax Advice | SRJ International",
    description:
      "UK residence, leaving or returning to the UK, and foreign income, handled by a Chartered Tax Adviser rather than guessed at.",
    url: `${siteUrl}/international-tax`,
    images: [{ url: "/simon-jacobs.jpg" }],
  },
};
const faqs = [
  {
    question: "Do I still pay UK tax if I move abroad?",
    answer:
      "It depends on your residence status, where your income comes from, and whether a double taxation agreement applies. Leaving the country does not automatically end a UK tax liability, and some UK-source income stays taxable here. We work out your position against the statutory residence test rather than assuming.",
  },
  {
    question: "What is the statutory residence test?",
    answer:
      "It is the set of rules HMRC uses to decide whether you are UK resident for a tax year. It weighs time spent in the UK against connecting factors such as family, accommodation, and work. It is mechanical but genuinely intricate, and getting it wrong is expensive in both directions.",
  },
  {
    question: "I am moving to Dubai or the UAE. What should I look at first?",
    answer:
      "Your UK residence position, the timing of the move within the tax year, what happens to any UK income or property you keep, and how you extract profit from a UK company once you are non-resident. Most advice online covers setting up out there; the UK side is the part that catches people.",
  },
  {
    question: "Can I be taxed twice on the same income?",
    answer:
      "The UK has double taxation agreements with many countries, designed to stop exactly that, usually by giving one country the taxing right or by allowing relief for tax paid elsewhere. Which applies depends on the treaty, the income type, and your residence. We read the specific treaty rather than generalising.",
  },
  {
    question: "What if I am coming to the UK rather than leaving?",
    answer:
      "The same test decides when you become resident, and arrival timing matters. There are also rules on how foreign income and gains are treated for people arriving in the UK. We look at both the UK position and what your departure country still expects from you.",
  },
  {
    question: "Do you work with people as well as companies?",
    answer:
      "Yes. Cross-border questions rarely stay on one side of that line: a director moving abroad changes both their own position and how their UK company should pay them. We advise on the personal and the corporate together rather than treating them as separate jobs.",
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
      name: "International and cross-border tax",
      item: `${siteUrl}/international-tax`,
    },
  ],
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "International and cross-border tax advice",
  serviceType:
    "UK residence, cross-border and double taxation advice for individuals and owner-managed companies",
  areaServed: { "@type": "Country", name: "United Kingdom" },
  provider: {
    "@type": "AccountingService",
    name: "SRJ International",
    url: siteUrl,
  },
};

const areas = [
  {
    title: "Leaving the UK",
    body: "Your residence position, the timing of the move within the tax year, and what happens to UK income or property you keep behind. Going non-resident is a process with rules, not a switch you flip when the plane lands.",
    href: "/blog/tax-when-you-move-abroad",
    linkText: "Tax when you move abroad",
  },
  {
    title: "UK to UAE and Dubai",
    body: "Most guidance on this route is about setting a company up out there. The part that catches people is the UK side: what HMRC still expects, and how you take money out of a UK company once you are no longer resident here.",
    href: "/blog/tax-when-you-move-abroad",
    linkText: "Moving abroad",
  },
  {
    title: "Coming to the UK",
    body: "Arrival timing decides which tax year catches you, and how foreign income and gains are treated once you are here. We look at the UK position and what your departure country still expects, rather than only one side.",
    href: "/contact",
    linkText: "Talk it through",
  },
  {
    title: "Double taxation relief",
    body: "The UK has agreements with many countries designed to stop the same income being taxed twice. Which one applies, and how, depends on the treaty and the type of income. We read the specific treaty rather than working from the general principle.",
    href: "/contact",
    linkText: "Check your position",
  },
  {
    title: "Foreign income and assets",
    body: "Overseas earnings, rental property, dividends and disposals all have to be reported correctly, and the rules differ by income type. We get the reporting right and plan around it rather than discovering it at the deadline.",
    href: "/contact",
    linkText: "Get it reported right",
  },
  {
    title: "Directors and their companies",
    body: "A director moving abroad changes both their own position and how the UK company should pay them. We handle the personal and the corporate side together, because separating them is how the expensive mistakes happen.",
    href: "/blog/plan-tax-around-your-exit",
    linkText: "Plan around your exit",
  },
];

export default function InternationalTaxPage() {
  return (
    <>

      <section className="gutter section-white pb-8 pt-20 text-center md:pt-28">
        <div className="mx-auto max-w-3xl">
          <h1 className="ap-h2 mt-4">
            International and{" "}
            <span className="em-display text-teal">cross-border tax.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[640px] text-lg font-medium leading-8 text-ink">
            Crossing a border does not end your relationship with HMRC. It
            changes the terms.
          </p>
          <p className="mx-auto mt-4 max-w-[640px] text-base leading-8 text-muted">
            SRJ International advises UK business owners and individuals on
            residence, leaving or returning to the UK, foreign income, and
            double taxation. Led by Simon Jacobs, a Chartered Tax Adviser
            (CTA · ACA) and PwC trained. Cross-border work is where a chartered tax
            qualification earns its keep, because the rules are statutory,
            intricate, and unforgiving of guesswork.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={bookCtaHref} className="hv-btn-primary">
              Book a discovery call
              <span aria-hidden="true">›</span>
            </Link>
            <Link href={scorecardHref} className="hv-btn-ghost-ink">
              See where your profit leaks
              <span aria-hidden="true">›</span>
            </Link>
          </div>
        </div>
      </section>


      <section className="section-white mx-auto w-full max-w-3xl px-6 pb-12 pt-6 md:px-10 md:pb-16 lg:px-16">
        <div>
          <h2 className="ap-h2">
            Why this is{" "}
            <span className="em-display text-teal">Chartered Tax Adviser work.</span>
          </h2>
          <p className="mt-5 text-base leading-8 text-muted">
            Whether you are UK resident for a tax year is decided by the
            statutory residence test, which weighs time spent in the UK against
            connecting factors such as family, accommodation and work. HMRC
            publishes the rules in{" "}
            <a
              href="https://www.gov.uk/government/publications/rdr3-statutory-residence-test-srt"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:text-ink"
            >
              RDR3
            </a>
            , and its overview of{" "}
            <a
              href="https://www.gov.uk/tax-foreign-income/residence"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:text-ink"
            >
              residence and foreign income
            </a>{" "}
            sets out the basics. It is mechanical, and it is genuinely
            intricate. Getting it wrong is costly in both directions: paying UK
            tax you did not owe, or discovering a liability years later.
          </p>
          <p className="mt-4 text-base leading-8 text-muted">
            Leaving the country does not automatically end a UK tax liability.
            HMRC sets out what can still apply when you{" "}
            <a
              href="https://www.gov.uk/tax-right-retire-abroad-return-to-uk"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:text-ink"
            >
              live abroad or return to the UK
            </a>
            . Where two countries both have a claim, the UK&apos;s{" "}
            <a
              href="https://www.gov.uk/government/publications/double-taxation-treaties-territory-residents-with-uk-income"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:text-ink"
            >
              double taxation agreements
            </a>{" "}
            usually decide which one taxes what. Which treaty applies, and how,
            depends on the country and the type of income.
          </p>
          <p className="mt-4 text-base leading-8 text-muted">
            None of that is generic small-company admin, and none of it is
            reliably answered by a search engine or a chatbot. It is the part of
            tax where reading the actual rule against your actual facts is the
            whole job.
          </p>
        </div>
      </section>


      <section className="gutter section-white pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="ap-h2 mt-4">
            Where people usually{" "}
            <span className="em-display text-teal">need us.</span>
          </h2>
        </div>
        <div className="mt-10 grid gap-4 text-left md:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <article
              key={area.title}
              className="finance-card flex h-full flex-col p-6 md:p-7"
            >
              <h3 className="ap-h3 text-ink">{area.title}</h3>
              <p className="mt-4 flex-1 text-sm leading-7 text-muted">
                {area.body}
              </p>
              <Link
                href={area.href}
                className="mt-5 text-sm font-semibold text-accent transition hover:text-ink"
              >
                {area.linkText} ›
              </Link>
            </article>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="section-white mx-auto w-full max-w-3xl px-6 py-14 text-center md:px-10 md:py-16 lg:px-16">
        <p className="text-base leading-8 text-muted">
          We also advise on{" "}
          <Link
            href="/services"
            className="font-semibold text-accent hover:text-ink"
          >
            tax planning and accounts
          </Link>{" "}
          for owner-managed businesses, and work with{" "}
          <Link
            href="/accountants-for-marketing-agencies"
            className="font-semibold text-accent hover:text-ink"
          >
            marketing and creative agencies
          </Link>
          . Read the{" "}
          <Link href="/blog" className="font-semibold text-accent hover:text-ink">
            tax notes
          </Link>
          .
        </p>
      </section>


      <section className="gutter section-white pb-16 pt-2 md:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="ap-h2 mt-4">
            Questions people{" "}
            <span className="em-display text-teal">ask us first.</span>
          </h2>
        </div>
        <div className="mt-10">
          <FaqAccordion items={faqs} />
        </div>
        <p className="mx-auto mt-8 max-w-[640px] text-center text-xs leading-6 text-muted">
          General information, not personal tax advice. Residence and treaty
          rules are detailed and change; we advise on your specific position on
          a call.
        </p>
      </section>

      <ConsultCta
        heading="Get your cross-border position worked out properly."
        sub="Book a short discovery call and we will tell you straight whether we can help."
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
