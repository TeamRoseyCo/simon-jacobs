"use client";

import { useEffect } from "react";
import { getAttribution } from "@/lib/attribution";

// Renders nothing. It exists only to make the first-touch capture in
// src/lib/attribution.ts happen on whatever page the visitor lands on, which is
// why it is mounted in the root layout rather than on the homepage: Simon's
// tagged links point at /scorecard and /contact today and could point at a blog
// post tomorrow, and a visitor who lands on a tagged page and never opens a form
// on it must still carry the tags to the form they do open.
//
// The capture itself is idempotent and first-touch-wins, so mounting once per
// full page load is enough. It deliberately does not re-run on client-side
// navigation: a later page has nothing to add, and letting it capture would
// overwrite the real source with an internal one.
export default function AttributionCapture() {
  useEffect(() => {
    getAttribution();
  }, []);
  return null;
}
