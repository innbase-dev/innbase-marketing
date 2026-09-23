"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortal } from "./PortalContext";
import { nairaFormat, formatDate } from "@/data/referralPortalData";
import StatusPill from "./StatusPill";
import { EmptyReferrals } from "./OverviewPage";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "progress", label: "In progress" },
  { key: "successful", label: "Successful" },
];

function matchesFilter(referral, filter) {
  if (filter === "all") return true;
  if (filter === "successful") return referral.lifecycle === "PAYING" || referral.lifecycle === "RETAINED";
  return referral.lifecycle !== "PAYING" && referral.lifecycle !== "RETAINED" && referral.lifecycle !== "DISQUALIFIED";
}

export default function ReferralsPage() {
  const { referrals, openReferModal, canCreateReferrals } = usePortal();
  const [filter, setFilter] = useState("all");
  const filtered = referrals.filter((r) => matchesFilter(r, filter));

  return (
    <div>
      <div className="pf-greeting">
        <h1>Referrals</h1>
        <p>Every hotel you&apos;ve introduced to Innbase.</p>
      </div>

      <div className="pf-actions-row" role="group" aria-label="Filter referrals">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            aria-pressed={filter === f.key}
            className={filter === f.key ? "pf-btn pf-btn-dark" : "pf-btn pf-btn-outline"}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        referrals.length === 0 ? <EmptyReferrals onRefer={canCreateReferrals ? openReferModal : undefined} /> : <div className="pf-empty" role="status"><p>No referrals in this view yet.</p><p>Choose All to see your other referrals.</p></div>
      ) : (
        <div className="pf-list">
          {filtered.map((r) => (
            <Link key={r.referralId} href={`/refer/portal/referrals/${r.referralId}`} className="pf-row pf-row-link">
              <div className="pf-row-main">
                <p className="pf-row-name">{r.businessDisplayName}</p>
                <p className="pf-row-sub">Referred {formatDate(r.createdAt)}</p>
              </div>
              <div className="pf-row-end">
                <StatusPill lifecycle={r.lifecycle} label={r.statusLabel} />
                <span className="pf-row-reward">
                  {r.totalEarnedMinor > 0 ? nairaFormat(r.totalEarnedMinor) : "—"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
