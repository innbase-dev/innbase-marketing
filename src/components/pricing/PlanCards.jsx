"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { PLANS, QUICK_PICK_NOTES, QUICK_PICK_TARGET } from "@/data/pricingPlans";

const BANDS = [
  { band: "1", label: "1–10" },
  { band: "2", label: "11–20" },
  { band: "3", label: "21–50" },
  { band: "4", label: "50+" },
];

export default function PlanCards() {
  const [activeBand, setActiveBand] = useState("1");
  const highlightPlan = QUICK_PICK_TARGET[activeBand];

  return (
    <section className="sec" id="plans">
      <div className="wrap">
        <Reveal className="sec-head reveal">
          <span className="sec-eyebrow">Choose your plan</span>
          <h2 className="sec-h2">Three plans. One operating system.</h2>
          <p className="sec-sub">
            Every plan runs the full platform. Larger plans add capacity and guest-facing tools —
            never features held back from smaller hotels.
          </p>
        </Reveal>

        <Reveal className="qp-strip reveal">
          <span className="qp-label">How many staff do you have?</span>
          {BANDS.map((b) => (
            <button
              key={b.band}
              className={`qp-chip${activeBand === b.band ? " on" : ""}`}
              onClick={() => setActiveBand(b.band)}
            >
              {b.label}
            </button>
          ))}
          <span className="qp-note">{QUICK_PICK_NOTES[activeBand]}</span>
        </Reveal>

        <Reveal className="plan-grid reveal-stag reveal">
          {PLANS.map((p) => (
            <div
              className={`plan-card${p.featured ? " featured" : ""}${highlightPlan === p.plan ? " qp-hi" : ""}`}
              key={p.name}
            >
              {p.featured && <span className="plan-badge">Most popular</span>}
              <span className="plan-name">{p.name}</span>
              <p className="plan-tagline">{p.tagline}</p>
              <div className="plan-price-row">
                <span className="plan-price tnum">{p.price}</span>
                <span className="plan-price-unit">/month</span>
              </div>
              <span className="plan-price-daily mono">{p.daily}</span>
              <span className="plan-cap">
                <Icon name="users" className="icon" />
                {p.cap}
              </span>
              <Link href="/#cta" className={`btn ${p.cta} btn-full`}>
                Get started
              </Link>
              <ul className="plan-features">
                {p.features.map((f, i) => (
                  <li key={i}>
                    <Icon name="check" className="icon" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Reveal>

        <Reveal className="no-staff-strip reveal">
          <span className="nss-ico">
            <Icon name="shield-check" className="icon" />
          </span>
          <div>
            <b>No per-staff pricing.</b>
            <span>
              Your plan is based on the scale of your operation, not headcount — so you never
              wonder whether the bartender needs an account. Priced only in Naira, with no dollar
              conversion.
            </span>
          </div>
        </Reveal>

        <Reveal className="enterprise-note reveal">
          <span>Running a larger or multi-property hotel?</span>
          <a href="mailto:hello@innbase.co?subject=Enterprise%20plan%20enquiry">
            Talk to sales for a custom quote{" "}
            <Icon name="arrow-right" className="icon" style={{ width: 13, height: 13 }} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
