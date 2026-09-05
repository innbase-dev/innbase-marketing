import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildSocialMetadata } from "@/lib/seo";
import GcHero from "@/components/guest-companion/GcHero";
import GcProblemSection from "@/components/guest-companion/GcProblemSection";
import GcNoIntercomSection from "@/components/guest-companion/GcNoIntercomSection";
import GcMomentsSection from "@/components/guest-companion/GcMomentsSection";
import GcStepsSection from "@/components/guest-companion/GcStepsSection";
import GcOperationalSection from "@/components/guest-companion/GcOperationalSection";
import GcOutcomesSection from "@/components/guest-companion/GcOutcomesSection";
import GcArchitectureSection from "@/components/guest-companion/GcArchitectureSection";
import GcFaq from "@/components/guest-companion/GcFaq";
import GcCta from "@/components/guest-companion/GcCta";

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

export default function GuestCompanionPage() {
    return (
        <>
            <Navbar />
            <main id="main">
                <GcHero />
                <GcProblemSection />
                <GcNoIntercomSection />
                <GcMomentsSection />
                <GcStepsSection />
                <GcOperationalSection />
                <GcOutcomesSection />
                <GcArchitectureSection />
                <GcFaq />
                <GcCta />
            </main>
            <Footer />
        </>
    );
}
