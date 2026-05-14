"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

type EditModeContextValue = {
  editMode: boolean;
  toggle: () => void;
};

export const EditModeContext = createContext<EditModeContextValue | null>(null);

type ProviderProps = {
  children: React.ReactNode;
  /**
   * When false (anonymous visitor), Alt+E is ignored and edit chrome stays
   * off. Server-side `isEditor()` decides this based on the auth cookie.
   */
  enabled?: boolean;
};

export function EditModeProvider({ children, enabled = true }: ProviderProps) {
  const [editMode, setEditMode] = useState(false);

  const toggle = useCallback(() => {
    if (!enabled) return;
    setEditMode((v) => !v);
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    function onKey(e: KeyboardEvent) {
      if (e.altKey && e.code === "KeyE") {
        e.preventDefault();
        setEditMode((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled]);

  return (
    <EditModeContext.Provider value={{ editMode: enabled && editMode, toggle }}>
      {children}
    </EditModeContext.Provider>
  );
}

export function useEditMode(): EditModeContextValue {
  const ctx = useContext(EditModeContext);
  if (!ctx) {
    return { editMode: false, toggle: () => {} };
  }
  return ctx;
}
