'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ShieldCheck, ChevronDown, Search, Sparkles, Plus, ScanLine, NotebookPen, LifeBuoy, Check, Download } from 'lucide-react';
import { cn, DockIconButton, DockTooltip, PopoverShell } from './shared';
import { QuickCapturePopover } from './QuickCapturePopover';
import { ScratchpadPopover } from './ScratchpadPopover';
import { SupportPopover } from './SupportPopover';
import { HealthPopover } from './HealthPopover';
import { AssistantPanel } from './AssistantPanel';
import { SearchModal } from './SearchModal';
import { ScannerModal } from './ScannerModal';
import type { WorkspaceAction, SearchItem, PopoverId } from './types';
import { useWorkspaceDock, type RoleKey } from '../../../queries/useWorkspaceDock';
// NOTE (showcase patch): the real ThemeToggle mutates document.documentElement's
// global `dark` class + localStorage — appropriate for the product app, not for
// a scripted marketing scene that must always stay dark. Omitted deliberately.

export interface WorkspaceDockProps {
    /** Currently active role. Uncontrolled if omitted (component manages its own state). */
    role?: RoleKey;
    onRoleChange?: (role: RoleKey) => void;

    /** "This workspace" quick actions — the page-specific section of Quick Capture. */
    workspaceActions?: WorkspaceAction[];

    /** Extra searchable items, merged with each role's default entries. */
    searchItems?: SearchItem[];

    /** Called when the assistant needs an answer. Return a string (or a Promise<string>). */
    onAsk?: (question: string) => string | Promise<string>;

    /** Called when a "Create new" quick-capture item is chosen. */
    onQuickCreate?: (id: string) => void;

    /** Optional toast hook — called with a message whenever the dock wants to notify the page. */
    onToast?: (message: string) => void;
}

export function WorkspaceDock({
    role: controlledRole,
    onRoleChange,
    workspaceActions = [
        { id: 'export', label: 'Export', icon: Download, onSelect: () => {} },
    ],
    searchItems = [],
    onAsk,
    onQuickCreate,
    onToast,
}: WorkspaceDockProps) {
    const [uncontrolledRole, setUncontrolledRole] = useState<RoleKey>('manager');
    const activeRoleKey = controlledRole ?? uncontrolledRole;
    
    // Fetch data using the query hook (Workspace Projection)
    const { data: viewData, isLoading } = useWorkspaceDock(activeRoleKey);

    const [openPopover, setOpenPopover] = useState<PopoverId>(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [assistantOpen, setAssistantOpen] = useState(false);
    const [scannerOpen, setScannerOpen] = useState(false);

    const dockRef = useRef<HTMLDivElement>(null);

    const toast = (message: string) => onToast?.(message);

    /* Close popovers on outside click / Escape */
    useEffect(() => {
        function onPointerDown(e: MouseEvent) {
            if (dockRef.current && !dockRef.current.contains(e.target as Node)) {
                setOpenPopover(null);
            }
        }
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') {
                setOpenPopover(null);
                setSearchOpen(false);
                setScannerOpen(false);
                setAssistantOpen(false);
            }
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setOpenPopover(null);
                setSearchOpen(true);
            }
        }
        document.addEventListener('mousedown', onPointerDown);
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('mousedown', onPointerDown);
            document.removeEventListener('keydown', onKeyDown);
        };
    }, []);

    if (isLoading || !viewData) return null;
    
    const currentRole = viewData.roles.find(r => r.id === activeRoleKey)!;

    const setRole = (next: RoleKey) => {
        if (onRoleChange) onRoleChange(next);
        else setUncontrolledRole(next);
        toast(`Viewing as ${viewData.roles.find(r => r.id === next)?.label}`);
        setOpenPopover(null);
    };

    const togglePopover = (id: Exclude<PopoverId, null>) => {
        setOpenPopover((cur) => (cur === id ? null : id));
    };

    const runQuickCreate = (id: string) => {
        setOpenPopover(null);
        if (id === 'incident') toast('Log Incident opened');
        onQuickCreate?.(id);
        if (!onQuickCreate) toast(`Opening ${viewData.quickCaptureItems.find(i => i.id === id)?.label ?? id}…`);
    };

    const allSearchItems = [...searchItems];

    return (
        <>
            <div className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex flex-col max-225:left-20">
                <div
                    ref={dockRef}
                    className="pointer-events-auto flex h-11 items-center gap-1 border-t border-border bg-surface/85 px-6 shadow-lg backdrop-blur-xl"
                >
                    {/* Role switcher */}
                    <div className="relative">
                        <button
                            type="button"
                            aria-haspopup="true"
                            onClick={() => togglePopover('role')}
                            className="group flex cursor-pointer items-center gap-1.5 rounded-md p-1 pr-2.5 transition-colors hover:bg-surface-inverse/5"
                        >
                            <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-surface-inverse text-text-inverse">
                                <currentRole.icon className="h-3.5 w-3.5" strokeWidth={2} />
                            </span>
                            <span className="whitespace-nowrap text-xs font-bold text-text-primary max-170:hidden">
                                {currentRole.label}
                            </span>
                            <ChevronDown className="h-3 w-3 text-text-disabled" />
                        </button>

                        {openPopover === 'role' && (
                            <PopoverShell title="Switch Role" icon={ShieldCheck} onClose={() => setOpenPopover(null)} className="w-64">
                                <div className="p-1.5">
                                    {viewData.roles.map((r) => (
                                        <button
                                            key={r.id}
                                            type="button"
                                            onClick={() => setRole(r.id)}
                                            className={cn(
                                                'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-colors',
                                                r.id === activeRoleKey ? 'bg-brand-soft' : 'hover:bg-canvas-subtle',
                                            )}
                                        >
                                            <span className={cn('grid h-8 w-8 flex-none place-items-center rounded-lg', r.id === activeRoleKey ? 'bg-surface text-accent-strong' : 'bg-canvas-subtle text-text-primary')}>
                                                <r.icon className="h-4 w-4" />
                                            </span>
                                            <span>
                                                <span className="block text-xs font-bold text-text-primary">{r.label}</span>
                                                <span className="block text-xs text-text-tertiary">{r.desc}</span>
                                            </span>
                                            {r.id === activeRoleKey && <Check className="ml-auto h-4 w-4 text-accent-strong" />}
                                        </button>
                                    ))}
                                </div>
                            </PopoverShell>
                        )}
                    </div>

                    <div className="mx-2 h-5 w-px flex-none bg-border" />

                    {/* Search */}
                    <DockIconButton icon={Search} label="Search · ⌘K" onClick={() => setSearchOpen(true)} />

                    {/* Assistant */}
                    <DockIconButton icon={Sparkles} label="Assistant" badge onClick={() => setAssistantOpen((v) => !v)} active={assistantOpen} />

                    <div className="mx-2 h-5 w-px flex-none bg-border" />

                    {/* Role-specific primary action */}
                    <DockIconButton
                        icon={currentRole.action.icon}
                        label={currentRole.action.label}
                        onClick={() => runQuickCreate(currentRole.action.qcId)}
                    />

                    {/* Quick capture */}
                    <div className="relative">
                        <DockIconButton icon={Plus} label="Quick Capture" onClick={() => togglePopover('capture')} active={openPopover === 'capture'} />
                        {openPopover === 'capture' && (
                            <QuickCapturePopover
                                role={currentRole}
                                workspaceActions={workspaceActions}
                                quickCaptureItems={viewData.quickCaptureItems}
                                onClose={() => setOpenPopover(null)}
                                onCreate={runQuickCreate}
                                onWorkspaceAction={(a) => { setOpenPopover(null); a.onSelect(); }}
                            />
                        )}
                    </div>

                    {/* Scanner (role-dependent) */}
                    {currentRole.scanner && (
                        <DockIconButton icon={ScanLine} label="Scanner" onClick={() => setScannerOpen(true)} />
                    )}

                    <div className="flex-1" />

                    {/* Scratchpad */}
                    <div className="relative">
                        <DockIconButton icon={NotebookPen} label="Scratchpad" onClick={() => togglePopover('scratchpad')} active={openPopover === 'scratchpad'} />
                        {openPopover === 'scratchpad' && (
                            <ScratchpadPopover onClose={() => setOpenPopover(null)} />
                        )}
                    </div>

                    {/* Support */}
                    <div className="relative">
                        <DockIconButton icon={LifeBuoy} label="Support" onClick={() => togglePopover('support')} active={openPopover === 'support'} />
                        {openPopover === 'support' && (
                            <SupportPopover onClose={() => setOpenPopover(null)} onToast={toast} />
                        )}
                    </div>

                    {/* Health */}
                    <div className="relative ml-1">
                        <button
                            type="button"
                            onClick={() => togglePopover('health')}
                            className="group flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-1 transition-colors hover:bg-surface-inverse/5"
                        >
                            <span className="relative h-6 w-6">
                                <svg width="24" height="24" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="9" fill="none" className="stroke-border-muted" strokeWidth={3} />
                                    <circle
                                        cx="12" cy="12" r="9" fill="none" className="stroke-accent-strong" strokeWidth={3}
                                        strokeLinecap="round" transform="rotate(-90 12 12)"
                                        strokeDasharray={viewData.health.circumference} strokeDashoffset={viewData.health.ringOffset}
                                    />
                                </svg>
                            </span>
                            <span className="text-xs font-extrabold text-text-primary">{viewData.health.score}%</span>
                            <DockTooltip label="Workspace Health" />
                        </button>
                        {openPopover === 'health' && (
                            <HealthPopover health={viewData.health} onClose={() => setOpenPopover(null)} />
                        )}
                    </div>
                </div>
            </div>

            {/* ── MODALS ── */}
            <AssistantPanel
                isOpen={assistantOpen}
                onClose={() => setAssistantOpen(false)}
                onAsk={onAsk}
                suggestions={viewData.suggestedQuestions}
            />
            {searchOpen && (
                <SearchModal
                    items={allSearchItems}
                    onClose={() => setSearchOpen(false)}
                />
            )}
            {scannerOpen && currentRole.scanner && (
                <ScannerModal
                    scanner={currentRole.scanner}
                    onClose={() => setScannerOpen(false)}
                    onConfirm={() => { setScannerOpen(false); toast(currentRole.scanner!.toastLabel); }}
                />
            )}
        </>
    );
}
