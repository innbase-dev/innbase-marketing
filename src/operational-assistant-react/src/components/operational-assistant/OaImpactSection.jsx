import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { OA_IMPACT_CARDS } from "@/data/operationalAssistantData";

export default function OaImpactSection() {
    return (
        <section className="sec" id="impact">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Why it matters</span>
                    <h2 className="sec-h2">The point isn&apos;t the AI. It&apos;s the time it gives back.</h2>
                </Reveal>

                {/* Reuses .problem-card/.p-ico (from ProblemSection) inside a new
                    4-column .card-grid, rather than inventing a parallel card style. */}
                <Reveal className="card-grid reveal-stag reveal">
                    {OA_IMPACT_CARDS.map((c) => (
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
