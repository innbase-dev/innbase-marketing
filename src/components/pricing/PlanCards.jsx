"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import {
    PLANS,
    QUICK_PICK_NOTES,
    QUICK_PICK_TARGET,
} from "@/data/pricingPlans";

const BANDS = [
    { band: "1", label: "1-10" },
    { band: "2", label: "11-20" },
    { band: "3", label: "21-50" },
    { band: "4", label: "50+" },
];

export default function PlanCards() {
    const [activeBand, setActiveBand] = useState("1");
    const [isAnnual, setIsAnnual] = useState(true);
    const highlightPlan = QUICK_PICK_TARGET[activeBand];

    return (
        <section className="sec" id="plans">
            <div className="wrap">
                <Reveal className="sec-head reveal">
                    <span className="sec-eyebrow">Choose your plan</span>
                    <h2 className="sec-h2">
                        Three plans. One operating system.
                    </h2>
                    <p className="sec-sub">
                        Every plan runs the full platform. Larger plans add
                        capacity and guest-facing tools — never features held
                        back from smaller hotels.
                    </p>
                </Reveal>

                <Reveal className="qp-strip reveal">
                    <span className="qp-label">
                        How many staff do you have?
                    </span>
                    {BANDS.map((b) => (
                        <button
                            key={b.band}
                            className={`qp-chip${activeBand === b.band ? " on" : ""}`}
                            onClick={() => setActiveBand(b.band)}
                        >
                            {b.label}
                        </button>
                    ))}
                    <span className="qp-note">
                        {QUICK_PICK_NOTES[activeBand]}
                    </span>
                </Reveal>

                <Reveal className="billing-switch-container reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: 'var(--brand-brass)' }}>
                        <Icon name="sparkles" className="icon" style={{ width: 14, height: 14 }} />
                        Pay annually and get 2 months free
                    </span>
                    <div className="billing-switch" style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-sub)', padding: '4px', borderRadius: '24px', border: '1px solid var(--border-sub)' }}>
                        <button
                            onClick={() => setIsAnnual(false)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '20px',
                                border: 'none',
                                background: !isAnnual ? 'var(--fg-base)' : 'transparent',
                                color: !isAnnual ? 'var(--bg-base)' : 'var(--fg-sub)',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 600,
                                transition: 'all 0.2s'
                            }}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            style={{
                                padding: '8px 20px',
                                borderRadius: '20px',
                                border: 'none',
                                background: isAnnual ? 'var(--fg-base)' : 'transparent',
                                color: isAnnual ? 'var(--bg-base)' : 'var(--fg-sub)',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: 600,
                                transition: 'all 0.2s',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px'
                            }}
                        >
                            Annual
                            <span style={{
                                color: isAnnual ? 'var(--brand-brass)' : '#fff',
                                background: isAnnual ? 'rgba(0,0,0,0.15)' : 'var(--brand-brass)',
                                fontSize: '11px',
                                fontWeight: 700,
                                letterSpacing: '0.02em',
                                padding: '3px 8px',
                                borderRadius: '10px'
                            }}>
                                SAVE 2 MONTHS
                            </span>
                        </button>
                    </div>
                </Reveal>

                <Reveal className="plan-grid reveal-stag reveal">
                    {PLANS.map((p) => {
                        const numericPrice = parseInt(p.price.replace(/[^\d]/g, ""), 10);
                        const displayPrice = isAnnual
                            ? "₦" + (numericPrice * 10).toLocaleString()
                            : p.price;
                        const displayUnit = isAnnual ? "/year" : "/month";
                        const dailyPrice = isAnnual
                            ? `≈ ₦${Math.round((numericPrice * 10) / 365).toLocaleString()}/day`
                            : p.daily;

                        return (
                            <div
                                className={`plan-card${p.featured ? " featured" : ""}${highlightPlan === p.plan ? " qp-hi" : ""}`}
                                key={p.name}
                            >
                                {p.featured && (
                                    <span className="plan-badge">Most popular</span>
                                )}
                                <span className="plan-name">{p.name}</span>
                                <p className="plan-tagline">{p.tagline}</p>
                                <div className="plan-price-row">
                                    <span className="plan-price tnum">
                                        {displayPrice}
                                    </span>
                                    <span className="plan-price-unit">{displayUnit}</span>
                                </div>
                                <span className="plan-price-daily mono">
                                    {dailyPrice}
                                </span>
                                <span className="plan-cap">
                                    <Icon name="users" className="icon" />
                                    {p.cap}
                                </span>
                                <ul className="plan-features">
                                    {p.features.map((f, i) => (
                                        <li key={i}>
                                            <Icon name="check" className="icon" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/#cta"
                                    className={`btn ${p.cta} btn-full`}
                                >
                                    Get started
                                </Link>
                            </div>
                        )
                    })}
                </Reveal>

                <Reveal className="no-staff-strip reveal">
                    <span className="nss-ico">
                        <Icon name="shield-check" className="icon" />
                    </span>
                    <div>
                        <b>No per-staff pricing.</b>
                        <span>
                            Your plan is based on the scale of your operation,
                            not headcount — so you never wonder whether the
                            bartender needs an account. Priced only in Naira,
                            with no dollar conversion.
                        </span>
                    </div>
                </Reveal>

                <Reveal className="enterprise-note reveal">
                    <span>Running a larger or multi-property hotel?</span>
                    <a href="mailto:hello@innbase.co?subject=Enterprise%20plan%20enquiry">
                        Talk to sales for a custom quote{" "}
                        <Icon
                            name="arrow-right"
                            className="icon"
                            style={{ width: 13, height: 13 }}
                        />
                    </a>
                </Reveal>
            </div>
        </section>
    );
}
