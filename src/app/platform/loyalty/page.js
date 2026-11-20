import { notFound } from "next/navigation";
import MarketingShell from "@/components/marketing/MarketingShell";
import LoyaltyPage from "@/components/marketing/loyalty/LoyaltyPage";
import { MARKETING_DESTINATIONS, isPublished, isVisible } from "@/data/marketingDestinations";
import { JsonLd, breadcrumbJsonLd, buildSocialMetadata, SITE_URL } from "@/lib/seo";

// A dedicated page (like Messaging), so it no longer uses the shared
// platform template. It still follows the destination's publish flag.
const destination = MARKETING_DESTINATIONS.loyalty;
const path = destination.href;
const title = "Loyalty programme for hotels, restaurants & bars";
const description = "Turn guests into regulars. Innbase Loyalty is being designed to reward real spend and recognise returning guests by phone number. Become a design partner.";

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
  name: "Innbase Loyalty",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description,
  url: `${SITE_URL}${path}`,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function LoyaltyMarketingPage() {
  if (!isVisible(destination)) notFound();
  return (
    <MarketingShell>
      <LoyaltyPage />
      <JsonLd data={[breadcrumbJsonLd("Loyalty", path), softwareJsonLd]} />
    </MarketingShell>
  );
}
