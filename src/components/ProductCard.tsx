"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  secondaryImage?: string;
  url?: string;
  description?: string;
  onQuickView?: () => void;
};

export default function ProductCard({ id, name, price, image, secondaryImage, url, description, onQuickView }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <Link href={`/product/${encodeURIComponent(id)}`} prefetch>
        <motion.div
          className="group bg-surface rounded-[1.5rem] shadow-card p-5 border border-border transition flex flex-col items-center text-center min-h-85 cursor-pointer will-change-transform"
          style={{ textDecoration: 'none' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6, scale: 1.01 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative w-full aspect-[4/5] mb-5 overflow-hidden rounded-[1.25rem] border border-border bg-[#f4eee4]">
            <motion.div className="absolute inset-0" animate={{ opacity: hovered && secondaryImage ? 0 : 1 }} transition={{ duration: 0.25 }}>
              <Image src={image} alt={name} fill sizes="(max-width: 768px) 80vw, 320px" className="object-cover transition duration-700 group-hover:scale-105" />
            </motion.div>
            {secondaryImage && (
              <motion.div className="absolute inset-0" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.25 }}>
                <Image src={secondaryImage} alt={`${name} lifestyle`} fill sizes="(max-width: 768px) 80vw, 320px" className="object-cover transition duration-700 group-hover:scale-105" />
              </motion.div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition group-hover:opacity-100" />
          </div>
          <div className="flex w-full items-start justify-between gap-4 text-left">
            <div>
              <h3 className="product-name-text font-serif text-lg font-semibold mb-1 group-hover:opacity-80 transition">{name}</h3>
              {description && <p className="product-desc-text text-sm line-clamp-2">{description}</p>}
            </div>
            <p className="product-price-text font-serif font-semibold whitespace-nowrap">Rs. {price.toLocaleString()}</p>
          </div>
        </motion.div>
      </Link>
      {onQuickView && (
        <motion.button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-border bg-[rgba(255,250,241,0.9)] px-4 py-2 text-sm font-medium text-[var(--foreground)] shadow-sm transition hover:-translate-y-0.5 hover:border-[rgba(155,122,67,0.45)] hover:bg-white"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={onQuickView}
        >
          Quick view
        </motion.button>
      )}
    </div>
  );
}
