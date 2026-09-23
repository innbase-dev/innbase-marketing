"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { trpc } from "@/lib/trpc/referralsClient";
import { createReferralRequest } from "@/lib/referralRequests";
import useReferralPreference from "@/hooks/useReferralPreference";
import { SITE_URL } from "@/lib/seo";

const PortalContext = createContext(null);

export function PortalProvider({ children }) {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const utils = trpc.useUtils();
  const registration = trpc.referrals.register.useMutation();
  const { mutate: register } = registration;
  const registrationStarted = useRef(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && !registrationStarted.current) {
      registrationStarted.current = true;
      register();
    }
  }, [isLoaded, isSignedIn, register]);

  const workspaceQuery = trpc.referrals.portalWorkspace.useQuery(undefined, {
    enabled: registration.isSuccess && Boolean(isSignedIn),
    staleTime: 5_000,
    // The supplied API projection is eventually consistent; an immediate
    // invalidation can arrive before its relay publishes the new record.
    refetchInterval: 5_000,
    refetchIntervalInBackground: false,
    retry: (count, error) => count < 2 && !["UNAUTHORIZED", "FORBIDDEN"].includes(error.data?.code),
  });
  const refreshWorkspace = () => utils.referrals.portalWorkspace.invalidate();
  const referralMutation = trpc.referrals.referHotel.useMutation({ onSuccess: refreshWorkspace });
  const withdrawalMutation = trpc.referrals.requestWithdrawal.useMutation({ onSuccess: refreshWorkspace });
  const { mutateAsync: submitReferral } = referralMutation;
  const { mutateAsync: submitWithdrawal } = withdrawalMutation;
  const referHotel = useMemo(() => createReferralRequest(submitReferral), [submitReferral]);
  const withdraw = useMemo(() => createReferralRequest(submitWithdrawal), [submitWithdrawal]);
  const [referModalOpen, setReferModalOpen] = useState(false);
  const [beneficiary, saveBeneficiary] = useReferralPreference(userId, "beneficiary");
  const [dismissedSurprises, saveDismissed] = useReferralPreference(userId, "dismissed");
  const workspace = workspaceQuery.data;

  const surprise = useMemo(() => {
    const reward = workspace?.rewards.find((entry) =>
      entry.type === "RETENTION_BONUS" && !["CANCELLED", "REVERSED"].includes(entry.status)
      && !dismissedSurprises.includes(entry.rewardId)
      && workspace.referrals.some((referral) => referral.referralId === entry.referralId && referral.retentionRewardVisible)
    );
    return reward ? { rewardId: reward.rewardId, hotelName: reward.businessDisplayName, amountMinor: reward.amountMinor } : null;
  }, [workspace, dismissedSurprises]);

  const requestWithdrawal = useCallback(async (override) => {
    const fields = override ?? beneficiary;
    if (!fields) throw new Error("Add your bank account first.");
    const result = await withdraw({ beneficiary: fields });
    saveBeneficiary(fields);
    return result;
  }, [beneficiary, withdraw, saveBeneficiary]);

  const requiresSignIn = isLoaded && !isSignedIn;
  const error = requiresSignIn ? { message: "Your session has ended. Please sign in again." } : registration.error ?? workspaceQuery.error;
  const value = {
    workspace,
    requiresSignIn,
    isLoading: !error && (!isLoaded || registration.isIdle || registration.isPending
      || (registration.isSuccess && workspaceQuery.isPending)),
    isError: Boolean(error),
    error,
    refetch: () => registration.isSuccess ? workspaceQuery.refetch() : register(),
    referrer: workspace ? {
      displayName: workspace.displayName, email: workspace.email, phone: workspace.phone,
      status: workspace.referrerStatus, referralToken: workspace.referralToken,
      referralLink: `${SITE_URL}/refer?ref=${encodeURIComponent(workspace.referralToken)}`,
    } : null,
    referrals: workspace?.referrals ?? [],
    rewards: workspace?.rewards ?? [],
    withdrawals: workspace?.withdrawals ?? [],
    totals: {
      earnedMinor: workspace?.totalEarnedMinor ?? 0, availableMinor: workspace?.availableMinor ?? 0,
      pendingMinor: workspace?.pendingMinor ?? 0, withdrawnMinor: workspace?.withdrawnMinor ?? 0,
    },
    canCreateReferrals: workspace?.canCreateReferrals ?? false,
    canRequestWithdrawal: workspace?.canRequestWithdrawal ?? false,
    referModalOpen,
    openReferModal: () => { if (workspace?.canCreateReferrals) setReferModalOpen(true); },
    closeReferModal: () => setReferModalOpen(false),
    referHotel, isReferHotelPending: referralMutation.isPending,
    requestWithdrawal, isWithdrawalPending: withdrawalMutation.isPending,
    beneficiary, saveBeneficiary, surprise,
    dismissSurprise: () => { if (surprise) saveDismissed([...dismissedSurprises, surprise.rewardId]); },
  };
  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>;
}

export function usePortal() {
  const context = useContext(PortalContext);
  if (!context) throw new Error("usePortal must be used inside PortalProvider");
  return context;
}
