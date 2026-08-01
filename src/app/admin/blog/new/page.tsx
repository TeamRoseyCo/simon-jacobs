import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthed, ADMIN_COOKIE } from "@/lib/adminAuth";
import PostEditor from "../PostEditor";

export const metadata: Metadata = {
  title: "New blog post",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function NewBlogPostPage() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!isAuthed(token)) redirect("/admin/login");

  return <PostEditor />;
}
