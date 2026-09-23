"use client";

import { useId, useRef, useState } from "react";
import { ArrowRight, CircleCheck, CircleHelp } from "lucide-react";
import LandingIcon from "./LandingIcon";
import styles from "./MiniLandingPage.module.css";

/** A small, explicitly illustrative story. No account data or backend writes. */
export default function LandingScenario({ scenario, icon }) {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef([]);
  const id = useId();
  const stage = scenario.stages[selected];
  const panelId = `${id}-panel`;
  const titleId = `${id}-title`;
  const StatusIcon = stage.attention ? CircleHelp : CircleCheck;

  function handleKeyDown(event, index) {
    const last = scenario.stages.length - 1;
    const next = {
      ArrowRight: index === last ? 0 : index + 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    }[event.key];

    if (next === undefined) return;
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <section className={styles.scenario} aria-labelledby={titleId}>
      <div className={styles.scenarioTop}>
        <span className={styles.scenarioIcon}><LandingIcon name={icon} size={23} /></span>
        <div>
          <span className={styles.smallLabel}>THE WORK, MADE VISIBLE</span>
          <h2 id={titleId}>{scenario.title}</h2>
        </div>
      </div>
      <p className={styles.scenarioContext}>{scenario.context}</p>

      <div className={styles.tabs} role="tablist" aria-label="Explore the sample scenario">
        {scenario.stages.map((item, index) => (
          <button
            key={item.label}
            id={`${id}-tab-${index}`}
            type="button"
            role="tab"
            aria-selected={selected === index}
            aria-controls={panelId}
            tabIndex={selected === index ? 0 : -1}
            ref={(element) => { tabRefs.current[index] = element; }}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            <span aria-hidden="true">0{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>

      <div
        id={panelId}
        role="tabpanel"
        tabIndex={0}
        aria-labelledby={`${id}-tab-${selected}`}
        className={styles.scenarioPanel}
      >
        <div className={styles.stageIntro}>
          <p className={styles.stageTitle}>{stage.title}</p>
          <p className={styles.stageValue}>{stage.value}</p>
          <span className={`${styles.status} ${stage.attention ? styles.attention : ""}`}>
            <StatusIcon size={14} aria-hidden="true" />
            {stage.status}
          </span>
        </div>
        <dl className={styles.records}>
          {stage.rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className={styles.scenarioNote}><ArrowRight size={16} aria-hidden="true" />{stage.note}</p>
      </div>
      <p className={styles.sampleLabel}>Illustrative scenario · explore each step above</p>
    </section>
  );
}
