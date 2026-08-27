import { STATUS_LABEL, type Work } from "@/lib/types";

const COLUMNS = "grid-cols-[9fr_4fr_7fr_4fr_9fr]";

export function WorksListView({
  works,
  onSelect,
}: {
  works: Work[];
  onSelect?: (workId: string) => void;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-2 text-xs text-[color:var(--main-text)] lg:w-[701px]">
      <div className={`grid w-full items-start gap-3 ${COLUMNS}`}>
        <span>Name</span>
        <span>Year</span>
        <span>Location</span>
        <span>Status</span>
        <span>Role</span>
      </div>
      <div className="flex w-full flex-col items-start">
        {works.map((work) => (
          <div
            key={work._id}
            role="button"
            tabIndex={0}
            onClick={onSelect ? () => onSelect(work._id) : undefined}
            onKeyDown={(event) => {
              if (!onSelect) return;
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(work._id);
              }
            }}
            className={`grid w-full cursor-pointer items-start gap-3 rounded py-[var(--grid-gutter)] transition-colors duration-300 ease-out hover:bg-[rgba(208,208,208,0.3)] ${COLUMNS}`}
          >
            <span className="break-words">{work.client}</span>
            <span className="break-words">{work.year}</span>
            <span className="break-words">{work.location ?? "—"}</span>
            <span className="break-words">
              {work.status ? STATUS_LABEL[work.status] : "—"}
            </span>
            <span className="break-words">
              {work.role && work.role.length > 0 ? work.role.join(", ") : "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
