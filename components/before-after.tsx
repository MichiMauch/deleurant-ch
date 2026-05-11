"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export function BeforeAfter({
  before,
  after,
}: {
  before: string;
  after: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const update = (clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <div
      ref={ref}
      className="relative aspect-[4/5] overflow-hidden select-none touch-none cursor-ew-resize group"
      onMouseMove={(e) => e.buttons === 1 && update(e.clientX)}
      onMouseDown={(e) => update(e.clientX)}
      onTouchMove={(e) => update(e.touches[0].clientX)}
      onTouchStart={(e) => update(e.touches[0].clientX)}
    >
      {/* After image (base) */}
      <Image
        src={after}
        alt="Nachher"
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <Image
          src={before}
          alt="Vorher"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 text-[10px] tracking-widest uppercase text-bone bg-ink/60 backdrop-blur-sm px-2.5 py-1">
        Vorher
      </div>
      <div className="absolute top-4 right-4 text-[10px] tracking-widest uppercase text-bone bg-ink/60 backdrop-blur-sm px-2.5 py-1">
        Nachher
      </div>

      {/* Slider line + handle */}
      <div
        className="absolute top-0 bottom-0 w-px bg-bone shadow-[0_0_0_1px_rgba(0,0,0,0.15)] pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-bone shadow-lg flex items-center justify-center">
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            className="text-ink"
          >
            <path
              d="M5 3 1 7l4 4M9 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="square"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
