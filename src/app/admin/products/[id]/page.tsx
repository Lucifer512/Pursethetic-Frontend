import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getCategories } from "@/lib/db";
import ProductForm from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Edit product" };
export const dynamic = "force-dynamic";

export default async function AdminEditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product) notFound();

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
        <h1 className="mt-2 font-serif text-3xl text-foreground">Edit product</h1>
        <p className="mt-1 text-sm text-(--color-muted)">{product.name}</p>
      </div>

      <ProductForm product={product} categories={categories} />
    </div>
  );
}
