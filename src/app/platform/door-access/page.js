import { notFound } from "next/navigation";
import MarketingShell from "@/components/marketing/MarketingShell";
import DoorAccessPage from "@/components/marketing/door-access/DoorAccessPage";
import { MARKETING_DESTINATIONS, isPublished, isVisible } from "@/data/marketingDestinations";
import { JsonLd, breadcrumbJsonLd, buildSocialMetadata, SITE_URL } from "@/lib/seo";

// A dedicated page (like Messaging), so it no longer uses the shared
// platform template. It still follows the destination's publish flag.
const destination = MARKETING_DESTINATIONS.doorAccess;
const path = destination.href;
const title = "Hotel door access for guests";
const description = "Room access that starts with the stay and ends with it. Innbase Door Access checks the booking, room, payment and known risk before a grant.";

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
  name: "Innbase Door Access",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description,
  url: `${SITE_URL}${path}`,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function DoorAccessMarketingPage() {
  if (!isVisible(destination)) notFound();
  return (
    <MarketingShell>
      <DoorAccessPage />
      <JsonLd data={[breadcrumbJsonLd("Door access", path), softwareJsonLd]} />
    </MarketingShell>
  );
}
