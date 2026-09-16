import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export type Faq = { question: string; answer: string };

export type Post = {
  slug: string;
  title: string;
  tag: string;
  date: string; // ISO date (first published)
  updated?: string; // ISO date; when set, shown as "Updated" + used as dateModified
  readingTime: string;
  excerpt: string;
  body: string[];
  faqs?: Faq[]; // rendered as an accordion + FAQPage schema
  related?: string[]; // slugs of related posts, shown as internal links
  status: PostStatus;
  publishAt?: string; // ISO timestamp; only meaningful while status is "scheduled"
};
export type PostStatus = "published" | "scheduled";

type BlogPostRow = {
  slug: string;
  title: string;
  tag: string;
  date: string;
  updated: string | null;
  reading_time: string;
  excerpt: string;
  body: string[];
  faqs: Faq[];
  related: string[];
  status: PostStatus | null;
  publish_at: string | null;
};

function rowToPost(row: BlogPostRow): Post {
  return {
    slug: row.slug,
    title: row.title,
    tag: row.tag,
    date: row.date,
    updated: row.updated ?? undefined,
    readingTime: row.reading_time,
    excerpt: row.excerpt,
    body: row.body,
    faqs: row.faqs,
    related: row.related,
    status: row.status ?? "published",
    publishAt: row.publish_at ?? undefined,
  };
}
export async function getAllPosts(): Promise<Post[]> {
  return (await getEveryPost()).filter((p) => p.status === "published");
}
export async function getEveryPost(): Promise<Post[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("date", { ascending: false });
  if (error || !data) return [];
  return (data as BlogPostRow[]).map(rowToPost);
}

export async function getPost(slug: string): Promise<Post | undefined> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return undefined;
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return undefined;
  return rowToPost(data as BlogPostRow);
}
export async function getPublishedPost(slug: string): Promise<Post | undefined> {
  const post = await getPost(slug);
  return post && post.status === "published" ? post : undefined;
}

export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
