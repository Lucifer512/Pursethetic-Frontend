import { cookies } from "next/headers";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import type { NextRequest } from "next/server";

function requireAuth(session: string | undefined) {
  return session && session === process.env.ADMIN_SESSION_TOKEN;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!isSupabaseConfigured()) return Response.json([]);

  const sb = createAdminClient();
  const { data, error } = await sb
    .from("product_collections")
    .select("product_id, sort_order")
    .eq("collection_id", id)
    .order("sort_order", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data ?? []);
}

// Replaces the full product list for this collection.
// Body: [{ product_id: string, sort_order: number }, ...]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (!requireAuth(cookieStore.get("admin_session")?.value)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body: Array<{ product_id: string; sort_order: number }> = await request.json();

  if (!isSupabaseConfigured()) {
    return Response.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const sb = createAdminClient();

  const { error: delError } = await sb
    .from("product_collections")
    .delete()
    .eq("collection_id", id);

  if (delError) return Response.json({ error: delError.message }, { status: 500 });

  if (body.length > 0) {
    const rows = body.map(({ product_id, sort_order }) => ({
      collection_id: id,
      product_id,
      sort_order,
    }));
    const { error: insError } = await sb.from("product_collections").insert(rows);
    if (insError) return Response.json({ error: insError.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
