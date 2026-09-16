import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const run = promisify(execFile);

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.join(here, "..", "..");

const input = process.argv[2] || path.join(repo, "public", "simon-jacobs.jpg");
const output = process.argv[3] || path.join(here, "assets", "simon-suit-cutout.png");
const TOLERANCE = Number(process.env.TOLERANCE || 40);
const WORK_WIDTH = Number(process.env.WORK_WIDTH || 1600);
async function visionCutout() {
  if (process.platform !== "darwin" || process.env.NO_VISION) return false;
  const swift = path.join(here, "cutout-vision.swift");
  const bin = path.join(here, ".bin", "cutout-vision");
  try {
    await fs.mkdir(path.dirname(bin), { recursive: true });
    const [srcStat, binStat] = await Promise.all([
      fs.stat(swift),
      fs.stat(bin).catch(() => null),
    ]);
    if (!binStat || binStat.mtimeMs < srcStat.mtimeMs) {
      await run("swiftc", ["-O", swift, "-o", bin]);
      console.log("cutout: compiled cutout-vision");
    }
    const { stdout } = await run(bin, [input, output]);
    process.stdout.write(stdout);
    return true;
  } catch (err) {
    console.warn(
      `cutout: Vision route unavailable (${err.message.split("\n")[0]}), falling back to the colour key`,
    );
    return false;
  }
}

async function main() {
  if (await visionCutout()) {
    const meta = await sharp(output).metadata();
    console.log(
      `cutout: ${path.relative(repo, input)} -> ${path.relative(repo, output)} ` +
        `(${meta.width}x${meta.height}, Vision subject lift)`,
    );
    return;
  }

  const src = sharp(input).resize({ width: WORK_WIDTH, kernel: "lanczos3" }).ensureAlpha();
  const { data, info } = await src.raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels } = info;
  const at = (x, y) => (y * w + x) * channels;
  const corners = [
    [2, 2],
    [w - 3, 2],
    [2, h - 3],
    [w - 3, h - 3],
  ].map(([x, y]) => [data[at(x, y)], data[at(x, y) + 1], data[at(x, y) + 2]]);
  const bg = [0, 1, 2].map((c) =>
    Math.round(corners.reduce((s, px) => s + px[c], 0) / corners.length),
  );

  const isBg = (i) => {
    const dr = data[i] - bg[0];
    const dg = data[i + 1] - bg[1];
    const db = data[i + 2] - bg[2];
    return Math.sqrt(dr * dr + dg * dg + db * db) <= TOLERANCE;
  };
  const bgMask = new Uint8Array(w * h);
  const queue = new Int32Array(w * h);
  let head = 0;
  let tail = 0;
  const push = (p) => {
    if (bgMask[p]) return;
    if (!isBg(p * channels)) return;
    bgMask[p] = 1;
    queue[tail++] = p;
  };
  for (let x = 0; x < w; x++) {
    push(x);
    push((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    push(y * w);
    push(y * w + w - 1);
  }
  while (head < tail) {
    const p = queue[head++];
    const x = p % w;
    const y = (p - x) / w;
    if (x > 0) push(p - 1);
    if (x < w - 1) push(p + 1);
    if (y > 0) push(p - w);
    if (y < h - 1) push(p + w);
  }
  let alpha = new Uint8Array(w * h);
  for (let p = 0; p < w * h; p++) alpha[p] = bgMask[p] ? 0 : 255;
  const eroded = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const p = y * w + x;
      if (!alpha[p]) continue;
      const edge =
        (x > 0 && !alpha[p - 1]) ||
        (x < w - 1 && !alpha[p + 1]) ||
        (y > 0 && !alpha[p - w]) ||
        (y < h - 1 && !alpha[p + w]);
      eroded[p] = edge ? 0 : 255;
    }
  }
  alpha = eroded;
  const feathered = await sharp(Buffer.from(alpha), {
    raw: { width: w, height: h, channels: 1 },
  })
    .blur(1.1)
    .raw()
    .toBuffer();

  const rgba = Buffer.alloc(w * h * 4);
  for (let p = 0; p < w * h; p++) {
    const s = p * channels;
    rgba[p * 4] = data[s];
    rgba[p * 4 + 1] = data[s + 1];
    rgba[p * 4 + 2] = data[s + 2];
    rgba[p * 4 + 3] = feathered[p];
  }

  const kept = alpha.reduce((n, v) => n + (v ? 1 : 0), 0);
  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(output);

  console.log(
    `cutout: ${path.relative(repo, input)} -> ${path.relative(repo, output)}\n` +
      `  ${w}x${h}, backdrop rgb(${bg.join(", ")}), tolerance ${TOLERANCE}, ` +
      `subject ${((kept / (w * h)) * 100).toFixed(1)}% of frame`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
