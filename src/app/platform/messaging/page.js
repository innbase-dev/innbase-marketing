import MarketingShell from "@/components/marketing/MarketingShell";
import MessagingPage from "@/components/marketing/MessagingPage";
import { JsonLd, breadcrumbJsonLd, buildSocialMetadata, SITE_URL } from "@/lib/seo";

const title = "Integrated Hotel Messaging";
const description = "Bring Guest Companion, WhatsApp and SMS conversations into one Innbase workspace, assign ownership, keep guest context close and turn requests into operational tasks.";

export const metadata = {
  title,
  description,
  alternates: { canonical: "/platform/messaging" },
  ...buildSocialMetadata({ title, description, path: "/platform/messaging" }),
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/platform/messaging#software`,
  name: "Innbase Integrated Messaging",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description,
  url: `${SITE_URL}/platform/messaging`,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function MessagingMarketingPage() {
  return (
    <MarketingShell>
      <MessagingPage />
      <JsonLd data={[breadcrumbJsonLd("Integrated Messaging", "/platform/messaging"), softwareJsonLd]} />
    </MarketingShell>
  );
}
