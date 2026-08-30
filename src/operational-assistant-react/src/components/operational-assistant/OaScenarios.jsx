"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { OA_SCENARIOS } from "@/data/operationalAssistantData";

const AUTOPLAY_MS = 4600;
const THINK_MS = 700;

/**
 * Self-contained: manages its own "thinking → answer" reveal on mount, so
 * remounting it (via the parent's `key={active}`) is all that's needed to
 * replay the beat when the visitor switches scenarios — no animation state
 * needs to be lifted up to the parent.
 */
function ScenarioCard({ scenario }) {
    const [thinking, setThinking] = useState(false);
    const [showBot, setShowBot] = useState(false);

    useEffect(() => {
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduceMotion) {
            setShowBot(true);
            return;
        }
        const raf = requestAnimationFrame(() => setThinking(true));
        const timer = setTimeout(() => {
            setThinking(false);
            setShowBot(true);
        }, THINK_MS);
        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <div className="af-shell scn-card">
                <div className="af-chrome">
                    <span className="af-dot" style={{ background: "#ff5f57" }} />
                    <span className="af-dot" style={{ background: "#febc2e" }} />
                    <span className="af-dot" style={{ background: "#28c840" }} />
                    <span className="af-url">
                        <Icon name="lock" className="icon lock" style={{ width: 9, height: 9 }} />
                        app.innbase.co
                    </span>
                </div>
                <div className="af-body solo">
                    <div className="af-assistant">
                        <div className="af-a-head">
                            <Icon name="sparkles" className="a-spark" />
                            <span>Assistant</span>
                            <span className="ai-dot" style={{ marginLeft: 4 }} />
                        </div>
                        <div className="af-thread">
                            <div className="af-bubble user show">{scenario.user}</div>
                            <div className={`af-thinking${thinking ? " show" : ""}`}>
                                <i />
                                <i />
                                <i />
                            </div>
                            <div className={`af-bubble bot${showBot ? " show" : ""}`}>{scenario.bot}</div>
                        </div>
                    </div>
                </div>
            </div>
            <p className="scn-caption">{scenario.caption}</p>
        </>
    );
}

export default function OaScenarios() {
    const [active, setActive] = useState(0);
    const autoplayRef = useRef(null);

    useEffect(() => {
        autoplayRef.current = setInterval(() => {
            setActive((i) => (i + 1) % OA_SCENARIOS.length);
        }, AUTOPLAY_MS);
        return () => clearInterval(autoplayRef.current);
    }, []);

    function selectTab(idx) {
        clearInterval(autoplayRef.current);
        setActive(idx);
    }

    return (
        <section className="sec sec-alt" id="scenarios">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">A day with your new teammate</span>
                    <h2 className="sec-h2">One assistant. A full day at the front desk.</h2>
                    <p className="sec-sub">
                        This isn&apos;t a demo of what the Assistant could do someday. It&apos;s an ordinary
                        Tuesday — five moments, five different people, one assistant helping with each one.
                    </p>
                </Reveal>

                <Reveal className="scn-shell reveal">
                    <div className="scn-tabs" role="tablist">
                        {OA_SCENARIOS.map((s, i) => (
                            <button
                                key={s.time}
                                type="button"
                                className={`scn-tab${i === active ? " active" : ""}`}
                                role="tab"
                                aria-selected={i === active}
                                onClick={() => selectTab(i)}
                            >
                                <span className="scn-time mono">{s.time}</span>
                                <span className="scn-role">{s.role}</span>
                            </button>
                        ))}
                    </div>

                    <div className="scn-stage">
                        <div className="scn-panel active" key={active}>
                            <ScenarioCard scenario={OA_SCENARIOS[active]} />
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
