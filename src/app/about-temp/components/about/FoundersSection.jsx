import Reveal from "@/components/Reveal";
import { FOUNDERS } from "@/data/aboutData";

export default function FoundersSection() {
    return (
        <section className="sec" id="founders">
            <div className="dot-grain" />
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Who&apos;s building it</span>
                    <h2 className="sec-h2">
                        Two people, two disciplines, one product.
                    </h2>
                    <p className="sec-sub">
                        Innbase isn&apos;t a faceless software company.
                        It&apos;s built by two founders who split the work along
                        product and engineering, and agree on almost everything
                        else.
                    </p>
                </Reveal>

                <Reveal className="fq-list reveal-stag reveal">
                    {FOUNDERS.map((f) => (
                        <div className="fq-card" key={f.name}>
                            <span
                                className="fq-avatar"
                                style={{ background: f.color }}
                            >
                                {f.initials}
                            </span>
                            <div className="fq-body">
                                <p className="fq-quote">{f.quote}</p>
                                <div className="fq-name">{f.name}</div>
                                <div className="fq-role">
                                    Founder &amp; {f.role} of Innbase
                                </div>
                                <div className="fq-sign">
                                    {f.name.split(" ")[0]}
                                </div>
                                <span className="founder-placeholder-tag">
                                    Quote &amp; signature — pending approval
                                </span>
                            </div>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
