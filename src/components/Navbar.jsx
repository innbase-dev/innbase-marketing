"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import ProductMegaMenu from "./ProductMegaMenu";
import MobileMenu from "./MobileMenu";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-locked", mobileOpen);
  }, [mobileOpen]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
        <div className="nav-inner">
          <a href="#main" className="nav-wordmark" aria-label="Innbase home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <Image src="/images/innbase-light.svg" alt="logo" width={132} height={28} />
            <span className="sr-only">Innbase</span>
          </a>

          <div className="nav-links">
            <ProductMegaMenu />
            <a href="#product">How it works</a>
            <a href="#stories">Customers</a>
            <a href="pricing.html">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="nav-actions">
            <a href="auth.html" className="btn btn-ghost-dark btn-sm">
              Log in
            </a>
            <a href="#cta" className="btn btn-brass btn-sm">
              Book a Demo
            </a>
          </div>

          <button
            className="nav-mobile-btn"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobileMenu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            <Icon name={mobileOpen ? "x" : "menu"} className="icon" />
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
