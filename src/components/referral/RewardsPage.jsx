"use client";

import { useState } from "react";
import PortalDialog from "./PortalDialog";
import BankDetailsModal from "./BankDetailsModal";
import { usePortal } from "./PortalContext";
import { nairaFormat, formatDate } from "@/data/referralPortalData";

const REWARD_STATUS = {
  PENDING: { label: "Pending", tone: "pending" },
  EARNED: { label: "Earned", tone: "pending" },
  AVAILABLE: { label: "Available", tone: "success" },
  WITHDRAWAL_REQUESTED: { label: "Withdrawal requested", tone: "pending" },
  PAID: { label: "Paid", tone: "success" },
  CANCELLED: { label: "Cancelled", tone: "closed" },
  REVERSED: { label: "Reversed", tone: "closed" },
};

const WITHDRAWAL_STATUS = {
  REQUESTED: { label: "Requested", tone: "pending" },
  PROCESSING: { label: "Processing", tone: "pending" },
  PAID: { label: "Paid", tone: "success" },
  FAILED: { label: "Failed", tone: "closed" },
};

export default function RewardsPage() {
  const {
    totals,
    rewards,
    withdrawals,
    beneficiary,
    canRequestWithdrawal,
    requestWithdrawal,
    isWithdrawalPending,
  } = usePortal();

  // idle | bankDetails | confirm | done
  const [step, setStep] = useState("idle");
  const [draftBeneficiary, setDraftBeneficiary] = useState(beneficiary);
  const [lastWithdrawalAmount, setLastWithdrawalAmount] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const startWithdrawal = () => {
    setSubmitError(null);
    setDraftBeneficiary(beneficiary ?? { bankName: "", accountNumber: "", accountName: "" });
    // ADD §35 Step 1: collect bank details only if not already on file
    // in this browser; otherwise go straight to confirming the amount.
    setStep(beneficiary ? "confirm" : "bankDetails");
  };

  const handleBankDetailsSubmit = (fields) => {
    setDraftBeneficiary(fields);
    setStep("confirm");
  };

  const handleConfirm = async () => {
    if (isWithdrawalPending) return;
    setSubmitError(null);
    try {
      const result = await requestWithdrawal(draftBeneficiary);
      setLastWithdrawalAmount(result.amountMinor);
      setStep("done");
    } catch (error) {
      setSubmitError(error?.message ?? "Something went wrong. Please try again.");
    }
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
          <p className="pf-stat-value pf-accent-num">{nairaFormat(totals.earnedMinor)}</p>
        </div>
        <div className="pf-stat">
          <p className="pf-stat-label">Available</p>
          <p className="pf-stat-value">{nairaFormat(totals.availableMinor)}</p>
        </div>
        <div className="pf-stat">
          <p className="pf-stat-label">Pending</p>
          <p className="pf-stat-value">{nairaFormat(totals.pendingMinor)}</p>
        </div>
      </div>

      <div className="pf-actions-row">
        <button
          type="button"
          className="pf-btn pf-btn-primary"
          disabled={!canRequestWithdrawal || isWithdrawalPending}
          onClick={startWithdrawal}
        >
          Withdraw {nairaFormat(totals.availableMinor)}
        </button>
      </div>
      {!canRequestWithdrawal && totals.availableMinor === 0 && (
        <p className="pf-stat-sub" style={{ marginTop: -8, marginBottom: 20 }}>
          Nothing available to withdraw yet.
        </p>
      )}

      {!canRequestWithdrawal && totals.availableMinor > 0 && <p className="pf-help-text">Withdrawals are currently unavailable for this account. Please contact support.</p>}
      <div className="pf-section-title"><h2>Reward history</h2></div>
      <div className="pf-list" style={{ marginBottom: 36 }}>
        {rewards.length === 0 ? (
          <div className="pf-empty"><p>No rewards yet</p><p>Rewards appear here once a referral pays.</p></div>
        ) : (
          rewards.map((r) => {
            const status = REWARD_STATUS[r.status] ?? { label: r.status, tone: "pending" };
            return (
              <div key={r.rewardId} className="pf-reward-row">
                <div className="pf-reward-meta">
                  <p>{r.businessDisplayName}</p>
                  <p>{formatDate(r.earnedAt)} · {r.typeLabel}</p>
                </div>
                <div className="pf-reward-amount">
                  <p>{nairaFormat(r.amountMinor)}</p>
                  <span className={`pf-pill pf-pill-${status.tone}`}>{status.label}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="pf-section-title"><h2>Withdrawal history</h2></div>
      <div className="pf-list">
        {withdrawals.length === 0 ? (
          <div className="pf-empty"><p>No withdrawals yet</p><p>Your first withdrawal will show up here.</p></div>
        ) : (
          withdrawals.map((w) => {
            const status = WITHDRAWAL_STATUS[w.status] ?? { label: w.status, tone: "pending" };
            return (
              <div key={w.withdrawalId} className="pf-reward-row">
                <div className="pf-reward-meta">
                  <p>{nairaFormat(w.amountMinor)}</p>
                  <p>{formatDate(w.requestedAt)} · {w.bankName} {w.maskedAccountNumber}</p>
                </div>
                <span className={`pf-pill pf-pill-${status.tone}`}>{status.label}</span>
              </div>
            );
          })
        )}
      </div>

      {step === "bankDetails" && (
        <BankDetailsModal
          initial={draftBeneficiary}
          onCancel={() => setStep("idle")}
          onSubmit={handleBankDetailsSubmit}
        />
      )}
      {step === "confirm" && (
        <WithdrawModal
          amount={totals.availableMinor}
          beneficiary={draftBeneficiary}
          pending={isWithdrawalPending}
          error={submitError}
          onEditBank={() => setStep("bankDetails")}
          onCancel={() => setStep("idle")}
          onConfirm={handleConfirm}
        />
      )}
      {step === "done" && (
        <WithdrawModal done amount={lastWithdrawalAmount} onCancel={() => setStep("idle")} />
      )}
    </div>
  );
}

function WithdrawModal({ amount, beneficiary, done, pending, error, onEditBank, onCancel, onConfirm }) {
  return (
    <PortalDialog title={done ? "Withdrawal requested" : "Confirm withdrawal"} onClose={onCancel} busy={pending}>
      {done ? (
        <div className="pf-confirm">
          <div className="pf-confirm-icon" aria-hidden="true">✓</div>
          <p role="status">Your {nairaFormat(amount)} withdrawal has been received. We&apos;ll update the status here once it&apos;s paid.</p>
          <button type="button" className="pf-btn pf-btn-dark" onClick={onCancel}>Done</button>
        </div>
      ) : (
        <>
          <div className="pf-summary">
            <p className="pf-summary-amount">{nairaFormat(amount)}</p>
            <div className="pf-summary-row"><span>Send to</span><strong>{beneficiary?.accountName}</strong></div>
            <div className="pf-summary-row"><span>Bank</span><strong>{beneficiary?.bankName} ····{beneficiary?.accountNumber?.slice(-4)}</strong></div>
          </div>
          <p>This takes all available rewards — there&apos;s no partial withdrawal.</p>
          <button type="button" className="pf-btn pf-btn-outline" onClick={onEditBank} disabled={pending}>Use a different account</button>
          {error && <p className="pf-field-error" role="alert">{error}</p>}
          <button type="button" className="pf-btn pf-btn-primary pf-full-width" onClick={onConfirm} disabled={pending}>{pending ? "Confirming…" : "Confirm withdrawal"}</button>
        </>
      )}
    </PortalDialog>
  );
}
