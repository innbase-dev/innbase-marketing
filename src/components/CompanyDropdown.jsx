"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { usePathname } from "next/navigation";

export default function CompanyDropdown() {
  const [open, setOpen] = useState(false);
  const navItemRef = useRef(null);
  const closeTimer = useRef(null);
  const pathname = usePathname();

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

  const isCurrent = (path) => pathname === path;

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
        Company <Icon name="chevron-down" className="chev" />
      </button>

      <div className={`mm${open ? " open" : ""}`} style={{ width: "160px" }}>
        <div
          className="mm-inner"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            padding: "12px",
          }}
        >
          <Link
            href="/about"
            className={isCurrent("/about") ? "current" : undefined}
            onClick={closeMenu}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "13.5px",
              fontWeight: 500,
              color: isCurrent("/about") ? "var(--text-dark)" : "var(--muted-dark)",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-dark)";
              e.currentTarget.style.background = "var(--surface-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isCurrent("/about")
                ? "var(--text-dark)"
                : "var(--muted-dark)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            About
          </Link>
          <Link
            href="/#stories"
            onClick={closeMenu}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "13.5px",
              fontWeight: 500,
              color: "var(--muted-dark)",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-dark)";
              e.currentTarget.style.background = "var(--surface-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--muted-dark)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Customers
          </Link>
          <Link
            href="/contact"
            className={isCurrent("/contact") ? "current" : undefined}
            onClick={closeMenu}
            style={{
              padding: "8px 12px",
              borderRadius: "8px",
              fontSize: "13.5px",
              fontWeight: 500,
              color: isCurrent("/contact") ? "var(--text-dark)" : "var(--muted-dark)",
              textDecoration: "none",
              transition: "background 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--text-dark)";
              e.currentTarget.style.background = "var(--surface-hover)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = isCurrent("/contact")
                ? "var(--text-dark)"
                : "var(--muted-dark)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
