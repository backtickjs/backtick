import assert from "node:assert";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, it } from "node:test";
import ts from "typescript";
import { transpile } from "../../dist/compiler/transpile.js";
import { virtualize } from "../../dist/compiler/virtualize.js";

const fixturesDir = join(import.meta.dirname, "fixtures");

const COMPILER_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  sourceMap: false,
};

function matchFileSnapshot(actual: string, file: string): void {
  if (process.env.UPDATE_SNAPSHOTS) {
    writeFileSync(file, actual);
    return;
  }

  assert.strictEqual(actual, readFileSync(file, "utf8"));
}

const sourceExtensions = [".ts", ".tsx", ".jsx"];

const fixtureNames = readdirSync(fixturesDir)
  .filter(
    (file) =>
      sourceExtensions.includes(extname(file)) &&
      !file.includes(".virtual.tsx"),
  )
  .sort();

describe("compile", () => {
  for (const fileName of fixtureNames) {
    it(fileName, () => {
      const base = fileName.slice(0, -extname(fileName).length);
      const sourceText = readFileSync(join(fixturesDir, fileName), "utf8");

      matchFileSnapshot(
        virtualize(ts, fileName, sourceText).virtualCode,
        join(fixturesDir, `${base}.virtual.tsx`),
      );
      matchFileSnapshot(
        transpile(ts, fileName, sourceText, COMPILER_OPTIONS).outputText,
        join(fixturesDir, `${base}.js`),
      );
    });
  }
});

describe("print", () => {
  for (const name of fixtureNames) {
    it(name, () => {
      const base = name.slice(0, -extname(name).length);

      // The compiled fixture calls print(script) at module scope, writing the
      // stringified client script to stdout. Run it in its own process so we
      // capture only the fixture's output (not the test runner's).
      const output = execFileSync(
        process.execPath,
        [join(fixturesDir, `${base}.js`)],
        { encoding: "utf8" },
      );

      matchFileSnapshot(output, join(fixturesDir, `${base}.stringify`));
    });
  }
});
