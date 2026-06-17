import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import ClientLayout from "../providers/ClientLayout";
import Providers from "../providers/Providers";
import { BRAND_CSS_VARIABLES } from "../styles/tokens";
import ClientOnly from "../providers/ClientOnly";
import { getCategories } from "@/lib/db";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pursethetic.com"),
  title: {
    default: "Pursethetic",
    template: "%s | Pursethetic",
  },
  description: "Premium handbags and editorial ecommerce pages for Pursethetic.",
  openGraph: {
    type: "website",
    siteName: "Pursethetic",
    title: "Pursethetic",
    description: "Premium handbags and editorial ecommerce pages for Pursethetic.",
    images: ["/banner-1.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pursethetic",
    description: "Premium handbags and editorial ecommerce pages for Pursethetic.",
    images: ["/banner-1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categories = await getCategories();

  return (
    <html lang="en" className="h-full antialiased" style={BRAND_CSS_VARIABLES as CSSProperties} suppressHydrationWarning>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
          <ClientOnly>
            <Providers>
          <ClientLayout categories={categories}>{children}</ClientLayout>
            </Providers>
          </ClientOnly>
      </body>
    </html>
  );
}
