import { useState } from 'react';
import { Search, Plus } from 'lucide-react';
import { PopoverShell, cn } from './shared';
import type { WorkspaceAction } from './types';
import type { DockRole, QuickCreateItem } from '../../../queries/useWorkspaceDock';

export function QuickCapturePopover({
    role, workspaceActions, quickCaptureItems, onClose, onCreate, onWorkspaceAction,
}: {
    role: DockRole;
    workspaceActions: WorkspaceAction[];
    quickCaptureItems: QuickCreateItem[];
    onClose: () => void;
    onCreate: (id: string) => void;
    onWorkspaceAction: (a: WorkspaceAction) => void;
}) {
    const [query, setQuery] = useState('');
    const q = query.trim().toLowerCase();

    // Minor local UI filtering is fine for search inputs
    const filteredActions = workspaceActions.filter((a) => !q || a.label.toLowerCase().includes(q));
    const filteredCreateItems = quickCaptureItems.filter(item => !q || item.label.toLowerCase().includes(q));

    return (
        <PopoverShell title="Quick Capture" icon={Plus} onClose={onClose} className="w-80" align="right">
            <div className="flex items-center gap-2 border-b border-border-muted px-3.5 py-2.5">
                <Search className="h-4 w-4 text-text-disabled" />
                <input
                    autoFocus
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Quick capture…"
                    className="flex-1 border-none bg-transparent text-sm outline-none"
                />
            </div>
            <div className="max-h-80 overflow-y-auto">
                {filteredActions.length > 0 && (
                    <>
                        <div className="px-3.5 pb-1 pt-2.5 text-xs font-bold uppercase tracking-wider text-text-disabled">This workspace</div>
                        <div className="grid grid-cols-2 gap-1 px-2 pb-2">
                            {filteredActions.map((a) => (
                                <button
                                    key={a.id}
                                    type="button"
                                    onClick={() => onWorkspaceAction(a)}
                                    className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-semibold text-text-secondary hover:bg-canvas-subtle"
                                >
                                    <a.icon className="h-4 w-4 flex-none text-text-tertiary" />
                                    {a.label}
                                </button>
                            ))}
                        </div>
                    </>
                )}
                {filteredCreateItems.length > 0 ? (
                    <>
                        <div className="px-3.5 pb-1 pt-2.5 text-xs font-bold uppercase tracking-wider text-text-disabled">Create new</div>
                        <div className="grid grid-cols-2 gap-1 px-2 pb-2">
                            {filteredCreateItems.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => onCreate(item.id)}
                                    className={cn(
                                        'flex items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-semibold text-text-secondary hover:bg-canvas-subtle',
                                        item.isSuggested && 'bg-brand-soft',
                                    )}
                                >
                                    <item.icon className={cn('h-4 w-4 flex-none', item.isSuggested ? 'text-accent-strong' : 'text-text-tertiary')} />
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </>
                ) : filteredActions.length === 0 ? (
                    <div className="p-6 text-center text-xs text-text-disabled">Nothing matches &ldquo;{query}&rdquo;.</div>
                ) : null}
            </div>
        </PopoverShell>
    );
}
