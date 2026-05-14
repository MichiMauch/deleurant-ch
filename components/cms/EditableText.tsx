"use client";

import { useEffect, useRef, useState } from "react";
import { useEditMode } from "./EditModeProvider";
import { useLocale } from "./LocaleProvider";
import { AIActionsOverlay } from "./AIActionsOverlay";
import { trackSave } from "@/lib/cms/pending-saves";

type Props = {
  path: string;
  value: string;
  as?: React.ElementType;
  className?: string;
  /**
   * Classes applied to the wrapper that anchors the AI overlay. Use this for
   * layout classes (e.g. `col-span-7`, `flex-1`) when the EditableText sits as
   * a direct grid/flex child — otherwise the wrapper is auto-sized to content
   * and the inner element's layout classes never reach the parent layout.
   */
  wrapperClassName?: string;
};

const INLINE_TAGS = new Set(["span", "a", "code", "em", "strong", "small", "b", "i", "u"]);

export function EditableText({
  path,
  value,
  as: Tag = "span",
  className,
  wrapperClassName,
}: Props) {
  const { editMode } = useEditMode();
  const locale = useLocale();
  const ref = useRef<HTMLElement | null>(null);
  const [savedValue, setSavedValue] = useState(value);
  const [lastProp, setLastProp] = useState(value);

  // React 19 idiom: derive state from prop changes during render
  if (lastProp !== value) {
    setLastProp(value);
    setSavedValue(value);
  }

  useEffect(() => {
    if (!editMode) return;
    if (ref.current && ref.current.innerText !== savedValue) {
      ref.current.innerText = savedValue;
    }
  }, [savedValue, editMode]);

  async function handleBlur() {
    const next = (ref.current?.innerText ?? "").replace(/\s+$/, "").replace(/^\s+/, "");
    if (next === savedValue) return;
    try {
      const res = await trackSave(
        fetch("/api/save-content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path, value: next, locale }),
        }),
      );
      if (res.ok) {
        setSavedValue(next);
      }
    } catch {
      // Silently fail; user can retry.
    }
  }

  const innerEditClasses = editMode
    ? "outline outline-2 outline-navy/40 outline-offset-2 rounded-sm focus:outline-navy cursor-text"
    : "";

  const isInline = typeof Tag === "string" && INLINE_TAGS.has(Tag);
  const Wrapper = isInline ? "span" : "div";
  // If the caller passes wrapperClassName, we must use a real display for the
  // wrapper so layout classes (col-span-*, flex-1, …) actually target the
  // wrapper element. Without wrapperClassName, keep `display: contents` in
  // non-edit mode so the wrapper is invisible to layout.
  const useRealLayoutWrapper = editMode || Boolean(wrapperClassName);
  const layoutClass = useRealLayoutWrapper
    ? isInline
      ? "relative inline-block"
      : "relative"
    : "contents";
  const wrapperEditClasses = editMode ? (isInline ? "group align-baseline" : "group") : "";
  const wrapperClass = `${layoutClass} ${wrapperEditClasses}${
    wrapperClassName ? ` ${wrapperClassName}` : ""
  }`.trim();

  return (
    <Wrapper className={wrapperClass}>
      <Tag
        ref={ref}
        className={`${className ?? ""} ${innerEditClasses}`.trim()}
        contentEditable={editMode}
        suppressContentEditableWarning
        onBlur={editMode ? handleBlur : undefined}
        spellCheck={editMode}
      >
        {savedValue}
      </Tag>
      {editMode && (
        <AIActionsOverlay
          path={path}
          value={savedValue}
          onUpdate={(next) => {
            setSavedValue(next);
            if (ref.current) ref.current.innerText = next;
          }}
        />
      )}
    </Wrapper>
  );
}
