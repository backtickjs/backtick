import assert from "node:assert";
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, it } from "node:test";
import ts from "typescript";
import { transform } from "../../dist/compiler/transform.js";
import { virtualize } from "../../dist/compiler/virtualize.js";
import { renderDiagnostics } from "./renderDiagnostics.ts";
import { renderMappings } from "./renderMappings.ts";

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

// Virtualize every fixture once up front so both the `compile` and `print`
// suites can consult its diagnostics. A fixture that reports an error only
// snapshots its diagnostics: there is no meaningful virtual code, source map,
// emitted JS, or stringified output for source the compiler rejected.
const fixtures = fixtureNames.map((fileName) => {
  const sourceText = readFileSync(join(fixturesDir, fileName), "utf8");
  const result = virtualize(ts, fileName, sourceText);
  const hasError = result.diagnostics.some(
    (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  return { fileName, sourceText, hasError, ...result };
});

describe("compile", () => {
  for (const fixture of fixtures) {
    it(fixture.fileName, () => {
      const { fileName, sourceText, virtualCode, mappings, diagnostics } =
        fixture;
      const base = fileName.slice(0, -extname(fileName).length);

      matchFileSnapshot(
        renderDiagnostics(fileName, sourceText, diagnostics),
        join(fixturesDir, `${base}.diagnostics`),
      );
      if (fixture.hasError) {
        return;
      }

      matchFileSnapshot(virtualCode, join(fixturesDir, `${base}.virtual.tsx`));
      matchFileSnapshot(
        renderMappings(fileName, virtualCode, sourceText, mappings),
        join(fixturesDir, `${base}.sourcemap`),
      );
      matchFileSnapshot(
        ts.transpileModule(sourceText, {
          fileName,
          compilerOptions: COMPILER_OPTIONS,
          transformers: { before: [transform(ts)] },
        }).outputText,
        join(fixturesDir, `${base}.js`),
      );
    });
  }
});

describe("print", () => {
  for (const fixture of fixtures) {
    if (fixture.hasError) {
      continue;
    }
    it(fixture.fileName, () => {
      const base = fixture.fileName.slice(0, -extname(fixture.fileName).length);

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
