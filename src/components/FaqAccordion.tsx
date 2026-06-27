"use client";

import { useState } from "react";

type Faq = { question: string; answer: string };

export default function FaqAccordion({ items }: { items: Faq[] }) {
  // Only one question is open at a time; null means all closed.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="faq-panel reveal mx-auto max-w-4xl divide-y divide-border px-6 text-left">
      {items.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.question}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-3 py-6 text-left font-serif text-lg text-ink sm:gap-6 sm:text-xl"
              >
                {faq.question}
                <span
                  aria-hidden="true"
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/60 text-2xl text-accent transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
            </h3>
            <div className={`faq-answer ${isOpen ? "is-open" : ""}`}>
              <div className="faq-answer-inner">
                <p className="max-w-[720px] pb-6 text-sm leading-7 text-muted">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
