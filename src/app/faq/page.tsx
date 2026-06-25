import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ — Agency tax planning questions",
  description:
    "Sensible questions UK agency founders ask before a tax planning call: what Big Four means, whether you're too small, building toward a sale, and what happens after you book.",
  alternates: { canonical: "/faq" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FaqPage() {
  return (
    <>
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-8 pt-24 text-center md:px-10 md:pt-32 lg:px-16">
        <div className="reveal mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            FAQ
          </p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            A few sensible questions before a call.
          </h1>
        </div>
      </section>

      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 pt-2 md:px-10 md:pb-24 lg:px-16">
        <div className="faq-panel reveal mx-auto max-w-4xl divide-y divide-border px-6 text-left">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl text-ink">
                {faq.question}
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/60 text-2xl text-accent transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-[720px] text-sm leading-7 text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <CtaBand heading="Still have a question? Ask it on a call." />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
