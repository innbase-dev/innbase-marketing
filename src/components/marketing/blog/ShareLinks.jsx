"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Link2 } from "lucide-react";
import styles from "./Blog.module.css";

// WhatsApp comes first on purpose: it is where most guides get passed around.
export default function ShareLinks({ url, title }) {
  const [copied, setCopied] = useState(false);
  const [manualCopy, setManualCopy] = useState(false);
  const resetTimer = useRef(null);
  const copyInput = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);
  useEffect(() => {
    if (manualCopy) {
      copyInput.current?.focus();
      copyInput.current?.select();
    }
  }, [manualCopy]);
  const links = [
    ["WhatsApp", `https://wa.me/?text=${encodeURIComponent(`${title}\n${url}`)}`],
    ["LinkedIn", `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`],
    ["X", `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`],
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      clearTimeout(resetTimer.current);
      setManualCopy(false);
      setCopied(true);
      resetTimer.current = setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
      setManualCopy(true);
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
      <button type="button" className={`${styles.shareBtn} ${styles.copyBtn}`} onClick={copy}>
        {copied ? <Check size={16} aria-hidden="true" /> : <Link2 size={16} aria-hidden="true" />}
        {copied ? "Copied" : "Copy link"}
      </button>
      {manualCopy && (
        <label className={styles.manualCopy}>
          Copy this article link
          <input ref={copyInput} readOnly value={url} onFocus={(event) => event.currentTarget.select()} />
        </label>
      )}
      <span className={styles.srOnly} role="status">
        {copied ? "Link copied to clipboard" : manualCopy ? "Automatic copying is unavailable. The article link is selected so you can copy it." : ""}
      </span>
    </div>
  );
}
