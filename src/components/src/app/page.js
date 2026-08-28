import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import ProblemSection from "@/components/ProblemSection";
import ProductSection from "@/components/ProductSection";
import DemoSection from "@/components/DemoSection";
import ReconciliationSection from "@/components/ReconciliationSection";
import StatBand from "@/components/StatBand";
import RolesSection from "@/components/RolesSection";
import QuoteSection from "@/components/QuoteSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import CTABand from "@/components/CTABand";
import Footer from "@/components/Footer";
import { DemoProvider } from "@/components/DemoContext";
import { FAQS } from "@/data/faqData";
import { JsonLd, SITE_URL, SITE_NAME, toPlainText } from "@/lib/seo";

export const metadata = {
  title: "Your Hotel Control Center",
  alternates: {
    canonical: "/",
  },
};

// Generated FROM the same FAQS array the page renders (see FAQSection),
// so the structured data can never drift out of sync with what's visible.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: toPlainText(item.a),
    },
  })),
};

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "The AI operating system for hospitality — reconciles every sale, payment, shift, and stock movement so hotels, restaurants, and bars always know where revenue is made or lost.",
  areaServed: "NG",
  provider: { "@id": `${SITE_URL}/#organization` },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <LogoStrip />
        <ProblemSection />
        <DemoProvider>
          <ProductSection />
          <DemoSection />
        </DemoProvider>
        <ReconciliationSection />
        <StatBand />
        <RolesSection />
        <QuoteSection />
        <CaseStudiesSection />
        <PricingSection />
        <FAQSection />
        <CTABand />
      </main>
      <Footer />
      <JsonLd data={[faqJsonLd, softwareAppJsonLd]} />
    </>
  );
}
