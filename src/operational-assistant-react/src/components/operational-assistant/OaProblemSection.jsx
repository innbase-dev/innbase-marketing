import { Fragment } from "react";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { OA_PROBLEM_FLOW } from "@/data/operationalAssistantData";

function FlowRow({ steps }) {
    return (
        <div className="flow-row">
            {steps.map((step, i) => (
                <Fragment key={step}>
                    {i > 0 && (
                        <span className="flow-arrow">
                            <Icon name="arrow-right" className="icon" />
                        </span>
                    )}
                    <span className="flow-chip">
                        <span className="d" />
                        {step}
                    </span>
                </Fragment>
            ))}
        </div>
    );
}

export default function OaProblemSection() {
    return (
        <section className="sec" id="problem">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">The problem today</span>
                    <h2 className="sec-h2">
                        Your staff already know what&apos;s wrong. Writing it down twice is the problem.
                    </h2>
                    <p className="sec-sub">
                        A guest mentions a broken AC. It gets scribbled on paper, remembered until the end of a
                        shift, then typed into the system later — if at all. By the time anyone looks, the
                        details are fuzzy and the task is half-forgotten.
                    </p>
                </Reveal>

                <Reveal className="problem-compare reveal">
                    <div className="flow-block now">
                        <div className="flow-block-label now">How it usually happens</div>
                        <FlowRow steps={OA_PROBLEM_FLOW.before} />
                    </div>
                    <div className="divider" />
                    <div className="flow-block with">
                        <div className="flow-block-label with">With the Operational Assistant</div>
                        <FlowRow steps={OA_PROBLEM_FLOW.after} />
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
