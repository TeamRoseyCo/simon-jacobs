# Publishing a post

The process from "we have a topic" to "it is live with its own card". Written
2 August 2026, when the card generator was folded into it.

The card step exists because publishing happens in the CMS at `/admin/blog`,
which knows nothing about `scripts/thumbs`. Without a deliberate step a post
goes live using the shared fallback photo, and nobody notices until the blog
index looks like the same picture eleven times, which is exactly what happened
before this doc existed.

---

## 1. Write it

Content rules are non-negotiable, this is a regulated YMYL brand
(CIOT / ICAEW / ASA):

- Only Simon's own positions, plus paraphrased or cited HMRC. Never invent tax
  advice or figures.
- Every gov.uk link must be verified to return 200 before it ships.
- No em dashes anywhere.
- If the post is built from Simon's own video or caption, his words stand. Cut
  whole sentences for length, never reword inside one. Fact-check anyway and
  report anything that looks off to Hazem rather than editing it.

Post shape that ranks: an H2 per question, a FAQ block (`faqs`, which becomes
FAQPage schema), and 2 to 3 internal links to related posts or a money page.

## 2. Publish it

Either through **`/admin/blog`** (Simon, no deploy needed, revalidates on save)
or by inserting into the **`blog_posts`** table in Supabase project
`stkdstczvulyoeyokubj`. Fields: `slug`, `title`, `tag`, `date`, `reading_time`,
`excerpt`, `body` (JSON array of paragraphs, `## ` prefix makes an H2), `faqs`,
`related`.

## 3. Give it a card

**This is the step that gets forgotten.** Run the audit first, it tells you what
is missing and prints the snippet to paste:

```sh
npm run thumbs:audit
```

Then, for each post it lists:

1. Add an entry to `scripts/thumbs/cards.mjs`:
   - `hook`: 4 to 7 words, hard maximum, drawn from the post's own title or
     excerpt. No new claims, no promised outcomes.
   - `highlight`: an exact, case-sensitive substring of `hook` that the red
     squiggle underlines. One or two words.
   - `flip: true` optionally, to stand Simon on the right for variety.
2. Preview it: `npm run thumbs:preview:tweet`
3. Render and convert: `npm run thumbs:build:tweet`
4. Re-run `npm run thumbs:audit`. It should say nothing to do.

The card lands at `public/blog/<slug>.webp` at 2400x1500, around 70KB. The blog
index, the home "Useful reads" cards, the post's own hero image and the related
reading cards all resolve it through `src/lib/postImage.ts`, which falls back to
a brand photo rather than a broken image if it is missing.

Note: `postImage` reads the directory once at module load. A card generated
while `next dev` is running will not appear until the dev server restarts. The
production build reads it fresh, so this only bites locally.

## 4. Ship and submit

```sh
npm run build          # must pass
git add -A && git commit && git push    # master auto-deploys to Vercel
npm run indexnow       # tells Bing and friends the URL exists
```

The sitemap picks the post up automatically from the CMS. Bing, not Google, is
what the AI search engines read, so IndexNow matters more here than it looks.

## 5. Afterwards

- Check the post renders: title, hero card, FAQ accordion, related cards.
- If the post targets a money-page keyword, add a link to it from that page.
- Log it in `docs/seo-keyword-topic-map.md` so the cluster stays honest.
