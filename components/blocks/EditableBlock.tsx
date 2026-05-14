"use client";

import { useEditMode } from "@/components/cms/EditModeProvider";

type Props = {
  id: string;
  type: string;
  index: number;
  children: React.ReactNode;
};

export function EditableBlock({ id, type, index, children }: Props) {
  const { editMode } = useEditMode();

  return (
    <div
      id={`block-${id}`}
      data-block-id={id}
      data-block-type={type}
      className={
        editMode
          ? "relative outline outline-2 outline-dashed outline-transparent hover:outline-navy/40 transition group/block scroll-mt-20"
          : "contents"
      }
    >
      {editMode && (
        <span className="pointer-events-none absolute top-2 left-2 z-20 inline-flex items-center gap-1 rounded-full bg-navy px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-bone opacity-0 group-hover/block:opacity-100 transition shadow-md">
          {type}
          <span className="text-bone/60 font-normal">#{index + 1}</span>
        </span>
      )}
      {children}
    </div>
  );
}
