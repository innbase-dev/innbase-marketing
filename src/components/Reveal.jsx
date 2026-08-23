"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Drop-in replacement for the original IntersectionObserver-driven
 * `.reveal` / `.reveal-stag` scroll animations. The actual motion (opacity
 * + translateY, staggered children) is still defined in globals.css so the
 * visuals stay identical — this component just decides *when* to add the
 * `in` class, using framer-motion's viewport tracking instead of a manual
 * observer.
 */
export default function Reveal({
    as: Tag = "div",
    className = "",
    amount = 0.14,
    once = true,
    style,
    children,
    ...rest
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once, amount });
    const classes = [className, inView ? "in" : ""].filter(Boolean).join(" ");

    return (
        <Tag ref={ref} className={classes} style={style} {...rest}>
            {children}
        </Tag>
    );
}
