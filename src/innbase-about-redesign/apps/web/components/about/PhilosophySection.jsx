"use client";

import { Disclosure } from "@headlessui/react";
import Reveal from "@/components/ui/Reveal";
import { aboutPrinciples } from "@/utils/data";

/**
 * Presented as a numbered, expand-on-demand list rather than a card grid:
 * the titles alone ("Truth over assumptions", "Built for reality"...) read
 * as a scannable set of headlines, and the supporting sentence only needs
 * to show up once someone's interested — a grid of five full paragraphs
 * competes for attention instead of earning it.
 */
export default function PhilosophySection() {
    return (
        <section className="py-28 bg-ink-soft border-y border-ink-line" id="philosophy">
            <div className="wrap">
                <Reveal className="sec-head">
                    <span className="sec-eyebrow">What we believe about software</span>
                    <h2 className="sec-h2">A few convictions we don&apos;t compromise on.</h2>
                    <p className="sec-sub">
                        These aren&apos;t values on a wall. They&apos;re decisions we make every time we sit
                        down to build something.
                    </p>
                </Reveal>

                <Reveal className="mt-12 border border-ink-line rounded-2xl bg-ink overflow-hidden max-w-[760px]">
                    {aboutPrinciples.map((principle, i) => (
                        <Disclosure key={principle.id} as="div" className={i > 0 ? "border-t border-ink-line" : ""}>
                            {({ open }) => (
                                <>
                                    <Disclosure.Button className="w-full flex items-center gap-4 text-left px-6 py-5 focus-visible:outline-2 focus-visible:outline-[var(--amber)] focus-visible:outline-offset-[-2px]">
                                        <span className="font-mono text-[11.5px] text-muted-dark flex-none w-6">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="flex-1 font-bold text-[15px] text-text-dark">{principle.title}</span>
                                        <span
                                            className={`flex-none text-muted-dark transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                                        >
                                            <PlusIcon />
                                        </span>
                                    </Disclosure.Button>
                                    <Disclosure.Panel className="px-6 pb-5 pl-16 text-[13.75px] text-muted-dark leading-[1.7] max-w-[560px]">
                                        {principle.body}
                                    </Disclosure.Panel>
                                </>
                            )}
                        </Disclosure>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}

function PlusIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
        </svg>
    );
}
