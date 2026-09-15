"use client";

import { useState } from "react";
import { usePortal } from "./PortalContext";
import { nairaFormat } from "@/data/referralPortalData";

const STATUS_LABEL = { available: "Available", pending: "Pending", withdrawn: "Withdrawn" };

export default function RewardsPage() {
  const { referrer, totals, rewardHistory, withdrawals, requestWithdrawal } = usePortal();
  const [step, setStep] = useState("idle"); // idle | confirm | done
  const [lastWithdrawal, setLastWithdrawal] = useState(null);

  const handleConfirm = () => {
    const record = requestWithdrawal();
    setLastWithdrawal(record);
    setStep("done");
  };

  return (
    <div>
      <div className="pf-greeting">
        <h1>Rewards</h1>
        <p>What you&apos;ve earned, what&apos;s pending, and what&apos;s been paid out.</p>
      </div>

      <div className="pf-stats">
        <div className="pf-stat">
          <p className="pf-stat-label">Total earned</p>
          <p className="pf-stat-value pf-accent-num">{nairaFormat(totals.earned)}</p>
        </div>
        <div className="pf-stat">
          <p className="pf-stat-label">Available</p>
          <p className="pf-stat-value">{nairaFormat(totals.available)}</p>
        </div>
        <div className="pf-stat">
          <p className="pf-stat-label">Pending</p>
          <p className="pf-stat-value">{nairaFormat(totals.pending)}</p>
        </div>
      </div>

      <div className="pf-actions-row">
        <button
          type="button"
          className="pf-btn pf-btn-primary"
          disabled={totals.available <= 0}
          onClick={() => setStep("confirm")}
        >
          Withdraw {nairaFormat(totals.available)}
        </button>
      </div>

      <div className="pf-section-title"><h2>Reward history</h2></div>
      <div className="pf-list" style={{ marginBottom: 36 }}>
        {rewardHistory.length === 0 ? (
          <div className="pf-empty"><p>No rewards yet</p><p>Rewards appear here once a referral pays.</p></div>
        ) : (
          rewardHistory.map((r) => (
            <div key={r.id} className="pf-reward-row">
              <div className="pf-reward-meta">
                <p>{r.referral}</p>
                <p>{formatDate(r.date)} · {r.note}</p>
              </div>
              <div className="pf-reward-amount">
                <p>{nairaFormat(r.amount)}</p>
                <span className={`pf-pill pf-pill-${r.status === "available" ? "success" : r.status === "pending" ? "pending" : "closed"}`}>
                  {STATUS_LABEL[r.status] ?? r.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pf-section-title"><h2>Withdrawal history</h2></div>
      <div className="pf-list">
        {withdrawals.length === 0 ? (
          <div className="pf-empty"><p>No withdrawals yet</p><p>Your first withdrawal will show up here.</p></div>
        ) : (
          withdrawals.map((w) => (
            <div key={w.id} className="pf-reward-row">
              <div className="pf-reward-meta">
                <p>{nairaFormat(w.amount)}</p>
                <p>{formatDate(w.date)} · {w.bank} ····{w.last4}</p>
              </div>
              <span className={`pf-pill pf-pill-${w.status === "paid" ? "success" : "pending"}`}>
                {w.status === "paid" ? "Paid" : "Pending"}
              </span>
            </div>
          ))
        )}
      </div>

      {step === "confirm" && (
        <WithdrawModal
          amount={totals.available}
          referrer={referrer}
          onCancel={() => setStep("idle")}
          onConfirm={handleConfirm}
        />
      )}
      {step === "done" && lastWithdrawal && (
        <WithdrawModal done amount={lastWithdrawal.amount} onCancel={() => setStep("idle")} />
      )}
    </div>
  );
}

function WithdrawModal({ amount, referrer, done, onCancel, onConfirm }) {
  return (
    <div className="pf-modal-overlay" role="dialog" aria-modal="true" onClick={(e) => e.target === e.currentTarget && onCancel()}>
      <div className="pf-modal">
        {done ? (
          <div className="pf-confirm">
            <div className="pf-confirm-icon">✓</div>
            <h2>Withdrawal requested</h2>
            <p>Your {nairaFormat(amount)} withdrawal has been received. We&apos;ll update the status here once it&apos;s paid.</p>
            <button type="button" className="pf-btn pf-btn-dark" onClick={onCancel}>Done</button>
          </div>
        ) : (
          <>
            <div className="pf-modal-head">
              <h2>Confirm withdrawal</h2>
              <button type="button" className="pf-modal-close" onClick={onCancel} aria-label="Close">×</button>
            </div>
            <div className="pf-summary">
              <p className="pf-summary-amount">{nairaFormat(amount)}</p>
              <div className="pf-summary-row"><span>Send to</span><strong>{referrer.bank.accountName}</strong></div>
              <div className="pf-summary-row"><span>Bank</span><strong>{referrer.bank.bankName} ····{referrer.bank.last4}</strong></div>
            </div>
            <p style={{ marginBottom: 20 }}>This takes all available rewards — there&apos;s no partial withdrawal.</p>
            <button type="button" className="pf-btn pf-btn-primary" style={{ width: "100%" }} onClick={onConfirm}>
              Confirm withdrawal
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric" });
}
