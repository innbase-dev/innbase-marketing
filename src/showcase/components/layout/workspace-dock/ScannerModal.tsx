import { X } from 'lucide-react';
import type { DockRole } from '../../../queries/useWorkspaceDock';

export function ScannerModal({
    scanner, onClose, onConfirm,
}: { scanner: NonNullable<DockRole['scanner']>; onClose: () => void; onConfirm: () => void }) {
    return (
        <div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-surface-inverse/50 backdrop-blur-sm"
            onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="w-96 max-w-[92vw] rounded-3xl bg-surface-inverse p-6 pb-5 text-center text-text-inverse shadow-2xl">
                <div className="relative mb-4 grid h-48 w-full place-items-center overflow-hidden rounded-2xl bg-surface-inverse">
                    <span className="absolute left-3 top-3 h-6 w-6 rounded-tl-md border-l-0.75 border-t-0.75 border-accent-strong" />
                    <span className="absolute right-3 top-3 h-6 w-6 rounded-tr-md border-r-0.75 border-t-0.75 border-accent-strong" />
                    <span className="absolute bottom-3 left-3 h-6 w-6 rounded-bl-md border-b-0.75 border-l-0.75 border-accent-strong" />
                    <span className="absolute bottom-3 right-3 h-6 w-6 rounded-br-md border-b-0.75 border-r-0.75 border-accent-strong" />
                    <span
                        className="absolute left-3 right-3 top-3 h-0.5 animate-[scan_1.8s_ease-in-out_infinite] bg-accent-strong"
                        style={{ boxShadow: '0 0 12px var(--color-accent-strong)' }}
                    />
                    <scanner.icon className="relative z-0 h-8 w-8 text-text-secondary" />
                </div>
                <h3 className="mb-1 text-sm font-bold text-text-inverse">{scanner.title}</h3>
                <p className="mb-6 text-xs text-text-disabled">{scanner.sub}</p>
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-11 flex-1 items-center justify-center rounded-xl bg-surface/10 text-sm font-bold transition-colors hover:bg-surface/20"
                    >
                        <X className="mr-1.5 h-4 w-4" /> Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex h-11 flex-1 items-center justify-center rounded-xl bg-accent-strong text-sm font-bold transition-opacity hover:opacity-90"
                    >
                        Simulate Scan
                    </button>
                </div>
            </div>
        </div>
    );
}
