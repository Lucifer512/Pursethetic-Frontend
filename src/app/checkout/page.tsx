"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "../../context/ShopContext";
import Button from "../../components/ui/Button";
import BreadcrumbsNav from "../../components/BreadcrumbsNav";

const FREE_SHIPPING_THRESHOLD = 4000;
const STANDARD_SHIPPING_FEE = 250;

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
};

const emptyForm: FormState = { fullName: "", email: "", phone: "", city: "", address: "" };

const inputClass =
  "h-12 w-full rounded-full border border-[rgba(32,26,21,0.12)] bg-white px-5 text-sm text-foreground outline-none transition placeholder:text-(--color-muted) focus:border-[rgba(155,122,67,0.5)] focus:ring-2 focus:ring-[rgba(155,122,67,0.12)]";
const labelClass =
  "block text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-(--color-muted)";
const cardClass =
  "rounded-4xl border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.9)] p-6 shadow-[0_24px_60px_rgba(61,47,28,0.08)] sm:p-8";

export default function CheckoutPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useShop();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const total = subtotal + shippingFee;
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearCart();
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
        <motion.div
          className="w-full max-w-lg rounded-4xl border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.96)] p-10 text-center shadow-[0_30px_80px_rgba(61,47,28,0.12)]"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(155,122,67,0.1)]">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <motion.path
                d="M5 13l4 4L19 7"
                stroke="#9b7a43"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </svg>
          </div>
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-primary">
            Order confirmed
          </p>
          <h1 className="mt-3 font-serif text-3xl text-foreground">
            Thank you for your order
          </h1>
          <p className="mt-4 text-sm leading-7 text-(--color-muted)">
            We have received your order and will confirm delivery details via WhatsApp or email within 24 hours.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/collection"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-white transition hover:bg-[#8c6e41]"
            >
              Continue shopping
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(155,122,67,0.24)] bg-[rgba(255,250,241,0.9)] px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-foreground transition hover:bg-white"
            >
              Go home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <BreadcrumbsNav
          items={[
            { label: "Home", href: "/" },
            { label: "Checkout", href: "/checkout" },
          ]}
        />

        <div className="mb-10">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-primary">
            Secure checkout
          </p>
          <h1 className="mt-2 font-serif text-4xl text-foreground sm:text-5xl">
            Complete your order
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="rounded-4xl border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.9)] p-14 text-center shadow-[0_24px_60px_rgba(61,47,28,0.08)]">
            <p className="font-serif text-2xl text-foreground">Your bag is empty</p>
            <p className="mt-3 text-sm leading-7 text-(--color-muted)">
              Add some pieces to your bag before checking out.
            </p>
            <Link
              href="/collection"
              className="mt-7 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-medium uppercase tracking-[0.12em] text-white transition hover:bg-[#8c6e41]"
            >
              Shop collection
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">

              {/* Left: delivery + payment */}
              <div className="space-y-6">

                {/* Delivery details */}
                <section className={cardClass}>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-primary">
                    Delivery details
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-foreground">
                    Where should we send your order?
                  </h2>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="fullName" className={labelClass}>Full name</label>
                      <input id="fullName" name="fullName" type="text" required autoComplete="name"
                        value={form.fullName} onChange={handleChange} placeholder="Sara Khan" className={inputClass} />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className={labelClass}>Email address</label>
                      <input id="email" name="email" type="email" required autoComplete="email"
                        value={form.email} onChange={handleChange} placeholder="sara@example.com" className={inputClass} />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className={labelClass}>Phone / WhatsApp</label>
                      <input id="phone" name="phone" type="tel" required autoComplete="tel"
                        value={form.phone} onChange={handleChange} placeholder="03001234567" className={inputClass} />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="city" className={labelClass}>City</label>
                      <input id="city" name="city" type="text" required autoComplete="address-level2"
                        value={form.city} onChange={handleChange} placeholder="Lahore" className={inputClass} />
                    </div>

                    <div className="flex flex-col gap-2 sm:col-span-2">
                      <label htmlFor="address" className={labelClass}>Full address</label>
                      <input id="address" name="address" type="text" required autoComplete="street-address"
                        value={form.address} onChange={handleChange} placeholder="House no., street, block, area" className={inputClass} />
                    </div>
                  </div>
                </section>

                {/* Payment method */}
                <section className={cardClass}>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-primary">
                    Payment method
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-foreground">
                    Cash on delivery
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-(--color-muted)">
                    We currently accept cash on delivery (COD) across Pakistan. Pay when your order arrives — no card details required.
                  </p>

                  <div className="mt-5 flex items-center gap-4 rounded-[1.4rem] border border-[rgba(155,122,67,0.18)] bg-white/70 px-5 py-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgba(155,122,67,0.1)]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-foreground">Cash on Delivery (COD)</div>
                      <div className="text-[0.72rem] text-(--color-muted)">Pay when your order arrives at your door</div>
                    </div>
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-primary)]" aria-hidden="true">
                      <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    </div>
                  </div>
                </section>
              </div>

              {/* Right: order summary */}
              <div className="space-y-5">
                <section className="rounded-4xl border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.9)] p-6 shadow-[0_24px_60px_rgba(61,47,28,0.08)]">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-primary">
                    Order summary
                  </p>
                  <h2 className="mt-2 font-serif text-2xl text-foreground">
                    {totalItems} item{totalItems === 1 ? "" : "s"}
                  </h2>

                  <ul className="mt-5 space-y-4" aria-label="Cart items">
                    <AnimatePresence initial={false}>
                      {cart.map((item) => (
                        <motion.li
                          key={item.id}
                          className="flex items-center gap-4"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.88)]">
                            <Image src={item.image ?? "/banner-1.jpg"} alt={item.name} fill sizes="64px" className="object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="truncate font-serif text-base text-foreground">{item.name}</div>
                            <div className="mt-0.5 text-sm text-(--color-muted)">
                              Rs. {item.price.toLocaleString()} × {item.quantity}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <button type="button" aria-label={`Decrease quantity of ${item.name}`}
                              onClick={() => removeFromCart(item.id)}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[rgba(155,122,67,0.18)] bg-white/80 text-sm text-foreground transition hover:border-[rgba(155,122,67,0.35)] hover:text-primary">
                              −
                            </button>
                            <span className="w-6 text-center text-sm font-semibold text-foreground">{item.quantity}</span>
                            <button type="button" aria-label={`Increase quantity of ${item.name}`}
                              onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, image: item.image ?? "/banner-1.jpg" })}
                              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[rgba(155,122,67,0.18)] bg-white/80 text-sm text-foreground transition hover:border-[rgba(155,122,67,0.35)] hover:text-primary">
                              +
                            </button>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>

                  {/* Pricing breakdown */}
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
                    {shippingFee > 0 && (
                      <p className="text-[0.7rem] text-(--color-muted)">
                        Add Rs. {(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} more for free shipping
                      </p>
                    )}
                    <div className="flex items-center justify-between border-t border-[rgba(155,122,67,0.12)] pt-4">
                      <span className="font-serif text-xl text-foreground">Total</span>
                      <div className="text-right">
                        <span className="font-serif text-xl text-foreground">Rs. {total.toLocaleString()}</span>
                        <div className="text-[0.68rem] uppercase tracking-[0.2em] text-(--color-muted)">PKR · COD</div>
                      </div>
                    </div>
                  </div>
                </section>

                <Button type="submit" variant="primary" size="lg" className="w-full">
                  Place order
                </Button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full cursor-pointer rounded-full border border-[rgba(155,122,67,0.18)] bg-transparent py-3 text-sm font-medium text-(--color-muted) transition hover:border-[rgba(155,122,67,0.35)] hover:text-foreground"
                >
                  Clear bag
                </button>
                <p className="text-center text-[0.7rem] leading-6 text-(--color-muted)">
                  By placing your order you agree to our{" "}
                  <Link href="/policies/terms-of-service" className="text-primary hover:underline">terms of service</Link>{" "}
                  and{" "}
                  <Link href="/policies/privacy-policy" className="text-primary hover:underline">privacy policy</Link>.
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
