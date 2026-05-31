"use client";

import React, { useState } from "react";
import Image from "next/image";
import CheckoutSummary from "../../components/CheckoutSummary";
import { useShop } from "../../context/ShopContext";
import Button from "../../components/ui/Button";

export default function CheckoutPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useShop();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  function handlePlaceOrder() {
    // Placeholder for real payment integration.
    clearCart();
    setOrderPlaced(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-8">
          <h1 className="text-4xl font-serif">Checkout</h1>
          <p className="text-sm text-gray-600 mt-1">Secure checkout — review your order and place it.</p>
        </header>

        {orderPlaced ? (
          <div className="bg-white p-12 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-2">Thank you — your order is placed</h2>
            <p className="text-gray-600 mb-6">A confirmation email will be sent shortly.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <section className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-medium mb-4">Items</h2>
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center gap-4">
                    <Image
                      src={item.image ?? "/banner-1.jpg"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded-md"
                    />
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
            </section>

            <div className="lg:col-span-1">
              <CheckoutSummary />

              <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-sm text-gray-500">Payment</h3>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium">Total</span>
                    <span className="text-lg font-semibold">${subtotal.toFixed(2)}</span>
                  </div>

                  <Button onClick={handlePlaceOrder} className="w-full" variant="primary" size="lg">
                    Place order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
