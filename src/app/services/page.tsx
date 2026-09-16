import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import ConsultCta from "@/components/ConsultCta";
import ServiceCard from "@/components/ServiceCard";
import FullServiceChecklist from "@/components/FullServiceChecklist";
import { services, servicesFull, resultItems, processSteps, site } from "@/lib/content";

const siteUrl = site.url;
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tax planning, profit extraction and accountancy",
  serviceType: "Tax planning and accountancy for UK business owners",
  areaServed: { "@type": "Country", name: "United Kingdom" },
  provider: { "@id": `${siteUrl}/#organization` },
};

function Ico({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}
const serviceIcons: ReactNode[] = [
  <path key="a" d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 7h0M9 11h0M9 15h0M15 7h0M15 11h0M15 15h0" />,
  <>
    <path key="b1" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path key="b2" d="M14 2v6h6M8 13h8M8 17h6" />
  </>,
  <>
    <line key="c1" x1="19" y1="5" x2="5" y2="19" />
    <circle key="c2" cx="6.5" cy="6.5" r="2.5" />
    <circle key="c3" cx="17.5" cy="17.5" r="2.5" />
  </>,
  <>
    <circle key="d1" cx="12" cy="12" r="9" />
    <circle key="d2" cx="12" cy="12" r="5" />
    <circle key="d3" cx="12" cy="12" r="1" />
  </>,
  <>
    <path key="e1" d="M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <path key="e2" d="M16 12h3" />
  </>,
  <>
    <rect key="f1" x="3" y="7" width="18" height="13" rx="2" />
    <path key="f2" d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </>,
  <>
    <rect key="g1" x="3" y="4" width="18" height="18" rx="2" />
    <path key="g2" d="M3 9h18M8 2v4M16 2v4M9 15l2 2 4-4" />
  </>,
  <>
    <path key="h1" d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path key="h2" d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </>,
];
const resultIcons: ReactNode[] = [
  <>
    <path key="i1" d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
    <circle key="i2" cx="12" cy="12" r="3" />
  </>,
  <>
    <path key="j1" d="M12 2l8 3v6c0 5-3.5 8-8 11-4.5-3-8-6-8-11V5z" />
    <path key="j2" d="M9 12l2 2 4-4" />
  </>,
  <>
    <circle key="k1" cx="8" cy="9" r="5" />
    <path key="k2" d="M14 6a5 5 0 1 1 0 10" />
  </>,
  <>
    <path key="l1" d="M3 17l6-6 4 4 7-7" />
    <path key="l2" d="M17 8h4v4" />
  </>,
];
const stepEmoji = ["/diagnose.webp", "/plan.webp", "/maintain.webp"];

export const metadata: Metadata = {
  title: "Tax Planning & Profit Extraction",
  description:
    "Proactive tax planning, profit extraction, and accountancy for UK business owners, built around how the business actually runs and where it's heading.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="pal-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <section className="gutter section-white pb-8 pt-20 text-center md:pt-28">
        <div className="mx-auto max-w-3xl">
          <h1 className="ap-h2">
            More than a{" "}
            <span className="em-display text-teal">year-end tidy-up.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-muted">
            Year-round advice on tax, profit, and the numbers that decide how
            much you keep and how much your business is worth, for
            owner-managed UK businesses of every kind, including{" "}
            <Link
              href="/accountants-for-marketing-agencies"
              className="font-semibold text-accent transition hover:text-ink"
            >
              marketing and creative agencies
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="gutter section-white pb-16 pt-8 md:pb-24">

        <div className="grid items-start gap-4 text-left md:grid-cols-3">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </section>

      <section className="gutter section-white pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Full service list</p>
          <h2 className="ap-h2 mt-4">
            Everything handled{" "}
            <span className="em-display text-teal">under one roof.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-base leading-8 text-muted">
            From day-to-day compliance to forward planning, the whole finance
            function for your business in one place.
          </p>
        </div>
        <FullServiceChecklist
          items={servicesFull}
          icons={serviceIcons.map((icon, index) => (
            <Ico key={index} className="h-5 w-5">
              {icon}
            </Ico>
          ))}
        />
        <p className="mx-auto mt-4 max-w-[600px] text-center text-xs text-muted">
          Tap an item to see how it works.
        </p>
      </section>

      <section className="section-white relative py-16 text-white md:py-24 gutter-bleed">
        <div className="section-ink mx-auto w-full max-w-7xl overflow-hidden rounded-[18px] px-6 py-14 text-center md:px-10 lg:px-16 lg:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="ap-h1">
              <span className="em-display text-seafoam">How</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-white/70">
              The work is designed to make tax visible earlier, profit easier to
              understand, and business decisions less reactive.
            </p>
          </div>
          <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
            {resultItems.map((item, index) => (
              <div
                key={item}
                className="flex items-start gap-4 rounded-[10px] border border-white/12 bg-white/8 p-5 backdrop-blur-xl md:p-6"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-seafoam/15 text-seafoam">
                  <Ico className="h-6 w-6">{resultIcons[index]}</Ico>
                </span>
                <span className="ap-h3 text-white">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-blue-soft py-16 md:py-24 gutter-bleed">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            {processSteps.map((step, index) => (
              <article
                key={step.title}
                className="finance-card p-5 text-center md:p-6"
              >
                <Image
                  src={stepEmoji[index]}
                  alt=""
                  width={72}
                  height={72}
                  className="mx-auto h-16 w-16"
                />
                <h3 className="ap-h2-sm mt-4 text-ink">
                  {step.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ConsultCta
        heading="See what better tax planning could be worth."
        sub="Book a short discovery call and we will look at where your profit is going."
      />
    </div>
  );
}
