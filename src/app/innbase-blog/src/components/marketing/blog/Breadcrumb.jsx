import Link from "next/link";
import { ChevronRight } from "lucide-react";
import styles from "./Blog.module.css";

// Visible trail. It mirrors the BreadcrumbList JSON-LD on each page, which
// Google requires: structured data must describe what readers can see.
export default function Breadcrumb({ items }) {
  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      {items.map((item, index) => (
        <span key={item.label} className={styles.crumb}>
          <ChevronRight size={12} aria-hidden="true" />
          {index === items.length - 1 ? (
            <span aria-current="page">{item.label}</span>
          ) : (
            <Link href={item.href}>{item.label}</Link>
          )}
        </span>
      ))}
    </nav>
  );
}
