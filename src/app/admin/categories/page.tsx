import type { Metadata } from "next";
import { isSupabaseConfigured } from "@/lib/supabase";
import { getCategoryList, getAllProducts } from "@/lib/db";
import AdminCategoriesClient from "@/components/admin/AdminCategoriesClient";

export const metadata: Metadata = { title: "Categories" };
export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const dbConnected = isSupabaseConfigured();
  const [categories, allProducts] = dbConnected
    ? await Promise.all([getCategoryList(), getAllProducts()])
    : [[], []];

  return (
    <div>
      <div className="mb-8">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-primary">Admin</p>
        <h1 className="mt-1 font-serif text-3xl text-foreground">Categories</h1>
        {!dbConnected && (
          <p className="mt-2 rounded-3xl border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-700">
            Categories are managed in Supabase. Connect Supabase to manage categories here.
          </p>
        )}
      </div>

      {dbConnected ? (
        <AdminCategoriesClient initialCategories={categories} allProducts={allProducts} />
      ) : (
        <div className="rounded-4xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.9)] px-8 py-14 text-center">
          <p className="font-serif text-xl text-foreground">Supabase not connected</p>
          <p className="mt-2 text-sm text-(--color-muted)">
            Add your Supabase credentials to <code className="rounded bg-white px-1.5 py-0.5 text-xs">.env.local</code> to manage categories.
          </p>
        </div>
      )}
    </div>
  );
}
