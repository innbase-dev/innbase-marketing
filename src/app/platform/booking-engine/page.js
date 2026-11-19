import { notFound } from "next/navigation";
import MarketingShell from "@/components/marketing/MarketingShell";
import BookingEnginePage from "@/components/marketing/booking-engine/BookingEnginePage";
import { MARKETING_DESTINATIONS, isPublished, isVisible } from "@/data/marketingDestinations";
import { JsonLd, breadcrumbJsonLd, buildSocialMetadata, SITE_URL } from "@/lib/seo";

// A dedicated page (like Messaging), so it no longer uses the shared
// platform template. It still follows the destination's publish flag.
const destination = MARKETING_DESTINATIONS.bookingEngine;
const path = destination.href;
const title = "Hotel booking engine & room availability";
const description = "One room, one guest. Innbase Booking keeps room availability, timed holds and verified deposits in one live record for the bookings your team takes.";

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
  name: "Innbase Booking",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description,
  url: `${SITE_URL}${path}`,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export default function BookingEngineMarketingPage() {
  if (!isVisible(destination)) notFound();
  return (
    <MarketingShell>
      <BookingEnginePage />
      <JsonLd data={[breadcrumbJsonLd("Booking engine", path), softwareJsonLd]} />
    </MarketingShell>
  );
}
