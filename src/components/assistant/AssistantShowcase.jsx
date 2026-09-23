"use client";

import { useEffect, useState } from "react";
import useReducedMotion from "@/hooks/useReducedMotion";
import styles from "./AssistantShowcase.module.css";
import Reveal from "../Reveal";
import AssetImage from "../AssetImage";

// Auto-rotation pauses for keyboard focus, pointer hover and reduced motion.
const LINES = [
    "A night auditor gets the same help as a manager at noon.",
    "A first-week hire gets the same answers as your longest-serving staff.",
    "The quietest Tuesday gets the same attention as your busiest Saturday.",
];

const IMAGES = [
    "/images/auditor.jpg",
    "/images/new-hire.jpg",
    "/images/busy-saturday.jpg",
];

export default function AssistantShowcase() {
    const [idx, setIdx] = useState(0);
    const [paused, setPaused] = useState(false);
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (paused || reducedMotion) return;
        const timer = setTimeout(() => setIdx((value) => (value + 1) % LINES.length), 4500);
        return () => clearTimeout(timer);
    }, [idx, paused, reducedMotion]);

    const goTo = (index) => setIdx(index);

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
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        onFocus={() => setPaused(true)}
                        onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
                    >
                        {IMAGES.map((src, i) => (
                            <AssetImage
                                key={src}
                                src={src}
                                alt=""
                                className="showcase-bg"
                                fill
                                sizes="(max-width: 760px) 100vw, 980px"
                                fallbackLabel={i === 0 ? "Night audit" : i === 1 ? "New hire" : "Busy Saturday"}
                                fallbackTone={i === 1 ? "sage" : "forest"}
                                style={{ 
                                    opacity: idx === i ? 1 : 0, 
                                    objectFit: "cover"
                                }}
                            />
                        ))}
                        <div className="showcase-grid" />
                        <div className="showcase-body">
                            <div className="showcase-text">
                                <span className="showcase-eyebrow">
                                    What that means for your hotel
                                </span>
                                <div
                                    key={idx}
                                    className={`showcase-line ${styles.line}`}
                                >
                                    {LINES[idx]}
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
