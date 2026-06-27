import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import { services, servicesFull, resultItems, processSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services: Tax planning, profit extraction & agency accountancy",
  description:
    "Proactive tax planning, profit extraction, and accountancy for UK marketing agencies, built around how agencies actually run and where they are heading.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-8 pt-20 text-center md:px-10 md:pt-32 lg:px-16">
        <div className="reveal mx-auto max-w-3xl">
          <p className="eyebrow">
            Services
          </p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            More than a{" "}
            <span className="em-display text-teal">year-end tidy-up.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-muted">
            Year-round advice on tax, profit, and the numbers that decide how
            much you keep and how much your agency is worth.
          </p>
        </div>
      </section>

      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 pt-8 md:px-10 md:pb-24 lg:px-16">
        <div className="grid gap-4 text-left md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="finance-card reveal flex flex-col p-5 transition duration-300 hover:-translate-y-1 md:p-6"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-xs font-semibold text-accent">
                0{index + 1}
              </span>
              <h2 className="mt-5 font-serif text-2xl font-normal text-ink">
                {service.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">{service.body}</p>
              <ul className="mt-5 grid gap-2.5 border-t border-border pt-5 text-sm text-ink">
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
            </article>
          ))}
        </div>
      </section>

      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="reveal mx-auto max-w-3xl text-center">
          <p className="eyebrow">Full service list</p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Everything handled{" "}
            <span className="em-display text-teal">under one roof.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-base leading-8 text-muted">
            From day-to-day compliance to forward planning, the whole finance
            function for your agency in one place.
          </p>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {servicesFull.map((item, index) => (
            <div
              key={item}
              className="finance-card reveal flex items-center gap-3 p-4"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 shrink-0 rounded-full bg-accent"
              />
              <span className="text-sm font-medium leading-6 text-ink">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-white relative px-4 py-16 text-white md:px-6 md:py-24 lg:px-8">
        <div className="section-ink mx-auto w-full max-w-7xl overflow-hidden rounded-[18px] px-6 py-14 text-center md:px-10 lg:px-16 lg:py-16">
          <div className="reveal mx-auto max-w-3xl">
            <h2 className="font-serif text-4xl font-normal leading-tight md:text-6xl">
              <span className="em-display text-seafoam">How</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-white/70">
              The work is designed to make tax visible earlier, profit easier to
              understand, and agency decisions less reactive.
            </p>
          </div>
          <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            {resultItems.map((item, index) => (
              <div
                key={item}
                className="reveal rounded-[10px] border border-white/12 bg-white/8 p-5 backdrop-blur-xl md:p-6"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <span className="font-serif text-2xl leading-tight text-white">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-blue-soft px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="finance-card reveal p-5 text-center md:p-6"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="font-serif text-sm text-accent">
                  0{index + 1}
                </span>
                <h3 className="mt-5 font-serif text-3xl font-normal text-ink">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="See what better tax planning could be worth."
        sub="Book a short discovery call and we will look at where your profit is going."
      />
    </>
  );
}
