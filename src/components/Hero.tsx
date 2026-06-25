"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { trustItems, bookHref } from "@/lib/content";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Spotlight follows the cursor (pointer devices only).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    };

    el.addEventListener("pointermove", onMove);
    return () => {
      el.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} id="top" className="hero">
      <div className="hero-aurora" aria-hidden="true" />
      <div className="hero-spotlight" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow load-rise" style={{ animationDelay: "40ms" }}>
            Chartered Tax Adviser · Ex-PwC
          </p>
          <h1 className="hero-title load-rise" style={{ animationDelay: "110ms" }}>
            I help UK marketing agencies{" "}
            <span className="hero-accent">keep more of what they earn.</span>
          </h1>
          <p className="hero-sub load-rise" style={{ animationDelay: "210ms" }}>
            As a Chartered Tax Adviser and ex-PwC professional, I help
            founder-led agencies plan tax, extract profit, and build a cleaner,
            more valuable business to one day sell.
          </p>

          <div
            className="hero-actions load-rise"
            style={{ animationDelay: "300ms" }}
          >
            <a href={bookHref} className="hero-btn-primary">
              Book a discovery call
            </a>
            <a href="/services" className="hero-btn-ghost">
              See how it works
            </a>
          </div>

          <div className="hero-chips load-rise" style={{ animationDelay: "400ms" }}>
            {trustItems.map((item) => (
              <div key={item.label} className="hero-chip">
                <span className="hero-chip-val">{item.value}</span>
                <span
                  className="trust-help"
                  tabIndex={0}
                  aria-label={`${item.label}: ${item.description}`}
                >
                  ?
                  <span className="trust-tooltip" role="tooltip">
                    <strong>{item.label}</strong>
                    {item.description}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-portrait load-pop" style={{ animationDelay: "260ms" }}>
          <Image
            src="/simon-jacobs.webp"
            alt="Simon Jacobs, Chartered Tax Adviser"
            fill
            priority
            sizes="(min-width: 1024px) 460px, 88vw"
            className="object-cover object-[center_12%]"
          />
        </div>
      </div>

      <div className="hero-fade" aria-hidden="true" />
    </section>
  );
}
