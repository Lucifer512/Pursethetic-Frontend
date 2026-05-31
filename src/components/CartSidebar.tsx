"use client";
import React from "react";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useShop } from "../context/ShopContext";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND } from "../styles/tokens";
import Button from "./ui/Button";

const FREE_SHIPPING_THRESHOLD = 4000;

export default function CartSidebar() {
  const { cart, isSidebarOpen, openSidebar, closeSidebar, addToCart, removeFromCart, clearCart } = useShop();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingProgress = Math.min(subtotal / FREE_SHIPPING_THRESHOLD, 1);
  const amountToFree = FREE_SHIPPING_THRESHOLD - subtotal;
  const router = useRouter();

  const handleCheckout = () => {
    closeSidebar();
    router.push("/checkout");
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={isSidebarOpen}
      onClose={closeSidebar}
      onOpen={openSidebar}
      slotProps={{ paper: { sx: { borderRadius: 0, minWidth: 340, bgcolor: BRAND.background } } }}
    >
      <div className="flex flex-col h-full p-0">
        {/* Free Shipping Progress Bar */}
        <div className="w-full px-6 pt-6 pb-2">
          <div className="mb-2 text-xs font-medium text-primary tracking-wide">
            {subtotal >= FREE_SHIPPING_THRESHOLD
              ? "You have free shipping!"
              : `Spend Rs. ${amountToFree.toLocaleString()} more for free shipping`}
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <motion.div
              className="h-2 bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${freeShippingProgress * 100}%` }}
              transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            />
          </div>
        </div>
        <h2 className="headline-text text-xl font-serif font-bold mb-2 px-6 pt-2">Your Bag</h2>
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16">
              <p className="text-gray-500 text-lg mb-6">Your bag is empty</p>
              <Button
                variant="secondary"
                className="px-5"
                onClick={() => {
                  closeSidebar();
                  router.push("/collection");
                }}
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  className="flex items-center gap-4 py-4 border-b border-border"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <Image
                      src={item.image ?? "/banner-1.jpg"}
                    alt={item.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 object-cover rounded-lg border border-border bg-surface"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-base truncate">{item.name}</div>
                    <div className="text-sm" style={{ color: BRAND.subtleText }}>Rs. {item.price.toLocaleString()} PKR</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" aria-label={`Decrease ${item.name}`} onClick={() => removeFromCart(item.id)} className="h-9 w-9 rounded-full p-0 text-primary">
                      <RemoveIcon fontSize="small" />
                    </Button>
                    <span className="font-semibold text-base px-2 select-none">{item.quantity}</span>
                      <Button variant="ghost" size="sm" aria-label={`Increase ${item.name}`} onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image ?? "/banner-1.jpg" })} className="h-9 w-9 rounded-full p-0 text-primary">
                      <AddIcon fontSize="small" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
        {/* Subtotal & Actions */}
        {cart.length > 0 && (
          <div className="px-6 pb-6 pt-2 border-t border-border bg-background">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Subtotal:</span>
              <span>Rs. {subtotal.toLocaleString()} PKR</span>
            </div>
            <Button variant="primary" size="lg" className="w-full" onClick={handleCheckout}>
              Checkout
            </Button>
            <Button variant="secondary" className="w-full mt-3" onClick={clearCart}>
              Clear Bag
            </Button>
          </div>
        )}
      </div>
    </SwipeableDrawer>
  );
}
