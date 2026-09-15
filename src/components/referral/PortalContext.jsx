"use client";

import { createContext, useContext, useMemo, useState, useCallback } from "react";
import {
  REFERRER,
  REFERRALS,
  REWARD_HISTORY,
  WITHDRAWAL_HISTORY,
  totalEarned,
  availableToWithdraw,
  pendingRewards,
} from "@/data/referralPortalData";

const PortalCtx = createContext(null);

export function PortalProvider({ children }) {
  const [referrals] = useState(REFERRALS);
  const [rewardHistory, setRewardHistory] = useState(REWARD_HISTORY);
  const [withdrawals, setWithdrawals] = useState(WITHDRAWAL_HISTORY);
  const [referModalOpen, setReferModalOpen] = useState(false);
  const [surprise, setSurprise] = useState(
    referrals.find((r) => r.sixMonthBonus?.earned && r.sixMonthBonus?.justSeen === undefined)
      ? { hotelName: "Royal Suites Hotel", amount: 20000 }
      : null
  );

  const requestWithdrawal = useCallback(() => {
    const amount = availableToWithdraw(rewardHistory);
    if (amount <= 0) return null;
    setRewardHistory((prev) =>
      prev.map((r) => (r.status === "available" ? { ...r, status: "withdrawn" } : r))
    );
    const record = {
      id: `wd-${Date.now()}`,
      amount,
      date: new Date().toISOString().slice(0, 10),
      bank: REFERRER.bank.bankName,
      last4: REFERRER.bank.last4,
      status: "pending",
    };
    setWithdrawals((prev) => [record, ...prev]);
    return record;
  }, [rewardHistory]);

  const dismissSurprise = useCallback(() => setSurprise(null), []);

  const value = useMemo(
    () => ({
      referrer: REFERRER,
      referrals,
      rewardHistory,
      withdrawals,
      totals: {
        earned: totalEarned(rewardHistory),
        available: availableToWithdraw(rewardHistory),
        pending: pendingRewards(rewardHistory),
      },
      referModalOpen,
      openReferModal: () => setReferModalOpen(true),
      closeReferModal: () => setReferModalOpen(false),
      requestWithdrawal,
      surprise,
      dismissSurprise,
    }),
    [referrals, rewardHistory, withdrawals, referModalOpen, requestWithdrawal, surprise, dismissSurprise]
  );

  return <PortalCtx.Provider value={value}>{children}</PortalCtx.Provider>;
}

export function usePortal() {
  const ctx = useContext(PortalCtx);
  if (!ctx) throw new Error("usePortal must be used within PortalProvider");
  return ctx;
}
