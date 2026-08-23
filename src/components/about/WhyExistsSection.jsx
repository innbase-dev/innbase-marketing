import Reveal from "@/components/Reveal";
import Timeline from "@/components/about/Timeline";
import { aboutFlowSteps } from "@/utils/data";

export default function WhyExistsSection() {
    return (
        <section className="py-28 relative bg-ink" id="why">
            <div className="wrap">
                <Reveal className="sec-head">
                    <span className="sec-eyebrow">Why Innbase exists</span>
                    <h2 className="sec-h2">
                        Hotels don&apos;t have an information problem. They have a connection problem.
                    </h2>
                    <p className="sec-sub">
                        A hotel generates information constantly. A guest checks in. A room gets occupied. A
                        meal is ordered. A bottle is sold. A payment lands. A cashier closes a shift. Stock
                        moves. A supplier delivers. Money enters the bank.
                    </p>
                    <p className="sec-sub">
                        Individually, none of that is complicated. But it happens across different people,
                        different shifts, and different systems — and by the time an owner asks &quot;what
                        actually happened today?&quot;, it&apos;s already scattered.
                    </p>
                </Reveal>

                <Timeline steps={aboutFlowSteps} />

                <Reveal as="p" className="mt-14 text-[19px] font-semibold tracking-[-0.01em] leading-[1.55] text-text-dark max-w-[640px]">
                    Innbase exists to connect that story — so when a number doesn&apos;t add up,{" "}
                    <b className="font-bold text-teal-bright">
                        you don&apos;t have to reconstruct what happened from memory.
                    </b>{" "}
                    The system already knows.
                </Reveal>
            </div>
        </section>
    );
}
