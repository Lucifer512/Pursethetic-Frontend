"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
  onDelete: (id: string) => void;
};

export default function SortableProductRow({ product, onDelete }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 rounded-3xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.9)] px-4 py-3 shadow-[0_4px_16px_rgba(61,47,28,0.04)] transition"
    >
      {/* Drag handle */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label="Drag to reorder"
        className="shrink-0 cursor-grab touch-none text-(--color-muted) active:cursor-grabbing"
      >
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="9" cy="6" r="1.5" fill="currentColor" />
          <circle cx="15" cy="6" r="1.5" fill="currentColor" />
          <circle cx="9" cy="12" r="1.5" fill="currentColor" />
          <circle cx="15" cy="12" r="1.5" fill="currentColor" />
          <circle cx="9" cy="18" r="1.5" fill="currentColor" />
          <circle cx="15" cy="18" r="1.5" fill="currentColor" />
        </svg>
      </button>

      {/* Image */}
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.7)]">
        <Image
          src={product.image ?? "/banner-1.jpg"}
          alt={product.name}
          fill
          sizes="48px"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-foreground">{product.name}</div>
        <div className="mt-0.5 flex items-center gap-2 text-xs text-(--color-muted)">
          <span>{product.category}</span>
          <span>·</span>
          <span>Rs. {product.price.toLocaleString()}</span>
          {product.featured && (
            <>
              <span>·</span>
              <span className="rounded-full bg-[rgba(155,122,67,0.12)] px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-primary">
                Featured
              </span>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        <Link
          href={`/admin/products/${product.id}`}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[rgba(155,122,67,0.18)] bg-white text-(--color-muted) transition hover:border-[rgba(155,122,67,0.4)] hover:text-primary"
          aria-label={`Edit ${product.name}`}
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </Link>
        <button
          type="button"
          onClick={() => onDelete(product.id)}
          aria-label={`Delete ${product.name}`}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[rgba(200,60,60,0.18)] bg-white text-(--color-muted) transition hover:border-[rgba(200,60,60,0.4)] hover:text-red-500"
        >
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden="true">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </button>
      </div>
    </div>
  );
}
