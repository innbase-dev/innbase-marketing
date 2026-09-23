import { useSyncExternalStore } from 'react';
function subscribe(notify) { addEventListener('popstate', notify); return () => removeEventListener('popstate', notify); }
export function usePathname() { return useSyncExternalStore(subscribe, () => location.pathname); }
export function useSearchParams() { return new URLSearchParams(useSyncExternalStore(subscribe, () => location.search)); }
