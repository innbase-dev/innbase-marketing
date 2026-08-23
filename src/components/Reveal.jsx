"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * components/ui/Reveal.jsx
 * ─────────────────────────────────────────────────────────────────────────
 * Scroll-triggered fade/rise-in wrapper. Same prop contract as the legacy
 * CSS-class Reveal (`as`, `className`, `style`, `delay`) so it drops in
 * anywhere that component was used, but animates via framer-motion +
 * `whileInView` instead of a manual IntersectionObserver + CSS class toggle.
 * Respects prefers-reduced-motion automatically.
 */
export default function Reveal({
    as = "div",
    children,
    className = "",
    style = {},
    delay = 0,
    once = true,
    y = 24,
}) {
    const prefersReducedMotion = useReducedMotion();
    const MotionTag = motion[as] ?? motion.div;

    if (prefersReducedMotion) {
        const Tag = as;
        return (
            <Tag className={className} style={style}>
                {children}
            </Tag>
        );
    }

    return (
        <MotionTag
            className={className}
            style={style}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once, amount: 0.2 }}
            transition={{ duration: 0.7, delay, ease: [0.16, 0.8, 0.24, 1] }}
        >
            {children}
        </MotionTag>
    );
}

/**
 * Staggers its direct children in on scroll. Use for card grids / lists
 * where each item should cascade rather than reveal as one block.
 */
export function RevealStagger({
    as = "div",
    children,
    className = "",
    style = {},
    stagger = 0.08,
    once = true,
}) {
    const prefersReducedMotion = useReducedMotion();
    const MotionTag = motion[as] ?? motion.div;

    if (prefersReducedMotion) {
        const Tag = as;
        return (
            <Tag className={className} style={style}>
                {children}
            </Tag>
        );
    }

    return (
        <MotionTag
            className={className}
            style={style}
            initial="hidden"
            whileInView="show"
            viewport={{ once, amount: 0.15 }}
            variants={{
                hidden: {},
                show: { transition: { staggerChildren: stagger } },
            }}
        >
            {children}
        </MotionTag>
    );
}

export function RevealItem({ as = "div", children, className = "", style = {}, y = 18 }) {
    const MotionTag = motion[as] ?? motion.div;
    return (
        <MotionTag
            className={className}
            style={style}
            variants={{
                hidden: { opacity: 0, y },
                show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 0.8, 0.24, 1] } },
            }}
        >
            {children}
        </MotionTag>
    );
}
