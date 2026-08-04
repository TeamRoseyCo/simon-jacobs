# Scheduled publishing

How a written post gets from a JSON file to live on the blog without anyone
pressing a button. Built 4 August 2026, when the caption backlog turned into a
31 post queue.

The point of it: the blog keeps publishing whether or not anyone remembers to.
If Simon is busy for a fortnight, or Hazem forgets, posts still go out. That is
the cushion.

---

## The shape of it

`blog_posts` has two extra columns:

- `status`, either `published` or `scheduled`. Defaults to `published`, so every
  post that existed before this was built carried on as it was.
- `publish_at`, a timestamp. Only meaningful while `status` is `scheduled`.

Two posts a day. Morning posts are queued at 06:00 UTC and evening posts at
17:00 UTC. A Vercel Cron hits `/api/cron/publish-post` at 07:30 and 18:30, and
each run publishes **one** post: the oldest one that is due.

One per run is deliberate. If a run is missed, or several posts fall due at once,
the queue drains two a day rather than dumping a backlog into the index on a
single date, which looks exactly like what it is.

## Nothing leaks early

A scheduled post is invisible in every public surface:

- `getAllPosts()` in `src/lib/posts.ts` returns published posts only, which
  covers the blog index, the homepage cards, `/scorecard` and the sitemap.
- `getPublishedPost()` is what the post page uses, so a scheduled slug 404s.
- `related` links resolve through `getPublishedPost()` too, so a queued post
  referenced by a live one is silently dropped until it goes live.
- `getEveryPost()` is the admin-only read. `/admin/blog` uses it and shows a
  Status column, so Simon can see the queue.

## Loading the queue

Posts live as one JSON file per post in `scripts/queue/`, named
`YYYYMMDD-am-<slug>.json` or `YYYYMMDD-pm-<slug>.json`. Same fields as the CMS,
plus `publishAt` (a date) and `slot` (`morning` or `evening`).

```sh
node scripts/queue/load.mjs --dry    # show the schedule, write nothing
node scripts/queue/load.mjs          # upsert them all as scheduled
```

The loader refuses to write if:

- a post has no `publishAt`, a bad `slot`, or a slug that is not url safe
- two posts share the same date and slot
- there is an em dash anywhere in the prose
- an inline `/blog/` link points at a post that publishes **later** than the post
  containing it, which would be a 404 for however many days sit between them

That last check is the one worth knowing about. Backward links between queued
posts are fine and are how the cluster knits itself together. Forward links are
a hard error.

It never overwrites a post that has already gone live, so re-running is safe.

## What the cron does

1. Finds the oldest `scheduled` post with `publish_at <= now`.
2. Sets `date` to **today**, not to the `publish_at` it was queued for. A post
   delayed in the queue is never back-dated.
3. Flips `status` to `published` and clears `publish_at`.
4. Revalidates `/`, `/blog`, `/scorecard`, the post itself and `/sitemap.xml`.
5. Pings IndexNow for the new URL, best effort. A failed ping never fails the
   publish, and the next `npm run indexnow` catches up.

It returns `{published, slug, date, indexnow, remainingInQueue}`, so the Vercel
cron log tells you how much cushion is left.

Auth is the same `CRON_SECRET` bearer token the email sequence cron uses.

## Cards still have to exist first

The cron does not generate images. Every queued post needs its card **before**
it publishes, or it goes live on the shared fallback photo. Card entries go in
`scripts/thumbs/cards.mjs` and `npm run thumbs:audit` reads the CMS, so it sees
scheduled posts and will tell you what is missing.

One trap found while building the August queue: the squiggle is positioned by
measuring the highlighted span, and on a long hook that re-fits onto three lines
the measurement can land a line low, leaving the underline beneath empty space.
Keep hooks short, four to seven words, and put the highlight at the **end** of
the hook so it lands on the final line. Then look at the rendered card. Do not
trust the audit alone, it only checks that a file exists.

## Topping up

The queue is finite. When it runs dry the blog stops, quietly, and the only
signal is `remainingInQueue` falling to zero in the cron response.

```sql
select count(*) from blog_posts where status = 'scheduled';
```

Worth checking weekly. Refill from
[the caption backlog](./caption-to-blog-backlog-2026-08.md), or from Simon's
newer captions once the next chat export lands.

## Known limits

- **Two crons a day needs a Vercel plan that allows it.** The Hobby plan permits
  one cron invocation per day, so on Hobby the evening run will not fire and the
  queue quietly becomes one post a day. It still works, just at half speed.
- **No UI for rescheduling.** `/admin/blog` shows the queue but cannot change a
  date. Reschedule by editing the JSON and re-running the loader, or with SQL.
- Editing a scheduled post through `/admin/blog` leaves `status` and
  `publish_at` untouched, so it stays queued. That is intentional.
