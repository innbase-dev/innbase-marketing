import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingHero from "@/components/pricing/PricingHero";
import PlanCards from "@/components/pricing/PlanCards";
import ComparisonTable from "@/components/pricing/ComparisonTable";
import CapacitySection from "@/components/pricing/CapacitySection";
import PricingFaq from "@/components/pricing/PricingFaq";
import PricingCta from "@/components/pricing/PricingCta";

export const metadata = {
  title: "Pricing | Innbase",
  description:
    "Three plans, priced in Naira and sized to your staff. Every plan runs the complete Innbase platform — no per-user charges, no card required to start.",
  openGraph: {
    title: "Pricing | Innbase",
    description: "Pay for the hotel you run — three plans, no per-staff pricing, no card required.",
  },
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PricingHero />
        <PlanCards />
        <ComparisonTable />
        <CapacitySection />
        <PricingFaq />
        <PricingCta />
      </main>
      <Footer />
    </>
  );
}
