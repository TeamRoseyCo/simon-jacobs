"use client";

import { useEffect, useState } from "react";

export type RotatingItem = { label: string; color: string };
export default function RotatingWord({
  items,
  prefix,
  intervalMs = 2600,
}: {
  items: RotatingItem[];
  prefix?: string;
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
    <span key={index} className="rot-phrase">
      {prefix ? <span className="rot-prefix">{prefix}</span> : null}
      <span className="rot-word" style={{ color: current.color }}>
        {current.label}
      </span>
    </span>
  );
}
