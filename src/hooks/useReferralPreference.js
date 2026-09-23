"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { parsePreference, preferenceKey } from "@/lib/referralStorage";

const CHANGE_EVENT = "innbase:referral-preference";
const serverSnapshot = () => null;
const subscribe = (notify) => {
  window.addEventListener("storage", notify);
  window.addEventListener(CHANGE_EVENT, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(CHANGE_EVENT, notify);
  };
};

export default function useReferralPreference(userId, name) {
  const key = preferenceKey(userId, name);
  const snapshot = useCallback(() => {
    try { return key ? localStorage.getItem(key) : null; }
    catch { return null; }
  }, [key]);
  const raw = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const value = useMemo(() => parsePreference(raw, name), [raw, name]);
  const save = useCallback((next) => {
    if (!key) return;
    try {
      localStorage.setItem(key, JSON.stringify(next));
      window.dispatchEvent(new Event(CHANGE_EVENT));
    } catch {
      // The API operation remains valid when browser storage is unavailable.
    }
  }, [key]);
  return [value, save];
}
