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

export const metadata = {
  title: "About",
  description:
    "Innbase started with a simple frustration: hotels generate enormous amounts of information every day, and almost none of it stays connected. Here's why — and who's building it.",
  keywords: ["about innbase", "hospitality startup", "hotel tech team"],
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Innbase",
    description: "Why we're building Innbase, and who's building it.",
    url: "https://innbase.co/about",
  },
};

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
    </div>
  );
}
