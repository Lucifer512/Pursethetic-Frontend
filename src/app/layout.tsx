import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import Providers from "../providers/Providers";
import ClientLayout from "../providers/ClientLayout";
import { BRAND_CSS_VARIABLES } from "../styles/tokens";

export const metadata: Metadata = {
  title: "Pursethetic",
  description: "Premium minimalist handbags",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased" style={BRAND_CSS_VARIABLES as CSSProperties} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
