"use client";

import { Disclosure } from "@headlessui/react";
import Reveal from "@/components/Reveal";

export default function AfricaSection() {
    return (
        <section className="py-24 bg-ink" id="africa">
            <div className="wrap">
                <Reveal className="sec-head">
                    <span className="sec-eyebrow">Where we&apos;re building from</span>
                    <h2 className="sec-h2" style={{ fontSize: "clamp(30px, 3.2vw, 44px)" }}>
                        Built in Africa, for the way African hotels actually operate.
                    </h2>
                    <p className="sec-sub">
                        Innbase is being built from Nigeria, for hotels here first. But the operational
                        reality we&apos;re designing for — cash, transfers, phone bookings, busy shifts,
                        owners who can&apos;t be everywhere — isn&apos;t unique to one country.
                    </p>
                </Reveal>

                <Reveal className="flex items-center flex-wrap gap-3 mt-9">
                    <span className="font-mono text-[12px] font-semibold px-4 py-2.5 rounded-full border border-[rgba(212,175,55,.35)] bg-(--amber-soft) text-brass-bright">
                        Nigeria — where we build today
                    </span>
                    <ArrowIcon />
                    <span className="font-mono text-[12px] font-semibold px-4 py-2.5 rounded-full border border-ink-line text-muted-dark">
                        A wider African hospitality industry — where we&apos;re headed
                    </span>
                </Reveal>

                <Disclosure as="div" className="mt-6">
                    {({ open }) => (
                        <>
                            <Disclosure.Button className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-muted-dark transition hover:text-text-dark">
                                <InfoIcon />
                                Why we phrase it this way
                                <span className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                                    <ChevronIcon />
                                </span>
                            </Disclosure.Button>
                            <Disclosure.Panel className="pt-3 text-[12.5px] text-muted-dark max-w-[480px] leading-[1.6]">
                                This is a statement of ambition, not a claim of where we operate today.
                                We&apos;d rather be honest about that than impressive about it.
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>
            </div>
        </section>
    );
}

function ArrowIcon() {
    return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="text-muted-dark opacity-60">
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    );
}

function InfoIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
        </svg>
    );
}

function ChevronIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9l6 6 6-6" />
        </svg>
    );
}
