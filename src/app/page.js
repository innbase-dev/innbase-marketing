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
    </>
  );
}
