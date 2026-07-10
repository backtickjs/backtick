import type { SourceLocation } from "../cs-runtime/index.js";

// A stable string key for a script's source location, used to deduplicate
// client scripts by where they were written. Two scripts parsed from the same
// span are the same function-table entry. The script's file hash is part of
// the key because a path and span alone can recur across codebases: without
// it, two libraries each compiled against their own root could collide at,
// say, `src/index.ts:1:1` and silently share one entry. With the hash, keys
// collide only when the files' contents are identical, in which case the
// scripts are the same and sharing is correct.
export function locKey(fileHash: string, loc: SourceLocation): string {
  return `${fileHash}:${loc.path}:${loc.start.line}:${loc.start.character}:${loc.end.line}:${loc.end.character}`;
}
