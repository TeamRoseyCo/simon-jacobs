import type { MetadataRoute } from "next";
import { posts } from "@/lib/posts";

const siteUrl = "https://srjinternational.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/about",
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
  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route}`,
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
