import type { Schema } from "../Schema.js";

// A schema to the document every generator could read.
//
// The one artifact that is not a language: what a target draws, as data, for a
// reader that is not this process — a native build, a diff in review, a
// generator written in something else. Checked in beside the schema it came
// from, so a change to what a target draws is a change someone can see.
//
// Nothing is computed here. That is the point: if this file has to think, the
// schema is carrying less than it should, and the thinking belongs there.

/** What a target draws, as JSON. */
export function json(schema: Schema): string {
  // Written in the order the schema declares them rather than sorted: the
  // source is the readable order, and a diff should read like the edit that
  // caused it.
  return JSON.stringify(schema, null, 2);
}
