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
          className="group flex min-h-85 cursor-pointer flex-col items-center rounded-[1.75rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.94)] p-4 text-center shadow-[0_24px_60px_rgba(61,47,28,0.08)] transition will-change-transform hover:border-[rgba(155,122,67,0.28)] sm:p-5"
          style={{ textDecoration: 'none' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ y: -6, scale: 1.01 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="relative mb-5 aspect-4/5 w-full overflow-hidden rounded-3xl border border-[rgba(155,122,67,0.12)] bg-[#f4eee4]">
            <motion.div className="absolute inset-0" animate={{ opacity: hovered && secondaryImage ? 0 : 1 }} transition={{ duration: 0.25 }}>
              <Image src={image} alt={name} fill sizes="(max-width: 768px) 80vw, 320px" className="object-cover transition duration-700 group-hover:scale-105" />
            </motion.div>
            {secondaryImage && (
              <motion.div className="absolute inset-0" animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.25 }}>
                <Image src={secondaryImage} alt={`${name} lifestyle`} fill sizes="(max-width: 768px) 80vw, 320px" className="object-cover transition duration-700 group-hover:scale-105" />
              </motion.div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="absolute left-4 top-4 rounded-full border border-white/40 bg-[rgba(155,122,67,0.76)] px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-md">
              Curated
            </div>
          </div>
          <div className="flex w-full items-start justify-between gap-4 text-left">
            <div>
              <h3 className="product-name-text mb-1 font-serif text-lg font-semibold text-foreground transition group-hover:text-primary">{name}</h3>
              {description && <p className="product-desc-text line-clamp-2 text-sm leading-6 text-(--color-muted)">{description}</p>}
            </div>
            <p className="product-price-text whitespace-nowrap font-serif font-semibold text-foreground">Rs. {price.toLocaleString()}</p>
          </div>
        </motion.div>
      </Link>
      {onQuickView && (
        <motion.button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-[rgba(155,122,67,0.18)] bg-[rgba(255,250,241,0.92)] px-4 py-2 text-sm font-medium text-foreground shadow-sm transition hover:-translate-y-0.5 hover:border-[rgba(155,122,67,0.35)] hover:bg-white hover:text-primary"
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
