import { notFound } from "next/navigation";
import MarketingShell from "@/components/marketing/MarketingShell";
import PaymentsPage from "@/components/marketing/payments/PaymentsPage";
import { MARKETING_DESTINATIONS, isPublished, isVisible } from "@/data/marketingDestinations";
import { JsonLd, breadcrumbJsonLd, buildSocialMetadata, SITE_URL } from "@/lib/seo";

// A dedicated page (like Messaging), so it no longer uses the shared
// platform template. It still follows the destination's publish flag.
const destination = MARKETING_DESTINATIONS.payments;
const path = destination.href;
const title = "Hospitality payments & reconciliation";
const description = "Keep every payment with its order. Innbase records transfer claims, matches money by exact reference and sends anything uncertain to a manager. For hotels, restaurants and bars.";

export const metadata = {
  title,
  description,
  alternates: { canonical: path },
  ...buildSocialMetadata({ title, description, path }),
  // A preview build can render an unpublished page; keep it out of search.
  ...(isPublished(destination) ? {} : { robots: { index: false, follow: false } }),
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}${path}#software`,
  name: "Innbase Payments & Reconciliation",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description,
  url: `${SITE_URL}${path}`,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function PaymentsMarketingPage() {
  if (!isVisible(destination)) notFound();
  return (
    <MarketingShell>
      <PaymentsPage />
      <JsonLd data={[breadcrumbJsonLd("Payments & reconciliation", path), softwareJsonLd]} />
    </MarketingShell>
  );
}
