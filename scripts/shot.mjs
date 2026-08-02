/**
 * Screenshots a URL at a given viewport, so a layout question can be settled by
 * looking at the page rather than by reading CSS and hoping.
 *
 * Uses the same headless Chrome and CDP plumbing as the thumbnail renderer, and
 * the same zero-dependency approach: Node's built-in fetch and WebSocket.
 *
 * Usage:
 *   node scripts/shot.mjs http://localhost:3000/ 1512 982 out.png
 */
import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";

const [, , url = "http://localhost:3000/", w = "1512", h = "982", out = "shot.png"] =
  process.argv;

const CHROME_CANDIDATES = [
  `${os.homedir()}/Library/Caches/ms-playwright/chromium-1228/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing`,
  "/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function findChrome() {
  for (const c of CHROME_CANDIDATES) {
    try {
      await fs.access(c);
      return c;
    } catch {}
  }
  throw new Error("no Chrome found");
}

const chrome = await findChrome();
const profile = await fs.mkdtemp(`${os.tmpdir()}/shot-`);
const child = spawn(
  chrome,
  [
    "--headless=new",
    "--remote-debugging-port=0",
    `--user-data-dir=${profile}`,
    "--no-first-run",
    "--disable-gpu",
    "--hide-scrollbars",
    "about:blank",
  ],
  { stdio: ["ignore", "ignore", "pipe"] },
);

let wsUrl = "";
child.stderr.on("data", (b) => {
  const m = /ws:\/\/[^\s]+/.exec(String(b));
  if (m && !wsUrl) wsUrl = m[0];
});
for (let i = 0; i < 100 && !wsUrl; i++) await sleep(100);
if (!wsUrl) {
  child.kill("SIGKILL");
  throw new Error("Chrome did not expose a DevTools endpoint");
}

const ws = new WebSocket(wsUrl);
await new Promise((res, rej) => {
  ws.onopen = res;
  ws.onerror = rej;
});

let id = 0;
const pending = new Map();
ws.onmessage = (e) => {
  const msg = JSON.parse(e.data);
  if (msg.id && pending.has(msg.id)) {
    pending.get(msg.id)(msg.result);
    pending.delete(msg.id);
  }
};
const send = (method, params = {}, sessionId) =>
  new Promise((res) => {
    const mid = ++id;
    pending.set(mid, res);
    ws.send(JSON.stringify({ id: mid, method, params, sessionId }));
  });

const { targetId } = await send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
await send("Page.enable", {}, sessionId);
await send(
  "Emulation.setDeviceMetricsOverride",
  { width: Number(w), height: Number(h), deviceScaleFactor: 1, mobile: false },
  sessionId,
);
// Cache disabled on purpose: this tool exists to see what the server is
// actually serving right now, not what a browser cached earlier.
await send("Network.enable", {}, sessionId);
await send("Network.setCacheDisabled", { cacheDisabled: true }, sessionId);
// Pre-accept the cookie banner, otherwise every screenshot is a picture of the
// consent modal. Also lets a scroll offset be passed as the 5th argument.
await send("Runtime.enable", {}, sessionId);
await send(
  "Page.addScriptToEvaluateOnNewDocument",
  {
    source:
      'try { localStorage.setItem("sj-cookie-consent", JSON.stringify({ analytics: true, marketing: true, ts: 1 })); } catch (e) {}',
  },
  sessionId,
);
await send("Page.navigate", { url }, sessionId);
await sleep(2200);

const scrollTo = Number(process.argv[6] || 0);
if (scrollTo) {
  await send(
    "Runtime.evaluate",
    { expression: `window.scrollTo(0, ${scrollTo}); document.querySelectorAll('.reveal').forEach(function (e) { e.classList.add('is-visible'); });` },
    sessionId,
  );
  await sleep(1200);
}

const { data } = await send(
  "Page.captureScreenshot",
  { format: "png", captureBeyondViewport: false },
  sessionId,
);
await fs.writeFile(out, Buffer.from(data, "base64"));
console.log(`${url} at ${w}x${h} -> ${out}`);

ws.close();
child.kill("SIGKILL");
await fs.rm(profile, { recursive: true, force: true });
