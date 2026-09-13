"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import BrandMark from "./BrandMark";
import ProductMegaMenu from "./ProductMegaMenu";
import SolutionsMegaMenu from "./SolutionsMegaMenu";
import CompanyDropdown from "./CompanyDropdown";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
    const pathname = usePathname();
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

    const isCurrent = (path) => pathname === path;

    return (
        <>
            <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
                <div className="nav-inner">
                    <Link
                        href="/"
                        className="nav-wordmark"
                        aria-label="Innbase home"
                    >
                        <BrandMark />
                    </Link>

                    <div className="nav-links">
                        <ProductMegaMenu />
                        <SolutionsMegaMenu />
                        <CompanyDropdown />
                        <Link
                            href="/pricing"
                            className={
                                isCurrent("/pricing") ? "current" : undefined
                            }
                            aria-current={
                                isCurrent("/pricing") ? "page" : undefined
                            }
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/about"
                            className={isCurrent("/about") ? "current" : undefined}
                            aria-current={isCurrent("/about") ? "page" : undefined}
                        >
                            About
                        </Link>
                    </div>

                    <div className="nav-actions">
                        <a
                            href="https://app.innbase.co/login"
                            className="btn btn-ghost-dark btn-sm"
                        >
                            Log in
                        </a>
                        <Link href="/contact" className="btn btn-brass btn-sm">
                            Book a Demo
                        </Link>
                    </div>

                    <button
                        className="nav-mobile-btn"
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        aria-controls="mobileMenu"
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        <Icon
                            name={mobileOpen ? "x" : "menu"}
                            className="icon"
                        />
                    </button>
                </div>
            </nav>

            <MobileMenu
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                pathname={pathname}
            />
        </>
    );
}
