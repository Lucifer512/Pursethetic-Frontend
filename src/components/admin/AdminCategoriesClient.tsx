"use client";

import React, { useState } from "react";
import type { Category, Product } from "@/lib/db";
import ProductPicker from "./ProductPicker";

type Props = {
  initialCategories: Category[];
  allProducts: Product[];
};

const inputClass =
  "h-10 w-full rounded-full border border-[rgba(32,26,21,0.12)] bg-white px-4 text-sm text-foreground outline-none transition placeholder:text-(--color-muted) focus:border-[rgba(155,122,67,0.5)] focus:ring-2 focus:ring-[rgba(155,122,67,0.12)]";

export default function AdminCategoriesClient({ initialCategories, allProducts }: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newName, setNewName] = useState("");
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Product assignment panel
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // Tracks pending product selections per category (keyed by category id)
  const [pendingProducts, setPendingProducts] = useState<Record<string, string[]>>({});
  const [savingProducts, setSavingProducts] = useState<string | null>(null);

  function getProductIdsForCategory(catName: string): string[] {
    return allProducts.filter((p) => p.category === catName).map((p) => p.id);
  }

  function getSelectedForCat(cat: Category): string[] {
    return pendingProducts[cat.id] ?? getProductIdsForCategory(cat.name);
  }

  function toggleExpand(catId: string) {
    setExpandedId((prev) => (prev === catId ? null : catId));
  }

  async function saveProducts(cat: Category) {
    const ids = getSelectedForCat(cat);
    setSavingProducts(cat.id);
    setError("");
    try {
      const res = await fetch(`/api/categories/${cat.id}/products`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_ids: ids }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to save");
      // Persist the saved selection so re-opening shows correct state
      setPendingProducts((prev) => ({ ...prev, [cat.id]: ids }));
      setExpandedId(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save products");
    } finally {
      setSavingProducts(null);
    }
  }

  // ── Category CRUD ──────────────────────────────────────────────────────────

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    setError("");
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: newName.trim().toLowerCase().replace(/\s+/g, "-"),
          name: newName.trim(),
          sort_order: categories.length,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to add");
      setCategories((prev) => [...prev, data]);
      setNewName("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to add");
    } finally {
      setAdding(false);
    }
  }

  async function handleSaveEdit(id: string) {
    if (!editName.trim()) return;
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to update");
      setCategories((prev) => prev.map((c) => (c.id === id ? data : c)));
      setEditing(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update");
    }
  }

  async function handleDelete(id: string) {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }
    setDeleteConfirm(null);
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCategories((prev) => prev.filter((c) => c.id !== id));
      if (expandedId === id) setExpandedId(null);
    }
  }

  return (
    <div className="space-y-5">
      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Add new */}
      <form onSubmit={handleAdd} className="flex gap-3">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New category name…"
          className={inputClass}
        />
        <button
          type="submit"
          disabled={adding || !newName.trim()}
          className="h-10 shrink-0 cursor-pointer rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-[#8c6e41] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {adding ? "Adding…" : "Add"}
        </button>
      </form>

      {deleteConfirm && (
        <div className="flex items-center gap-3 rounded-3xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">
          <span>Delete this category? Products will keep their category text but lose the FK link.</span>
          <button
            type="button"
            onClick={() => handleDelete(deleteConfirm)}
            className="cursor-pointer rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
          >
            Confirm
          </button>
          <button
            type="button"
            onClick={() => setDeleteConfirm(null)}
            className="cursor-pointer text-xs font-medium text-red-500 hover:text-red-700"
          >
            Cancel
          </button>
        </div>
      )}

      {categories.length === 0 ? (
        <div className="rounded-4xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.9)] px-8 py-12 text-center">
          <p className="text-sm text-(--color-muted)">No categories yet. Add one above.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {categories.map((cat) => {
            const isExpanded = expandedId === cat.id;
            const productCount = getSelectedForCat(cat).length;

            return (
              <div
                key={cat.id}
                className="overflow-hidden rounded-3xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.9)] shadow-[0_4px_16px_rgba(61,47,28,0.04)]"
              >
                {/* Category row */}
                <div className="flex items-center gap-4 px-5 py-3">
                  {editing === cat.id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSaveEdit(cat.id);
                      }}
                      className="flex flex-1 items-center gap-3"
                    >
                      <input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                        className={inputClass}
                      />
                      <button
                        type="submit"
                        className="cursor-pointer rounded-full bg-primary px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#8c6e41]"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditing(null)}
                        className="cursor-pointer text-xs text-(--color-muted) hover:text-foreground"
                      >
                        Cancel
                      </button>
                    </form>
                  ) : (
                    <>
                      <span className="flex-1 text-sm font-medium text-foreground">
                        {cat.name}
                      </span>

                      {/* Product toggle */}
                      <button
                        type="button"
                        onClick={() => toggleExpand(cat.id)}
                        className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                          isExpanded
                            ? "border-[rgba(155,122,67,0.4)] bg-[rgba(155,122,67,0.1)] text-primary"
                            : "border-[rgba(155,122,67,0.18)] text-(--color-muted) hover:border-[rgba(155,122,67,0.35)] hover:text-foreground"
                        }`}
                        aria-expanded={isExpanded}
                      >
                        <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                          <rect x="2" y="3" width="7" height="7" rx="1" />
                          <rect x="15" y="3" width="7" height="7" rx="1" />
                          <rect x="2" y="14" width="7" height="7" rx="1" />
                          <rect x="15" y="14" width="7" height="7" rx="1" />
                        </svg>
                        {productCount} product{productCount !== 1 ? "s" : ""}
                        <svg
                          width="10"
                          height="10"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          className={`transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>

                      {/* Edit */}
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(cat.id);
                          setEditName(cat.name);
                        }}
                        aria-label={`Edit ${cat.name}`}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[rgba(155,122,67,0.18)] bg-white text-(--color-muted) transition hover:border-[rgba(155,122,67,0.4)] hover:text-primary"
                      >
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>

                      {/* Delete */}
                      <button
                        type="button"
                        onClick={() => handleDelete(cat.id)}
                        aria-label={`Delete ${cat.name}`}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[rgba(200,60,60,0.18)] bg-white text-(--color-muted) transition hover:border-[rgba(200,60,60,0.4)] hover:text-red-500"
                      >
                        <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>

                {/* Product assignment panel */}
                {isExpanded && (
                  <div className="border-t border-[rgba(155,122,67,0.1)] bg-white px-5 py-5">
                    <p className="mb-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-(--color-muted)">
                      Products in {cat.name}
                    </p>
                    <p className="mb-4 text-xs text-(--color-muted)">
                      Check products to assign them to this category. Unchecking removes them.
                    </p>
                    <ProductPicker
                      products={allProducts}
                      selected={getSelectedForCat(cat)}
                      onChange={(ids) =>
                        setPendingProducts((prev) => ({ ...prev, [cat.id]: ids }))
                      }
                    />
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => saveProducts(cat)}
                        disabled={savingProducts === cat.id}
                        className="h-9 cursor-pointer rounded-full bg-primary px-5 text-sm font-semibold text-white transition hover:bg-[#8c6e41] disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {savingProducts === cat.id ? "Saving…" : "Save assignments"}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setExpandedId(null);
                          // Reset pending changes for this category
                          setPendingProducts((prev) => {
                            const next = { ...prev };
                            delete next[cat.id];
                            return next;
                          });
                        }}
                        className="text-sm text-(--color-muted) transition hover:text-foreground"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
