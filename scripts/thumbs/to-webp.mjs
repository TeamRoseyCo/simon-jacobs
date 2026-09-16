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
const QUALITY = 76;
const EFFORT = 6;
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
