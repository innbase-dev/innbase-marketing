"use client";

import Reveal from "./Reveal";
import FaqAccordion from "./FaqAccordion";
import { FAQS } from "@/data/faqData";

export default function FAQSection() {
    return (
        <section className="sec faq-sec" id="faq">
            <div className="dot-grain" />
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Before you ask</span>
                    <h2 className="sec-h2">
                        The questions every owner asks on the first call.
                    </h2>
                </Reveal>

                <Reveal className="reveal">
                    <FaqAccordion items={FAQS} />
                </Reveal>
            </div>
        </section>
    );
}
