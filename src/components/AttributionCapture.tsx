"use client";

import { useEffect } from "react";
import { getAttribution } from "@/lib/attribution";
export default function AttributionCapture() {
  useEffect(() => {
    getAttribution();
  }, []);
  return null;
}
