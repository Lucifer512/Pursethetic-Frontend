import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import Providers from "../providers/Providers";

import Header from "../components/Header";
import CartSidebar from "../components/CartSidebar";
import { BRAND_CSS_VARIABLES } from "../styles/tokens";

export const metadata: Metadata = {
  title: "Pursethetic",
  description: "Premium minimalist handbags",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" style={BRAND_CSS_VARIABLES as CSSProperties}>
      <body className="min-h-full flex flex-col">
        <Providers>
          <Header />
          {children}
          <CartSidebar />
        </Providers>
      </body>
    </html>
  );
}
