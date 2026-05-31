import type { Metadata } from "next";
import Link from "next/link";
import ContentPageShell from "@/components/site/ContentPageShell";
import PolicySection from "@/components/site/PolicySection";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Pursethetic privacy policy covering personal information, Shopify relationship, rights, retention, and contact details.",
};

const infoCards = [
  "Contact details, billing and shipping information",
  "Financial and payment details",
  "Account and transaction information",
  "Communications, device, and usage information",
];

export default function PrivacyPolicyPage() {
  return (
    <ContentPageShell
      eyebrow="Privacy policy"
      title="Last updated: March 8, 2026"
      description="Pursethetic operates this store and website, including all related information, content, features, tools, products and services, in order to provide you, the customer, with a curated shopping experience."
      primaryHref="mailto:pursethetic.official@gmail.com"
      primaryLabel="Email us"
      secondaryHref="/policies/contact-information"
      secondaryLabel="Contact information"
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[1.8rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.92)] p-6 shadow-[0_18px_45px_rgba(61,47,28,0.08)] sm:p-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[var(--color-primary)]">At a glance</p>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
            {infoCards.map((card) => (
              <li key={card} className="flex gap-3">
                <span className="mt-2 h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                <span>{card}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-[1.8rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.92)] p-6 shadow-[0_18px_45px_rgba(61,47,28,0.08)] sm:p-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-[var(--color-primary)]">Contact</p>
          <div className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-muted)]">
            <p>Email: pursethetic.official@gmail.com</p>
            <p>Address: House No 523 Neelum Block, Allama Iqbal Town, Lahore, 54000, PK</p>
            <p>We will respond to requests in a timely manner as required under applicable law.</p>
          </div>
        </section>
      </div>

      <div className="mt-6 space-y-5">
        <PolicySection title="Personal Information We Collect or Process" eyebrow="1">
          <p>
            Personal information includes information that identifies or can reasonably be linked to you or another person. Depending on how you interact with the Services and where you live, we may collect contact details, financial information, account information, transaction information, communications, device information, and usage information.
          </p>
        </PolicySection>

        <PolicySection title="Personal Information Sources" eyebrow="2">
          <p>
            We may collect personal information directly from you, automatically through the Services, from service providers, and from partners or other third parties.
          </p>
        </PolicySection>

        <PolicySection title="How We Use Personal Information" eyebrow="3">
          <p>
            We use personal information to provide, tailor, and improve the Services, process payments and orders, manage accounts, arrange shipping and exchanges, send marketing communications, prevent fraud, provide support, and comply with legal obligations.
          </p>
        </PolicySection>

        <PolicySection title="How We Disclose Personal Information" eyebrow="4">
          <p>
            We may disclose information to Shopify, vendors and other third parties who perform services on our behalf, business and marketing partners, affiliates, or parties involved in legal or business matters, subject to this policy and applicable law.
          </p>
        </PolicySection>

        <PolicySection title="Relationship with Shopify" eyebrow="5">
          <p>
            The Services are hosted by Shopify, which collects and processes personal information about your access to and use of the Services in order to provide and improve the Services. Information you submit to the Services will be transmitted to and shared with Shopify as well as third parties that may be located in other countries.
          </p>
          <p>
            You may also review the Shopify Consumer Privacy Policy and the Shopify Privacy Portal for additional information about Shopify's processing and rights.
          </p>
        </PolicySection>

        <PolicySection title="Third Party Websites and Links" eyebrow="6">
          <p>
            The Services may provide links to websites or other online platforms operated by third parties. We do not guarantee and are not responsible for the privacy or security of those sites.
          </p>
        </PolicySection>

        <PolicySection title="Children's Data" eyebrow="7">
          <p>
            The Services are not intended to be used by children, and we do not knowingly collect personal information about children under the age of majority in your jurisdiction.
          </p>
        </PolicySection>

        <PolicySection title="Security and Retention" eyebrow="8">
          <p>
            No security measures are perfect or impenetrable, and we cannot guarantee perfect security. The length of time we retain personal information depends on account needs, service delivery, legal obligations, and dispute resolution.
          </p>
        </PolicySection>

        <PolicySection title="Your Rights and Choices" eyebrow="9">
          <p>
            Depending on where you live, you may have rights to access, delete, correct, or obtain a copy of your personal information. You may also manage communication preferences by unsubscribing from promotional emails.
          </p>
        </PolicySection>

        <PolicySection title="Complaints, International Transfers, and Changes" eyebrow="10">
          <p>
            You may contact us using the details above if you have complaints about how we process your personal information. We may transfer, store, and process your information outside the country you live in, and we may update this policy from time to time by posting changes on this website.
          </p>
        </PolicySection>

        <div className="rounded-[1.8rem] border border-[rgba(155,122,67,0.14)] bg-[rgba(255,250,241,0.92)] p-6 shadow-[0_18px_45px_rgba(61,47,28,0.08)] sm:p-8">
          <p className="font-serif text-2xl text-[var(--foreground)]">Questions about our privacy practices?</p>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            Email us at <Link href="mailto:pursethetic.official@gmail.com" className="text-[var(--color-primary)]">pursethetic.official@gmail.com</Link> or contact us at House No 523 Neelum Block, Allama Iqbal Town, Lahore, 54000, PK.
          </p>
        </div>
      </div>
    </ContentPageShell>
  );
}