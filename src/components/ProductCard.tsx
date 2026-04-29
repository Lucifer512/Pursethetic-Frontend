"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  image: string;
  secondaryImage?: string;
  url?: string;
  description?: string;
};

export default function ProductCard({ id, name, price, image, secondaryImage, url, description }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link href={`/product/${encodeURIComponent(id)}`} prefetch>
      <motion.div
        className="group bg-surface rounded-xl shadow-card p-5 border border-border hover:shadow-lg transition flex flex-col items-center text-center min-h-85 cursor-pointer"
        style={{ textDecoration: 'none' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative w-40 h-40 mb-4 rounded-xl overflow-hidden border border-border">
          <motion.img
            src={image}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover rounded-xl transition"
            style={{ opacity: hovered && secondaryImage ? 0 : 1 }}
            loading="lazy"
          />
          {secondaryImage && (
            <motion.img
              src={secondaryImage}
              alt={name + ' lifestyle'}
              className="absolute inset-0 w-full h-full object-cover rounded-xl transition"
              style={{ opacity: hovered ? 1 : 0 }}
              loading="lazy"
            />
          )}
        </div>
        <h3 className="product-name-text font-serif text-lg font-semibold mb-1 group-hover:opacity-80 transition">{name}</h3>
        <p className="product-price-text font-serif font-bold mb-2">Rs. {price.toLocaleString()} PKR</p>
        {description && (
          <p className="product-desc-text text-sm mb-3 line-clamp-2">{description}</p>
        )}
        <motion.span
          className="button-text mt-auto inline-block bg-primary px-4 py-2 rounded-lg font-medium shadow group-hover:bg-accent transition"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
        >
          View Product
        </motion.span>
      </motion.div>
    </Link>
  );
}
