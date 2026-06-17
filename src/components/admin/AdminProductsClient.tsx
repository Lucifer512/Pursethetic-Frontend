"use client";

import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import type { Product } from "@/data/products";
import SortableProductRow from "./SortableProductRow";

type Props = { initialProducts: Product[] };

export default function AdminProductsClient({ initialProducts }: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = products.findIndex((p) => p.id === active.id);
    const newIndex = products.findIndex((p) => p.id === over.id);
    const reordered = arrayMove(products, oldIndex, newIndex);
    setProducts(reordered);

    setSaving(true);
    try {
      await fetch("/api/products/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reordered.map((p, i) => ({ id: p.id, sort_order: i }))),
      });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (deleteConfirm !== id) {
      setDeleteConfirm(id);
      return;
    }

    setDeleteConfirm(null);
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  }

  if (products.length === 0) {
    return (
      <div className="rounded-4xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.9)] px-8 py-16 text-center">
        <p className="font-serif text-xl text-foreground">No products yet</p>
        <p className="mt-2 text-sm text-(--color-muted)">
          Add your first product or seed the database from existing static data.
        </p>
      </div>
    );
  }

  return (
    <>
      {saving && (
        <p className="mb-3 text-xs text-(--color-muted)">Saving order…</p>
      )}
      {deleteConfirm && (
        <div className="mb-4 flex items-center gap-3 rounded-3xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">
          <span>Delete this product? This cannot be undone.</span>
          <button
            type="button"
            onClick={() => handleDelete(deleteConfirm)}
            className="cursor-pointer rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-red-700"
          >
            Confirm delete
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

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={products.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-2">
            {products.map((product) => (
              <SortableProductRow
                key={product.id}
                product={product}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
}
