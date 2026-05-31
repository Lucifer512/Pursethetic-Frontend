"use client";

import Header from "../components/Header";
import CartSidebar from "../components/CartSidebar";
import ClientOnly from "./ClientOnly";
import PageTransition from "../components/PageTransition";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientOnly>
        <Header />
      </ClientOnly>
      <PageTransition>{children}</PageTransition>
      <ClientOnly>
        <CartSidebar />
      </ClientOnly>
    </>
  );
}

