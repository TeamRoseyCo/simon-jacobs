import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthed, ADMIN_COOKIE } from "@/lib/adminAuth";
import { getAllPosts } from "@/lib/posts";
import {
  eyebrowStyle,
  ghostPill,
  headerRow,
  pageTitleStyle,
  pageWrap,
  primaryPill,
} from "../ui";
import BlogList from "./BlogList";

export const metadata: Metadata = {
  title: "Blog admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!isAuthed(token)) redirect("/admin/login");

  const posts = await getAllPosts();

  return (
    <div style={pageWrap(1080)}>
      <header style={headerRow}>
        <div>
          <p style={eyebrowStyle}>SRJ International</p>
          <h1 style={pageTitleStyle}>Blog posts</h1>
        </div>
        <div style={{ display: "flex", gap: "0.6rem" }}>
          <Link href="/admin" style={ghostPill}>
            ← Leads
          </Link>
          <Link href="/admin/blog/new" style={primaryPill()}>
            New post
          </Link>
        </div>
      </header>

      <BlogList
        posts={posts.map((p) => ({
          slug: p.slug,
          title: p.title,
          tag: p.tag,
          date: p.date,
        }))}
      />
    </div>
  );
}
