import assert from "node:assert";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import * as prettier from "prettier";
import * as plugin from "../src/index.ts";

const fixturesDir = join(import.meta.dirname, "fixtures");

function matchFileSnapshot(actual: string, file: string): void {
  if (process.env.UPDATE_SNAPSHOTS) {
    writeFileSync(file, actual);
    return;
  }

  assert.strictEqual(actual, readFileSync(file, "utf8"));
}

const fixtureNames = readdirSync(fixturesDir)
  .filter((f) => f.endsWith(".bt"))
  .map((f) => f.slice(0, -".bt".length))
  .sort();

describe("format", () => {
  for (const name of fixtureNames) {
    it(name, async () => {
      const input = readFileSync(join(fixturesDir, `${name}.bt`), "utf8");

      const formatted = await prettier.format(input, {
        parser: "backtick",
        plugins: [plugin],
      });

      matchFileSnapshot(formatted, join(fixturesDir, `${name}.formatted`));

      // Formatting must be idempotent.
      const reformatted = await prettier.format(formatted, {
        parser: "backtick",
        plugins: [plugin],
      });
      assert.strictEqual(reformatted, formatted);
    });
  }
});
