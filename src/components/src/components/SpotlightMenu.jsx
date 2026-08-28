"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

export default function SpotlightMenu({
    label,
    ariaLabel,
    items,
    quickLinks,
    quickLinksLabel = "Explore",
}) {
    const [open, setOpen] = useState(false);
    const [activeKey, setActiveKey] = useState(items[0].key);
    const navItemRef = useRef(null);
    const closeTimer = useRef(null);

    const active = items.find((i) => i.key === activeKey) || items[0];

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
            if (navItemRef.current && !navItemRef.current.contains(e.target))
                closeMenu();
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
                {label} <Icon name="chevron-down" className="chev" />
            </button>

            <div className={`mm mm--spot${open ? " open" : ""}`}>
                <div
                    className="mm-spot-inner"
                    role="menu"
                    aria-label={ariaLabel}
                >
                    <div className="mm-modlist">
                        <span className="mm-modlist-label">{label}</span>
                        {items.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className={`mm-mod${activeKey === item.key ? " active" : ""}`}
                                style={{ "--mod-accent": item.accent }}
                                onMouseEnter={() => setActiveKey(item.key)}
                                onFocus={() => setActiveKey(item.key)}
                                role="menuitem"
                            >
                                <span
                                    className="mm-mod-ico"
                                    style={{
                                        background: item.iconBg,
                                        color: item.iconFg,
                                    }}
                                >
                                    <Icon name={item.icon} className="icon" />
                                </span>
                                <span className="mm-mod-text">
                                    <b>{item.title}</b>
                                    <span>{item.stat}</span>
                                </span>
                            </Link>
                        ))}
                        {quickLinks?.length > 0 && (
                            <div className="mm-modlist-foot">
                                {quickLinks.map((l) => (
                                    <Link href={l.href} key={l.href}>
                                        {l.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mm-preview">
                        <div className="mm-preview-head">
                            <AnimatePresence mode="popLayout" initial={false}>
                                <motion.h4
                                    key={active.key}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{
                                        opacity: 0,
                                        y: -4,
                                        position: "absolute",
                                    }}
                                    transition={{
                                        duration: 0.15,
                                        ease: "easeOut",
                                    }}
                                >
                                    {active.preview.title}
                                </motion.h4>
                            </AnimatePresence>
                            <span className="mm-preview-badge">
                                <span className="d" />
                                {quickLinksLabel === "Explore"
                                    ? "Live preview"
                                    : "Preview"}
                            </span>
                        </div>
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.div
                                key={active.key}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{
                                    opacity: 0,
                                    y: -4,
                                    position: "absolute",
                                }}
                                transition={{ duration: 0.15, ease: "easeOut" }}
                            >
                                <div className="mm-panel">
                                    {active.preview.rows.map((row, i) => (
                                        <div className="mm-row" key={i}>
                                            <span
                                                className="mm-row-ava"
                                                style={{
                                                    background: row.ava,
                                                    borderRadius: row.square
                                                        ? 6
                                                        : undefined,
                                                }}
                                            />
                                            <span className="mm-row-name">
                                                {row.label}
                                            </span>
                                            <span
                                                className="mm-row-chip"
                                                style={{
                                                    background: row.chipBg,
                                                    color: row.chipColor,
                                                }}
                                            >
                                                {row.chip}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <p className="mm-preview-cap">
                                    {active.preview.caption}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
