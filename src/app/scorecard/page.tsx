import type { Metadata } from "next";
import ScorecardForm from "@/components/ScorecardForm";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "The Profit-Rich Scorecard for Agencies",
  description:
    "21 quick questions across the 7 areas where founder-led UK agencies usually leak profit. Takes about 5 minutes; we email your score and a 90-day plan, free.",
  alternates: { canonical: "/scorecard" },
};

export default async function ScorecardPage() {
  const posts = (await getAllPosts()).slice(0, 3).map((p) => ({
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    readingTime: p.readingTime,
  }));
  return (
    <section className="flex min-h-[calc(100svh-76px)] w-full flex-col items-center justify-start px-6 pb-12 pt-14 md:px-10 md:pt-20 lg:px-16">
      <ScorecardForm posts={posts} />
    </section>
  );
}
