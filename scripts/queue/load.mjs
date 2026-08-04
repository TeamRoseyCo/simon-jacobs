// Loads queued blog posts into Supabase.
//
// Each post is one JSON file in this directory: the same fields the CMS uses,
// plus `publishAt` (a date, YYYY-MM-DD) and `slot` ("morning" or "evening").
// It goes in with status = 'scheduled', so nothing public can see it until
// /api/cron/publish-post flips it live in that slot. Two posts a day, so a
// date can hold one morning post and one evening post.
//
//   node scripts/queue/load.mjs            # load every post file
//   node scripts/queue/load.mjs --dry      # show what would happen
//   node scripts/queue/load.mjs 20260805     # load specific files
//
// Re-running is safe: it upserts on slug and never touches a post that has
// already gone live.
// RELEVANT FILES: src/app/api/cron/publish-post/route.ts, docs/scheduled-publishing.md

import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
// The cron runs at 07:30 and 18:30 UTC, so each slot is due shortly before its
// run. Two posts a day means two slots, never two posts in one slot.
const SLOT_TIME_UTC = { morning: "06:00:00Z", evening: "17:00:00Z" };

function loadEnv() {
  try {
    const raw = readFileSync(join(ROOT, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    // env may already be in the shell
  }
}

function required(post, field, file) {
  const value = post[field];
  const empty =
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0);
  if (empty) throw new Error(`${file}: missing ${field}`);
  return value;
}

function toRow(post, file) {
  const publishAt = required(post, "publishAt", file);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishAt)) {
    throw new Error(`${file}: publishAt must be YYYY-MM-DD, got ${publishAt}`);
  }
  const slot = post.slot ?? "morning";
  if (!SLOT_TIME_UTC[slot]) {
    throw new Error(`${file}: slot must be "morning" or "evening", got ${slot}`);
  }
  const slug = required(post, "slug", file);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(`${file}: slug is not url-safe: ${slug}`);
  }
  // No em dashes anywhere on this site. Catch them before they ship.
  const prose = JSON.stringify([post.title, post.excerpt, post.body, post.faqs]);
  if (prose.includes("—")) throw new Error(`${file}: contains an em dash`);

  return {
    slug,
    title: required(post, "title", file),
    tag: required(post, "tag", file),
    // `date` is a placeholder. The cron overwrites it with the day it actually
    // publishes, so a post delayed in the queue is never back-dated.
    date: publishAt,
    updated: post.updated ?? null,
    reading_time: required(post, "readingTime", file),
    excerpt: required(post, "excerpt", file),
    body: required(post, "body", file),
    faqs: post.faqs ?? [],
    related: post.related ?? [],
    status: "scheduled",
    publish_at: `${publishAt}T${SLOT_TIME_UTC[slot]}`,
  };
}

// An inline /blog/ link only works if its target is live by the time the linking
// post publishes. A link to a post further down the queue is a 404 for however
// many days sit between them, so a forward link is a hard error. Backward links
// between queued posts are fine and are how the cluster knits itself together.
function findForwardLinks(rows) {
  const when = new Map(rows.map((r) => [r.slug, r.publish_at]));
  const problems = [];
  for (const row of rows) {
    const prose = JSON.stringify([row.body, row.faqs]);
    const targets = new Set(
      [...prose.matchAll(/\]\(\/blog\/([a-z0-9-]+)\)/g)].map((m) => m[1]),
    );
    for (const target of targets) {
      // Not in the queue means it is already live, or a typo the site will 404
      // on either way. Only queue-internal ordering is checkable here.
      if (!when.has(target)) continue;
      if (when.get(target) >= row.publish_at) {
        problems.push(`${row.slug} links forward to ${target} (${row.publish_at} -> ${when.get(target)})`);
      }
    }
  }
  return problems;
}

async function main() {
  loadEnv();
  const args = process.argv.slice(2);
  const dry = args.includes("--dry");
  const patterns = args.filter((a) => !a.startsWith("--"));

  const files = readdirSync(HERE)
    .filter((f) => f.endsWith(".json"))
    .filter((f) => patterns.length === 0 || patterns.some((p) => f.includes(p.replace(/\*/g, ""))))
    .sort();

  if (files.length === 0) throw new Error("No post JSON files matched.");

  const rows = files.map((f) => toRow(JSON.parse(readFileSync(join(HERE, f), "utf8")), f));

  const dates = new Set(rows.map((r) => r.publish_at));
  if (dates.size !== rows.length) {
    throw new Error("Two posts share the same date and slot. Fix the dates or slots.");
  }

  const forward = findForwardLinks(rows);
  if (forward.length > 0) {
    throw new Error(
      `Inline links point at posts that publish later, so they would 404:\n  ${forward.join("\n  ")}`,
    );
  }

  if (dry) {
    for (const r of rows) {
      const when = `${r.publish_at.slice(0, 10)} ${r.publish_at.slice(11, 16)}`;
      console.log(`${when}  ${r.tag.padEnd(18)} ${r.slug}`);
    }
    console.log(`\n${rows.length} posts would be queued. Nothing written.`);
    return;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  const supabase = createClient(url, key, { auth: { persistSession: false } });

  // Never rewrite a post that is already live, even by accident.
  const { data: live } = await supabase
    .from("blog_posts")
    .select("slug")
    .eq("status", "published")
    .in("slug", rows.map((r) => r.slug));
  const liveSlugs = new Set((live ?? []).map((r) => r.slug));
  const toWrite = rows.filter((r) => !liveSlugs.has(r.slug));
  for (const slug of liveSlugs) console.log(`skipped ${slug}, already published`);

  if (toWrite.length === 0) {
    console.log("Nothing to queue.");
    return;
  }

  const { error } = await supabase.from("blog_posts").upsert(toWrite, { onConflict: "slug" });
  if (error) throw new Error(error.message);

  for (const r of toWrite) {
    console.log(`queued ${r.publish_at.slice(0, 10)} ${r.publish_at.slice(11, 16)}  ${r.slug}`);
  }
  console.log(`\n${toWrite.length} posts queued.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
