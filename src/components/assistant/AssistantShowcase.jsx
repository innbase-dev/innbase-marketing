"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "../Reveal";

/**
 * Option A — rotating showcase panel.
 * Ported 1:1 from the static component-options.html behavior: background
 * gradient crossfades immediately on change, the headline text fades out,
 * swaps, then fades back in ~260ms later (matching the original setTimeout),
 * and the rotation auto-advances every 4.5s, pausing on hover.
 */
const LINES = [
    "A night auditor gets the same help as a manager at noon.",
    "A first-week hire gets the same answers as your longest-serving staff.",
    "The quietest Tuesday gets the same attention as your busiest Saturday.",
];

export default function AssistantShowcase() {
    const [idx, setIdx] = useState(0);
    const [lineIdx, setLineIdx] = useState(0);
    const [lineVisible, setLineVisible] = useState(true);
    const timerRef = useRef(null);

    const start = () => {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setIdx((i) => (i + 1) % LINES.length);
        }, 4500);
    };

    useEffect(() => {
        start();
        return () => clearInterval(timerRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setLineVisible(false);
        const t = setTimeout(() => {
            setLineIdx(idx);
            setLineVisible(true);
        }, 260);
        return () => clearTimeout(t);
    }, [idx]);

    const goTo = (i) => {
        setIdx(i);
        start();
    };

    return (
        <section className="sec" id="showcase-section">
            <div className="wrap">
                <Reveal className="sec-head center reveal" style={{ maxWidth: 680 }}>
                    <h2 className="sec-h2">
                        One assistant. Every desk, every hour.
                    </h2>
                    <p className="sec-sub center">
                        It doesn&apos;t take breaks, doesn&apos;t forget a
                        handover, and doesn&apos;t need training. It&apos;s
                        simply there — whenever a staff member needs it.
                    </p>
                </Reveal>

                <Reveal className="showcase-wrap reveal">
                    <div
                        className="showcase"
                        onMouseEnter={() => clearInterval(timerRef.current)}
                        onMouseLeave={start}
                    >
                        {["g1", "g2", "g3"].map((g, i) => (
                            <div
                                key={g}
                                className={`showcase-bg ${g}`}
                                style={{ opacity: idx === i ? 1 : 0 }}
                            />
                        ))}
                        <div className="showcase-grid" />
                        <div className="showcase-body">
                            <div className="showcase-text">
                                <span className="showcase-eyebrow">
                                    What that means for your hotel
                                </span>
                                <div
                                    className="showcase-line"
                                    style={{ opacity: lineVisible ? 1 : 0 }}
                                >
                                    {LINES[lineIdx]}
                                </div>
                            </div>
                            <div className="showcase-pag">
                                {LINES.map((_, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className={idx === i ? "active" : ""}
                                        onClick={() => goTo(i)}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
