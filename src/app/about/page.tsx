import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About Simon Jacobs — Chartered Tax Adviser, ex-PwC",
  description:
    "Simon Jacobs combines CTA and CA training with Big Four (PwC) experience, applied to the real decisions UK agency founders face: tax, profit, director pay, and exit.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="section-white mx-auto grid w-full max-w-7xl gap-10 px-6 pb-16 pt-24 md:px-10 md:pb-24 md:pt-32 lg:grid-cols-[0.9fr_1.1fr] lg:px-16">
        <div className="image-stack reveal relative min-h-[520px] overflow-hidden">
          <Image
            src="/simon-jacobs.webp"
            alt="Simon Jacobs"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[center_12%]"
          />
        </div>
        <div className="reveal flex flex-col justify-center text-center lg:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            About
          </p>
          <h1 className="mt-4 max-w-[620px] font-serif text-4xl font-normal leading-tight md:text-5xl">
            Chartered tax advice for busy founders
          </h1>
          <p className="mx-auto mt-5 max-w-[600px] text-base leading-8 text-muted lg:mx-0">
            Simon combines CTA and CA training with Big Four experience, then
            applies it to the day-to-day realities of running a growing agency:
            uneven cashflow, retained clients, hiring decisions, director pay,
            and the constant tension between taking profit and reinvesting it.
          </p>
          <p className="mx-auto mt-5 max-w-[600px] text-base leading-8 text-muted lg:mx-0">
            The work is deliberately direct. You should know what the numbers
            mean, what choices are available, and what each choice is likely to
            cost before you commit — including the choices that make the agency
            easier to sell later.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="finance-card p-5">
              <span className="font-serif text-3xl text-ink">Plain English</span>
              <p className="mt-2 text-sm leading-6 text-muted">
                You see the options and trade-offs without technical fog.
              </p>
            </div>
            <div className="finance-card p-5">
              <span className="font-serif text-3xl text-ink">Year-round</span>
              <p className="mt-2 text-sm leading-6 text-muted">
                Decisions happen while they can still change the outcome.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        heading="Bring the questions you've been putting off."
        sub="A short discovery call to talk through where the agency is and where you want it to go."
      />
    </>
  );
}
