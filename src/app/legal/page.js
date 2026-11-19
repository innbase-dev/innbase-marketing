import MarketingShell from "@/components/marketing/MarketingShell";
import LegalPage from "@/components/marketing/LegalPage";
import { JsonLd, breadcrumbJsonLd, buildSocialMetadata } from "@/lib/seo";

const TITLE = "Terms, Privacy & GDPR — Innbase";
const DESCRIPTION =
  "Review Innbase's Terms of Service, Privacy Policy, and GDPR & Data Rights. Understand your rights and our obligations clearly.";

export const metadata = {
  title: "Terms, Privacy & GDPR",
  description: DESCRIPTION,
  keywords: ["innbase terms", "privacy policy", "GDPR compliance", "hotel data security"],
  alternates: {
    canonical: "/legal",
  },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/legal" }),
};

export default function MarketingRoute() {
  return <MarketingShell><LegalPage /><JsonLd data={breadcrumbJsonLd("Legal", "/legal")} /></MarketingShell>;
}
