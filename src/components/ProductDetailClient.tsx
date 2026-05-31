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

  const handleCheckoutNow = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.images[0] });
    window.location.href = "/checkout";
  };

  const closeLightbox = () => setLightboxOpen(false);
  const goPrev = () => setLightboxIndex((current) => (current - 1 + product.images.length) % product.images.length);
  const goNext = () => setLightboxIndex((current) => (current + 1) % product.images.length);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-12 bg-background px-4 py-12 sm:px-8 lg:flex-row">
      <div className="w-full self-start lg:sticky lg:top-24 lg:w-1/2">
        <div className="flex gap-6">
          <div className="flex flex-col gap-3">
            {product.images.map((img, i) => (
              <button
                key={img}
                type="button"
                aria-label={`${product.name} thumbnail ${i + 1}`}
                className={`h-16 w-16 overflow-hidden rounded-lg border transition ${mainImg === img ? "border-primary ring-2 ring-[rgba(155,122,67,0.12)]" : "border-transparent hover:border-[rgba(155,122,67,0.3)]"}`}
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
            className="relative w-full max-w-md overflow-hidden rounded-4xl border border-[rgba(155,122,67,0.12)] bg-(--color-surface) shadow-[0_24px_70px_rgba(61,47,28,0.12)] aspect-square cursor-zoom-in"
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

            <div className="absolute left-5 top-5 rounded-full bg-[rgba(32,26,21,0.72)] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md">
              Tap to preview
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 text-white">
              <div className="rounded-full bg-black/35 px-3 py-2 text-[0.68rem] uppercase tracking-[0.22em] backdrop-blur-md">{product.category}</div>
              <div className="rounded-full bg-black/35 px-3 py-2 text-[0.68rem] uppercase tracking-[0.22em] backdrop-blur-md">View images</div>
            </div>
          </motion.button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-8 lg:w-1/2">
        <div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-primary">Product story</p>
          <h1 className="mt-3 font-serif text-4xl font-bold text-foreground md:text-5xl headline-text">{product.name}</h1>
          <div className="mt-4 text-2xl font-serif font-semibold text-primary">Rs. {product.price.toLocaleString()} PKR</div>
          <p className="mt-4 max-w-2xl text-base leading-8 text-(--color-muted)">
            A refined carry piece shaped for real routines, with a premium finish that feels intentional in both casual and dressed-up settings.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Material", value: "Premium finish" },
            { label: "Best for", value: "Everyday carry" },
            { label: "Dispatch", value: "Fast fulfillment" },
          ].map((item) => (
            <div key={item.label} className="rounded-[1.3rem] border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.88)] p-4 shadow-[0_12px_30px_rgba(61,47,28,0.05)]">
              <div className="text-[0.68rem] uppercase tracking-[0.24em] text-(--color-muted)">{item.label}</div>
              <div className="mt-2 font-serif text-xl text-foreground">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="lg" className="w-fit" onClick={handleAddToCart}>
            Add to Bag
          </Button>
          <Button variant="secondary" size="lg" className="w-fit" onClick={handleCheckoutNow}>
            Buy Now
          </Button>
          <Button variant="ghost" size="lg" className="w-fit" onClick={() => setLightboxOpen(true)}>
            View gallery
          </Button>
        </div>

        <AnimatePresence>
          {showCheck && (
            <motion.div
              className="mt-2 flex items-center gap-2 text-green-600"
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
              Added to cart. Ready when you are.
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-2 space-y-1">
          <Accordion sx={{ boxShadow: "none", border: "none", mb: 1, background: "none" }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 600, fontSize: 18, px: 0 }}>
              Product Details
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, color: BRAND.muted }}>
              {product.details}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.1rem] border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.7)] p-4">
                  <div className="text-[0.68rem] uppercase tracking-[0.22em] text-(--color-muted)">Authenticity cue</div>
                  <p className="mt-2 text-sm leading-6 text-foreground">Designed to feel close to the product: shape, texture, and carry use are all surfaced before checkout.</p>
                </div>
                <div className="rounded-[1.1rem] border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.7)] p-4">
                  <div className="text-[0.68rem] uppercase tracking-[0.22em] text-(--color-muted)">Styling note</div>
                  <p className="mt-2 text-sm leading-6 text-foreground">Pairs naturally with tailored looks, neutral palettes, and daily outfits that need a polished finish.</p>
                </div>
              </div>
            </AccordionDetails>
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
            className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-between border-t border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.96)] px-4 py-3 shadow-[0_-8px_30px_rgba(61,47,28,0.12)] backdrop-blur-md"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="font-serif text-lg font-bold text-foreground">Rs. {product.price.toLocaleString()} PKR</div>
              <div className="text-[0.68rem] uppercase tracking-[0.22em] text-(--color-muted)">Checkout ready</div>
            </div>
            <div className="flex gap-2">
              <Button variant="secondary" size="lg" onClick={handleCheckoutNow}>
                Buy Now
              </Button>
              <Button variant="primary" size="lg" onClick={handleAddToCart}>
                Add to Bag
              </Button>
            </div>
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

          <div className="mb-4 flex flex-wrap gap-2 text-[0.68rem] uppercase tracking-[0.22em] text-white/70">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">Swipe or use arrows</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">{lightboxIndex + 1} of {product.images.length}</span>
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
