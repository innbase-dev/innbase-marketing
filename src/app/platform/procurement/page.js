import { notFound } from "next/navigation";
import MarketingShell from "@/components/marketing/MarketingShell";
import ProcurementPage from "@/components/marketing/procurement/ProcurementPage";
import { MARKETING_DESTINATIONS, isPublished, isVisible } from "@/data/marketingDestinations";
import { JsonLd, breadcrumbJsonLd, buildSocialMetadata, SITE_URL } from "@/lib/seo";

// A dedicated page (like Messaging), so it no longer uses the shared
// platform template. It still follows the destination's publish flag.
const destination = MARKETING_DESTINATIONS.procurement;
const path = destination.href;
const title = "Hotel procurement & supplier control";
const description = "Know who you’re paying. Innbase approves suppliers, checks bank account names with a second approver and keeps encrypted proof. Your bank keeps the money.";

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
  name: "Innbase Procurement",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description,
  url: `${SITE_URL}${path}`,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function ProcurementMarketingPage() {
  if (!isVisible(destination)) notFound();
  return (
    <MarketingShell>
      <ProcurementPage />
      <JsonLd data={[breadcrumbJsonLd("Procurement & suppliers", path), softwareJsonLd]} />
    </MarketingShell>
  );
}
