import { cookies } from "next/headers";
import { createAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import { products } from "@/data/products";

export async function POST() {
  // Auth check
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session || session !== process.env.ADMIN_SESSION_TOKEN) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    return Response.json({ error: "Supabase is not configured" }, { status: 503 });
  }

  const sb = createAdminClient();

  // Seed categories (UUID PK is auto-generated; upsert on name which is UNIQUE)
  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));
  const categoryRows = uniqueCategories.map((name, i) => ({
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    sort_order: i,
  }));

  const { error: catError } = await sb
    .from("categories")
    .upsert(categoryRows, { onConflict: "name" });

  if (catError) {
    return Response.json({ error: catError.message }, { status: 500 });
  }

  // Fetch category UUIDs so we can set category_id on products
  const { data: catRows } = await sb.from("categories").select("id, name");
  const catIdByName: Record<string, string> = {};
  for (const c of catRows ?? []) {
    catIdByName[c.name] = c.id;
  }

  // Seed products
  const productRows = products.map((p, i) => ({
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    category: p.category,
    category_id: catIdByName[p.category] ?? null,
    description: p.description,
    details: p.details,
    shipping: p.shipping,
    care: p.care,
    featured: p.featured ?? false,
    sort_order: i,
    image: p.image,
    secondary_image: p.secondaryImage ?? "",
    images: p.images,
    tags: p.tags ?? [],
  }));

  const { error: prodError } = await sb
    .from("products")
    .upsert(productRows, { onConflict: "id" });

  if (prodError) {
    return Response.json({ error: prodError.message }, { status: 500 });
  }

  return Response.json({ ok: true, seeded: products.length });
}
