import type { Metadata } from "next";
import ContentPageShell from "@/components/site/ContentPageShell";
import PolicySection from "@/components/site/PolicySection";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description: "Pursethetic shipping policy covering processing times, domestic and international delivery, tracking, and support.",
};

export default function ShippingPolicyPage() {
  return (
    <ContentPageShell
      eyebrow="Shipping policy"
      title="We aim to deliver your order quickly, safely, and with care."
      description="Below is everything you need to know about processing, domestic delivery in Pakistan, international shipping, tracking, and how to reach us if there is a delivery issue."
      primaryHref="mailto:pursethetic.official@gmail.com"
      primaryLabel="Email support"
      secondaryHref="https://wa.me/+923259726312?text="
      secondaryLabel="WhatsApp us"
    >
      <div className="space-y-5">
        <PolicySection title="Processing time" eyebrow="1">
          <p>All orders are processed within 1–2 business days excluding weekends and holidays.</p>
          <p>Orders placed after 5 PM (PKT) are processed the next business day.</p>
          <p>If there is any delay due to stock or verification issues, we will notify you via email.</p>
        </PolicySection>

        <PolicySection title="Domestic shipping within Pakistan" eyebrow="2">
          <p>Standard delivery is typically 2–5 business days after processing.</p>
          <p>Express delivery is available in select cities and may take 1–2 business days.</p>
          <p>Shipping costs are calculated at checkout based on location and delivery speed.</p>
        </PolicySection>

        <PolicySection title="International shipping" eyebrow="3">
          <p>We proudly ship worldwide.</p>
          <p>Express shipping via leading couriers like DHL or FedEx generally takes 2–5 business days depending on your country.</p>
          <p>Economy shipping generally takes 6–12 business days.</p>
          <p>Customs or import duties, if applicable, are the customer's responsibility.</p>
        </PolicySection>

        <PolicySection title="Order tracking" eyebrow="4">
          <p>Once your order has shipped, you will receive an email confirmation with a tracking number so you can monitor your package every step of the way.</p>
        </PolicySection>

        <PolicySection title="Shipping costs and delivery issues" eyebrow="5">
          <p>Shipping charges are calculated at checkout based on your location and chosen delivery method. Select promotions may include free shipping where displayed at checkout.</p>
          <p>Please ensure your shipping address is correct. Pursethetic is not responsible for delays or lost orders due to incorrect addresses provided by the customer.</p>
          <p>If your order is lost or delayed, contact us at pursethetic.official@gmail.com and we will work with our courier partners to resolve the issue.</p>
        </PolicySection>

        <PolicySection title="Questions about shipping?" eyebrow="6">
          <p>Email: pursethetic.official@gmail.com</p>
          <p>WhatsApp: 03259726312</p>
          <p>We are here to help ensure your Pursethetic order reaches you on time and in perfect condition.</p>
        </PolicySection>
      </div>
    </ContentPageShell>
  );
}