import assert from "node:assert";
import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, it } from "node:test";
import ts from "typescript";
import { virtualize } from "../dist/compiler/virtualize.js";
import { matchFileSnapshot } from "./matchFileSnapshot.ts";
import { renderDiagnostics } from "./renderDiagnostics.ts";
import { renderMappings } from "./renderMappings.ts";
import { transpileFixture } from "./transpileFixture.ts";

// The fixture corpus is shared with the jit-bundler suite: this suite
// snapshots the compiler artifacts (diagnostics, virtual code, source map,
// emitted JS), while `test/bundle.test.ts` snapshots the bundled payload of
// the same sources. The `*.js` snapshot is emitted with the shared
// `transpileFixture` options, so it is exactly the module the bundle suite
// imports and executes.
const fixturesRoot = join(import.meta.dirname, "fixtures");

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
  // `typecheck-error` fixtures pin deliberate type errors; any compiler
  // diagnostics they carry are snapshotted like everything else, so only
  // `valid` fixtures assert a clean compile.
  for (const dirName of ["valid", "typecheck-error"]) {
    describe(dirName, () => {
      const dir = join(fixturesRoot, dirName);
      for (const fixture of loadFixtures(dir)) {
        it(fixture.fileName, async () => {
          const { fileName, sourceText, virtualCode, mappings, diagnostics } =
            fixture;
          const base = fileName.slice(0, -extname(fileName).length);

          const renderedDiagnostics = renderDiagnostics(
            fileName,
            sourceText,
            diagnostics,
          );
          assert.ok(
            dirName !== "valid" || !fixture.hasError,
            `a valid fixture must compile without errors; move it to compile-error/ or fix it:\n${renderedDiagnostics}`,
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
            await transpileFixture(fileName, sourceText),
            join(dir, `${base}.js`),
          );
        });
      }
    });
  }

  // A compile-error fixture only snapshots its diagnostics: there is no meaningful
  // virtual code, source map, or emitted JS for source the compiler rejected.
  describe("compile-error", () => {
    const dir = join(fixturesRoot, "compile-error");
    for (const fixture of loadFixtures(dir)) {
      it(fixture.fileName, () => {
        const { fileName, sourceText, diagnostics } = fixture;
        const base = fileName.slice(0, -extname(fileName).length);

        assert.ok(
          fixture.hasError,
          "a compile-error fixture must report a compiler error; move it to valid/",
        );
        matchFileSnapshot(
          renderDiagnostics(fileName, sourceText, diagnostics),
          join(dir, `${base}.diagnostics`),
        );
      });
    }
  });
});
