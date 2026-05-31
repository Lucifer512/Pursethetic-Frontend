import type { Metadata } from "next";
import ContentPageShell from "@/components/site/ContentPageShell";
import PolicySection from "@/components/site/PolicySection";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Pursethetic refund policy explaining the 7-day exchange window, eligibility, damages, and non-returnable items.",
};

export default function RefundPolicyPage() {
  return (
    <ContentPageShell
      eyebrow="Refund policy"
      title="No returns and no refunds, but we do offer a 7-day exchange policy."
      description="You have 7 days after receiving your item to request an exchange, provided the item is unused, in original condition, with tags and packaging, and with proof of purchase."
      primaryHref="mailto:pursethetic.official@gmail.com"
      primaryLabel="Start an exchange"
      secondaryHref="/policies/contact-information"
      secondaryLabel="Contact information"
    >
      <div className="space-y-5">
        <PolicySection title="Eligibility" eyebrow="1">
          <p>
            To be eligible for an exchange, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You will also need the receipt or proof of purchase.
          </p>
        </PolicySection>

        <PolicySection title="How to start an exchange" eyebrow="2">
          <p>
            Contact us at pursethetic.official@gmail.com. If your exchange is accepted, we will send you a shipping label and instructions on how and where to send your package. Items sent back to us without first requesting an exchange will not be accepted.
          </p>
        </PolicySection>

        <PolicySection title="Damages and issues" eyebrow="3">
          <p>
            Please inspect your order upon reception and contact us immediately if the item is defective, damaged, or if you received the wrong item so that we can evaluate the issue and make it right.
          </p>
        </PolicySection>

        <PolicySection title="Exceptions and non-returnable items" eyebrow="4">
          <p>
            Certain items cannot be exchanged, including perishable goods, custom products, personal care goods, hazardous materials, flammable liquids, and gases. We also do not accept exchanges for sale items or gift cards.
          </p>
        </PolicySection>

        <PolicySection title="Exchanges" eyebrow="5">
          <p>
            The fastest way to ensure you get what you want is to exchange the item you have, and once the exchange is accepted, make a separate purchase for the new item.
          </p>
        </PolicySection>

        <PolicySection title="Questions" eyebrow="6">
          <p>
            You can always contact us for any exchange question at pursethetic.official@gmail.com.
          </p>
        </PolicySection>
      </div>
    </ContentPageShell>
  );
}