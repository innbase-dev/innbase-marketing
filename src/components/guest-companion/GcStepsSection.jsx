import { Fragment } from "react";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { GC_CONTEXTS, GC_STEPS } from "@/data/guestCompanionData";

export default function GcStepsSection() {
    return (
        <section className="sec" id="steps">
            <div className="wrap">
                <Reveal className="sec-head center reveal" style={{ maxWidth: 640 }}>
                    <span className="sec-eyebrow">How it feels for the guest</span>
                    <h2 className="sec-h2">From scan to service in seconds.</h2>
                    <p className="sec-sub center">
                        No calling around, no app to install, no waiting to find the right number.
                    </p>
                </Reveal>

                <Reveal className="gc-steps-row reveal-stag reveal">
                    {GC_STEPS.map((s, i) => (
                        <Fragment key={s.n}>
                            <div className="gc-step">
                                <span className="gc-step-num">{s.n}</span>
                                <h3>{s.title}</h3>
                                <p>{s.body}</p>
                            </div>
                            {i < GC_STEPS.length - 1 && (
                                <span className="gc-step-arrow">
                                    <Icon name="arrow-right" className="icon" />
                                </span>
                            )}
                        </Fragment>
                    ))}
                </Reveal>

                <Reveal className="reveal" style={{ marginTop: 52 }}>
                    <span className="sec-eyebrow" style={{ display: "block", marginBottom: 16 }}>
                        Not just a room product
                    </span>
                    <div className="gc-context-row">
                        {GC_CONTEXTS.map((c) => (
                            <span className="flow-chip" key={c.label}>
                                <Icon name={c.icon} className="icon" style={{ width: 14, height: 14 }} />
                                {c.label}
                            </span>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
