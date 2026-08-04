import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/content";

const siteUrl = site.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const routes = [
    "",
    "/chartered-tax-adviser-london-marketing-agencies",
    "/accountants-for-marketing-agencies",
    "/accountants-for-creative-agencies",
    "/accountants-for-advertising-agencies",
    "/accountants-for-digital-marketing-agencies",
    "/services",
    "/about",
    "/results",
    "/blog",
    "/faq",
    "/contact",
    "/scorecard",
    "/privacy",
    "/cookies",
    "/terms",
    "/accessibility",
  ];
  const lowPriority = new Set([
    "/privacy",
    "/cookies",
    "/terms",
    "/accessibility",
  ]);
  // Static routes have no per-page edit timestamp, so stamp a single build-time
  // date. lastmod is a genuine crawl signal Google uses (unlike priority /
  // changefreq, which it largely ignores). Blog posts below carry their own
  // real lastModified.
  const buildDate = new Date();
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : lowPriority.has(route) ? 0.3 : 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...postRoutes];
}
