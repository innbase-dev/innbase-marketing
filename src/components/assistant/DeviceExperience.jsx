import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";

function DeviceCard({ icon, label }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: 80, height: 80, borderRadius: '24px', background: 'var(--ink-soft)', border: '1px solid var(--ink-line)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={icon} className="icon" style={{ width: 32, height: 32, color: 'var(--fg-base)' }} />
            </div>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--fg-sub)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {label}
            </span>
        </div>
    );
}

export default function DeviceExperience() {
    return (
        <section className="sec" id="device" style={{ padding: '100px 0', background: 'var(--bg-base)' }}>
            <div className="wrap" style={{ textAlign: 'center' }}>
                <Reveal className="sec-head reveal" style={{ margin: '0 auto', maxWidth: 640 }}>
                    <h2 className="sec-h2">
                        One hello away from getting things done.
                    </h2>
                    <p className="sec-sub">
                        Whether your staff are at the front desk, moving through the hotel, or checking something on the go, the Operational Assistant is designed to be available where the work happens.
                    </p>
                </Reveal>

                <Reveal delay={0.2} style={{ marginTop: '80px', display: 'flex', justifyContent: 'center', gap: '64px', flexWrap: 'wrap' }}>
                    <DeviceCard icon="desktop-computer" label="Desktop" />
                    <DeviceCard icon="device-mobile" label="Phone" />
                    <DeviceCard icon="microphone" label="Voice" />
                </Reveal>
                
                <Reveal delay={0.4}>
                    <div style={{ marginTop: '48px', fontSize: '15px', color: 'var(--brand-brass)', fontWeight: 500, fontStyle: 'italic' }}>
                        Where your staff already work.
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
