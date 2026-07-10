import assert from "node:assert";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, it } from "node:test";
import ts from "typescript";
import { transform } from "../../dist/compiler/transform.js";
import { virtualize } from "../../dist/compiler/virtualize.js";
import { renderDiagnostics } from "./renderDiagnostics.ts";
import { renderMappings } from "./renderMappings.ts";

// The fixture corpus is shared with the jit-bundler suite: this suite
// snapshots the compiler artifacts (diagnostics, virtual code, source map,
// emitted JS), while `test/jit-bundler/fixtures.test.ts` snapshots the
// bundled payload of the same sources.
const fixturesRoot = join(import.meta.dirname, "../fixtures");

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

function loadFixtures(dir: string) {
  return readdirSync(dir)
    .filter(
      (file) =>
        sourceExtensions.includes(extname(file)) &&
        !file.includes(".virtual.tsx"),
    )
    .sort()
    .map((fileName) => {
      const sourceText = readFileSync(join(dir, fileName), "utf8");
      const result = virtualize(ts, fileName, sourceText);
      const hasError = result.diagnostics.some(
        (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
      );
      return { fileName, sourceText, hasError, ...result };
    });
}

describe("compile", () => {
  describe("valid", () => {
    const dir = join(fixturesRoot, "valid");
    for (const fixture of loadFixtures(dir)) {
      it(fixture.fileName, () => {
        const { fileName, sourceText, virtualCode, mappings, diagnostics } =
          fixture;
        const base = fileName.slice(0, -extname(fileName).length);

        const renderedDiagnostics = renderDiagnostics(
          fileName,
          sourceText,
          diagnostics,
        );
        assert.ok(
          !fixture.hasError,
          `a valid fixture must compile without errors; move it to invalid/ or fix it:\n${renderedDiagnostics}`,
        );

        matchFileSnapshot(
          renderedDiagnostics,
          join(dir, `${base}.diagnostics`),
        );
        matchFileSnapshot(virtualCode, join(dir, `${base}.virtual.tsx`));
        matchFileSnapshot(
          renderMappings(fileName, virtualCode, sourceText, mappings),
          join(dir, `${base}.sourcemap`),
        );
        matchFileSnapshot(
          ts.transpileModule(sourceText, {
            fileName,
            compilerOptions: COMPILER_OPTIONS,
            transformers: { before: [transform(ts)] },
          }).outputText,
          join(dir, `${base}.js`),
        );
      });
    }
  });

  // An invalid fixture only snapshots its diagnostics: there is no meaningful
  // virtual code, source map, or emitted JS for source the compiler rejected.
  describe("invalid", () => {
    const dir = join(fixturesRoot, "invalid");
    for (const fixture of loadFixtures(dir)) {
      it(fixture.fileName, () => {
        const { fileName, sourceText, diagnostics } = fixture;
        const base = fileName.slice(0, -extname(fileName).length);

        assert.ok(
          fixture.hasError,
          "an invalid fixture must report a compiler error; move it to valid/",
        );
        matchFileSnapshot(
          renderDiagnostics(fileName, sourceText, diagnostics),
          join(dir, `${base}.diagnostics`),
        );
      });
    }
  });
});
