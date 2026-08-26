import { builtins } from "./generators/builtins.js";
import { declarations } from "./generators/declarations.js";
import { json } from "./generators/json.js";

/**
 * What a schema can be turned into.
 *
 * One schema, many readers: the TypeScript an app writes against, the document
 * a generator that is not this process reads, and whatever a target comes to
 * need. Gathered here so what a schema is worth is one list rather than a
 * spreading set of exports.
 */
export const generate = {
  builtins,
  declarations,
  json,
};
