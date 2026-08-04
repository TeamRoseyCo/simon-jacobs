import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ConsultCta from "@/components/ConsultCta";
import FaqAccordion from "@/components/FaqAccordion";
import { getAllPosts, getPublishedPost, formatPostDate } from "@/lib/posts";
import { site } from "@/lib/content";
import { postImage } from "@/lib/postImage";

const siteUrl = site.url;
const OG_IMAGE = "/simon-jacobs.jpg";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
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
      modifiedTime: post.updated ?? post.date,
      authors: ["Simon Jacobs"],
      images: [{ url: OG_IMAGE }],
    },
  };
}

// Lightweight inline renderer: turns [label](href) into links inside a
// paragraph, leaving the rest as plain text. Internal hrefs (starting with "/")
// use next/link; anything else is treated as external.
function renderInline(text: string, keyBase: string) {
  const parts: React.ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    if (href.startsWith("/")) {
      parts.push(
        <Link
          key={`${keyBase}-l${i}`}
          href={href}
          className="font-semibold text-accent underline decoration-border underline-offset-2 transition hover:text-ink"
        >
          {label}
        </Link>,
      );
    } else {
      parts.push(
        <a
          key={`${keyBase}-l${i}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-accent underline decoration-border underline-offset-2 transition hover:text-ink"
        >
          {label}
        </a>,
      );
    }
    lastIndex = linkRe.lastIndex;
    i += 1;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();

  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const wordCount = post.body.join(" ").split(/\s+/).filter(Boolean).length;
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    wordCount,
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

  const faqJsonLd =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }
      : null;

  const related = (
    await Promise.all((post.related ?? []).map((s) => getPublishedPost(s)))
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <article className="section-white mx-auto w-full max-w-3xl px-6 pb-16 pt-20 md:px-10 md:pb-24 md:pt-32 lg:px-16">
        <div className="reveal">
          <Link
            href="/blog"
            className="text-sm font-semibold text-accent transition hover:text-ink"
          >
            ← All posts
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-semibold text-accent">
            <span>{post.tag}</span>
            <span className="text-muted">·</span>
            <span className="text-muted">{formatPostDate(post.date)}</span>
            <span className="text-muted">·</span>
            <span className="text-muted">{post.readingTime}</span>
            {post.updated && (
              <>
                <span className="text-muted">·</span>
                <span className="text-muted">
                  Updated {formatPostDate(post.updated)}
                </span>
              </>
            )}
          </div>
          <h1 className="mt-4 font-serif text-4xl font-normal leading-tight text-ink md:text-5xl">
            {post.title}
          </h1>
          {/* The post's own card. Real dimensions, not `fill`, so the height
              comes from the image itself in every browser. */}
          <Image
            src={postImage(post.slug)}
            alt={post.title}
            width={2400}
            height={1500}
            sizes="(min-width: 768px) 720px, 100vw"
            className="mt-8 h-auto w-full rounded-[14px]"
            priority
          />
        </div>

        <div className="reveal mt-8 flex flex-col gap-5">
          {post.body.map((block, i) => {
            if (block.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="mt-6 font-serif text-2xl font-normal leading-snug text-ink md:text-3xl"
                >
                  {block.slice(3)}
                </h2>
              );
            }
            return (
              <p key={i} className="text-base leading-8 text-muted">
                {renderInline(block, `p${i}`)}
              </p>
            );
          })}
        </div>

        {post.faqs && post.faqs.length > 0 && (
          <div className="reveal mt-14">
            <h2 className="font-serif text-2xl font-normal leading-snug text-ink md:text-3xl">
              Common questions
            </h2>
            <div className="mt-4">
              <FaqAccordion items={post.faqs} />
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="reveal mt-14 border-t border-border pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
              Related reading
            </p>
            <ul className="mt-5 grid gap-5 sm:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/blog/${r.slug}`}
                    className="finance-card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1"
                  >
                    <Image
                      src={postImage(r.slug)}
                      alt={r.title}
                      width={2400}
                      height={1500}
                      sizes="(min-width: 640px) 240px, 90vw"
                      className="h-auto w-full transition duration-500 group-hover:scale-105"
                    />
                    <span className="flex-1 p-4 font-serif text-base leading-snug text-ink">
                      {r.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
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
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </>
  );
}
