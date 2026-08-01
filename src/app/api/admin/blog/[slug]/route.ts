import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { isAuthed, ADMIN_COOKIE } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import { validatePostPayload } from "../validate";

export const runtime = "nodejs";

// Update an existing post. The route param is the ORIGINAL slug; the payload
// may rename it, which is why the row keeps its own slug and we .eq() on the
// param rather than the payload's slug.
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug: originalSlug } = await params;
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!isAuthed(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const validated = validatePostPayload(body);
  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Storage is not configured." },
      { status: 503 },
    );
  }

  const { error } = await supabase
    .from("blog_posts")
    .update({ ...validated.row, updated_at: new Date().toISOString() })
    .eq("slug", originalSlug);
  if (error) {
    const message =
      error.code === "23505"
        ? "A post with that slug already exists."
        : error.message;
    return NextResponse.json({ error: message }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/scorecard");
  revalidatePath(`/blog/${originalSlug}`);
  revalidatePath(`/blog/${validated.row.slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!isAuthed(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Storage is not configured." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("blog_posts").delete().eq("slug", slug);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/scorecard");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");

  return NextResponse.json({ ok: true });
}
