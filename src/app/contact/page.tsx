import type { Metadata } from "next";
import Image from "next/image";
import { bookHref, trustItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact — Book a discovery call",
  description:
    "Book a short discovery call with Simon Jacobs to see where your agency's profit is leaking and whether he can help. No prep needed.",
  alternates: { canonical: "/contact" },
};

const steps = [
  "A short fit call to understand where the agency is today.",
  "We talk through what feels messy: tax, profit, director pay, growth.",
  "You leave knowing whether Simon can help — no pressure either way.",
];

export default function ContactPage() {
  return (
    <>
      <section className="section-white mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pb-10 pt-24 md:px-10 md:pt-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-16">
        <div className="reveal text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Contact
          </p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Find out what your agency could be keeping.
          </h1>
          <p className="mx-auto mt-5 max-w-[520px] text-base leading-8 text-muted lg:mx-0">
            The first step is a short discovery call. Bring the financial
            questions you have been putting off — that is exactly what it is for.
          </p>
          <a
            href={bookHref}
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-ink px-8 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Book a discovery call
          </a>
        </div>
        <div className="reveal image-stack relative mx-auto min-h-[360px] w-full max-w-[420px] overflow-hidden md:min-h-[440px]">
          <Image
            src="/simon-jacobs.webp"
            alt="Simon Jacobs, Chartered Tax Adviser"
            fill
            sizes="(min-width: 1024px) 420px, 88vw"
            className="object-cover object-[center_12%]"
          />
        </div>
      </section>

      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step}
              className="finance-card reveal p-6 text-left"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="font-serif text-sm text-accent">
                0{index + 1}
              </span>
              <p className="mt-4 text-sm leading-7 text-muted">{step}</p>
            </article>
          ))}
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {trustItems.map((item) => (
            <div
              key={item.label}
              className="finance-card reveal p-5 text-center"
            >
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {item.label}
              </span>
              <span className="mt-2 block font-serif text-2xl text-ink">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
