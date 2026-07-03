import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isAuthed, ADMIN_COOKIE } from "@/lib/adminAuth";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";
import LeadsTable, { type Lead } from "./LeadsTable";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!isAuthed(token)) redirect("/admin/login");

  const supabase = getSupabaseAdmin();
  let leads: Lead[] = [];
  let err: string | null = null;

  if (!supabase) {
    err =
      "Supabase isn't connected yet (set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment: .env.local locally, or the Vercel project settings in production). Leads are still emailed to the team in the meantime.";
  } else {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) err = error.message;
    else leads = (data as Lead[]) || [];
  }

  return (
    <>
      {err ? (
        <div
          style={{
            maxWidth: 1080,
            margin: "1.5rem auto 0",
            padding: "0 1.25rem",
          }}
        >
          <div
            style={{
              border: "1px solid rgba(255,255,255,0.75)",
              background: "rgba(255,255,255,0.86)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              color: "var(--color-secondary)",
              borderRadius: 18,
              padding: "1rem 1.2rem",
              fontSize: "0.85rem",
              lineHeight: 1.55,
              boxShadow: "0 30px 70px -34px rgba(20,50,90,0.55)",
            }}
          >
            {err}
          </div>
        </div>
      ) : null}
      <LeadsTable leads={leads} />
    </>
  );
}
