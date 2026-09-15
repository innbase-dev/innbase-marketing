"use client";

import Link from "next/link";
import { usePortal } from "./PortalContext";
import { ALL_MILESTONES, nairaFormat } from "@/data/referralPortalData";
import StatusPill from "./StatusPill";

export default function ReferralDetail({ id }) {
  const { referrals } = usePortal();
  const referral = referrals.find((r) => r.id === id);

  if (!referral) {
    return (
      <div>
        <Link href="/refer/referrals" className="pf-back">← Back to referrals</Link>
        <div className="pf-empty">
          <p>Referral not found</p>
          <p>It may have been removed, or the link is out of date.</p>
        </div>
      </div>
    );
  }

  const doneKeys = new Set(referral.milestones);

  return (
    <div>
      <Link href="/refer/referrals" className="pf-back">← Back to referrals</Link>

      <div className="pf-detail-head">
        <h1>{referral.hotelName}</h1>
        <p>{referral.location}</p>
        <StatusPill stage={referral.stage} />
      </div>

      {!referral.attributionConfirmed && (
        <div className="pf-notice">
          We&apos;re confirming that this referral was yours. This usually takes a day or two — you&apos;ll see it update here.
        </div>
      )}

      {referral.sixMonthBonus?.earned && (
        <div className="pf-surprise">
          <div>
            <h3>You earned another {nairaFormat(referral.sixMonthBonus.amount)}</h3>
            <p>{referral.hotelName} has been with Innbase for six months.</p>
          </div>
        </div>
      )}

      <div className="pf-section-title">
        <h2>How it&apos;s going</h2>
      </div>

      <ul className="pf-timeline">
        {ALL_MILESTONES.map((m) => (
          <li key={m.key} data-done={doneKeys.has(m.key)}>
            <span className="pf-check">{doneKeys.has(m.key) ? "✓" : ""}</span>
            {m.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
