import type { SourceLocation } from "../cs-runtime/index.js";

// A stable string key for a source location, used to deduplicate client scripts
// by where they were written. Two scripts parsed from the same span are the same
// function-table entry.
export function locKey(loc: SourceLocation): string {
  return `${loc.path}:${loc.start.line}:${loc.start.character}:${loc.end.line}:${loc.end.character}`;
}
