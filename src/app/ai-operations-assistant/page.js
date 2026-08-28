import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AssistantHero from "@/components/assistant/AssistantHero";
import ProblemSection from "@/components/assistant/ProblemSection";
import CapabilitiesSection from "@/components/assistant/CapabilitiesSection";
import ScenariosSection from "@/components/assistant/ScenariosSection";
import DayInTheLifeTimeline from "@/components/assistant/DayInTheLifeTimeline";
import ArchitectureSection from "@/components/assistant/ArchitectureSection";
import ImpactSection from "@/components/assistant/ImpactSection";
import DeviceExperience from "@/components/assistant/DeviceExperience";
import AssistantCta from "@/components/assistant/AssistantCta";

import { JsonLd, SITE_URL, breadcrumbJsonLd, buildSocialMetadata } from "@/lib/seo";

const TITLE = "AI Operations Assistant - Innbase";
const DESCRIPTION =
    "Meet your hotel's Operational Assistant. The extra pair of hands that never gets tired of the routine. Works alongside your team so they can spend less time pushing data around and more time running the hotel.";

export const metadata = {
    title: "AI Operations Assistant",
    description: DESCRIPTION,
    keywords: ["hotel ai", "hospitality artificial intelligence", "operations assistant", "hotel operations"],
    alternates: {
        canonical: "/ai-operations-assistant",
    },
    ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/ai-operations-assistant" }),
};

export default function AssistantPage() {
    return (
        <div className="page-assistant">
            <Navbar />
            <main id="main">
                <AssistantHero />
                <ProblemSection />
                <CapabilitiesSection />
                <ScenariosSection />
                <DayInTheLifeTimeline />
                <ArchitectureSection />
                <ImpactSection />
                <DeviceExperience />
                <AssistantCta />
            </main>
            <Footer />
            <JsonLd data={[breadcrumbJsonLd("AI Operations Assistant", "/ai-operations-assistant")]} />
        </div>
    );
}
