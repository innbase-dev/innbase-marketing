import { useState } from 'react';
import { NotebookPen } from 'lucide-react';
import { PopoverShell } from './shared';

export function ScratchpadPopover({ onClose }: { onClose: () => void }) {
    const [text, setText] = useState('');
    return (
        <PopoverShell title="Scratchpad" icon={NotebookPen} onClose={onClose} className="w-72" align="right">
            <div className="p-4">
                <textarea
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Shift notes… e.g. escalate INC-233 to HR, follow up with Room 410."
                    className="min-h-36 w-full resize-y rounded-lg border border-border bg-canvas-subtle p-3 text-xs outline-none focus:border-accent focus:bg-surface"
                />
                <div className="mt-2 flex items-center justify-between text-xs text-text-disabled">
                    <span>Not saved to any record</span>
                    <span>{text ? 'Saved to session' : 'Session only'}</span>
                </div>
            </div>
        </PopoverShell>
    );
}
