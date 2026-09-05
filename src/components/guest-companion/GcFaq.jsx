import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import { GC_FAQ } from "@/data/guestCompanionData";

export default function GcFaq() {
    return (
        <section className="sec" id="faq">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Before you ask</span>
                    <h2 className="sec-h2">The questions every owner asks first.</h2>
                </Reveal>

                <Reveal className="reveal">
                    <FaqAccordion items={GC_FAQ} />
                </Reveal>
            </div>
        </section>
    );
}
