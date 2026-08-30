"use client";

import { useState } from "react";

import { WorksGridView } from "@/components/WorksGridView";
import { WorksListView } from "@/components/WorksListView";
import type { Work } from "@/lib/types";

type ViewMode = "grid" | "list";

export function WorksSection({
  works,
  onSelect,
}: {
  works: Work[];
  onSelect?: (workId: string) => void;
}) {
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  return (
    <div className="relative w-full lg:h-full">
      {works.length > 0 && (
        <div className="flex h-5 items-center justify-start gap-2.5 text-xs text-[color:var(--main-text)] lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2">
          <button
            type="button"
            aria-pressed={viewMode === "list"}
            onClick={() => setViewMode("list")}
            className={`cursor-pointer rounded ${viewMode === "list" ? "bg-[rgba(208,208,208,0.3)]" : "opacity-40"}`}
          >
            List
          </button>
          <button
            type="button"
            aria-pressed={viewMode === "grid"}
            onClick={() => setViewMode("grid")}
            className={`cursor-pointer rounded ${viewMode === "grid" ? "bg-[rgba(208,208,208,0.3)]" : "opacity-40"}`}
          >
            Grid
          </button>
        </div>
      )}
      <div className="mt-2 flex w-full flex-col items-start gap-2 lg:absolute lg:top-[calc(50%+18px)] lg:left-0 lg:mt-0">
        {viewMode === "grid" ? (
          <WorksGridView works={works} onSelect={onSelect} />
        ) : (
          <WorksListView works={works} onSelect={onSelect} />
        )}
      </div>
    </div>
  );
}
