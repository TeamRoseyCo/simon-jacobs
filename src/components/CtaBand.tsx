import { bookCtaHref } from "@/lib/content";

export default function CtaBand({
  heading = "Find out what your agency could be keeping.",
  sub,
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section id="book" className="px-4 py-16 md:px-6 md:py-24 lg:px-8">
      <div className="cta-band mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 p-8 text-center lg:p-10">
        <div className="reveal mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl font-normal leading-tight md:text-6xl">
            {heading}
          </h2>
          {sub ? (
            <p className="mx-auto mt-5 max-w-[620px] text-base leading-8 text-white/75">
              {sub}
            </p>
          ) : null}
        </div>
        <a
          href={bookCtaHref}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-ink px-7 text-sm font-semibold text-white transition hover:bg-accent"
        >
          Book a discovery call
        </a>
      </div>
    </section>
  );
}
