// TEMPORARY. A side-by-side type test so Hazem can pick the body sans against
// real page copy. Fonts load straight from Google here for speed of comparison;
// the winner gets self-hosted through next/font in layout.tsx.
//
// Committed deliberately so it can be reviewed on the live domain rather than
// only on a laptop. It is therefore reachable at /font-lab in production: kept
// out of search by the noindex below and by a matching disallow in robots.ts.
// DELETE this route, and that disallow, once the choice is made.
import type { Metadata } from "next";

import Testimonials from "@/components/Testimonials";

export const metadata: Metadata = {
  title: "Type test",
  robots: { index: false, follow: false, nocache: true },
};

const OPTIONS = [
  {
    name: "Current: Helvetica / Arial",
    stack: 'Arial, Helvetica, "Segoe UI", sans-serif',
    note: "What the site uses today. No web font, nothing to download.",
  },
  {
    name: "Source Sans 3",
    stack: '"Source Sans 3", sans-serif',
    note: "Humanist, warm, designed for long reading. Professional without feeling corporate.",
  },
  {
    name: "IBM Plex Sans",
    stack: '"IBM Plex Sans", sans-serif',
    note: "Serious and slightly technical. Reads credible in a finance context.",
  },
  {
    name: "Figtree",
    stack: "Figtree, sans-serif",
    note: "Warm geometric, closest to the testimonial reference you liked.",
  },
  {
    name: "Nunito Sans",
    stack: '"Nunito Sans", sans-serif',
    note: "Rounder and friendlier. Softens the whole page.",
  },
  {
    name: "Libre Franklin",
    stack: '"Libre Franklin", sans-serif',
    note: "Editorial, newspaper lineage. Pairs hard with the Georgia headings.",
  },
];

export default function FontLab() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&family=IBM+Plex+Sans:wght@400;600;700&family=Figtree:wght@400;600;700&family=Nunito+Sans:wght@400;600;700&family=Libre+Franklin:wght@400;600;700&display=swap');
      `}</style>
      <main className="px-6 py-14 md:px-10">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl">Type test</h1>
          <p className="mt-3 text-[15px] leading-7 text-muted">
            Each block below is the same real page copy with only the body sans
            swapped. Headings stay Georgia. Pick one and I will self-host it
            through next/font, then delete this page.
          </p>
        </div>

        {OPTIONS.map((option) => (
          <section
            key={option.name}
            style={{ ["--font-sans" as string]: option.stack }}
            className="mx-auto mt-12 max-w-5xl border-t border-border pt-8"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">
              {option.name}
            </p>
            <p className="mt-1 text-[13px] text-muted">{option.note}</p>

            <h2 className="mt-6 font-serif text-3xl leading-tight md:text-4xl">
              Tax, profit and accounts for UK{" "}
              <span className="em-display text-teal">marketing agencies.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-8">
              We help founder-led UK marketing agencies keep more of what they
              earn and build a business that&rsquo;s actually worth selling. You
              deal with the Chartered Tax Adviser directly, not an account
              manager, and the planning happens before the money moves.
            </p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.1em] text-muted">
              Chartered Tax Adviser &middot; Ex-PwC &middot; Agencies only
            </p>
          </section>
        ))}

        <div className="mt-16">
          <p className="mx-auto max-w-3xl px-6 text-xs font-semibold uppercase tracking-[0.14em] text-teal">
            The testimonial section, live
          </p>
          <Testimonials />
        </div>
      </main>
    </>
  );
}
