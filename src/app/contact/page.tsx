import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { trustItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact: Book a discovery call",
  description:
    "Book a short discovery call with Simon Jacobs to see where your agency's profit is leaking and whether he can help. No prep needed.",
  alternates: { canonical: "/contact" },
};

const steps = [
  "A short fit call to understand where the agency is today.",
  "We talk through what feels messy: tax, profit, director pay, growth.",
  "You leave knowing whether Simon can help. No pressure either way.",
];

export default function ContactPage() {
  return (
    <>
      <section className="section-white mx-auto grid w-full max-w-7xl items-start gap-12 px-6 pb-16 pt-12 md:px-10 md:pb-20 md:pt-16 lg:grid-cols-[1.05fr_0.9fr] lg:gap-16 lg:px-16">
        <div className="reveal text-center lg:text-left">
          <h1 className="font-serif text-4xl font-normal leading-tight md:text-5xl">
            Find out what your agency{" "}
            <span className="em-display text-teal">could be keeping.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[520px] text-base leading-8 text-muted lg:mx-0">
            The first step is a short discovery call. Bring the financial
            questions you have been putting off. That is exactly what it is for.
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
        <div className="image-stack reveal relative mx-auto hidden min-h-[380px] w-full max-w-[440px] overflow-hidden lg:order-none lg:mx-0 lg:block lg:min-h-[460px]">
          <Image
            src="/simon-jacobs.webp"
            alt="Simon Jacobs, Chartered Tax Adviser"
            fill
            sizes="(min-width: 1024px) 440px, 88vw"
            className="object-cover object-[center_12%]"
          />
        </div>
      </section>

      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="reveal mx-auto mb-8 max-w-2xl text-center">
          <p className="eyebrow">The process</p>
          <h2 className="mt-4 font-serif text-3xl font-normal leading-tight md:text-4xl">
            What happens <span className="em-display text-teal">next?</span>
          </h2>
        </div>
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
