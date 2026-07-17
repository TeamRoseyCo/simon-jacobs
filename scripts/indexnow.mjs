// scripts/indexnow.mjs
// Pings IndexNow (Bing, Yandex, Seznam, Naver) with every URL in the live
// sitemap so new/updated pages get picked up fast. AI search engines
// (ChatGPT, Copilot, Perplexity) read the Bing index, so this is the quickest
// route from "published" to "discoverable" without waiting for an organic crawl.
//
// Run after a deploy has gone live (the key file must be reachable first):
//   npm run indexnow
//
// The key file lives at public/<KEY>.txt and is served at
// https://srjinternational.co.uk/<KEY>.txt. IndexNow fetches it to confirm we
// own the host before accepting the submitted URLs.
// RELEVANT FILES: public/3c75b0b8bc9f45c8a6e5920b8fda2d67.txt, src/app/sitemap.ts

const HOST = "srjinternational.co.uk";
// Key issued by Bing Webmaster Tools (2026-07-17). Any valid key hosted at
// KEY_LOCATION works across all IndexNow engines; using Bing's own key keeps it
// aligned with what Bing expects.
const KEY = "3c75b0b8bc9f45c8a6e5920b8fda2d67";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function getSitemapUrls() {
  const res = await fetch(SITEMAP, { headers: { "User-Agent": "indexnow-submitter" } });
  if (!res.ok) throw new Error(`Could not fetch sitemap (${res.status})`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  return [...new Set(urls)];
}

async function main() {
  const urlList = await getSitemapUrls();
  if (urlList.length === 0) throw new Error("No URLs found in sitemap");

  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  // IndexNow returns 200 (accepted) or 202 (accepted, pending verification).
  // Other codes mean the key file isn't reachable yet or the payload is off.
  if (res.status === 200 || res.status === 202) {
    console.log(`Done: HTTP ${res.status}. Submitted:\n` + urlList.map((u) => `  ${u}`).join("\n"));
  } else {
    const body = await res.text().catch(() => "");
    throw new Error(`IndexNow rejected the submission: HTTP ${res.status}\n${body}`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
