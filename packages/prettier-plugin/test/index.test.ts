import assert from "node:assert";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
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

// Backtick now lives as `c`...`` tagged templates inside JS/TS files, so the
// plugin is exercised the way the language server invokes it: by formatting a
// host JS/TS document whose own parser does the work.
const parserByExtension: Record<string, string> = {
  ".ts": "typescript",
  ".tsx": "typescript",
  ".js": "babel",
  ".jsx": "babel",
};

const fixtureNames = readdirSync(fixturesDir)
  .filter((file) => extname(file) in parserByExtension)
  .sort();

describe("format", () => {
  for (const name of fixtureNames) {
    it(name, async () => {
      const input = readFileSync(join(fixturesDir, name), "utf8");
      const parser = parserByExtension[extname(name)];

      const formatted = await prettier.format(input, {
        parser,
        plugins: [plugin],
      });

      matchFileSnapshot(formatted, join(fixturesDir, `${name}.formatted`));

      // Formatting must be idempotent.
      const reformatted = await prettier.format(formatted, {
        parser,
        plugins: [plugin],
      });
      assert.strictEqual(reformatted, formatted);
    });
  }
});
