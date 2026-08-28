"use client";

import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import Link from "next/link";

export default function AssistantCta() {
    return (
        <section className="sec" id="cta" style={{ padding: '120px 0', background: 'var(--ink-base)', borderTop: '1px solid var(--ink-line)' }}>
            <div className="wrap" style={{ textAlign: 'center' }}>
                <Reveal className="sec-head reveal" style={{ margin: '0 auto', maxWidth: 800 }}>
                    <Icon name="sparkles" className="icon" style={{ width: 48, height: 48, color: 'var(--brand-brass)', margin: '0 auto 24px auto' }} />
                    <h2 className="sec-h2" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
                        Give your team an extra pair of hands.
                    </h2>
                    <p className="sec-sub" style={{ fontSize: '1.25rem', marginTop: '24px', marginBottom: '48px', color: 'var(--fg-sub)' }}>
                        See how Innbase's Operational Assistant can take routine operational work off your staff and help your hotel move faster.
                    </p>
                    
                    <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--brand-brass)', color: '#fff', padding: '16px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.2s ease, opacity 0.2s ease' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                        Bring Innbase to your hotel
                        <Icon name="arrow-right" className="icon" style={{ width: 18, height: 18 }} />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
