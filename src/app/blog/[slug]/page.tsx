import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ConsultCta from "@/components/ConsultCta";
import { posts, getPost, formatPostDate } from "@/lib/posts";
import { site } from "@/lib/content";

const siteUrl = site.url;
const OG_IMAGE = "/simon-jacobs.jpg";

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
      url: `${siteUrl}/blog/${post.slug}`,
      publishedTime: post.date,
      authors: ["Simon Jacobs"],
      images: [{ url: OG_IMAGE }],
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

  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    image: `${siteUrl}${OG_IMAGE}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    author: {
      "@type": "Person",
      name: "Simon Jacobs",
      jobTitle: "Chartered Tax Adviser",
      url: `${siteUrl}/about`,
      sameAs: [site.linkedin, site.instagram],
    },
    publisher: {
      "@type": "Organization",
      name: "SRJ International",
      "@id": `${siteUrl}/#organization`,
      logo: { "@type": "ImageObject", url: `${siteUrl}${OG_IMAGE}` },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  );
}
