import assert from "node:assert";
import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, extname, join } from "node:path";
import { describe, it } from "node:test";
import { virtualize } from "@backtickjs/compiler";
import ts from "typescript";
import { matchFileSnapshot } from "./matchFileSnapshot.ts";
import { renderDiagnostics } from "./renderDiagnostics.ts";
import { renderMappings } from "./renderMappings.ts";
import { transpileFixture } from "./transpileFixture.ts";

// The fixture corpus is shared with the bundler suite: this suite
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

// Every `.test.tsx`, compiled whole under the name `tsxHooks.ts` gives it, so
// what is recorded is the module the test runs as. Recorded per file, next to
// it: `__snapshots__/<file>.<artifact>`. The file's hash and positions stay in,
// which is why test files are kept small — an edit rewrites only its own.
const testsRoot = import.meta.dirname;
const testFiles = readdirSync(testsRoot, { recursive: true, encoding: "utf8" })
  .filter(
    (file) =>
      file.endsWith(".test.tsx") &&
      !file.startsWith("fixtures") &&
      !file.startsWith("node_modules") &&
      !file.includes("__snapshots__"),
  )
  .sort();

// Written as given: each artifact is text meant to be read in its own file.
const verbatim = [(value: unknown) => value as string];

describe("compile the .tsx tests", () => {
  for (const fileName of testFiles) {
    it(fileName, async (t) => {
      const sourceText = readFileSync(join(testsRoot, fileName), "utf8");
      const { virtualCode, mappings, diagnostics } = virtualize(
        ts,
        fileName,
        sourceText,
      );
      assert.ok(
        !diagnostics.some(
          (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
        ),
        renderDiagnostics(fileName, sourceText, diagnostics),
      );
      const base = join(
        testsRoot,
        dirname(fileName),
        "__snapshots__",
        basename(fileName, ".test.tsx"),
      );
      mkdirSync(dirname(base), { recursive: true });
      const record = (text: string, artifact: string) =>
        t.assert.fileSnapshot(text, `${base}.${artifact}`, {
          serializers: verbatim,
        });
      record(virtualCode, "virtual.tsx");
      record(
        renderMappings(fileName, virtualCode, sourceText, mappings),
        "sourcemap",
      );
      record(await transpileFixture(fileName, sourceText), "js");
    });
  }
});
