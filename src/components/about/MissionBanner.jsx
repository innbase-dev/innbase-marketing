"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

export default function MissionBanner({ lines }) {
    const [index, setIndex] = useState(0);
    const total = lines.length;

    const goTo = (i) => setIndex(((i % total) + total) % total);

    return (
        <div className="mission-banner">
            <div className="mission-banner-grid" aria-hidden="true" />
            <span className="mission-banner-photo-tag">
                Photo — to be added
            </span>

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
