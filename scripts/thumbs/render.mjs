/**
 * Screenshots every card in cards.mjs to scripts/thumbs/out/<slug>.png at
 * exactly 2400x1500.
 *
 * How: the template is opened once per card as file://template.html?card=<slug>,
 * which makes that single card fill a 2400x1500 viewport at 1:1, and the frame
 * is captured through the Chrome DevTools Protocol.
 *
 * Why CDP rather than the one-liner `--headless --screenshot=out.png`: Chrome
 * dropped that shortcut along with old headless, and it is a no-op in Chrome
 * 132+ (verified silently doing nothing on Chrome for Testing 149). CDP also
 * lets us wait for the page to actually signal window.__READY__ and for fonts
 * to load instead of guessing at a timeout. Node's built-in WebSocket and
 * fetch do the talking, so this still needs zero npm dependencies.
 *
 * Usage:
 *   node scripts/thumbs/render.mjs                     all cards
 *   node scripts/thumbs/render.mjs the-60-percent-tax-trap [more slugs...]
 *   node scripts/thumbs/render.mjs --band              overlay the crop band
 */
import { execFile, spawn } from "node:child_process";
import { promisify } from "node:util";
import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { fileURLToPath, pathToFileURL } from "node:url";
import { cards } from "./cards.mjs";

const run = promisify(execFile);
const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(here, "out");
const template = path.join(here, "template.html");

const WIDTH = 2400;
const HEIGHT = 1500;

// In preference order. The cached Chrome for Testing build is tried first: it
// has no profile, no signed-in state, and no update nags.
const CHROME_CANDIDATES = [
  `${os.homedir()}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`,
  `${os.homedir()}/Library/Caches/ms-playwright/chromium-1228/chrome-mac/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`,
  "/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  for (const p of CHROME_CANDIDATES) {
    try {
      await fs.access(p);
      return p;
    } catch {
      /* keep looking */
    }
  }
  throw new Error(
    "No Chrome found. Set CHROME_PATH to a Chrome or Chromium binary.\nTried:\n  " +
      CHROME_CANDIDATES.join("\n  "),
  );
}

/* ------------------------------------------------------- CDP plumbing */

class Cdp {
  constructor(ws) {
    this.ws = ws;
    this.next = 1;
    this.pending = new Map();
    ws.addEventListener("message", (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(`${msg.error.message} (${JSON.stringify(msg.error)})`));
        else resolve(msg.result);
      }
    });
  }

  send(method, params = {}, sessionId) {
    const id = this.next++;
    const payload = { id, method, params };
    if (sessionId) payload.sessionId = sessionId;
    this.ws.send(JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (this.pending.delete(id)) reject(new Error(`CDP timeout: ${method}`));
      }, 45000);
    });
  }

  close() {
    try {
      this.ws.close();
    } catch {
      /* already gone */
    }
  }
}

async function connect(url) {
  const ws = new WebSocket(url);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", () => reject(new Error(`ws failed: ${url}`)), { once: true });
  });
  return new Cdp(ws);
}

async function launch(chrome, profileDir) {
  const child = spawn(
    chrome,
    [
      "--headless=new",
      "--remote-debugging-port=0",
      `--user-data-dir=${profileDir}`,
      `--window-size=${WIDTH},${HEIGHT}`,
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      "--default-background-color=00000000",
      "--allow-file-access-from-files",
      "--no-first-run",
      "--no-default-browser-check",
      "--disable-extensions",
      "--disable-gpu",
      "--no-sandbox",
      // Chrome for Testing otherwise spends the first few seconds failing to
      // reach Google services and spraying the log with it.
      "--disable-background-networking",
      "--disable-sync",
      "--disable-component-update",
      "--disable-features=Translate,OptimizationHints,MediaRouter",
      "about:blank",
    ],
    { stdio: ["ignore", "ignore", "pipe"] },
  );
  child.stderr.resume();

  const portFile = path.join(profileDir, "DevToolsActivePort");
  for (let i = 0; i < 200; i++) {
    try {
      const txt = await fs.readFile(portFile, "utf8");
      const [port] = txt.split("\n");
      if (port && Number(port) > 0) {
        const res = await fetch(`http://127.0.0.1:${port}/json/version`);
        const info = await res.json();
        return { child, wsUrl: info.webSocketDebuggerUrl };
      }
    } catch {
      /* not up yet */
    }
    await sleep(150);
  }
  child.kill("SIGKILL");
  throw new Error("Chrome did not expose a DevTools port within 30s");
}

/* --------------------------------------------------------- screenshot */

async function shoot(cdp, slug, band) {
  const url = pathToFileURL(template); // not string concat: the repo path has a space
  url.searchParams.set("card", slug);
  if (band) url.searchParams.set("band", "1");

  // No width/height here: Chrome only honours those on a new window, and the
  // viewport is pinned by setDeviceMetricsOverride below anyway.
  const { targetId } = await cdp.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await cdp.send("Target.attachToTarget", { targetId, flatten: true });

  try {
    await cdp.send(
      "Emulation.setDeviceMetricsOverride",
      { width: WIDTH, height: HEIGHT, deviceScaleFactor: 1, mobile: false },
      sessionId,
    );
    await cdp.send("Page.enable", {}, sessionId);
    await cdp.send("Page.navigate", { url: url.href }, sessionId);

    // Wait for the template's own ready flag, fonts, and image decode.
    const expr = `(async () => {
      if (!window.__READY__) return "js";
      if (document.fonts && document.fonts.status !== "loaded") { await document.fonts.ready; }
      const imgs = Array.from(document.images);
      if (imgs.some(i => !i.complete)) return "img";
      await Promise.all(imgs.map(i => i.decode().catch(() => {})));
      return document.querySelector(".card") ? "ok" : "card";
    })()`;

    let state = "";
    for (let i = 0; i < 120; i++) {
      const { result } = await cdp.send(
        "Runtime.evaluate",
        { expression: expr, awaitPromise: true, returnByValue: true },
        sessionId,
      );
      state = result.value;
      if (state === "ok") break;
      await sleep(100);
    }
    if (state !== "ok") throw new Error(`page never became ready (stuck at "${state}")`);

    // One extra frame so the squiggle relayout after font load has painted.
    await sleep(180);

    const { data } = await cdp.send(
      "Page.captureScreenshot",
      { format: "png", captureBeyondViewport: false, optimizeForSpeed: false },
      sessionId,
    );

    const out = path.join(outDir, `${slug}.png`);
    await fs.writeFile(out, Buffer.from(data, "base64"));
    const { size } = await fs.stat(out);
    return { out, size };
  } finally {
    await cdp.send("Target.closeTarget", { targetId }).catch(() => {});
  }
}

/* --------------------------------------------------------------- main */

async function main() {
  const argv = process.argv.slice(2);
  const band = argv.includes("--band");
  const only = argv.filter((a) => !a.startsWith("--"));

  // Regenerate the inlined data so a render can never use stale copy.
  const built = await run(process.execPath, [path.join(here, "build-data.mjs")]);
  process.stdout.write(built.stdout);

  const list = only.length ? cards.filter((c) => only.includes(c.slug)) : cards;
  if (!list.length) throw new Error(`no cards matched: ${only.join(", ")}`);

  await fs.mkdir(outDir, { recursive: true });
  const chrome = await findChrome();
  const profileDir = await fs.mkdtemp(path.join(os.tmpdir(), "srj-thumbs-"));
  console.log(`chrome: ${chrome}`);

  const { child, wsUrl } = await launch(chrome, profileDir);
  const cdp = await connect(wsUrl);

  try {
    for (const card of list) {
      const { size } = await shoot(cdp, card.slug, band);
      console.log(
        `  ${card.slug.padEnd(54)} ${(size / 1024).toFixed(0).padStart(5)}KB  out/${card.slug}.png`,
      );
    }
  } finally {
    cdp.close();
    child.kill("SIGTERM");
    await sleep(300);
    child.kill("SIGKILL");
    await fs.rm(profileDir, { recursive: true, force: true }).catch(() => {});
  }

  console.log(`\n${list.length} PNG(s) at ${WIDTH}x${HEIGHT} in scripts/thumbs/out/`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
