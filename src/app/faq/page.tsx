import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import FaqAccordion from "@/components/FaqAccordion";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ: Agency tax planning questions",
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
          <p className="eyebrow">
            FAQ
          </p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            A few <span className="em-display text-teal">sensible questions</span>{" "}
            before a call.
          </h1>
        </div>
      </section>

      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 pt-2 md:px-10 md:pb-24 lg:px-16">
        <FaqAccordion items={faqs} />
      </section>

      <CtaBand heading="Still have a question? Ask it on a call." />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
