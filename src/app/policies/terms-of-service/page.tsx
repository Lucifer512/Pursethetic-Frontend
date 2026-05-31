import type { Metadata } from "next";
import ContentPageShell from "@/components/site/ContentPageShell";
import PolicySection from "@/components/site/PolicySection";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Pursethetic terms of service covering access, orders, pricing, shipping, intellectual property, liability, and contact information.",
};

const sections = [
  {
    title: "Overview",
    text: "Welcome to Pursethetic. The terms 'we', 'us', and 'our' refer to Pursethetic. By visiting, interacting with, or using our Services, you agree to be bound by these Terms of Service and our Privacy Policy.",
  },
  {
    title: "Access and account",
    text: "To use the Services, you may be asked to provide information such as your email address, billing, payment, and shipping information. You are responsible for maintaining the security of your account credentials and all account activity.",
  },
  {
    title: "Our products",
    text: "We make every effort to provide an accurate representation of our products and services, but colors or appearance may differ by device. Product descriptions are subject to change and we may discontinue or limit products at our discretion.",
  },
  {
    title: "Orders, prices, and billing",
    text: "When you place an order, you are making an offer to purchase. Orders are not accepted until Pursethetic confirms acceptance and receives payment. Prices and promotions may change without notice and posted prices may exclude taxes, shipping, handling, or import charges.",
  },
  {
    title: "Shipping and delivery",
    text: "We are not liable for shipping and delivery delays. All delivery times are estimates only and are not guaranteed. Once products are transferred to the carrier, title and risk of loss passes to you.",
  },
  {
    title: "Intellectual property",
    text: "Our Services, including trademarks, brands, text, displays, images, graphics, product reviews, video, and audio, are owned by Pursethetic, its affiliates, or licensors and are protected by law. You may not reproduce or distribute the material without written consent.",
  },
  {
    title: "Feedback and errors",
    text: "If you submit feedback, you grant us a perpetual, worldwide, sublicensable, royalty-free license to use it. We may correct typographical errors, inaccuracies, or omissions related to product descriptions, pricing, promotions, offers, shipping charges, transit times, and availability.",
  },
  {
    title: "Prohibited uses and termination",
    text: "You may access and use the Services for lawful purposes only. We may suspend, disable, or terminate your access at any time if you violate these Terms.",
  },
  {
    title: "Disclaimer, liability, and indemnification",
    text: "The Services and all products are provided as is and as available, without warranties of any kind. To the fullest extent permitted by law, Pursethetic and related parties will not be liable for indirect or consequential damages. You agree to indemnify and hold harmless Pursethetic, Shopify, and related parties from claims arising from your breach of these Terms or your use of the Services.",
  },
  {
    title: "Governing law and changes",
    text: "These Terms are governed by the applicable federal and state or territorial courts in the jurisdiction where Pursethetic is headquartered. We may update these Terms by posting changes to the website, and your continued use of the Services constitutes acceptance of those changes.",
  },
];

export default function TermsPage() {
  return (
    <ContentPageShell
      eyebrow="Terms of service"
      title="Store terms that explain how the Pursethetic experience works."
      description="These terms mirror the live storefront language, including order acceptance, shipping and delivery, intellectual property, liability, and contact information."
      primaryHref="mailto:pursethetic.official@gmail.com"
      primaryLabel="Email support"
      secondaryHref="/policies/contact-information"
      secondaryLabel="Contact information"
    >
      <div className="space-y-5">
        {sections.map((section, index) => (
          <PolicySection key={section.title} title={section.title} eyebrow={`${index + 1}`}>
            <p>{section.text}</p>
          </PolicySection>
        ))}

        <PolicySection title="Contact information" eyebrow="11">
          <p>Questions about the Terms of Service should be sent to pursethetic.official@gmail.com.</p>
          <p>
            Pursethetic | pursethetic.official@gmail.com | 03259726312
          </p>
        </PolicySection>
      </div>
    </ContentPageShell>
  );
}