import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthed, ADMIN_COOKIE } from "@/lib/adminAuth";
import { getEveryPost } from "@/lib/posts";
import BlogList from "./BlogList";

export const metadata: Metadata = {
  title: "Blog admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

// Server pages here stay thin: auth + data only. All the admin chrome lives in
// the client components, because src/app/admin/ui.tsx is a "use client" module
// and its helpers cannot be called from a server component.
export default async function AdminBlogPage() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!isAuthed(token)) redirect("/admin/login");

  const posts = await getEveryPost();

  return (
    <BlogList
      posts={posts.map((p) => ({
        slug: p.slug,
        title: p.title,
        tag: p.tag,
        date: p.date,
        status: p.status,
        publishAt: p.publishAt,
      }))}
    />
  );
}
