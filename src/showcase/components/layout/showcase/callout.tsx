'use client';

import { clsx } from 'clsx';
import { StagePoint } from './live-cursor';

type Placement = 'top' | 'bottom' | 'left' | 'right';

interface CalloutProps extends StagePoint {
    title: string;
    description?: string;
    placement?: Placement;
    className?: string;
}

const PLACEMENT_OFFSET: Record<Placement, string> = {
    top: '-translate-x-1/2 -translate-y-full -mt-3',
    bottom: '-translate-x-1/2 mt-3',
    left: '-translate-x-full -translate-y-1/2 -ml-3',
    right: '-translate-y-1/2 ml-3',
};

/**
 * A small annotation anchored to a point on the stage — the same percentage
 * coordinate a LiveCursor or Spotlight step would use — explaining what the
 * live action is doing. Meant to read like in-product copy, not marketing
 * copy: short, plain, active voice.
 */
export function Callout({ x, y, title, description, placement = 'top', className }: CalloutProps) {
    return (
        <div
            className="absolute z-50 transition-[left,top] duration-700 ease-in-out"
            style={{ left: `${x}%`, top: `${y}%` }}
        >
            <span className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-strong ring-4 ring-accent-strong/25" />
            <div
                className={clsx(
                    'showcase-callout absolute w-64 rounded-lg bg-surface-inverse p-3 text-text-inverse shadow-lg',
                    PLACEMENT_OFFSET[placement],
                    className,
                )}
            >
                <p className="text-sm font-semibold">{title}</p>
                {description && <p className="mt-1 text-xs leading-relaxed text-text-inverse/75">{description}</p>}
            </div>
        </div>
    );
}
