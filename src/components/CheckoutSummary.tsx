"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "../context/ShopContext";
import Button from "./ui/Button";

const FREE_SHIPPING_THRESHOLD = 4000;
const STANDARD_SHIPPING_FEE = 250;

export default function CheckoutSummary() {
  const { cart, addToCart, removeFromCart, clearCart } = useShop();

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shippingFee;

  if (cart.length === 0) {
    return (
      <div className="rounded-4xl border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.9)] p-8 text-center shadow-[0_24px_60px_rgba(61,47,28,0.08)]">
        <p className="font-serif text-xl text-foreground">Your bag is empty</p>
        <p className="mt-2 text-sm leading-7 text-(--color-muted)">Add items to your bag to begin checkout.</p>
        <Link
          href="/collection"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-white transition hover:bg-[#8c6e41]"
        >
          Shop collection
        </Link>
      </div>
    );
  }

  return (
    <aside className="rounded-4xl border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.9)] p-6 shadow-[0_24px_60px_rgba(61,47,28,0.08)]">
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-primary">
        Order summary
      </p>
      <h2 className="mt-2 font-serif text-2xl text-foreground">
        {cart.reduce((s, i) => s + i.quantity, 0)} item{cart.reduce((s, i) => s + i.quantity, 0) === 1 ? "" : "s"}
      </h2>

      <ul className="mt-5 space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.88)]">
              <Image
                src={item.image ?? "/banner-1.jpg"}
                alt={item.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate font-serif text-base text-foreground">{item.name}</div>
              <div className="mt-0.5 text-sm text-(--color-muted)">Rs. {item.price.toLocaleString()} PKR</div>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label={`Decrease quantity of ${item.name}`}
                onClick={() => removeFromCart(item.id)}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[rgba(155,122,67,0.18)] bg-white/80 text-sm text-foreground transition hover:border-[rgba(155,122,67,0.35)] hover:text-primary"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-semibold text-foreground">{item.quantity}</span>
              <button
                type="button"
                aria-label={`Increase quantity of ${item.name}`}
                onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image ?? "/banner-1.jpg" })}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[rgba(155,122,67,0.18)] bg-white/80 text-sm text-foreground transition hover:border-[rgba(155,122,67,0.35)] hover:text-primary"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-6 space-y-3 border-t border-[rgba(155,122,67,0.12)] pt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-(--color-muted)">Subtotal</span>
          <span className="text-foreground">Rs. {subtotal.toLocaleString()}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-(--color-muted)">Shipping</span>
          {shippingFee === 0 ? (
            <span className="font-medium text-green-600">Free</span>
          ) : (
            <span className="text-foreground">Rs. {shippingFee.toLocaleString()}</span>
          )}
        </div>
        <div className="flex items-center justify-between border-t border-[rgba(155,122,67,0.12)] pt-4">
          <span className="font-serif text-xl text-foreground">Total</span>
          <div className="text-right">
            <span className="font-serif text-xl text-foreground">Rs. {total.toLocaleString()}</span>
            <div className="text-[0.68rem] uppercase tracking-[0.2em] text-(--color-muted)">PKR</div>
          </div>
        </div>
      </div>

      <Button onClick={clearCart} variant="secondary" className="mt-5 w-full">
        Clear bag
      </Button>
    </aside>
  );
}
