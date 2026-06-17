"use client";

import React, { useState } from "react";
import Link from "next/link";
import type { Collection } from "@/lib/db";

type Props = { initialCollections: Collection[] };

export default function AdminCollectionsClient({ initialCollections }: Props) {
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function handleDelete(id: string) {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }
    setDeleteConfirm(null);
    setError("");
    const res = await fetch(`/api/collections/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCollections((prev) => prev.filter((c) => c.id !== id));
    } else {
      const data = await res.json();
      setError(data.error ?? "Failed to delete collection");
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {deleteConfirm && (
        <div className="flex items-center gap-3 rounded-3xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">
          <span>Delete this collection? Products will not be deleted.</span>
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

      {collections.length === 0 ? (
        <div className="rounded-4xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.9)] px-8 py-16 text-center">
          <p className="font-serif text-xl text-foreground">No collections yet</p>
          <p className="mt-2 text-sm text-(--color-muted)">
            Create a collection to group products editorially — Eid Edit, New Arrivals, Best Sellers.
          </p>
          <Link
            href="/admin/collections/new"
            className="mt-6 inline-flex h-10 items-center rounded-full bg-primary px-6 text-sm font-semibold text-white transition hover:bg-[#8c6e41]"
          >
            Create collection
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {collections.map((col) => (
            <div
              key={col.id}
              className="flex items-start gap-4 rounded-3xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.9)] px-5 py-4 shadow-[0_4px_16px_rgba(61,47,28,0.04)]"
            >
              {/* Cover thumbnail */}
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-[rgba(155,122,67,0.08)]">
                {col.cover_image ? (
                  <img
                    src={col.cover_image}
                    alt={col.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="text-(--color-muted)"
                    >
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-foreground">{col.name}</span>
                  {col.badge_text && (
                    <span className="rounded-full bg-[rgba(155,122,67,0.12)] px-2 py-0.5 text-[0.62rem] font-semibold tracking-wide text-primary">
                      {col.badge_text}
                    </span>
                  )}
                  {!col.is_active && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[0.62rem] font-medium text-slate-400">
                      Hidden
                    </span>
                  )}
                </div>
                <p className="mt-0.5 truncate text-xs text-(--color-muted)">
                  {col.tagline || `/${col.slug}`}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/collections/${col.id}`}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[rgba(155,122,67,0.18)] bg-white text-(--color-muted) transition hover:border-[rgba(155,122,67,0.4)] hover:text-primary"
                  aria-label={`Edit ${col.name}`}
                >
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(col.id)}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[rgba(200,60,60,0.18)] bg-white text-(--color-muted) transition hover:border-[rgba(200,60,60,0.4)] hover:text-red-500"
                  aria-label={`Delete ${col.name}`}
                >
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                    <path d="M10 11v6M14 11v6" />
                    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
