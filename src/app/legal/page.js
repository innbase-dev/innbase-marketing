import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LegalHero from "@/components/legal/LegalHero";
import LegalTabs from "@/components/legal/LegalTabs";

export const metadata = {
  title: "Terms, Privacy & GDPR",
  description:
    "How Innbase works with your hotel's data, what you're agreeing to when you use it, and the rights you have — Terms of Service, Privacy Policy, and GDPR & Data Rights, all in one place.",
  keywords: ["innbase terms", "privacy policy", "GDPR compliance", "hotel data security"],
  alternates: {
    canonical: "/legal",
  },
  openGraph: {
    title: "Terms, Privacy & GDPR - Innbase",
    description: "Terms of Service, Privacy Policy, and GDPR & Data Rights, all in one place.",
    url: "https://innbase.co/legal",
  },
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
    </>
  );
}
