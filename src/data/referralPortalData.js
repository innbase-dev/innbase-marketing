// Presentation-only helpers for the referral portal.
//
// This file used to also hold mock Referrer/Referral/Reward/Withdrawal
// data (REFERRER, REFERRALS, REWARD_HISTORY, WITHDRAWAL_HISTORY) for
// local development before the Referrals backend existed. That data is
// gone now that PortalContext fetches the real
// ReferralPortalWorkspaceView -- keeping mock objects around next to the
// real integration would just invite them to drift out of sync with
// what the backend actually returns. What remains here is presentation
// logic that has nothing to do with the backend's job: formatting money
// and counting rows for display.

// Backend amounts are always integer minor units (kobo) -- see
// referrals.constants.ts on the API. Never do this division anywhere
// else; every component should call nairaFormat rather than
// reimplementing the /100.
export function nairaFormat(amountMinor) {
  if (!Number.isSafeInteger(amountMinor)) return "—";
  return `₦${(amountMinor / 100).toLocaleString("en-NG")}`;
}

export function formatDate(iso) {
  if (!iso || Number.isNaN(new Date(iso).getTime())) return "—";
  return new Date(iso).toLocaleDateString("en-NG", { month: "short", day: "numeric", year: "numeric", timeZone: "Africa/Lagos" });
}

// Counts over PortalReferralEntry[] (see referral-portal.view.ts).
// `lifecycle` values come straight from the backend's ReferralLifecycle
// union -- REFERRED, CONTACTED, DEMO, ONBOARDING, TRIAL, PAYING,
// RETAINED, DISQUALIFIED.
export function referralCounts(referrals) {
  const paying = referrals.filter((r) => r.lifecycle === "PAYING" || r.lifecycle === "RETAINED").length;
  const trial = referrals.filter((r) => r.lifecycle === "TRIAL").length;
  const onboarding = referrals.filter((r) =>
    ["REFERRED", "CONTACTED", "DEMO", "ONBOARDING"].includes(r.lifecycle)
  ).length;
  return { total: referrals.length, paying, trial, onboarding };
}
