"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2, Trash2 } from "lucide-react";
import { useEditMode } from "./EditModeProvider";
import { useLocale } from "./LocaleProvider";
import { waitForPendingSaves } from "@/lib/cms/pending-saves";

/**
 * Edit-mode-only button that appends an item to an array stored at `path`
 * (e.g. `pages.home.sections.5.data.items`). After save, the page reloads.
 *
 * Use inside list blocks (FAQ, Wishes, Team, …) to let the editor grow the
 * list without manually editing JSON.
 */
export function EditableListAddButton<T>({
  path,
  items,
  newItem,
  label = "Eintrag hinzufügen",
  className,
}: {
  path: string;
  items: T[];
  newItem: T;
  label?: string;
  className?: string;
}) {
  const { editMode } = useEditMode();
  const locale = useLocale();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!editMode) return null;

  async function add() {
    setSaving(true);
    setError(null);
    try {
      // Flush any in-flight inline edits first (e.g. user typed an answer and
      // immediately clicked "Frage hinzufügen" — the blur-save must land first
      // so our items array contains the latest field values).
      if (typeof document !== "undefined") {
        const active = document.activeElement as HTMLElement | null;
        if (active && typeof active.blur === "function") active.blur();
      }
      await waitForPendingSaves();
      // Re-read the latest items from the server to avoid clobbering field
      // edits that landed concurrently.
      const latest = await readLatestArray(path, locale);
      const value = [...(latest ?? items), newItem];
      const res = await fetch("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, value, locale }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        router.refresh();
      } else {
        setError(json.error ?? "Speichern fehlgeschlagen");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Fehler");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={className ?? ""}>
      <button
        type="button"
        onClick={add}
        disabled={saving}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-navy/40 bg-navy/5 px-4 py-2 text-xs font-medium text-navy hover:bg-navy/10 hover:border-navy disabled:opacity-50 transition"
      >
        {saving ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <Plus className="h-3.5 w-3.5" />
        )}
        {label}
      </button>
      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}

/**
 * Edit-mode-only delete button that removes one item from an array at `path`.
 * Place it inside each rendered item with `confirmLabel` describing the item.
 */
export function EditableListRemoveButton<T>({
  path,
  items,
  index,
  confirmLabel = "Eintrag",
  className,
}: {
  path: string;
  items: T[];
  index: number;
  confirmLabel?: string;
  className?: string;
}) {
  const { editMode } = useEditMode();
  const locale = useLocale();
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  if (!editMode) return null;

  async function remove(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!window.confirm(`${confirmLabel} wirklich löschen?`)) return;
    setSaving(true);
    try {
      if (typeof document !== "undefined") {
        const active = document.activeElement as HTMLElement | null;
        if (active && typeof active.blur === "function") active.blur();
      }
      await waitForPendingSaves();
      const latest = await readLatestArray(path, locale);
      const source = latest ?? items;
      const next = source.filter((_, i) => i !== index);
      const res = await fetch("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, value: next, locale }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        router.refresh();
      } else {
        window.alert(json.error ?? "Speichern fehlgeschlagen");
      }
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Fehler");
    } finally {
      setSaving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={remove}
      onMouseDown={(e) => e.stopPropagation()}
      disabled={saving}
      className={`inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink/85 text-bone shadow ring-1 ring-white/10 hover:bg-red-600 disabled:opacity-50 transition ${className ?? ""}`.trim()}
      title={`${confirmLabel} löschen`}
      aria-label={`${confirmLabel} löschen`}
    >
      {saving ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Trash2 className="h-3 w-3" />
      )}
    </button>
  );
}

async function readLatestArray<T>(path: string, locale: string): Promise<T[] | null> {
  try {
    const res = await fetch(
      `/api/read-content?path=${encodeURIComponent(path)}&locale=${encodeURIComponent(locale)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as { value?: unknown };
    return Array.isArray(json.value) ? (json.value as T[]) : null;
  } catch {
    return null;
  }
}
