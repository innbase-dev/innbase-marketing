'use client';

import { clsx } from 'clsx';

export interface StageRect {
    /** 0-100, percentage of the stage width/height. */
    x: number;
    y: number;
    width: number;
    height: number;
}

interface SpotlightProps extends StageRect {
    /** Rounded 'pill'/'circle' for buttons and avatars, 'panel' for cards/rows. */
    shape?: 'pill' | 'panel' | 'circle';
    className?: string;
}

/**
 * Dims the whole stage and cuts a soft-edged, pulsing highlight around one
 * target area — a button, a table row, a card — to say "look here" without
 * a callout bubble. Coordinates are percentages of the stage, matching
 * LiveCursor and Callout so all three read off the same script step.
 */
export function Spotlight({ x, y, width, height, shape = 'panel', className }: SpotlightProps) {
    const radius = shape === 'circle' ? '9999px' : shape === 'pill' ? '9999px' : '0.75rem';

    return (
        <div
            className={clsx('showcase-spotlight absolute transition-all duration-700 ease-in-out', className)}
            style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${width}%`,
                height: `${height}%`,
                borderRadius: radius,
            }}
        />
    );
}
