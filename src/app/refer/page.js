import MarketingShell from "@/components/marketing/MarketingShell";
import ReferralLandingPage from "@/components/marketing/ReferralLandingPage";
import { JsonLd, SITE_URL, breadcrumbJsonLd, toPlainText, buildSocialMetadata } from "@/lib/seo";
import { REFERRAL_FAQS } from "@/data/referralLandingData";
import "./referral-landing.css";

const TITLE = "Refer a Hotel, Earn Rewards";
const DESCRIPTION =
  "Introduce a hotel to Innbase and earn ₦20,000 when they become a paying customer. No selling required, no limit on how many you refer.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["innbase referral program", "refer a hotel", "hotel software referral", "earn rewards hospitality"],
  alternates: {
    canonical: "/refer",
  },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/refer" }),
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: REFERRAL_FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: toPlainText(item.a) },
  })),
};

export default function ReferLandingRoute() {
  return (
    <MarketingShell>
      <ReferralLandingPage />
      <JsonLd data={[faqJsonLd, breadcrumbJsonLd("Refer a hotel", "/refer")]} />
    </MarketingShell>
  );
}
