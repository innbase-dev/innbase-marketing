"use client";

import { Disclosure } from "@headlessui/react";
import Icon from "./Icon";

export default function FaqAccordion({ items }) {
    return (
        <div className="faq-list">
            {items.map((item) => (
                <Disclosure
                    as="div"
                    className={({ open }) => `faq-item${open ? " open" : ""}`}
                    key={item.q}
                >
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
        </div>
    );
}
