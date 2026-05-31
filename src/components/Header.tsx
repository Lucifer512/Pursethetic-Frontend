"use client";
import React, { useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { useShop } from "../context/ShopContext";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname } from "next/navigation";
import { BRAND } from "../styles/tokens";
import Button from "./ui/Button";

export default function Header() {
  const { openSidebar } = useShop();
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const linkClass = "inline-flex h-10 items-center hover:opacity-70 transition";
  const activeLinkClass = "inline-flex h-10 items-center text-primary font-semibold";

  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-40" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto flex min-h-18 items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="inline-flex h-10 items-center font-serif text-2xl font-bold tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
          Pursethetic
        </Link>
        <nav className="hidden md:flex items-center gap-5 text-base font-medium">
          <Link href="/" className={pathname === "/" ? activeLinkClass : linkClass}>Home</Link>
          <Link href="/collection" className={pathname === "/collection" ? activeLinkClass : linkClass}>Collection</Link>
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
      <Drawer anchor="right" open={isMenuOpen} onClose={closeMenu} slotProps={{ paper: { sx: { borderRadius: 0, minWidth: 260, bgcolor: BRAND.background } } }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <span className="font-serif text-lg font-semibold">Menu</span>
          <Button aria-label="close menu" onClick={closeMenu} variant="ghost" size="sm" className="h-10 w-10 rounded-full p-0">
            <CloseIcon fontSize="small" />
          </Button>
        </div>
        <div className="flex flex-col gap-6 p-6 text-lg">
          <Link href="/" onClick={closeMenu}>Home</Link>
          <Link href="/collection" onClick={closeMenu}>Collection</Link>
        </div>
      </Drawer>
    </header>
  );
}
