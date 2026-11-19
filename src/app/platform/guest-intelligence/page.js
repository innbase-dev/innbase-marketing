import { notFound } from "next/navigation";
import MarketingShell from "@/components/marketing/MarketingShell";
import GuestIntelligencePage from "@/components/marketing/guest-intelligence/GuestIntelligencePage";
import { MARKETING_DESTINATIONS, isPublished, isVisible } from "@/data/marketingDestinations";
import { JsonLd, breadcrumbJsonLd, buildSocialMetadata, SITE_URL } from "@/lib/seo";

// A dedicated page (like Messaging), so it no longer uses the shared
// platform template. It still follows the destination's publish flag.
const destination = MARKETING_DESTINATIONS.guestIntelligence;
const path = destination.href;
const title = "Guest preferences & guest profiles for hotels";
const description = "Remember every guest like your best receptionist. Innbase records hotel-local guest preferences with their source, for the staff you choose, with guest consent.";

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
  name: "Innbase Guest Intelligence",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description,
  url: `${SITE_URL}${path}`,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function GuestIntelligenceMarketingPage() {
  if (!isVisible(destination)) notFound();
  return (
    <MarketingShell>
      <GuestIntelligencePage />
      <JsonLd data={[breadcrumbJsonLd("Guest intelligence", path), softwareJsonLd]} />
    </MarketingShell>
  );
}
