import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ConsultCta from "@/components/ConsultCta";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { postImage } from "@/lib/postImage";

// The image lookup moved to src/lib/postImage.ts so the home page and the
// related-reading cards resolve thumbnails the same way this index does.
//
// The fallback is an existing brand photo rather than a generated card. Eleven
// posts share it, which is repetitive but neutral: a repeated real photo reads
// as a house style, a broken image reads as a dead site.
export const metadata: Metadata = {
  title: "Tax & Profit Notes for Agency Founders",
  description:
    "Plain-English notes on tax, profit extraction, VAT, and building a more valuable agency, written for founder-led UK marketing agencies.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      {/* Hero banner */}
      <section className="blog-hero px-6 pb-16 pt-24 text-center md:px-10 md:pb-20 md:pt-36 lg:px-16">
        <div className="reveal mx-auto max-w-3xl">
          <h1 className="font-serif text-5xl font-normal leading-tight text-white md:text-6xl">
            Blog
          </h1>
          <p className="mt-4 text-sm font-medium text-white/60">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>{" "}
            / Blog
          </p>
        </div>
      </section>

      {/* Section intro */}
      <section className="gutter section-white pb-6 pt-12 text-center md:pt-14">
        <div className="reveal mx-auto max-w-3xl">
          <p className="eyebrow">Stories &amp; guides</p>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-tight md:text-5xl">
            Notes on tax, profit, and a{" "}
            <span className="em-display text-teal">more valuable agency.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-base leading-8 text-muted">
            Short, plain-English reads for founder-led UK agencies. No jargon
            walls, no filler.
          </p>
        </div>
      </section>

      {/* Featured (latest) post */}
      {featured ? (
        <section className="gutter section-white pb-10">
          <Link
            href={`/blog/${featured.slug}`}
            className="reveal grid overflow-hidden rounded-[14px] border border-border bg-white shadow-[0_14px_40px_rgba(8,34,75,0.06)] transition duration-300 hover:-translate-y-1 md:grid-cols-2"
          >
            {/* The cell is given the thumbnails' own 8:5 shape, so the whole
                card fills it edge to edge: nothing cropped, and no letterbox
                bars either. self-start keeps it at 8:5 rather than being
                stretched taller by the text column, which is what used to crop
                the headline off. */}
            {/* Real dimensions rather than `fill`: the intrinsic 8:5 gives the
                element its height in every browser. With `fill` inside an
                aspect-ratio box, Safari resolves the height to 0 for a flex
                item and the card renders with no image at all. */}
            <Image
              src={postImage(featured.slug)}
              alt={featured.title}
              width={2400}
              height={1500}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full self-start bg-[#F2EFE9]"
              priority
            />
            <div className="flex flex-col justify-center p-7 md:p-10">
              <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                {formatPostDate(featured.date)} · {featured.readingTime}
              </span>
              <h3 className="mt-3 font-serif text-3xl font-normal leading-tight text-ink md:text-4xl">
                {featured.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-muted">
                {featured.excerpt}
              </p>
              <span className="mt-6 text-sm font-semibold text-ink">
                Read more →
              </span>
            </div>
          </Link>
        </section>
      ) : null}

      {/* Grid */}
      <section className="gutter section-white pb-16 md:pb-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card reveal"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <Image
                src={postImage(post.slug)}
                alt={post.title}
                width={2400}
                height={1500}
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="h-auto w-full bg-[#F2EFE9]"
              />
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                  {formatPostDate(post.date)} · {post.readingTime}
                </span>
                <h3 className="mt-2 font-serif text-xl font-normal leading-snug text-ink">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                  {post.excerpt}
                </p>
                <span className="mt-5 text-sm font-semibold text-ink">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <ConsultCta heading="Prefer to just ask us directly?" />
    </>
  );
}
