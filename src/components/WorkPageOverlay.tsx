"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { MinusButtonIcon } from "@/components/icons/MinusButtonIcon";
import { urlForImage } from "@/sanity/lib/image";
import { STATUS_LABEL, type Work } from "@/lib/types";

const GALLERY_WIDTH = 1364;
const FALLBACK_ASPECT_RATIO = 16 / 10;
const FADE_OUT_MS = 300;

export function WorkPageOverlay({
  work,
  onClose,
}: {
  work: Work;
  onClose: () => void;
}) {
  const [isClosing, setIsClosing] = useState(false);

  function handleClose() {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(onClose, FADE_OUT_MS);
  }

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed inset-0 z-50 overflow-y-auto bg-[color:var(--background)] p-[var(--grid-margin)] ${
        isClosing
          ? "[animation:fade-out_300ms_ease-out_forwards]"
          : "[animation:fade-in_300ms_ease-out]"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1380px] flex-col">
        <div className="relative flex flex-col gap-2 rounded-[4px] bg-[rgba(255,255,255,0.01)] px-2 pt-2 pb-4 backdrop-blur-[11px]">
          <button
            type="button"
            aria-label="Close"
            onClick={handleClose}
            disabled={isClosing}
            className="absolute top-0 right-0 size-5 cursor-pointer disabled:cursor-default"
          >
            <MinusButtonIcon className="size-full" />
          </button>

          <div className="flex flex-col items-start gap-2 text-xs text-[color:var(--main-text)]">
            <p>{work.client}</p>
            {work.tagline && <p className="max-w-[400px]">{work.tagline}</p>}
            {work.categories && work.categories.length > 0 && (
              <div className="flex flex-col items-start">
                {work.categories.map((category) => (
                  <span key={category}>{category}</span>
                ))}
              </div>
            )}
            <p>{work.year}</p>
            {work.status && <p>{STATUS_LABEL[work.status]}</p>}
            {work.location && <p>{work.location}</p>}
          </div>

          {work.gallery && work.gallery.length > 0 && (
            <div className="flex w-full flex-col gap-2">
              {work.gallery.map((image, index) => {
                const width = image.dimensions?.width ?? GALLERY_WIDTH;
                const height =
                  image.dimensions?.height ??
                  Math.round(GALLERY_WIDTH / FALLBACK_ASPECT_RATIO);
                const scaledHeight = Math.round((height / width) * GALLERY_WIDTH);
                const imageUrl = urlForImage(image).width(GALLERY_WIDTH).url();

                return (
                  <div key={index} className="relative w-full overflow-clip rounded-[4px]">
                    <Image
                      src={imageUrl}
                      alt={work.client}
                      width={GALLERY_WIDTH}
                      height={scaledHeight}
                      sizes="(max-width: 1380px) 100vw, 1380px"
                      className="h-auto w-full object-contain"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
