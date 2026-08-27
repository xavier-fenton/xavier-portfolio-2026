import type { SanityImageSource } from "@sanity/image-url";

export type GalleryImage = SanityImageSource & {
  dimensions?: { width: number; height: number };
};

export type Work = {
  _id: string;
  client: string;
  year: number;
  status: "live" | "in-progress" | "archived" | null;
  url: string | null;
  coverImage: SanityImageSource;
  tagline: string | null;
  categories: string[] | null;
  location: string | null;
  role: string[] | null;
  gallery: GalleryImage[] | null;
};

export type Profile = {
  name: string;
  role: string;
  location: string;
  bio: string;
  timezone: string;
  timezoneLabel: string | null;
};

export const STATUS_LABEL: Record<NonNullable<Work["status"]>, string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
};
