import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactRail from "@/components/contact/ContactRail";
import { JsonLd, breadcrumbJsonLd, buildSocialMetadata } from "@/lib/seo";

const TITLE = "Contact Innbase";
const DESCRIPTION =
  "Tell us what brings you here and we'll point you to the right person — sales, support, partnerships, or a general enquiry.";

export const metadata = {
  title: "Contact",
  description: DESCRIPTION,
  keywords: ["contact innbase", "hotel software support", "hospitality OS sales"],
  alternates: {
    canonical: "/contact",
  },
  ...buildSocialMetadata({ title: TITLE, description: DESCRIPTION, path: "/contact" }),
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <ContactHero />
        <section className="contact-sec" id="contact-form">
          <div className="wrap contact-grid">
            <ContactForm />
            <ContactRail />
          </div>
        </section>
      </main>
      <Footer />
      <JsonLd data={breadcrumbJsonLd("Contact", "/contact")} />
    </>
  );
}
