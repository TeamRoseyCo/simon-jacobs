import type { Metadata } from "next";
import ConsultCta from "@/components/ConsultCta";
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
      <section className="gutter section-white pb-8 pt-20 text-center md:pt-32">
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

      <section className="gutter section-white pb-16 pt-2 md:pb-24">
        <FaqAccordion items={faqs} />
      </section>

      <ConsultCta heading="Still have a question? Ask it on a call." />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </>
  );
}
