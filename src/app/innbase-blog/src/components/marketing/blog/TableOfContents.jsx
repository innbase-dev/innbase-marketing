"use client";

import { useEffect, useState } from "react";
import styles from "./Blog.module.css";

// Works as plain anchor links without JavaScript. With JavaScript it also
// marks the section being read (aria-current="location").
export default function TableOfContents({ headings }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    let frame = 0;
    function update() {
      frame = 0;
      let current = headings[0]?.id;
      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 160) current = id;
        else break;
      }
      setActive(current);
    }
    function onScroll() {
      if (!frame) frame = requestAnimationFrame(update);
    }
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [headings]);

  return (
    <nav className={styles.toc} aria-label="In this article">
      <p className={styles.tocTitle}>In this article</p>
      <ol>
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} aria-current={active === heading.id ? "location" : undefined}>
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
