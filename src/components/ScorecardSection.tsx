import Link from "next/link";
import { scorecardBand, scorecardHref } from "@/lib/content";

const checklist = [
  "Your score across 7 profit areas",
  "A 90-day plan to plug the leaks",
  "No sales pitch",
];
export default function ScorecardSection() {
  return (
    <section className="sc-band relative w-full overflow-hidden py-20 md:py-28 gutter-bleed">
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">

        <div className="text-left">
          <h2 className="ap-h2 text-ink">
            {scorecardBand.headingLead}
            <span className="em-display font-normal text-teal">
              {scorecardBand.headingAccent}
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-muted md:text-lg">
            {scorecardBand.sub}
          </p>

          <ul className="ap-plainlist mt-9">
            {checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={scorecardHref}
              className="ap-btn"
            >
              {scorecardBand.cta}
              <span aria-hidden="true" className="ml-1.5">›</span>
            </Link>
            <span className="text-sm text-muted">{scorecardBand.time}</span>
          </div>
        </div>


        <div className="sc-mock-wrap relative">
          <div className="sc-mock-card" aria-hidden="true">
            <div className="flex items-center justify-between">
              <span className="text-[13px] font-medium text-ink">
                Profit-leak scorecard
              </span>
              <span className="text-[13px] text-muted">Question 3 of 7</span>
            </div>

            <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-[#e6eef6]">
              <span className="block h-full w-[42%] rounded-full bg-accent" />
            </div>

            <p className="ap-h3 mt-7 text-ink">
              How predictable is your monthly profit?
            </p>

            <div className="mt-5 grid gap-3">
              <div className="sc-opt">
                Very, I could forecast it to the pound
              </div>
              <div className="sc-opt sc-opt-on">
                Roughly, but it swings month to month
              </div>
              <div className="sc-opt">
                Honestly? I find out at year-end
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
              <span className="text-sm font-medium text-muted">
                Profit-leak score
              </span>
              <span className="ap-h3 text-ink">
                62<span className="text-base text-muted">/100</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
