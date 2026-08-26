"use client";

import { useState } from "react";

import { LiveClock } from "@/components/LiveClock";
import { WorkPageOverlay } from "@/components/WorkPageOverlay";
import { WorksRow } from "@/components/WorksRow";
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
      <main className="flex min-h-screen items-center justify-center bg-[color:var(--background)] p-[var(--grid-margin)]">
        <div className="relative flex w-full max-w-[1380px] flex-1 items-center justify-end">
          <div className="fixed top-[var(--grid-margin)] left-[var(--grid-margin)] right-[var(--grid-margin)] z-10 flex flex-col items-start lg:absolute lg:top-1/2 lg:right-auto lg:left-0 lg:w-[452px] lg:-translate-y-1/2">
            <div className="flex flex-col items-start gap-4">
              <div className="flex flex-col items-start text-xs text-[color:var(--main-text)]">
                <p>{profile?.name ?? "Add your name in Studio"}</p>
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

          <div className="relative z-0">
            <WorksRow works={works} onSelect={setSelectedWorkId} />
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
