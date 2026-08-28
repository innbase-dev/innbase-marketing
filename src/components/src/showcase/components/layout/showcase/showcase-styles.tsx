/**
 * One shared <style> block for every animation the showcase primitives use.
 * Mount this once per stage (ShowcaseStage does it for you) rather than once
 * per overlay instance, so multiple cursors/spotlights/callouts on screen
 * don't each register their own duplicate keyframes.
 */
export function ShowcaseStyles() {
    return (
        <style>{`
            @keyframes showcase-ping {
                0% { transform: scale(0.4); opacity: 0.9; }
                100% { transform: scale(2.6); opacity: 0; }
            }
            .showcase-cursor-click {
                animation: showcase-ping 700ms ease-out;
            }

            @keyframes showcase-spotlight-pulse {
                0%, 100% { box-shadow: 0 0 0 4px var(--color-accent-strong, #2e5336), 0 0 0 9999px rgba(11, 15, 13, 0.55); }
                50% { box-shadow: 0 0 0 6px var(--color-accent-strong, #2e5336), 0 0 0 9999px rgba(11, 15, 13, 0.55); }
            }
            .showcase-spotlight {
                animation: showcase-spotlight-pulse 1.8s ease-in-out infinite;
            }

            @keyframes showcase-callout-in {
                from { opacity: 0; transform: translateY(4px) scale(0.96); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .showcase-callout {
                animation: showcase-callout-in 300ms ease-out;
            }
        `}</style>
    );
}
