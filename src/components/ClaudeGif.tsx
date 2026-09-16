"use client";

import { useState } from "react";
import Image from "next/image";
export default function ClaudeGif() {
  const [show, setShow] = useState(true);

  if (!show) return null;

  return (
    <Image
      src="/claude.webp"
      alt="The Claude AI logo, one of the AI tools you should not rely on for your business's taxes"
      width={112}
      height={56}
      onError={() => setShow(false)}
      loading="lazy"
      decoding="async"
      className="claude-egg pointer-events-none absolute bottom-4 left-4 z-10 block h-14 w-auto select-none lg:left-8"
    />
  );
}
