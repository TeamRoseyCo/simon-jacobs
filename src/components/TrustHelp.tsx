"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";

// A help "?" with a tooltip rendered in a portal at the document root, so it
// sits above the sticky header and is never clipped by the hero's overflow.
export default function TrustHelp({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(
    null,
  );

  function show() {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setCoords({ left: r.left + r.width / 2, top: r.top });
  }

  function hide() {
    setCoords(null);
  }

  return (
    <span
      ref={ref}
      className="trust-help"
      tabIndex={0}
      aria-label={`${label}: ${description}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      ?
      {coords && typeof document !== "undefined"
        ? createPortal(
            <span
              className="trust-tooltip-fixed"
              role="tooltip"
              style={{ left: coords.left, top: coords.top }}
            >
              <strong>{label}</strong>
              {description}
            </span>,
            document.body,
          )
        : null}
    </span>
  );
}
