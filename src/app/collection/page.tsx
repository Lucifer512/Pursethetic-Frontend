"use client";
import React, { useState, useMemo } from "react";
import ProductCard from "../../components/ProductCard";
import { Menu, MenuItem, Button, Skeleton } from "@mui/material";
import { motion } from "framer-motion";
import { useShop } from "../../context/ShopContext";
import { products, type Product } from "../../data/products";
import { BRAND } from "../../styles/tokens";

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low"];

export default function CollectionPage() {
  const { addToCart } = useShop();
  const allProducts = products;
  const categories = ["All", ...Array.from(new Set(allProducts.map((product) => product.category)))];
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showCount, setShowCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [quickAddedId, setQuickAddedId] = useState<string | null>(null);

  // Filtering
  const filtered = useMemo(() => {
    let items = allProducts;
    if (category !== "All") items = items.filter((p) => p.category === category);
    if (sort === "Price: Low to High") items = [...items].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") items = [...items].sort((a, b) => b.price - a.price);
    return items;
  }, [category, sort]);

  // Load More
  const handleLoadMore = async () => {
    setLoading(true);
    setTimeout(() => {
      setShowCount((c) => c + 8);
      setLoading(false);
    }, 1200);
  };

  const handleQuickAdd = (product: Product) => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.image });
    setQuickAddedId(product.id);
    setTimeout(() => setQuickAddedId((id) => (id === product.id ? null : id)), 1200);
  };

  return (
    <div className="min-h-screen bg-background w-full px-4 sm:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-6">
        {/* Categories */}
        <div className="flex gap-4 flex-wrap justify-center md:justify-start">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={cat === category ? "contained" : "outlined"}
              onClick={() => setCategory(cat)}
              sx={{
                bgcolor: cat === category ? BRAND.primary : BRAND.surface,
                color: cat === category ? BRAND.surface : BRAND.foreground,
                borderColor: BRAND.primary,
                fontWeight: 500,
                px: 2.5,
                py: 1,
                textTransform: "none",
                boxShadow: "none",
                '&:hover': { bgcolor: cat === category ? BRAND.primaryHover : BRAND.border },
              }}
            >
              {cat}
            </Button>
          ))}
        </div>
        {/* Sort Menu */}
        <div>
          <Button
            variant="outlined"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            sx={{ borderColor: BRAND.primary, color: BRAND.foreground, fontWeight: 500, textTransform: "none" }}
          >
            Sort: {sort}
          </Button>
          <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={() => setAnchorEl(null)}>
            {sortOptions.map((option) => (
              <MenuItem
                key={option}
                selected={option === sort}
                onClick={() => { setSort(option); setAnchorEl(null); }}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {filtered.slice(0, showCount).map((p) => (
          <motion.div
            key={p.id}
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div className="w-full max-w-xs">
              <ProductCard {...p} />
              <Button
                variant="outlined"
                fullWidth
                sx={{
                  mt: 2,
                  borderColor: BRAND.primary,
                  color: quickAddedId === p.id ? BRAND.surface : BRAND.primary,
                  bgcolor: quickAddedId === p.id ? BRAND.primary : "transparent",
                  fontWeight: 600,
                  textTransform: "none",
                  '&:hover': {
                    borderColor: BRAND.primaryHover,
                    bgcolor: quickAddedId === p.id ? BRAND.primaryHover : BRAND.border,
                  },
                }}
                onClick={() => handleQuickAdd(p)}
              >
                {quickAddedId === p.id ? "Added" : "Quick Add"}
              </Button>
            </div>
          </motion.div>
        ))}
        {/* Skeletons for loading */}
        {loading && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <Skeleton variant="rectangular" width={180} height={180} sx={{ bgcolor: BRAND.border, borderRadius: 3, mb: 2 }} />
            <Skeleton width={120} height={24} sx={{ bgcolor: BRAND.border, mb: 1 }} />
            <Skeleton width={80} height={20} sx={{ bgcolor: BRAND.border }} />
          </div>
        ))}
      </div>
      {/* Load More Button */}
      {showCount < filtered.length && (
        <div className="flex justify-center mt-12">
          <Button
            variant="outlined"
            onClick={handleLoadMore}
            sx={{
              borderColor: BRAND.primary,
              color: BRAND.primary,
              fontWeight: 500,
              px: 6,
              py: 1.5,
              textTransform: "none",
              fontSize: 18,
              position: 'relative',
              overflow: 'hidden',
            }}
            disabled={loading}
          >
            {loading ? (
              <Skeleton width={80} height={24} sx={{ bgcolor: BRAND.border }} />
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              >
                Load More
              </motion.span>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
