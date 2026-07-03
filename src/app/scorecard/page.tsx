import type { Metadata } from "next";
import ScorecardForm from "@/components/ScorecardForm";

export const metadata: Metadata = {
  title: "The Profit-Rich Scorecard, find your agency's profit leaks",
  description:
    "21 quick questions across the 7 areas where founder-led UK agencies usually leak profit. Takes about 5 minutes; we email your score and a 90-day plan, free.",
  alternates: { canonical: "/scorecard" },
};

export default function ScorecardPage() {
  return (
    <section className="flex min-h-[calc(100svh-76px)] w-full flex-col items-center justify-start px-6 pb-12 pt-14 md:pt-20">
      <ScorecardForm />
    </section>
  );
}
