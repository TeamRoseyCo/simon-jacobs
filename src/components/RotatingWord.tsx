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

  return (
    <span
      key={index}
      className="load-rise inline-block"
      style={{ animationDuration: "420ms", color: current.color }}
    >
      {current.label}
    </span>
  );
}
