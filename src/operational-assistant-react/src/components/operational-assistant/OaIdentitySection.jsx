import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { OA_IDENTITY_CARDS } from "@/data/operationalAssistantData";

export default function OaIdentitySection() {
    return (
        <section className="sec sec-alt" id="identity">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Not a chatbot</span>
                    <h2 className="sec-h2">
                        A teammate who gets things done — not a search box that talks back.
                    </h2>
                    <p className="sec-sub">
                        The Operational Assistant is connected to what&apos;s actually happening in your hotel.
                        It doesn&apos;t just answer questions — it can act on them, inside the same system your
                        staff already use.
                    </p>
                </Reveal>

                <Reveal className="how-grid-3 reveal-stag reveal">
                    {OA_IDENTITY_CARDS.map((card) => (
                        <div className="how-card" key={card.title}>
                            <span className="how-chip">
                                <Icon name={card.icon} className="icon" />
                            </span>
                            <h3>{card.title}</h3>
                            <p>{card.body}</p>
                            <div className="how-mock">
                                <div className="how-mock-head">
                                    <span className="how-mock-dot" style={{ background: "#f87171" }} />
                                    <span className="how-mock-dot" style={{ background: "#fbbf24" }} />
                                    <span className="how-mock-dot" style={{ background: "#2dd4bf" }} />
                                </div>
                                <div className="how-mock-body">
                                    {card.lines.map((line, i) => (
                                        <div className={`hm-line ${line.from}`} key={i}>
                                            {line.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
