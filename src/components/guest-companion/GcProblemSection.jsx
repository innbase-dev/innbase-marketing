import { Fragment } from "react";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { GC_PROBLEM_FLOW } from "@/data/guestCompanionData";

// Plain DOM siblings (Fragment, not a wrapping span) so that
// `.flow-block.with .flow-chip:last-child` in globals.css — which highlights
// the final "after" step — matches against .flow-row's real last child.
function FlowRow({ steps }) {
    return (
        <div className="flow-row">
            {steps.map((step, i) => (
                <Fragment key={step}>
                    <span className="flow-chip">
                        <span className="d" />
                        {step}
                    </span>
                    {i < steps.length - 1 && (
                        <span className="flow-arrow">
                            <Icon name="arrow-right" className="icon" />
                        </span>
                    )}
                </Fragment>
            ))}
        </div>
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

                <Reveal className="problem-compare reveal">
                    <div className="flow-block now">
                        <div className="flow-block-label now">Today</div>
                        <FlowRow steps={GC_PROBLEM_FLOW.before} />
                    </div>
                    <div className="divider" />
                    <div className="flow-block with">
                        <div className="flow-block-label with">With Guest Companion</div>
                        <FlowRow steps={GC_PROBLEM_FLOW.after} />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
