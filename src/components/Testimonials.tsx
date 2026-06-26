import { testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section className="section-white mx-auto w-full max-w-7xl px-6 py-16 text-center md:px-10 md:py-24 lg:px-16">
      <div className="reveal mx-auto max-w-3xl">
        <p className="eyebrow">Testimonials</p>
        <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
          What clients say about{" "}
          <span className="em-display text-teal">working with Simon.</span>
        </h2>
      </div>
      <div className="mt-10 grid gap-4 text-left md:grid-cols-3">
        {testimonials.map((t, index) => (
          <figure
            key={t.name}
            className="finance-card reveal flex h-full flex-col p-6 md:p-7"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span aria-hidden="true" className="em-display text-4xl text-teal">
              &ldquo;
            </span>
            <blockquote className="-mt-3 flex-1 text-sm leading-7 text-ink">
              {t.quote}
            </blockquote>
            <figcaption className="mt-5 border-t border-border pt-4">
              <span className="block font-serif text-base text-ink">
                {t.name}
              </span>
              <span className="mt-0.5 block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                {t.role}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
