import { cookies } from "next/headers";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import { products } from "@/data/products";

function requireAuth(session: string | undefined) {
  return session && session === process.env.ADMIN_SESSION_TOKEN;
}

export async function GET() {
  if (!isSupabaseConfigured()) {
    const cats = Array.from(new Set(products.map((p) => p.category))).map((name, i) => ({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      description: "",
      image: "",
      sort_order: i,
    }));
    return Response.json(cats);
  }

  const sb = createAdminClient();
  const { data, error } = await sb
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  if (!requireAuth(cookieStore.get("admin_session")?.value)) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return Response.json({ error: "Supabase not configured" }, { status: 503 });
  }

  const body = await request.json();
  const sb = createAdminClient();
  const { data, error } = await sb
    .from("categories")
    .insert([body])
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json(data, { status: 201 });
}
