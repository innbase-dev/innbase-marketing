import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

function FlowStep({ icon, title, subtitle, isActive }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '8px', opacity: isActive ? 1 : 0.6 }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: isActive ? 'var(--ink-line)' : 'var(--ink-soft)', border: '1px solid var(--ink-line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={icon} className="icon" style={{ color: isActive ? 'var(--brand-brass)' : 'var(--fg-sub)' }} />
            </div>
            <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--fg-base)' }}>{title}</div>
                {subtitle && <div style={{ fontSize: '13px', color: 'var(--fg-sub)' }}>{subtitle}</div>}
            </div>
        </div>
    );
}

function ArrowDown() {
    return (
        <div style={{ height: 24, width: 2, background: 'var(--ink-line)', margin: '4px auto' }}></div>
    );
}

export default function ProblemSection() {
    return (
        <section className="sec" id="problem" style={{ background: 'var(--ink-lighter)', padding: '100px 0', borderTop: '1px solid var(--ink-line)' }}>
            <div className="wrap">
                <Reveal className="sec-head reveal" style={{ maxWidth: 640 }}>
                    <span className="sec-eyebrow">The Problem</span>
                    <h2 className="sec-h2">
                        Your team shouldn't have to spend their day doing this.
                    </h2>
                    <p className="sec-sub">
                        Information gets lost between shifts because writing it down and updating systems takes too much time.
                    </p>
                </Reveal>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '64px' }}>
                    
                    {/* Before Column */}
                    <Reveal delay={0.1}>
                        <div style={{ background: 'var(--ink-soft)', border: '1px solid var(--ink-line)', borderRadius: '24px', padding: '40px', height: '100%' }}>
                            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--fg-sub)', fontWeight: 600, textAlign: 'center', marginBottom: '32px' }}>
                                Before
                            </div>
                            
                            <div style={{ background: 'var(--bg-base)', padding: '16px', borderRadius: '12px', border: '1px solid var(--ink-line)', textAlign: 'center', fontSize: '15px', fontStyle: 'italic', color: 'var(--fg-dim)', marginBottom: '32px' }}>
                                "Let me write that down..."
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <FlowStep icon="user" title="Staff member stops" />
                                <ArrowDown />
                                <FlowStep icon="book-open" title="Finds notebook" />
                                <ArrowDown />
                                <FlowStep icon="pencil" title="Writes it down" />
                                <ArrowDown />
                                <FlowStep icon="desktop-computer" title="Enters into system later" subtitle="If they remember" />
                            </div>
                        </div>
                    </Reveal>

                    {/* After Column */}
                    <Reveal delay={0.2}>
                        <div style={{ background: 'linear-gradient(180deg, var(--ink-soft) 0%, rgba(201, 147, 46, 0.05) 100%)', border: '1px solid var(--ink-line)', borderColor: 'rgba(201, 147, 46, 0.2)', borderRadius: '24px', padding: '40px', height: '100%', position: 'relative' }}>
                            
                            <div style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-brass)', fontWeight: 600, textAlign: 'center', marginBottom: '32px' }}>
                                With Innbase
                            </div>
                            
                            <div style={{ background: 'var(--brand-brass)', padding: '16px', borderRadius: '12px', textAlign: 'center', fontSize: '15px', fontWeight: 500, color: '#fff', marginBottom: '32px', boxShadow: '0 8px 24px -8px rgba(201, 147, 46, 0.4)' }}>
                                "Innbase, log this."
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <FlowStep icon="sparkles" title="Assistant understands" isActive={true} />
                                <ArrowDown />
                                <FlowStep icon="check-circle" title="Task created instantly" isActive={true} />
                                <ArrowDown />
                                <div style={{ height: 40 }}></div> {/* Spacer to show time saved */}
                                <FlowStep icon="fast-forward" title="Staff keeps moving" subtitle="No interruption" isActive={true} />
                            </div>
                        </div>
                    </Reveal>

                </div>
            </div>
        </section>
    );
}
