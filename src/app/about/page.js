import MarketingShell from "@/components/marketing/MarketingShell";
import AboutPage from "@/components/marketing/AboutPage";
import { FOUNDERS } from "@/data/aboutData";
import { JsonLd, SITE_URL, breadcrumbJsonLd, buildSocialMetadata } from "@/lib/seo";

const TITLE = "About Innbase";
const DESCRIPTION =
    "Hotels create mountains of information every day, and almost none of it stays connected. Here’s why we’re building Innbase, and who’s building it.";

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
    ...(f.entityId ? { "@id": f.entityId } : {}),
    name: f.name,
    jobTitle: f.role,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    ...(f.image ? { image: `${SITE_URL}${f.image}` } : {}),
    ...(f.website ? { url: f.website } : {}),
    sameAs: [f.linkedin, f.twitter, f.website, f.wikidata].filter(Boolean),
}));

export default function MarketingRoute() {
  return <MarketingShell><AboutPage /><JsonLd data={[...founderJsonLd, breadcrumbJsonLd("About", "/about")]} /></MarketingShell>;
}
