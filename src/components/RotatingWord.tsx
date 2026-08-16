"use client";

import { useEffect, useState } from "react";

export type RotatingItem = { label: string; color: string };

/**
 * Rotates a phrase in a heading, animating the WHOLE phrase rather than just
 * the changing word.
 *
 * Why the whole phrase: animating only the word meant "Stop using" sat dead
 * still while a coloured word blinked beside it, which read as a glitch. Moving
 * the prefix with it makes the change look deliberate.
 *
 * Why it does not shift the layout: the prefix is constant, and the container
 * (`.svc-head`) is a fixed-width, left-aligned box centred on the page. So the
 * phrase always starts at the same x and only ever expands to the right into
 * the box's spare width. The font size never changes, and nothing after it
 * moves because nothing follows it on the same line.
 */
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
    // `key` on the animating span restarts the CSS animation on every change.
    <span key={index} className="rot-phrase">
      {prefix ? <span className="rot-prefix">{prefix}</span> : null}
      <span className="rot-word" style={{ color: current.color }}>
        {current.label}
      </span>
    </span>
  );
}
