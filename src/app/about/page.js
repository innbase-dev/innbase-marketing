import MarketingShell from "@/components/marketing/MarketingShell";
import AboutPage from "@/components/marketing/AboutPage";
import { FOUNDERS } from "@/data/aboutData";
import { JsonLd, SITE_URL, breadcrumbJsonLd, buildSocialMetadata } from "@/lib/seo";

const TITLE = "About Innbase";
const DESCRIPTION =
    "Innbase is a property management platform helping hospitality businesses streamline operations and deliver great guest experiences.";

export const metadata = {
    title: "About",
    description: DESCRIPTION,
    keywords: ["about innbase", "hospitality startup", "hotel tech team"],
    alternates: {
        canonical: "/about",
    },
    ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/about" }),
};

const founderJsonLd = FOUNDERS.map((f) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: f.name,
    jobTitle: f.role,
    worksFor: { "@id": `${SITE_URL}/#organization` },
}));

export default function MarketingRoute() {
  return <MarketingShell><AboutPage /><JsonLd data={[...founderJsonLd, breadcrumbJsonLd("About", "/about")]} /></MarketingShell>;
}
