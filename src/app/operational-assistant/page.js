import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OaHero from "@/components/operational-assistant/OaHero";
import OaProblemSection from "@/components/operational-assistant/OaProblemSection";
import OaIdentitySection from "@/components/operational-assistant/OaIdentitySection";
import OaScenarios from "@/components/operational-assistant/OaScenarios";
import OaTrustSection from "@/components/operational-assistant/OaTrustSection";
import OaDeviceSection from "@/components/operational-assistant/OaDeviceSection";
import OaImpactSection from "@/components/operational-assistant/OaImpactSection";
import OaFaq from "@/components/operational-assistant/OaFaq";
import OaCta from "@/components/operational-assistant/OaCta";

import { buildSocialMetadata } from "@/lib/seo";

const TITLE = "AI Operational Assistant";
const DESCRIPTION =
    "Meet the newest member of your hotel's operations team. Innbase's AI Operational Assistant creates tasks, answers questions, and takes routine work off your staff — in plain English, day or night.";

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
        canonical: "/operational-assistant",
    },
    ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/operational-assistant" }),
};

export default function OperationalAssistantPage() {
    return (
        <>
            <Navbar />
            <main id="main">
                <OaHero />
                <OaProblemSection />
                <OaIdentitySection />
                <OaScenarios />
                <OaTrustSection />
                <OaDeviceSection />
                <OaImpactSection />
                <OaFaq />
                <OaCta />
            </main>
            <Footer />
        </>
    );
}
