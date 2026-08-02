/**
 * Checks that every published post has a card, and tells you exactly what to
 * run for the ones that do not.
 *
 * This is the step that keeps the generator inside the posting process rather
 * than beside it. Publishing happens in the CMS at /admin/blog, which knows
 * nothing about scripts/thumbs, so without a check a post goes live with the
 * fallback photo and nobody notices until the blog index looks repetitive.
 *
 * Reads the live post list straight from Supabase (same table the site reads),
 * so it is always checking what is actually published, not a local copy.
 *
 * Usage:
 *   npm run thumbs:audit
 *
 * Exit code is 1 when something is missing, so it can gate a release step.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { cards } from "./cards.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.join(here, "..", "..");

// .env.local is not loaded for a plain node script, so read it directly rather
// than adding dotenv for one file.
function env(name) {
  if (process.env[name]) return process.env[name];
  try {
    const raw = fs.readFileSync(path.join(repo, ".env.local"), "utf8");
    const line = raw
      .split("\n")
      .find((l) => l.startsWith(`${name}=`));
    if (!line) return undefined;
    return line.slice(name.length + 1).trim().replace(/^["']|["']$/g, "");
  } catch {
    return undefined;
  }
}

const url = env("NEXT_PUBLIC_SUPABASE_URL");
const key = env("SUPABASE_SERVICE_ROLE_KEY");

if (!url || !key) {
  console.error(
    "thumbs:audit needs NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY\n" +
      "(both live in .env.local).",
  );
  process.exit(2);
}

const res = await fetch(`${url}/rest/v1/blog_posts?select=slug,title,date&order=date.desc`, {
  headers: { apikey: key, Authorization: `Bearer ${key}` },
});
if (!res.ok) {
  console.error(`Supabase returned ${res.status}: ${await res.text()}`);
  process.exit(2);
}
const posts = await res.json();

const carded = new Set(cards.map((c) => c.slug));
const imageDir = path.join(repo, "public", "blog");
const imaged = new Set(
  fs
    .readdirSync(imageDir)
    .filter((f) => f.endsWith(".webp"))
    .map((f) => f.replace(/\.webp$/, "")),
);

const noCard = posts.filter((p) => !carded.has(p.slug));
const noImage = posts.filter((p) => carded.has(p.slug) && !imaged.has(p.slug));
// A card whose post no longer exists: dead weight, and it silently renders on
// every full run.
const orphans = [...carded].filter(
  (s) => s !== "_default" && !posts.some((p) => p.slug === s),
);

console.log(`${posts.length} published posts, ${cards.length - 1} cards, ${imaged.size} images\n`);

if (noCard.length) {
  console.log(`${noCard.length} post(s) with NO CARD COPY. Add to scripts/thumbs/cards.mjs:\n`);
  for (const p of noCard) {
    console.log(`  {`);
    console.log(`    slug: ${JSON.stringify(p.slug)},`);
    console.log(`    hook: "TODO 4 to 7 words, from the post's own title or excerpt",`);
    console.log(`    highlight: "TODO exact substring of hook",`);
    console.log(`  },   // ${p.title}`);
  }
  console.log("");
}

if (noImage.length) {
  console.log(`${noImage.length} card(s) never rendered. Run:\n`);
  console.log(
    `  npm run thumbs:render:tweet -- ${noImage.map((p) => p.slug).join(" ")}`,
  );
  console.log(`  npm run thumbs:webp -- ${noImage.map((p) => p.slug).join(" ")}\n`);
}

if (orphans.length) {
  console.log(`${orphans.length} card(s) for posts that no longer exist: ${orphans.join(", ")}\n`);
}

if (!noCard.length && !noImage.length) {
  console.log("Every published post has a card and an image. Nothing to do.");
  process.exit(0);
}

process.exit(1);
