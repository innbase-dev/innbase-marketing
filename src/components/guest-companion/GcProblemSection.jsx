import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { GC_PROBLEM_FLOW } from "@/data/guestCompanionData";

// Vertical step timeline — replaces the horizontal chip+arrow row with a
// connected line of numbered steps so each column reads as a short story
// rather than a tag list. The last step of the "after" column is the
// resolution, so it gets the highlighted treatment.
function FlowTimeline({ steps, variant }) {
    return (
        <ol className="flow-steps">
            {steps.map((step, i) => {
                const isLast = i === steps.length - 1;
                const isOutcome = variant === "with" && isLast;
                return (
                    <li
                        className={`flow-step${isOutcome ? " is-outcome" : ""}`}
                        key={step}
                    >
                        <span className="flow-step-rail">
                            <span className="flow-step-dot">
                                {isOutcome ? (
                                    <Icon name="check" className="icon" />
                                ) : (
                                    i + 1
                                )}
                            </span>
                            {!isLast && <span className="flow-step-line" />}
                        </span>
                        <span className="flow-step-text">{step}</span>
                    </li>
                );
            })}
        </ol>
    );
}

export default function GcProblemSection() {
    return (
        <section className="sec sec-alt" id="problem">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow danger">
                        <span className="dot" />
                        The problem today
                    </span>
                    <h2 className="sec-h2">
                        Your guests shouldn&apos;t have to hunt for a phone number.
                    </h2>
                    <p className="sec-sub">
                        A guest wants a bottle of water. Today that means finding the reception number, calling,
                        explaining the room, and waiting for someone to write it down and pass it along — or asking
                        if there&apos;s even an intercom in the room at all.
                    </p>
                </Reveal>

                <Reveal className="problem-compare-v2 reveal">
                    <div className="flow-card now">
                        <div className="flow-card-head">
                            <span className="flow-card-badge now">
                                <span className="flow-card-dot" />
                                Today
                            </span>
                        </div>
                        <FlowTimeline steps={GC_PROBLEM_FLOW.before} variant="now" />
                    </div>

                    <div className="problem-compare-divider">
                        <span className="problem-compare-divider-line" />
                        <span className="problem-compare-divider-arrow">
                            <Icon name="arrow-right" className="icon" />
                        </span>
                        <span className="problem-compare-divider-line" />
                    </div>

                    <div className="flow-card with">
                        <div className="flow-card-head">
                            <span className="flow-card-badge with">
                                <span className="flow-card-dot" />
                                With Guest Companion
                            </span>
                        </div>
                        <FlowTimeline steps={GC_PROBLEM_FLOW.after} variant="with" />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}