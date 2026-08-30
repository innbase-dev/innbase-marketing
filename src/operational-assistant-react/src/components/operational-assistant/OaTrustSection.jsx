import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { OA_ROLE_CARDS } from "@/data/operationalAssistantData";

export default function OaTrustSection() {
    return (
        <section className="sec" id="trust">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Stays within your rules</span>
                    <h2 className="sec-h2">It only does what your staff are already allowed to do.</h2>
                    <p className="sec-sub">
                        The Assistant isn&apos;t a separate, all-powerful system sitting on top of Innbase. It
                        works through the same permissions every staff member already has — so a front-desk
                        request can&apos;t quietly turn into a manager-level action.
                    </p>
                </Reveal>

                <Reveal className="role-grid reveal-stag reveal">
                    {OA_ROLE_CARDS.map((c) => (
                        <div className="role-card" key={c.title}>
                            <span className="r-ico">
                                <Icon name={c.icon} className="icon" />
                            </span>
                            <h4>{c.title}</h4>
                            <div className="r-fix">{c.fix}</div>
                        </div>
                    ))}
                </Reveal>

                <Reveal as="p" className="role-close reveal">
                    Your team stays in control. <b>Innbase takes care of the operational busywork.</b>
                </Reveal>
            </div>
        </section>
    );
}
