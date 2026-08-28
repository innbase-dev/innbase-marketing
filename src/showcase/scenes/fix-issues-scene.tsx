'use client';

/**
 * FIX ISSUES SHOWCASE SCENE
 * ─────────────────────────────────────────────────────────────────────────
 * The real Maintenance ("Fix Issues") screen and the real Assistant panel,
 * rendered from the actual product components copied into src/showcase/ —
 * not a mockup. Everything you see here is genuine Innbase UI: the same
 * FeedList, DetailPanel, OpStats, IconRail, Sidebar, WorkspaceDock and
 * AssistantPanel that ship in the product, all running on the same
 * (entirely mock/local, no network) data those components already use.
 *
 * DESIGN CHOICE — why the assistant isn't auto-typed:
 * useActionScript's ActionStep only describes where the cursor/spotlight/
 * callout sit — it doesn't reach into a component's internal state. Rather
 * than fight AssistantPanel's real controlled-by-itself chat model with
 * synthetic keystrokes (which would be fragile and, worse, not actually
 * real), the script narrates *up to* the assistant and then gets out of the
 * way: the panel is the genuine, working component, and a visitor can
 * actually click a suggested question — or type their own — and get a real
 * (locally computed, grounded-in-the-mock-data) answer. That felt like a
 * stronger, more honest demo than a scripted illusion of typing.
 *
 * If a fully-automated "watch it happen" loop is wanted instead, the clean
 * way to add it is an optional `onEnter?: () => void` on ActionStep (a
 * small, additive change to use-action-script.ts) plus threading a
 * controlled `assistantOpen` prop through WorkspaceDock, mirroring the
 * controlled/uncontrolled pattern it already uses for `role`. Not done here
 * — flagging it as the next increment rather than guessing what's wanted.
 */

import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {
    ShowcaseStage,
    LiveCursor,
    Spotlight,
    Callout,
    useActionScript,
    type ActionStep,
} from '../components/layout/showcase';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { OpStats } from '../features/operations/maintenance/components/OpStats';
import { WorkArea } from '../features/operations/maintenance/components/WorkArea';
import { ISSUES, VENDORS } from '../features/operations/maintenance/queries/mock-projections';
import { CalendarCog, Wrench, Sparkles as SparklesIcon, Users, CalendarCheck } from 'lucide-react';

/* One QueryClient per scene instance — this scene owns its own mock data,
   isolated from anything else on the page. */
function useSceneQueryClient() {
    const [client] = useState(() => new QueryClient());
    return client;
}

const SIDEBAR_ITEMS = [
    { label: 'Rooms', href: '/operations/rooms', icon: CalendarCog, active: false },
    { label: 'Fix Issues', href: '/operations/maintenance', icon: Wrench, active: true },
    { label: 'Housekeeping', href: '/operations/housekeeping', icon: SparklesIcon, active: false },
    { label: 'Guests', href: '/operations/guests', icon: Users, active: false },
    { label: 'Bookings', href: '/operations/bookings', icon: CalendarCheck, active: false },
];

/* Grounded, locally-computed answers — reads the real mock ISSUES array
   rather than returning canned strings, the same way the product's own
   onAsk implementations are expected to work. */
function answerFromBoard(question: string): string {
    const q = question.toLowerCase();

    if (q.includes('open') && q.includes('issue')) {
        const open = ISSUES.filter((i) => i.status !== 'completed');
        const rooms = open.map((i) => i.room).join(', ');
        return `${open.length} open right now: ${rooms}.`;
    }
    if (q.includes('105')) {
        const it = ISSUES.find((i) => i.room === 'Room 105');
        return it
            ? `Room 105 — ${it.title}. Status: ${it.status === 'waiting' ? 'waiting on the artisan' : it.status}. Vendor: ${VENDORS[it.vendorKey as keyof typeof VENDORS]?.name ?? 'unassigned'}.`
            : `Nothing on file for Room 105 right now.`;
    }
    if (q.includes('vendor') || q.includes('artisan')) {
        const best = Object.values(VENDORS).sort((a, b) => a.avgResponseDays - b.avgResponseDays)[0];
        return `${best.name} responds fastest on average — about ${best.avgResponseDays} days, ${best.completionRate}% completion rate.`;
    }
    return `I can only answer from what's on this board right now — try one of the suggestions above.`;
}

const SCRIPT: ActionStep[] = [
    { holdMs: 1200 },
    {
        cursor: { x: 84, y: 11 },
        spotlight: { x: 80, y: 8.5, width: 9, height: 4.5, shape: 'pill' },
        callout: {
            x: 84, y: 11,
            title: 'The old way',
            description: 'Open a form. Pick a room, a category, a priority, write it up.',
            placement: 'left',
        },
        holdMs: 2600,
    },
    {
        cursor: { x: 43.5, y: 97.5 },
        click: true,
        spotlight: { x: 41.5, y: 95.5, width: 4, height: 4, shape: 'circle' },
        callout: {
            x: 43.5, y: 96,
            title: 'Or just ask',
            description: 'Real assistant, right there in the dock — try a suggested question yourself.',
            placement: 'top',
        },
        holdMs: 3200,
    },
    {
        spotlight: { x: 6.5, y: 20, width: 16.5, height: 62, shape: 'panel' },
        callout: {
            x: 24, y: 24,
            title: 'Nothing to retype',
            description: 'Status, vendor, cost history, timeline — all logged the moment it happens.',
            placement: 'right',
        },
        holdMs: 2800,
    },
];

export function FixIssuesScene() {
    const queryClient = useSceneQueryClient();
    const { step } = useActionScript(SCRIPT);

    return (
        <div className="ib-scene">
            <QueryClientProvider client={queryClient}>
                <ShowcaseStage
                    sidebarItems={SIDEBAR_ITEMS}
                    activeHref="/operations/rooms"
                    onAsk={(q) => answerFromBoard(q)}
                    overlay={
                        <>
                            {step.spotlight && <Spotlight {...step.spotlight} />}
                            {step.cursor && <LiveCursor {...step.cursor} clicking={step.click} />}
                            {step.callout && <Callout {...step.callout} />}
                        </>
                    }
                >
                    <div className="flex flex-col gap-6">
                        <Breadcrumbs items={[{ label: 'Operations' }, { label: 'Fix Issues' }]} />
                        <OpStats />
                        <WorkArea />
                    </div>
                </ShowcaseStage>
            </QueryClientProvider>
        </div>
    );
}
