
const HOST = "srjinternational.co.uk";
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
