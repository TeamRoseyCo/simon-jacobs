import type { Metadata } from "next";
import Link from "next/link";
import ConsultCta from "@/components/ConsultCta";
import Testimonials from "@/components/Testimonials";
import Accreditations from "@/components/Accreditations";

export const metadata: Metadata = {
  title: "Client Results",
  description:
    "Real outcomes from tax planning and accountancy for UK business owners: tax bills brought down, money reclaimed, and structures built for a cleaner exit.",
  alternates: { canonical: "/results" },
};
const outcomes = [
  {
    stat: "£20k › nil",
    label: "AI bookkeeping, corrected",
    body: "An agency owner had automated his bookkeeping with AI. It logged expenses as income and left the accounts unbalanced, pushing his tax bill around £20k too high. We rebuilt the books from scratch and the bill came down to nil. One example; the numbers vary business to business.",
    href: "/blog/ai-bookkeeping-cost-20k-tax",
  },
  {
    stat: "Thousands saved",
    label: "Personal Allowance protected",
    body: "A client saved thousands on his tax bill and kept his Personal Allowance intact through proper planning, plus guidance on other assets expected to save more in future.",
  },
  {
    stat: "Money reclaimed",
    label: "Proper structuring",
    body: "A client reclaimed money he did not realise he was owed and saved a significant amount in tax through the right structure, with everything left compliant and future-proof.",
  },
];
const method = [
  {
    step: "01",
    title: "Look at your actual numbers",
    body: "Every engagement starts with your real accounts, not a template. We find where profit is genuinely leaking, tax, structure, or bookkeeping, before suggesting anything.",
  },
  {
    step: "02",
    title: "Plan before the money moves",
    body: "The saving is made in the decision, not the tax return. We plan corporation tax, VAT, and how you take money out ahead of time, so the efficient option is still open.",
  },
  {
    step: "03",
    title: "Keep it clean and compliant",
    body: "Everything is built to hold up: legible books, correct filings, and structures that stay defensible. The same work that lowers today's bill makes a future sale easier.",
  },
];

export default function ResultsPage() {
  return (
    <>

      <section className="gutter section-white pb-8 pt-20 text-center md:pt-28">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Results</p>
          <h1 className="ap-h2 mt-4">
            What better tax planning{" "}
            <span className="em-display text-teal">actually looks like.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-muted">
            A few real outcomes from working with owner-managed UK businesses.
            Every business is different, so treat these as examples of what is
            possible, not a promise of the same result.
          </p>
        </div>
      </section>


      <section className="gutter section-white pb-16 md:pb-24">
        <div className="grid gap-4 text-left md:grid-cols-3">
          {outcomes.map((o) => (
            <article
              key={o.label}
              className="finance-card flex h-full flex-col p-6 md:p-7"
            >
              <span className="em-display text-4xl leading-none text-teal md:text-5xl">
                {o.stat}
              </span>
              <span className="mt-3 block text-xs font-semibold text-muted">
                {o.label}
              </span>
              <p className="mt-4 flex-1 text-sm leading-7 text-muted">{o.body}</p>
              {o.href && (
                <Link
                  href={o.href}
                  className="mt-4 text-sm font-semibold text-accent transition hover:text-ink"
                >
                  Read the story ›
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>


      <section className="gutter section-white pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">How it happens</p>
          <h2 className="ap-h2 mt-4">
            The same approach behind{" "}
            <span className="em-display text-teal">every result.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-muted">
            None of these outcomes came from a clever trick. They came from a
            repeatable way of working, applied to each client&apos;s real numbers.
          </p>
        </div>
        <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
          {method.map((m) => (
            <article
              key={m.step}
              className="finance-card flex h-full flex-col p-6 md:p-7"
            >
              <span className="em-display text-3xl leading-none text-teal">
                {m.step}
              </span>
              <span className="ap-h3 mt-3 block text-ink">
                {m.title}
              </span>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">{m.body}</p>
            </article>
          ))}
        </div>
      </section>


      <section className="section-blue-soft py-16 text-center md:py-20 gutter-bleed">
        <p className="accred-eyebrow accred-eyebrow-light">
          Chartered, and Big Four trained
        </p>
        <Accreditations variant="light" className="accred-prominent mt-6" />
      </section>


      <Testimonials />

      <section className="section-white mx-auto w-full max-w-3xl px-6 py-14 text-center md:px-10 md:py-16 lg:px-16">
        <p className="text-base leading-8 text-muted">
          Want to see how this applies to your business?{" "}
          <Link href="/contact" className="font-semibold text-accent hover:text-ink">
            Book a discovery call
          </Link>
          , or see how we work with{" "}
          <Link
            href="/services"
            className="font-semibold text-accent hover:text-ink"
          >
            owner-managed UK businesses of every kind
          </Link>
          .
        </p>
      </section>

      <ConsultCta
        heading="Ask what your business could be keeping."
        sub="Book a short discovery call and we will look at your actual numbers."
      />
    </>
  );
}
