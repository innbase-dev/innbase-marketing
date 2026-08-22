"use client";

import { Disclosure } from "@headlessui/react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { FAQS } from "@/data/faqData";

export default function FAQSection() {
  return (
    <section className="sec faq-sec" id="faq">
      <div className="dot-grain" />
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="sec-eyebrow">Before you ask</span>
          <h2 className="sec-h2">The questions every owner asks on the first call.</h2>
        </Reveal>

        <Reveal className="faq-list reveal">
          {FAQS.map((item) => (
            <Disclosure as="div" className={({ open }) => `faq-item${open ? " open" : ""}`} key={item.q}>
              <Disclosure.Button as="summary">
                {item.q}
                <span className="faq-ic">
                  <Icon name="plus" className="icon" />
                </span>
              </Disclosure.Button>
              <Disclosure.Panel as="div" className="faq-body">
                {item.a}
              </Disclosure.Panel>
            </Disclosure>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
