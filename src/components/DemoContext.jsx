"use client";

import { createContext, useCallback, useContext, useState } from "react";

const DemoContext = createContext(null);

export const DEMO_ORDER = ["payments", "inventory", "shift", "guests"];

export function DemoProvider({ children }) {
  const [activeDemo, setActiveDemo] = useState("payments");
  const [userTouched, setUserTouched] = useState(false);

  const activateDemo = useCallback((key, userInitiated = false) => {
    if (userInitiated) setUserTouched(true);
    setActiveDemo(key);
  }, []);

  return (
    <DemoContext.Provider value={{ activeDemo, activateDemo, userTouched, setUserTouched }}>
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within a DemoProvider");
  return ctx;
}
