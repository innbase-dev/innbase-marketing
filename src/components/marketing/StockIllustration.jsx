"use client";

import { useEffect, useRef, useState } from "react";

// These are representative visual markers, not a literal inventory count.
// Six items keep the illustration balanced without creating a mobile overflow risk.
const STOCK_BOTTLES = [
  { id: "counted-1", missing: false },
  { id: "counted-2", missing: false },
  { id: "counted-3", missing: false },
  { id: "counted-4", missing: false },
  { id: "missing-1", missing: true },
  { id: "missing-2", missing: true },
];

// The storyline: an evening closeout, told in three beats.
// 1. Count — bottles land on the shelf left to right, the way a hand runs down a row during a count.
// 2. Flag — the two empty slots catch an amber halo the instant they're "reached", then ease into a
//    slow, ongoing pulse: a quiet, persistent reminder that these two are still unresolved.
// 3. Confirm — "Variance −2" brightens right as the last flag settles, tying the gap you just watched
//    appear to the number that names it.
export default function StockIllustration() {
  const containerRef = useRef(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setIsLive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`ib-stock-art${isLive ? " is-live" : ""}`} ref={containerRef}>
      <span>EXAMPLE / EVENING CLOSEOUT</span>
      <div className="ib-bottles" aria-hidden="true">
        {STOCK_BOTTLES.map(({ id, missing }, index) => (
          <div key={id} className={missing ? "is-missing" : undefined} style={{ "--i": index }}>
            <span />
          </div>
        ))}
      </div>
      <h4>Make the gaps visible.</h4>
      <p>
        Expected 36 <span>Counted 34</span> <b>Variance −2</b>
      </p>
    </div>
  );
}
