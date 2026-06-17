import { products as staticProducts, type Product } from "../data/products";
import { isSupabaseConfigured, createAdminClient } from "./supabase";

export type { Product };

export type Category = {
  id: string;         // UUID
  slug: string;
  name: string;
  description: string;
  image: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type Collection = {
  id: string;         // UUID
  slug: string;
  name: string;
  tagline: string;
  description: string;
  cover_image: string;
  badge_text: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type ProductCollection = {
  product_id: string;
  collection_id: string;
  sort_order: number;
};

// ─── Products ────────────────────────────────────────────────────────────────

export async function getAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return staticProducts;

  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) return staticProducts;
    return data.map(rowToProduct);
  } catch {
    return staticProducts;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) {
    return staticProducts.filter((p) => p.featured);
  }

  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("products")
      .select("*")
      .eq("featured", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticProducts.filter((p) => p.featured);
    }
    return data.map(rowToProduct);
  } catch {
    return staticProducts.filter((p) => p.featured);
  }
}

export async function getProductById(id: string): Promise<Product | undefined> {
  if (!isSupabaseConfigured()) {
    return staticProducts.find((p) => p.id === id);
  }

  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return staticProducts.find((p) => p.id === id);
    return rowToProduct(data);
  } catch {
    return staticProducts.find((p) => p.id === id);
  }
}

export async function getProductIds(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return staticProducts.map((p) => p.id);
  }

  try {
    const sb = createAdminClient();
    const { data, error } = await sb.from("products").select("id");
    if (error || !data) return staticProducts.map((p) => p.id);
    return data.map((r: { id: string }) => r.id);
  } catch {
    return staticProducts.map((p) => p.id);
  }
}

export async function getProductsByCollection(collectionSlug: string): Promise<Product[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("products")
      .select("*, product_collections!inner(sort_order, collections!inner(slug))")
      .eq("product_collections.collections.slug", collectionSlug)
      .order("sort_order", { referencedTable: "product_collections", ascending: true });

    if (error || !data) return [];
    return data.map(rowToProduct);
  } catch {
    return [];
  }
}

// ─── Categories ───────────────────────────────────────────────────────────────

// Returns category display names for use in filters and datalists.
export async function getCategories(): Promise<string[]> {
  if (!isSupabaseConfigured()) {
    return ["All", ...Array.from(new Set(staticProducts.map((p) => p.category)))];
  }

  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("categories")
      .select("name")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return ["All", ...Array.from(new Set(staticProducts.map((p) => p.category)))];
    }
    return ["All", ...data.map((r: { name: string }) => r.name)];
  } catch {
    return ["All", ...Array.from(new Set(staticProducts.map((p) => p.category)))];
  }
}

// Returns full Category objects for admin use.
export async function getCategoryList(): Promise<Category[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data as Category[];
  } catch {
    return [];
  }
}

// ─── Collections ──────────────────────────────────────────────────────────────

export async function getCollections(): Promise<Collection[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("collections")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data as Collection[];
  } catch {
    return [];
  }
}

export async function getCollectionById(id: string): Promise<Collection | undefined> {
  if (!isSupabaseConfigured()) return undefined;

  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("collections")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) return undefined;
    return data as Collection;
  } catch {
    return undefined;
  }
}

export async function getProductIdsInCollection(collectionId: string): Promise<string[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("product_collections")
      .select("product_id")
      .eq("collection_id", collectionId)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data.map((r: { product_id: string }) => r.product_id);
  } catch {
    return [];
  }
}

export async function getCollectionBySlug(slug: string): Promise<Collection | undefined> {
  if (!isSupabaseConfigured()) return undefined;

  try {
    const sb = createAdminClient();
    const { data, error } = await sb
      .from("collections")
      .select("*")
      .eq("slug", slug)
      .eq("is_active", true)
      .single();

    if (error || !data) return undefined;
    return data as Collection;
  } catch {
    return undefined;
  }
}

// ─── Row → Product mapping ────────────────────────────────────────────────────

function rowToProduct(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    slug: row.slug as string,
    name: row.name as string,
    price: row.price as number,
    category: row.category as string,
    description: (row.description as string) ?? "",
    details: (row.details as string) ?? "",
    shipping: (row.shipping as string) ?? "Nationwide shipping. Free on orders over Rs. 4,000.",
    care: (row.care as string) ?? "Wipe gently with a damp cloth. Store in a dust bag when not in use.",
    featured: (row.featured as boolean) ?? false,
    image: (row.image as string) ?? "/banner-1.jpg",
    secondaryImage: (row.secondary_image as string) || undefined,
    images: (row.images as string[]) ?? [row.image as string],
    tags: (row.tags as string[]) ?? [],
  };
}
