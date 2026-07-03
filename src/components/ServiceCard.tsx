"use client";

import { useState } from "react";

type Service = {
  title: string;
  body: string;
  includes: string[];
};

export default function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className="finance-card reveal flex flex-col p-5 transition duration-300 hover:-translate-y-1 md:p-6"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <span className="text-xs font-semibold text-accent">0{index + 1}</span>
      <h2 className="mt-5 font-serif text-2xl font-normal text-ink">
        {service.title}
      </h2>
      <p className="mt-4 text-sm leading-7 text-muted md:min-h-[6.5rem]">
        {service.body}
      </p>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="mt-5 flex w-full cursor-pointer items-center justify-between gap-3 border-t border-border pt-5 text-left text-sm font-semibold text-ink"
      >
        What&apos;s included
        <span
          aria-hidden="true"
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full bg-surface text-lg text-accent transition-transform duration-300 ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      <div className={`faq-answer ${open ? "is-open" : ""}`}>
        <div className="faq-answer-inner">
          <ul className="grid gap-2.5 pt-4 text-sm text-ink">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                />
                <span className="leading-6">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
