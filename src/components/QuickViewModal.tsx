"use client";
import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { useShop } from "../context/ShopContext";
import { BRAND } from "../styles/tokens";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type QuickViewModalProps = {
  open: boolean;
  product?: Product;
  onClose: () => void;
};

export default function QuickViewModal({ open, product, onClose }: QuickViewModalProps) {
  const { addToCart } = useShop();
  if (!product) return null;
  return (
    <Dialog open={open} onClose={onClose} slotProps={{ paper: { sx: { borderRadius: 0, bgcolor: BRAND.surface, minWidth: 340 } }, backdrop: { sx: { bgcolor: BRAND.overlaySoft } } }}>
      <DialogContent className="flex flex-col items-center p-8">
        <img src={product.image} alt={product.name} className="w-48 h-48 object-cover mb-4 rounded" />
        <h3 className="product-name-text text-xl font-serif font-semibold mb-2">{product.name}</h3>
        <p className="product-price-text font-bold mb-4">Rs. {product.price.toLocaleString()} PKR</p>
        <Button variant="contained" color="primary" fullWidth sx={{ mb: 2 }} onClick={() => { addToCart(product); onClose(); }}>
          Add to Cart
        </Button>
        <Button variant="outlined" color="primary" fullWidth onClick={onClose}>
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
}
