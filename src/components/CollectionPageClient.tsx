"use client";

import React, { useMemo, useState } from "react";
import { Menu, MenuItem, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import { useShop } from "../context/ShopContext";
import ProductCard from "./ProductCard";
import Button from "./ui/Button";
import { BRAND } from "../styles/tokens";
import { products, type Product } from "../data/products";

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low"];

type Props = {
  initialCategory?: string;
};

export default function CollectionPageClient({ initialCategory = "All" }: Props) {
  const { addToCart } = useShop();
  const allProducts = products;
  const categories = ["All", ...Array.from(new Set(allProducts.map((product) => product.category)))];
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("Featured");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showCount, setShowCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let items = allProducts;
    if (category !== "All") items = items.filter((product) => product.category === category);
    if (sort === "Price: Low to High") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") items = [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [category, sort, allProducts]);

  const visibleProducts = filtered.slice(0, showCount);
  const remainingCount = Math.max(filtered.length - showCount, 0);

  const handleLoadMore = async () => {
    setLoading(true);
    setTimeout(() => {
      setShowCount((count) => count + 8);
      setLoading(false);
    }, 1200);
  };

  const handleQuickAdd = (product: Product) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId((current) => (current === product.id ? null : current)), 1200);
  };

  return (
    <div className="min-h-screen w-full bg-background px-4 py-16 sm:px-8">
      <div className="mb-10 grid gap-6 rounded-[2rem] border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.88)] p-6 shadow-[0_24px_60px_rgba(61,47,28,0.08)] sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[var(--color-primary)]">Authentic edit</p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-[var(--foreground)] sm:text-4xl">
            Curated handbags with real-life wearability, clear structure, and premium finishes.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
            Browse the collection with visible category counts, refined filtering, and product detail that feels closer to an editorial shopping room than a flat catalog.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs uppercase tracking-[0.22em] text-[var(--color-muted)]">
            <span className="rounded-full border border-[rgba(155,122,67,0.16)] bg-white px-3 py-2">{filtered.length} styles</span>
            <span className="rounded-full border border-[rgba(155,122,67,0.16)] bg-white px-3 py-2">Local delivery friendly</span>
            <span className="rounded-full border border-[rgba(155,122,67,0.16)] bg-white px-3 py-2">Handpicked materials</span>
          </div>
        </div>

        <div className="rounded-[1.6rem] border border-[rgba(155,122,67,0.12)] bg-white/70 p-4 shadow-[0_16px_36px_rgba(61,47,28,0.06)]">
          <div className="flex flex-wrap gap-4 text-sm">
            <div>
              <div className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-muted)]">Selected</div>
              <div className="mt-1 font-serif text-2xl text-[var(--foreground)]">{category}</div>
            </div>
            <div>
              <div className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-muted)]">Shown</div>
              <div className="mt-1 font-serif text-2xl text-[var(--foreground)]">{filtered.length}</div>
            </div>
            <div>
              <div className="text-[0.68rem] uppercase tracking-[0.24em] text-[var(--color-muted)]">Sort</div>
              <div className="mt-1 font-serif text-2xl text-[var(--foreground)]">{sort}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap justify-center gap-3 md:justify-start">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === category ? "primary" : "secondary"}
              onClick={() => setCategory(cat)}
              className="px-4"
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="flex items-center justify-center gap-3 md:justify-end">
          <div className="text-sm text-[var(--color-muted)]">
            Showing <span className="font-semibold text-[var(--foreground)]">{visibleProducts.length}</span> of <span className="font-semibold text-[var(--foreground)]">{filtered.length}</span>
          </div>
          <Button variant="secondary" onClick={(event) => setAnchorEl(event.currentTarget)} className="min-w-40 justify-between">
            Sort: {sort}
          </Button>
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
            {sortOptions.map((option) => (
              <MenuItem
                key={option}
                selected={option === sort}
                onClick={() => {
                  setSort(option);
                  setAnchorEl(null);
                }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-3">
        {[
          { title: "Editorial selection", description: "Each piece is surfaced with clear shape, price, and styling context." },
          { title: "Authentic shopping cues", description: "Use the filters, quick add, and detail view to move from browse to buy." },
          { title: "Fast fulfillment feel", description: "The load-more pattern keeps the collection responsive without losing momentum." },
        ].map((item) => (
          <div key={item.title} className="rounded-[1.4rem] border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.92)] p-5 shadow-[0_14px_32px_rgba(61,47,28,0.05)]">
            <h3 className="font-serif text-xl text-[var(--foreground)]">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
        {visibleProducts.map((product) => (
          <motion.div
            key={product.id}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="w-full max-w-xs">
              <ProductCard {...product} />
              <Button
                variant={quickAddedId === product.id ? "primary" : "secondary"}
                className="mt-2 w-full"
                onClick={() => handleQuickAdd(product)}
              >
                {quickAddedId === product.id ? "Added" : "Quick Add"}
              </Button>
              <p className="mt-2 text-center text-[0.72rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                {product.category} • Rs. {product.price.toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}

        {loading &&
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center">
              <Skeleton variant="rectangular" width={180} height={180} sx={{ bgcolor: BRAND.border, borderRadius: 3, mb: 2 }} />
              <Skeleton width={120} height={24} sx={{ bgcolor: BRAND.border, mb: 1 }} />
              <Skeleton width={80} height={20} sx={{ bgcolor: BRAND.border }} />
            </div>
          ))}
      </div>

      {showCount < filtered.length && (
        <div className="flex justify-center mt-12">
          <Button variant="secondary" onClick={handleLoadMore} className="px-8 text-base" disabled={loading}>
            {loading ? <Skeleton width={80} height={24} sx={{ bgcolor: BRAND.border }} /> : `Load More ${remainingCount > 0 ? `(${remainingCount})` : ""}`}
          </Button>
        </div>
      )}
    </div>
  );
}
