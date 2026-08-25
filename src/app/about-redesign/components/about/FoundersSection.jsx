import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import QuoteMark from "@/components/about/QuoteMark";
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

                <Reveal className="founder-grid reveal-stag reveal">
                    {FOUNDERS.map((f) => (
                        <article className="fdr-card" key={f.name}>
                            <div
                                className="fdr-visual"
                                style={{
                                    "--fdr-color": f.color,
                                }}
                            >
                                <span className="fdr-visual-glow" />
                                <span className="fdr-visual-initials">
                                    {f.initials}
                                </span>
                                <span className="fdr-visual-tag">
                                    <Icon
                                        name="pencil-line"
                                        className="icon"
                                        style={{ width: 11, height: 11 }}
                                    />
                                    Photo — to be added
                                </span>
                            </div>

                            <div className="fdr-body">
                                <div className="fdr-name">{f.name}</div>
                                <div className="fdr-role">{f.role}</div>
                                <p className="fdr-focus">
                                    <b>{f.focusLabel}</b>
                                    {f.focus}
                                </p>

                                <div className="fdr-quote-block">
                                    <QuoteMark className="fdr-quote-mark" />
                                    <p className="fdr-quote">{f.quote}</p>
                                    <span className="founder-placeholder-tag">
                                        Placeholder — pending approval
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
