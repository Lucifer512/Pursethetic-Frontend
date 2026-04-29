"use client";

import dynamic from "next/dynamic";
import React from "react";

const Header = dynamic(() => import("../components/Header"), { ssr: false });
const CartSidebar = dynamic(() => import("../components/CartSidebar"), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <CartSidebar />
    </>
  );
}
