import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalHero from "@/components/legal/LegalHero";
import LegalTabs from "@/components/legal/LegalTabs";
import { JsonLd, breadcrumbJsonLd, buildSocialMetadata } from "@/lib/seo";

const TITLE = "Terms, Privacy & GDPR — Innbase";
const DESCRIPTION =
  "How Innbase works with your hotel's data, what you're agreeing to when you use it, and the rights you have — Terms of Service, Privacy Policy, and GDPR & Data Rights, all in one place.";

export const metadata = {
  title: "Terms, Privacy & GDPR",
  description: DESCRIPTION,
  keywords: ["innbase terms", "privacy policy", "GDPR compliance", "hotel data security"],
  alternates: {
    canonical: "/legal",
  },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/legal" }),
};

export default function LegalPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <LegalHero />
        <LegalTabs />
      </main>
      <Footer />
      <JsonLd data={breadcrumbJsonLd("Legal", "/legal")} />
    </>
  );
}
