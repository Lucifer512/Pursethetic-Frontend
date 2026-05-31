"use client";

import React from "react";
import Image from "next/image";
import { useShop } from "../context/ShopContext";
import Button from "./ui/Button";

type Props = {};

export default function CheckoutSummary(_props: Props) {
  const { cart, addToCart, removeFromCart, clearCart } = useShop();

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-sm text-gray-500">Add items to your cart to begin checkout.</p>
      </div>
    );
  }

  return (
    <aside className="p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold">Order Summary</h2>
      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="flex items-center gap-4">
              <Image src={item.image ?? "/banner-1.jpg"} alt={item.name} width={64} height={64} className="w-16 h-16 object-cover rounded-md" />
            <div className="flex-1">
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-500">${item.price.toFixed(2)}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button aria-label={`Decrease ${item.name}`} variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>
                −
              </Button>
              <div className="w-6 text-center">{item.quantity}</div>
                <Button aria-label={`Increase ${item.name}`} variant="ghost" size="sm" onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image ?? "/banner-1.jpg" })}>
                +
              </Button>
            </div>
          </li>
        ))}
      </ul>

      <div className="border-t pt-4 flex items-center justify-between">
        <span className="font-medium">Subtotal</span>
        <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex gap-3">
        <Button onClick={() => clearCart()} variant="secondary" className="flex-1">
          Clear cart
        </Button>
      </div>
    </aside>
  );
}
