import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import WhyExistsSection from "@/components/about/WhyExistsSection";
import WhoForSection from "@/components/about/WhoForSection";
import FoundersSection from "@/components/about/FoundersSection";
import PhilosophySection from "@/components/about/PhilosophySection";
import ManifestoSection from "@/components/about/ManifestoSection";
import AfricaSection from "@/components/about/AfricaSection";
import LetterSection from "@/components/about/LetterSection";
import AboutCta from "@/components/about/AboutCta";
import { FOUNDERS } from "@/data/aboutData";
import { JsonLd, SITE_URL, breadcrumbJsonLd, buildSocialMetadata } from "@/lib/seo";

const TITLE = "About Innbase";
const DESCRIPTION =
  "Innbase started with a simple frustration: hotels generate enormous amounts of information every day, and almost none of it stays connected. Here's why — and who's building it.";

export const metadata = {
  title: "About",
  description: DESCRIPTION,
  keywords: ["about innbase", "hospitality startup", "hotel tech team"],
  alternates: {
    canonical: "/about",
  },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/about" }),
};

// Matches the real names and roles shown in FoundersSection — no invented
// bios or quotes (the on-page founder quotes are still placeholder copy
// pending approval, so they're deliberately left out of structured data).
// Declared as standalone Person entities that reference the Organization
// already emitted site-wide by the root layout (via @id + worksFor),
// rather than re-declaring a second, partial Organization block on this
// page — that would just be redundant structured data describing the
// same entity twice.
const founderJsonLd = FOUNDERS.map((f) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: f.name,
  jobTitle: f.role,
  worksFor: { "@id": `${SITE_URL}/#organization` },
}));

export default function AboutPage() {
  return (
    <div className="page-about">
      <Navbar />
      <main id="main">
        <AboutHero />
        <WhyExistsSection />
        <WhoForSection />
        <FoundersSection />
        <PhilosophySection />
        <ManifestoSection />
        <AfricaSection />
        <LetterSection />
        <AboutCta />
      </main>
      <Footer />
      <JsonLd data={[...founderJsonLd, breadcrumbJsonLd("About", "/about")]} />
    </div>
  );
}
