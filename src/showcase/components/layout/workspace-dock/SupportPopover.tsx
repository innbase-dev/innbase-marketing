import { MessageCircle, BookOpen, Bug, LifeBuoy } from 'lucide-react';
import { PopoverShell } from './shared';

export function SupportPopover({ onClose, onToast }: { onClose: () => void; onToast: (m: string) => void }) {
    const items = [
        { id: 'chat', label: 'Chat with support', icon: MessageCircle, toast: 'Opening support chat…' },
        { id: 'help', label: 'Help center', icon: BookOpen, toast: 'Opening the help center…' },
        { id: 'bug', label: 'Report a bug', icon: Bug, toast: 'Bug report started' },
    ];
    return (
        <PopoverShell title="Support" icon={LifeBuoy} onClose={onClose} className="w-64" align="right">
            <div className="p-1.5">
                {items.map((it) => (
                    <button
                        key={it.id}
                        type="button"
                        onClick={() => { onClose(); onToast(it.toast); }}
                        className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs font-semibold text-text-secondary hover:bg-canvas-subtle"
                    >
                        <it.icon className="h-4 w-4 text-text-tertiary" />
                        {it.label}
                    </button>
                ))}
            </div>
            <div className="flex items-center gap-1.5 border-t border-border-muted px-4 py-2.5 text-xs font-semibold text-text-tertiary">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-strong" />
                All systems normal
            </div>
        </PopoverShell>
    );
}
