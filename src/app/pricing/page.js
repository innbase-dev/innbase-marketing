import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingHero from "@/components/pricing/PricingHero";
import LogoStrip from "@/components/LogoStrip";
import PlanCards from "@/components/pricing/PlanCards";
import ComparisonTable from "@/components/pricing/ComparisonTable";
import CapacitySection from "@/components/pricing/CapacitySection";
import PricingFaq from "@/components/pricing/PricingFaq";
import PricingCta from "@/components/pricing/PricingCta";
import { PLANS } from "@/data/pricingPlans";
import { PRICING_FAQS } from "@/data/pricingFaqData";
import { JsonLd, SITE_URL, breadcrumbJsonLd, buildSocialMetadata, toPlainText } from "@/lib/seo";

const TITLE = "Pricing Innbase";
const DESCRIPTION =
  "Three plans, priced in Naira and sized to your staff. Every plan runs the complete Innbase platform — no per-user charges, no card required to start.";

export const metadata = {
  title: "Pricing",
  description: DESCRIPTION,
  keywords: ["innbase pricing", "hotel software cost", "hospitality OS plans"],
  alternates: {
    canonical: "/pricing",
  },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/pricing" }),
};

// FAQPage schema for THIS page's actual FAQ (PricingFaq), which is a
// different question set from the homepage's FAQSection — each now gets
// its own matching structured data instead of sharing one sitewide block.
const pricingFaqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: PRICING_FAQS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: toPlainText(item.a),
    },
  })),
};

// Only plans with a real, fixed, publicly displayed price are included —
// Enterprise is a custom quote with no public number, so it's deliberately
// left out rather than assigned a fabricated price.
const offersJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": `${SITE_URL}/#software`,
  name: "Innbase",
  offers: PLANS.map((plan) => ({
    "@type": "Offer",
    name: `Innbase ${plan.name}`,
    description: plan.tagline,
    price: plan.price.replace(/[^\d]/g, ""),
    priceCurrency: "NGN",
    url: `${SITE_URL}/pricing`,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: plan.price.replace(/[^\d]/g, ""),
      priceCurrency: "NGN",
      billingDuration: "P1M",
    },
  })),
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <PricingHero />
        <LogoStrip />
        <PlanCards />
        <ComparisonTable />
        <CapacitySection />
        <PricingFaq />
        {/* <PricingCta /> */}
      </main>
      <Footer />
      <JsonLd
        data={[pricingFaqJsonLd, offersJsonLd, breadcrumbJsonLd("Pricing", "/pricing")]}
      />
    </>
  );
}
