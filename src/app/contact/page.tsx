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

export default function ContactPage() {
  return (
    <div className="pal-ink">


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


            <div className="ct-formcard">
              <ContactForm />
            </div>
          </div>


          <aside className="ct-rail">

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
              <p className="ct-card-subhead">Who you are talking to</p>
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
