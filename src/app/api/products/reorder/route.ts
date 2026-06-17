import { cookies } from "next/headers";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session || session !== process.env.ADMIN_SESSION_TOKEN) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return Response.json({ error: "Supabase not configured" }, { status: 503 });
  }

  // Expects: [{ id: string, sort_order: number }, ...]
  const updates: { id: string; sort_order: number }[] = await request.json();

  const sb = createAdminClient();
  const results = await Promise.all(
    updates.map(({ id, sort_order }) =>
      sb.from("products").update({ sort_order }).eq("id", id)
    )
  );

  const failed = results.filter((r) => r.error);
  if (failed.length > 0) {
    return Response.json({ error: "Some updates failed" }, { status: 500 });
  }

  return Response.json({ ok: true });
}
