import Link from "next/link";
import Hero from "@/components/Hero";
import CtaBand from "@/components/CtaBand";
import { services } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Hero />

      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 pt-28 text-center md:px-10 md:pb-20 md:pt-36 lg:px-16">
        <div className="statement-panel reveal mx-auto max-w-4xl px-6 py-10 md:px-12 md:py-12">
          <p className="font-serif text-2xl leading-[1.65] text-ink md:text-3xl">
            Most agency owners are brilliant at winning clients.
            <br />
            They&apos;re <em className="text-accent">terrible</em> at keeping
            what they make.
            <br />
            <br />
            Not because they spend too much.
            <br />
            Because nobody ever showed them{" "}
            <em className="text-accent">what&apos;s actually possible.</em>
          </p>
        </div>
      </section>

      <section className="section-white relative mx-auto w-full max-w-7xl px-6 py-16 text-center md:px-10 md:py-24 lg:px-16">
        <div className="reveal mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl font-normal leading-tight md:text-5xl">
            Tax advice for agency owners who need more than a year-end tidy-up.
          </h2>
        </div>
        <div className="mt-8 grid gap-4 text-left md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="finance-card reveal p-5 transition duration-300 hover:-translate-y-1 md:p-6"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-xs font-semibold text-accent">
                0{index + 1}
              </span>
              <h3 className="mt-5 font-serif text-2xl font-normal text-ink">
                {service.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted">{service.body}</p>
            </article>
          ))}
        </div>
        <div className="reveal mt-8">
          <Link
            href="/services"
            className="inline-flex min-h-12 items-center justify-center rounded-[5px] bg-ink px-7 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Explore the services
          </Link>
        </div>
      </section>

      <CtaBand
        heading="Find out what your agency could be keeping."
        sub="A short discovery call to see where profit is leaking and whether Simon can help."
      />
    </>
  );
}
