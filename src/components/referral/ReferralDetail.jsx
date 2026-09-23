"use client";

import Link from "next/link";
import { usePortal } from "./PortalContext";
import { nairaFormat } from "@/data/referralPortalData";
import StatusPill from "./StatusPill";

export default function ReferralDetail({ id }) {
  const { referrals, rewards } = usePortal();
  const referral = referrals.find((r) => r.referralId === id);

  if (!referral) {
    return (
      <div>
        <Link href="/refer/portal/referrals" className="pf-back">← Back to referrals</Link>
        <div className="pf-empty">
          <p>Referral not found</p>
          <p>It may have been removed, or the link is out of date.</p>
        </div>
      </div>
    );
  }

  // ADD §31: the retention bonus only appears in `rewards` once it has
  // actually been earned -- there is nothing to compute here, only to
  // look up.
  const retentionReward = rewards.find(
    (r) => r.referralId === referral.referralId && r.type === "RETENTION_BONUS"
  );

  return (
    <div>
      <Link href="/refer/portal/referrals" className="pf-back">← Back to referrals</Link>

      <div className="pf-detail-head">
        <h1>{referral.businessDisplayName}</h1>
        <StatusPill lifecycle={referral.lifecycle} label={referral.statusLabel} />
      </div>

      {referral.attributionStatus !== "CONFIRMED" && referral.lifecycle !== "DISQUALIFIED" && (
        <div className="pf-notice">
          We&apos;re confirming that this referral was yours. This usually takes a day or two — you&apos;ll see it update here.
        </div>
      )}

      {referral.retentionRewardVisible && retentionReward && (
        <div className="pf-surprise">
          <div>
            <h3>You earned another {nairaFormat(retentionReward.amountMinor)}</h3>
            <p>{referral.businessDisplayName} has been with Innbase for six months.</p>
          </div>
        </div>
      )}

      <div className="pf-section-title">
        <h2>How it&apos;s going</h2>
      </div>

      <ul className="pf-timeline">
        {referral.milestones.map((m) => (
          <li key={m.label} data-done={m.reached}>
            <span className="pf-check">{m.reached ? "✓" : ""}</span>
            {m.label}
          </li>
        ))}
      </ul>

      {referral.totalEarnedMinor > 0 && (
        <div className="pf-section-title" style={{ marginTop: 28 }}>
          <h2>{nairaFormat(referral.totalEarnedMinor)} earned from this referral</h2>
        </div>
      )}
    </div>
  );
}
