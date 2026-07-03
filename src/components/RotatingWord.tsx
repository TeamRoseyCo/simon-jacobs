"use client";

import { useEffect, useState } from "react";

export type RotatingItem = { label: string; color: string };

// Cycles through a short list of words in place (e.g. the AI tools people
// wrongly turn to for tax advice), fading between them on a fixed interval.
// Each word carries its own colour (roughly matching its brand); the
// surrounding heading's font size never changes, only the word and its colour.
export default function RotatingWord({
  items,
  intervalMs = 2200,
}: {
  items: RotatingItem[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [items.length, intervalMs]);

  const current = items[index];
  // Fixed to the longest label's width (in ch, so it scales with font size)
  // and centred within that slot, so the rest of the sentence never shifts
  // as shorter/longer words rotate through.
  const widthCh = Math.max(...items.map((i) => i.label.length)) + 1;

  return (
    <span
      className="inline-block text-center align-baseline"
      style={{ width: `${widthCh}ch` }}
    >
      <span
        key={index}
        className="load-rise inline-block"
        style={{ animationDuration: "420ms", color: current.color }}
      >
        {current.label}
      </span>
    </span>
  );
}
