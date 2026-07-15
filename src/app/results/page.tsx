import type { Metadata } from "next";
import Link from "next/link";
import ConsultCta from "@/components/ConsultCta";
import Testimonials from "@/components/Testimonials";
import Accreditations from "@/components/Accreditations";

export const metadata: Metadata = {
  title: "Client Results",
  description:
    "Real outcomes from tax planning and accountancy for UK marketing agencies: tax bills brought down, money reclaimed, and structures built for a cleaner exit.",
  alternates: { canonical: "/results" },
};

// Quantified outcomes drawn only from already-published, approved material
// (Simon's own video case study and existing client testimonials). Framed with
// his own "one example, numbers vary" caveat so nothing overstates a guarantee.
const outcomes = [
  {
    stat: "£20k → nil",
    label: "AI bookkeeping, corrected",
    body: "An agency owner had automated his bookkeeping with AI. It logged expenses as income and left the accounts unbalanced, pushing his tax bill around £20k too high. We rebuilt the books from scratch and the bill came down to nil. One example; the numbers vary business to business.",
    href: "/blog/ai-bookkeeping-cost-20k-tax",
  },
  {
    stat: "Thousands saved",
    label: "Personal Allowance protected",
    body: "A digital agency client saved thousands on his tax bill and kept his Personal Allowance intact through proper planning, plus guidance on other assets expected to save more in future.",
    href: "/blog/how-much-should-agency-founders-pay-themselves",
  },
  {
    stat: "Money reclaimed",
    label: "Proper structuring",
    body: "A client reclaimed money he did not realise he was owed and saved a significant amount in tax through the right structure, with everything left compliant and future-proof.",
    href: "/blog/plan-tax-around-your-exit",
  },
];

// The repeatable approach behind the outcomes above. Method, not promises, so it
// reinforces expertise without implying a guaranteed result.
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
      {/* Hero */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-8 pt-20 text-center md:px-10 md:pt-28 lg:px-16">
        <div className="reveal mx-auto max-w-3xl">
          <p className="eyebrow">Results</p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            What better tax planning{" "}
            <span className="em-display text-teal">actually looks like.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-muted">
            A few real outcomes from working with UK agency owners. Every
            business is different, so treat these as examples of what is
            possible, not a promise of the same result.
          </p>
        </div>
      </section>

      {/* Quantified outcomes */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="grid gap-4 text-left md:grid-cols-3">
          {outcomes.map((o, index) => (
            <article
              key={o.label}
              className="finance-card reveal flex h-full flex-col p-6 md:p-7"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="em-display text-4xl leading-none text-teal md:text-5xl">
                {o.stat}
              </span>
              <span className="mt-3 block text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                {o.label}
              </span>
              <p className="mt-4 flex-1 text-sm leading-7 text-muted">{o.body}</p>
              {o.href && (
                <Link
                  href={o.href}
                  className="mt-4 text-sm font-semibold text-accent transition hover:text-ink"
                >
                  Read the story →
                </Link>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* How the results happen (method, not promises) */}
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="eyebrow">How it happens</p>
          <h2 className="mt-4 font-serif text-3xl font-normal leading-tight md:text-4xl">
            The same approach behind{" "}
            <span className="em-display text-teal">every result.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-muted">
            None of these outcomes came from a clever trick. They came from a
            repeatable way of working, applied to each agency&apos;s real numbers.
          </p>
        </div>
        <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
          {method.map((m, index) => (
            <article
              key={m.step}
              className="finance-card reveal flex h-full flex-col p-6 md:p-7"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="em-display text-3xl leading-none text-teal">
                {m.step}
              </span>
              <span className="mt-3 block font-serif text-xl text-ink">
                {m.title}
              </span>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">{m.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Credentials */}
      <section className="section-blue-soft px-6 py-16 text-center md:py-20 lg:px-16">
        <p className="accred-eyebrow accred-eyebrow-light reveal">
          Chartered, and Big Four trained
        </p>
        <Accreditations variant="light" className="accred-prominent reveal mt-6" />
      </section>

      {/* Testimonials (real client quotes) */}
      <Testimonials />

      <section className="section-white mx-auto w-full max-w-3xl px-6 py-14 text-center md:px-10 md:py-16 lg:px-16">
        <p className="reveal text-base leading-8 text-muted">
          Want to see how this applies to your agency? Read the{" "}
          <Link
            href="/accountants-for-marketing-agencies"
            className="font-semibold text-accent hover:text-ink"
          >
            agency accounting page
          </Link>{" "}
          or{" "}
          <Link href="/contact" className="font-semibold text-accent hover:text-ink">
            book a discovery call
          </Link>
          .
        </p>
      </section>

      <ConsultCta
        heading="Ask what your agency could be keeping."
        sub="Book a short discovery call and we will look at your actual numbers."
      />
    </>
  );
}
