"use client";
import React, { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import Drawer from "@mui/material/Drawer";
import { useShop } from "../context/ShopContext";
import { usePathname } from "next/navigation";
import Button from "./ui/Button";

const FALLBACK_CATEGORIES = ["Tote", "Shoulder", "Hobo", "Mini"];

export default function Header({ categories = [] }: { categories?: string[] }) {
  const { openSidebar, cart } = useShop();
  const rawPathname = usePathname();
  const pathname = rawPathname ?? "/";
  const [isMenuOpen, setMenuOpen] = useState(false);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const closeMenu = () => setMenuOpen(false);

  // Use DB categories (strip "All"), fall back to hardcoded set
  const navCategories = categories.filter((c) => c !== "All");
  const displayCategories = navCategories.length > 0 ? navCategories : FALLBACK_CATEGORIES;

  const linkClass =
    "inline-flex h-10 items-center rounded-full px-3 text-sm transition hover:bg-[rgba(155,122,67,0.08)] hover:text-primary";
  const activeLinkClass =
    "inline-flex h-10 items-center rounded-full bg-[rgba(155,122,67,0.1)] px-3 text-sm font-semibold text-primary";

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-[rgba(155,122,67,0.14)] bg-[rgba(246,241,232,0.92)] backdrop-blur-md"
      suppressHydrationWarning
    >
      <div className="mx-auto flex min-h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex h-10 items-center font-serif text-2xl font-bold tracking-tight"
          style={{ fontFamily: "Playfair Display, serif" }}
        >
          Pursethetic
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          <Link href="/" className={pathname === "/" ? activeLinkClass : linkClass}>
            Home
          </Link>
          <Link href="/collection" className={pathname.startsWith("/collection") ? activeLinkClass : linkClass}>
            Collection
          </Link>
          <Link href="/about" className={pathname === "/about" ? activeLinkClass : linkClass}>
            About
          </Link>
          <Link href="/contact" className={pathname === "/contact" ? activeLinkClass : linkClass}>
            Contact
          </Link>

          <button
            type="button"
            aria-label={`Open cart${totalItems > 0 ? `, ${totalItems} item${totalItems === 1 ? "" : "s"}` : ""}`}
            onClick={openSidebar}
            className="relative ml-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-foreground transition hover:bg-[rgba(155,122,67,0.08)] hover:text-primary"
          >
            <ShoppingBagIcon fontSize="small" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.6rem] font-bold text-white">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            aria-label={`Open cart${totalItems > 0 ? `, ${totalItems} item${totalItems === 1 ? "" : "s"}` : ""}`}
            onClick={openSidebar}
            className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-foreground transition hover:bg-[rgba(155,122,67,0.08)] hover:text-primary"
          >
            <ShoppingBagIcon fontSize="small" />
            {totalItems > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.6rem] font-bold text-white">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
          <button
            type="button"
            aria-label="Open navigation menu"
            onClick={() => setMenuOpen(true)}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-foreground transition hover:bg-[rgba(155,122,67,0.08)]"
          >
            <MenuIcon fontSize="small" />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={closeMenu}
        slotProps={{
          paper: {
            sx: {
              borderRadius: 0,
              width: "100vw",
              maxWidth: 420,
              bgcolor: "transparent",
              background: "linear-gradient(180deg, rgba(255,250,241,0.98) 0%, rgba(246,241,232,1) 100%)",
            },
          },
        }}
      >
        <div className="flex h-full flex-col border-l border-[rgba(155,122,67,0.12)]">
          <div className="flex items-start justify-between border-b border-[rgba(155,122,67,0.12)] px-6 py-5">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-(--color-muted)">Menu</p>
              <h2 className="mt-2 font-serif text-2xl text-foreground">Navigate the atelier</h2>
            </div>
            <Button aria-label="Close menu" onClick={closeMenu} variant="ghost" size="sm" className="h-11 w-11 rounded-full p-0">
              <CloseIcon fontSize="small" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="grid gap-3">
              <Link
                href="/collection"
                onClick={closeMenu}
                className="group cursor-pointer rounded-3xl border border-[rgba(155,122,67,0.14)] bg-white/80 p-4 shadow-[0_16px_36px_rgba(61,47,28,0.06)] transition hover:border-[rgba(155,122,67,0.28)] hover:bg-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary">Shop</p>
                    <div className="mt-2 font-serif text-xl text-foreground">Collection</div>
                    <p className="mt-2 text-sm leading-6 text-(--color-muted)">Browse the full handbag edit.</p>
                  </div>
                  <span className="text-2xl text-primary transition group-hover:translate-x-1">→</span>
                </div>
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className="group cursor-pointer rounded-3xl border border-[rgba(155,122,67,0.14)] bg-white/80 p-4 shadow-[0_16px_36px_rgba(61,47,28,0.06)] transition hover:border-[rgba(155,122,67,0.28)] hover:bg-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary">Brand</p>
                    <div className="mt-2 font-serif text-xl text-foreground">About Us</div>
                    <p className="mt-2 text-sm leading-6 text-(--color-muted)">See the story behind the brand.</p>
                  </div>
                  <span className="text-2xl text-primary transition group-hover:translate-x-1">→</span>
                </div>
              </Link>

              <Link
                href="/contact"
                onClick={closeMenu}
                className="group cursor-pointer rounded-3xl border border-[rgba(155,122,67,0.14)] bg-white/80 p-4 shadow-[0_16px_36px_rgba(61,47,28,0.06)] transition hover:border-[rgba(155,122,67,0.28)] hover:bg-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-primary">Support</p>
                    <div className="mt-2 font-serif text-xl text-foreground">Contact Us</div>
                    <p className="mt-2 text-sm leading-6 text-(--color-muted)">Get in touch with our team.</p>
                  </div>
                  <span className="text-2xl text-primary transition group-hover:translate-x-1">→</span>
                </div>
              </Link>

              <Link
                href="/checkout"
                onClick={closeMenu}
                className="group cursor-pointer rounded-3xl border border-[rgba(155,122,67,0.14)] bg-foreground p-4 text-white shadow-[0_18px_40px_rgba(32,26,21,0.16)] transition hover:bg-[#2d241d]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/65">Checkout</p>
                    <div className="mt-2 font-serif text-xl text-white">View bag</div>
                    <p className="mt-2 text-sm leading-6 text-white/75">
                      {totalItems > 0
                        ? `${totalItems} item${totalItems === 1 ? "" : "s"} in your bag`
                        : "Review your cart before payment."}
                    </p>
                  </div>
                  <span className="text-2xl text-white transition group-hover:translate-x-1">↗</span>
                </div>
              </Link>
            </div>

            {/* Dynamic categories */}
            <div className="mt-6 rounded-[1.6rem] border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.88)] p-4 shadow-[0_16px_36px_rgba(61,47,28,0.05)]">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-(--color-muted)">
                Shop by category
              </p>
              <div className="mt-3 grid gap-1 text-sm text-foreground">
                {displayCategories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/collection?category=${encodeURIComponent(cat)}`}
                    onClick={closeMenu}
                    className="cursor-pointer rounded-full px-3 py-2 transition hover:bg-white hover:text-primary"
                  >
                    {cat} bags
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
