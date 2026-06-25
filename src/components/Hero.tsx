"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { trustItems, bookHref } from "@/lib/content";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Spotlight eases toward the cursor for a smooth, fluid trail (pointer only).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let tx = 72;
    let ty = 26;
    let cx = 72;
    let cy = 26;
    let raf = 0;
    let running = false;

    const tick = () => {
      cx += (tx - cx) * 0.1;
      cy += (ty - cy) * 0.1;
      el.style.setProperty("--mx", `${cx.toFixed(2)}%`);
      el.style.setProperty("--my", `${cy.toFixed(2)}%`);
      if (Math.abs(tx - cx) > 0.05 || Math.abs(ty - cy) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
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
          <h1 className="hero-title load-rise" style={{ animationDelay: "60ms" }}>
            I help UK marketing agencies{" "}
            <span className="hero-accent">
              keep more <span className="text-white">of what</span> they earn.
            </span>
          </h1>
          <p className="hero-sub load-rise" style={{ animationDelay: "170ms" }}>
            Chartered Tax Adviser &amp; ex-PwC professional, I help agencies
            extract profit, plan tax, and build a cleaner, more valuable business
            to one day sell.
          </p>

          <div
            className="hero-actions load-rise"
            style={{ animationDelay: "280ms" }}
          >
            <a href={bookHref} className="hero-btn-primary">
              I&apos;m an agency founder
            </a>
          </div>
        </div>

        <div className="hero-right load-pop" style={{ animationDelay: "240ms" }}>
          <div className="hero-expertise">
            {trustItems.map((item) => (
              <span key={item.label} className="hero-exp">
                <span className="hero-exp-val">{item.value}</span>
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
              </span>
            ))}
          </div>

          <div className="hero-portrait">
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
      </div>

      <div className="hero-fade" aria-hidden="true" />
    </section>
  );
}
