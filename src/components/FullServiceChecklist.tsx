"use client";

import { useState, type ReactNode } from "react";

type Item = { title: string; body: string };

export default function FullServiceChecklist({
  items,
  icons,
}: {
  items: Item[];
  icons: ReactNode[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={item.title}
            className="finance-card reveal overflow-hidden"
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="flex w-full cursor-pointer items-center gap-3 p-4 text-left"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal/10 text-teal">
                {icons[index]}
              </span>
              <span className="flex-1 text-sm font-medium leading-6 text-ink">
                {item.title}
              </span>
              <span
                aria-hidden="true"
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface text-lg text-accent transition-transform duration-300 ${
                  isOpen ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div className={`faq-answer ${isOpen ? "is-open" : ""}`}>
              <div className="faq-answer-inner">
                <p className="px-4 pb-4 text-sm leading-6 text-muted">
                  {item.body}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
