"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { useDemo } from "./DemoContext";

const CARDS = ["payments", "guests", "inventory", "shift"];

export default function ProductSection() {
    const { activateDemo } = useDemo();
    const gridRef = useRef(null);
    const inView = useInView(gridRef, { amount: 0.3 });
    const [spotIdx, setSpotIdx] = useState(0);
    const [spotlighting, setSpotlighting] = useState(false);
    const [hoverHold, setHoverHold] = useState(false);

    // Pay-line micro sequence state (mirrors the original "packet" story:
    // Payments card shows a match resolving, then the guest folio total drops).
    const [payLine, setPayLine] = useState({
        text: "Needs review · 96%",
        color: "#fbbf24",
    });
    const [payFlip, setPayFlip] = useState(false);
    const [gpTotal, setGpTotal] = useState(9950);
    const [gpFlash, setGpFlash] = useState(false);

    useEffect(() => {
        if (!inView) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- kicks off the CSS spotlight-cycling state machine once the grid enters view
        setSpotlighting(true);
        const id = setInterval(() => {
            if (hoverHold) return;
            setSpotIdx((i) => (i + 1) % CARDS.length);
        }, 6000);
        return () => clearInterval(id);
    }, [inView, hoverHold]);

    // Run the payments → guest-folio story whenever the payments card lights up.
    useEffect(() => {
        if (CARDS[spotIdx] !== "payments" || !spotlighting) return;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- resets the micro-story to its start state whenever the payments card re-spotlights
        setPayLine({ text: "Needs review · 96%", color: "#fbbf24" });
        setGpTotal(345450);

        const t1 = setTimeout(() => {
            setPayLine({ text: "Completed", color: "#2dd4bf" });
            setPayFlip(true);
        }, 1500);
        const t2 = setTimeout(() => setPayFlip(false), 1950);
        const t3 = setTimeout(() => {
            setGpFlash(true);
            setGpTotal(9950);
        }, 1650);
        const t4 = setTimeout(() => setGpFlash(false), 2050);
        const t5 = setTimeout(() => {
            setPayLine({ text: "Needs review · 96%", color: "#fbbf24" });
            setGpTotal(345450);
        }, 5450);

        return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
    }, [spotIdx, spotlighting]);

    function openDemo(key) {
        activateDemo(key, true);
    }

    return (
        <section className="sec" id="product" style={{ paddingTop: 40 }}>
            <div
                className="sec-blob"
                style={{
                    width: 520,
                    height: 420,
                    background:
                        "radial-gradient(circle,var(--teal) 0%,transparent 70%)",
                    opacity: ".12",
                    top: "-100px",
                    right: "-140px",
                }}
            />
            <div
                className="sec-blob"
                style={{
                    width: 420,
                    height: 360,
                    background:
                        "radial-gradient(circle,var(--amber) 0%,transparent 70%)",
                    opacity: ".1",
                    bottom: "-120px",
                    left: "-120px",
                }}
            />
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">How Innbase works</span>
                    <h2 className="sec-h2">
                        One dashboard. Every workflow, reconciled automatically.
                    </h2>
                    <p className="sec-sub">
                        Payments, inventory, shift, and guests all pull from the
                        same numbers — so a naira in one workspace is the same
                        naira everywhere else.
                    </p>
                </Reveal>

                <Reveal
                    as="div"
                    className={`how-grid reveal-stag reveal${spotlighting ? " ib-spotlighting" : ""}`}
                >
                    <div ref={gridRef} style={{ display: "contents" }}>
                        <a
                            className={`how-card how-pay${CARDS[spotIdx] === "payments" ? " ib-spot" : ""}`}
                            href="#demo"
                            aria-label="Payments — see it in the live demo"
                            onClick={(e) => {
                                e.preventDefault();
                                openDemo("payments");
                            }}
                            onMouseEnter={() => {
                                setHoverHold(true);
                                setSpotIdx(0);
                            }}
                            onMouseLeave={() => setHoverHold(false)}
                        >
                            <span className="how-arrow">
                                <Icon name="arrow-up-right" className="icon" />
                            </span>
                            <span
                                className="how-chip"
                                style={{
                                    background: "var(--teal-soft)",
                                    color: "var(--teal-bright)",
                                }}
                            >
                                <Icon name="banknote" className="icon" />
                            </span>
                            <h3>
                                Payments <span>that reconcile themselves</span>
                            </h3>
                            <p>
                                Bank transfers, POS, and cash counts land in one
                                queue. Innbase proposes the match — you just
                                approve it.
                            </p>
                            <div className="how-mock">
                                <div className="how-mock-head">
                                    <span
                                        className="how-mock-dot"
                                        style={{ background: "#f87171" }}
                                    />
                                    <span
                                        className="how-mock-dot"
                                        style={{ background: "#fbbf24" }}
                                    />
                                    <span
                                        className="how-mock-dot"
                                        style={{ background: "#2dd4bf" }}
                                    />
                                </div>
                                <div className="how-mock-body">
                                    <div className="how-line">
                                        <span>
                                            Andrew Nweke · Bank Transfer
                                        </span>
                                        <span
                                            className={`lv${payFlip ? " ib-chip-flip" : ""}`}
                                            style={{ color: payLine.color }}
                                        >
                                            {payLine.text}
                                        </span>
                                    </div>
                                    <div className="how-line">
                                        <span>Sunday Olu · POS</span>
                                        <span
                                            className="lv"
                                            style={{ color: "#2dd4bf" }}
                                        >
                                            Completed
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="how-spec">
                                <span>Avg. confidence</span>
                                <b>96%</b>
                            </div>
                        </a>

                        <a
                            className={`how-card how-guest${CARDS[spotIdx] === "guests" ? " ib-spot" : ""}`}
                            href="#demo"
                            aria-label="Guests — see it in the live demo"
                            onClick={(e) => {
                                e.preventDefault();
                                openDemo("guests");
                            }}
                            onMouseEnter={() => {
                                setHoverHold(true);
                                setSpotIdx(1);
                            }}
                            onMouseLeave={() => setHoverHold(false)}
                        >
                            <span className="how-arrow">
                                <Icon name="arrow-up-right" className="icon" />
                            </span>
                            <span
                                className="how-chip"
                                style={{
                                    background: "var(--amber-soft)",
                                    color: "var(--amber-bright)",
                                }}
                            >
                                <Icon name="door-open" className="icon" />
                            </span>
                            <h3>
                                Guests <span>— one profile, every stay</span>
                            </h3>
                            <p>
                                Balance, open tab, and requests in one screen.
                                Reception never checks three systems.
                            </p>
                            <div className="gp-card">
                                <div className="gp-top">
                                    <span className="gp-ava">FA</span>
                                    <span className="gp-id">
                                        <div className="gp-name">
                                            Fola Adeyemi
                                        </div>
                                        <div className="gp-meta">
                                            Checked in Thursday · Deluxe
                                        </div>
                                    </span>
                                    <span className="gp-room">RM 305</span>
                                </div>
                                <div className="gp-stay">
                                    <div className="gp-stay-row">
                                        <span>Stay progress</span>
                                        <b>Night 4 of 5</b>
                                    </div>
                                    <div className="gp-track">
                                        <span className="gp-night done" />
                                        <span className="gp-night done" />
                                        <span className="gp-night done" />
                                        <span className="gp-night done" />
                                        <span className="gp-night" />
                                    </div>
                                </div>
                                <div className="gp-folio">
                                    <div className="gp-line">
                                        <span
                                            className="d"
                                            style={{ background: "#60a5fa" }}
                                        />
                                        Room charge
                                        <span className="gv">₦250,000</span>
                                    </div>
                                    <div className="gp-line">
                                        <span
                                            className="d"
                                            style={{ background: "#fbbf24" }}
                                        />
                                        Restaurant &amp; bar tab
                                        <span className="gv">₦95,450</span>
                                    </div>
                                    <div
                                        className={`gp-line pay${gpFlash ? " ib-row-flash" : ""}`}
                                    >
                                        <span
                                            className="d"
                                            style={{ background: "#2dd4bf" }}
                                        />
                                        Payment · GT Bank
                                        <span className="gv">−₦335,500</span>
                                    </div>
                                </div>
                                <div className="gp-total">
                                    <span>Outstanding</span>
                                    <b>₦{gpTotal.toLocaleString("en-NG")}</b>
                                </div>
                                <span className="gp-chip">
                                    <Icon
                                        name="sparkles"
                                        className="icon"
                                        style={{ width: 10, height: 10 }}
                                    />
                                    Synced with Payments · live
                                </span>
                            </div>
                            <div className="how-spec" style={{ marginTop: 16 }}>
                                <span>Guests tracked</span>
                                <b>1 profile</b>
                            </div>
                        </a>

                        <a
                            className={`how-card how-inv${CARDS[spotIdx] === "inventory" ? " ib-spot" : ""}`}
                            href="#demo"
                            aria-label="Inventory — see it in the live demo"
                            onClick={(e) => {
                                e.preventDefault();
                                openDemo("inventory");
                            }}
                            onMouseEnter={() => {
                                setHoverHold(true);
                                setSpotIdx(2);
                            }}
                            onMouseLeave={() => setHoverHold(false)}
                        >
                            <span className="how-arrow">
                                <Icon name="arrow-up-right" className="icon" />
                            </span>
                            <span
                                className="how-chip"
                                style={{
                                    background: "rgba(248,113,113,.1)",
                                    color: "#f87171",
                                }}
                            >
                                <Icon name="package-search" className="icon" />
                            </span>
                            <h3>
                                Inventory <span>that flags itself</span>
                            </h3>
                            <p>
                                Every sale deducts stock in real time. Variance
                                comes with a likely cause attached.
                            </p>
                            <div className="how-spec">
                                <span>Flagged today</span>
                                <b>2 items</b>
                            </div>
                        </a>

                        <a
                            className={`how-card how-shift${CARDS[spotIdx] === "shift" ? " ib-spot" : ""}`}
                            href="#demo"
                            aria-label="Shift — see it in the live demo"
                            onClick={(e) => {
                                e.preventDefault();
                                openDemo("shift");
                            }}
                            onMouseEnter={() => {
                                setHoverHold(true);
                                setSpotIdx(3);
                            }}
                            onMouseLeave={() => setHoverHold(false)}
                        >
                            <span className="how-arrow">
                                <Icon name="arrow-up-right" className="icon" />
                            </span>
                            <span
                                className="how-chip"
                                style={{
                                    background: "rgba(96,165,250,.1)",
                                    color: "#60a5fa",
                                }}
                            >
                                <Icon name="calendar-clock" className="icon" />
                            </span>
                            <h3>
                                Shift <span>coverage, mapped live</span>
                            </h3>
                            <p>
                                A live heatmap flags gaps, overtime, and
                                double-bookings before a guest notices.
                            </p>
                            <div className="how-spec">
                                <span>Coverage</span>
                                <b>92%</b>
                            </div>
                        </a>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
