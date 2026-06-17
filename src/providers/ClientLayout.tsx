"use client";

import Header from "../components/Header";
import CartSidebar from "../components/CartSidebar";
import ClientOnly from "./ClientOnly";
import PageTransition from "../components/PageTransition";

type Props = {
  children: React.ReactNode;
  categories?: string[];
};

export default function ClientLayout({ children, categories = [] }: Props) {
  return (
    <>
      <ClientOnly>
        <Header categories={categories} />
      </ClientOnly>
      <PageTransition>{children}</PageTransition>
      <ClientOnly>
        <CartSidebar />
      </ClientOnly>
    </>
  );
}
