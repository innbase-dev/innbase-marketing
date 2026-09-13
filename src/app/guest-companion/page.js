import MarketingShell from "@/components/marketing/MarketingShell";
import GuestPage from "@/components/marketing/GuestPage";
import { buildSocialMetadata } from "@/lib/seo";












const TITLE = "Guest Companion";
const DESCRIPTION =
    "Give every guest a direct line to your hotel — food, drinks, room service, housekeeping and hotel services, ordered straight from their own phone. No intercom, no app download, no guest account.";

export const metadata = {
    title: TITLE,
    description: DESCRIPTION,
    keywords: [
        "guest companion",
        "hotel guest app",
        "hotel intercom alternative",
        "QR ordering hotel",
        "digital room service Nigeria",
        "hotel guest experience software",
    ],
    alternates: {
        canonical: "/guest-companion",
    },
    ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/guest-companion" }),
};

export default function MarketingRoute() {
  return <MarketingShell><GuestPage /></MarketingShell>;
}
