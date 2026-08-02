# Blog thumbnail generator

## Two layouts

`template.html` is the original. `template-tweet.html` is the tweet layout,
rebuilt from the Profresults reference Hazem supplied on 2 August 2026. Both
read the same `cards.mjs` and render at the same 2400x1500, so a card can be
rendered through either without touching its copy.

**The generator is step 3 of `docs/publishing-a-post.md`.** Start with
`npm run thumbs:audit`: it reads the live post list from Supabase, tells you
which published posts have no card copy or no rendered image, and prints the
snippet to paste into `cards.mjs`. It exits 1 when something is missing, so it
can gate a release.

| Command | What |
| --- | --- |
| `npm run thumbs:audit` | What is missing, checked against the live CMS. Run this first. |
| `npm run thumbs:preview:tweet` | Opens the tweet layout: a live editor at the top, then every card. |
| `npm run thumbs:render:tweet` | Screenshots them to `out/<slug>.png`. |
| `npm run thumbs:build:tweet` | Render, then convert to `public/blog/<slug>.webp`. |

The layout is seven switchable layers, back to front: the cream **frame**, the
**background** (near-black plus two blue radial glows), the **dot** top left,
the **headshot** bleeding off the bottom left, the white **tweet** card (avatar,
name, verified tick, headline), the red hand-drawn **squiggle** under the
highlighted words, and the **domain** underneath. Each has a checkbox in the
control bar, and every colour is a CSS variable at the top of the file.

The squiggle is bound to the `highlight` field in `cards.mjs`: it hangs off a
`<span>` wrapped round that exact substring, so it follows the words when the
headline re-fits rather than being positioned by hand.

`THUMB_TEMPLATE=template-tweet.html` is what switches `render.mjs` over.


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

## The crop constraint, and why it is gone (2 August 2026)

**This no longer applies to the tweet layout.** Every place that shows a card
(blog index, featured slot, post hero, related cards, home "Useful reads") now
renders it at its own 8:5 with the image's real dimensions, so the whole card
shows, uncropped and unletterboxed. Do not use `fill` on these: inside an
`aspect-ratio` box Safari resolves the height to 0 and the image disappears.

The original constraint, kept because `template.html` is still designed around
it: that template's cards were shown in a 190px-tall slot with `object-cover`
from a 2400x1500 source, which threw away roughly the top and bottom 12%.

So everything that matters, the bubble, the hook, the squiggle, and Simon's
head, sits inside the middle 76% vertical band: **y 180 to y 1320** of 1500.
Press **B** in the preview to see the two bands that get thrown away. Nothing
important may touch them.

## Files

```
cards.mjs           card copy. The only place hooks live. Source of truth.
template.html       the original card design.
template-tweet.html the tweet layout (current), with a live editor.
audit.mjs           live CMS vs cards vs images. Run first when publishing.
build-data.mjs      cards.mjs + the cutout -> assets/inline-data.js
render.mjs          headless Chrome -> out/<slug>.png at 2400x1500
to-webp.mjs         out/<slug>.png -> public/blog/<slug>.webp
cutout.mjs          photo -> transparent PNG (Vision, colour-key fallback)
cutout-vision.swift the Vision subject lift cutout.mjs compiles and calls
assets/
  simon-suit-cutout.png  current cutout: the navy-suit studio headshot.
  simon-cutout.png       older cutout from the group shot.
  simon-crop.jpg         the crop that one was cut from.
  inline-data.js         generated, gitignored.
out/                generated PNGs, gitignored.
.bin/               compiled Swift helper, gitignored.
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

`_default` is rendered as a card like any other. The runtime fallback lives in
**`src/lib/postImage.ts`**, shared by every place that lists posts: it reads
`public/blog/` once at module load and falls back to `/simon-jacobs-event.webp`
for any slug without a card, so a post published through `/admin/blog` before
its card exists can never render a 404 image. Prefer a real card; run
`npm run thumbs:audit` to find the ones still missing.

Note it reads the directory once at module load, so a card generated while
`next dev` is running needs a dev-server restart to appear. The production build
reads it fresh.

## Regenerating the cutout

Now a script. It runs macOS Vision's subject lifting (the model behind Finder's
Remove Background) via `cutout-vision.swift`, compiling it on first use, and
falls back to a flood-fill colour key off-platform:

```sh
node scripts/thumbs/cutout.mjs                      # public/simon-jacobs.jpg -> assets/simon-suit-cutout.png
node scripts/thumbs/cutout.mjs <input> <output>     # any other photo
```

`assets/simon-suit-cutout.png` (the navy-suit studio headshot) is what
`build-data.mjs` inlines by default; `THUMB_CUTOUT=simon-cutout.png` switches
back to the older garden-party cutout.

Do not reach for a colour key on a studio portrait: it was tried on this photo
and it ate the top of Simon's bald head, which is lit to almost exactly the
backdrop grey, while leaving patches where the backdrop gradient fell outside
tolerance.

The history below is kept for the original cutout:

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
