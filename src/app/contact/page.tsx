import type { Metadata } from "next";
import ContentPageShell from "@/components/site/ContentPageShell";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Pursethetic support by email or WhatsApp for order help, product questions, returns, and exchange requests.",
};

const contactDetails = [
  { label: "Email", value: "pursethetic.official@gmail.com", href: "mailto:pursethetic.official@gmail.com" },
  { label: "WhatsApp", value: "03259726312", href: "https://wa.me/+923259726312?text=" },
  { label: "Response time", value: "Within 24–48 hours", href: "#" },
];

export default function ContactPage() {
  return (
    <ContentPageShell
      eyebrow="Contact information"
      title="Have a question about your order or a piece in the collection?"
      description="Our Pursethetic support team is here to help with order questions, exchanges, and product details. We respond Monday to Saturday, with most replies within 24–48 hours."
      primaryHref="mailto:pursethetic.official@gmail.com"
      primaryLabel="Email support"
      secondaryHref="https://wa.me/+923259726312?text="
      secondaryLabel="Message on WhatsApp"
    >
      <div className="grid gap-5 md:grid-cols-3">
        {contactDetails.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="rounded-[1.6rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.9)] p-5 shadow-[0_16px_36px_rgba(61,47,28,0.06)] transition hover:-translate-y-0.5 hover:border-[rgba(155,122,67,0.3)]"
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[var(--color-muted)]">{item.label}</p>
            <p className="mt-3 font-serif text-2xl text-[var(--foreground)]">{item.value}</p>
          </a>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-[1.8rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.92)] p-6 shadow-[0_18px_45px_rgba(61,47,28,0.08)]">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[var(--color-primary)]">Business hours</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
            <p>Monday – Saturday: 10:00 AM – 7:00 PM (PKT)</p>
            <p>Sunday: Closed</p>
            <p>Orders placed on Sunday are processed the next business day.</p>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.92)] p-6 shadow-[0_18px_45px_rgba(61,47,28,0.08)]">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[var(--color-primary)]">Support details</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
            <p>Have an issue with an exchange, delivery, or product condition? Reach out as soon as possible so we can help.</p>
            <p>For policy questions, you can also review our shipping, refund, privacy, and terms pages from the footer.</p>
          </div>
        </div>
      </div>
    </ContentPageShell>
  );
}