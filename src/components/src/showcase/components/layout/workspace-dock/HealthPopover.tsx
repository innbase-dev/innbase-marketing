import { ShieldCheck } from 'lucide-react';
import { PopoverShell, cn } from './shared';
import type { WorkspaceDockView } from '../../../queries/useWorkspaceDock';

export function HealthPopover({
    health, onClose
}: { health: WorkspaceDockView['health']; onClose: () => void }) {
    return (
        <PopoverShell title="Workspace Health" icon={ShieldCheck} onClose={onClose} className="w-72" align="right">
            <div className="p-4">
                <div className="flex items-center gap-3.5 pb-4">
                    <div className="relative h-14 w-14 flex-none">
                        <svg width="52" height="52" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="9" fill="none" className="stroke-border-muted" strokeWidth={3} />
                            <circle
                                cx="12" cy="12" r="9" fill="none" className="stroke-accent-strong" strokeWidth={3}
                                strokeLinecap="round" transform="rotate(-90 12 12)"
                                strokeDasharray={health.circumference} strokeDashoffset={health.ringOffset}
                            />
                        </svg>
                        <span className="absolute inset-0 grid place-items-center text-sm font-extrabold text-text-primary">{health.score}%</span>
                    </div>
                    <p className="text-xs leading-relaxed text-text-tertiary">
                        Workspace health is <b className="text-text-primary">{health.score}%</b> — the same figure shown in the dock.
                    </p>
                </div>
                <div className="flex flex-col">
                    {health.rows.map((r) => (
                        <div key={r.label} className="flex items-center justify-between border-b border-border-muted py-2.5 text-xs [&:last-child]:border-b-0">
                            <span className="flex items-center gap-1.5 text-text-tertiary">
                                <span className={cn('h-1.5 w-1.5 rounded-full', r.tone === 'warn' ? 'bg-danger' : 'bg-accent-strong')} />
                                {r.label}
                            </span>
                            <span className="font-bold tabular-nums text-text-primary">{r.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        </PopoverShell>
    );
}
