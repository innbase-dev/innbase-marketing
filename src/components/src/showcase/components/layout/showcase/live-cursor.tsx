'use client';

import { MousePointer2 } from 'lucide-react';
import { clsx } from 'clsx';

export interface StagePoint {
    /** 0-100, percentage of the stage width/height. */
    x: number;
    y: number;
}

interface LiveCursorProps extends StagePoint {
    /** Shows a click ripple centered on the cursor tip. */
    clicking?: boolean;
    className?: string;
}

/**
 * A simulated pointer for demonstrating an interaction. Position it with
 * percentage coordinates from useActionScript's current step, and it will
 * glide there smoothly on its own via a CSS transition — no per-frame JS.
 */
export function LiveCursor({ x, y, clicking = false, className }: LiveCursorProps) {
    return (
        <div
            className={clsx('absolute z-50 transition-[left,top] duration-700 ease-in-out', className)}
            style={{ left: `${x}%`, top: `${y}%` }}
        >
            <div className="relative -translate-x-1 -translate-y-1">
                {clicking && (
                    <span className="showcase-cursor-click absolute left-0 top-0 h-4 w-4 rounded-full bg-accent-strong/60" />
                )}
                <MousePointer2
                    className="relative h-5 w-5 fill-white text-surface-inverse drop-shadow-md"
                    strokeWidth={1.5}
                />
            </div>
        </div>
    );
}
