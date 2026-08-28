import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

const IMPACTS = [
    {
        title: "Less administrative work",
        description: "Staff spend significantly less time entering, searching and updating information.",
    },
    {
        title: "Faster response times",
        description: "Operational requests become actions immediately, instead of sitting as tasks waiting for someone to remember them.",
    },
    {
        title: "Consistent operations",
        description: "Information and actions are recorded securely in the system rather than disappearing into conversations, notebooks and WhatsApp groups.",
    }
];

export default function ImpactSection() {
    return (
        <section className="sec" id="impact" style={{ padding: '120px 0', borderTop: '1px solid var(--ink-line)' }}>
            <div className="wrap">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                    
                    {/* The core outcomes */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '48px' }}>
                        {IMPACTS.map((impact, index) => (
                            <Reveal key={impact.title} delay={index * 0.1}>
                                <div style={{ borderLeft: '2px solid var(--brand-brass)', paddingLeft: '24px' }}>
                                    <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--fg-base)', marginBottom: '12px' }}>{impact.title}</h3>
                                    <p style={{ color: 'var(--fg-sub)', lineHeight: 1.5 }}>{impact.description}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>

                    {/* The ultimate payoff */}
                    <Reveal delay={0.4}>
                        <div style={{ background: 'var(--ink-soft)', border: '1px solid var(--ink-line)', borderRadius: '24px', padding: '64px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                            {/* Decorative background glow */}
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle at center, rgba(201, 147, 46, 0.1) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
                            
                            <Icon name="heart" className="icon" style={{ width: 40, height: 40, color: 'var(--brand-brass)', margin: '0 auto 24px auto' }} />
                            <h3 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: 'var(--fg-base)', lineHeight: 1.1, marginBottom: '24px' }}>
                                More time for guests.
                            </h3>
                            <p style={{ color: 'var(--fg-sub)', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
                                The ultimate benefit isn't "AI". It's ensuring your staff have more time to actually run the hotel and deliver exceptional hospitality.
                            </p>
                        </div>
                    </Reveal>

                </div>
            </div>
        </section>
    );
}
