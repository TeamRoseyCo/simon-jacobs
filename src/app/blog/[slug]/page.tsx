import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConsultCta from "@/components/ConsultCta";
import { posts, getPost, formatPostDate } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    author: { "@type": "Organization", name: "SRJ International" },
    description: post.excerpt,
  };

  return (
    <>
      <article className="section-white mx-auto w-full max-w-3xl px-6 pb-16 pt-20 md:px-10 md:pb-24 md:pt-32">
        <div className="reveal">
          <Link
            href="/blog"
            className="text-sm font-semibold text-accent transition hover:text-ink"
          >
            ← All posts
          </Link>
          <div className="mt-6 flex items-center gap-3 text-xs font-semibold text-accent">
            <span>{post.tag}</span>
            <span className="text-muted">·</span>
            <span className="text-muted">{formatPostDate(post.date)}</span>
            <span className="text-muted">·</span>
            <span className="text-muted">{post.readingTime}</span>
          </div>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink md:text-5xl">
            {post.title}
          </h1>
        </div>

        <div className="reveal mt-8 flex flex-col gap-5">
          {post.body.map((para, i) => (
            <p key={i} className="text-base leading-8 text-muted">
              {para}
            </p>
          ))}
        </div>
      </article>

      <ConsultCta
        heading="Want this applied to your agency?"
        sub="Book a short discovery call and we will look at your actual numbers."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
    </>
  );
}
