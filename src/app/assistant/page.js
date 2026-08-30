import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OaHero from "@/components/assistant/OaHero";
import DevicesSection from "@/components/assistant/DevicesSection";
import OaFaq from "@/components/assistant/OaFaq";
import OaCta from "@/components/assistant/OaCta";
import RulesSection from "@/components/assistant/RulesSection";
import { buildSocialMetadata } from "@/lib/seo";
import AssistantShowcase from "@/components/assistant/AssistantShowcase";
import ProblemNotesSection from "@/components/assistant/ProblemNotesSection";
import ImpactSection from "@/components/assistant/ImpactSection";

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
                <ProblemNotesSection />
                <AssistantShowcase />
                <RulesSection />
                <DevicesSection />
                <ImpactSection />
                <OaFaq />
                <OaCta />
            </main>
            <Footer />
        </>
    );
}
