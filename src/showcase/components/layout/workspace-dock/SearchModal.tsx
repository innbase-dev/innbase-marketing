import { useState } from 'react';
import { Search } from 'lucide-react';
import type { SearchItem } from './types';

export function SearchModal({ items, onClose }: { items: SearchItem[]; onClose: () => void }) {
    const [query, setQuery] = useState('');
    const filtered = items.filter((it) => it.label.toLowerCase().includes(query.trim().toLowerCase()));

    return (
        <div
            className="fixed inset-0 z-[70] flex items-start justify-center bg-surface-inverse/35 pt-[14vh] backdrop-blur-sm"
            onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
                <div className="flex items-center gap-2 border-b border-border-muted px-4 py-3">
                    <Search className="h-4 w-4 text-text-disabled" />
                    <input
                        autoFocus
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search…"
                        className="flex-1 border-none bg-transparent text-sm outline-none"
                    />
                </div>
                <div className="max-h-80 overflow-y-auto p-1.5">
                    {filtered.length ? (
                        filtered.map((it, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => { onClose(); it.onSelect(); }}
                                className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-text-primary hover:bg-canvas-subtle"
                            >
                                <it.icon className="h-4 w-4 text-text-tertiary" />
                                {it.label}
                            </button>
                        ))
                    ) : (
                        <div className="p-6 text-center text-xs text-text-disabled">No matches.</div>
                    )}
                </div>
            </div>
        </div>
    );
}
