import Link from "next/link";
import { bookHref, navLinks, site } from "@/lib/content";
import NewsletterSignup from "@/components/NewsletterSignup";
import Accreditations from "@/components/Accreditations";

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
            <p className="mt-3 max-w-[440px] text-xs leading-6 text-white/60">
              Plain-English thinking on tax, profit, and building value for your
              own agency. No spam, unsubscribe anytime.
            </p>
          </div>
          <NewsletterSignup variant="footer" />
        </div>
        <Accreditations variant="dark" className="mt-10" />
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
            <span>Tax planning</span>
            <span>Profit extraction</span>
            <span>Agency accountancy</span>
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
            href={bookHref}
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
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-5 text-xs text-white/45 md:flex-row md:items-center md:justify-between md:px-10 lg:px-16">
          <p>© 2026 Simon Jacobs. All rights reserved.</p>
          <p>UK marketing agency tax and accountancy specialist.</p>
        </div>
      </div>
    </footer>
  );
}
