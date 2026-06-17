"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Product } from "@/data/products";

type FormState = {
  name: string;
  slug: string;
  price: string;
  category: string;
  description: string;
  details: string;
  shipping: string;
  care: string;
  featured: boolean;
  image: string;
  secondary_image: string;
  images: string;
};

const DEFAULT_SHIPPING = "Nationwide shipping. Free on orders over Rs. 4,000.";
const DEFAULT_CARE = "Wipe gently with a damp cloth. Store in a dust bag when not in use.";

function productToForm(p: Product): FormState {
  return {
    name: p.name,
    slug: p.slug,
    price: String(p.price),
    category: p.category,
    description: p.description,
    details: p.details,
    shipping: p.shipping ?? DEFAULT_SHIPPING,
    care: p.care ?? DEFAULT_CARE,
    featured: p.featured ?? false,
    image: p.image ?? "",
    secondary_image: p.secondaryImage ?? "",
    images: (p.images ?? []).join("\n"),
  };
}

const empty: FormState = {
  name: "",
  slug: "",
  price: "",
  category: "",
  description: "",
  details: "",
  shipping: DEFAULT_SHIPPING,
  care: DEFAULT_CARE,
  featured: false,
  image: "",
  secondary_image: "",
  images: "",
};

const inputClass =
  "h-11 w-full rounded-full border border-[rgba(32,26,21,0.12)] bg-white px-5 text-sm text-foreground outline-none transition placeholder:text-(--color-muted) focus:border-[rgba(155,122,67,0.5)] focus:ring-2 focus:ring-[rgba(155,122,67,0.12)]";
const textareaClass =
  "w-full rounded-3xl border border-[rgba(32,26,21,0.12)] bg-white px-5 py-3 text-sm text-foreground outline-none transition placeholder:text-(--color-muted) focus:border-[rgba(155,122,67,0.5)] focus:ring-2 focus:ring-[rgba(155,122,67,0.12)]";
const labelClass =
  "block text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-(--color-muted)";

type Props = {
  product?: Product;
  categories: string[];
};

export default function ProductForm({ product, categories }: Props) {
  const router = useRouter();
  const [form, setForm] = useState<FormState>(product ? productToForm(product) : empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isEdit = Boolean(product);

  function set(key: keyof FormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function autoSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  useEffect(() => {
    if (!isEdit && form.name && !form.slug) {
      set("slug", autoSlug(form.name));
    }
  }, [form.name]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      set("image", data.url);
      // prepend to images list
      const existing = form.images.trim();
      set("images", existing ? `${data.url}\n${existing}` : data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      price: parseInt(form.price, 10),
      category: form.category.trim(),
      description: form.description.trim(),
      details: form.details.trim(),
      shipping: form.shipping.trim(),
      care: form.care.trim(),
      featured: form.featured,
      image: form.image.trim(),
      secondary_image: form.secondary_image.trim() || null,
      images: form.images
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const url = isEdit ? `/api/products/${product!.id}` : "/api/products";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      router.push("/admin/products");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Basic info */}
      <section className="rounded-4xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.9)] p-6 shadow-[0_8px_30px_rgba(61,47,28,0.05)]">
        <h2 className="mb-5 font-serif text-xl text-foreground">Basic info</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className={labelClass}>Name</label>
            <input id="name" required value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Hobo Brown" className={inputClass} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="slug" className={labelClass}>Slug (URL)</label>
            <input id="slug" required value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="hobo-brown" className={inputClass} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="price" className={labelClass}>Price (PKR)</label>
            <input id="price" type="number" required min="0" value={form.price} onChange={(e) => set("price", e.target.value)} placeholder="2800" className={inputClass} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="category" className={labelClass}>Category</label>
            <input
              id="category"
              required
              list="categories-list"
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              placeholder="Hobo"
              className={inputClass}
            />
            <datalist id="categories-list">
              {categories.filter((c) => c !== "All").map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>

          <div className="flex items-center gap-3 sm:col-span-2">
            <input
              id="featured"
              type="checkbox"
              checked={form.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="h-4 w-4 cursor-pointer accent-[var(--color-primary)]"
            />
            <label htmlFor="featured" className="cursor-pointer text-sm text-foreground">
              Featured on homepage
            </label>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="rounded-4xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.9)] p-6 shadow-[0_8px_30px_rgba(61,47,28,0.05)]">
        <h2 className="mb-5 font-serif text-xl text-foreground">Description</h2>
        <div className="grid gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className={labelClass}>Short description</label>
            <textarea id="description" rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="A classic brown hobo bag…" className={textareaClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="details" className={labelClass}>Product details</label>
            <textarea id="details" rows={3} value={form.details} onChange={(e) => set("details", e.target.value)} placeholder="Soft-structured hobo silhouette…" className={textareaClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="shipping" className={labelClass}>Shipping info</label>
            <input id="shipping" value={form.shipping} onChange={(e) => set("shipping", e.target.value)} className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="care" className={labelClass}>Care instructions</label>
            <input id="care" value={form.care} onChange={(e) => set("care", e.target.value)} className={inputClass} />
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="rounded-4xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.9)] p-6 shadow-[0_8px_30px_rgba(61,47,28,0.05)]">
        <h2 className="mb-5 font-serif text-xl text-foreground">Images</h2>

        {/* Upload */}
        <div className="mb-5 flex items-center gap-4">
          {form.image && (
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[rgba(155,122,67,0.14)]">
              <Image src={form.image} alt="Primary" fill sizes="80px" className="object-cover" />
            </div>
          )}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className="inline-flex h-10 cursor-pointer items-center gap-2 rounded-full border border-[rgba(155,122,67,0.24)] bg-white px-5 text-sm font-medium text-(--color-muted) transition hover:border-[rgba(155,122,67,0.5)] hover:text-foreground"
            >
              {uploadingImage ? (
                "Uploading…"
              ) : (
                <>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload image
                </>
              )}
            </label>
            <p className="mt-1 text-xs text-(--color-muted)">Uploads to Supabase Storage. Or paste URLs below.</p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className={labelClass}>Primary image URL</label>
            <input id="image" value={form.image} onChange={(e) => set("image", e.target.value)} placeholder="/banner-1.jpg or https://…" className={inputClass} />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="secondary_image" className={labelClass}>Secondary image URL</label>
            <input id="secondary_image" value={form.secondary_image} onChange={(e) => set("secondary_image", e.target.value)} placeholder="/banner-2.jpg" className={inputClass} />
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2">
            <label htmlFor="images" className={labelClass}>All image URLs (one per line)</label>
            <textarea id="images" rows={4} value={form.images} onChange={(e) => set("images", e.target.value)} placeholder="/banner-1.jpg&#10;/banner-2.jpg" className={textareaClass} />
          </div>
        </div>
      </section>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="h-11 cursor-pointer rounded-full bg-primary px-8 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#8c6e41] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create product"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/products")}
          className="h-11 cursor-pointer rounded-full border border-[rgba(155,122,67,0.2)] bg-white px-6 text-sm font-medium text-(--color-muted) transition hover:border-[rgba(155,122,67,0.4)] hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
