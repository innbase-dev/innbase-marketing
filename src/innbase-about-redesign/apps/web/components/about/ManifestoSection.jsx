"use client";

import { useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { aboutManifestoLines } from "@/utils/data";

/**
 * The five belief statements read better as one big idea at a time than as
 * a stacked list — each gets full weight as its own slide, in the same
 * "case study" carousel language already used elsewhere on the site
 * (arrow buttons, snap-scroll track), just carrying manifesto lines
 * instead of pilot properties.
 */
export default function ManifestoSection() {
    const trackRef = useRef(null);
    const [index, setIndex] = useState(0);
    const total = aboutManifestoLines.length;

    const scrollByCard = (dir) => {
        const track = trackRef.current;
        if (!track) return;
        const card = track.querySelector("[data-manifesto-card]");
        const gap = 20;
        const width = card ? card.offsetWidth + gap : 340;
        track.scrollBy({ left: dir * width, behavior: "smooth" });
    };

    const handleScroll = () => {
        const track = trackRef.current;
        if (!track) return;
        const card = track.querySelector("[data-manifesto-card]");
        if (!card) return;
        const width = card.offsetWidth + 20;
        setIndex(Math.min(Math.round(track.scrollLeft / width), total - 1));
    };

    return (
        <section
            className="py-28 relative bg-ink"
            id="believe"
            style={{ background: "linear-gradient(180deg, var(--ink) 0%, #100e0c 100%)" }}
        >
            <div className="wrap">
                <Reveal className="sec-head mb-12">
                    <span className="sec-eyebrow">What we believe</span>
                    <h2 className="sec-h2">
                        A hotel owner shouldn&apos;t need to be everywhere to know what&apos;s happening.
                    </h2>
                </Reveal>

                <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[11px] text-muted-dark">
                        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </span>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => scrollByCard(-1)}
                            aria-label="Previous"
                            className="w-11 h-11 rounded-full border border-ink-line grid place-items-center text-muted-dark transition hover:text-text-dark hover:border-white/25"
                        >
                            <ArrowIcon direction="left" />
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollByCard(1)}
                            aria-label="Next"
                            className="w-11 h-11 rounded-full border border-ink-line grid place-items-center text-muted-dark transition hover:text-text-dark hover:border-white/25"
                        >
                            <ArrowIcon direction="right" />
                        </button>
                    </div>
                </div>

                <div
                    ref={trackRef}
                    onScroll={handleScroll}
                    className="flex gap-5 overflow-x-auto pb-3 [scroll-snap-type:x_mandatory] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                    {aboutManifestoLines.map((line, i) => (
                        <div
                            key={line.id}
                            data-manifesto-card
                            className="flex-none w-[320px] sm:w-[420px] border border-ink-line rounded-[20px] p-8 sm:p-10 relative overflow-hidden [scroll-snap-align:start]"
                            style={{ background: "linear-gradient(165deg, #171d23, #0e1214)" }}
                        >
                            <span className="font-mono text-[11px] text-muted-dark">
                                {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                            </span>
                            <p
                                className="mt-4 font-semibold leading-[1.4] tracking-[-0.01em] text-[rgba(243,240,234,.92)]"
                                style={{ fontSize: "clamp(19px, 2vw, 24px)" }}
                            >
                                {line.text}
                                <b className="font-bold text-brass-bright">{line.emphasis}</b>
                                {line.suffix}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ArrowIcon({ direction }) {
    return (
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            {direction === "left" ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
        </svg>
    );
}
