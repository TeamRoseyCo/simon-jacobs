import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { trustItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact: Book a discovery call",
  description:
    "Book a short discovery call with SRJ International to see where your business's profit is leaking and whether we can help. No prep needed.",
  alternates: { canonical: "/contact" },
};

const steps = [
  "A short fit call to understand where the business is today.",
  "We talk through what feels messy: tax, profit, director pay, growth.",
  "You leave knowing whether we can help. No pressure either way.",
];

export default function ContactPage() {
  return (
    // Same `pal-ink` scheme as the homepage. Without it this page kept the old
    // cool blue-white and teal accent, so arriving here from the homepage read
    // as a different site.
    <div className="pal-ink">
      {/* The old page ran the form down a 1.05fr column with a photo in the
          0.9fr column beside it, so the right-hand side was empty for most of
          the scroll and the process steps and credentials sat orphaned in a
          second section underneath. Everything that was below the fold is now
          in the right rail, which fills the dead space and shortens the page. */}
      {/* .gutter caps width at 1240px and centres, so putting the grey on it
          left white margins down both edges. The ground goes on the full-width
          wrapper and the gutter moves inside it. */}
      <section className="ct-wrap">
        <div className="ct-grid gutter">
          <div className="ct-main">
            <h1 className="ap-h2">
              Find out what your business{" "}
              <span className="em-display text-teal">could be keeping.</span>
            </h1>
            <p className="ct-lede">
              The first step is a short discovery call. Bring the financial
              questions you have been putting off. That is exactly what it is
              for.
            </p>

            {/* ContactForm already renders its own `.finance-card`, so this is
                a plain container. Wrapping it in a second card gave a card
                inside a card. The card styling is applied to the form itself
                further down in site.css. */}
            <div className="ct-formcard">
              <ContactForm />
            </div>
          </div>

          {/* Sticky so it stays useful while the form scrolls. */}
          <aside className="ct-rail">
            {/* Dark panel: the page's value anchor, and the reason the white
                form card reads as lifted rather than flat. The cut-out replaces
                the old studio shot, whose flat grey backdrop inside a rounded
                rectangle made the brightest shape on the page one carrying no
                information. */}
            <div className="ct-card ct-person">
              <div className="ct-person-photo">
                <Image
                  src="/simon-jacobs-cutout.webp"
                  alt="Simon Jacobs, Chartered Tax Adviser at SRJ International"
                  fill
                  sizes="(min-width: 1024px) 220px, 40vw"
                  className="object-contain object-bottom"
                />
              </div>
              <div className="ct-person-copy">
                <p className="ct-person-name">Simon Jacobs</p>
                <p className="ct-person-role">
                  Chartered Tax Adviser. You speak to him, not an account
                  manager.
                </p>
              </div>
            </div>

            <div className="ct-card">
              <p className="ct-card-head">What happens next</p>
              <ol className="ct-steps">
                {steps.map((step, index) => (
                  <li key={step}>
                    <span className="ct-step-num">{`0${index + 1}`}</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="ct-card">
              <p className="ct-card-head">Who you are talking to</p>
              <dl className="ct-trust">
                {trustItems.map((item) => (
                  <div key={item.label}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
