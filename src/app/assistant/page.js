import MarketingShell from "@/components/marketing/MarketingShell";
import AssistantPage from "@/components/marketing/AssistantPage";
import { buildSocialMetadata } from "@/lib/seo";





const TITLE = "AI Operational Assistant";
const DESCRIPTION =
    "Innbase's AI Operational Assistant creates tasks, answers questions, and takes routine work off your hotel staff — in plain English, day or night.";

export const metadata = {
    title: TITLE,
    description: DESCRIPTION,
    keywords: [
        "hotel AI assistant",
        "hotel operations software",
        "AI operational assistant",
        "hotel task management Nigeria",
    ],
    alternates: {
    canonical: "/assistant",
    },
    ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/assistant" }),
};

export default function MarketingRoute() {
  return <MarketingShell><AssistantPage /></MarketingShell>;
}
