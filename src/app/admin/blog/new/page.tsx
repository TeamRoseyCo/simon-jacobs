import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthed, ADMIN_COOKIE } from "@/lib/adminAuth";
import { eyebrowStyle, headerRow, pageTitleStyle, pageWrap } from "../../ui";
import PostEditor from "../PostEditor";

export const metadata: Metadata = {
  title: "New blog post",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!isAuthed(token)) redirect("/admin/login");

  return (
    <div style={pageWrap(900)}>
      <header style={headerRow}>
        <div>
          <p style={eyebrowStyle}>SRJ International</p>
          <h1 style={pageTitleStyle}>New post</h1>
        </div>
      </header>
      <div style={{ marginTop: "1.5rem" }}>
        <PostEditor />
      </div>
    </div>
  );
}
