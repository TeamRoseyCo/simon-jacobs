/**
 * Converts scripts/thumbs/out/<slug>.png to public/blog/<slug>.webp at
 * 2400x1500, and reports each file size. Target is under ~250KB per card.
 *
 * Usage:
 *   node scripts/thumbs/to-webp.mjs                     all rendered cards
 *   node scripts/thumbs/to-webp.mjs the-60-percent-tax-trap [more slugs...]
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { cards } from "./cards.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "out");
const publicBlog = path.join(here, "..", "..", "public", "blog");

const WIDTH = 2400;
const HEIGHT = 1500;

// The blog images already on the site are 57 to 62KB at 2400x1500, so these
// are tuned to land in the same band rather than anywhere near the 250KB
// ceiling. q76 is the point where the gradient stays clean and the photo of
// Simon still holds detail; below about q70 the gradient starts to band.
// effort 6 buys roughly 8% off the file size for a second or two of CPU.
const QUALITY = 76;
const EFFORT = 6;

// Hard ceiling. Anything over this gets flagged in the output.
const BUDGET = 120 * 1024;

async function main() {
  const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const list = only.length ? cards.filter((c) => only.includes(c.slug)) : cards;
  if (!list.length) throw new Error(`no cards matched: ${only.join(", ")}`);

  await fs.mkdir(publicBlog, { recursive: true });

  let over = 0;
  let missing = 0;

  for (const card of list) {
    const src = path.join(outDir, `${card.slug}.png`);
    try {
      await fs.access(src);
    } catch {
      console.log(`  ${card.slug.padEnd(54)}  MISSING PNG, run thumbs:render first`);
      missing += 1;
      continue;
    }

    const dest = path.join(publicBlog, `${card.slug}.webp`);
    const info = await sharp(src)
      // Belt and braces: the screenshot should already be exact.
      .resize(WIDTH, HEIGHT, { fit: "cover", position: "centre" })
      .webp({ quality: QUALITY, effort: EFFORT })
      .toFile(dest);

    const flag = info.size > BUDGET ? "  OVER BUDGET" : "";
    if (info.size > BUDGET) over += 1;
    console.log(
      `  ${card.slug.padEnd(54)} ${(info.size / 1024).toFixed(0).padStart(5)}KB  ${info.width}x${info.height}${flag}`,
    );
  }

  console.log(
    `\n${list.length - missing} webp written to public/blog/` +
      (over ? `, ${over} over the ${BUDGET / 1024}KB budget` : ", all within budget"),
  );
  if (missing) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
