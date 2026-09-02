"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { COMPARE_ROWS } from "@/data/pricingPlans";

function ValueChip({ value, colClass }) {
    if (typeof value === "boolean") {
        return (
            <span className={`v3-chip ${colClass}`}>
                <Icon
                    name={value ? "check" : "x"}
                    className={`icon ${value ? "yes" : "no"}`}
                />
            </span>
        );
    }
    return (
        <span className={`v3-chip ${colClass}`}>
            <span className="dot" />
            {value}
        </span>
    );
}

export default function ComparisonTable() {
    const [diffOnly, setDiffOnly] = useState(false);

    return (
        <section className="sec sec-alt" id="compare">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Side by side</span>
                    <h2 className="sec-h2">Compare plans in detail.</h2>
                </Reveal>

                <Reveal className="v3-toolbar reveal">
                    <div className="v3-legend">
                        <span>
                            <span
                                className="dot"
                                style={{ background: "var(--brass-2)" }}
                            />
                            Boutique
                        </span>
                        <span>
                            <span
                                className="dot"
                                style={{ background: "var(--teal-bright)" }}
                            />
                            Base
                        </span>
                        <span>
                            <span
                                className="dot"
                                style={{ background: "var(--amber-bright)" }}
                            />
                            Growth
                        </span>
                    </div>
                    <div className="v3-toggle-wrap">
                        <span>Show differences only</span>
                        <button
                            className={`v3-toggle${diffOnly ? " on" : ""}`}
                            role="switch"
                            aria-checked={diffOnly}
                            aria-label="Show differences only"
                            onClick={() => setDiffOnly((v) => !v)}
                        >
                            <span className="kn" />
                        </button>
                    </div>
                </Reveal>

                <Reveal className="v3-list reveal">
                    {COMPARE_ROWS.map((row, i) => {
                        // Section header rows only have a `section` key — no values array
                        if (row.section) {
                            return (
                                <div className="v3-section-head" key={`section-${i}`}>
                                    {row.section}
                                </div>
                            );
                        }
                        return (
                            <div
                                className={`v3-row${diffOnly && row.same ? " hidden" : ""}`}
                                key={row.feature}
                            >
                                <span className="v3-fname">{row.feature}</span>
                                <span className="v3-ladder">
                                    <ValueChip value={row.values[0]} colClass="b" />
                                    <span className="v3-arrow">→</span>
                                    <ValueChip
                                        value={row.values[1]}
                                        colClass="ba"
                                    />
                                    <span className="v3-arrow">→</span>
                                    <ValueChip value={row.values[2]} colClass="g" />
                                </span>
                            </div>
                        );
                    })}
                </Reveal>
                <p className="v3-def-cap">
                    A staff account is anyone with access to your workspace —
                    owner, managers, front desk, bar &amp; housekeeping.
                </p>
            </div>
        </section>
    );
}
