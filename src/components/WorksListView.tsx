import { STATUS_LABEL, type Work } from "@/lib/types";

const COLUMNS = "grid-cols-[9fr_4fr_7fr_4fr_9fr]";
const FADE_DURATION_MS = 300;
const HEADER_START_MS = 300;
const ROW_STAGGER_MS = 500;
const HEADER_LABELS = ["Name", "Year", "Location", "Status", "Role"];
const HEADER_END_MS = HEADER_START_MS + FADE_DURATION_MS;

function roleLabel(work: Work) {
  if (work.role && work.role.length > 0) return work.role.join(", ");
  if (work.categories && work.categories.length > 0) return work.categories.join(", ");
  return "—";
}

export function WorksListView({
  works,
  onSelect,
}: {
  works: Work[];
  onSelect?: (workId: string) => void;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-2 text-xs text-[color:var(--main-text)] lg:w-[701px]">
      <div
        style={{ animationDelay: `${HEADER_START_MS}ms` }}
        className={`grid w-full items-start gap-3 [animation:fade-in_300ms_ease-out_both] ${COLUMNS}`}
      >
        {HEADER_LABELS.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <div className="flex w-full flex-col items-start">
        {works.map((work, index) => (
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
            style={{ animationDelay: `${HEADER_END_MS + index * ROW_STAGGER_MS}ms` }}
            className={`grid w-full cursor-pointer items-start gap-3 rounded py-[var(--grid-gutter)] transition-colors duration-300 ease-out hover:bg-[rgba(208,208,208,0.3)] [animation:fade-in_300ms_ease-out_both] ${COLUMNS}`}
          >
            <span className="break-words">{work.client}</span>
            <span className="break-words">{work.year}</span>
            <span className="break-words">{work.location ?? "—"}</span>
            <span className="break-words">
              {work.status ? STATUS_LABEL[work.status] : "—"}
            </span>
            <span className="break-words">{roleLabel(work)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
