import { testimonials, type Testimonial } from "@/lib/content";

// Emphasise the payoff phrase inside a paragraph. `highlight` has to be an exact
// substring or it is ignored, so a copy edit to a quote can never produce
// mangled output, it just loses the emphasis.
function emphasise(text: string, highlight?: string) {
  if (!highlight) return text;
  const at = text.indexOf(highlight);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <em className="em-display not-italic text-teal">{highlight}</em>
      {text.slice(at + highlight.length)}
    </>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={`h-4 w-4 ${i < rating ? "text-teal" : "text-border"}`}
          fill="currentColor"
        >
          <path d="M10 1.6l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.6 7.7l5.8-.8z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ t, index }: { t: Testimonial; index: number }) {
  const last = t.quote.length - 1;
  return (
    <figure
      className="testimonial-card reveal flex h-full flex-col rounded-[18px] border border-border bg-white p-7 md:p-8"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Stars left, quote mark right, on one row in normal flow. The quote mark
          used to be absolutely positioned in the corner, where it overlapped the
          stars on a narrow card. */}
      <div className="flex items-start justify-between gap-4">
        {t.rating ? <Stars rating={t.rating} /> : <span />}
        <span
          aria-hidden="true"
          className="em-display -mt-2 select-none text-5xl leading-none text-teal opacity-20"
        >
          &rdquo;
        </span>
      </div>
      <blockquote className="mt-4 flex-1 space-y-3 text-[16px] leading-8 text-ink">
        {t.quote.map((para, i) => (
          <p key={para}>
            {i === 0 && <>&ldquo;</>}
            {emphasise(para, t.highlight)}
            {i === last && <>&rdquo;</>}
          </p>
        ))}
      </blockquote>
      <figcaption className="mt-7">
        <span className="block font-serif text-[17px] font-bold text-ink">
          {t.name}
        </span>
        <span className="mt-1 block text-[13px] leading-5 text-muted">
          {t.role}
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="section-tinted py-16 md:py-24 gutter-bleed">
      <div className="mx-auto w-full max-w-7xl">
        <div className="reveal mx-auto max-w-3xl text-center">
          <h2 className="font-serif text-4xl font-normal leading-tight md:text-5xl">
            What clients say about{" "}
            <span className="em-display text-teal">working with us.</span>
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-muted">
            Agency founders, and business owners who came to Simon for the same
            reason: the tax was being filed, not planned.
          </p>
        </div>

        {/* Three across, so six quotes fill two clean rows. */}
        <div className="mt-10 grid gap-5 text-left md:mt-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, index) => (
            <Card key={t.name} t={t} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
