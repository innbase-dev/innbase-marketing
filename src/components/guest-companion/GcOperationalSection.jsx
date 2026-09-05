import Reveal from "@/components/Reveal";
import { GC_REQUEST_FLOW, GC_REQUEST_MOCK } from "@/data/guestCompanionData";

export default function GcOperationalSection() {
    return (
        <section className="sec sec-alt" id="operational">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Not just a QR menu</span>
                    <h2 className="sec-h2">A guest request shouldn&apos;t disappear into WhatsApp.</h2>
                    <p className="sec-sub">
                        The guest submits &quot;2 bottles of water to Room 204.&quot; The hotel doesn&apos;t just get
                        a notification — it becomes an operational event inside Innbase, from the moment it&apos;s
                        sent to the moment it&apos;s settled.
                    </p>
                </Reveal>

                <div className="gc-mock-wrap">
                    <Reveal className="reveal">
                        <span className="gc-mock-badge">{GC_REQUEST_MOCK.room} · New request</span>
                        <div className="how-mock">
                            <div className="how-mock-head">
                                <span className="how-mock-dot" style={{ background: "#f87171" }} />
                                <span className="how-mock-dot" style={{ background: "#fbbf24" }} />
                                <span className="how-mock-dot" style={{ background: "#2dd4bf" }} />
                            </div>
                            <div className="how-mock-body">
                                {GC_REQUEST_MOCK.lines.map((l) => (
                                    <div className="how-line" key={l.k}>
                                        <span>{l.k}</span>
                                        <span className="lv">{l.v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal className="reveal" style={{ transitionDelay: ".1s" }}>
                        <div className="gc-flow-list">
                            {GC_REQUEST_FLOW.map((step, i) => (
                                <div className="gc-flow-item" key={step}>
                                    <span className="fi-n">{i + 1}</span>
                                    {step}
                                </div>
                            ))}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
