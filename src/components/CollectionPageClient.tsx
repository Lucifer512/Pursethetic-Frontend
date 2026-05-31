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
    <div className="min-h-screen bg-background w-full px-4 sm:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
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

        <div>
          <Button variant="secondary" onClick={(event) => setAnchorEl(event.currentTarget)}>
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {filtered.slice(0, showCount).map((product) => (
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
            {loading ? <Skeleton width={80} height={24} sx={{ bgcolor: BRAND.border }} /> : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
