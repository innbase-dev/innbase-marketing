"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import LegalAccordion from "@/components/legal/LegalAccordion";
import { TERMS_PANEL, PRIVACY_PANEL, GDPR_PANEL } from "@/data/legalData";

const PANELS = [TERMS_PANEL, PRIVACY_PANEL, GDPR_PANEL];
const KEYS = PANELS.map((p) => p.key);

export default function LegalTabs() {
  const [active, setActive] = useState("terms");
  const tabRefs = useRef([]);
  const tabbarRef = useRef(null);

  // Sync with the URL hash on load (e.g. /legal#privacy), same as the original.
  useEffect(() => {
    const initial = (window.location.hash || "").replace("#", "");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL hash on mount, not a render-phase side effect
    if (KEYS.includes(initial)) setActive(initial);
  }, []);

  function activate(key, { skipScroll } = {}) {
    setActive(key);
    window.history.replaceState(null, "", `#${key}`);
    if (!skipScroll && tabbarRef.current) {
      const bar = tabbarRef.current;
      const y = window.scrollY + bar.getBoundingClientRect().bottom - bar.offsetHeight - 8;
      if (window.scrollY > y) window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  function onKeyDown(e, i) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? (i + 1) % KEYS.length : (i - 1 + KEYS.length) % KEYS.length;
    tabRefs.current[next]?.focus();
    activate(KEYS[next]);
  }

  return (
    <>
      <div className="legal-tabbar" ref={tabbarRef}>
        <div className="wrap">
          <div className="legal-tabs" role="tablist" aria-label="Legal documents">
            {PANELS.map((p, i) => (
              <button
                key={p.key}
                className="legal-tab"
                role="tab"
                id={`tab-${p.key}`}
                aria-controls={`panel-${p.key}`}
                aria-selected={active === p.key}
                tabIndex={active === p.key ? 0 : -1}
                ref={(el) => (tabRefs.current[i] = el)}
                onClick={() => activate(p.key)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <Icon name={p.tabIcon} className="icon" />
                {p.tabLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="legal-body">
        <div className="wrap">
          {PANELS.map((p) => (
            <section
              key={p.key}
              className={`legal-panel${active === p.key ? " active" : ""}`}
              id={`panel-${p.key}`}
              role="tabpanel"
              aria-labelledby={`tab-${p.key}`}
              tabIndex={0}
              hidden={active !== p.key}
            >
              <LegalAccordion panel={p} />
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
