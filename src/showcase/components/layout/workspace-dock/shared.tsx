import { clsx, type ClassValue } from 'clsx';
import { X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
    // Fallback merge: when 'tailwind-merge' is unavailable, just use clsx.
    return clsx(inputs);
}

export function DockTooltip({ label }: { label: string }) {
    return (
        <span
            className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-text-primary px-2.5 py-1 text-xs font-semibold text-text-inverse opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
        >
            {label}
            <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-text-strong" />
        </span>
    );
}

export function DockIconButton({
    icon: Icon, label, onClick, active, badge, refEl,
}: {
    icon: LucideIcon; label: string; onClick: () => void; active?: boolean; badge?: boolean; refEl?: React.RefObject<HTMLButtonElement>;
}) {
    return (
        <button
            ref={refEl}
            type="button"
            aria-label={label}
            onClick={onClick}
            className={cn(
                'group relative grid h-8 w-8 flex-none place-items-center rounded-md transition-colors',
                active ? 'bg-surface-inverse text-text-inverse' : 'text-text-tertiary hover:bg-surface-inverse/5 hover:text-text-primary',
            )}
        >
            <Icon className="h-4 w-4" />
            {badge && <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full border-0.375 border-border-strong bg-accent-strong" />}
            <DockTooltip label={label} />
        </button>
    );
}

export function PopoverShell({
    title, icon: Icon, onClose, children, align = 'left', className
}: {
    title: string; icon: LucideIcon; onClose: () => void; children: React.ReactNode; align?: 'left' | 'right'; className?: string;
}) {
    return (
        <div
            className={cn(
                'absolute bottom-full mb-3 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl',
                align === 'left' ? 'left-0' : 'right-0',
                className
            )}
            role="dialog"
        >
            <div className="flex items-center gap-2 border-b border-border-muted px-4 py-3">
                <Icon className="h-4 w-4 text-accent-strong" />
                <b className="text-sm font-bold text-text-primary">{title}</b>
                <button
                    type="button"
                    aria-label="Close"
                    onClick={onClose}
                    className="ml-auto grid h-6 w-6 place-items-center rounded-md text-text-disabled hover:bg-canvas-subtle hover:text-text-primary"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
            {children}
        </div>
    );
}
