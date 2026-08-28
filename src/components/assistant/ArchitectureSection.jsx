import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

function FlowBox({ icon, label, isActive }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', flex: 1, padding: '24px', background: isActive ? 'var(--ink-soft)' : 'var(--bg-base)', border: '1px solid', borderColor: isActive ? 'var(--brand-brass)' : 'var(--ink-line)', borderRadius: '16px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: isActive ? 'rgba(201, 147, 46, 0.1)' : 'var(--ink-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={icon} className="icon" style={{ color: isActive ? 'var(--brand-brass)' : 'var(--fg-sub)' }} />
            </div>
            <div style={{ fontSize: '14px', fontWeight: 600, color: isActive ? 'var(--brand-brass)' : 'var(--fg-base)', textAlign: 'center' }}>
                {label}
            </div>
        </div>
    );
}

function FlowArrow() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-line)', padding: '0 8px' }}>
            <Icon name="arrow-right" className="icon" />
        </div>
    );
}

export default function ArchitectureSection() {
    return (
        <section className="sec" id="architecture" style={{ padding: '100px 0' }}>
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Trust & Control</span>
                    <h2 className="sec-h2">
                        It knows what each staff member is allowed to do.
                    </h2>
                    <p className="sec-sub">
                        The assistant isn't an unrestricted AI with access to everything. It is bound by the exact same authorization rules as the human using it. The assistant works <strong>within the employee's authority</strong>.
                    </p>
                </Reveal>

                {/* Secure Flow Diagram */}
                <Reveal className="reveal" delay={0.2} style={{ marginTop: '64px' }}>
                    <div style={{ background: 'var(--ink-lighter)', border: '1px solid var(--ink-line)', borderRadius: '24px', padding: '48px 32px', overflowX: 'auto' }}>
                        
                        <div style={{ minWidth: '700px', display: 'flex', alignItems: 'stretch' }}>
                            <FlowBox icon="chat" label="Natural Language" isActive={false} />
                            <FlowArrow />
                            <FlowBox icon="lock-closed" label="Authorization Check" isActive={true} />
                            <FlowArrow />
                            <FlowBox icon="cog" label="Domain Workflow" isActive={false} />
                            <FlowArrow />
                            <FlowBox icon="document-text" label="Recorded Action" isActive={false} />
                        </div>

                    </div>
                </Reveal>

                {/* Explanation text */}
                <Reveal className="reveal-stag reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px', marginTop: '48px' }}>
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--fg-base)', marginBottom: '8px' }}>Front Desk</h4>
                        <p style={{ color: 'var(--fg-sub)', fontSize: '15px', lineHeight: 1.5 }}>Can ask Innbase to retrieve guest information, check room statuses, or create operational tasks.</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--fg-base)', marginBottom: '8px' }}>Managers</h4>
                        <p style={{ color: 'var(--fg-sub)', fontSize: '15px', lineHeight: 1.5 }}>Can perform additional actions like overriding rates or viewing financial summaries.</p>
                    </div>
                    <div>
                        <h4 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--fg-base)', marginBottom: '8px' }}>Accountability</h4>
                        <p style={{ color: 'var(--fg-sub)', fontSize: '15px', lineHeight: 1.5 }}>Every action taken by the assistant is recorded in the system logs under the initiating user's name.</p>
                    </div>
                </Reveal>

            </div>
        </section>
    );
}
