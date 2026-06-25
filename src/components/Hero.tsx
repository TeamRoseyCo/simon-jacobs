import Image from "next/image";
import { trustItems, bookHref } from "@/lib/content";

export default function Hero() {
  return (
    <section id="top" className="hero-showcase relative pb-10 pt-0">
      <div className="w-full">
        <div className="hero-preview relative">
          <div className="relative grid items-center gap-10 px-8 pb-0 pt-12 md:min-h-[640px] md:grid-cols-[0.95fr_1.05fr] md:px-16 md:pb-12 md:pt-16 lg:px-28 lg:pb-14 lg:pt-20 xl:px-36">
            <div className="relative z-10 max-w-[590px] text-white">
              <h1
                className="load-rise text-4xl font-bold leading-[1.04] tracking-normal sm:text-5xl lg:text-[68px]"
                style={{ animationDelay: "60ms" }}
              >
                I help UK marketing agencies{" "}
                <span className="text-seafoam">keep more of what they earn.</span>
              </h1>
              <p
                className="load-rise mt-6 max-w-[480px] text-base font-medium leading-8 text-white/82"
                style={{ animationDelay: "160ms" }}
              >
                As a Chartered Tax Adviser and ex-PwC professional, I help
                founder-led agencies plan tax, extract profit, and build a
                cleaner, more valuable business to one day sell.
              </p>

              <div
                className="load-rise mt-8 flex flex-col gap-3 sm:flex-row"
                style={{ animationDelay: "260ms" }}
              >
                <a
                  href={bookHref}
                  className="inline-flex min-h-12 items-center justify-center rounded-[5px] bg-white px-7 text-sm font-semibold text-ink transition hover:bg-surface"
                >
                  Book a discovery call
                </a>
                <a
                  href="/services"
                  className="inline-flex min-h-12 items-center justify-center rounded-[5px] border border-white/25 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/18"
                >
                  See how it works
                </a>
              </div>
            </div>

            <div className="relative z-10 min-h-[390px] md:min-h-[620px]">
              <div
                className="hero-trust-row load-rise"
                style={{ animationDelay: "380ms" }}
              >
                {trustItems.map((item) => (
                  <div key={item.label} className="trust-item">
                    <span className="block font-serif text-base text-white">
                      {item.value}
                    </span>
                    <span
                      className="trust-help"
                      tabIndex={0}
                      aria-label={`${item.label}: ${item.description}`}
                    >
                      ?
                      <span className="trust-tooltip" role="tooltip">
                        <strong>{item.label}</strong>
                        {item.description}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="hero-portrait-card load-pop absolute inset-x-0 bottom-[-52px] mx-auto h-[390px] w-full max-w-[500px] overflow-hidden rounded-[12px] md:bottom-[-82px] md:h-[560px]"
                style={{ animationDelay: "220ms" }}
              >
                <Image
                  src="/simon-jacobs.webp"
                  alt="Simon Jacobs, Chartered Tax Adviser"
                  fill
                  priority
                  sizes="(min-width: 768px) 38vw, 88vw"
                  className="object-cover object-[center_12%]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
