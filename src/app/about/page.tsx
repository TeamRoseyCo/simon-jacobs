import type { Metadata } from "next";
import Image from "next/image";
import ConsultCta from "@/components/ConsultCta";
import Accreditations from "@/components/Accreditations";
import AboutJourney from "@/components/AboutJourney";
import WorksWith from "@/components/WorksWith";
import { principles, credentials, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Simon Jacobs, CTA & ex-PwC | SRJ International",
  description:
    "Simon Jacobs is a Chartered Tax Adviser (CTA · ACA) and ex-PwC, founder of SRJ International (formerly Jacobs Taxes). He advises UK marketing agencies on tax, profit extraction, director pay, and exit.",
  alternates: { canonical: "/about" },
};

// ProfilePage + Person schema so branded searches for "Simon Jacobs" and
// "Jacobs Taxes" resolve to this page as the canonical entity. Google treats a
// ProfilePage with a mainEntity Person as the authoritative profile for a named
// individual; alternateName on worksFor declares the "Jacobs Taxes" alias.
const profileLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/about#profile`,
  url: `${site.url}/about`,
  name: "About Simon Jacobs",
  mainEntity: {
    "@type": "Person",
    "@id": `${site.url}/#simon-jacobs`,
    name: "Simon Jacobs",
    jobTitle: "Chartered Tax Adviser (CTA · ACA)",
    description:
      "Simon Jacobs is a Chartered Tax Adviser (CTA) and Chartered Accountant (ACA), ex-PwC, and founder of SRJ International (formerly known as Jacobs Taxes), specialising in tax planning and profit extraction for UK marketing agencies.",
    image: `${site.url}/simon-jacobs.jpg`,
    url: `${site.url}/about`,
    email: site.email,
    telephone: "+447821900992",
    sameAs: [site.linkedin, site.instagram, site.icaew],
    worksFor: {
      "@type": "AccountingService",
      "@id": `${site.url}/#organization`,
      name: "SRJ International",
      alternateName: "Jacobs Taxes",
      url: site.url,
    },
    alumniOf: { "@type": "Organization", name: "PwC" },
    memberOf: [
      {
        "@type": "Organization",
        name: "Chartered Institute of Taxation (CIOT)",
      },
      { "@type": "Organization", name: "ICAEW" },
    ],
    knowsAbout: [
      "Tax planning",
      "Profit extraction",
      "Corporation tax",
      "Director remuneration",
      "Agency accountancy",
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileLd) }}
      />
      <section className="section-white mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pb-2 pt-24 md:gap-16 md:px-10 md:pb-4 md:pt-28 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-16">
        <div className="image-stack reveal relative min-h-[520px] overflow-hidden rounded-[18px]">
          <Image
            src="/simon-jacobs.webp"
            alt="Simon Jacobs, Chartered Tax Adviser and founder of SRJ International"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover object-[center_12%]"
          />
        </div>
        <div className="reveal flex flex-col justify-center text-center lg:text-left">
          <h1 className="mx-auto max-w-[620px] font-serif text-4xl font-normal leading-tight md:text-5xl lg:mx-0">
            Meet Simon Jacobs,{" "}
            <span className="em-display text-teal">Chartered Tax Adviser</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-base leading-8 text-muted lg:mx-0">
            Simon Jacobs is a Chartered Tax Adviser (CTA) and Chartered
            Accountant (ACA), qualified through the CIOT and ICAEW, with over
            ten years in tax and accounting. Before founding SRJ International
            (previously Jacobs Taxes), he spent more than four years at PwC
            advising large multinational corporations and SMEs on tax planning
            and tax advice.
          </p>
        </div>
      </section>

      {/* Editorial sequence with a scroll-journey connector behind it */}
      <AboutJourney>
        <div className="aj-step">
          <p className="max-w-xl text-lg leading-9 text-muted">
            He set up on his own to specialise in the clients he enjoys most:
            digital marketing agencies, SMEs, and high-net-worth individuals,
            with tax planning, accounting, and compliance under one roof. The
            day-to-day realities of a growing agency, uneven cashflow, retained
            clients, director pay, and the tension between taking profit and
            reinvesting it, are exactly where good planning earns its keep.
          </p>
        </div>
        <div className="aj-step justify-end text-right">
          <p className="ml-auto max-w-xl text-lg leading-9 text-muted">
            Away from the numbers, he is an award-winning public speaker who
            has presented at the ICAEW and CIOT and serves as Vice President of
            Membership at his local Toastmasters club. It is the same instinct
            that drives the work: explain it clearly, and help you make the call
            with confidence.
          </p>
        </div>
      </AboutJourney>

      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
        <figure className="reveal overflow-hidden rounded-[18px] border border-border bg-white shadow-[0_18px_55px_rgba(8,34,75,0.08)]">
          <div className="relative aspect-[16/10] w-full">
            <Image
              src="/simon-jacobs-event.webp"
              alt="A chartered tax adviser in conversation with agency founders over dinner"
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
        <p className="accred-eyebrow accred-eyebrow-light reveal mt-10">CTA · ACA · ex-PwC</p>
        <Accreditations variant="light" className="reveal" />
        <WorksWith className="reveal mt-8" />
        <p className="reveal mx-auto mt-10 max-w-2xl text-center text-sm leading-7 text-muted">
          This site was designed and built by{" "}
          <a
            href="https://roseyco.com"
            target="_blank"
            rel="noopener"
            className="font-semibold text-accent underline decoration-border underline-offset-2 transition hover:text-ink"
          >
            RoseyCo
          </a>
          , a UK marketing agency helping local businesses grow through SEO and
          content.
        </p>
      </section>

      <ConsultCta
        heading="Bring the questions you've been putting off."
        sub="A short discovery call to talk through where the agency is and where you want it to go."
      />
    </>
  );
}
