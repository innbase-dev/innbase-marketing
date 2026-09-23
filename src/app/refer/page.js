import { Suspense } from "react";
import MarketingShell from "@/components/marketing/MarketingShell";
import ReferralLandingPage from "@/components/marketing/ReferralLandingPage";
import ReferralTokenCapture from "@/components/referral/ReferralTokenCapture";
import { JsonLd, breadcrumbJsonLd, toPlainText, buildSocialMetadata } from "@/lib/seo";
import { REFERRAL_FAQS } from "@/data/referralLandingData";
import "./referral-landing.css";

/**
 * This route previously lived at /refer-hotels. next.config.mjs already
 * 308s /refer-hotels -> /refer (see the "Referral naming standardization"
 * comment there); this file is that destination actually existing. The
 * canonical URL, breadcrumb, and metadata path below are the only things
 * that changed versus the old /refer-hotels/page.js -- the page content
 * itself (ReferralLandingPage) is unchanged.
 */

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

export default function ReferRoute() {
  return (
    <MarketingShell>
      <ReferralLandingPage />
      {/* Suspense required: useSearchParams() opts this subtree out of
          static rendering, per Next.js App Router's rules for client
          components that read the URL. */}
      <Suspense fallback={null}>
        <ReferralTokenCapture />
      </Suspense>
      <JsonLd data={[faqJsonLd, breadcrumbJsonLd("Refer a hotel", "/refer")]} />
    </MarketingShell>
  );
}
