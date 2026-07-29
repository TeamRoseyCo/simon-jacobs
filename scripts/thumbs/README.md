# Blog thumbnail generator

Generates the `public/blog/<slug>.webp` cards for the blog index, at 2400x1500,
from a single HTML template. No new npm dependencies: it uses `sharp` (already a
transitive dep via Next) and headless Chrome (already on the machine).

## Add a card for a new post (under a minute)

1. Open `cards.mjs` and add an entry:

   ```js
   {
     slug: "my-new-post-slug",          // must match the slug in src/lib/posts.ts
     hook: "Dividends do not cut tax",  // 4 to 7 words, hard maximum
     highlight: "do not",               // exact substring of hook, 1 to 2 words
   },
   ```

2. Render and convert just that card:

   ```sh
   npm run thumbs:render -- my-new-post-slug
   npm run thumbs:webp   -- my-new-post-slug
   ```

3. Eyeball it. `npm run thumbs:preview` opens the whole set in your browser,
   including a 400x190 tile per card that is pixel-for-pixel what the blog index
   shows. If the hook is not legible in that tile, shorten it.

That is the whole loop. No image editor involved.

## Commands

| Command | What it does |
| --- | --- |
| `npm run thumbs:preview` | Opens `template.html` in your browser: every card, one scroll. Press **B** to overlay the crop-safe band, drag the slider to resize the previews. |
| `npm run thumbs:render` | Screenshots every card to `out/<slug>.png` at 2400x1500. |
| `npm run thumbs:webp` | Converts `out/*.png` to `public/blog/<slug>.webp` and reports sizes. |
| `npm run thumbs:build` | `thumbs:render` then `thumbs:webp`. The one to run after editing the design. |
| `npm run thumbs:data` | Regenerates `assets/inline-data.js`. `thumbs:render` and `thumbs:preview` already do this; you only need it directly if you opened `template.html` by hand and it says the data is missing. |

Add slugs after `--` on any of `thumbs:render`, `thumbs:webp` to limit the run to
those cards. `npm run thumbs:render -- --band` bakes the crop-band overlay into
the PNGs, which is handy for checking the safe area but must not be shipped.

## Copy rules for hooks

Non-negotiable, this is a regulated YMYL brand (CIOT / ICAEW / ASA):

- **No em dashes.** Anywhere. Commas, colons or parentheses instead.
- **4 to 7 words.** The card is displayed in a 190px-tall slot. Longer hooks get
  auto-shrunk by the template until they fit, and stop being readable.
- **No promised outcomes, no invented figures, no advice.** Punchy and
  curiosity-driven is fine. "Your laptop is not automatically a deduction" is
  good. "Slash your tax bill by 60%" is not.
- **Faithful to the post.** Read that post's `title` and `excerpt` in
  `src/lib/posts.ts` first, and write a hook that matches what it actually says.
- Match the house voice in `posts.ts`: plain, specific, calm authority.

## The hard constraint that shapes the design

`src/app/blog/page.tsx` renders these into a **190px-tall slot with
`object-cover`**, from a 2400x1500 (8:5) source. That crop throws away roughly
the **top 12% and bottom 12%** of the image height. The featured card slot is
about 640x300, which is cropped even harder.

So everything that matters, the bubble, the hook, the squiggle, and Simon's
head, sits inside the middle 76% vertical band: **y 180 to y 1320** of 1500.
Press **B** in the preview to see the two bands that get thrown away. Nothing
important may touch them.

## Files

```
cards.mjs         card copy. The only place hooks live. Source of truth.
template.html     the card design. Open it directly, or via thumbs:preview.
build-data.mjs    cards.mjs + the cutout -> assets/inline-data.js
render.mjs        headless Chrome -> out/<slug>.png at 2400x1500
to-webp.mjs       out/<slug>.png -> public/blog/<slug>.webp
assets/
  simon-cutout.png  transparent-background Simon. The one hand-made asset.
  simon-crop.jpg    the crop it was cut out of, kept for reference/regeneration.
  inline-data.js    generated, gitignored.
out/              generated PNGs, gitignored.
```

### Why `inline-data.js` exists

`template.html` is opened over `file://`, both by headless Chrome and by you. A
`file://` page cannot `fetch()` a sibling file and cannot `import` an ES module,
but it can load a plain `<script src>`. So `build-data.mjs` bakes the card array
and the Simon cutout (as a WebP data URI) into a classic script that sets
`window.__THUMBS__`. That keeps `cards.mjs` as the single source of truth instead
of duplicating the copy inside the template, where it would quietly drift.

### Why `render.mjs` speaks CDP instead of using `--screenshot`

Chrome's `--headless --screenshot=out.png` one-liner was dropped along with old
headless and silently does nothing on current Chrome (verified: it is a no-op on
Chrome for Testing 149). `render.mjs` therefore launches Chrome with
`--remote-debugging-port=0` and drives it over the DevTools Protocol using
Node's built-in `WebSocket` and `fetch`. Still zero npm dependencies, and it can
wait for the page to actually signal `window.__READY__` and for fonts and images
to finish, rather than guessing at a timeout.

It looks for a Chrome binary in this order, and `CHROME_PATH` overrides:

1. the cached Chrome for Testing under `~/Library/Caches/ms-playwright/`
2. `/Applications/Google Chrome for Testing.app`
3. `/Applications/Google Chrome.app`
4. `/Applications/Chromium.app`

## The fallback card

`_default` is the card used for any post that has no thumbnail of its own.
`src/app/blog/page.tsx` reads `public/blog/` at build time and falls back to
`/blog/_default.webp`, so a post added to `posts.ts` before its image exists can
never render a 404 image again. Prefer generating a real card, but the safety net
is there.

## Regenerating the cutout

`assets/simon-cutout.png` was made once and should not need remaking. If it does:

```sh
# 1. crop Simon out of the group shot (source: TWR-TheGate-81.jpg, 4764x7139).
#    This is a deliberate mid-chest crop: it keeps the diagonal bag strap, which
#    is unremarkable, but cuts the crossbody bag body and the cigar in his hand
#    out of frame. Both read "garden party" rather than "chartered tax adviser".
node -e "require('sharp')('TWR-TheGate-81.jpg')
  .extract({left:1900,top:1830,width:1400,height:1570})
  .jpeg({quality:96}).toFile('scripts/thumbs/assets/simon-crop.jpg')"

# 2. remove the background
```

For step 2, either right-click `simon-crop.jpg` in Finder and use **Quick
Actions -> Remove Background**, saving the result as `assets/simon-cutout.png`,
or run the same macOS Vision model from the command line, which is what was
actually used and needs no GUI:

```swift
// cutout.swift, build with: swiftc -O -o cutout cutout.swift
import Foundation; import Vision; import CoreImage; import AppKit
let inURL = URL(fileURLWithPath: CommandLine.arguments[1])
let outURL = URL(fileURLWithPath: CommandLine.arguments[2])
let ci = CIImage(contentsOf: inURL)!
let req = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(ciImage: ci, options: [:])
try handler.perform([req])
let obs = req.results!.first!
let masked = try obs.generateMaskedImage(ofInstances: obs.allInstances,
                                         from: handler,
                                         croppedToInstancesExtent: false)
let out = CIImage(cvPixelBuffer: masked)
let cg = CIContext().createCGImage(out, from: out.extent)!
try NSBitmapImageRep(cgImage: cg).representation(using: .png, properties: [:])!
  .write(to: outURL)
```

`VNGenerateForegroundInstanceMaskRequest` is the same model behind Finder's
Remove Background, so the edge quality is identical and the whole thing stays
scriptable. Do not fall back to a chroma key: the source background is busy
green foliage and a naive key looks terrible.

Afterwards, downscale the PNG to about 1300px wide before committing it. Nothing
needs more than that. If you change the crop, re-measure where his head sits as
a fraction of the image height and update `.card__simon` in `template.html`: the
`top`/`height` and the `mask-image` stops are tuned to that ratio.

## Output weight

Cards land at roughly 70 to 75KB each, matching the 57 to 62KB of the blog
images already on the site. `to-webp.mjs` uses quality 76: below about 70 the
background gradient starts to band, above about 85 the file doubles for no
visible gain. It flags anything over 120KB.
