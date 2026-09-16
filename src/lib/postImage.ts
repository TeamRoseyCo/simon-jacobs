import fs from "node:fs";
import path from "node:path";
const BLOG_IMAGE_DIR = path.join(process.cwd(), "public", "blog");

export const DEFAULT_POST_IMAGE = "/simon-jacobs-event.webp";

const HAS_IMAGE: Set<string> = (() => {
  try {
    return new Set(
      fs
        .readdirSync(BLOG_IMAGE_DIR)
        .filter((f) => f.endsWith(".webp"))
        .map((f) => f.replace(/\.webp$/, "")),
    );
  } catch {
    return new Set<string>();
  }
})();

export function postImage(slug: string): string {
  return HAS_IMAGE.has(slug) ? `/blog/${slug}.webp` : DEFAULT_POST_IMAGE;
}
