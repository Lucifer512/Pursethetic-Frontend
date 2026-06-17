"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import type { Collection, Product } from "@/lib/db";
import ProductPicker from "./ProductPicker";

type Props = {
  collection?: Collection;
  products: Product[];
  initialProductIds?: string[];
};

const inputClass =
  "h-10 w-full rounded-full border border-[rgba(32,26,21,0.12)] bg-white px-4 text-sm text-foreground outline-none transition placeholder:text-(--color-muted) focus:border-[rgba(155,122,67,0.5)] focus:ring-2 focus:ring-[rgba(155,122,67,0.12)]";
const textareaClass =
  "w-full resize-none rounded-2xl border border-[rgba(32,26,21,0.12)] bg-white px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-(--color-muted) focus:border-[rgba(155,122,67,0.5)] focus:ring-2 focus:ring-[rgba(155,122,67,0.12)]";
const labelClass = "mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-(--color-muted)";

function toSlug(s: string) {
  return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export default function CollectionForm({ collection, products, initialProductIds = [] }: Props) {
  const isEdit = Boolean(collection);
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>(initialProductIds);

  const [form, setForm] = useState({
    name: collection?.name ?? "",
    slug: collection?.slug ?? "",
    tagline: collection?.tagline ?? "",
    description: collection?.description ?? "",
    cover_image: collection?.cover_image ?? "",
    badge_text: collection?.badge_text ?? "",
    is_active: collection?.is_active ?? true,
  });

  function handleNameChange(name: string) {
    setForm((f) => ({
      ...f,
      name,
      // Auto-derive slug only on create, not on edit
      ...(isEdit ? {} : { slug: toSlug(name) }),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.slug.trim()) {
      setError("Name and slug are required.");
      return;
    }
    setSaving(true);
    setError("");

    try {
      // 1. Create or update the collection
      const url = isEdit ? `/api/collections/${collection!.id}` : "/api/collections";
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save collection");

      const collectionId: string = isEdit ? collection!.id : data.id;

      // 2. Sync products (ordered by their position in selectedProducts array)
      const payload = selectedProducts.map((product_id, i) => ({
        product_id,
        sort_order: i,
      }));
      const prodRes = await fetch(`/api/collections/${collectionId}/products`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!prodRes.ok) {
        const pd = await prodRes.json();
        throw new Error(pd.error ?? "Collection saved but failed to sync products");
      }

      router.push("/admin/collections");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-5">
      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="col-name" className={labelClass}>Name *</label>
          <input
            id="col-name"
            value={form.name}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Eid Edit 2026"
            required
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="col-slug" className={labelClass}>Slug *</label>
          <input
            id="col-slug"
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: toSlug(e.target.value) }))}
            placeholder="eid-edit-2026"
            required
            className={inputClass}
          />
          <p className="mt-1 px-4 text-[0.65rem] text-(--color-muted)">Used in URL: /collection?set=slug</p>
        </div>
      </div>

      <div>
        <label htmlFor="col-tagline" className={labelClass}>Tagline</label>
        <input
          id="col-tagline"
          value={form.tagline}
          onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
          placeholder="Crafted for the occasion."
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="col-description" className={labelClass}>Description</label>
        <textarea
          id="col-description"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="A curated selection of our finest pieces for the season."
          rows={3}
          className={textareaClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="col-cover" className={labelClass}>Cover Image URL</label>
          <input
            id="col-cover"
            value={form.cover_image}
            onChange={(e) => setForm((f) => ({ ...f, cover_image: e.target.value }))}
            placeholder="https://… or /image.jpg"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="col-badge" className={labelClass}>Badge Text</label>
          <input
            id="col-badge"
            value={form.badge_text}
            onChange={(e) => setForm((f) => ({ ...f, badge_text: e.target.value }))}
            placeholder="New · Limited Edition · Sale"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="col-active"
          type="checkbox"
          checked={form.is_active}
          onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
          className="h-4 w-4 accent-primary"
        />
        <label htmlFor="col-active" className="cursor-pointer text-sm text-foreground">
          Active{" "}
          <span className="text-(--color-muted)">(visible on storefront)</span>
        </label>
      </div>

      <hr className="border-[rgba(155,122,67,0.12)]" />

      <div>
        <p className={labelClass}>Products in this collection</p>
        <p className="mb-4 text-xs text-(--color-muted)">
          Select products and drag to set their order within this collection.
        </p>
        <ProductPicker
          products={products}
          selected={selectedProducts}
          onChange={setSelectedProducts}
          sortable
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="h-11 cursor-pointer rounded-full bg-primary px-7 text-sm font-semibold text-white transition hover:bg-[#8c6e41] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create collection"}
        </button>
        <a
          href="/admin/collections"
          className="flex h-11 items-center rounded-full px-5 text-sm text-(--color-muted) transition hover:text-foreground"
        >
          Cancel
        </a>
      </div>
    </form>
  );
}
