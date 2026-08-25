import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { PRINCIPLES } from "@/data/aboutData";

function ToggleGlyph() {
    return (
        <svg viewBox="0 0 14 14" width="14" height="14" aria-hidden="true">
            <path
                d="M7 1v12M1 7h12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
            />
        </svg>
    );
}

export default function PhilosophySection() {
    return (
        <section className="sec sec-alt" id="philosophy">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">
                        What we believe about software
                    </span>
                    <h2 className="sec-h2">
                        A few convictions we don&apos;t compromise on.
                    </h2>
                    <p className="sec-sub">
                        These aren&apos;t values on a wall. They&apos;re
                        decisions we make every time we sit down to build
                        something. Open each one for the reasoning.
                    </p>
                </Reveal>

                <Reveal className="faq-list principle-list reveal-stag reveal">
                    {PRINCIPLES.map((p, i) => (
                        <details
                            className="faq-item"
                            key={p.title}
                            open={i === 0}
                        >
                            <summary>
                                <span className="principle-summary-left">
                                    <span className="p-ico p-ico--sm">
                                        <Icon name={p.icon} className="icon" />
                                    </span>
                                    <span>{p.title}</span>
                                </span>
                                <span className="faq-ic">
                                    <ToggleGlyph />
                                </span>
                            </summary>
                            <div className="faq-body">{p.body}</div>
                        </details>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
