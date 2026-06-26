"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Progressive-enhancement scroll animations.
 * Marks <html data-reveal> so CSS hides `.reveal` elements, then fades + lifts
 * each one into place as it enters the viewport. Re-scans on route change.
 * Falls back to fully-visible content when JS is off or motion is reduced.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    root.setAttribute("data-reveal", "");

    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"),
    );

    if (reduceMotion || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const reveal = (el: HTMLElement) => {
      // Preserve any staggered delay authored as animation-delay.
      if (el.style.animationDelay) {
        el.style.transitionDelay = el.style.animationDelay;
        el.style.animationDelay = "";
      }
      el.classList.add("is-visible");
    };

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    els.forEach((el) => {
      // Anything already on screen at mount shows immediately (never stuck
      // hidden); everything below the fold animates in on scroll.
      if (el.getBoundingClientRect().top < window.innerHeight) {
        reveal(el);
      } else {
        observer.observe(el);
      }
    });

    // Final safety net: never leave an on-screen reveal element hidden.
    const failSafe = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
        .forEach((el) => {
          if (el.getBoundingClientRect().top < window.innerHeight) reveal(el);
        });
    }, 1500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failSafe);
    };
  }, [pathname]);

  return null;
}
