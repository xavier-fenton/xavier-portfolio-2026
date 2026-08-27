import { WorkCard } from "@/components/WorkCard";
import type { Work } from "@/lib/types";

export function WorksGridView({
  works,
  onSelect,
}: {
  works: Work[];
  onSelect?: (workId: string) => void;
}) {
  return (
    <div className="grid w-full grid-cols-1 sm:grid-cols-2">
      {works.map((work, index) => (
        <WorkCard
          key={work._id}
          work={work}
          staggerIndex={index}
          onSelect={onSelect ? () => onSelect(work._id) : undefined}
        />
      ))}
    </div>
  );
}
