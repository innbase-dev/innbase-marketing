import styles from "./ShiftNote.module.css";

export default function ShiftNote({ label, title, detail, entries }) {
  return (
    <aside className={styles.note} aria-label={label}>
      <span className={styles.label}>{label}</span>
      <h3>{title}</h3>
      <p>{detail}</p>
      <dl>{entries.map(([term, value]) => (
        <div key={term}><dt>{term}</dt><dd>{value}</dd></div>
      ))}</dl>
    </aside>
  );
}
