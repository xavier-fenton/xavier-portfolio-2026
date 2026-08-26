import Image from "next/image";

import { urlForImage } from "@/sanity/lib/image";
import { STATUS_LABEL, type Work } from "@/lib/types";

export function WorkCard({
  work,
  fadeOut = false,
  onSelect,
}: {
  work: Work;
  fadeOut?: boolean;
  onSelect?: () => void;
}) {
  const imageUrl = urlForImage(work.coverImage).width(902).height(562).url();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect?.();
        }
      }}
      className={`flex w-[calc(100vw-var(--grid-margin)*2)] shrink-0 cursor-pointer flex-col gap-2 rounded pt-[var(--grid-gutter)] pb-[var(--grid-margin)] px-2 transition-colors duration-300 ease-out hover:bg-[rgba(208,208,208,0.3)] lg:w-[451px] ${
        fadeOut
          ? "[animation:fade-out_300ms_ease-out_forwards]"
          : "[animation:fade-in_300ms_ease-out]"
      }`}
    >
      <div className="relative aspect-[451/281] w-full overflow-clip rounded">
        <Image
          src={imageUrl}
          alt={work.client}
          fill
          sizes="(max-width: 1023px) calc(100vw - 60px), 451px"
          className="object-cover"
        />
      </div>
      <div className="flex w-full items-end justify-between text-xs text-[color:var(--main-text)]">
        <span>{work.client}</span>
        <span>{work.year}</span>
      </div>
      <div className="text-xs text-[color:var(--main-text)]">
        {work.status ? STATUS_LABEL[work.status] : null}
      </div>
    </div>
  );
}
