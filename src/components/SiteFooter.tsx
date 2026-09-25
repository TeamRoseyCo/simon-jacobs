import Image from "next/image";
import Link from "next/link";
import { bookCtaHref, navLinks, scorecardHref, site } from "@/lib/content";
import NewsletterSignup from "@/components/NewsletterSignup";
const AML_SUPERVISOR: string | null = null;

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer site-footer-light">

      <div className="gutter foot-band foot-capture">
        <div className="foot-capture-copy">

          <h2 className="foot-cta-head">Useful if:</h2>
          <p className="foot-lede">
            Your tax bill keeps climbing, your affairs have got more complicated
            than a standard return, and you would rather plan ahead than
            scramble at year-end.
          </p>

          <p className="foot-scorecard">
            Not ready to talk yet? The Profit-Rich Scorecard scores your
            business across seven areas and sends back a 90-day plan.{" "}
            <Link href={scorecardHref} className="foot-action">
              Take the Scorecard <span aria-hidden="true">›</span>
            </Link>
          </p>
        </div>

        <div className="foot-capture-form">
          <NewsletterSignup variant="footer" />
          <p className="foot-fine">
            Plain-English writing from Simon Jacobs, Chartered Tax Adviser. No
            spam, unsubscribe anytime. See our{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>


      <div className="gutter foot-band foot-cols">
        <div className="foot-identity">
          <Link
            href="/"
            aria-label="SRJ International, home"
            className="flex items-center gap-3"
          >
            <Image
              src="/logo/srj-wordmark.png"
              alt=""
              width={96}
              height={96}
              className="h-7 w-auto"
            />
            <span className="foot-wordmark">SRJ International</span>
          </Link>

          <p className="foot-lede foot-descriptor">
            Chartered tax advice, accounts and compliance for owner-managed UK
            businesses. The work is strongest where the tax is genuinely
            complicated: income or people across borders, a sale on the horizon,
            or a structure that has outgrown itself.
          </p>


          <p className="foot-person">Simon Jacobs</p>
          <p className="foot-cred">

            <a
              href={site.icaew}
              target="_blank"
              rel="me noopener noreferrer"
            >
              ICAEW Chartered Accountant
            </a>
            <span aria-hidden="true"> · </span>

            Chartered Tax Adviser (CIOT)
            <span aria-hidden="true"> · </span>

            previously PwC
          </p>
        </div>

        <nav className="foot-nav" aria-label="Site">
          <p className="foot-head">Site</p>
          <div className="foot-links">
            <Link href="/" className="foot-link">
              Home
            </Link>
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="foot-link">
                {link.label}
              </Link>
            ))}
          </div>
        </nav>

        <nav className="foot-nav" aria-label="Advice">
          <p className="foot-head">Advice</p>
          <div className="foot-links">
            <Link href="/services" className="foot-link">
              All services
            </Link>

            <Link href="/international-tax" className="foot-link">
              International and cross-border tax
            </Link>
          </div>
        </nav>

        <div className="foot-nav">
          <p className="foot-head">Contact</p>
          <div className="foot-links">
            <a href={`mailto:${site.email}`} className="foot-link">
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="foot-link"
            >
              {site.phone}
            </a>
            <a href={bookCtaHref} className="foot-action foot-action-block">
              Book a discovery call <span aria-hidden="true">›</span>
            </a>
          </div>
        </div>

        <div className="foot-socials foot-socials-row" aria-label="Social media">
          <a
            href={site.linkedin}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label="LinkedIn"
            className="foot-social"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
          <a
            href={site.instagram}
            target="_blank"
            rel="me noopener noreferrer"
            aria-label="Instagram"
            className="foot-social"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
              <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.42.56.21.96.47 1.38.9.43.42.69.82.9 1.38.17.42.37 1.05.42 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.22-.21.56-.47.96-.9 1.38-.42.43-.82.69-1.38.9-.42.17-1.05.37-2.22.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.42-.56-.21-.96-.47-1.38-.9-.43-.42-.69-.82-.9-1.38-.17-.42-.37-1.05-.42-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.22.21-.56.47-.96.9-1.38.42-.43.82-.69 1.38-.9.42-.17 1.05-.37 2.22-.42 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13-.67-.66-1.34-1.07-2.13-1.38-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0z" />
              <path d="M12 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
              <circle cx="18.41" cy="5.59" r="1.44" />
            </svg>
          </a>
        </div>
      </div>


      <div className="foot-bar">
        <div className="gutter foot-bar-inner">
          <div className="foot-legal">
            <p>
              © {year} SRJ International Limited. Registered in England and
              Wales, company number 12779246. Registered office:{" "}
              {site.physicalAddress}.
              {AML_SUPERVISOR ? (
                <>
                  {" "}
                  Supervised for anti-money laundering purposes by{" "}
                  {AML_SUPERVISOR}.
                </>
              ) : null}
            </p>
            <p>
              Website by{" "}

              <a
                href="https://www.roseyco.com/uk/services/web-development"
                target="_blank"
                rel="noopener"
                className="foot-strong"
              >
                RoseyCo
              </a>
            </p>
          </div>
          <nav className="foot-legal-nav" aria-label="Legal">
            <Link href="/privacy" className="foot-link">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="foot-link">
              Cookie Policy
            </Link>
            <Link href="/terms" className="foot-link">
              Terms of Use
            </Link>
            <Link href="/accessibility" className="foot-link">
              Accessibility Statement
            </Link>

          </nav>
        </div>
      </div>
    </footer>
  );
}
