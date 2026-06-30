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
            Simon Jacobs
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
            I will show you what you&apos;re missing out on (for free)
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
