// Blog posts. Content lives in the `blog_posts` Supabase table (see
// scripts/migrate-posts-to-supabase.ts for the one-off migration history),
// edited through /admin/blog. This file is server-only: it reads the
// service-role Supabase client, so never import it from a "use client" file.
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
  // Each entry is a block. A "## " prefix renders as an H2 subheading; every
  // other entry is a paragraph. Inline [label](/path) markup becomes a link.
  body: string[];
  faqs?: Faq[]; // rendered as an accordion + FAQPage schema
  related?: string[]; // slugs of related posts, shown as internal links
};

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
  };
}

export async function getAllPosts(): Promise<Post[]> {
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

export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
