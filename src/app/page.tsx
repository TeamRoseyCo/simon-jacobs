import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import ConsultCta from "@/components/ConsultCta";
import { services, whoFor } from "@/lib/content";
import { posts } from "@/lib/posts";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Lead statement — large, boxless, two-tone */}
      <section className="section-white mx-auto w-full max-w-5xl px-6 py-16 text-center md:py-32 lg:px-16">
        <p className="reveal mx-auto max-w-4xl font-serif text-[26px] leading-[1.5] text-muted md:text-[40px] md:leading-[1.38]">
          Most agency owners are brilliant at winning clients but{" "}
          <span className="text-ink">
            terrible at keeping what they make.
          </span>{" "}
          Because nobody ever showed them{" "}
          <span className="em-display text-teal">what&apos;s actually possible.</span>
        </p>
      </section>

      {/* Who this is for — photo of Simon on the left, blending into the blue */}
      <section className="px-4 py-4 md:px-6 lg:px-8">
        <div className="section-ink relative mx-auto w-full max-w-7xl overflow-hidden rounded-[18px]">
          <div className="whofor-grid" aria-hidden="true" />
          <div className="grid lg:grid-cols-2 lg:items-stretch">
            <div className="whofor-photo relative z-10 min-h-[300px] lg:min-h-[560px]">
              <Image
                src="/simon-jacobs-event.webp"
                alt="Simon Jacobs in conversation with agency founders"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover object-[50%_28%]"
              />
            </div>

            <div className="relative z-10 px-6 pb-12 pt-4 lg:px-14 lg:py-20">
              <div className="reveal text-center">
                <p className="eyebrow">
                  Who this is for
                </p>
                <h2 className="mt-4 font-serif text-4xl font-normal leading-tight text-white md:text-5xl">
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
        </div>
      </section>

      {/* Services teaser */}
      <section className="section-white relative mx-auto w-full max-w-7xl px-6 py-16 text-center md:px-10 md:py-24 lg:px-16">
        <div className="reveal mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl font-normal leading-tight md:text-5xl">
            Stop using <span className="em-display text-teal">Claude</span> for
            taxes.
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-base leading-8 text-muted">
            Instead, here is what you get when you work with me.
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
        <div className="reveal mt-8">
          <Link
            href="/services"
            className="inline-flex min-h-12 items-center justify-center rounded-[5px] bg-ink px-7 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Explore the services
          </Link>
        </div>
      </section>

      {/* About me — heading first, photo in the middle, body beneath */}
      <section className="section-white mx-auto w-full max-w-3xl px-6 py-16 text-center md:px-10 md:py-24 lg:px-16">
        <div className="reveal">
          <p className="eyebrow">
            About Simon
          </p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Plain-English advice from someone who{" "}
            <span className="em-display text-teal">gets agencies.</span>
          </h2>
        </div>

        <div className="image-stack reveal relative mx-auto mt-8 min-h-[320px] w-full max-w-[460px] overflow-hidden md:min-h-[420px]">
          <Image
            src="/simon-jacobs-dubai.webp"
            alt="Simon Jacobs"
            fill
            sizes="(min-width: 1024px) 460px, 92vw"
            className="object-cover object-[center_18%]"
          />
        </div>

        <div className="reveal">
          <p className="mx-auto mt-8 max-w-[560px] text-base leading-8 text-muted">
            Chartered Tax Adviser, Chartered Accountant, and ex-PwC. Simon works
            year-round with founder-led UK agencies on tax, profit extraction,
            and building a business that is genuinely worth selling.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex text-sm font-semibold text-ink transition hover:text-accent"
          >
            More about Simon →
          </Link>
        </div>
      </section>

      {/* From the blog */}
      <section className="section-blue-soft px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <div className="reveal mx-auto max-w-3xl text-center">
            <h2 className="font-serif text-4xl font-normal leading-tight md:text-5xl">
              Tax and profit, in{" "}
              <span className="em-display text-teal">plain English.</span>
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

      <Testimonials />

      <ConsultCta
        heading="Find out what your agency could be keeping."
        sub="Join the list and Simon will set you up with a free consultation. No spam, unsubscribe anytime."
      />
    </>
  );
}
