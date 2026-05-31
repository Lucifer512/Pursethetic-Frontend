"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Accordion, AccordionSummary, AccordionDetails, Snackbar, Dialog, DialogContent } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "../context/ShopContext";
import { BRAND } from "../styles/tokens";
import Button from "./ui/Button";
import type { Product } from "../data/products";

type Props = {
  product: Product;
};

export default function ProductDetailClient({ product }: Props) {
  const { addToCart } = useShop();
  const [mainImg, setMainImg] = useState(product.images[0] ?? "");
  const [magnify, setMagnify] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const activeIndex = useMemo(() => Math.max(product.images.findIndex((img) => img === mainImg), 0), [mainImg, product.images]);

  useEffect(() => {
    setMainImg(product.images[0] ?? "");
    setLightboxIndex(0);
  }, [product.id, product.images]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxOpen(false);
      }
      if (event.key === "ArrowRight") {
        setLightboxIndex((current) => (current + 1) % product.images.length);
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((current) => (current - 1 + product.images.length) % product.images.length);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxOpen, product.images.length]);

  useEffect(() => {
    const onScroll = () => {
      const img = document.getElementById("main-img");
      if (!img) return;
      const rect = img.getBoundingClientRect();
      setShowMobileBar(rect.bottom < 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.images[0] });
    setShowCheck(true);
    setSnackbar(true);
    setTimeout(() => setShowCheck(false), 1200);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const goPrev = () => setLightboxIndex((current) => (current - 1 + product.images.length) % product.images.length);
  const goNext = () => setLightboxIndex((current) => (current + 1) % product.images.length);

  return (
    <div className="min-h-screen bg-background w-full px-4 sm:px-8 py-12 flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
      <div className="lg:w-1/2 w-full lg:sticky top-24 self-start">
        <div className="flex gap-6">
          <div className="flex flex-col gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                type="button"
                aria-label={`${product.name} thumbnail ${i + 1}`}
                className={`w-16 h-16 overflow-hidden rounded-lg border cursor-pointer transition ${mainImg === img ? "border-primary" : "border-transparent hover:border-border"}`}
                onClick={() => {
                  setMainImg(img);
                  setLightboxIndex(i);
                }}
              >
                <Image src={img} alt={`${product.name} thumbnail ${i + 1}`} width={64} height={64} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>

          <motion.button
            type="button"
            className="relative w-full max-w-md aspect-square bg-surface rounded-2xl shadow-xl overflow-hidden border border-border cursor-zoom-in"
            onMouseEnter={() => setMagnify(true)}
            onMouseLeave={() => setMagnify(false)}
            onClick={() => {
              setLightboxIndex(activeIndex);
              setLightboxOpen(true);
            }}
            id="main-img"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.995 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <motion.div
              className="absolute inset-0"
              animate={magnify ? { scale: 1.08 } : { scale: 1 }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            >
              <Image src={mainImg} alt={product.name} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" priority />
            </motion.div>

            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={magnify ? { opacity: 0.18 } : { opacity: 0 }}
              style={{ background: `radial-gradient(circle at center, ${BRAND.surface} 0%, rgba(255,255,255,0) 60%)` }}
            />
          </motion.button>
        </div>
      </div>

      <div className="lg:w-1/2 w-full flex flex-col gap-8">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2 text-foreground headline-text">{product.name}</h1>
        <div className="text-2xl font-serif font-semibold mb-4 text-primary">Rs. {product.price.toLocaleString()} PKR</div>
        <Button variant="primary" size="lg" className="w-fit" onClick={handleAddToCart}>
          Add to Bag
        </Button>

        <AnimatePresence>
          {showCheck && (
            <motion.div
              className="flex items-center gap-2 mt-2 text-green-600"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.5 }}
            >
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <motion.path
                  d="M5 13l4 4L19 7"
                  stroke={BRAND.success}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7 }}
                />
              </svg>
              Added to cart!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 space-y-1">
          <Accordion sx={{ boxShadow: "none", border: "none", mb: 1, background: "none" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 600, fontSize: 18, px: 0 }}>
              Product Details
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, color: BRAND.muted }}>{product.details}</AccordionDetails>
          </Accordion>
          <Accordion sx={{ boxShadow: "none", border: "none", mb: 1, background: "none" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 600, fontSize: 18, px: 0 }}>
              Shipping
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, color: BRAND.muted }}>{product.shipping}</AccordionDetails>
          </Accordion>
          <Accordion sx={{ boxShadow: "none", border: "none", mb: 1, background: "none" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 600, fontSize: 18, px: 0 }}>
              Care Instructions
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, color: BRAND.muted }}>{product.care}</AccordionDetails>
          </Accordion>
        </div>
      </div>

      <Snackbar
        open={snackbar}
        autoHideDuration={1800}
        onClose={() => setSnackbar(false)}
        message="Added to cart"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        slotProps={{ content: { sx: { borderRadius: 2, bgcolor: BRAND.primary, color: BRAND.surface, fontWeight: 600 } } }}
      />

      <AnimatePresence>
        {showMobileBar && (
          <motion.div
            className="fixed bottom-0 left-0 w-full bg-background border-t border-border flex items-center justify-between px-4 py-3 z-50 shadow-lg"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-serif text-lg font-bold text-primary">Rs. {product.price.toLocaleString()} PKR</div>
            <Button variant="primary" size="lg" onClick={handleAddToCart}>
              Add to Bag
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <Dialog
        open={lightboxOpen}
        onClose={closeLightbox}
        fullWidth
        maxWidth="lg"
        slotProps={{
          paper: {
            sx: {
              borderRadius: 4,
              bgcolor: "rgba(8, 8, 8, 0.96)",
              color: BRAND.surface,
              border: `1px solid ${BRAND.border}`,
            },
          },
          backdrop: { sx: { bgcolor: "rgba(0, 0, 0, 0.8)" } },
        }}
      >
        <DialogContent className="p-4 sm:p-6">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div>
              <p className="text-sm text-white/60">Image preview</p>
              <h2 className="text-lg font-semibold">{product.name}</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={closeLightbox} className="bg-white/10! text-white! hover:bg-white/20!">
              Close
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_96px]">
            <div className="relative min-h-[60vh] overflow-hidden rounded-3xl border border-white/10 bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.images[lightboxIndex]}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <Image
                    src={product.images[lightboxIndex]}
                    alt={`${product.name} image ${lightboxIndex + 1}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 80vw"
                    className="object-contain"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-y-1/2 left-4 right-4 flex items-center justify-between pointer-events-none">
                <Button variant="ghost" size="sm" onClick={goPrev} className="pointer-events-auto h-11 w-11 rounded-full bg-white/10! text-white! hover:bg-white/20!">
                  ‹
                </Button>
                <Button variant="ghost" size="sm" onClick={goNext} className="pointer-events-auto h-11 w-11 rounded-full bg-white/10! text-white! hover:bg-white/20!">
                  ›
                </Button>
              </div>
            </div>

            <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-1">
              {product.images.map((img, index) => (
                <button
                  key={img}
                  type="button"
                  aria-label={`Open image ${index + 1}`}
                  onClick={() => setLightboxIndex(index)}
                  className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border transition ${lightboxIndex === index ? "border-white" : "border-white/15 hover:border-white/40"}`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${index + 1}`} fill sizes="96px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
