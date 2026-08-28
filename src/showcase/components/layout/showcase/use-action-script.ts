'use client';

import { useEffect, useMemo, useState } from 'react';
import { StagePoint } from './live-cursor';
import { StageRect } from './spotlight';

export interface ActionStep {
    /** Where the simulated cursor sits during this step. Omit to hide it. */
    cursor?: StagePoint;
    /** Whether the cursor shows a click ripple during this step. */
    click?: boolean;
    /** Area to highlight during this step. Omit to hide the spotlight. */
    spotlight?: StageRect & { shape?: 'pill' | 'panel' | 'circle' };
    /** Annotation to show during this step. Omit to hide the callout. */
    callout?: {
        x: number;
        y: number;
        title: string;
        description?: string;
        placement?: 'top' | 'bottom' | 'left' | 'right';
    };
    /** How long this step holds before advancing, in ms. Default 1800. */
    holdMs?: number;
}

interface UseActionScriptOptions {
    /** Loops back to the first step after the last one. Default true. */
    loop?: boolean;
    /** Starts paused on the first step — useful when exporting a single still. */
    autoplay?: boolean;
}

/**
 * Drives a scripted sequence of live-action steps for a ShowcaseStage scene.
 * Each screen you want to showcase writes its own array of ActionSteps
 * (coordinates as percentages of the stage); this hook just handles timing,
 * looping, and manual scrubbing so the same playback logic isn't rebuilt
 * per scene.
 *
 * For a static marketing screenshot, set autoplay: false and call goToStep
 * to land on the exact frame you want, then capture it.
 */
export function useActionScript(steps: ActionStep[], options: UseActionScriptOptions = {}) {
    const { loop = true, autoplay = true } = options;
    const [index, setIndex] = useState(0);
    const [playing, setPlaying] = useState(autoplay);

    const current = steps[index] ?? steps[0];
    const holdMs = current?.holdMs ?? 1800;

    useEffect(() => {
        if (!playing || steps.length <= 1) return;

        const timer = setTimeout(() => {
            setIndex((prev) => {
                const next = prev + 1;
                if (next >= steps.length) {
                    return loop ? 0 : prev;
                }
                return next;
            });
        }, holdMs);

        return () => clearTimeout(timer);
    }, [playing, index, holdMs, steps.length, loop]);

    return useMemo(
        () => ({
            step: current,
            stepIndex: index,
            totalSteps: steps.length,
            playing,
            play: () => setPlaying(true),
            pause: () => setPlaying(false),
            goToStep: (i: number) => {
                setPlaying(false);
                setIndex(Math.max(0, Math.min(i, steps.length - 1)));
            },
        }),
        [current, index, steps.length, playing],
    );
}
