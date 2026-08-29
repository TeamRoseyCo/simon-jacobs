import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Hero from "@/components/Hero";
import Testimonials from "@/components/Testimonials";
import ConsultCta from "@/components/ConsultCta";
import ClaudeGif from "@/components/ClaudeGif";
import RotatingWord from "@/components/RotatingWord";
import ScorecardSection from "@/components/ScorecardSection";
import Accreditations from "@/components/Accreditations";
import WorksWith from "@/components/WorksWith";
import PasScrollSequence from "@/components/PasScrollSequence";
import DecisionModel from "@/components/DecisionModel";
import {
  services,
  whoFor,
  lead,
  bookCtaHref,
  scorecardHref,
} from "@/lib/content";
import { getAllPosts } from "@/lib/posts";
import { postImage } from "@/lib/postImage";

// Homepage-specific meta description. The site-wide default in layout.tsx runs
// 172 chars (Bing flagged it as too long on "/"); this trims it to ~153, inside
// the ~150-160 range engines display without truncating, while keeping the
// credential and keyword signals.
export const metadata: Metadata = {
  description:
    "Chartered Tax Advisers for owner-managed UK businesses. Tax planning, cross-border advice and accountancy from a CTA, ACA and PwC trained adviser. Keep more of what you earn.",
};

export default async function Home() {
  const posts = await getAllPosts();
  return (
    // `pal-ink` swaps the site palette for SRJ's own deep ink scheme on this
    // page only. site.css keys the override off `:root:has(.pal-ink)`, so the
    // shared header and footer recolour here too without affecting any other
    // route. Swap this one class back to `pal-panther` to restore the previous
    // scheme.
    <div className="pal-ink">
      <Hero />

      {/* Lead statement: leads the reader into the whole page */}
      <section className="section-blue-soft ap-section text-center gutter-bleed">
        <Accreditations
          variant="light"
          className="accred-prominent mb-12 md:mb-16"
        />
        <p className="ap-statement">
          {lead.partA}
          <span>{lead.inkAccent}</span>
          {lead.partB}
          <span className="ap-accent">{lead.tealAccent}</span>
        </p>
        <WorksWith className="mt-12" />
      </section>

      <PasScrollSequence />

      <DecisionModel />

      {/* Who this is for.
          Rebuilt 15 Aug 2026. The original put the copy directly on top of a
          full-bleed interior shot, which buried the text and duplicated the
          About section's treatment further down. The photo is back, but as a
          contained, rounded image sitting beside the copy rather than behind
          it, so it reads as a photograph instead of a texture. */}
      <section className="whofor-v2">
        <div className="whofor-v2-inner">
          <div className="whofor-v2-media">
            <Image
              src="/simon-jacobs-dubai.webp"
              alt="Simon Jacobs, Chartered Tax Adviser at SRJ International"
              fill
              sizes="(min-width: 900px) 46vw, 90vw"
              className="object-cover object-[38%_28%]"
            />
          </div>

          <div className="whofor-v2-copy">
            <h2 className="whofor-v2-title">
              For owners who want the answer before they act.
            </h2>
            <ul className="whofor-v2-list">
              {whoFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Link href={scorecardHref} className="ap-link on-dark whofor-v2-cta">
              See where you stand <span aria-hidden="true">›</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Services teaser */}
      <section className="gutter section-white ap-section relative text-center">
        <div className="mx-auto max-w-3xl">
          {/* The heading block is pinned: .svc-head is a fixed-width box, its
              text left-aligned, the box itself centred on the page. So
              "Stop using" always starts at the same x and the rotating word
              expands rightward into the box's spare width. Nothing reflows,
              nothing resizes, and "for taxes." never moves. */}
          <h2 className="ap-h2 svc-head">
            <RotatingWord
              prefix="Before you "
              items={[
                { label: "take a dividend", color: "#1A8275" },
                { label: "use ChatGPT", color: "#10A37F" },
                { label: "move abroad", color: "#173F93" },
                { label: "use Claude", color: "#D97757" },
                { label: "hire", color: "#1A8275" },
                { label: "invest", color: "#173F93" },
                { label: "sell", color: "#1A8275" },
              ]}
            />
            <br />
            know what changes.
          </h2>
          {/* 29 Aug 2026: link swapped from the marketing-agencies vertical to
              the general /services money page, at the client's request — this
              teaser now reads as general UK, with sector pages linked lower
              down the funnel instead. Styled as an editorial inline link
              (underline, no colour shout) rather than the bright accent blue,
              which read as a stray hyperlink dropped into the sentence. */}
          <p className="ap-sub mt-5">
            The return is the final record. Useful advice happens earlier. We
            work across{" "}
            <Link href="/services" className="ap-inline-link">
              owner-managed UK businesses of every kind
            </Link>
            .
          </p>
        </div>
        <div className="ap-feature-grid mt-14">
          {services.map((service) => (
            <article key={service.title} className="ap-feature">
              <h3 className="ap-h3 text-ink">{service.title}</h3>
              <p className="mt-3">{service.body}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={bookCtaHref}
            className="ap-btn"
          >
            Book a call
          </a>
          <Link
            href="/services"
            className="ap-btn-quiet"
          >
            Explore the services
          </Link>
        </div>
        <ClaudeGif />
      </section>

      {/* Lead magnet: scroll-revealed scorecard invite (Door A) */}
      <ScorecardSection />

      <Testimonials />

      {/* About: full-bleed photo with the heading set on it */}
      <section className="aboutbleed relative w-full overflow-hidden">
        <Image
          src="/simon-jacobs-event.webp"
          alt="A chartered tax adviser in conversation with business owners"
          fill
          sizes="100vw"
          className="object-cover object-[center_35%]"
        />
        <div className="aboutbleed-scrim" aria-hidden="true" />
        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-3xl flex-col items-center justify-center px-6 py-24 text-center md:px-10 lg:px-16">
          <h2 className="ap-h2 text-white">
            Plain-English advice from someone who{" "}
            <span className="text-seafoam">has seen it before.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-base leading-8 text-white/85">
            Chartered Tax Adviser, Chartered Accountant, and PwC trained. We work
            year-round with owner-managed UK businesses on tax, profit
            extraction, cross-border questions, and building something that is
            genuinely worth selling.
          </p>
          <Link href="/about" className="ap-link on-dark mt-7">
            More about us <span aria-hidden="true">›</span>
          </Link>
        </div>
      </section>

      <ConsultCta
        heading="Find out what your next decision changes."
        sub="Book a 15-minute discovery call. Tell us what is moving - profit, money, country, or a possible sale - and we will tell you plainly whether we can help."
      />

      {/* From the blog */}
      <section className="section-blue-soft ap-section gutter-bleed">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="ap-h2">
              Useful <span className="text-teal">reads.</span>
            </h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="ap-card group flex flex-col overflow-hidden"
              >
                <Image
                  src={postImage(post.slug)}
                  alt={post.title}
                  width={2400}
                  height={1500}
                  sizes="(min-width: 768px) 33vw, 90vw"
                  className="h-auto w-full"
                />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs font-semibold text-muted">
                    <span>{post.readingTime}</span>
                  </div>
                  <h3 className="ap-h3 mt-3 text-ink" style={{ fontSize: "18px" }}>
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                    {post.excerpt}
                  </p>
                  <span className="ap-link mt-5">
                    Read it <span aria-hidden="true">›</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
