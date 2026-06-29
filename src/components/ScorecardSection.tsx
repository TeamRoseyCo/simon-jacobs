import Link from "next/link";
import { scorecardBand, scorecardHref } from "@/lib/content";

const checklist = [
  "Your score across 7 profit areas",
  "A 90-day plan to plug the leaks",
  "Free, and no sales pitch",
];

// Lead magnet, RB-style layout on a clean white band: copy + checklist on the
// left, a sample of the scorecard survey mocked up on the right.
export default function ScorecardSection() {
  return (
    <section className="sc-band relative w-full overflow-hidden px-6 py-20 md:py-28">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: copy + checklist + CTA */}
        <div className="reveal text-left">
          <h2 className="font-serif text-4xl font-bold leading-[1.08] text-ink md:text-5xl">
            {scorecardBand.headingLead}
            <span className="em-display font-normal text-teal">
              {scorecardBand.headingAccent}
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted md:text-lg">
            {scorecardBand.sub}
          </p>

          <ul className="mt-8 grid gap-3">
            {checklist.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5"
              >
                <span
                  aria-hidden="true"
                  className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal text-sm font-bold text-white"
                >
                  ✓
                </span>
                <span className="text-[15px] font-medium text-ink">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={scorecardHref}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-9 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 hover:bg-teal hover:shadow-[0_18px_44px_rgba(8,34,75,0.22)]"
            >
              {scorecardBand.cta}
              <span
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <span className="text-sm text-muted">{scorecardBand.time}</span>
          </div>
        </div>

        {/* Right: sample survey mockup */}
        <div className="reveal relative hidden lg:block">
          <div className="sc-mock-card" aria-hidden="true">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
                Profit-Rich Scorecard
              </span>
              <span className="text-xs font-medium text-muted">Q3 of 7</span>
            </div>

            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#e6eef6]">
              <span className="block h-full w-[42%] rounded-full bg-teal" />
            </div>

            <p className="mt-7 font-serif text-xl leading-snug text-ink">
              How predictable is your monthly profit?
            </p>

            <div className="mt-5 grid gap-3">
              <div className="border border-border px-4 py-3.5 text-sm text-muted">
                Very, I could forecast it to the pound
              </div>
              <div className="flex items-center justify-between border-2 border-teal bg-teal/5 px-4 py-3.5 text-sm font-medium text-ink">
                Roughly, but it swings month to month
                <span className="grid h-5 w-5 place-items-center rounded-full bg-teal text-[11px] text-white">
                  ✓
                </span>
              </div>
              <div className="border border-border px-4 py-3.5 text-sm text-muted">
                Honestly? I find out at year-end
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
              <span className="text-sm font-medium text-muted">
                Profit-leak score
              </span>
              <span className="font-serif text-2xl font-bold text-ink">
                62<span className="text-base text-muted">/100</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
