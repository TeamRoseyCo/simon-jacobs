import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

// We WANT AI crawlers to read the site: being cited by Gemini, Claude, ChatGPT,
// and Perplexity is the whole AEO strategy. Every rule allows the full site
// except /admin. The named AI user-agents are listed explicitly (on top of the
// "*" catch-all) so intent is unambiguous and a future "*" tweak can't silently
// lock them out. Google-Extended feeds Gemini / Vertex; Googlebot also powers
// Google AI Overviews; ClaudeBot + Claude-SearchBot are Anthropic's crawler and
// search index; GPTBot / OAI-SearchBot / PerplexityBot cover the rest.
const AI_AGENTS = [
  "Googlebot",
  "Google-Extended",
  "ClaudeBot",
  "Claude-Web",
  "Claude-SearchBot",
  "anthropic-ai",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "Bingbot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/admin" },
      ...AI_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: "/admin",
      })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
