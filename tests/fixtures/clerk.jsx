import { useSyncExternalStore } from 'react';
// Isolated SDK boundary, never imported by the production application.
function subscribe(notify) { addEventListener('fixture-user', notify); return () => removeEventListener('fixture-user', notify); }
export function useAuth() {
  const userId = useSyncExternalStore(subscribe, () => document.cookie.match(/qa-user=([^;]+)/)?.[1] || 'user_a');
  return { isLoaded: true, isSignedIn: userId !== 'signedout', userId: userId === 'signedout' ? null : userId };
}
export function useClerk() {
  return { signOut: async (options) => {
    window.__signOutCalls = [...(window.__signOutCalls || []), options];
    if (new URLSearchParams(location.search).get('signout') === 'fail') throw new Error('Fixture sign-out failure');
    location.assign(options.redirectUrl);
  } };
}
