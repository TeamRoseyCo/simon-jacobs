import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

// We WANT AI crawlers to read the site: being cited by Gemini, Claude, ChatGPT,
// and Perplexity is the whole AEO strategy. Every rule allows the full site
// except /admin. The named AI user-agents are listed explicitly (on top of the
// "*" catch-all) so intent is unambiguous and a future "*" tweak can't silently
// lock them out. Google-Extended feeds Gemini / Vertex; Googlebot also powers
// Google AI Overviews; ClaudeBot + Claude-SearchBot are Anthropic's crawler and
// search index; GPTBot / OAI-SearchBot / PerplexityBot cover the rest.
//
// /font-lab is a temporary internal type test, not a page for clients or for an
// AI answer to cite. It carries a noindex tag of its own; this is the belt to
// that pair of braces. Remove both when the route goes.
const BLOCKED = ["/admin", "/font-lab"];

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
