import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/db";
import { isSupabaseConfigured } from "@/lib/supabase";
import AdminProductsClient from "@/components/admin/AdminProductsClient";

export const metadata: Metadata = { title: "Products" };
export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await getAllProducts();
  const dbConnected = isSupabaseConfigured();

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-primary">
            Admin
          </p>
          <h1 className="mt-1 font-serif text-3xl text-foreground">Products</h1>
          <p className="mt-1 text-sm text-(--color-muted)">
            {products.length} product{products.length === 1 ? "" : "s"}
            {!dbConnected && (
              <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-amber-700">
                Static data — Supabase not connected
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {dbConnected && (
            <SeedButton />
          )}
          <Link
            href="/admin/products/new"
            className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#8c6e41]"
          >
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add product
          </Link>
        </div>
      </div>

      <AdminProductsClient initialProducts={products} />
    </div>
  );
}

function SeedButton() {
  return (
    <form action="/api/admin/seed" method="POST">
      <button
        type="submit"
        formMethod="POST"
        className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-[rgba(155,122,67,0.24)] bg-white px-5 text-sm font-medium text-(--color-muted) transition hover:border-[rgba(155,122,67,0.5)] hover:text-foreground"
      >
        Seed from static data
      </button>
    </form>
  );
}
