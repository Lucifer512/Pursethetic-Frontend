import type { Metadata } from "next";
import Link from "next/link";
import ContentPageShell from "@/components/site/ContentPageShell";

export const metadata: Metadata = {
  title: "About Us",
  description: "Pursethetic creates premium, elegant handbags for women who value quality, style, and a polished everyday feel.",
};

const pillars = [
  {
    title: "Craftsmanship",
    description: "Each piece is selected for shape, finish, and the kind of quiet structure that feels intentional in real life.",
  },
  {
    title: "Attention to detail",
    description: "From the product story to the packaging feel, every touchpoint is built to feel calm, premium, and coherent.",
  },
  {
    title: "Customer satisfaction",
    description: "The experience is designed to be easy to browse, easy to trust, and easy to return to as the collection grows.",
  },
];

export default function AboutPage() {
  return (
    <ContentPageShell
      eyebrow="About Pursethetic"
      title="Designed for the modern Pakistani woman."
      description="Pursethetic was created with one mission: to bring premium, elegant handbags to women who value quality and style. We focus on craftsmanship, attention to detail, and customer satisfaction because you deserve the best."
      primaryHref="/collection"
      primaryLabel="Shop collection"
      secondaryHref="/contact"
      secondaryLabel="Contact us"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="rounded-[1.6rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.86)] p-5 shadow-[0_16px_36px_rgba(61,47,28,0.06)]">
            <h2 className="font-serif text-2xl text-[var(--foreground)]">{pillar.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{pillar.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[1.8rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.92)] p-6 shadow-[0_18px_45px_rgba(61,47,28,0.08)] sm:p-8">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[var(--color-primary)]">Why we exist</p>
        <p className="mt-4 max-w-3xl font-serif text-2xl leading-tight text-[var(--foreground)] sm:text-3xl">
          We want every visitor to feel like they are browsing a premium fashion edit, not a generic catalog.
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--color-muted)] sm:text-base">
          The homepage, product pages, and support pages are all designed to carry the same calm luxury language so the brand feels coherent from discovery to checkout.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/collection" className="text-sm font-medium uppercase tracking-[0.12em] text-[var(--color-primary)]">
            Explore the collection
          </Link>
          <span className="text-[var(--color-muted)]">•</span>
          <Link href="/contact" className="text-sm font-medium uppercase tracking-[0.12em] text-[var(--color-primary)]">
            Talk to us
          </Link>
        </div>
      </div>
    </ContentPageShell>
  );
}