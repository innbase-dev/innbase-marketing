"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import styles from "./Blog.module.css";

export default function ExploreWithAI({ options }) {
  const [selectedId, setSelectedId] = useState(options[0].id);
  const selected = options.find((option) => option.id === selectedId) || options[0];

  return (
    <section className={styles.aiExplore} aria-labelledby="explore-with-ai">
      <div className={styles.aiIntro}>
        <p className={styles.aiEyebrow}>PUT THIS GUIDE TO WORK</p>
        <h2 id="explore-with-ai">Explore this topic <em>with AI.</em></h2>
        <p>A clearer explanation. A useful checklist. A next step for your hotel.</p>
      </div>
      <div className={styles.aiActions}>
        <div className={styles.aiChoices} role="group" aria-label="What would you like help with?">
          {options.map((option) => (
            <button
              key={option.id}
              className={styles.aiChoice}
              type="button"
              aria-pressed={option.id === selected.id}
              onClick={() => setSelectedId(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
        <p className={styles.aiDescription} aria-live="polite">{selected.description}</p>
        <div className={styles.aiOpenRow}>
          <a
            className={styles.aiOpen}
            href={selected.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ChatGPT: ${selected.label} (opens in a new tab)`}
          >
            Open ChatGPT <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <p>Opens a new tab with this guide and your question ready.</p>
        </div>
      </div>
    </section>
  );
}
