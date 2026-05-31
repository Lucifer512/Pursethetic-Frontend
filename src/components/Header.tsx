"use client";
import React, { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { useShop } from "../context/ShopContext";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname } from "next/navigation";
import Button from "./ui/Button";

export default function Header() {
  const { openSidebar } = useShop();
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const linkClass = "inline-flex h-10 items-center rounded-full px-3 transition hover:bg-[rgba(155,122,67,0.08)] hover:text-[var(--color-primary)]";
  const activeLinkClass = "inline-flex h-10 items-center rounded-full bg-[rgba(155,122,67,0.1)] px-3 font-semibold text-primary";

  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-40" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto flex min-h-18 items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="inline-flex h-10 items-center font-serif text-2xl font-bold tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
          Pursethetic
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-base font-medium">
          <Link href="/" className={pathname === "/" ? activeLinkClass : linkClass}>Home</Link>
          <Link href="/collection" className={pathname === "/collection" ? activeLinkClass : linkClass}>Collection</Link>
          <Link href="/about" className={pathname === "/about" ? activeLinkClass : linkClass}>About Us</Link>
          <Button aria-label="cart" onClick={openSidebar} variant="ghost" size="sm" className="h-10 w-10 rounded-full p-0 text-primary ml-0.5">
            <ShoppingBagIcon fontSize="inherit" />
          </Button>
        </nav>
        <div className="md:hidden flex items-center gap-1">
          <Button aria-label="cart" onClick={openSidebar} variant="ghost" size="sm" className="h-10 w-10 rounded-full p-0 text-primary">
            <ShoppingBagIcon fontSize="inherit" />
          </Button>
          <Button aria-label="menu" onClick={() => setMenuOpen(true)} variant="ghost" size="sm" className="h-10 w-10 rounded-full p-0">
            <MenuIcon fontSize="inherit" />
          </Button>
        </div>
      </div>
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
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.34em] text-[var(--color-muted)]">Menu</p>
              <h2 className="mt-2 font-serif text-2xl text-[var(--foreground)]">Navigate the atelier</h2>
            </div>
            <Button aria-label="close menu" onClick={closeMenu} variant="ghost" size="sm" className="h-10 w-10 rounded-full p-0">
              <CloseIcon fontSize="small" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="grid gap-3">
              <Link
                href="/collection"
                onClick={closeMenu}
                className="group rounded-[1.5rem] border border-[rgba(155,122,67,0.14)] bg-white/80 p-4 shadow-[0_16px_36px_rgba(61,47,28,0.06)] transition hover:border-[rgba(155,122,67,0.28)] hover:bg-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">Shop</p>
                    <div className="mt-2 font-serif text-xl text-[var(--foreground)]">Collection</div>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">Browse the full handbag edit.</p>
                  </div>
                  <span className="text-2xl text-[var(--color-primary)] transition group-hover:translate-x-1">→</span>
                </div>
              </Link>

              <Link
                href="/about"
                onClick={closeMenu}
                className="group rounded-[1.5rem] border border-[rgba(155,122,67,0.14)] bg-white/80 p-4 shadow-[0_16px_36px_rgba(61,47,28,0.06)] transition hover:border-[rgba(155,122,67,0.28)] hover:bg-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-primary)]">Brand</p>
                    <div className="mt-2 font-serif text-xl text-[var(--foreground)]">About Us</div>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">See the story behind the brand.</p>
                  </div>
                  <span className="text-2xl text-[var(--color-primary)] transition group-hover:translate-x-1">→</span>
                </div>
              </Link>

              <Link
                href="/checkout"
                onClick={closeMenu}
                className="group rounded-[1.5rem] border border-[rgba(155,122,67,0.14)] bg-[var(--foreground)] p-4 text-white shadow-[0_18px_40px_rgba(32,26,21,0.16)] transition hover:bg-[#2d241d]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/65">Checkout</p>
                    <div className="mt-2 font-serif text-xl text-white">View bag</div>
                    <p className="mt-2 text-sm leading-6 text-white/75">Review your cart before payment.</p>
                  </div>
                  <span className="text-2xl text-white transition group-hover:translate-x-1">↗</span>
                </div>
              </Link>
            </div>

            <div className="mt-6 rounded-[1.6rem] border border-[rgba(155,122,67,0.12)] bg-[rgba(255,250,241,0.88)] p-4 shadow-[0_16px_36px_rgba(61,47,28,0.05)]">
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">Explore</p>
              <div className="mt-3 grid gap-2 text-sm text-[var(--foreground)]">
                <Link href="/collection?category=Tote" onClick={closeMenu} className="rounded-full px-3 py-2 transition hover:bg-white hover:text-[var(--color-primary)]">
                  Totes
                </Link>
                <Link href="/collection?category=Shoulder" onClick={closeMenu} className="rounded-full px-3 py-2 transition hover:bg-white hover:text-[var(--color-primary)]">
                  Shoulder bags
                </Link>
                <Link href="/collection?category=Hobo" onClick={closeMenu} className="rounded-full px-3 py-2 transition hover:bg-white hover:text-[var(--color-primary)]">
                  Hobos
                </Link>
                <Link href="/collection?category=Mini" onClick={closeMenu} className="rounded-full px-3 py-2 transition hover:bg-white hover:text-[var(--color-primary)]">
                  Mini bags
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </header>
  );
}
