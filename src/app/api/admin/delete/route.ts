import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAuthed, ADMIN_COOKIE } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!isAuthed(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json().catch(() => ({ id: undefined }));
  if (id === undefined || id === null || id === "") {
    return NextResponse.json({ error: "Missing id." }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json(
      { error: "Storage is not configured." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
