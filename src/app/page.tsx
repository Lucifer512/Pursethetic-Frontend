import type { Metadata } from "next";
import PremiumHomePage from "@/components/home/PremiumHomePage";
import { getAllProducts, getFeaturedProducts, getCategories, getCollections } from "@/lib/db";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pursethetic.com";

export const metadata: Metadata = {
  title: "Luxury Handbags & Editorial Collections",
  description:
    "Explore premium handbags from Pursethetic, including totes, shoulder bags, hobos, and mini styles presented in an editorial ecommerce experience.",
  alternates: {
    canonical: "/",
  },
  keywords: ["luxury handbags", "premium handbags", "handbag collection", "tote bags", "shoulder bags", "hobo bags", "mini bags"],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Luxury Handbags & Editorial Collections | Pursethetic",
    description:
      "Shop premium handbags, discover curated collection moments, and browse tote, shoulder, hobo, and mini styles with a polished luxury feel.",
    images: [
      {
        url: "/banner-1.jpg",
        width: 1200,
        height: 630,
        alt: "Pursethetic luxury handbag editorial homepage",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Handbags & Editorial Collections | Pursethetic",
    description:
      "Shop premium handbags and curated collection edits from Pursethetic.",
    images: ["/banner-1.jpg"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Pursethetic",
      url: siteUrl,
      logo: `${siteUrl}/banner-1.jpg`,
      image: `${siteUrl}/banner-1.jpg`,
    },
    {
      "@type": "WebSite",
      name: "Pursethetic",
      url: siteUrl,
      description:
        "Premium handbags and editorial collection edits from Pursethetic.",
    },
  ],
};

export default async function HomePage() {
  const [products, featuredProducts, categories, collections] = await Promise.all([
    getAllProducts(),
    getFeaturedProducts(),
    getCategories(),
    getCollections(),
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <PremiumHomePage
        products={products}
        featuredProducts={featuredProducts}
        categories={categories}
        collections={collections}
      />
    </>
  );
}
