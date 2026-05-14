"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, Loader2, AlertCircle } from "lucide-react";
import { useEditMode } from "./EditModeProvider";
import { useLocale } from "./LocaleProvider";
import { waitForPendingSaves } from "@/lib/cms/pending-saves";

/**
 * Edit-mode-only floating button that opens the Cloudinary Media Library
 * widget. Editor browses/uploads in their Cloudinary account, picks an asset,
 * and we save its secure_url to messages/<locale>.json at `path`.
 *
 * Parent must be `position: relative` (button is absolutely positioned).
 */
type Props = {
  path: string;
  /** Hint passed to the Media Library widget; default is image. */
  resourceType?: "image" | "video" | "raw";
  label?: string;
  className?: string;
};

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

export function EditableMediaButton({
  path,
  resourceType = "image",
  label = "Bild ersetzen",
  className,
}: Props) {
  const { editMode } = useEditMode();
  const locale = useLocale();
  const router = useRouter();
  const widgetRef = useRef<MediaLibraryInstance | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!editMode) return null;

  function ensureWidget(): MediaLibraryInstance | null {
    if (widgetRef.current) return widgetRef.current;
    if (typeof window === "undefined" || !window.cloudinary) return null;
    if (!CLOUD_NAME || !API_KEY) return null;

    widgetRef.current = window.cloudinary.createMediaLibrary(
      {
        cloud_name: CLOUD_NAME,
        api_key: API_KEY,
        multiple: false,
        max_files: 1,
        insert_caption: "Auswählen",
      },
      {
        insertHandler: async (data) => {
          const asset = data.assets[0];
          if (!asset) return;
          setSaving(true);
          setError(null);
          try {
            await waitForPendingSaves();
            const res = await fetch("/api/save-content", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ path, value: asset.secure_url, locale }),
            });
            const json = await res.json();
            if (res.ok && json.ok) {
              router.refresh();
            } else {
              setError(json.error ?? "Speichern fehlgeschlagen");
            }
          } catch (err) {
            setError(err instanceof Error ? err.message : "Speichern fehlgeschlagen");
          } finally {
            setSaving(false);
          }
        },
      },
    );
    return widgetRef.current;
  }

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (saving) return;
    if (!CLOUD_NAME || !API_KEY) {
      setError("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME / _API_KEY fehlt in .env.local");
      return;
    }
    const w = ensureWidget();
    if (!w) {
      setError("Cloudinary-Widget lädt noch — kurz warten und nochmal klicken.");
      return;
    }
    setError(null);
    w.show({ default_search: { resource_type: resourceType } });
  }

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        onMouseDown={(e) => e.stopPropagation()}
        disabled={saving}
        className={`absolute top-3 right-3 z-[60] inline-flex items-center gap-2 rounded-full bg-ink/85 px-3 py-2 text-xs font-medium text-bone shadow-lg ring-1 ring-white/10 backdrop-blur transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60 ${className ?? ""}`.trim()}
        title={label}
      >
        {saving ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : (
          <ImageIcon className="h-3.5 w-3.5" />
        )}
        <span>{saving ? "Speichert …" : label}</span>
      </button>

      {error && (
        <div className="absolute top-14 right-3 z-[60] flex max-w-sm items-start gap-2 rounded-md bg-red-600 px-3 py-1.5 text-xs text-white shadow-lg">
          <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </>
  );
}
