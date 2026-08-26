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
            <div className="relative wrap">
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

                {/* Fading overlays for smooth edges */}
                <div style={{
                    pointerEvents: "none",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    zIndex: 10
                }}>
                    <div style={{ width: "120px", background: "linear-gradient(to right, #12161d, rgba(18, 22, 29, 0))" }} />
                    <div style={{ width: "120px", background: "linear-gradient(to left, #12161d, rgba(18, 22, 29, 0))" }} />
                </div>
            </div>
        </section>
    );
}
