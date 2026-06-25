import type { MetadataRoute } from "next";

const siteUrl = "https://simonjacobs.co.uk";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/about", "/faq", "/contact"];
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
