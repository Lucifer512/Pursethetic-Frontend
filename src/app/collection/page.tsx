import type { Metadata } from "next";
import CollectionPageClient from "../../components/CollectionPageClient";
import BreadcrumbsNav from "../../components/BreadcrumbsNav";
import { products } from "../../data/products";

type Props = {
  searchParams: Promise<{ category?: string; sort?: string }>;
};

const categoryDescriptionMap: Record<string, string> = {
  Hobo: "Relaxed hobo silhouettes for refined everyday style.",
  Tote: "Structured totes with elegant capacity and clean lines.",
  Shoulder: "Premium shoulder bags with elevated proportions.",
  Mini: "Compact mini bags designed for statement styling.",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pursethetic.com";

function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

function getSelectedCategory(category?: string) {
  if (!category || category === "All") {
    return "All";
  }

  return products.some((product) => product.category === category) ? category : "All";
}

function getCollectionSeo(selectedCategory: string) {
  const categoryCount = selectedCategory === "All" ? products.length : products.filter((product) => product.category === selectedCategory).length;
  const title = selectedCategory === "All" ? "Premium Collection" : `${selectedCategory} Bags`;
  const description =
    selectedCategory === "All"
      ? "Browse the full Pursethetic collection of premium minimalist handbags, curated for everyday polish and timeless style."
      : `${selectedCategory} handbags from Pursethetic, curated for ${categoryCount} premium styles.`;

  return { categoryCount, title, description };
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { category } = await searchParams;
  const selectedCategory = getSelectedCategory(category);
  const { categoryCount, title, description } = getCollectionSeo(selectedCategory);
  const canonicalPath = selectedCategory === "All" ? "/collection" : `/collection?category=${encodeURIComponent(selectedCategory)}`;

  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(canonicalPath),
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: absoluteUrl(canonicalPath),
      images: ["/banner-2.jpg"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/banner-2.jpg"],
    },
    keywords:
      selectedCategory === "All"
        ? ["Pursethetic", "handbags", "collection", "minimalist handbags", "designer bags"]
        : ["Pursethetic", selectedCategory, `${selectedCategory.toLowerCase()} bags`, "handbags", "collection"],
    other: {
      "collection:item-count": String(categoryCount),
    },
  };
}

export default async function CollectionPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const selectedCategory = getSelectedCategory(category);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Collection", href: "/collection" },
    ...(selectedCategory !== "All" ? [{ label: selectedCategory, href: `/collection?category=${encodeURIComponent(selectedCategory)}` }] : []),
  ];

  return (
    <>
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <BreadcrumbsNav items={breadcrumbItems} />
        <section id="hero" className="text-center mb-14">
          <h1 className="headline-text text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
            {selectedCategory === "All" ? "Premium Collection" : `${selectedCategory} Bags`}
          </h1>
          <p className="muted-text text-lg sm:text-xl max-w-2xl mx-auto mb-8">
            {selectedCategory !== "All"
              ? categoryDescriptionMap[selectedCategory] ?? `Curated ${selectedCategory.toLowerCase()} handbags crafted for a premium feel.`
              : "Discover the new standard for the modern muse. Effortless style, curated quality, and timeless design—crafted for you."}
          </p>
        </section>
        <CollectionPageClient initialCategory={selectedCategory} />
      </main>
    </>
  );
}
