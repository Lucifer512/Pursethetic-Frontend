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
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
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
      slotProps={{
        paper: {
          sx: {
            borderRadius: 0,
            width: "100vw",
            maxWidth: 460,
            bgcolor: "transparent",
            background: "linear-gradient(180deg, rgba(255,250,241,0.98) 0%, rgba(246,241,232,1) 100%)",
          },
        },
      }}
    >
      <div className="flex h-full flex-col border-l border-[rgba(155,122,67,0.12)]">
        <div className="border-b border-[rgba(155,122,67,0.12)] px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-(--color-muted)">Your bag</p>
              <h2 className="mt-2 font-serif text-2xl text-foreground">Ready for checkout</h2>
              <p className="mt-2 text-sm leading-6 text-(--color-muted)">{totalItems} item{totalItems === 1 ? "" : "s"} selected</p>
            </div>
            <Button aria-label="close bag" onClick={closeSidebar} variant="ghost" size="sm" className="h-10 w-10 rounded-full p-0">
              ×
            </Button>
          </div>

          <div className="mt-5 rounded-[1.4rem] border border-[rgba(155,122,67,0.12)] bg-white/80 p-4 shadow-[0_14px_32px_rgba(61,47,28,0.05)]">
            <div className="mb-2 text-xs font-medium tracking-[0.28em] text-primary">
              {subtotal >= FREE_SHIPPING_THRESHOLD
                ? "You have free shipping!"
                : `Spend Rs. ${amountToFree.toLocaleString()} more for free shipping`}
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(155,122,67,0.12)]">
              <motion.div
                className="h-2 rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${freeShippingProgress * 100}%` }}
                transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[rgba(155,122,67,0.14)] bg-[rgba(155,122,67,0.08)] text-[2rem] text-primary">
                ♢
              </div>
              <p className="text-lg text-foreground">Your bag is empty</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-(--color-muted)">Start with a curated edit and build a checkout-ready set.</p>
              <Button
                variant="secondary"
                className="mt-6 px-6"
                onClick={() => {
                  closeSidebar();
                  router.push("/collection");
                }}
              >
                Start shopping
              </Button>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  className="mb-4 rounded-3xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.86)] p-4 shadow-[0_16px_36px_rgba(61,47,28,0.06)]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                >
                  <div className="flex items-start gap-4">
                    <Image
                      src={item.image ?? "/banner-1.jpg"}
                      alt={item.name}
                      width={72}
                      height={72}
                      className="h-18 w-18 rounded-[1.1rem] border border-[rgba(155,122,67,0.12)] bg-(--color-surface) object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="truncate font-serif text-lg text-foreground">{item.name}</div>
                          <div className="mt-1 text-sm text-(--color-muted)">Rs. {item.price.toLocaleString()} PKR</div>
                        </div>
                        <span className="rounded-full border border-[rgba(155,122,67,0.14)] bg-white/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-primary">
                          Qty {item.quantity}
                        </span>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-1 rounded-full border border-[rgba(155,122,67,0.12)] bg-white/70 p-1">
                          <Button variant="ghost" size="sm" aria-label={`Decrease ${item.name}`} onClick={() => removeFromCart(item.id)} className="h-8 w-8 rounded-full p-0 text-primary">
                            <RemoveIcon fontSize="small" />
                          </Button>
                          <span className="min-w-8 select-none px-2 text-center text-sm font-semibold text-foreground">{item.quantity}</span>
                          <Button variant="ghost" size="sm" aria-label={`Increase ${item.name}`} onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image ?? "/banner-1.jpg" })} className="h-8 w-8 rounded-full p-0 text-primary">
                            <AddIcon fontSize="small" />
                          </Button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs font-semibold uppercase tracking-[0.22em] text-(--color-muted) transition hover:text-primary"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.94)] px-5 pb-5 pt-4 shadow-[0_-10px_30px_rgba(61,47,28,0.06)] sm:px-6">
            <div className="flex justify-between text-lg font-bold text-foreground">
              <span>Subtotal</span>
              <span>Rs. {subtotal.toLocaleString()} PKR</span>
            </div>
            <div className="mt-2 text-sm leading-6 text-(--color-muted)">
              Taxes and delivery are calculated at checkout.
            </div>
            <Button variant="primary" size="lg" className="mt-5 w-full" onClick={handleCheckout}>
              Checkout
            </Button>
            <Button variant="ghost" className="mt-3 w-full" onClick={clearCart}>
              Clear Bag
            </Button>
          </div>
        )}
      </div>
    </SwipeableDrawer>
  );
}
