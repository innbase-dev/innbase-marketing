import Reveal from "@/components/Reveal";
import FlowTimeline from "@/components/about/FlowTimeline";
import { FLOW_STEPS } from "@/data/aboutData";

export default function WhyExistsSection() {
    return (
        <section className="sec" id="why">
            <div className="dot-grain" />
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Why Innbase exists</span>
                    <h2 className="sec-h2">
                        Hotels don&apos;t have an information problem. They have
                        a connection problem.
                    </h2>
                    <p className="sec-sub">
                        A hotel generates information constantly. A guest checks
                        in. A room gets occupied. A meal is ordered. A bottle is
                        sold. A payment lands. A cashier closes a shift. Stock
                        moves. A supplier delivers. Money enters the bank.
                    </p>
                    <p className="sec-sub">
                        Individually, none of that is complicated. But it
                        happens across different people, different shifts, and
                        different systems — and by the time an owner asks
                        &quot;what actually happened today?&quot;, it&apos;s
                        already scattered.
                    </p>
                </Reveal>

                <FlowTimeline steps={FLOW_STEPS} />

                <Reveal as="p" className="connect-line reveal">
                    Innbase exists to connect that story — so when a number
                    doesn&apos;t add up,{" "}
                    <b>
                        you don&apos;t have to reconstruct what happened from
                        memory.
                    </b>{" "}
                    The system already knows.
                </Reveal>
            </div>
        </section>
    );
}
