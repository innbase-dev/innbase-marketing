"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";

const TILES = [
  {
    href: "/#product",
    bg: "var(--teal-soft)",
    color: "var(--teal-bright)",
    icon: "banknote",
    title: "Payments",
    desc: "Bank transfers, POS, and cash — one queue.",
    dot: "#2dd4bf",
    stat: "96% auto-matched",
  },
  {
    href: "/#product",
    bg: "rgba(248,113,113,.1)",
    color: "#f87171",
    icon: "package-search",
    title: "Inventory",
    desc: "Stock variance with a likely cause attached.",
    dot: "#fbbf24",
    stat: "2 need attention",
  },
  {
    href: "/#product",
    bg: "rgba(96,165,250,.1)",
    color: "#60a5fa",
    icon: "calendar-clock",
    title: "Shift",
    desc: "A live heatmap of who's on, and who's not.",
    dot: "#60a5fa",
    stat: "92% coverage",
  },
  {
    href: "/#product",
    bg: "var(--amber-soft)",
    color: "var(--amber-bright)",
    icon: "door-open",
    title: "Guests",
    desc: "Balance, stay, and tab — together.",
    dot: "#2dd4bf",
    stat: "1 profile per guest",
  },
];

export default function ProductMegaMenu() {
  const [open, setOpen] = useState(false);
  const navItemRef = useRef(null);
  const closeTimer = useRef(null);

  const openMenu = () => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeMenu = () => setOpen(false);
  const scheduleClose = () => {
    closeTimer.current = setTimeout(closeMenu, 220);
  };

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") closeMenu();
    }
    function onClick(e) {
      if (navItemRef.current && !navItemRef.current.contains(e.target)) closeMenu();
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div
      className="nav-item"
      ref={navItemRef}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <button
        className="nav-trigger"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? closeMenu() : openMenu())}
      >
        Product <Icon name="chevron-down" className="chev" />
      </button>

      <div className={`mm${open ? " open" : ""}`}>
        <div className="mm-inner">
          <div className="mm-grid">
            <div className="mm-tiles">
              {TILES.map((t) => (
                <Link className="mm-tile" href={t.href} key={t.title}>
                  <span className="mm-tile-ico" style={{ background: t.bg, color: t.color }}>
                    <Icon name={t.icon} className="icon" style={{ width: 15, height: 15 }} />
                  </span>
                  <b>{t.title}</b>
                  <p>{t.desc}</p>
                  <span className="mm-tile-stat">
                    <span className="d" style={{ background: t.dot }} />
                    {t.stat}
                  </span>
                </Link>
              ))}
            </div>
            <div className="mm-links">
              <Link href="/pricing">Pricing</Link>
              <Link href="/#roles">Who it&apos;s for</Link>
              <Link href="/#faq">FAQ</Link>
              <Link href="/#reconciliation">Why it&apos;s trustworthy</Link>
            </div>
          </div>
          <div className="mm-rail">
            <div className="mm-rail-glow" />
            <span className="mm-rail-badge">Pilot story</span>
            <p className="mm-rail-h">The Bay Lounge recovered ₦380,000 in bar sales in week one.</p>
            <p>Every item now logs against a sale, so the count defends the bartender instead of accusing them.</p>
            <div className="mm-rail-stat">
              <b>96%</b>
              <span>match confidence, live</span>
            </div>
            <Link href="/#stories" className="mm-rail-cta">
              Read the story <Icon name="arrow-right" className="icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
