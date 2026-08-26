"use client";

import { useState } from "react";

import { WorkCard } from "@/components/WorkCard";
import { AddButtonIcon } from "@/components/icons/AddButtonIcon";
import { MinusButtonIcon } from "@/components/icons/MinusButtonIcon";
import type { Work } from "@/lib/types";

const FADE_OUT_MS = 300;

export function WorksRow({
  works,
  onSelect,
}: {
  works: Work[];
  onSelect?: (workId: string) => void;
}) {
  const [revealedCount, setRevealedCount] = useState(Math.min(1, works.length));
  const [isRemoving, setIsRemoving] = useState(false);
  const visibleWorks = works.slice(0, revealedCount);

  const canAdd = revealedCount < works.length;
  const canRemove = revealedCount >= 2;
  const minusFadingOut = isRemoving && revealedCount === 2;

  function handleAdd() {
    if (!canAdd) return;
    setRevealedCount((count) => count + 1);
  }

  function handleRemove() {
    if (!canRemove || isRemoving) return;
    setIsRemoving(true);
    setTimeout(() => {
      setRevealedCount((count) => count - 1);
      setIsRemoving(false);
    }, FADE_OUT_MS);
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="relative">
        <div className="flex max-w-full items-start justify-end gap-3 overflow-x-auto">
          {visibleWorks.map((work, index) => (
            <WorkCard
              key={work._id}
              work={work}
              fadeOut={isRemoving && index === visibleWorks.length - 1}
              onSelect={onSelect ? () => onSelect(work._id) : undefined}
            />
          ))}
        </div>
        {revealedCount >= 3 && (
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-12 z-10 backdrop-blur-md [-webkit-mask-image:linear-gradient(to_right,black_0%,black_40%,transparent_60%)] [mask-image:linear-gradient(to_right,black_0%,black_40%,transparent_60%)]"
          />
        )}
      </div>
      {works.length > 0 && (
        <div className="flex h-5 items-center justify-end gap-2.5">
          {canRemove && (
            <button
              type="button"
              aria-label="Hide the last work from this view"
              onClick={handleRemove}
              disabled={isRemoving}
              className={`block size-5 shrink-0 cursor-pointer disabled:cursor-default ${
                minusFadingOut
                  ? "[animation:fade-out_300ms_ease-out_forwards]"
                  : "[animation:fade-in_300ms_ease-out]"
              }`}
            >
              <MinusButtonIcon className="size-full" />
            </button>
          )}
          <button
            type="button"
            aria-label="Show the next work"
            onClick={handleAdd}
            disabled={!canAdd}
            className="block size-5 shrink-0 cursor-pointer disabled:cursor-default disabled:opacity-40"
          >
            <AddButtonIcon className="size-full" />
          </button>
        </div>
      )}
    </div>
  );
}
