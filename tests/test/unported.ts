import { readFileSync } from "node:fs";
import { join } from "node:path";

// The test directories not yet moved to the new pipeline, skipped until they
// are (see `unported.json`): while the flip is under way, a run is green for
// what has moved, and the list says what has not.
export const unported: ReadonlySet<string> = new Set(
  JSON.parse(
    readFileSync(join(import.meta.dirname, "..", "unported.json"), "utf8"),
  ) as string[],
);

// Whether a path under `test/` is in a directory that has moved.
export function isPorted(path: string): boolean {
  const [directory] = path.split(/[\\/]/);
  return !unported.has(directory!);
}
