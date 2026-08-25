import { defineField, defineType } from "sanity";

export const work = defineType({
  name: "work",
  title: "Work",
  type: "document",
  fields: [
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Live", value: "live" },
          { title: "In progress", value: "in-progress" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "live",
    }),
    defineField({
      name: "url",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Lower numbers appear first in the homepage row.",
      type: "number",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "Short description shown on the work's detail page.",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "categories",
      title: "Categories",
      description: "e.g. Design, Development",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      description: "Full-width images shown on the work's detail page.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "client", subtitle: "year", media: "coverImage" },
  },
});
