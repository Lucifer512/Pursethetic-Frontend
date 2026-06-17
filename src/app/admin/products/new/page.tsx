import type { Metadata } from "next";
import Link from "next/link";
import { getCategories } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "New product" };

export default async function AdminNewProductPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-1.5 text-xs text-(--color-muted) transition hover:text-foreground"
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Products
        </Link>
        <h1 className="mt-2 font-serif text-3xl text-foreground">New product</h1>
      </div>

      <ProductForm categories={categories} />
    </div>
  );
}
