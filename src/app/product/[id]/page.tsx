"use client";
import React, { useState } from "react";
import { useShop } from "../../../context/ShopContext";
import { Accordion, AccordionSummary, AccordionDetails, Snackbar, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { getProductById } from "../../../data/products";
import { BRAND } from "../../../styles/tokens";

export default function ProductDetailPage() {
  const { addToCart } = useShop();
  const params = useParams<{ id: string }>();
  const productId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const product = getProductById(productId);

  const [mainImg, setMainImg] = useState(product?.images[0] ?? "");
  const [magnify, setMagnify] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  React.useEffect(() => {
    if (product?.images[0]) {
      setMainImg(product.images[0]);
    }
  }, [product]);

  // Mobile sticky bar logic
  const [showMobileBar, setShowMobileBar] = useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      const img = document.getElementById("main-img");
      if (!img) return;
      const rect = img.getBoundingClientRect();
      setShowMobileBar(rect.bottom < 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-background w-full px-4 sm:px-8 py-12 max-w-7xl mx-auto flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Product not found</h1>
          <p className="text-muted">This product does not exist in the catalog.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ id: product.id, name: product.name, price: product.price, image: product.images[0] });
    setShowCheck(true);
    setSnackbar(true);
    setTimeout(() => setShowCheck(false), 1200);
  };

  return (
    <div className="min-h-screen bg-background w-full px-4 sm:px-8 py-12 flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
      {/* Left: Sticky Image Gallery */}
      <div className="lg:w-1/2 w-full lg:sticky top-24 self-start">
        <div className="flex gap-6">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`${product.name} thumb`}
                className={`w-16 h-16 object-cover rounded-lg border cursor-pointer ${mainImg === img ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setMainImg(img)}
              />
            ))}
          </div>
          {/* Main Image with Magnify */}
          <div
            className="relative w-full max-w-md aspect-square bg-surface rounded-2xl shadow-xl overflow-hidden border border-border"
            onMouseEnter={() => setMagnify(true)}
            onMouseLeave={() => setMagnify(false)}
            id="main-img"
          >
            <motion.img
              src={mainImg}
              alt={product.name}
              className="w-full h-full object-cover transition"
              style={magnify ? { scale: 1.12, cursor: 'zoom-in' } : { scale: 1, cursor: 'pointer' }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            />
            {/* Magnify glass effect (simple overlay) */}
            {magnify && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.18 }}
                exit={{ opacity: 0 }}
                style={{ background: `radial-gradient(circle at center, ${BRAND.surface} 0%, rgba(255,255,255,0) 60%)` }}
              />
            )}
          </div>
        </div>
      </div>
      {/* Right: Product Info */}
      <div className="lg:w-1/2 w-full flex flex-col gap-8">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-2 text-foreground">{product.name}</h1>
        <div className="text-2xl font-semibold mb-4" style={{ color: BRAND.subtleText }}>Rs. {product.price.toLocaleString()} PKR</div>
        <Button
          variant="contained"
          color="primary"
          sx={{ fontWeight: 600, fontSize: 18, px: 4, py: 1.5, width: 'fit-content', boxShadow: 'none' }}
          onClick={handleAddToCart}
        >
          Add to Bag
        </Button>
        {/* Success Checkmark */}
        <AnimatePresence>
          {showCheck && (
            <motion.div
              className="flex items-center gap-2 mt-2 text-green-600"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.5 }}
            >
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><motion.path d="M5 13l4 4L19 7" stroke={BRAND.success} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7 }}/></svg>
              Added to cart!
            </motion.div>
          )}
        </AnimatePresence>
        {/* Accordions */}
        <div className="mt-6">
          <Accordion sx={{ boxShadow: 'none', border: 'none', mb: 1, background: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 600, fontSize: 18, px: 0 }}>
              Product Details
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, color: BRAND.muted }}>{product.details}</AccordionDetails>
          </Accordion>
          <Accordion sx={{ boxShadow: 'none', border: 'none', mb: 1, background: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 600, fontSize: 18, px: 0 }}>
              Shipping
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, color: BRAND.muted }}>{product.shipping}</AccordionDetails>
          </Accordion>
          <Accordion sx={{ boxShadow: 'none', border: 'none', mb: 1, background: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ fontWeight: 600, fontSize: 18, px: 0 }}>
              Care Instructions
            </AccordionSummary>
            <AccordionDetails sx={{ px: 0, color: BRAND.muted }}>{product.care}</AccordionDetails>
          </Accordion>
        </div>
      </div>
      {/* Snackbar */}
      <Snackbar
        open={snackbar}
        autoHideDuration={1800}
        onClose={() => setSnackbar(false)}
        message="Added to cart"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        slotProps={{ content: { sx: { borderRadius: 2, bgcolor: BRAND.primary, color: BRAND.surface, fontWeight: 600 } } }}
      />
      {/* Sticky Mobile Add to Bag Bar */}
      <AnimatePresence>
        {showMobileBar && (
          <motion.div
            className="fixed bottom-0 left-0 w-full bg-background border-t border-border flex items-center justify-between px-4 py-3 z-50 shadow-lg"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="font-serif text-lg font-bold">Rs. {product.price.toLocaleString()} PKR</div>
            <Button
              variant="contained"
              color="primary"
              sx={{ fontWeight: 600, fontSize: 18, px: 4, py: 1.5, boxShadow: 'none' }}
              onClick={handleAddToCart}
            >
              Add to Bag
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
