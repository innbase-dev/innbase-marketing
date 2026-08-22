import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactHero from "@/components/contact/ContactHero";
import ContactForm from "@/components/contact/ContactForm";
import ContactRail from "@/components/contact/ContactRail";

export const metadata = {
  title: "Contact | Innbase",
  description:
    "Tell us what brings you here and we'll point you to the right person — sales, support, partnerships, or a general enquiry.",
  openGraph: {
    title: "Contact | Innbase",
    description: "Let's talk about your hotel.",
  },
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
    </>
  );
}
