"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "@/components/Reveal";
import { FLOW_STEPS, PRINCIPLES } from "@/data/aboutData";

const STATS = [
    { value: 2, label: "Founders behind every decision" },
    { value: FLOW_STEPS.length, label: "Touchpoints tracked in one guest stay" },
    { value: PRINCIPLES.length, label: "Convictions we don't compromise on" },
    { value: 1, label: "Country we call home, for now" },
];

function CountUp({ target, duration = 1100 }) {
    const [value, setValue] = useState(0);
    const ref = useRef(null);
    const started = useRef(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const prefersReduced = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReduced) {
            setValue(target);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || started.current) return;
                started.current = true;

                const start = performance.now();
                const tick = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    setValue(Math.round(eased * target));
                    if (progress < 1) requestAnimationFrame(tick);
                };
                requestAnimationFrame(tick);
                observer.disconnect();
            },
            { threshold: 0.4 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [target, duration]);

    return (
        <span className="sv tnum" ref={ref}>
            {value}
        </span>
    );
}

export default function AboutStats() {
    return (
        <section className="stat-band sec-tight" id="stats">
            <div className="wrap">
                <Reveal className="stat-grid reveal-stag reveal">
                    {STATS.map((s) => (
                        <div className="stat-item" key={s.label}>
                            <CountUp target={s.value} />
                            <div className="sl">{s.label}</div>
                        </div>
                    ))}
                </Reveal>
                <p className="stat-note">
                    No vanity metrics — just the arithmetic of who we are today.
                </p>
            </div>
        </section>
    );
}
