import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BreadcrumbsNav from "../../../components/BreadcrumbsNav";
import ProductDetailClient from "../../../components/ProductDetailClient";
import { getProductById, getProductIds } from "@/lib/db";

type Props = {
  params: Promise<{ id: string }>;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pursethetic.com";

function absoluteUrl(pathname: string) {
  return new URL(pathname, siteUrl).toString();
}

export async function generateStaticParams() {
  const ids = await getProductIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product not found",
      description: "The requested product is not available in the Pursethetic catalog.",
    };
  }

  const pageTitle = `${product.name} Handbag`;

  return {
    title: pageTitle,
    description: product.description,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      type: "website",
      title: pageTitle,
      description: product.description,
      url: absoluteUrl(`/product/${product.slug}`),
      images: product.images.map((image) => ({ url: absoluteUrl(image), alt: product.name })),
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: product.description,
      images: [absoluteUrl(product.images[0])],
    },
    other: {
      "product:price:amount": product.price.toString(),
      "product:price:currency": "PKR",
      "product:availability": "in stock",
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => absoluteUrl(image)),
    sku: product.id,
    category: product.category,
    brand: { "@type": "Brand", name: "Pursethetic" },
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: product.price,
      availability: "https://schema.org/InStock",
      url: absoluteUrl(`/product/${product.slug}`),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        <BreadcrumbsNav
          items={[
            { label: "Home", href: "/" },
            { label: "Collection", href: "/collection" },
            { label: product.name, href: `/product/${product.slug}` },
          ]}
        />
      </div>
      <ProductDetailClient product={product} />
    </>
  );
}
