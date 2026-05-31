import type { Metadata } from "next";
import ContentPageShell from "@/components/site/ContentPageShell";

export const metadata: Metadata = {
  title: "Contact Information",
  description: "Official Pursethetic support contact details, business hours, and response expectations.",
};

export default function ContactInformationPage() {
  return (
    <ContentPageShell
      eyebrow="Contact information"
      title="Questions about your order, returns, or products? Our support team is here to help."
      description="Reach out using the official Pursethetic support details below."
      primaryHref="mailto:pursethetic.official@gmail.com"
      primaryLabel="Email support"
      secondaryHref="https://wa.me/+923259726312?text="
      secondaryLabel="WhatsApp support"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[1.8rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.92)] p-6 shadow-[0_18px_45px_rgba(61,47,28,0.08)] sm:p-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-primary">Customer support</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-(--color-muted)">
            <p>Email: <a href="mailto:pursethetic.official@gmail.com" className="text-primary">pursethetic.official@gmail.com</a></p>
            <p>WhatsApp: 03259726312</p>
            <p>Response time: Within 24–48 hours (Monday to Saturday)</p>
          </div>
        </div>

        <div className="rounded-[1.8rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.92)] p-6 shadow-[0_18px_45px_rgba(61,47,28,0.08)] sm:p-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-primary">Business hours</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-(--color-muted)">
            <p>Monday – Saturday: 10:00 AM – 7:00 PM (PKT)</p>
            <p>Sunday: Closed</p>
            <p>Orders placed on Sunday will be processed the next business day.</p>
          </div>
        </div>
      </div>
    </ContentPageShell>
  );
}