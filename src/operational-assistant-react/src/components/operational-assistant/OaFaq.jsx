import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import { OA_FAQ } from "@/data/operationalAssistantData";

export default function OaFaq() {
    return (
        <section className="sec sec-alt" id="faq">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Before you ask</span>
                    <h2 className="sec-h2">The questions every owner asks first.</h2>
                </Reveal>

                <Reveal className="reveal">
                    <FaqAccordion items={OA_FAQ} />
                </Reveal>
            </div>
        </section>
    );
}
