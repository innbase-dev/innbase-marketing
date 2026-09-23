"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";
import styles from "./Blog.module.css";

// WhatsApp comes first on purpose: it is where most guides get passed around.
export default function ShareLinks({ url, title }) {
  const [copied, setCopied] = useState(false);
  const links = [
    ["WhatsApp", `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`],
    ["X", `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`],
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      window.prompt("Copy this link", url);
    }
  }

  return (
    <div className={styles.shareRow}>
      <span className={styles.shareLabel}>Share this guide</span>
      {links.map(([name, href]) => (
        <a key={name} className={styles.shareBtn} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${name}`}>
          {name}
        </a>
      ))}
      <button type="button" className={styles.shareBtn} onClick={copy}>
        {copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
        {copied ? "Link copied" : "Copy link"}
      </button>
      <span className={styles.srOnly} role="status">
        {copied ? "Link copied to clipboard" : ""}
      </span>
    </div>
  );
}
