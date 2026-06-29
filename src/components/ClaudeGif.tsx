"use client";

import { useEffect, useState } from "react";

// Easter egg: a little Claude gif pops in next to the "Stop using Claude for
// taxes" line for roughly 1 in 12 visitors. The decision is made once per
// browser session, so it doesn't flicker on every navigation. If the gif asset
// is missing it silently renders nothing (no broken-image icon).
export default function ClaudeGif() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const KEY = "claude-egg";
    let decision = sessionStorage.getItem(KEY);
    if (decision === null) {
      decision = Math.random() < 0.08 ? "1" : "0"; // ~1 in 12 sessions, rare
      sessionStorage.setItem(KEY, decision);
    }
    if (decision === "1") setShow(true);
  }, []);

  if (!show) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/claude.gif"
      alt=""
      aria-hidden="true"
      onError={() => setShow(false)}
      className="claude-egg pointer-events-none absolute bottom-4 left-4 z-10 block h-14 w-auto select-none lg:left-8"
    />
  );
}
