'use client';

import { ReactNode, useRef } from 'react';
import { clsx } from 'clsx';
import { AppShell } from '../app-shell';
import { SidebarItem } from '../sidebar';
import { ShowcaseStyles } from './showcase-styles';

export const STAGE_WIDTH = 1440;
export const STAGE_HEIGHT = 900;

export type StageChrome = 'none' | 'browser';

interface ShowcaseStageProps {
    /** The real screen content to showcase — a normal page component. */
    children: ReactNode;
    sidebarItems?: SidebarItem[];
    /** Cosmetic chrome around the frame. 'browser' adds a traffic-light bar. */
    chrome?: StageChrome;
    /** Overlay layer — pass <LiveCursor>, <Spotlight>, <Callout> here. */
    overlay?: ReactNode;
    className?: string;
    /** Showcase-only additions: override rail highlighting and wire scripted assistant answers. */
    activeHref?: string;
    onAsk?: (question: string) => string | Promise<string>;
}

/**
 * ShowcaseStage is a fixed-size (1440x900), self-contained replica of the
 * product shell, meant for embedding on marketing pages or exporting as a
 * still. It renders the real AppShell/IconRail/Sidebar at native size inside
 * a clipped box, so what you see is the actual product chrome — not a mockup.
 *
 * Requires app-shell.tsx / icon-rail.tsx / sidebar.tsx to size off `h-full`
 * rather than `h-screen` (see showcase/README.md) so they fill this frame
 * instead of the real viewport.
 *
 * `overlay` sits in a coordinate root the same pixel size as the stage, so
 * LiveCursor / Spotlight / Callout can be positioned with plain percentages
 * that stay correct regardless of where the stage is rendered or scaled via
 * CSS `transform: scale()` on a parent.
 */
export function ShowcaseStage({
    children,
    sidebarItems,
    chrome = 'browser',
    overlay,
    className,
    activeHref,
    onAsk,
}: ShowcaseStageProps) {
    const stageRef = useRef<HTMLDivElement>(null);
    const chromeHeight = chrome === 'browser' ? 36 : 0;

    return (
        <div
            className={clsx(
                'relative overflow-hidden rounded-2xl bg-surface shadow-2xl ring-1 ring-black/10',
                className,
            )}
            style={{ width: STAGE_WIDTH, height: STAGE_HEIGHT }}
        >
            <ShowcaseStyles />
            {chrome === 'browser' && (
                <div
                    className="flex items-center gap-2 border-b border-border bg-surface px-4"
                    style={{ height: chromeHeight }}
                >
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-3 h-5 flex-1 rounded-md bg-canvas" />
                </div>
            )}

            <div
                ref={stageRef}
                className="relative overflow-hidden [transform:translateZ(0)]"
                style={{ height: STAGE_HEIGHT - chromeHeight }}
            >
                <AppShell sidebarItems={sidebarItems} activeHref={activeHref} onAsk={onAsk}>{children}</AppShell>

                {/* Coordinate root for overlay primitives — same box as the clipped stage. */}
                {overlay && (
                    <div className="pointer-events-none absolute inset-0 z-40">{overlay}</div>
                )}
            </div>
        </div>
    );
}
