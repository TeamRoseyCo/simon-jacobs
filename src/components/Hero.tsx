import Image from "next/image";
import Link from "next/link";
import { hero, scorecardHref, bookHref } from "@/lib/content";

// Hero: clean light background with big soft Apple-style colour blobs drifting
// behind. Content left-centred (headline + body + two CTAs), Simon on the side.
export default function Hero() {
  return (
    <section id="top" className="hv">
      <div className="hv-dots" aria-hidden="true">
        <span className="hv-dot hv-dot-1" />
        <span className="hv-dot hv-dot-2" />
        <span className="hv-dot hv-dot-3" />
        <span className="hv-dot hv-dot-4" />
        <span className="hv-dot hv-dot-5" />
      </div>
      <div className="hv-grid" aria-hidden="true" />

      <div className="hv-inner">
        <div className="hv-copy">
          <h1 className="hv-title load-rise" style={{ animationDelay: "60ms" }}>
            {hero.titleLead}{" "}
            <span className="hero-accent">{hero.titleAccent}</span>
          </h1>
          <p className="hv-sub load-rise" style={{ animationDelay: "160ms" }}>
            {hero.sub}
          </p>
          <p className="hv-aside load-rise" style={{ animationDelay: "210ms" }}>
            {hero.subAside}
          </p>
          <div
            className="hv-actions load-rise"
            style={{ animationDelay: "260ms" }}
          >
            <Link href={scorecardHref} className="hv-btn-primary">
              Find your profit leak
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href={bookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hv-btn-ghost"
            >
              Book a call
            </a>
          </div>
        </div>

        <div className="hv-portrait load-pop" style={{ animationDelay: "220ms" }}>
          <Image
            src="/simon-jacobs.webp"
            alt="Simon Jacobs, Chartered Tax Adviser"
            fill
            priority
            sizes="(min-width: 1024px) 500px, 70vw"
            className="object-cover object-[center_12%]"
          />
        </div>
      </div>
    </section>
  );
}
