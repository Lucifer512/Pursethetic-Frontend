import type { Metadata } from "next";
import Link from "next/link";
import ContentPageShell from "@/components/site/ContentPageShell";

export const metadata: Metadata = {
  title: "Policies",
  description: "Browse Pursethetic's privacy policy, refund policy, shipping policy, terms of service, and contact information.",
};

const policyPages = [
  { title: "Privacy policy", href: "/policies/privacy-policy", description: "How we collect, use, disclose, and protect your information." },
  { title: "Refund policy", href: "/policies/refund-policy", description: "Our 7-day exchange policy and non-returnable item details." },
  { title: "Shipping policy", href: "/policies/shipping-policy", description: "Processing, delivery windows, tracking, and shipping support." },
  { title: "Terms of service", href: "/policies/terms-of-service", description: "Store terms, responsibilities, and legal conditions for using the site." },
  { title: "Contact information", href: "/policies/contact-information", description: "Official support details, hours, and response expectations." },
];

export default function PoliciesIndexPage() {
  return (
    <ContentPageShell
      eyebrow="Policies"
      title="Trust pages that explain how Pursethetic works."
      description="These pages mirror the live store's support and policy structure so customers can quickly find the information they need before and after purchase."
      primaryHref="/contact"
      primaryLabel="Contact us"
      secondaryHref="/about"
      secondaryLabel="About us"
    >
      <div className="grid gap-5 md:grid-cols-2">
        {policyPages.map((page) => (
          <Link key={page.title} href={page.href} className="rounded-[1.8rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.92)] p-6 shadow-[0_18px_45px_rgba(61,47,28,0.08)] transition hover:-translate-y-0.5 hover:border-[rgba(155,122,67,0.3)]">
            <h2 className="font-serif text-2xl text-[var(--foreground)]">{page.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{page.description}</p>
          </Link>
        ))}
      </div>
    </ContentPageShell>
  );
}