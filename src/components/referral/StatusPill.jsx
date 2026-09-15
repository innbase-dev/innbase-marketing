import { STATUS_COPY } from "@/data/referralPortalData";

export default function StatusPill({ stage }) {
  const copy = STATUS_COPY[stage] ?? { label: stage, tone: "closed" };
  return <span className={`pf-pill pf-pill-${copy.tone}`}>{copy.label}</span>;
}
