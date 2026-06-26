import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import Accreditations from "@/components/Accreditations";
import { principles, credentials } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Simon Jacobs, Chartered Tax Adviser & ex-PwC",
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
          <p className="eyebrow">
            About
          </p>
          <h1 className="mt-4 max-w-[620px] font-serif text-4xl font-normal leading-tight md:text-5xl">
            Chartered tax advice for{" "}
            <span className="em-display text-teal">busy founders</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[600px] text-base leading-8 text-muted lg:mx-0">
            Simon is a Chartered Tax Adviser (CTA) and Chartered Accountant
            (ACA), qualified through the CIOT and ICAEW, with over ten years in
            tax and accounting. Before founding his own practice, SRJ
            International, he spent more than four years at PwC advising large
            multinational corporations and SMEs on tax planning and tax advice.
          </p>
          <p className="mx-auto mt-5 max-w-[600px] text-base leading-8 text-muted lg:mx-0">
            He set up on his own to specialise in the clients he enjoys most:
            digital marketing agencies, SMEs, and high-net-worth individuals,
            with tax planning, accounting, and compliance under one roof. The
            day-to-day realities of a growing agency, uneven cashflow, retained
            clients, director pay, and the tension between taking profit and
            reinvesting it, are exactly where good planning earns its keep.
          </p>
          <p className="mx-auto mt-5 max-w-[600px] text-base leading-8 text-muted lg:mx-0">
            Away from the numbers, Simon is an award-winning public speaker who
            has presented at the ICAEW and CIOT and serves as Vice President of
            Membership at his local Toastmasters club. It is the same instinct
            that drives the work: explain it clearly, and help you make the call
            with confidence.
          </p>
        </div>
      </section>

      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
        <figure className="reveal overflow-hidden rounded-[18px] border border-border bg-white shadow-[0_18px_55px_rgba(8,34,75,0.08)]">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="/simon-jacobs-event.webp"
              alt="Simon Jacobs in conversation with agency founders over dinner"
              fill
              sizes="(min-width: 1024px) 1100px, 100vw"
              className="object-cover object-[center_32%]"
            />
          </div>
          <figcaption className="px-6 py-5 text-center text-sm leading-7 text-muted">
            Most of the useful conversations start exactly like this: founders,
            a table, and the questions they never get to ask their accountant.
          </figcaption>
        </figure>
      </section>

      <section className="section-blue-soft px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="reveal mx-auto max-w-3xl text-center">
            <p className="eyebrow">
              How I work
            </p>
            <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
              Four things you can{" "}
              <span className="em-display text-teal">count on.</span>
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {principles.map((p, index) => (
              <article
                key={p.title}
                className="finance-card reveal p-5 md:p-6"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <h3 className="font-serif text-2xl font-normal text-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-white mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="eyebrow">
            Background
          </p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            The credentials behind{" "}
            <span className="em-display text-teal">the advice.</span>
          </h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {credentials.map((c, index) => (
            <article
              key={c.title}
              className="finance-card reveal p-5 md:p-6"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <h3 className="font-serif text-xl font-normal leading-snug text-ink">
                {c.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{c.body}</p>
            </article>
          ))}
        </div>
        <Accreditations variant="light" className="reveal mt-10" />
      </section>

      <CtaBand
        heading="Bring the questions you've been putting off."
        sub="A short discovery call to talk through where the agency is and where you want it to go."
      />
    </>
  );
}
