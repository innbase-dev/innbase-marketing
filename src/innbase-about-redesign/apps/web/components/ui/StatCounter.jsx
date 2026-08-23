"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * components/ui/StatCounter.jsx
 * ─────────────────────────────────────────────────────────────────────────
 * Counts up from 0 to `value` once the element enters the viewport.
 * Deliberately simple (no external counter dependency) — values are always
 * small integers on this site (2 founders, 9 events, etc.), so a plain
 * requestAnimationFrame tween is plenty.
 */
export default function StatCounter({ value, label, duration = 900, className = "" }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.6 });
    const prefersReducedMotion = useReducedMotion();
    const [display, setDisplay] = useState(prefersReducedMotion ? value : 0);

    useEffect(() => {
        if (!isInView || prefersReducedMotion) return;
        let raf;
        const start = performance.now();

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) raf = requestAnimationFrame(tick);
        };

        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [isInView, value, duration, prefersReducedMotion]);

    return (
        <div ref={ref} className={className}>
            <div className="font-mono font-semibold text-[32px] tabular-nums text-text-strong">
                {display}
            </div>
            <div className="text-[12.5px] text-muted-dark mt-1">{label}</div>
        </div>
    );
}
