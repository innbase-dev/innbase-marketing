import Icon from "../Icon";
import Reveal from "../Reveal";

/**
 * Option C — "stays within your rules".
 * Deliberately reuses the site's existing .role-grid / .role-card pattern
 * (same one RolesSection.jsx uses on the homepage) rather than introducing
 * a near-duplicate grid, so it stays visually consistent with the rest of
 * the product and needs no new CSS of its own.
 */
const RULES = [
    {
        icon: "phone",
        title: "Front desk",
        fix: "Can ask Innbase to log requests, create tasks, and check guest or room information.",
    },
    {
        icon: "clipboard-list",
        title: "Housekeeping & maintenance",
        fix: "Can ask what needs attention right now, and update the status of their own tasks.",
    },
    {
        icon: "shield-check",
        title: "Manager",
        fix: "Can ask for summaries across departments, and reassign or escalate tasks.",
    },
    {
        icon: "building-2",
        title: "Owner",
        fix: "Can ask what's happening across the whole hotel — from the front desk or from home.",
    },
];

export default function RulesSection() {
    return (
        <section className="sec" id="rules-section">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">
                        Stays within your rules
                    </span>
                    <h2 className="sec-h2">
                        It only does what your staff are already allowed to
                        do.
                    </h2>
                    <p className="sec-sub">
                        The Assistant isn&apos;t a separate, all-powerful
                        system sitting on top of Innbase. It works through
                        the same permissions every staff member already has
                        — so a front-desk request can&apos;t quietly turn
                        into a manager-level action.
                    </p>
                </Reveal>

                <Reveal className="role-grid reveal-stag reveal">
                    {RULES.map((r) => (
                        <div className="role-card" key={r.title}>
                            <span className="r-ico">
                                <Icon name={r.icon} className="icon" />
                            </span>
                            <h4>{r.title}</h4>
                            <div className="r-fix">{r.fix}</div>
                        </div>
                    ))}
                </Reveal>

                <Reveal as="p" className="role-close reveal">
                    Your team stays in control.{" "}
                    <b>Innbase takes care of the busywork underneath it.</b>
                </Reveal>
            </div>
        </section>
    );
}
