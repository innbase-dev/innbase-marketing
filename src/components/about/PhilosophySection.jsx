import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { PRINCIPLES } from "@/data/aboutData";

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
                        something.
                    </p>
                </Reveal>

                <Reveal className="philosophy-grid reveal-stag reveal">
                    {PRINCIPLES.map((p) => (
                        <div className="principle-card" key={p.title}>
                            <span className="p-ico">
                                <Icon name={p.icon} className="icon" />
                            </span>
                            <h3>{p.title}</h3>
                            <p>{p.body}</p>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
