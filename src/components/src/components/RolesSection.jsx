import Icon from "./Icon";
import Reveal from "./Reveal";

const ROLES = [
    {
        icon: "briefcase",
        title: "Owner",
        pain: '"I only find problems at month-end."',
        fix: "See variance, cash position, and staffing the moment they happen — not four weeks later.",
    },
    {
        icon: "clipboard-list",
        title: "Manager",
        pain: '"Closing out a shift takes an hour."',
        fix: "Innbase reconciles sales, cash, and stock while the shift is still happening.",
    },
    {
        icon: "door-open",
        title: "Front desk",
        pain: '"I never know a guest\'s full balance."',
        fix: "One profile shows the tab, the room charge, and the outstanding amount together.",
    },
    {
        icon: "martini",
        title: "Bartender",
        pain: '"I\'m blamed for stock loss."',
        fix: "Every item sold is logged against a sale, so the count defends you, not accuses you.",
    },
];

export default function RolesSection() {
    return (
        <section className="sec" id="roles">
            <div className="dot-grain" />
            <div
                className="sec-blob"
                style={{
                    width: 480,
                    height: 400,
                    background:
                        "radial-gradient(circle,#5b6cf0 0%,transparent 70%)",
                    opacity: ".1",
                    top: "-80px",
                    right: "-120px",
                }}
            />
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">
                        Whoever&apos;s on shift tonight
                    </span>
                    <h2 className="sec-h2">
                        Built for the whole team, not just the owner.
                    </h2>
                </Reveal>
                <Reveal className="role-grid reveal-stag reveal">
                    {ROLES.map((r) => (
                        <div className="role-card" key={r.title}>
                            <span className="r-ico">
                                <Icon name={r.icon} className="icon" />
                            </span>
                            <h4>{r.title}</h4>
                            <div className="r-pain">{r.pain}</div>
                            <div className="r-fix">{r.fix}</div>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
