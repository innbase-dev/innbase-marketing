import Reveal from "@/components/Reveal";
import MissionBanner from "@/components/about/MissionBanner";
import { FLOW_STEPS, PRINCIPLES, MANIFESTO_LINES } from "@/data/aboutData";

// Only 3 of the 5 manifesto lines fit the banner without diluting it —
// the rest still live nowhere else on this page. That's the trade-off
// of folding the old standalone manifesto carousel into this banner.
const BANNER_LINES = [MANIFESTO_LINES[1], MANIFESTO_LINES[3], MANIFESTO_LINES[4]];

export default function WhyExistsSection() {
    return (
        <section className="sec" id="why">
            <div className="wrap about-wrap">
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

                <Reveal className="mission-stat-grid reveal-stag reveal">
                    <div className="m-stat">
                        <div className="sv mono">2</div>
                        <div className="sl">Founders behind every decision</div>
                    </div>
                    <div className="m-stat">
                        <div className="sv mono">{FLOW_STEPS.length}</div>
                        <div className="sl">
                            Touchpoints tracked in one guest stay
                        </div>
                    </div>
                    <div className="m-stat">
                        <div className="sv mono">{PRINCIPLES.length}</div>
                        <div className="sl">
                            Convictions we don&apos;t compromise on
                        </div>
                    </div>
                    <div className="m-stat">
                        <div className="sv mono">1</div>
                        <div className="sl">Country we call home, for now</div>
                    </div>
                </Reveal>

                <MissionBanner lines={BANNER_LINES} />
            </div>
        </section>
    );
}
