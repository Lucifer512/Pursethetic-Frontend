"use client";

import React, { useState, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import type { Product } from "@/lib/db";

type Props = {
  products: Product[];
  selected: string[];        // ordered product IDs
  onChange: (ids: string[]) => void;
  sortable?: boolean;        // true = two-panel with drag-to-reorder
};

function SortableChip({
  id,
  product,
  onRemove,
}: {
  id: string;
  product: Product;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.45 : 1,
      }}
      className="flex items-center gap-3 rounded-2xl border border-[rgba(155,122,67,0.15)] bg-white px-3 py-2.5 shadow-[0_2px_8px_rgba(61,47,28,0.04)]"
    >
      <button
        {...attributes}
        {...listeners}
        type="button"
        className="cursor-grab touch-none text-(--color-muted) active:cursor-grabbing"
        aria-label="Drag to reorder"
      >
        <svg width="11" height="15" viewBox="0 0 11 15" fill="currentColor" aria-hidden="true">
          <circle cx="2.5" cy="2.5" r="1.5" />
          <circle cx="8.5" cy="2.5" r="1.5" />
          <circle cx="2.5" cy="7.5" r="1.5" />
          <circle cx="8.5" cy="7.5" r="1.5" />
          <circle cx="2.5" cy="12.5" r="1.5" />
          <circle cx="8.5" cy="12.5" r="1.5" />
        </svg>
      </button>
      <img
        src={product.image}
        alt={product.name}
        className="h-9 w-9 rounded-xl object-cover"
      />
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-foreground">{product.name}</p>
        <p className="text-xs text-(--color-muted)">{product.category}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-red-50 text-red-400 transition hover:bg-red-100 hover:text-red-600"
        aria-label={`Remove ${product.name}`}
      >
        <svg width="9" height="9" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

const searchClass =
  "h-9 w-full rounded-full border border-[rgba(32,26,21,0.12)] bg-white px-4 text-sm outline-none transition placeholder:text-(--color-muted) focus:border-[rgba(155,122,67,0.5)] focus:ring-2 focus:ring-[rgba(155,122,67,0.12)]";

export default function ProductPicker({ products, selected, onChange, sortable = false }: Props) {
  const [search, setSearch] = useState("");

  const productMap = useMemo(() => new Map(products.map((p) => [p.id, p])), [products]);
  const selectedSet = useMemo(() => new Set(selected), [selected]);

  const sensors = useSensors(useSensor(PointerSensor));

  function toggle(id: string) {
    if (selectedSet.has(id)) {
      onChange(selected.filter((sid) => sid !== id));
    } else {
      onChange([...selected, id]);
    }
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (over && active.id !== over.id) {
      const oldIdx = selected.indexOf(active.id as string);
      const newIdx = selected.indexOf(over.id as string);
      onChange(arrayMove(selected, oldIdx, newIdx));
    }
  }

  const filteredAll = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        (!q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)) &&
        !selectedSet.has(p.id)
    );
  }, [products, search, selectedSet]);

  if (sortable) {
    return (
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Left: available products */}
        <div>
          <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-(--color-muted)">
            Available
          </p>
          <input
            type="search"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`mb-2.5 ${searchClass}`}
          />
          <div className="flex max-h-[22rem] flex-col gap-1.5 overflow-y-auto pr-1">
            {filteredAll.length === 0 ? (
              <p className="py-5 text-center text-xs text-(--color-muted)">
                {search ? "No products match." : "All products are selected."}
              </p>
            ) : (
              filteredAll.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => toggle(p.id)}
                  className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[rgba(155,122,67,0.1)] bg-white px-3 py-2 text-left transition hover:border-[rgba(155,122,67,0.3)] hover:bg-[rgba(255,250,241,0.8)]"
                >
                  <img src={p.image} alt={p.name} className="h-8 w-8 rounded-xl object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm text-foreground">{p.name}</p>
                    <p className="text-xs text-(--color-muted)">{p.category}</p>
                  </div>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0 text-primary">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right: selected (sortable) */}
        <div>
          <p className="mb-2 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-(--color-muted)">
            In Collection ({selected.length})
          </p>
          <div className="flex max-h-[24rem] flex-col gap-1.5 overflow-y-auto pr-1">
            {selected.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-[rgba(155,122,67,0.22)] py-10 text-center">
                <p className="text-xs text-(--color-muted)">Add products from the left</p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={selected} strategy={verticalListSortingStrategy}>
                  {selected.map((id) => {
                    const p = productMap.get(id);
                    if (!p) return null;
                    return (
                      <SortableChip
                        key={id}
                        id={id}
                        product={p}
                        onRemove={() => toggle(id)}
                      />
                    );
                  })}
                </SortableContext>
              </DndContext>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Non-sortable: simple checkbox list
  return (
    <div>
      <input
        type="search"
        placeholder="Search products…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`mb-3 ${searchClass}`}
      />
      <div className="flex max-h-[22rem] flex-col gap-1.5 overflow-y-auto pr-1">
        {products
          .filter((p) => {
            const q = search.toLowerCase();
            return !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
          })
          .map((p) => {
            const checked = selectedSet.has(p.id);
            return (
              <label
                key={p.id}
                className="flex cursor-pointer items-center gap-3 rounded-2xl border border-[rgba(155,122,67,0.1)] bg-white px-3 py-2 transition hover:border-[rgba(155,122,67,0.25)] hover:bg-[rgba(255,250,241,0.6)]"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(p.id)}
                  className="h-4 w-4 accent-primary"
                />
                <img src={p.image} alt={p.name} className="h-8 w-8 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm text-foreground">{p.name}</p>
                </div>
                <span className="shrink-0 text-xs text-(--color-muted)">{p.category}</span>
              </label>
            );
          })}
      </div>
    </div>
  );
}
