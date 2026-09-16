"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
export default function AboutJourney({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const lutRef = useRef<{ y: number; s: number }[]>([]);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [d, setD] = useState("");
  const [len, setLen] = useState(0);
  const [progress, setProgress] = useState(0);
  const [ball, setBall] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const measure = () => {
      const W = wrap.offsetWidth;
      const H = wrap.offsetHeight;
      setDims({ w: W, h: H });

      if (reduce || window.innerWidth < 768) {
        setEnabled(false);
        setD("");
        return;
      }

      const cs = getComputedStyle(wrap);
      const padL = parseFloat(cs.paddingLeft) || 0;
      const padR = parseFloat(cs.paddingRight) || 0;
      const wr = wrap.getBoundingClientRect();
      const steps = Array.from(
        inner.querySelectorAll<HTMLElement>(".aj-step"),
      );
      if (steps.length < 2) return;

      const geo = steps.map((el) => {
        const p = el.querySelector("p") ?? el;
        const pr = p.getBoundingClientRect();
        const left = pr.left - wr.left;
        const right = pr.right - wr.left;
        const side = (left + right) / 2 < W / 2 ? "left" : "right";
        const gutterX =
          side === "left" ? (right + (W - padR)) / 2 : (padL + left) / 2;
        return {
          gutterX,
          centerY: el.offsetTop + el.offsetHeight / 2,
          top: el.offsetTop,
          bottom: el.offsetTop + el.offsetHeight,
        };
      });

      const [a, b] = geo;
      const dy = b.centerY - a.centerY;
      const startY = a.top;
      const endY = Math.min(H, b.bottom + 4);
      setD(
        [
          `M ${a.gutterX} ${startY}`,
          `C ${a.gutterX} ${a.centerY + dy * 0.45}, ${b.gutterX} ${b.centerY - dy * 0.45}, ${b.gutterX} ${b.centerY}`,
          `C ${b.gutterX} ${b.centerY + dy * 0.18}, ${b.gutterX} ${endY}, ${b.gutterX} ${endY}`,
        ].join(" "),
      );
      setEnabled(true);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrap);
    inner.querySelectorAll(".aj-step").forEach((e) => ro.observe(e));
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  useEffect(() => {
    const path = pathRef.current;
    if (!path || !d) {
      setLen(0);
      lutRef.current = [];
      return;
    }
    const L = path.getTotalLength();
    setLen(L);
    const N = 200;
    const lut: { y: number; s: number }[] = [];
    for (let i = 0; i <= N; i++) {
      const s = i / N;
      const pt = path.getPointAtLength(s * L);
      lut.push({ y: pt.y, s });
    }
    lutRef.current = lut;
  }, [d]);
  useEffect(() => {
    const wrap = wrapRef.current;
    const path = pathRef.current;
    if (!enabled || !wrap || !path || !len) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const lut = lutRef.current;
      if (!lut.length) return;
      const r = wrap.getBoundingClientRect();
      const localY = window.innerHeight * 0.5 - r.top;
      const yTop = lut[0].y;
      const yBot = lut[lut.length - 1].y;
      const y = Math.max(yTop, Math.min(yBot, localY));
      let lo = 0;
      let hi = lut.length - 1;
      while (hi - lo > 1) {
        const mid = (lo + hi) >> 1;
        if (lut[mid].y < y) lo = mid;
        else hi = mid;
      }
      const span = lut[hi].y - lut[lo].y || 1;
      const t = (y - lut[lo].y) / span;
      const s = lut[lo].s + t * (lut[hi].s - lut[lo].s);
      setProgress(s);
      const pt = path.getPointAtLength(s * len);
      setBall({ x: pt.x, y: pt.y });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled, len]);

  const { w, h } = dims;

  return (
    <div
      ref={wrapRef}
      className="about-journey relative mx-auto w-full max-w-5xl px-6 pb-16 pt-2 md:px-10 lg:px-16"
    >
      {enabled && d ? (
        <>
          <svg
            className="about-journey-svg"
            width={w || 1}
            height={h || 1}
            viewBox={`0 0 ${w || 1} ${h || 1}`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d={d} className="aj-base" />
            <path
              ref={pathRef}
              d={d}
              className="aj-fill"
              style={{
                strokeDasharray: len,
                strokeDashoffset: len * (1 - progress),
              }}
            />
          </svg>
          <span
            className="aj-ball"
            aria-hidden="true"
            style={{
              transform: `translate(${ball.x}px, ${ball.y}px)`,
              opacity: len ? 1 : 0,
            }}
          />
        </>
      ) : null}
      <div ref={innerRef} className="relative z-10 grid gap-16 md:gap-24">
        {children}
      </div>
    </div>
  );
}
