"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Eyebrow } from "./marketing/Primitives";

const PLATFORMS = [
  {
    key: "web",
    label: "Web",
    eyebrow: "THE COMMAND CENTRE",
    title: "See the whole operation at a glance.",
    body: "A full view for owners, managers, and every decision that needs context.",
  },
  {
    key: "android",
    label: "Android",
    eyebrow: "THE SHIFT COMPANION",
    title: "Keep moving between rooms and service.",
    body: "Capture the handover, update a task, and keep the next person in the loop.",
  },
  {
    key: "ios",
    label: "iOS",
    eyebrow: "CLARITY IN YOUR POCKET",
    title: "Stay close to the details that actually matter.",
    body: "A calm, focused way to pick up the operation wherever the day takes you.",
  },
];

function WebIllustration() {
  return (
    <svg
      className="ib-platform-illustration ib-platform-illustration-web"
      viewBox="0 0 720 330"
      role="img"
      aria-label="Innbase operations workspace on the web"
    >
      <path className="ib-platform-floor" d="M44 286 420 134 674 230 294 320Z" />
      <path className="ib-platform-floor-line" d="M86 284 420 148 628 228" />
      <g className="ib-platform-browser">
        <rect x="132" y="58" width="450" height="208" rx="18" />
        <path d="M132 95h450" />
        <circle cx="158" cy="77" r="5" />
        <circle cx="178" cy="77" r="5" />
        <circle cx="198" cy="77" r="5" />
        <rect className="ib-platform-browser-rail" x="154" y="116" width="94" height="128" rx="8" />
        <rect className="ib-platform-browser-active" x="168" y="136" width="66" height="22" rx="6" />
        <rect x="168" y="174" width="45" height="6" rx="3" />
        <rect x="168" y="190" width="58" height="6" rx="3" />
        <rect className="ib-platform-browser-panel" x="274" y="116" width="288" height="54" rx="10" />
        <rect className="ib-platform-browser-panel" x="274" y="184" width="136" height="60" rx="10" />
        <rect className="ib-platform-browser-panel" x="426" y="184" width="136" height="60" rx="10" />
        <path className="ib-platform-browser-line" d="M292 145h104M292 158h66" />
        <path className="ib-platform-browser-line" d="M292 216h68M444 216h84" />
        <circle className="ib-platform-browser-dot" cx="386" cy="216" r="10" />
        <circle className="ib-platform-browser-dot ib-platform-browser-dot-warm" cx="524" cy="216" r="10" />
      </g>
      <path className="ib-platform-shadow" d="m212 282 196-78 110 39-197 78Z" />
    </svg>
  );
}

function PhoneIllustration({ platform }) {
  const isAndroid = platform === "android";
  return (
    <svg
      className={`ib-platform-illustration ib-platform-illustration-phone ib-platform-illustration-${platform}`}
      viewBox="0 0 520 360"
      role="img"
      aria-label={`${isAndroid ? "Android" : "iOS"} mobile view of Innbase`}
    >
      <path className="ib-platform-floor" d="M64 302 304 178 468 242 226 344Z" />
      <path className="ib-platform-floor-line" d="M108 300 306 198 428 246" />
      <g className="ib-platform-phone" transform={isAndroid ? "rotate(-8 274 192)" : "rotate(7 274 192)"}>
        <rect className="ib-platform-phone-shell" x="188" y="38" width="172" height="278" rx="30" />
        <rect className="ib-platform-phone-screen" x="199" y="54" width="150" height="246" rx="21" />
        <rect className="ib-platform-phone-speaker" x="249" y="45" width="48" height="5" rx="3" />
        <rect className="ib-platform-phone-topline" x="216" y="80" width="56" height="7" rx="3" />
        <circle className="ib-platform-phone-status" cx="326" cy="84" r="7" />
        <rect className="ib-platform-phone-card" x="216" y="112" width="116" height="54" rx="10" />
        <rect className="ib-platform-phone-card" x="216" y="178" width="116" height="42" rx="10" />
        <rect className="ib-platform-phone-card ib-platform-phone-card-quiet" x="216" y="232" width="76" height="40" rx="10" />
        <path className="ib-platform-phone-line" d="M230 130h54M230 143h36M230 194h72M230 207h42" />
        <circle className="ib-platform-phone-dot" cx="311" cy="137" r="9" />
        <path className="ib-platform-phone-check" d="m306 137 4 4 8-9" />
      </g>
      <path className="ib-platform-shadow" d="m164 314 128-62 106 41-128 61Z" />
    </svg>
  );
}

function PlatformCard({ platform, index, active, onSelect, cardRef }) {
  return (
    <button
      type="button"
      className={`ib-platform-card ib-platform-card-${platform.key}${active ? " is-active" : ""}`}
      aria-pressed={active}
      onClick={() => onSelect(index)}
      ref={cardRef}
    >
      <span className="ib-platform-card-topline">
        <span className="ib-platform-card-eyebrow">{platform.eyebrow}</span>
        <span className="ib-platform-card-label">{platform.label}</span>
      </span>
      <span className="ib-platform-card-copy">
        <span className="ib-platform-card-title">{platform.title}</span>
        <span className="ib-platform-card-body">{platform.body}</span>
      </span>
      <span className="ib-platform-card-art" aria-hidden="true">
        {platform.key === "web" ? <WebIllustration /> : <PhoneIllustration platform={platform.key} />}
      </span>
      <span className="ib-platform-card-index">0{index + 1}</span>
    </button>
  );
}

export default function PlatformAvailabilitySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  function selectPlatform(index, shouldScroll = true) {
    const next = (index + PLATFORMS.length) % PLATFORMS.length;
    setActiveIndex(next);
    if (shouldScroll && typeof window !== "undefined" && window.innerWidth <= 760) {
      cardRefs.current[next]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    function onScroll() {
      if (window.innerWidth > 760) return;
      const midpoint = track.getBoundingClientRect().left + track.clientWidth / 2;
      let nearest = 0;
      let distance = Number.POSITIVE_INFINITY;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const nextDistance = Math.abs(rect.left + rect.width / 2 - midpoint);
        if (nextDistance < distance) {
          distance = nextDistance;
          nearest = index;
        }
      });

      setActiveIndex(nearest);
    }

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  function onKeyDown(event) {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectPlatform(activeIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectPlatform(activeIndex - 1);
    }
  }

  return (
    <section className="ib-section ib-platform-availability ib-dark" id="platform-availability">
      <div className="ib-platform-availability-texture" aria-hidden="true" />
      <div className="ib-container">
        <div className="ib-platform-intro">
          <Eyebrow>PLATFORM AVAILABILITY</Eyebrow>
          <h2>
            One operation.<br />
            <em>Three places to pick it up.</em>
          </h2>
          <p>Full context on the web. Fast updates from the floor. Innbase is available on Web, Android, and iOS.</p>
        </div>

        <div className="ib-platform-controls" onKeyDown={onKeyDown}>
          <div className="ib-platform-availability-options" role="group" aria-label="Choose an Innbase platform">
            {PLATFORMS.map((platform, index) => (
              <button
                key={platform.key}
                type="button"
                className={activeIndex === index ? "is-active" : ""}
                aria-pressed={activeIndex === index}
                onClick={() => selectPlatform(index)}
              >
                <span aria-hidden="true" />
                {platform.label}
              </button>
            ))}
          </div>
          <div className="ib-platform-arrows" aria-label="Platform card controls">
            <button type="button" onClick={() => selectPlatform(activeIndex - 1)} aria-label="Previous platform">
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => selectPlatform(activeIndex + 1)} aria-label="Next platform">
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="ib-platform-bento" ref={trackRef} aria-label="Innbase platform availability cards">
          {PLATFORMS.map((platform, index) => (
            <PlatformCard
              key={platform.key}
              platform={platform}
              index={index}
              active={activeIndex === index}
              onSelect={selectPlatform}
              cardRef={(node) => { cardRefs.current[index] = node; }}
            />
          ))}
          <div className="ib-platform-note">
            <span>THE SAME OPERATION, IN MOTION</span>
            <strong>Start at the desk. Finish on the floor. Keep the context.</strong>
            <div aria-hidden="true">
              <span className="is-lit" />
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>

        <div className="ib-platform-dots" aria-hidden="true">
          {PLATFORMS.map((platform, index) => <span key={platform.key} className={activeIndex === index ? "is-active" : ""} />)}
        </div>
      </div>
    </section>
  );
}
