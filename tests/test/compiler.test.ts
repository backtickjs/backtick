import assert from "node:assert";
import { mkdirSync, readdirSync, readFileSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { describe, it } from "node:test";
import { transpile, virtualize } from "@backtickjs/compiler";
import prettier from "prettier";
import ts from "typescript";
import { renderDiagnostics } from "./renderDiagnostics.ts";
import { renderMappings } from "./renderMappings.ts";

// Every `.test.tsx`, compiled whole under the name `tsxHooks.ts` gives it, so
// what is recorded is the module the test runs as. Recorded per file, next to
// it: `__snapshots__/<file>.<artifact>`. The file's hash and positions stay in,
// which is why test files are kept small — an edit rewrites only its own.
const testsRoot = import.meta.dirname;
const testFiles = readdirSync(testsRoot, { recursive: true, encoding: "utf8" })
  .filter(
    (file) =>
      file.endsWith(".test.tsx") &&
      !file.startsWith("node_modules") &&
      !file.includes("__snapshots__"),
  )
  .sort();

// The files whose scripts the compiler must refuse. Only their diagnostics are
// recorded: what a refused script compiles to means nothing.
const compileErrorsDir = "compile-errors";

// What `tsxHooks.ts` runs the file as, made readable.
async function emit(fileName: string, sourceText: string): Promise<string> {
  const outputText = transpile(ts, fileName, sourceText, "@backtickjs/web-sdk");
  // Every script's metadata carries the toolchain version, which would rewrite
  // all of these snapshots on each release. Pinned to one value so a version
  // bump doesn't bury the diff that release actually made. Matched on a semver
  // shape so a case of its own with a `version` property is left alone.
  const pinned = outputText.replace(
    /version: "\d+\.\d+\.\d+[^"]*"/g,
    'version: "0.0.0"',
  );
  // The emitted runtime tree prints as one long line per script; formatted,
  // the snapshot reads like code.
  return prettier.format(pinned, { parser: "typescript" });
}

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
      const hasError = diagnostics.some(
        (diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error,
      );
      const renderedDiagnostics = renderDiagnostics(
        fileName,
        sourceText,
        diagnostics,
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

      if (dirname(fileName) === compileErrorsDir) {
        assert.ok(hasError, "a compile error must be reported");
        record(renderedDiagnostics, "diagnostics");
        return;
      }
      assert.ok(!hasError, renderedDiagnostics);
      record(virtualCode, "virtual.tsx");
      record(
        renderMappings(fileName, virtualCode, sourceText, mappings),
        "sourcemap",
      );
      record(await emit(fileName, sourceText), "js");
    });
  }
});
