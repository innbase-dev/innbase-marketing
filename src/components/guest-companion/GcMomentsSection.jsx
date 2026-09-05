import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { GC_MOMENT_CARDS } from "@/data/guestCompanionData";

export default function GcMomentsSection() {
    return (
        <section className="sec sec-alt" id="moments">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Every guest moment, one place</span>
                    <h2 className="sec-h2">Whatever your guest needs, there&apos;s a simpler way to ask.</h2>
                    <p className="sec-sub">
                        One guest companion. Many hotel moments — not six separate products stitched together.
                    </p>
                </Reveal>

                <Reveal className="problem-grid reveal-stag reveal">
                    {GC_MOMENT_CARDS.map((c) => (
                        <div className="problem-card" key={c.title}>
                            <span className="p-ico">
                                <Icon name={c.icon} className="icon" />
                            </span>
                            <h3>{c.title}</h3>
                            <p>{c.body}</p>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
