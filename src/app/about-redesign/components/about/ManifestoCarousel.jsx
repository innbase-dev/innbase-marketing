"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "@/components/Icon";
import QuoteMark from "@/components/about/QuoteMark";

const AUTOPLAY_MS = 5200;

export default function ManifestoCarousel({ lines }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);
    const total = lines.length;

    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReducedMotion(mq.matches);
        const onChange = (e) => setReducedMotion(e.matches);
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    const goTo = (i) => setIndex(((i % total) + total) % total);
    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    const timeoutRef = useRef(null);
    useEffect(() => {
        if (paused || reducedMotion) return undefined;
        timeoutRef.current = setTimeout(next, AUTOPLAY_MS);
        return () => clearTimeout(timeoutRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, paused, reducedMotion]);

    const onKeyDown = (e) => {
        if (e.key === "ArrowRight") next();
        if (e.key === "ArrowLeft") prev();
    };

    return (
        <div
            className={`manifesto-carousel${paused ? " is-paused" : ""}`}
            role="region"
            aria-roledescription="carousel"
            aria-label="What we believe"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onKeyDown={onKeyDown}
        >
            <QuoteMark className="manifesto-quote-mark" />

            <div className="manifesto-slide-wrap" aria-live="polite">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={index}
                        className="manifesto-line"
                        initial={
                            reducedMotion
                                ? false
                                : { opacity: 0, y: 14 }
                        }
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                            reducedMotion
                                ? undefined
                                : { opacity: 0, y: -14 }
                        }
                        transition={{ duration: 0.45, ease: [0.16, 0.8, 0.24, 1] }}
                    >
                        {lines[index]}
                    </motion.p>
                </AnimatePresence>
            </div>

            <div className="manifesto-progress-row">
                {lines.map((_, i) => (
                    <button
                        key={i}
                        type="button"
                        className={`manifesto-progress-seg${
                            i === index ? " active" : i < index ? " done" : ""
                        }`}
                        onClick={() => goTo(i)}
                        aria-label={`Go to statement ${i + 1} of ${total}`}
                        aria-current={i === index}
                    >
                        <span
                            className="fill"
                            style={
                                i === index && !reducedMotion
                                    ? { animationDuration: `${AUTOPLAY_MS}ms` }
                                    : undefined
                            }
                        />
                    </button>
                ))}
            </div>

            <div className="manifesto-controls">
                <span className="manifesto-index mono">
                    {String(index + 1).padStart(2, "0")} /{" "}
                    {String(total).padStart(2, "0")}
                </span>
                <div className="manifesto-arrows">
                    <button
                        type="button"
                        className="case-arrow"
                        onClick={prev}
                        aria-label="Previous statement"
                    >
                        <Icon
                            name="arrow-right"
                            className="icon"
                            style={{ transform: "scaleX(-1)" }}
                        />
                    </button>
                    <button
                        type="button"
                        className="case-arrow"
                        onClick={next}
                        aria-label="Next statement"
                    >
                        <Icon name="arrow-right" className="icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}
