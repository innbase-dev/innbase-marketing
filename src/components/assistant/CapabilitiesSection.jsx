import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

function CapabilityCard({ icon, title, description, example }) {
    return (
        <div style={{ background: 'var(--ink-soft)', border: '1px solid var(--ink-line)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '16px', background: 'var(--ink-lighter)', border: '1px solid var(--ink-line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={icon} className="icon" style={{ color: 'var(--brand-brass)' }} />
            </div>
            <div>
                <h3 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--fg-base)', marginBottom: '8px' }}>{title}</h3>
                <p style={{ color: 'var(--fg-sub)', lineHeight: 1.5 }}>{description}</p>
            </div>
            <div style={{ marginTop: 'auto', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--ink-line)', borderRadius: '12px', padding: '16px', borderLeft: '3px solid var(--brand-brass)' }}>
                <div style={{ fontSize: '13px', color: 'var(--fg-dim)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Example</div>
                <div style={{ fontStyle: 'italic', color: 'var(--fg-base)', fontSize: '15px' }}>"{example}"</div>
            </div>
        </div>
    );
}

export default function CapabilitiesSection() {
    return (
        <section className="sec" id="capabilities" style={{ padding: '100px 0' }}>
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">What it does</span>
                    <h2 className="sec-h2">
                        Not a chatbot.<br />An operational teammate.
                    </h2>
                    <p className="sec-sub">
                        Innbase's Operational Assistant isn't here to have conversations for the sake of conversation. It is connected directly to the operational capabilities of your hotel, allowing staff to ask questions, retrieve information, and initiate authorized work without navigating through multiple screens.
                    </p>
                </Reveal>

                <Reveal className="reveal-stag reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px', marginTop: '64px' }}>
                    <CapabilityCard 
                        icon="chat-alt-2" 
                        title="Understand" 
                        description="It understands ordinary hotel language, slang, and context without needing strict commands."
                        example="The guest in 302 says the shower isn't working." 
                    />
                    <CapabilityCard 
                        icon="lightning-bolt" 
                        title="Act" 
                        description="It can turn natural language requests into real operational actions and system updates."
                        example="Creates a high-priority maintenance issue for Room 302." 
                    />
                    <CapabilityCard 
                        icon="search" 
                        title="Assist" 
                        description="It can instantly retrieve complex operational information and help staff understand what's happening."
                        example="Which rooms currently have open maintenance issues?" 
                    />
                </Reveal>
            </div>
        </section>
    );
}
