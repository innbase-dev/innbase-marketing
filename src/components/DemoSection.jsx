"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Reveal from "./Reveal";
import { useDemo, DEMO_ORDER } from "./DemoContext";
import { DEMO_TABS, DEMO_DATA } from "@/data/demoData";

function DemoPanel({ demoKey }) {
    const data = DEMO_DATA[demoKey];
    return (
        <>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4,1fr)",
                    gap: 12,
                    marginBottom: 20,
                }}
            >
                {data.kpis.map((kpi) => (
                    <div className="mock-kpi" key={kpi.k}>
                        <div className="k">{kpi.k}</div>
                        <div
                            className="v"
                            style={{
                                color: kpi.color,
                                fontSize: kpi.small ? 12 : undefined,
                            }}
                        >
                            {kpi.v}
                        </div>
                    </div>
                ))}
            </div>
            {data.rows.map((row, i) => (
                <div className="mock-line" key={i}>
                    <span
                        className="mock-ava"
                        style={{
                            background: row.ava,
                            borderRadius: row.square ? 6 : undefined,
                        }}
                    />
                    <span>{row.label}</span>
                    <span
                        className="mock-chip"
                        style={{ background: row.chipBg, color: row.chipColor }}
                    >
                        {row.chip}
                    </span>
                </div>
            ))}
        </>
    );
}

export default function DemoSection() {
    const { activeDemo, activateDemo, userTouched, setUserTouched } = useDemo();
    const panelRef = useRef(null);
    const inView = useInView(panelRef, { amount: 0.35 });
    const tabsRef = useRef(null);

    // Auto-cycle through tabs while the panel is in view, unless the user
    // has interacted with the tabs (matches the original's `userTouched` gate).
    useEffect(() => {
        if (!inView || userTouched) return;
        const id = setInterval(() => {
            if (document.hidden) return;
            const next =
                DEMO_ORDER[
                    (DEMO_ORDER.indexOf(activeDemo) + 1) % DEMO_ORDER.length
                ];
            activateDemo(next);
        }, 9000);
        return () => clearInterval(id);
    }, [inView, activeDemo, activateDemo, userTouched]);

    function onKeyDown(e) {
        const keys = {
            ArrowRight: 1,
            ArrowLeft: -1,
            Home: "first",
            End: "last",
        };
        if (!(e.key in keys)) return;
        e.preventDefault();
        setUserTouched(true);
        const cur = DEMO_ORDER.indexOf(activeDemo);
        let next;
        if (keys[e.key] === "first") next = 0;
        else if (keys[e.key] === "last") next = DEMO_ORDER.length - 1;
        else next = (cur + keys[e.key] + DEMO_ORDER.length) % DEMO_ORDER.length;
        activateDemo(DEMO_ORDER[next]);
        tabsRef.current?.querySelectorAll(".tab-btn")[next]?.focus();
    }

    return (
        <section
            className="sec-tight"
            id="demo"
            style={{ background: "var(--ink)" }}
        >
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Try it yourself</span>
                    <h2 className="sec-h2">
                        Tap around. It&apos;s the real thing.
                    </h2>
                    <p className="sec-sub">
                        Every screen below is built on the same data model as
                        your actual dashboard — nothing here is a mockup
                        pretending to be a product.
                    </p>
                </Reveal>

                <Reveal className="demo-shell reveal">
                    <div
                        className="demo-tabs"
                        id="demoTabs"
                        role="tablist"
                        aria-label="Product modules"
                        ref={tabsRef}
                        onPointerDown={() => setUserTouched(true)}
                        onKeyDown={onKeyDown}
                    >
                        {DEMO_TABS.map((tab) => (
                            <button
                                key={tab.key}
                                className={`tab-btn${activeDemo === tab.key ? " active" : ""}`}
                                role="tab"
                                id={`tab-${tab.key}`}
                                aria-selected={activeDemo === tab.key}
                                aria-controls="demoPanel"
                                tabIndex={activeDemo === tab.key ? 0 : -1}
                                onClick={() => {
                                    setUserTouched(true);
                                    activateDemo(tab.key);
                                }}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                    <div
                        className="demo-panel"
                        id="demoPanel"
                        role="tabpanel"
                        tabIndex={0}
                        aria-labelledby={`tab-${activeDemo}`}
                        ref={panelRef}
                    >
                        <DemoPanel demoKey={activeDemo} />
                    </div>
                </Reveal>

                <div className="mid-cta reveal">
                    <p>
                        <b>These are sample numbers.</b> Yours load in an
                        afternoon — bank statements, POS, and stock counts
                        included.
                    </p>
                    <a href="#cta" className="btn btn-brass btn-sm">
                        See it with your numbers
                    </a>
                </div>
            </div>
        </section>
    );
}
