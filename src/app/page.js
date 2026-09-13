import MarketingShell from "@/components/marketing/MarketingShell";
import HomePage from "@/components/marketing/HomePage";
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

export default function MarketingRoute() {
  return <MarketingShell><HomePage /><JsonLd data={[faqJsonLd, softwareAppJsonLd]} /></MarketingShell>;
}
