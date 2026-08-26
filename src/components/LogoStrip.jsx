"use client";

import { motion } from "framer-motion";
import React from "react";

const brands = [
    "The George Hotel",
    "Grand Emperium Hotel",
    "Lekki Shore Suites",
    "The Bay Lounge",
    "The Palm Room",
    "Ilaje Boutique Inn"
];

// Duplicate the brands array multiple times for seamless infinite scrolling
const scrollingBrands = [...brands, ...brands, ...brands, ...brands];

// Animation variants for continuous marquee scrolling
const marqueeVariants = {
    animate: {
        x: ["0%", "-50%"],
        transition: {
            x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 120,
                ease: "linear",
            },
        },
    },
};

export default function LogoStrip() {
    return (
        <section
            style={{
                background: "var(--ink-soft)",
                padding: "34px 0 30px",
                borderBottom: "1px solid var(--ink-line)",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: 1180,
                    margin: "0 auto",
                    // Use % stops relative to this element's own box, not the
                    // viewport (vw), so the fade always aligns with the actual
                    // left/right edges regardless of where this is nested.
                    WebkitMaskImage:
                        "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                    maskImage:
                        "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "100% 100%",
                    maskSize: "100% 100%",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    // Forces its own compositing layer so Safari/WebKit applies
                    // the mask correctly on top of the animated (transformed)
                    // child instead of intermittently failing to clip it.
                    transform: "translateZ(0)",
                }}
            >
                <motion.div
                    className="trust-row"
                    variants={marqueeVariants}
                    animate="animate"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 40,
                        width: "max-content",
                    }}
                >
                    {scrollingBrands.map((brand, index) => (
                        <span key={`${brand}-${index}`} className="trust-mark" style={{ whiteSpace: "nowrap" }}>
                            {brand}
                        </span>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}