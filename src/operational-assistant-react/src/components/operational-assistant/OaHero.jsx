import Image from "next/image";
import Icon from "@/components/Icon";
import { OA_MODULE_STRIP } from "@/data/operationalAssistantData";

export default function OaHero() {
    return (
        <>
            <header className="hero">
                <div className="hero-glow">
                    <div className="blob b1" />
                    <div className="blob b2" />
                    <div className="blob b3" />
                </div>
                <div className="hero-dots" />
                <div className="wrap hero-inner">
                    <div className="hero-content">
                        <span className="eyebrow reveal in">
                            <span className="dot" />
                            Innbase · AI Operational Assistant
                        </span>
                        <h1 className="reveal in" style={{ transitionDelay: ".05s" }}>
                            Give your team <em>one more pair of hands</em>.
                        </h1>
                        <p className="hero-sub reveal in" style={{ transitionDelay: ".14s" }}>
                            The Operational Assistant is the newest addition to your hotel staff. Your team
                            asks it for things in plain English — the way they&apos;d ask a colleague — and it
                            creates the task, logs the issue, or finds the answer, right where they&apos;re
                            already working.
                        </p>
                        <div className="hero-ctas reveal in" style={{ transitionDelay: ".22s" }}>
                            <a href="#scenarios" className="btn btn-brass">
                                See it in action
                            </a>
                            <a
                                href="mailto:hello@innbase.co?subject=Question%20about%20the%20Operational%20Assistant"
                                className="btn btn-ghost-dark"
                            >
                                Talk to the team
                            </a>
                        </div>
                        <div className="hero-note reveal in" style={{ transitionDelay: ".3s" }}>
                            <span className="live-dot" />
                            WORKS IN PLAIN ENGLISH · NO STAFF TRAINING NEEDED · INCLUDED ON EVERY PLAN
                        </div>
                    </div>

                    {/* Same frame as the homepage's HeroDashboard (.hero-visual > .hero-dash) —
                        here it holds a real product screenshot instead of the schematic SVG,
                        with the Assistant's take on that exact screen floating around it. */}
                    <div className="hero-visual reveal in" style={{ transitionDelay: ".36s" }}>
                        <div className="hero-scene">
                            <div className="hero-dash">
                                <Image
                                    src="/images/operational-assistant-bookings.png"
                                    alt="Innbase Bookings dashboard — Booking Health and Booking Stages, showing live occupancy and deposit status"
                                    width={1600}
                                    height={822}
                                    sizes="(max-width: 1024px) 100vw, 1180px"
                                    className="hero-shot-img"
                                    priority
                                />
                            </div>

                            <div className="float-card float-q reveal in" style={{ "--r": "-3deg" }}>
                                <div className="float-bob" style={{ animationDuration: "4.6s" }}>
                                    <div className="fc-head">
                                        <span className="fc-avatar">M</span>
                                        <span className="fc-name">Manager</span>
                                    </div>
                                    <p>Nudge the 3 bookings still waiting on a deposit?</p>
                                </div>
                            </div>

                            <div
                                className="float-card float-a reveal in"
                                style={{ "--r": "2.5deg", transitionDelay: ".15s" }}
                            >
                                <div className="float-bob" style={{ animationDuration: "5.2s", animationDelay: ".4s" }}>
                                    <div className="fc-head">
                                        <Icon name="sparkles" className="icon" />
                                        <span className="fc-name">Assistant</span>
                                    </div>
                                    <p>Done — reminders sent. I&apos;ll flag anyone who hasn&apos;t paid by check-in.</p>
                                </div>
                            </div>

                            <div
                                className="float-card float-toast reveal in"
                                style={{ "--r": "-6deg", transitionDelay: ".3s" }}
                            >
                                <div className="float-bob" style={{ animationDuration: "3.9s", animationDelay: ".6s" }}>
                                    <Icon name="check" className="icon" />
                                    <span>2 expiring holds extended by 2h</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="strip">
                <div className="wrap strip-row">
                    <span className="strip-label">Already built into the Innbase you use for</span>
                    <div className="strip-chips">
                        {OA_MODULE_STRIP.map((m) => (
                            <span className="strip-chip" key={m.label}>
                                <Icon name={m.icon} className="icon" />
                                {m.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
