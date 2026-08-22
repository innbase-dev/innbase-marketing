"use client";

import {
  ArrowLeft,
  ArrowRight,
  Export,
  Money,
  Briefcase,
  CalendarTick,
  TickCircle,
  ArrowDown2,
  ClipboardText,
  Home2,
  Glass,
  HambergerMenu,
  BoxSearch,
  PlayCircle,
  Add,
  MagicStar,
  People,
  CloseCircle,
} from "iconsax-react";

/**
 * Maps the original design's lucide-react icon names to their closest
 * Iconsax equivalents, so every icon in the app resolves through a single,
 * swappable source of truth.
 */
const ICONS = {
  "arrow-left": ArrowLeft,
  "arrow-right": ArrowRight,
  "arrow-up-right": Export,
  banknote: Money,
  briefcase: Briefcase,
  "calendar-clock": CalendarTick,
  check: TickCircle,
  "chevron-down": ArrowDown2,
  "clipboard-list": ClipboardText,
  "door-open": Home2,
  martini: Glass,
  menu: HambergerMenu,
  "package-search": BoxSearch,
  "play-circle": PlayCircle,
  plus: Add,
  sparkles: MagicStar,
  users: People,
  x: CloseCircle,
};

export default function Icon({ name, className, style, size, variant = "Linear", ...rest }) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;

  // Original markup sized icons either via the shared `.icon` CSS class
  // (18px) or an inline width/height override — replicate both paths.
  const resolvedSize = size || style?.width || 18;

  return (
    <Cmp
      size={resolvedSize}
      variant={variant}
      color="currentColor"
      className={className}
      style={style}
      {...rest}
    />
  );
}
