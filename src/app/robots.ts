import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
const BLOCKED = ["/admin"];

const AI_AGENTS = [
  "Googlebot",
  "Google-Extended",
  "ClaudeBot",
  "Claude-SearchBot",
  "anthropic-ai",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Bingbot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: BLOCKED },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: BLOCKED,
      })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
