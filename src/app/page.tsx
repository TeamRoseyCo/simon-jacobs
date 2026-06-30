import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import ConsultCta from "@/components/ConsultCta";
import ClaudeGif from "@/components/ClaudeGif";
import ScorecardSection from "@/components/ScorecardSection";
import Accreditations from "@/components/Accreditations";
import WorksWith from "@/components/WorksWith";
import { services, whoFor, lead, exitAngle, bookCtaHref } from "@/lib/content";
import { posts } from "@/lib/posts";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Lead statement: leads the reader into the whole page */}
      <section className="section-blue-soft px-6 py-16 text-center md:py-28 lg:px-16">
        <p className="accred-eyebrow accred-eyebrow-light reveal">CTA · ACA · ex-PwC</p>
        <Accreditations
          variant="light"
          className="accred-prominent reveal mb-12 md:mb-16"
        />
        <p className="reveal mx-auto max-w-3xl font-serif text-[26px] font-normal leading-[1.45] text-[#4F5D6E] md:text-[36px] md:leading-[1.4]">
          {lead.partA}
          <span className="font-bold text-ink">{lead.inkAccent}</span>
          {lead.partB}
          <span className="em-display text-teal">{lead.tealAccent}</span>
        </p>
        <WorksWith className="reveal mt-12" />
      </section>

      {/* Who this is for: full-bleed, over a clouds texture */}
      <section className="whofor-section relative w-full overflow-hidden">
          <div className="grid lg:grid-cols-2 lg:items-stretch">
            <div className="whofor-photo relative z-10 min-h-[300px] lg:min-h-[560px]">
              <Image
                src="/simon-jacobs-dubai.webp"
                alt="Simon Jacobs, Chartered Tax Adviser for UK marketing agencies"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[center_22%]"
              />
            </div>

            <div
              className="relative z-10 px-6 pb-12 pt-4 lg:px-14 lg:py-20"
              data-reveal-group
            >
              <div className="reveal text-center">
                <h2 className="font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
                  Built for{" "}
                  <span className="em-display text-seafoam">
                    founder-led agencies
                  </span>
                  , not giant companies.
                </h2>
              </div>
              <ul className="mt-8 grid gap-3">
                {whoFor.map((item, index) => (
                  <li
                    key={item}
                    className="reveal flex items-start gap-3 rounded-[12px] border border-white/12 bg-white/8 p-4 backdrop-blur-xl md:p-5"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-seafoam/20 text-sm font-bold text-seafoam"
                    >
                      ✓
                    </span>
                    <span className="text-base leading-7 text-white/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
      </section>

      {/* Services teaser */}
      <section className="section-white relative mx-auto w-full max-w-7xl px-6 py-16 text-center md:px-10 md:py-24 lg:px-16">
        <div className="reveal mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
            Stop using{" "}
            <span className="font-bold italic text-[#D97757]">Claude</span> for
            taxes.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-base leading-8 text-muted">
            Here&apos;s what you get when a Chartered Tax Adviser who only works
            with agencies handles it instead.
          </p>
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
        <div className="reveal mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={bookCtaHref}
            className="inline-flex min-h-12 items-center justify-center rounded-[5px] bg-ink px-7 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Book a call
          </a>
          <Link
            href="/services"
            className="inline-flex min-h-12 items-center justify-center rounded-[5px] border border-ink/20 bg-white px-7 text-sm font-semibold text-ink transition hover:border-ink hover:bg-surface"
          >
            Explore the services
          </Link>
        </div>
        <ClaudeGif />
      </section>

      {/* Lead magnet: scroll-revealed scorecard invite (Door A) */}
      <ScorecardSection />

      {/* About: full-bleed photo with the heading set on it */}
      <section className="aboutbleed relative w-full overflow-hidden">
        <Image
          src="/simon-jacobs-event.webp"
          alt="Simon Jacobs in conversation with agency founders"
          fill
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="aboutbleed-scrim" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center">
          <h2 className="reveal font-serif text-4xl font-bold leading-tight text-white md:text-6xl">
            Plain-English advice from someone who{" "}
            <span className="em-display text-seafoam">gets agencies.</span>
          </h2>
          <p className="reveal mx-auto mt-6 max-w-[560px] text-base leading-8 text-white/85">
            Chartered Tax Adviser, Chartered Accountant, and ex-PwC. Simon works
            year-round with founder-led UK agencies on tax, profit extraction,
            and building a business that is genuinely worth selling.
          </p>
          <Link
            href="/about"
            className="reveal mt-6 inline-flex text-sm font-semibold text-white transition hover:text-seafoam"
          >
            More about Simon →
          </Link>
        </div>
      </section>

      {/* From the blog */}
      <section className="section-blue-soft px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="reveal mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
              Useful <span className="em-display text-teal">reads.</span>
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {posts.slice(0, 3).map((post, index) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="finance-card reveal flex flex-col p-6 transition duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <div className="flex items-center gap-3 text-xs font-semibold text-muted">
                  <span>{post.readingTime}</span>
                </div>
                <h3 className="mt-4 font-serif text-xl font-normal leading-snug text-ink">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                  {post.excerpt}
                </p>
                <span className="mt-5 text-sm font-semibold text-ink">
                  Read it →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* The exit angle: the long game as a founder */}
      <section className="section-blue-soft px-6 py-16 text-center md:px-10 md:py-24 lg:px-16">
        <div className="reveal mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl font-bold leading-tight md:text-5xl">
            {exitAngle.headingLead}{" "}
            <span className="em-display text-teal">{exitAngle.headingAccent}</span>
            {exitAngle.headingTail}
          </h2>
          <p className="mx-auto mt-6 max-w-[680px] text-lg leading-9 text-muted">
            {exitAngle.body}
          </p>
        </div>
      </section>

      <Testimonials />

      <ConsultCta
        heading="Find out what your agency could be keeping."
        sub="Book a free 15-minute discovery call. No spam, no pressure, just a straight answer on whether Simon can help."
      />
    </>
  );
}
