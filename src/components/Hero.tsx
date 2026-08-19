import Image from "next/image";
import Link from "next/link";
import { hero, scorecardHref, bookCtaHref } from "@/lib/content";

/**
 * Home hero, built on Apple's product-page composition using SRJ's own palette.
 *
 * The pattern, and why each part is here:
 *  - Everything is centred on one axis. Apple never splits a hero into a copy
 *    column and an image column; the claim sits above the product.
 *  - The headline is two short declaratives, semibold rather than black, set
 *    very large with tight negative tracking.
 *  - One qualifying line underneath, in a lighter weight and a softer ink.
 *  - Two chevron links rather than two heavy buttons. On apple.com the primary
 *    action is a text link with a rising chevron, not a filled block.
 *  - Then the product, large and centred. Here the product is Simon.
 *
 * No entrance animation anywhere. The page is fully painted on first frame.
 */
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
            {/* One filled primary, one quiet secondary. Two text links of equal
                weight gave the hero no focal point: the most important thing on
                the page was also the least visible thing on it. */}
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

      {/* The product shot. Background-removed cut-out from
          scripts/thumbs/cutout.mjs, centred under the claim.
          Sibling of .hv-inner rather than a child: on desktop it is positioned
          against .hv so it can stand on the section's bottom edge, and
          .hv-inner is itself positioned, which would otherwise become the
          containing block and cap its height. */}
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
