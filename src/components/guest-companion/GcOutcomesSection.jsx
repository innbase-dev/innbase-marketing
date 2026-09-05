import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { GC_OUTCOMES } from "@/data/guestCompanionData";

export default function GcOutcomesSection() {
    return (
        <section className="sec" id="outcomes">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Why hotels add this</span>
                    <h2 className="sec-h2">Less friction for your guests. Less chasing for your staff.</h2>
                </Reveal>

                <Reveal className="gc-outcomes-grid reveal-stag reveal">
                    <div className="gc-outcome-col">
                        <span className="gc-outcome-head">
                            <span className="d" style={{ background: "var(--teal-bright)" }} />
                            Guest gets
                        </span>
                        {GC_OUTCOMES.guest.map((row) => (
                            <div className="gc-outcome-row" key={row}>
                                <Icon name="check" className="icon" style={{ color: "var(--teal-bright)" }} />
                                {row}
                            </div>
                        ))}
                    </div>
                    <div className="gc-outcome-col">
                        <span className="gc-outcome-head">
                            <span className="d" style={{ background: "var(--amber-bright)" }} />
                            Hotel gets
                        </span>
                        {GC_OUTCOMES.hotel.map((row) => (
                            <div className="gc-outcome-row" key={row}>
                                <Icon name="check" className="icon" style={{ color: "var(--amber-bright)" }} />
                                {row}
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
