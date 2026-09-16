import Image from "next/image";
import Link from "next/link";
import { hero, scorecardHref, bookCtaHref } from "@/lib/content";
export default function Hero() {
  return (
    <section id="top" className="hv hv-light">
      <div className="hv-dots" aria-hidden="true">
        <span className="hv-dot-1" />
        <span className="hv-dot-2" />
        <span className="hv-dot-3" />
      </div>

      <div className="hv-inner">
        <div className="hv-copy">
          <h1 className="hv-title">
            {hero.titleLead}
            <br />
            <span className="hero-accent">{hero.titleAccent}</span>
          </h1>

          <p className="hv-sub">{hero.sub}</p>

          <div className="hv-actions">

            <Link href={scorecardHref} className="hv-link hv-cta-primary">
              See where you stand
              <span aria-hidden="true">›</span>
            </Link>
            <a href={bookCtaHref} className="hv-link">
              Talk through a decision
              <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>
      </div>


      <div className="hv-portrait">
        <Image
          src="/simon-jacobs-cutout.webp"
          alt="Simon Jacobs, Chartered Tax Adviser at SRJ International"
          fill
          priority
          sizes="(min-width: 1024px) 560px, 320px"
          className="object-contain object-bottom"
        />
      </div>
    </section>
  );
}
