import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="section-blue-soft flex min-h-[70vh] items-center px-6 py-24 lg:px-16">
      <div className="mx-auto max-w-2xl text-center">
        <p className="accred-eyebrow accred-eyebrow-light">Error 404</p>
        <h1 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
          That page took an{" "}
          <span className="em-display text-teal">early exit.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[520px] text-base leading-8 text-muted">
          The page you were after has moved or never existed. Let&apos;s get you
          back to something useful.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-[5px] bg-ink px-7 text-sm font-semibold text-white transition hover:bg-accent"
          >
            Back to home
          </Link>
          <Link
            href="/scorecard"
            className="inline-flex min-h-12 items-center justify-center rounded-[5px] border border-ink/20 bg-white px-7 text-sm font-semibold text-ink transition hover:border-ink hover:bg-surface"
          >
            Take the Profit-Rich Scorecard
          </Link>
        </div>
      </div>
    </section>
  );
}
