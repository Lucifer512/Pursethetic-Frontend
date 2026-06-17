import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getCollectionById, getProductIdsInCollection } from "@/lib/db";
import CollectionForm from "@/components/admin/CollectionForm";

export const metadata: Metadata = { title: "Edit Collection" };
export const dynamic = "force-dynamic";

export default async function EditCollectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [collection, products, productIds] = await Promise.all([
    getCollectionById(id),
    getAllProducts(),
    getProductIdsInCollection(id),
  ]);

  if (!collection) notFound();

  return (
    <div>
      <div className="mb-8">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-primary">Admin</p>
        <div className="mt-1 flex items-center gap-2 font-serif text-3xl text-foreground">
          <Link href="/admin/collections" className="text-(--color-muted) hover:text-foreground transition">
            Collections
          </Link>
          <span className="text-(--color-muted)">/</span>
          <span className="truncate">{collection.name}</span>
        </div>
      </div>

      <CollectionForm
        collection={collection}
        products={products}
        initialProductIds={productIds}
      />
    </div>
  );
}
