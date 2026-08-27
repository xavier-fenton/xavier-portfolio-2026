"use client";

import { useState } from "react";

import { LiveClock } from "@/components/LiveClock";
import { WorkPageOverlay } from "@/components/WorkPageOverlay";
import { WorksSection } from "@/components/WorksSection";
import type { Profile, Work } from "@/lib/types";

export function HomeClient({
  profile,
  works,
}: {
  profile: Profile | null;
  works: Work[];
}) {
  const [selectedWorkId, setSelectedWorkId] = useState<string | null>(null);
  const selectedWork = works.find((work) => work._id === selectedWorkId) ?? null;

  return (
    <>
      <main className="flex min-h-screen items-start justify-center bg-[color:var(--background)] p-[var(--grid-margin)] lg:items-center">
        <div className="grid w-full max-w-[1380px] grid-cols-1 gap-6 lg:h-[calc(100dvh_-_var(--grid-margin)*2)] lg:grid-cols-12 lg:gap-x-3 lg:gap-y-0">
          <div className="relative w-full lg:col-span-3 lg:col-start-1 lg:h-full">
            <div className="flex h-5 items-center text-xs text-[color:var(--main-text)] lg:absolute lg:top-1/2 lg:left-0 lg:-translate-y-1/2">
              <p>{profile?.name ?? "Add your name in Studio"}</p>
            </div>
            <div className="flex w-full flex-col items-start gap-4 lg:absolute lg:left-0 lg:top-[calc(50%+10px)]">
              <div className="flex flex-col items-start text-xs text-[color:var(--main-text)]">
                <p>{profile?.role ?? "Add your role in Studio"}</p>
                <p>{profile?.location ?? "Add your location in Studio"}</p>
              </div>
              <div className="flex flex-col items-start gap-4">
                <p className="text-xs text-[color:var(--main-text)]">
                  {profile?.bio ?? "Add a bio in Sanity Studio."}
                </p>
                {profile?.timezone && (
                  <LiveClock
                    timezone={profile.timezone}
                    label={profile.timezoneLabel ?? "Local time"}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="relative w-full lg:col-span-8 lg:col-start-5 lg:h-full">
            <WorksSection works={works} onSelect={setSelectedWorkId} />
          </div>
        </div>
      </main>

      {selectedWork && (
        <WorkPageOverlay
          work={selectedWork}
          onClose={() => setSelectedWorkId(null)}
        />
      )}
    </>
  );
}
