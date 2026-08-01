import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { isAuthed, ADMIN_COOKIE } from "@/lib/adminAuth";
import { getPost } from "@/lib/posts";
import { eyebrowStyle, headerRow, pageTitleStyle, pageWrap } from "../../ui";
import PostEditor from "../PostEditor";

export const metadata: Metadata = {
  title: "Edit blog post",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!isAuthed(token)) redirect("/admin/login");

  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div style={pageWrap(900)}>
      <header style={headerRow}>
        <div>
          <p style={eyebrowStyle}>SRJ International</p>
          <h1 style={pageTitleStyle}>Edit post</h1>
        </div>
      </header>
      <div style={{ marginTop: "1.5rem" }}>
        <PostEditor initial={post} originalSlug={post.slug} />
      </div>
    </div>
  );
}
