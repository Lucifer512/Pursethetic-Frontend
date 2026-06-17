import type { Metadata } from "next";
import Link from "next/link";
import { isSupabaseConfigured } from "@/lib/supabase";
import { getCollections } from "@/lib/db";
import AdminCollectionsClient from "@/components/admin/AdminCollectionsClient";

export const metadata: Metadata = { title: "Collections" };
export const dynamic = "force-dynamic";

export default async function AdminCollectionsPage() {
  const dbConnected = isSupabaseConfigured();
  const collections = dbConnected ? await getCollections() : [];

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-primary">Admin</p>
          <h1 className="mt-1 font-serif text-3xl text-foreground">Collections</h1>
          <p className="mt-1 text-sm text-(--color-muted)">
            Curated groupings of products — seasonal edits, promotions, featured sets.
          </p>
        </div>
        {dbConnected && (
          <Link
            href="/admin/collections/new"
            className="flex h-10 shrink-0 cursor-pointer items-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-[#8c6e41]"
          >
            + New collection
          </Link>
        )}
      </div>

      {!dbConnected ? (
        <div className="rounded-4xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.9)] px-8 py-14 text-center">
          <p className="font-serif text-xl text-foreground">Supabase not connected</p>
          <p className="mt-2 text-sm text-(--color-muted)">
            Add your Supabase credentials to{" "}
            <code className="rounded bg-white px-1.5 py-0.5 text-xs">.env.local</code> to manage
            collections.
          </p>
        </div>
      ) : (
        <AdminCollectionsClient initialCollections={collections} />
      )}
    </div>
  );
}
