import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog: tax and profit notes for agency founders",
  description:
    "Plain-English notes on tax, profit extraction, VAT, and building a more valuable agency, written for founder-led UK marketing agencies.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-8 pt-24 text-center md:px-10 md:pt-32 lg:px-16">
        <div className="reveal mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Blog
          </p>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Notes on tax, profit, and building a{" "}
            <span className="em-display text-teal">more valuable agency.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-[600px] text-base leading-8 text-muted">
            Short, plain-English reads for founder-led UK agencies. No jargon
            walls, no filler.
          </p>
        </div>
      </section>

      <section className="section-white mx-auto w-full max-w-7xl px-6 pb-16 md:px-10 md:pb-24 lg:px-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="finance-card reveal flex flex-col p-6 transition duration-300 hover:-translate-y-1"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="flex items-center gap-3 text-xs font-semibold text-accent">
                <span>{post.tag}</span>
                <span className="text-muted">·</span>
                <span className="text-muted">{post.readingTime}</span>
              </div>
              <h2 className="mt-4 font-serif text-2xl font-normal leading-snug text-ink">
                {post.title}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                {post.excerpt}
              </p>
              <span className="mt-5 text-sm font-semibold text-ink">
                Read it →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand heading="Prefer to just ask Simon directly?" />
    </>
  );
}
