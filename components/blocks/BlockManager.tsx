"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Blocks,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  Trash2,
  Plus,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useEditMode } from "@/components/cms/EditModeProvider";
import type { BlockType, Section } from "@/types/content";
import { BLOCK_LABELS, BLOCK_DESCRIPTIONS, createDefaultBlock } from "./registry";

type Props = {
  sections: Section[];
  locale: string;
  /** Dot-path to the sections array, e.g. "pages.home.sections" */
  scope: string;
};

type Status = "idle" | "saving" | "saved" | "error";

export function BlockManager({ sections: initial, locale, scope }: Props) {
  const { editMode } = useEditMode();
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [sections, setSections] = useState(initial);
  const [lastInitial, setLastInitial] = useState(initial);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  if (lastInitial !== initial) {
    setLastInitial(initial);
    setSections(initial);
  }

  useEffect(() => {
    if (status !== "saved") return;
    const t = setTimeout(() => setStatus("idle"), 1500);
    return () => clearTimeout(t);
  }, [status]);

  if (!editMode) return null;

  async function saveSections(next: Section[]) {
    setStatus("saving");
    setError(null);
    try {
      const res = await fetch("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: scope, value: next, locale }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setSections(next);
        setStatus("saved");
        router.refresh();
      } else {
        setStatus("error");
        setError(json.error ?? "Speichern fehlgeschlagen");
        setSections(initial);
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Speichern fehlgeschlagen");
      setSections(initial);
    }
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= sections.length) return;
    const next = [...sections];
    [next[index], next[target]] = [next[target], next[index]];
    saveSections(next);
  }

  function remove(index: number) {
    const block = sections[index];
    if (
      !window.confirm(
        `Block "${BLOCK_LABELS[block.type as BlockType] ?? block.type}" wirklich löschen?`,
      )
    )
      return;
    const next = sections.filter((_, i) => i !== index);
    saveSections(next);
  }

  function add(type: BlockType) {
    const block = createDefaultBlock(type);
    const next = [...sections, block];
    saveSections(next);
  }

  function scrollToBlock(id: string) {
    const el = document.getElementById(`block-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <aside className={`fixed left-0 top-0 z-40 h-screen ${open ? "w-80" : "w-10"} transition-all`}>
      <div className="h-full bg-bone/95 backdrop-blur border-r border-line-soft shadow-xl flex flex-col">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="absolute -right-4 top-20 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line-soft bg-bone text-ink-soft shadow-md hover:bg-bone-deep/40 transition"
          aria-label={open ? "Sidebar schliessen" : "Sidebar öffnen"}
        >
          {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>

        {!open ? (
          <div className="flex h-full flex-col items-center pt-6">
            <Blocks className="h-5 w-5 text-mute" />
            <span className="mt-3 [writing-mode:vertical-rl] rotate-180 text-xs font-semibold uppercase tracking-widest text-mute">
              Blöcke
            </span>
          </div>
        ) : (
          <>
            <header className="px-5 pt-5 pb-3 border-b border-line-soft">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-navy text-bone">
                  <Blocks className="h-3.5 w-3.5" />
                </div>
                <h2 className="text-sm font-semibold text-ink">Block-Manager</h2>
              </div>
              <p className="mt-1 text-xs text-mute">{scope}</p>
              <div className="mt-2 flex items-center gap-2 text-xs">
                {status === "saving" && (
                  <span className="inline-flex items-center gap-1 text-mute">
                    <Loader2 className="h-3 w-3 animate-spin" /> Speichert
                  </span>
                )}
                {status === "saved" && (
                  <span className="inline-flex items-center gap-1 text-emerald-700">
                    <CheckCircle2 className="h-3 w-3" /> Gespeichert
                  </span>
                )}
                {status === "error" && (
                  <span className="inline-flex items-center gap-1 text-red-700">
                    <AlertCircle className="h-3 w-3" /> {error ?? "Fehler"}
                  </span>
                )}
                {status === "idle" && (
                  <span className="text-mute">{sections.length} Blöcke</span>
                )}
              </div>
            </header>

            <div className="flex-1 overflow-y-auto">
              <SectionHeader title="Auf dieser Seite" count={sections.length} />
              <ul className="px-3 py-3 space-y-1.5">
                {sections.map((section, i) => {
                  const label = BLOCK_LABELS[section.type as BlockType] ?? section.type;
                  return (
                    <li
                      key={section.id}
                      className="group rounded-lg border border-line-soft bg-bone hover:border-navy/40 transition"
                    >
                      <div className="flex items-center gap-2 px-2.5 py-2">
                        <button
                          type="button"
                          onClick={() => scrollToBlock(section.id)}
                          className="flex flex-1 items-center gap-2 text-left min-w-0"
                        >
                          <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md bg-bone-deep/60 text-ink-soft">
                            <Blocks className="h-3.5 w-3.5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-sm font-medium text-ink truncate">
                              {label}
                            </span>
                            <span className="block text-[10px] uppercase tracking-wider text-mute font-mono">
                              #{i + 1}
                            </span>
                          </span>
                        </button>
                        <div className="flex items-center opacity-0 group-hover:opacity-100 transition">
                          <button
                            type="button"
                            onClick={() => move(i, -1)}
                            disabled={i === 0 || status === "saving"}
                            className="inline-flex h-7 w-7 items-center justify-center rounded text-ink-soft hover:bg-bone-deep/60 disabled:opacity-30 disabled:cursor-not-allowed transition"
                            aria-label="Nach oben"
                            title="Nach oben"
                          >
                            <ArrowUp className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => move(i, 1)}
                            disabled={i === sections.length - 1 || status === "saving"}
                            className="inline-flex h-7 w-7 items-center justify-center rounded text-ink-soft hover:bg-bone-deep/60 disabled:opacity-30 disabled:cursor-not-allowed transition"
                            aria-label="Nach unten"
                            title="Nach unten"
                          >
                            <ArrowDown className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => remove(i)}
                            disabled={status === "saving"}
                            className="inline-flex h-7 w-7 items-center justify-center rounded text-mute hover:bg-red-50 hover:text-red-700 transition"
                            aria-label="Löschen"
                            title="Löschen"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
                {sections.length === 0 && (
                  <li className="text-xs text-mute italic px-2.5 py-3">
                    Noch keine Blöcke. Füge unten einen hinzu.
                  </li>
                )}
              </ul>

              <SectionHeader
                title="Verfügbare Blöcke"
                count={Object.keys(BLOCK_LABELS).length}
              />
              <ul className="px-3 py-3 space-y-1">
                {(Object.keys(BLOCK_LABELS) as BlockType[]).map((type) => (
                  <li key={type}>
                    <button
                      type="button"
                      onClick={() => add(type)}
                      disabled={status === "saving"}
                      className="group flex w-full items-start gap-3 rounded-lg border border-transparent px-2.5 py-2 text-left hover:border-navy/40 hover:bg-bone-deep/40 disabled:opacity-50 disabled:cursor-not-allowed transition"
                      title={`„${BLOCK_LABELS[type]}" am Ende der Seite hinzufügen`}
                    >
                      <span className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-bone-deep/60 text-ink-soft group-hover:bg-navy group-hover:text-bone transition">
                        <Plus className="h-3.5 w-3.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-medium text-ink">
                          {BLOCK_LABELS[type]}
                        </span>
                        <span className="block text-xs text-mute leading-snug">
                          {BLOCK_DESCRIPTIONS[type]}
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

function SectionHeader({ title, count }: { title: string; count: number }) {
  return (
    <div className="sticky top-0 z-10 flex items-baseline justify-between gap-3 border-b border-line-soft bg-bone/95 px-5 py-3 backdrop-blur">
      <h3 className="text-[11px] font-semibold uppercase tracking-widest text-mute">
        {title}
      </h3>
      <span className="text-[10px] text-mute font-mono">{count}</span>
    </div>
  );
}
