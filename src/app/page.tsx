import { Suspense } from "react";

import { HomeClient } from "@/components/HomeClient";
import { client } from "@/sanity/lib/client";
import { profileQuery, worksQuery } from "@/lib/queries";
import type { Profile, Work } from "@/lib/types";

export const revalidate = 0;

export default async function Home() {
  const [profile, works] = await Promise.all([
    client.fetch<Profile | null>(profileQuery),
    client.fetch<Work[]>(worksQuery),
  ]);

  return (
    <Suspense>
      <HomeClient profile={profile} works={works} />
    </Suspense>
  );
}
