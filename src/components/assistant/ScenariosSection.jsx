import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

const SCENARIOS = [
    {
        icon: "desktop-computer",
        department: "Front Desk",
        title: "Guest Requests",
        description: "Log extra towels, late checkouts, and wake-up calls without ever leaving the reservation screen.",
    },
    {
        icon: "wrench",
        department: "Maintenance",
        title: "Issue Tracking",
        description: "Report broken ACs or leaking taps in seconds. The assistant routes it to the right technician instantly.",
    },
    {
        icon: "clipboard-list",
        department: "Housekeeping",
        title: "Room Status",
        description: "Ask the assistant which rooms are ready for inspection instead of hunting down a printed list.",
    },
    {
        icon: "chart-bar",
        department: "Management",
        title: "Operational Visibility",
        description: "Get an instant summary of outstanding tasks, VIP arrivals, and shift handovers before stepping into a meeting.",
    }
];

export default function ScenariosSection() {
    return (
        <section className="sec" id="scenarios" style={{ padding: '100px 0', background: 'var(--ink-lighter)' }}>
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Real Scenarios</span>
                    <h2 className="sec-h2">
                        Built for every department.
                    </h2>
                    <p className="sec-sub">
                        The Operational Assistant isn't a siloed tool. It integrates across the entire hotel, helping every team member work faster in their own context.
                    </p>
                </Reveal>

                <Reveal className="reveal-stag reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginTop: '64px' }}>
                    {SCENARIOS.map((scenario) => (
                        <div key={scenario.department} style={{ background: 'var(--bg-base)', border: '1px solid var(--ink-line)', borderRadius: '24px', padding: '32px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                                <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'var(--ink-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon name={scenario.icon} className="icon" style={{ color: 'var(--fg-base)' }} />
                                </div>
                                <div style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-brass)', fontWeight: 600 }}>
                                    {scenario.department}
                                </div>
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--fg-base)', marginBottom: '12px' }}>{scenario.title}</h3>
                            <p style={{ color: 'var(--fg-sub)', lineHeight: 1.5 }}>{scenario.description}</p>
                        </div>
                    ))}
                </Reveal>
            </div>
        </section>
    );
}
