import type { SchemaTypeDefinition } from "sanity";

import { profile } from "./profile";
import { work } from "./work";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [profile, work],
};
