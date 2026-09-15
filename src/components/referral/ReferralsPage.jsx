"use client";

import { useState } from "react";
import Link from "next/link";
import { usePortal } from "./PortalContext";
import { nairaFormat } from "@/data/referralPortalData";
import StatusPill from "./StatusPill";
import { EmptyReferrals } from "./OverviewPage";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "progress", label: "In progress" },
  { key: "successful", label: "Successful" },
];

function matchesFilter(referral, filter) {
  if (filter === "all") return true;
  if (filter === "successful") return referral.stage === "paying_customer";
  return referral.stage !== "paying_customer" && referral.stage !== "not_pursued";
}

export default function ReferralsPage() {
  const { referrals, openReferModal } = usePortal();
  const [filter, setFilter] = useState("all");
  const filtered = referrals.filter((r) => matchesFilter(r, filter));

  return (
    <div>
      <div className="pf-greeting">
        <h1>Referrals</h1>
        <p>Every hotel you&apos;ve introduced to Innbase.</p>
      </div>

      <div className="pf-actions-row" role="tablist" aria-label="Filter referrals">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={filter === f.key}
            className={filter === f.key ? "pf-btn pf-btn-dark" : "pf-btn pf-btn-outline"}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyReferrals onRefer={openReferModal} />
      ) : (
        <div className="pf-list">
          {filtered.map((r) => (
            <Link key={r.id} href={`/refer/portal/referrals/${r.id}`} className="pf-row pf-row-link">
              <div className="pf-row-main">
                <p className="pf-row-name">{r.hotelName}</p>
                <p className="pf-row-sub">{r.location} · Referred {formatDate(r.submittedOn)}</p>
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

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" });
}
