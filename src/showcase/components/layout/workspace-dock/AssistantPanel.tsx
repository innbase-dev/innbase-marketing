import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Loader2, Send } from 'lucide-react';
import { cn } from './shared';

export function AssistantPanel({
    isOpen, onClose, onAsk, suggestions,
}: { isOpen: boolean; onClose: () => void; onAsk?: (q: string) => string | Promise<string>; suggestions: string[] }) {
    const [thread, setThread] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, [thread, loading]);

    const ask = async (question: string) => {
        setThread((t) => [...t, { role: 'user', text: question }]);
        setLoading(true);
        try {
            const answer = onAsk
                ? await onAsk(question)
                : `I can only answer from what's on this board right now — try one of the suggestions above.`;
            setThread((t) => [...t, { role: 'bot', text: answer }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div 
                ref={backdropRef}
                className={`fixed inset-0 bg-surface-inverse/40 backdrop-blur-1 z-60 transition-opacity duration-270 ease-in-out ${!isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                onClick={onClose}
            />
            <aside 
                className={`fixed top-0 right-0 bottom-0 w-105 max-w-[94vw] bg-surface z-61 shadow-drawer flex flex-col border-l border-border transition-transform duration-270 ease-[cubic-bezier(.2,.8,.3,1)] ${!isOpen ? 'translate-x-[105%]' : 'translate-x-0'}`} 
                role="dialog"
                aria-label="Assistant"
            >
                <div className="flex items-center gap-1.5 py-4.5 px-5.5 border-b border-border-muted shrink-0">
                    <Sparkles className="h-5 w-5 text-accent-strong shrink-0" />
                    <span className="font-bold text-sm text-text-primary">Assistant</span>
                    <button type="button" aria-label="Close" onClick={onClose} className="w-7.5 h-7.5 rounded-md grid place-items-center text-text-tertiary hover:bg-canvas hover:text-text-primary ml-auto">
                        <X className="w-3.75 h-3.75" />
                    </button>
                </div>
                
                <div ref={scrollRef} className="flex-1 overflow-y-auto pt-5 px-5.5 pb-6">
                    {thread.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center py-10">
                            <div className="w-16 h-16 rounded-2xl bg-canvas-subtle grid place-items-center mb-5">
                                <Sparkles className="h-8 w-8 text-accent-strong" />
                            </div>
                            <h3 className="text-base font-bold text-text-primary mb-2">How can I help?</h3>
                            <p className="text-xs text-text-secondary leading-relaxed mb-8 max-w-65">
                                Ask about what's on screen — my answers are grounded in this workspace.
                            </p>
                            
                            <div className="w-full space-y-2">
                                {suggestions.map((s) => (
                                    <button
                                        key={s}
                                        type="button"
                                        onClick={() => ask(s)}
                                        className="w-full text-left rounded-xl border border-border bg-surface p-3.5 text-xs font-medium text-text-secondary hover:border-accent hover:bg-canvas-subtle transition-colors flex items-center justify-between group"
                                    >
                                        <span>{s}</span>
                                        <div className="w-6 h-6 rounded-full bg-surface-inverse/5 group-hover:bg-surface-inverse/10 grid place-items-center opacity-0 group-hover:opacity-100 transition-all">
                                            <Send className="w-3 h-3 text-text-primary" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {thread.map((m, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        'max-w-[88%] rounded-4.5 px-4 py-3 text-sm leading-relaxed',
                                        m.role === 'user'
                                            ? 'self-end rounded-br-1.5 bg-surface-inverse text-text-inverse shadow-sm'
                                            : 'self-start rounded-bl-1.5 bg-canvas border border-border text-text-primary shadow-sm',
                                    )}
                                >
                                    {m.text}
                                </div>
                            ))}
                            {loading && (
                                <div className="flex items-center gap-2 self-start rounded-4.5 rounded-bl-1.5 bg-canvas border border-border px-4 py-3 text-xs text-text-tertiary">
                                    <Loader2 className="h-4 w-4 animate-spin text-accent-strong" /> Thinking…
                                </div>
                            )}
                        </div>
                    )}
                </div>
                
                <form
                    className="p-4 border-t border-border bg-surface shrink-0"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const v = input.trim();
                        if (!v) return;
                        setInput('');
                        ask(v);
                    }}
                >
                    <div className="relative flex items-center bg-canvas rounded-3.5 border border-border focus-within:border-accent focus-within:ring-1 focus-within:ring-accent transition-all p-1.5 shadow-sm">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask a question..."
                            className="flex-1 bg-transparent px-3 py-2 text-sm text-text-primary outline-none placeholder:text-text-disabled"
                        />
                        <button 
                            type="submit" 
                            disabled={!input.trim()}
                            aria-label="Send" 
                            className="w-8.5 h-8.5 flex-none rounded-2.5 bg-surface-inverse text-text-inverse grid place-items-center hover:bg-surface-inverse/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm ml-1"
                        >
                            <Send className="h-3.75 w-3.75" />
                        </button>
                    </div>
                </form>
            </aside>
        </>
    );
}
