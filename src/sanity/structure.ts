import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Profile")
        .child(S.document().schemaType("profile").documentId("profile")),
      S.divider(),
      S.documentTypeListItem("work").title("Works"),
    ]);
