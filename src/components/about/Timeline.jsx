"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckIcon } from "@/components/about/icons";

/**
 * components/about/Timeline.jsx
 * ─────────────────────────────────────────────────────────────────────────
 * The page's signature moment: the same nine events named in the copy above
 * it, drawn as a single connecting line that fills in on scroll and ends in
 * a "Reconciled" node — a literal, on-brand payoff for "the system already
 * knows" (this mirrors the reconciliation-ledger motif already used for the
 * product itself elsewhere on the site).
 *
 * Numbered nodes are intentional, not decorative: this is a real sequence
 * (a hotel's day, roughly in order), so the index carries information.
 */
export default function Timeline({ steps }) {
    const prefersReducedMotion = useReducedMotion();
    const nodes = [...steps.map((s, i) => ({ label: s.label, index: i + 1, isEnd: false })), { label: "Reconciled", index: null, isEnd: true }];

    const lineVariants = {
        hidden: { scaleX: 0 },
        show: { scaleX: 1, transition: { duration: 1.3, ease: [0.16, 0.8, 0.24, 1] } },
    };
    const lineVariantsV = {
        hidden: { scaleY: 0 },
        show: { scaleY: 1, transition: { duration: 1.1, ease: [0.16, 0.8, 0.24, 1] } },
    };
    const nodeVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 0.8, 0.24, 1] } },
    };
    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
    };

    if (prefersReducedMotion) {
        return <StaticTimeline nodes={nodes} />;
    }

    return (
        <>
            {/* Desktop: horizontal */}
            <motion.div
                className="hidden md:block mt-16"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={container}
            >
                <div className="relative">
                    <div className="absolute left-0 right-0 top-[15px] h-px bg-ink-line" />
                    <motion.div
                        variants={lineVariants}
                        className="absolute left-0 right-0 top-[15px] h-px origin-left"
                        style={{ background: "linear-gradient(90deg, var(--brass), var(--teal-bright))" }}
                    />
                    <div className="relative flex justify-between">
                        {nodes.map((n) => (
                            <motion.div key={n.label} variants={nodeVariants} className="flex flex-col items-center gap-3 w-16">
                                <TimelineDot node={n} />
                                <span
                                    className={`text-[10.5px] text-center leading-tight max-w-[76px] ${
                                        n.isEnd ? "font-bold text-teal-bright" : "text-muted-dark"
                                    }`}
                                >
                                    {n.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Mobile: vertical */}
            <motion.div
                className="md:hidden mt-12 relative pl-6"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={container}
            >
                <div className="absolute left-[3px] top-1 bottom-1 w-px bg-ink-line" />
                <motion.div
                    variants={lineVariantsV}
                    className="absolute left-[3px] top-1 bottom-1 w-px origin-top"
                    style={{ background: "linear-gradient(180deg, var(--brass), var(--teal-bright))" }}
                />
                <div className="flex flex-col gap-5 relative">
                    {nodes.map((n) => (
                        <motion.div key={n.label} variants={nodeVariants} className="flex items-center gap-3">
                            <TimelineDot node={n} compact />
                            <span className={`text-[13px] ${n.isEnd ? "font-bold text-teal-bright" : "text-text-dark"}`}>
                                {n.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </>
    );
}

function TimelineDot({ node, compact = false }) {
    const size = compact ? "w-6 h-6 -ml-[27px]" : "w-8 h-8";
    if (node.isEnd) {
        return (
            <span className={`flex-none ${size} rounded-full grid place-items-center bg-teal-bright text-ink`}>
                <CheckIcon />
            </span>
        );
    }
    return (
        <span className={`flex-none ${size} rounded-full grid place-items-center font-mono font-bold text-muted-dark bg-ink border-2 border-ink-line ${compact ? "text-[9px]" : "text-[10.5px]"}`}>
            {String(node.index).padStart(2, "0")}
        </span>
    );
}

/** No-motion fallback for prefers-reduced-motion — same markup, no animation. */
function StaticTimeline({ nodes }) {
    return (
        <>
            <div className="hidden md:block mt-16">
                <div className="relative">
                    <div className="absolute left-0 right-0 top-[15px] h-px" style={{ background: "linear-gradient(90deg, var(--brass), var(--teal-bright))" }} />
                    <div className="relative flex justify-between">
                        {nodes.map((n) => (
                            <div key={n.label} className="flex flex-col items-center gap-3 w-16">
                                <TimelineDot node={n} />
                                <span className={`text-[10.5px] text-center leading-tight max-w-[76px] ${n.isEnd ? "font-bold text-teal-bright" : "text-muted-dark"}`}>
                                    {n.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="md:hidden mt-12 relative pl-6">
                <div className="absolute left-[3px] top-1 bottom-1 w-px" style={{ background: "linear-gradient(180deg, var(--brass), var(--teal-bright))" }} />
                <div className="flex flex-col gap-5 relative">
                    {nodes.map((n) => (
                        <div key={n.label} className="flex items-center gap-3">
                            <TimelineDot node={n} compact />
                            <span className={`text-[13px] ${n.isEnd ? "font-bold text-teal-bright" : "text-text-dark"}`}>{n.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
