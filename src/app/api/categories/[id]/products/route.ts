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

  const { data: cat } = await sb
    .from("categories")
    .select("name")
    .eq("id", id)
    .single();

  if (!cat) return Response.json([]);

  const { data, error } = await sb
    .from("products")
    .select("id, slug, name, image, price, category")
    .eq("category", cat.name)
    .order("sort_order", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data ?? []);
}

// Assigns the given product_ids to this category and removes this category
// from any products that are no longer in the selection.
// Body: { product_ids: string[] }
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (!requireAuth(cookieStore.get("admin_session")?.value)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const { product_ids }: { product_ids: string[] } = await request.json();

  if (!isSupabaseConfigured()) {
    return Response.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const sb = createAdminClient();

  const { data: cat, error: catErr } = await sb
    .from("categories")
    .select("name")
    .eq("id", id)
    .single();

  if (catErr || !cat) return Response.json({ error: "Category not found" }, { status: 404 });

  // Remove this category from products that are currently assigned but not in the new list
  const { error: clearErr } = await sb
    .from("products")
    .update({ category_id: null, category: "" })
    .eq("category", cat.name)
    .not("id", "in", `(${product_ids.map((pid) => `"${pid}"`).join(",")})`);

  if (clearErr) return Response.json({ error: clearErr.message }, { status: 500 });

  // Assign selected products to this category
  if (product_ids.length > 0) {
    const { error: assignErr } = await sb
      .from("products")
      .update({ category_id: id, category: cat.name })
      .in("id", product_ids);

    if (assignErr) return Response.json({ error: assignErr.message }, { status: 500 });
  }

  return Response.json({ ok: true });
}
