import Link from "next/link";
import { bookCtaHref, navLinks, site } from "@/lib/content";
import NewsletterSignup from "@/components/NewsletterSignup";
import Accreditations from "@/components/Accreditations";
import WorksWith from "@/components/WorksWith";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="mx-auto w-full max-w-7xl border-b border-white/10 px-6 py-10 md:px-10 lg:px-16">
        <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <h3 className="font-serif text-2xl font-bold text-white md:text-3xl">
              Useful if:
            </h3>
            <p className="mt-3 max-w-[440px] text-sm leading-7 text-white/80">
              Your tax bill keeps climbing, you want an agency worth selling, and
              you would rather plan ahead than scramble at year-end.
            </p>
            <p className="mt-3 max-w-[440px] text-xs leading-6 text-white/70">
              Plain-English thinking on tax, profit, and building value for your
              own agency. No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterSignup variant="footer" />
        </div>
        <p className="accred-eyebrow accred-eyebrow-dark mt-10">CTA · ACA · ex-PwC</p>
        <Accreditations variant="dark" className="mt-3" />
        <WorksWith tone="light" className="mt-8" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_0.7fr_0.7fr_1fr] md:px-10 lg:px-16">
        <div>
          <Link href="/" className="brand-script text-[30px] leading-none text-white">
            SRJ International
          </Link>
          <p className="mt-5 max-w-[360px] text-sm leading-7 text-white/68">
            Chartered tax advice, profit extraction, and accountancy for UK
            marketing agencies building toward a profitable exit.
          </p>
          <p className="mt-5 text-sm font-semibold text-white/85">
            {site.firm}
          </p>
          <p className="mt-1 text-xs leading-6 text-white/70">
            A trading name of SRJ International Limited.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white/42">
            Site
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white/42">
            Services
          </h3>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
            <Link href="/services" className="transition hover:text-white">
              Tax planning
            </Link>
            <Link href="/services" className="transition hover:text-white">
              Profit extraction
            </Link>
            <Link href="/services" className="transition hover:text-white">
              Agency accountancy
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-white/42">
            Contact
          </h3>
          <p className="mt-5 text-sm leading-7 text-white/70">
            We will show you what you&apos;re missing out on.
          </p>
          <a
            href={bookCtaHref}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-[5px] bg-white px-5 text-sm font-semibold text-ink transition hover:bg-surface"
          >
            Book a discovery call
          </a>
          <div className="mt-5 flex flex-col gap-2 text-sm text-white/70">
            <a
              href={`mailto:${site.email}`}
              className="transition hover:text-white"
            >
              {site.email}
            </a>
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="transition hover:text-white"
            >
              {site.phone}
            </a>
            <div className="mt-1 flex items-center gap-4">
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="footer-social inline-flex origin-center text-white/45 transition-all duration-200 hover:scale-125 hover:text-[#0A66C2]"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="footer-social footer-social-ig inline-flex origin-center text-white/45 transition-all duration-200 hover:scale-125"
              >
                <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                  <defs>
                    <linearGradient id="ig-gradient" x1="0" y1="1" x2="1" y2="0">
                      <stop offset="0" stopColor="#feda75" />
                      <stop offset="0.35" stopColor="#fa7e1e" />
                      <stop offset="0.6" stopColor="#d62976" />
                      <stop offset="0.85" stopColor="#962fbf" />
                      <stop offset="1" stopColor="#4f5bd5" />
                    </linearGradient>
                  </defs>
                  <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.22.42.56.21.96.47 1.38.9.43.42.69.82.9 1.38.17.42.37 1.05.42 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.42 2.22-.21.56-.47.96-.9 1.38-.42.43-.82.69-1.38.9-.42.17-1.05.37-2.22.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.22-.42-.56-.21-.96-.47-1.38-.9-.43-.42-.69-.82-.9-1.38-.17-.42-.37-1.05-.42-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.42-2.22.21-.56.47-.96.9-1.38.42-.43.82-.69 1.38-.9.42-.17 1.05-.37 2.22-.42 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.38-2.13-.67-.66-1.34-1.07-2.13-1.38-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0z" />
                  <path d="M12 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8z" />
                  <circle cx="18.41" cy="5.59" r="1.44" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-5 text-xs text-white/70 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
          <p>© 2026 SRJ International Limited, trading as Jacobs Taxes. All rights reserved.</p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition hover:text-white">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="transition hover:text-white">
              Cookie Policy
            </Link>
            <Link href="/terms" className="transition hover:text-white">
              Terms of Use
            </Link>
            <Link href="/accessibility" className="transition hover:text-white">
              Accessibility Statement
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
