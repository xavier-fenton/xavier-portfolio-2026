import { defineField, defineType } from "sanity";

export const profile = defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "timezone",
      title: "Timezone",
      description: "IANA timezone used for the live clock, e.g. Pacific/Auckland",
      type: "string",
      initialValue: "Pacific/Auckland",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "timezoneLabel",
      title: "Timezone label",
      description: "Display label, e.g. Tāmaki Makaurau time",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
