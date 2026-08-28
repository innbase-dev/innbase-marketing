"use client";

import { Disclosure } from "@headlessui/react";
import Icon from "@/components/Icon";

export default function LegalAccordion({ panel }) {
    return (
        <>
            <p className="legal-intro">{panel.intro}</p>

            <div className="legal-sections">
                {panel.sections.map((sec) => (
                    <Disclosure
                        as="div"
                        className={({ open }) =>
                            `legal-section${open ? " open" : ""}`
                        }
                        defaultOpen={sec.defaultOpen}
                        key={sec.num}
                    >
                        <Disclosure.Button as="summary">
                            <span className="num">{sec.num}</span>
                            <span className="title">{sec.title}</span>
                            <Icon name="chevron-down" className="icon chev" />
                        </Disclosure.Button>
                        <Disclosure.Panel
                            as="div"
                            className="legal-section-body"
                            unmount={false}
                        >
                            {sec.body}
                        </Disclosure.Panel>
                    </Disclosure>
                ))}
            </div>

            <div className="legal-callout">
                <span className="lc-ico">
                    <Icon name={panel.callout.icon} className="icon" />
                </span>
                <span className="lc-text">{panel.callout.body}</span>
            </div>
        </>
    );
}
