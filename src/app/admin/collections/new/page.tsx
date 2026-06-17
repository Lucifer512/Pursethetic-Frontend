import type { Metadata } from "next";
import Link from "next/link";
import { getAllProducts } from "@/lib/db";
import CollectionForm from "@/components/admin/CollectionForm";

export const metadata: Metadata = { title: "New Collection" };
export const dynamic = "force-dynamic";

export default async function NewCollectionPage() {
  const products = await getAllProducts();

  return (
    <div>
      <div className="mb-8">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-primary">Admin</p>
        <div className="mt-1 flex items-center gap-2 font-serif text-3xl text-foreground">
          <Link href="/admin/collections" className="text-(--color-muted) hover:text-foreground transition">
            Collections
          </Link>
          <span className="text-(--color-muted)">/</span>
          <span>New</span>
        </div>
      </div>

      <CollectionForm products={products} />
    </div>
  );
}
