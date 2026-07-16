"use client";

import { useState } from "react";

// A little Claude gif tucked at the bottom of the "Stop using Claude for taxes"
// section. Always shown. If the gif asset is missing it silently renders
// nothing (no broken-image icon).
export default function ClaudeGif() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/claude.webp"
      alt="The Claude AI logo, one of the AI tools you should not rely on for your agency's taxes"
      onError={() => setShow(false)}
      className="claude-egg pointer-events-none absolute bottom-4 left-4 z-10 block h-14 w-auto select-none lg:left-8"
    />
  );
}
