"use client";

import Link from "next/link";
import { usePortal } from "./PortalContext";
import { nairaFormat, referralCounts } from "@/data/referralPortalData";
import StatusPill from "./StatusPill";

export default function OverviewPage() {
  const { referrer, referrals, totals, openReferModal, surprise, dismissSurprise } = usePortal();
  const counts = referralCounts(referrals);
  const recent = referrals.slice(0, 3);

  return (
    <div>
      <div className="pf-greeting">
        <h1>Good morning, {referrer.firstName}</h1>
        <p>Refer hotels. Earn rewards.</p>
      </div>

      {surprise && (
        <div className="pf-surprise">
          <div>
            <h3>You&apos;ve earned another {nairaFormat(surprise.amount)}</h3>
            <p>{surprise.hotelName} has been with Innbase for six months — we&apos;ve added a bonus to your rewards.</p>
          </div>
          <button type="button" onClick={dismissSurprise}>Dismiss</button>
        </div>
      )}

      <div className="pf-stats">
        <div className="pf-stat">
          <p className="pf-stat-label">Total earned</p>
          <p className="pf-stat-value pf-accent-num">{nairaFormat(totals.earned)}</p>
          <p className="pf-stat-sub">From {counts.paying} paying referral{counts.paying === 1 ? "" : "s"}</p>
        </div>
        <div className="pf-stat">
          <p className="pf-stat-label">Available to withdraw</p>
          <p className="pf-stat-value">{nairaFormat(totals.available)}</p>
          <p className="pf-stat-sub">{totals.pending > 0 ? `${nairaFormat(totals.pending)} pending` : "Nothing pending"}</p>
        </div>
        <div className="pf-stat">
          <p className="pf-stat-label">Hotels referred</p>
          <p className="pf-stat-value">{counts.total}</p>
          <p className="pf-stat-sub">{counts.paying} paying · {counts.trial} in trial · {counts.onboarding} onboarding</p>
        </div>
      </div>

      <div className="pf-actions-row">
        <button type="button" className="pf-btn pf-btn-primary" onClick={openReferModal}>
          Refer a hotel
        </button>
        {totals.available > 0 && (
          <Link href="/refer/portal/rewards" className="pf-btn pf-btn-outline">
            Withdraw {nairaFormat(totals.available)}
          </Link>
        )}
      </div>

      <div className="pf-section-title">
        <h2>Your referrals</h2>
        <Link href="/refer/portal/referrals">See all</Link>
      </div>

      {recent.length === 0 ? (
        <EmptyReferrals onRefer={openReferModal} />
      ) : (
        <div className="pf-list">
          {recent.map((r) => (
            <Link key={r.id} href={`/refer/portal/referrals/${r.id}`} className="pf-row pf-row-link">
              <div className="pf-row-main">
                <p className="pf-row-name">{r.hotelName}</p>
                <p className="pf-row-sub">{r.location}</p>
              </div>
              <div className="pf-row-end">
                <StatusPill stage={r.stage} />
                <span className="pf-row-reward">
                  {r.rewardAmount ? nairaFormat(r.rewardAmount) : "—"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function EmptyReferrals({ onRefer }) {
  return (
    <div className="pf-list">
      <div className="pf-empty">
        <p>No referrals yet</p>
        <p>Share your link with a hotel owner and it&apos;ll show up here.</p>
        {onRefer && (
          <div style={{ marginTop: 18 }}>
            <button type="button" className="pf-btn pf-btn-primary" onClick={onRefer}>
              Refer a hotel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
