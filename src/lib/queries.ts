import { defineQuery } from "next-sanity";

export const profileQuery = defineQuery(`
  *[_type == "profile"][0]{
    name,
    role,
    location,
    bio,
    timezone,
    timezoneLabel
  }
`);

export const worksQuery = defineQuery(`
  *[_type == "work"] | order(coalesce(order, 9999) asc, year desc){
    _id,
    client,
    year,
    status,
    url,
    coverImage,
    tagline,
    categories,
    location,
    gallery[]{
      ...,
      "dimensions": asset->metadata.dimensions
    }
  }
`);
