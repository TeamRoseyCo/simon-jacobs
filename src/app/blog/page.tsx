import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ConsultCta from "@/components/ConsultCta";
import { getAllPosts, formatPostDate } from "@/lib/posts";
import { postImage } from "@/lib/postImage";
export const metadata: Metadata = {
  title: "Tax & Profit Notes for UK Business Owners",
  description:
    "Plain-English notes on tax, profit extraction, VAT, and building a more valuable business, written for UK business owners.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>

      <section className="blog-hero px-6 pb-16 pt-24 text-center md:px-10 md:pb-20 md:pt-36 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="ap-h1 text-white">
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


      <section className="gutter section-white pb-6 pt-12 text-center md:pt-14">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Stories &amp; guides</p>
          <h2 className="ap-h2 mt-4">
            Notes on tax, profit, and a{" "}
            <span className="em-display text-teal">more valuable business.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-base leading-8 text-muted">
            Short, plain-English reads for owner-managed UK businesses. No
            jargon walls, no filler.
          </p>
        </div>
      </section>


      {featured ? (
        <section className="gutter section-white pb-10">
          <Link
            href={`/blog/${featured.slug}`}
            className="grid overflow-hidden rounded-[14px] border border-border bg-white shadow-[0_14px_40px_rgba(8,34,75,0.06)] transition duration-300 hover:-translate-y-1 md:grid-cols-2"
          >


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
              <h3 className="ap-h2 mt-3 text-ink">
                {featured.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-muted">
                {featured.excerpt}
              </p>
              <span className="mt-6 text-sm font-semibold text-ink">
                Read more ›
              </span>
            </div>
          </Link>
        </section>
      ) : null}


      <section className="gutter section-white pb-16 md:pb-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="blog-card"
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
                <h3 className="ap-h3 mt-2 text-ink">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-7 text-muted">
                  {post.excerpt}
                </p>
                <span className="mt-5 text-sm font-semibold text-ink">
                  Read more ›
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
