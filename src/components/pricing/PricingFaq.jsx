import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import { PRICING_FAQS } from "@/data/pricingFaqData";

export default function PricingFaq() {
  return (
    <section className="sec faq-sec sec-alt" id="faq">
      <div className="dot-grain" />
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="sec-eyebrow">Before you ask</span>
          <h2 className="sec-h2">Questions about pricing.</h2>
        </Reveal>
        <Reveal className="reveal">
          <FaqAccordion items={PRICING_FAQS} />
        </Reveal>
      </div>
    </section>
  );
}
