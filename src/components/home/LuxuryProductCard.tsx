"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { type Product } from "../../data/products";

type Props = {
  product: Product;
  onQuickView: (productId: string) => void;
  compact?: boolean;
};

export default function LuxuryProductCard({ product, onQuickView, compact = false }: Props) {
  const [wishlisted, setWishlisted] = useState(false);
  // Toggle between primary and secondary image on hover
  const hasSecondary = Boolean(product.secondaryImage);
  const [hovered, setHovered] = useState(false);
  const displayImage = hasSecondary && hovered ? (product.secondaryImage ?? product.image) : product.image;

  return (
    <motion.article
      className={`group rounded-[1.75rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.94)] shadow-[0_24px_60px_rgba(61,47,28,0.08)] backdrop-blur-sm transition duration-300 hover:border-[rgba(155,122,67,0.28)] hover:shadow-[0_32px_80px_rgba(61,47,28,0.13)] ${compact ? "p-4" : "p-5"}`}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/product/${encodeURIComponent(product.id)}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] bg-[#f3ede1]">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 82vw, 30vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-105"
          />
          {/* Hover gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-black/0 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

          {/* Category badge */}
          <div className="absolute left-4 top-4 rounded-full border border-white/35 bg-[rgba(155,122,67,0.76)] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-md">
            {product.category}
          </div>

          {/* Wishlist button */}
          <button
            type="button"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setWishlisted((w) => !w);
            }}
            className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <svg
              width="14"
              height="14"
              fill={wishlisted ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={wishlisted ? "text-rose-400" : "text-white"}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Secondary image indicator dots */}
          {hasSecondary && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              <div className={`h-1.5 rounded-full transition-all duration-300 ${!hovered ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />
              <div className={`h-1.5 rounded-full transition-all duration-300 ${hovered ? "w-4 bg-white" : "w-1.5 bg-white/50"}`} />
            </div>
          )}
        </div>

        <div className="mt-5 flex items-start justify-between gap-4 text-left">
          <div>
            <h3 className="font-serif text-lg text-[var(--foreground)] transition group-hover:text-[var(--color-primary)]">
              {product.name}
            </h3>
            <p className="mt-1 text-sm leading-6 text-[var(--color-muted)]">{product.description}</p>
          </div>
          <div className="shrink-0 text-right">
            <div className="font-serif text-lg text-[var(--foreground)]">
              Rs. {product.price.toLocaleString()}
            </div>
            <div className="mt-1 text-[0.7rem] uppercase tracking-[0.24em] text-[var(--color-muted)]">PKR</div>
          </div>
        </div>
      </Link>

      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => onQuickView(product.id)}
          className="flex-1 min-h-[44px] rounded-full border border-[rgba(155,122,67,0.2)] bg-[rgba(255,250,241,0.96)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:border-[rgba(155,122,67,0.45)] hover:bg-white hover:text-[var(--color-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(155,122,67,0.4)]"
        >
          Quick view
        </button>
        <Link
          href={`/product/${encodeURIComponent(product.id)}`}
          className="flex-1 min-h-[44px] flex items-center justify-center rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#8c6e41] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(155,122,67,0.4)]"
        >
          View details
        </Link>
      </div>
    </motion.article>
  );
}
