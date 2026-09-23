import { Check } from "lucide-react";
import styles from "./Blog.module.css";

// Cover art for posts. Every cover is a small "record" in the same visual
// language as the product illustrations on the rest of the site: no stock
// photography, nothing that needs an image file. The content comes from each
// post's `cover` object, so covers stay unique without any design work per post.
// Purely decorative: the text is illustrative and hidden from assistive tech.

function Ledger({ cover }) {
  return (
    <div className={styles.panel}>
      <p className={styles.panelLabel}>{cover.label}</p>
      {cover.rows.map(([label, value]) => (
        <div className={styles.ledgerRow} key={label}>
          <span>{label}</span>
          <b>{value}</b>
        </div>
      ))}
      <p className={`${styles.ledgerStatus}${cover.flag ? ` ${styles.isFlag}` : ""}`}>
        <span className={styles.dot} />
        {cover.status}
      </p>
    </div>
  );
}

function Stock({ cover }) {
  return (
    <div className={styles.panel}>
      <p className={styles.panelLabel}>{cover.label}</p>
      <div className={styles.bottles}>
        {Array.from({ length: cover.bottles }, (_, i) => (
          <span key={i} className={i >= cover.bottles - cover.missing ? styles.isMissing : undefined} />
        ))}
      </div>
      <p className={styles.stockLine}>
        <span>Expected {cover.expected}</span>
        <span>Counted {cover.counted}</span>
        <b>Variance {cover.variance}</b>
      </p>
    </div>
  );
}

function Handover({ cover }) {
  return (
    <div className={styles.panel}>
      <p className={styles.panelLabel}>{cover.label}</p>
      <ul className={styles.checks}>
        {cover.items.map(([text, done]) => (
          <li key={text} className={done ? styles.isDone : undefined}>
            <span className={styles.tick}>{done && <Check size={11} strokeWidth={3.2} />}</span>
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Request({ cover }) {
  return (
    <div className={styles.chat}>
      <p className={styles.panelLabel}>{cover.label}</p>
      <p className={styles.bubbleGuest}>{cover.guest}</p>
      <p className={styles.bubbleTeam}>{cover.reply}</p>
      <p className={styles.chip}>{cover.status}</p>
    </div>
  );
}

const KINDS = { ledger: Ledger, stock: Stock, handover: Handover, request: Request };

export default function PostCover({ cover, size = "card" }) {
  const Art = KINDS[cover.kind] || Ledger;
  return (
    <div className={`${styles.cover}${size === "large" ? ` ${styles.coverLarge}` : ""}`} data-kind={cover.kind} aria-hidden="true">
      <Art cover={cover} />
    </div>
  );
}
