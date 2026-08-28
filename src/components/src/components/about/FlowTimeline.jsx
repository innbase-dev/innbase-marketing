import Reveal from "@/components/Reveal";

export default function FlowTimeline({ steps }) {
    return (
        <Reveal className="flow-timeline reveal" aria-label="How a stay moves through Innbase">
            <div className="flow-timeline-line" aria-hidden="true">
                <div className="flow-timeline-line-fill" />
            </div>
            <ol className="flow-timeline-track">
                {steps.map((step, i) => {
                    const isEdge = i === 0 || i === steps.length - 1;
                    return (
                        <li
                            className={`flow-node${isEdge ? " is-edge" : ""}`}
                            key={step}
                        >
                            <span className="flow-node-dot">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="flow-node-label">{step}</span>
                        </li>
                    );
                })}
            </ol>
        </Reveal>
    );
}
