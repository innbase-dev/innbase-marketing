"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { CASE_STUDIES } from "@/data/caseStudies";

export default function CaseStudiesSection() {
    const trackRef = useRef(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);

    const step = useCallback(() => {
        const track = trackRef.current;
        if (!track) return 320;
        const card = track.querySelector(".case-card");
        const gap = parseFloat(getComputedStyle(track).gap) || 22;
        return card ? card.getBoundingClientRect().width + gap : 320;
    }, []);

    const updateArrows = useCallback(() => {
        const track = trackRef.current;
        if (!track) return;
        const max = track.scrollWidth - track.clientWidth - 4;
        setCanPrev(track.scrollLeft > 4);
        setCanNext(track.scrollLeft < max);
    }, []);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;
        updateArrows();
        const onScroll = () => requestAnimationFrame(updateArrows);
        track.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        return () => {
            track.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, [updateArrows]);

    function scrollByStep(dir) {
        trackRef.current?.scrollBy({ left: dir * step(), behavior: "smooth" });
    }

    function onKeyDown(e) {
        if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
        e.preventDefault();
        scrollByStep(e.key === "ArrowRight" ? 1 : -1);
    }

    return (
        <section className="sec case-sec" id="stories">
            <div
                className="sec-blob"
                style={{
                    width: 520,
                    height: 420,
                    background:
                        "radial-gradient(circle,var(--teal) 0%,transparent 70%)",
                    opacity: ".08",
                    top: "-100px",
                    left: "-140px",
                }}
            />
            <div className="wrap">
                <Reveal className="case-head reveal">
                    <div className="sec-head">
                        <span className="sec-eyebrow">
                            Pilot properties, real numbers
                        </span>
                        <h2 className="sec-h2">
                            Five weeks in, and the ledger finally agrees with
                            itself.
                        </h2>
                        <p className="sec-sub">
                            Innbase is early — these are the first properties
                            running it end to end, shift after shift.
                            Here&apos;s what changed for them.
                        </p>
                    </div>
                    <div className="case-nav">
                        <button
                            className={`case-arrow${canPrev ? " active" : ""}`}
                            aria-label="Previous story"
                            disabled={!canPrev}
                            onClick={() => scrollByStep(-1)}
                        >
                            <Icon name="arrow-left" className="icon" />
                        </button>
                        <button
                            className={`case-arrow${canNext ? " active" : ""}`}
                            aria-label="Next story"
                            onClick={() => scrollByStep(1)}
                        >
                            <Icon name="arrow-right" className="icon" />
                        </button>
                    </div>
                </Reveal>

                <Reveal className="case-track-wrap reveal">
                    <div
                        className="case-track"
                        ref={trackRef}
                        tabIndex={0}
                        role="group"
                        aria-label="Pilot property stories — use arrow keys to browse"
                        onKeyDown={onKeyDown}
                    >
                        {CASE_STUDIES.map((c) => (
                            <article className="case-card" key={c.name}>
                                <div className="case-media">
                                    <div className="case-glow" style={c.glow} />
                                    <div className="case-media-badge">
                                        <span
                                            className="d"
                                            style={{ background: c.badgeDot }}
                                        />
                                        {c.badge}
                                    </div>
                                    <Image
                                        src={c.img}
                                        alt={c.alt}
                                        fill
                                        sizes="(max-width: 768px) 90vw, 340px"
                                        className="case-media-img"
                                        loading="lazy"
                                    />
                                    <div className="case-media-foot">
                                        <span className="case-logo">
                                            <span
                                                className="mk"
                                                style={{
                                                    background: c.markColor,
                                                }}
                                            />
                                            {c.name}
                                        </span>
                                        <div className="case-logo-sub">
                                            {c.sub}
                                        </div>
                                    </div>
                                </div>
                                <p className="case-caption">{c.caption}</p>
                                <span className="case-metric">
                                    <b>{c.metricBig}</b>
                                    {c.metricLabel}
                                </span>
                            </article>
                        ))}

                        <article className="case-card case-card--cta">
                            <div className="case-media">
                                <div className="case-cta-inner">
                                    <span className="mk">
                                        <Icon
                                            name="plus"
                                            className="icon"
                                            style={{ width: 16, height: 16 }}
                                        />
                                    </span>
                                    <h4>Your property could be next.</h4>
                                    <p>
                                        We&apos;re onboarding a small group of
                                        hotels &amp; bars for the pilot. No card
                                        required.
                                    </p>
                                </div>
                            </div>
                            <p className="case-caption">
                                Set up your first workspace in an afternoon and
                                see your own numbers reconcile from day one.
                            </p>
                            <a href="#cta" className="case-link">
                                Book a demo{" "}
                                <Icon name="arrow-right" className="icon" />
                            </a>
                        </article>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
