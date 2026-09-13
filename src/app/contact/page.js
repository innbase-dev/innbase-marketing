import MarketingShell from "@/components/marketing/MarketingShell";
import ContactPage from "@/components/marketing/ContactPage";
import { JsonLd, breadcrumbJsonLd, buildSocialMetadata } from "@/lib/seo";

const TITLE = "Contact Innbase";
const DESCRIPTION =
  "Tell us what brings you here and we'll point you to the right person — sales, support, partnerships, or a general enquiry.";

export const metadata = {
  title: "Contact",
  description: DESCRIPTION,
  keywords: ["contact innbase", "hotel software support", "hospitality OS sales"],
  alternates: {
    canonical: "/contact",
  },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/contact" }),
};

export default function MarketingRoute() {
  return <MarketingShell><ContactPage /><JsonLd data={breadcrumbJsonLd("Contact", "/contact")} /></MarketingShell>;
}
