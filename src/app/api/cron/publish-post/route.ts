import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

// Publishes one queued blog post per run, twice a day.
//
// Posts are written and carded up front, then held in `blog_posts` with
// status = 'scheduled' and a publish_at timestamp: 06:00 for a morning slot,
// 17:00 for an evening one. Vercel Cron hits this route at 07:30 and 18:30 (see
// vercel.json), it takes the oldest post that is due, sets its date to today,
// flips it to published, revalidates the pages that list posts and pings
// IndexNow so Bing (and the AI search engines reading Bing) see it.
//
// One post per run on purpose. If a run is missed, or several posts fall due at
// once, the queue drains two a day rather than dumping the backlog into the
// index on one date. That is the fallback cushion: the blog keeps publishing
// whether or not anyone remembers to.
// RELEVANT FILES: src/lib/posts.ts, vercel.json, scripts/indexnow.mjs

const HOST = "srjinternational.co.uk";
const IDXNOW_KEY = "3c75b0b8bc9f45c8a6e5920b8fda2d67";

function auth(req: Request) {
  const header = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`;
  return Boolean(process.env.CRON_SECRET) && header === expected;
}

// IndexNow is best-effort. A failed ping must never fail the publish, the
// post is live either way and the next deploy's npm run indexnow catches up.
async function pingIndexNow(slug: string) {
  const urlList = [
    `https://${HOST}/blog/${slug}`,
    `https://${HOST}/blog`,
    `https://${HOST}/`,
  ];
  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: HOST,
        key: IDXNOW_KEY,
        keyLocation: `https://${HOST}/${IDXNOW_KEY}.txt`,
        urlList,
      }),
    });
    return res.status;
  } catch {
    return null;
  }
}

export async function GET(req: Request) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });

  const now = new Date();

  const { data: due, error: fetchError } = await supabase
    .from("blog_posts")
    .select("slug, title, publish_at")
    .eq("status", "scheduled")
    .lte("publish_at", now.toISOString())
    .order("publish_at", { ascending: true })
    .limit(1);

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }
  if (!due || due.length === 0) {
    return NextResponse.json({ published: 0 });
  }

  const post = due[0];
  // Date the post today, not on the publish_at it was queued for. A post that
  // sat in the queue an extra week should not go live back-dated.
  const today = now.toISOString().slice(0, 10);

  const { error: updateError } = await supabase
    .from("blog_posts")
    .update({ status: "published", date: today, publish_at: null, updated_at: now.toISOString() })
    .eq("slug", post.slug)
    .eq("status", "scheduled");

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/scorecard");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/sitemap.xml");

  const indexnow = await pingIndexNow(post.slug);

  const { count: remaining } = await supabase
    .from("blog_posts")
    .select("slug", { count: "exact", head: true })
    .eq("status", "scheduled");

  return NextResponse.json({
    published: 1,
    slug: post.slug,
    title: post.title,
    date: today,
    indexnow,
    remainingInQueue: remaining ?? null,
  });
}
