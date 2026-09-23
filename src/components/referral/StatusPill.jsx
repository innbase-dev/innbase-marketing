/**
 * ADD §30: the backend decides the human-facing wording (`statusLabel`
 * on each referral, from ReferralPortalMapper) so internal lifecycle
 * names never leak into the UI verbatim and the copy can change without
 * a frontend deploy. This component's only remaining job is picking a
 * *color* for that label, based on the raw `lifecycle` value.
 */
const TONE_BY_LIFECYCLE = {
  REFERRED: "pending",
  CONTACTED: "pending",
  DEMO: "pending",
  ONBOARDING: "active",
  TRIAL: "active",
  PAYING: "success",
  RETAINED: "success",
  DISQUALIFIED: "closed",
};

export default function StatusPill({ lifecycle, label }) {
  const tone = TONE_BY_LIFECYCLE[lifecycle] ?? "pending";
  return <span className={`pf-pill pf-pill-${tone}`}>{label}</span>;
}
