// Mock data for the referral portal. In production this is served by the
// Referrals backend (attribution, eligibility, milestone rules, payouts).
// The frontend only ever sees the three objects called out in the product
// brief: Referrer, Referral, Reward — plus a Withdrawal history derived
// from Rewards. Nothing here exposes CRM stages, staff notes, pricing, or
// attribution mechanics; see STATUS_COPY below for the translation layer.

export const REFERRER = {
  firstName: "Efe",
  fullName: "Efe Okonkwo",
  referralCode: "GreatO",
  referralLink: "innbase.com/refer/GreatO",
  bank: {
    accountName: "Efe Okonkwo",
    bankName: "GTBank",
    last4: "4821",
    verified: true,
  },
};

// Internal pipeline stages never reach the UI directly — STATUS_COPY is the
// only place that translates a referral's current_stage into something a
// referrer should see. Add new stages here, not inline in components.
export const STATUS_COPY = {
  referral_submitted: {
    label: "Referral received",
    tone: "pending",
    blurb: "We're getting in touch.",
  },
  contacted: {
    label: "In conversation",
    tone: "pending",
    blurb: "Innbase has reached out.",
  },
  demo_scheduled: {
    label: "Demo scheduled",
    tone: "pending",
    blurb: "A walkthrough is booked.",
  },
  trial: {
    label: "In trial",
    tone: "active",
    blurb: "Trying Innbase out.",
  },
  onboarding: {
    label: "Onboarding",
    tone: "active",
    blurb: "Getting set up.",
  },
  paying_customer: {
    label: "Paying customer",
    tone: "success",
    blurb: "Live on Innbase.",
  },
  attribution_review: {
    label: "Attribution pending",
    tone: "pending",
    blurb: "We're confirming this referral was yours.",
  },
  not_pursued: {
    label: "Not pursued",
    tone: "closed",
    blurb: "This one didn't move forward.",
  },
};

// The order milestones appear in a referral's timeline. Any milestone whose
// key is not present in a referral's `milestones` list renders as upcoming.
// "six_month_bonus" is deliberately absent from ALL_MILESTONES: the six-
// month reward is a domain rule, not a UI promise, and only appears once
// it's actually been earned (see ReferralDetail + the surprise banner).
export const ALL_MILESTONES = [
  { key: "submitted", label: "Referral submitted" },
  { key: "contacted", label: "Innbase got in touch" },
  { key: "demo", label: "Demo completed" },
  { key: "trial", label: "Free trial started" },
  { key: "onboarding", label: "Onboarding" },
  { key: "first_payment", label: "First payment" },
  { key: "reward_available", label: "₦20,000 reward available" },
];

export const REFERRALS = [
  {
    id: "royal-suites",
    hotelName: "Royal Suites Hotel",
    location: "Lekki, Lagos",
    submittedOn: "2026-03-18",
    stage: "paying_customer",
    attributionConfirmed: true,
    milestones: [
      "submitted",
      "contacted",
      "demo",
      "trial",
      "onboarding",
      "first_payment",
      "reward_available",
    ],
    sixMonthBonus: { earned: true, earnedOn: "2026-09-15", amount: 20000 },
    rewardAmount: 20000,
    rewardStatus: "available",
  },
  {
    id: "ocean-view",
    hotelName: "Ocean View Hotel",
    location: "Victoria Island, Lagos",
    submittedOn: "2026-08-02",
    stage: "trial",
    attributionConfirmed: true,
    milestones: ["submitted", "contacted", "demo", "trial"],
    sixMonthBonus: { earned: false },
    rewardAmount: null,
    rewardStatus: "not_yet_earned",
  },
  {
    id: "grand-palace",
    hotelName: "Grand Palace",
    location: "Ikeja, Lagos",
    submittedOn: "2026-09-10",
    stage: "demo_scheduled",
    attributionConfirmed: true,
    milestones: ["submitted", "contacted", "demo"],
    sixMonthBonus: { earned: false },
    rewardAmount: null,
    rewardStatus: "not_yet_earned",
  },
  {
    id: "harbor-inn",
    hotelName: "Harbor Inn",
    location: "Apapa, Lagos",
    submittedOn: "2026-09-13",
    stage: "attribution_review",
    attributionConfirmed: false,
    milestones: ["submitted"],
    sixMonthBonus: { earned: false },
    rewardAmount: null,
    rewardStatus: "not_yet_earned",
  },
];

export const REWARD_HISTORY = [
  { id: "rw-1", date: "2026-09-15", referral: "Royal Suites Hotel", amount: 20000, note: "6-month bonus", status: "available" },
  { id: "rw-2", date: "2026-08-02", referral: "Ocean View Hotel", amount: 20000, note: "Signed up", status: "pending" },
  { id: "rw-3", date: "2026-03-18", referral: "Royal Suites Hotel", amount: 20000, note: "Signed up", status: "available" },
];

export const WITHDRAWAL_HISTORY = [
  { id: "wd-1", amount: 20000, date: "2026-06-08", bank: "GTBank", last4: "4821", status: "paid" },
];

export function nairaFormat(amount) {
  if (amount == null) return "—";
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function totalEarned(rewardHistory) {
  return rewardHistory.reduce((sum, r) => sum + r.amount, 0);
}

export function availableToWithdraw(rewardHistory) {
  return rewardHistory
    .filter((r) => r.status === "available")
    .reduce((sum, r) => sum + r.amount, 0);
}

export function pendingRewards(rewardHistory) {
  return rewardHistory
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.amount, 0);
}

export function referralCounts(referrals) {
  const paying = referrals.filter((r) => r.stage === "paying_customer").length;
  const trial = referrals.filter((r) => r.stage === "trial").length;
  const onboarding = referrals.filter((r) =>
    ["referral_submitted", "contacted", "demo_scheduled", "onboarding", "attribution_review"].includes(r.stage)
  ).length;
  return { total: referrals.length, paying, trial, onboarding };
}
