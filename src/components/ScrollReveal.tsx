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

    const reveal = (el: HTMLElement) => {
      // Preserve any staggered delay authored as animation-delay.
      if (el.style.animationDelay) {
        el.style.transitionDelay = el.style.animationDelay;
        el.style.animationDelay = "";
      }
      el.classList.add("is-visible");
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
        .forEach((el) => el.classList.add("is-visible"));
      return;
    }

    // Group reveals: when a [data-reveal-group] enters, every .reveal inside it
    // cascades in sequence (staggered) instead of each waiting for its own scroll.
    const groups = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal-group]"),
    );
    const grouped = new Set<HTMLElement>();
    groups.forEach((g) =>
      g
        .querySelectorAll<HTMLElement>(".reveal")
        .forEach((c) => grouped.add(c)),
    );

    const revealGroup = (g: HTMLElement) => {
      const children = Array.from(
        g.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"),
      );
      children.forEach((c, i) => {
        if (!c.style.animationDelay) c.style.animationDelay = `${i * 110}ms`;
        reveal(c);
      });
    };

    const groupObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          revealGroup(entry.target as HTMLElement);
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0.1 },
    );

    groups.forEach((g) => {
      if (g.getBoundingClientRect().top < window.innerHeight) revealGroup(g);
      else groupObserver.observe(g);
    });

    // Individual reveals: everything not inside a reveal group.
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"),
    ).filter((el) => !grouped.has(el));

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          obs.unobserve(entry.target);
        });
      },
      // Trigger later: the element must climb ~28% up from the bottom before it
      // animates, so it reveals while you're looking at it, not before.
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
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
      groupObserver.disconnect();
      window.clearTimeout(failSafe);
    };
  }, [pathname]);

  return null;
}
