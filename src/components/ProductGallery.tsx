"use client";
import React, { useState } from "react";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { featuredProducts } from "../data/products";

export default function ProductGallery() {
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const product = featuredProducts.find((p) => p.id === quickViewId);
  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="headline-text text-3xl font-serif font-bold mb-8 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {featuredProducts.map((p) => (
          <ProductCard key={p.id} {...p} onQuickView={() => setQuickViewId(p.id)} />
        ))}
      </div>
      <QuickViewModal open={!!product} product={product} onClose={() => setQuickViewId(null)} />
    </section>
  );
}
