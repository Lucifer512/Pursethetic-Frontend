import type { MetadataRoute } from "next";
import { products } from "../data/products";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pursethetic.com";

function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

function uniqueCategories() {
  return Array.from(new Set(products.map((product) => product.category))).sort();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const categoryPaths = uniqueCategories().map((category) => ({
    url: absoluteUrl(`/collection?category=${encodeURIComponent(category)}`),
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.75,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: absoluteUrl("/collection"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...categoryPaths,
    ...products.map((product) => ({
      url: absoluteUrl(`/product/${product.slug}`),
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: [absoluteUrl(product.image)],
    })),
  ];
}
