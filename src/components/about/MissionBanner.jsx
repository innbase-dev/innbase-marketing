"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { AnimatePresence, motion } from "framer-motion";

const IMAGES = [
    "/images/cashier.jpg",
    "/images/cashier.jpg",
    "/images/owner.jpg",
    "/images/payment.jpg",
    "/images/owner.jpg",
];

export default function MissionBanner({ lines }) {
    const [index, setIndex] = useState(0);
    const total = lines.length;

    const goTo = (i) => setIndex(((i % total) + total) % total);

    return (
        <div className="mission-banner">
            <AnimatePresence mode="popLayout">
                <motion.img
                    key={index}
                    src={IMAGES[index % IMAGES.length]}
                    alt=""
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.35 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        zIndex: 0,
                    }}
                />
            </AnimatePresence>
            <div className="mission-banner-grid" aria-hidden="true" style={{ zIndex: 1 }} />

            <div className="mission-banner-overlay">
                <div>
                    <span className="mission-banner-eyebrow">
                        Our mission
                    </span>
                    <p className="mission-banner-line" key={index} aria-live="polite">
                        {lines[index]}
                    </p>
                </div>

                <div className="mission-banner-nav">
                    <button
                        type="button"
                        className="m-arrow"
                        onClick={() => goTo(index - 1)}
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
                        className="m-arrow"
                        onClick={() => goTo(index + 1)}
                        aria-label="Next statement"
                    >
                        <Icon name="arrow-right" className="icon" />
                    </button>
                </div>
            </div>
        </div>
    );
}
