"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import QuickViewModal from "../QuickViewModal";
import { type Product } from "../../data/products";
import { type Collection } from "../../lib/db";
import MarqueeStrip from "./MarqueeStrip";
import ProcessSection from "./ProcessSection";
import MobileCartFab from "./MobileCartFab";
import LuxuryProductCard from "./LuxuryProductCard";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

type LuxuryButtonProps = {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
};

function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function LuxuryButton({ href, children, tone = "dark", className = "" }: LuxuryButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-[0.12em] uppercase transition duration-300 will-change-transform";
  const variant =
    tone === "dark"
      ? "bg-[var(--color-primary)] text-white shadow-[0_18px_40px_rgba(155,122,67,0.22)] hover:-translate-y-0.5 hover:bg-[#8c6e41]"
      : "border border-[rgba(155,122,67,0.24)] bg-[rgba(255,250,241,0.9)] text-[var(--foreground)] backdrop-blur-sm hover:-translate-y-0.5 hover:border-[rgba(155,122,67,0.45)] hover:bg-white";
  return (
    <Link href={href} className={`${base} ${variant} ${className}`}>
      {children}
    </Link>
  );
}

function SectionLabel({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-2xl">
      <p className="mb-4 text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-[var(--color-primary)]">{eyebrow}</p>
      <h2 className="font-serif text-3xl leading-tight text-[var(--foreground)] sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-5 max-w-xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">{description}</p>
    </div>
  );
}

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-[1.35rem] border border-[rgba(155,122,67,0.16)] bg-[rgba(255,250,241,0.82)] px-4 py-4 text-left shadow-[0_14px_34px_rgba(61,47,28,0.06)] backdrop-blur-sm">
      <div className="font-serif text-2xl text-[var(--foreground)]">{value}</div>
      <div className="mt-1 text-[0.72rem] uppercase tracking-[0.24em] text-[var(--color-muted)]">{label}</div>
    </div>
  );
}

type SpotlightMode = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  product: Product;
  secondaryProduct: Product;
};

type CategoryShowcase = {
  id: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  productIds: string[];
};

type HomePageProps = {
  products: Product[];
  featuredProducts: Product[];
  categories?: string[];
  collections?: Collection[];
};


const trustSignals = [
  { value: "4.9/5", label: "Average rating" },
  { value: "24h", label: "Support response" },
  { value: "7 days", label: "Exchange window" },
];

const serviceCards = [
  {
    title: "Premium shipping",
    description: "Fast nationwide delivery with elegant packaging and tracking from checkout to doorstep.",
  },
  {
    title: "Meticulous quality",
    description: "Every product is selected for finish, shape, and a polished everyday feel.",
  },
  {
    title: "Dedicated support",
    description: "Responsive help for sizing, styling, and order questions before and after purchase.",
  },
  {
    title: "Flexible returns",
    description: "A simple exchange process that keeps luxury shopping calm and low-friction.",
  },
];

const testimonials = [
  {
    quote: "The presentation feels like a true luxury house. The bags arrived beautifully packed and the site makes the brand feel premium.",
    name: "Amina Q.",
    role: "Frequent shopper",
  },
  {
    quote: "The product detail and styling are clean, confident, and easy to trust. It feels much more elevated than a typical storefront.",
    name: "Hassan R.",
    role: "Returning customer",
  },
  {
    quote: "Every section has breathing room. The experience is calm, modern, and conversion-friendly without looking generic.",
    name: "Maya S.",
    role: "Style editor",
  },
];

// Editorial copy per known category name — generic fallback for any DB-defined category
const CATEGORY_EDITORIAL: Record<string, { label: string; eyebrow: string; title: string; description: string }> = {
  Tote: {
    label: "Totes",
    eyebrow: "Daily structure",
    title: "Totes with room for work, travel, and a more composed everyday routine.",
    description: "Explore clean-lined tote bags when you want storage, shape, and a polished luxury feel in the same piece.",
  },
  Shoulder: {
    label: "Shoulder bags",
    eyebrow: "Style first",
    title: "Shoulder bags that balance fashion-forward polish with everyday versatility.",
    description: "A refined shoulder-bag selection for customers looking for a clean silhouette and a modern finish.",
  },
  Hobo: {
    label: "Hobos",
    eyebrow: "Soft structure",
    title: "Hobo bags with a relaxed profile and enough volume for the essentials.",
    description: "This edit keeps the homepage descriptive for search while letting shoppers jump into the most fluid silhouettes.",
  },
  Mini: {
    label: "Mini bags",
    eyebrow: "Compact icons",
    title: "Mini bags for occasions where the silhouette should feel smaller, sharper, and more expressive.",
    description: "Use the mini edit to keep occasion-focused handbag terms in view while showcasing the most compact pieces.",
  },
};

const FALLBACK_CATEGORY_NAMES = ["Tote", "Shoulder", "Hobo", "Mini"];

function buildCategoryShowcases(categories: string[], products: Product[]): CategoryShowcase[] {
  // Strip "All" from the front, fall back to hardcoded 4 if empty
  const names = categories.filter((c) => c !== "All");
  const sourceNames = names.length > 0 ? names : FALLBACK_CATEGORY_NAMES;

  return sourceNames.map((name) => {
    const editorial = CATEGORY_EDITORIAL[name] ?? {
      label: `${name} bags`,
      eyebrow: name,
      title: `${name} bags crafted with premium materials and refined lines.`,
      description: `Discover our curated selection of ${name.toLowerCase()} handbags, each chosen for its finish and everyday appeal.`,
    };
    return {
      id: name.toLowerCase().replace(/\s+/g, "-"),
      ...editorial,
      href: `/collection?category=${encodeURIComponent(name)}`,
      productIds: products.filter((p) => p.category === name).slice(0, 3).map((p) => p.id),
    };
  });
}

export default function PremiumHomePage({ products, featuredProducts, categories = [], collections = [] }: HomePageProps) {
  const heroSpotlights: SpotlightMode[] = [
    {
      id: "signature",
      label: "Signature drop",
      eyebrow: "Signature edit",
      title: "Luxury handbags designed with calm, editorial precision.",
      description:
        "The opening story keeps the focus on structured carry, warm neutrals, and a polished silhouette that feels elevated from the first glance.",
      product: featuredProducts[0] ?? products[0],
      secondaryProduct: featuredProducts[1] ?? products[1],
    },
    {
      id: "everyday",
      label: "Everyday carry",
      eyebrow: "Workday edit",
      title: "Soft shoulder bags and totes that move easily from office hours to evening plans.",
      description: "A practical edit for shoppers who want a premium handbag that still feels effortless for daily wear.",
      product: products.find((p) => p.category === "Tote") ?? featuredProducts[0] ?? products[0],
      secondaryProduct: products.find((p) => p.category === "Shoulder") ?? featuredProducts[1] ?? products[1],
    },
    {
      id: "occasion",
      label: "Occasion edit",
      eyebrow: "Evening edit",
      title: "Compact mini bags and statement colorways for dressier moments.",
      description:
        "A smaller, sharper handbag story that keeps the homepage grounded in occasion-ready category language.",
      product: featuredProducts[2] ?? products[2],
      secondaryProduct: products.find((p) => p.category === "Mini") ?? products[2],
    },
  ];

  const categoryShowcases = buildCategoryShowcases(categories, products);

  function getProductById(productId: string) {
    return products.find((p) => p.id === productId);
  }

  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const [activeSpotlightId, setActiveSpotlightId] = useState(heroSpotlights[0].id);
  const [activeCategoryId, setActiveCategoryId] = useState(categoryShowcases[0]?.id ?? "");
  const activeSpotlight = heroSpotlights.find((s) => s.id === activeSpotlightId) ?? heroSpotlights[0];
  const activeCategory = categoryShowcases.find((c) => c.id === activeCategoryId) ?? categoryShowcases[0];
  const activeCategoryProducts = (activeCategory?.productIds ?? [])
    .map((id) => getProductById(id))
    .filter((p): p is Product => Boolean(p));
  const heroProduct = activeSpotlight.product;
  const quickViewProduct = quickViewId ? products.find((p) => p.id === quickViewId) : undefined;
  const trendProducts = products.slice(3, 9);

  return (
    <main className="relative overflow-hidden bg-background text-[var(--foreground)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[36rem] bg-[radial-gradient(circle_at_top,rgba(196,162,105,0.16),transparent_42%)]" />
      <div className="pointer-events-none absolute right-0 top-40 h-72 w-72 rounded-full bg-[rgba(155,122,67,0.08)] blur-3xl" />
      <div className="pointer-events-none absolute left-0 top-[38rem] h-80 w-80 rounded-full bg-[rgba(32,26,21,0.05)] blur-3xl" />

      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-8 sm:px-6 lg:px-8 lg:pb-20 lg:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <Reveal className="relative z-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 rounded-full border border-[rgba(32,26,21,0.08)] bg-[rgba(255,250,241,0.8)] px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[var(--color-primary)] backdrop-blur-sm">
                Premium handbag atelier
              </div>
              <h1 className="mt-7 font-serif text-5xl leading-[0.92] tracking-[-0.04em] text-[var(--foreground)] sm:text-6xl lg:text-[5.4rem]">
                Luxury handbags designed with calm, editorial precision.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
                A refined ecommerce experience for a modern accessory brand. Explore understated silhouettes, warm neutrals, and premium details presented with fashion-house restraint.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <LuxuryButton href="/collection" tone="dark">Shop collection</LuxuryButton>
                <LuxuryButton href={`/product/${encodeURIComponent(heroProduct.id)}`} tone="light">Meet the icon</LuxuryButton>
              </div>

              <p className="mt-7 max-w-xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">{activeSpotlight.description}</p>

              <div className="mt-8 flex flex-wrap gap-2">
                {heroSpotlights.map((spotlight) => {
                  const isActive = spotlight.id === activeSpotlight.id;
                  return (
                    <button
                      key={spotlight.id}
                      type="button"
                      onClick={() => setActiveSpotlightId(spotlight.id)}
                      aria-pressed={isActive}
                      className={`rounded-full border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] transition duration-300 ${
                        isActive
                          ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_12px_26px_rgba(155,122,67,0.22)]"
                          : "border-[rgba(32,26,21,0.1)] bg-[rgba(255,250,241,0.85)] text-[var(--color-muted)] hover:border-[rgba(155,122,67,0.45)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {spotlight.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 sm:gap-4">
                {trustSignals.map((signal) => (
                  <StatBlock key={signal.label} value={signal.value} label={signal.label} />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="relative mx-auto max-w-[34rem] lg:max-w-none">
              <div className="absolute -left-5 top-10 hidden w-52 rounded-[1.8rem] border border-[rgba(155,122,67,0.16)] bg-[rgba(255,250,241,0.9)] p-4 shadow-[0_18px_40px_rgba(32,26,21,0.12)] backdrop-blur-md sm:block">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">Featured palette</p>
                <div className="mt-3 flex gap-2">
                  <span className="h-10 w-10 rounded-full bg-[#efe6d4]" />
                  <span className="h-10 w-10 rounded-full bg-[#d6c1a4]" />
                  <span className="h-10 w-10 rounded-full bg-[#9b7a43]" />
                  <span className="h-10 w-10 rounded-full bg-[#201a15]" />
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-[rgba(32,26,21,0.08)] bg-[rgba(255,250,241,0.72)] p-3 shadow-[0_30px_90px_rgba(61,47,28,0.14)] backdrop-blur-sm sm:p-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-[#efe6d6]">
                  <Image
                    src={heroProduct.image}
                    alt={heroProduct.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 92vw, 46vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
                  <div className="absolute left-5 top-5 rounded-full bg-white/20 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white backdrop-blur-md">
                    {activeSpotlight.eyebrow}
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                    <div>
                      <p className="text-[0.7rem] uppercase tracking-[0.25em] text-white/80">Featured piece</p>
                      <p className="mt-2 font-serif text-2xl">{heroProduct.name}</p>
                      <p className="mt-1 text-sm leading-6 text-white/78">{activeSpotlight.title}</p>
                    </div>
                    <p className="font-serif text-xl">Rs. {heroProduct.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 right-4 hidden w-56 rounded-[1.65rem] border border-[rgba(155,122,67,0.16)] bg-[rgba(255,250,241,0.94)] p-4 shadow-[0_20px_40px_rgba(32,26,21,0.1)] backdrop-blur-md lg:block">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">Style note</p>
                <p className="mt-3 font-serif text-lg text-[var(--foreground)]">
                  Quiet luxury pieces with enough structure to feel polished and enough softness to feel wearable.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Marquee strip ── */}
      <MarqueeStrip />

      {/* ── Shop by category ── */}
      {categoryShowcases.length > 0 && (
        <section id="shop-by-category" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <SectionLabel
              eyebrow="Shop by category"
              title="Browse handbags by shape, mood, and everyday use."
              description="This interactive section keeps tote, shoulder, hobo, and mini language visible while directing shoppers deeper into the catalog."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
            <Reveal>
              <div className="rounded-[2.25rem] border border-[rgba(32,26,21,0.08)] bg-[rgba(255,250,241,0.9)] p-6 shadow-[0_24px_70px_rgba(61,47,28,0.08)] sm:p-8 lg:p-10">
                <div className="flex flex-wrap gap-2">
                  {categoryShowcases.map((cat) => {
                    const isActive = cat.id === activeCategory?.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategoryId(cat.id)}
                        aria-pressed={isActive}
                        className={`rounded-full border px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.28em] transition duration-300 ${
                          isActive
                            ? "border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-[0_12px_26px_rgba(155,122,67,0.22)]"
                            : "border-[rgba(32,26,21,0.1)] bg-white/60 text-[var(--color-muted)] hover:border-[rgba(155,122,67,0.45)] hover:text-[var(--foreground)]"
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {activeCategory && (
                  <div className="mt-8">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.36em] text-[var(--color-primary)]">{activeCategory.eyebrow}</p>
                    <h3 className="mt-4 font-serif text-3xl text-[var(--foreground)] sm:text-4xl">{activeCategory.title}</h3>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">{activeCategory.description}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <LuxuryButton href={activeCategory.href} tone="dark">Browse category</LuxuryButton>
                      <LuxuryButton href="/collection" tone="light">View all bags</LuxuryButton>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>

            <div className="grid gap-5 md:grid-cols-2">
              {activeCategoryProducts.slice(0, 2).map((product, index) => (
                <Reveal key={product.id} delay={index * 0.07}>
                  <LuxuryProductCard product={product} onQuickView={setQuickViewId} compact />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Collections ── (only rendered when DB has active collections) */}
      {collections.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <Reveal>
            <SectionLabel
              eyebrow="Curated collections"
              title="Handpicked edits crafted around a single mood or moment."
              description="Each collection is a tightly curated selection of pieces that work together — shop the full edit or explore individual styles."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((col, index) => (
              <Reveal key={col.id} delay={index * 0.07}>
                <Link
                  href={`/collection?set=${encodeURIComponent(col.slug)}`}
                  className="group block overflow-hidden rounded-[1.75rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.94)] shadow-[0_24px_60px_rgba(61,47,28,0.08)] transition duration-300 hover:border-[rgba(155,122,67,0.28)] hover:shadow-[0_32px_70px_rgba(61,47,28,0.12)]"
                >
                  {col.cover_image ? (
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#f3ede1]">
                      <Image
                        src={col.cover_image}
                        alt={col.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent" />
                      {col.badge_text && (
                        <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-[rgba(155,122,67,0.82)] px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-white backdrop-blur-md">
                          {col.badge_text}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-t-[1.75rem] bg-[rgba(155,122,67,0.08)]">
                      {col.badge_text && (
                        <div className="absolute left-4 top-4 rounded-full border border-[rgba(155,122,67,0.3)] bg-[rgba(155,122,67,0.12)] px-3 py-1 text-[0.64rem] font-semibold uppercase tracking-[0.26em] text-primary">
                          {col.badge_text}
                        </div>
                      )}
                      <div className="flex h-full items-center justify-center">
                        <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 48 48" className="text-[rgba(155,122,67,0.25)]">
                          <rect x="6" y="6" width="16" height="16" rx="3" />
                          <rect x="26" y="6" width="16" height="16" rx="3" />
                          <rect x="6" y="26" width="16" height="16" rx="3" />
                          <rect x="26" y="26" width="16" height="16" rx="3" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-serif text-xl text-[var(--foreground)] transition duration-300 group-hover:text-[var(--color-primary)]">
                      {col.name}
                    </h3>
                    {col.tagline && (
                      <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{col.tagline}</p>
                    )}
                    <div className="mt-4 inline-flex items-center gap-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-[var(--color-primary)]">
                      Shop edit
                      <span className="transition duration-300 group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ── Trending ── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <SectionLabel
            eyebrow="Trending now"
            title="A horizontal runway of new arrivals and fresh colorways."
            description="This strip uses horizontal scrolling instead of another dense grid, which keeps the experience editorial and allows the products to breathe on smaller screens."
          />
        </Reveal>

        <div className="mt-10 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-5 pr-4">
            {trendProducts.map((product, index) => (
              <div key={product.id} className="w-[18rem] sm:w-[19rem]">
                <Reveal delay={index * 0.06}>
                  <LuxuryProductCard product={product} onQuickView={setQuickViewId} compact />
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why choose us ── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <SectionLabel
            eyebrow="Why choose us"
            title="Luxury service cues that make the shopping experience feel premium."
            description="Four clear trust signals, laid out with space and restraint, help convert without looking like a generic feature grid."
          />
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {serviceCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.06}>
              <div className="h-full rounded-[1.5rem] border border-[rgba(32,26,21,0.08)] bg-[rgba(255,250,241,0.88)] p-6 shadow-[0_18px_40px_rgba(61,47,28,0.08)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(155,122,67,0.12)] text-[var(--color-primary)]">
                  {index + 1}
                </div>
                <h3 className="mt-5 font-serif text-2xl text-[var(--foreground)]">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{card.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Social proof ── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <SectionLabel
            eyebrow="Social proof"
            title="Customer confidence, styled like a luxury lookbook."
            description="Testimonials and ratings are staged as polished editorial cards, making the proof feel premium rather than bolted on."
          />
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
          <Reveal>
            <div className="h-full rounded-[2rem] border border-[rgba(32,26,21,0.08)] bg-[rgba(255,250,241,0.9)] p-7 shadow-[0_20px_50px_rgba(61,47,28,0.08)]">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">Ratings</p>
              <div className="mt-5 flex items-end gap-4">
                <div className="font-serif text-6xl text-[var(--foreground)]">4.9</div>
                <div className="pb-1 text-sm text-[var(--color-muted)]">out of 5 from verified customers</div>
              </div>
              <div className="mt-6 flex gap-1 text-[var(--color-primary)]">
                {Array.from({ length: 5 }).map((_, index) => (
                  <span key={index} className="text-xl">★</span>
                ))}
              </div>
              <div className="mt-8 space-y-4">
                {[
                  { value: "1.8K+", label: "orders delivered" },
                  { value: "97%", label: "customer satisfaction" },
                  { value: "48h", label: "average dispatch time" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between rounded-[1.2rem] border border-[rgba(32,26,21,0.08)] px-4 py-4">
                    <span className="font-serif text-2xl text-[var(--foreground)]">{item.value}</span>
                    <span className="text-sm uppercase tracking-[0.18em] text-[var(--color-muted)]">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 0.08}>
                <div className="h-full rounded-[1.75rem] border border-[rgba(32,26,21,0.08)] bg-[rgba(255,250,241,0.88)] p-6 shadow-[0_18px_40px_rgba(61,47,28,0.08)]">
                  <p className="text-3xl leading-none text-[var(--color-primary)]">&ldquo;</p>
                  <p className="mt-4 text-sm leading-7 text-[var(--foreground)]">{testimonial.quote}</p>
                  <div className="mt-8 border-t border-[rgba(32,26,21,0.08)] pt-4">
                    <div className="font-serif text-lg text-[var(--foreground)]">{testimonial.name}</div>
                    <div className="mt-1 text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-muted)]">{testimonial.role}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our process ── */}
      <ProcessSection />

      {/* ── Editorial banners ── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-[rgba(32,26,21,0.08)] bg-[rgba(255,250,241,0.9)] shadow-[0_28px_70px_rgba(61,47,28,0.1)]">
              <div className="absolute inset-0 bg-gradient-to-r from-black/32 via-black/10 to-transparent" />
              <Image src="/banner-1.jpg" alt="Lifestyle banner" fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" />
              <div className="relative z-10 flex min-h-[24rem] flex-col justify-end p-7 text-white sm:p-10">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-white/80">Lifestyle edit</p>
                <h3 className="mt-4 max-w-xl font-serif text-3xl leading-tight sm:text-4xl">Styled for quiet weekends, workdays, and polished evenings.</h3>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="overflow-hidden rounded-[2.25rem] border border-[rgba(32,26,21,0.08)] bg-[rgba(255,250,241,0.9)] p-4 shadow-[0_22px_50px_rgba(61,47,28,0.08)]">
                <div className="relative aspect-[16/11] overflow-hidden rounded-[1.55rem]">
                  <Image src="/banner-2.jpg" alt="Promotional banner" fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                </div>
                <div className="mt-5 flex items-center justify-between gap-4 px-2 pb-2">
                  <div>
                    <h4 className="font-serif text-2xl text-[var(--foreground)]">Polished on arrival</h4>
                    <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">Premium packaging and a refined unboxing feel.</p>
                  </div>
                  <LuxuryButton href="/collection" tone="light">Discover</LuxuryButton>
                </div>
              </div>

              <div className="rounded-[2.25rem] border border-[rgba(32,26,21,0.08)] bg-[var(--foreground)] p-7 text-white shadow-[0_22px_50px_rgba(32,26,21,0.16)]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-white/65">Limited offer</p>
                <h4 className="mt-4 font-serif text-3xl leading-tight">Complimentary delivery over Rs. 4,000.</h4>
                <p className="mt-4 max-w-md text-sm leading-7 text-white/72">A conversion-focused banner with a luxury tone instead of a loud sales treatment.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Newsletter ── */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <Reveal>
          <div className="rounded-[2.25rem] border border-[rgba(32,26,21,0.08)] bg-[rgba(255,250,241,0.9)] p-6 shadow-[0_24px_70px_rgba(61,47,28,0.08)] sm:p-8 lg:p-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[var(--color-primary)]">Newsletter</p>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-[var(--foreground)] sm:text-4xl">Join the atelier list for drops, styling notes, and limited releases.</h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-muted)]">
                  Built like a premium conversion block, the newsletter section feels calm and editorial while still making the action obvious.
                </p>
              </div>

              <form className="grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={(event) => event.preventDefault()} aria-label="Newsletter signup">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                  <input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="h-14 rounded-full border border-[rgba(32,26,21,0.12)] bg-white px-5 text-sm text-[var(--foreground)] outline-none transition placeholder:text-[var(--color-muted)] focus:border-[rgba(155,122,67,0.5)] focus:ring-2 focus:ring-[rgba(155,122,67,0.12)]"
                  />
                </div>
                <button
                  type="submit"
                  className="h-14 cursor-pointer rounded-full bg-[var(--foreground)] px-7 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-[#342a21]"
                >
                  Subscribe
                </button>
                <p className="text-xs leading-6 text-[var(--color-muted)] sm:col-span-2">
                  No spam. Only product drops, edit notes, and early access to new arrivals.
                </p>
              </form>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.6)]">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr]">
            <div>
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.34em] text-[var(--color-primary)]">Pursethetic</p>
              <p className="mt-4 max-w-md font-serif text-3xl leading-tight text-[var(--foreground)]">
                Premium handbag essentials, designed with a luxury editorial lens.
              </p>
              <p className="mt-4 max-w-md text-sm leading-7 text-[var(--color-muted)]">
                Calm visuals, elevated spacing, and a refined product story built for a high-conversion premium storefront.
              </p>
            </div>
            <div>
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">Shop</h3>
              <ul className="mt-5 space-y-3 text-sm text-[var(--foreground)]">
                <li><Link href="/collection">Collections</Link></li>
                <li><Link href={`/product/${encodeURIComponent(heroProduct.id)}`}>Featured product</Link></li>
                <li><Link href="/checkout">Checkout</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">Experience</h3>
              <ul className="mt-5 space-y-3 text-sm text-[var(--foreground)]">
                <li><Link href="/about">About us</Link></li>
                <li><Link href="/policies/shipping-policy">Shipping policy</Link></li>
                <li><Link href="/policies/refund-policy">Refund policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">Contact</h3>
              <ul className="mt-5 space-y-3 text-sm text-[var(--foreground)]">
                <li><Link href="/contact">Contact us</Link></li>
                <li><Link href="/policies/privacy-policy">Privacy policy</Link></li>
                <li><Link href="/policies/terms-of-service">Terms of service</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-4 border-t border-[rgba(32,26,21,0.08)] pt-6 text-xs uppercase tracking-[0.28em] text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Pursethetic</span>
            <span>Luxury ecommerce experience</span>
          </div>
        </div>
      </footer>

      <MobileCartFab />
      <QuickViewModal open={!!quickViewProduct} product={quickViewProduct} onClose={() => setQuickViewId(null)} />
    </main>
  );
}
