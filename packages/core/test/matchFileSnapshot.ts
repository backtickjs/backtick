import assert from "node:assert";
import { readFileSync, writeFileSync } from "node:fs";

// Compares `actual` against the snapshot at `file`. Run with
// UPDATE_SNAPSHOTS=1 to (re)write the snapshot instead.
export function matchFileSnapshot(actual: string, file: string): void {
  if (process.env.UPDATE_SNAPSHOTS) {
    writeFileSync(file, actual);
    return;
  }

  assert.strictEqual(actual, readFileSync(file, "utf8"));
}
