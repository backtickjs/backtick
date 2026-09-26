import { readFileSync } from "node:fs";
import { join } from "node:path";

// The test directories and files not yet moved to the new pipeline, skipped
// until they are (see `unported.json`): while the flip is under way, a run is
// green for what has moved, and the list says what has not.
export const unported: ReadonlySet<string> = new Set(
  JSON.parse(
    readFileSync(join(import.meta.dirname, "..", "unported.json"), "utf8"),
  ) as string[],
);

// Whether a path under `test/` has moved: neither it nor a directory holding
// it is listed.
export function isPorted(path: string): boolean {
  const segments = path.split(/[\\/]/);
  return !segments.some((_, index) =>
    unported.has(segments.slice(0, index + 1).join("/")),
  );
}
