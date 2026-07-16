import assert from "node:assert";
import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, it } from "node:test";
import ts from "typescript";
import { virtualize } from "../dist/compiler/virtualize.js";
import { matchFileSnapshot } from "./matchFileSnapshot.ts";

// Typechecks each fixture's virtual code and snapshots the diagnostics to a
// sibling `*.typecheck` file, for the `valid` fixtures (whose snapshots stay
// clean) and the `typecheck-error` ones (which pin deliberate type errors).
// This is the type-level view of the corpus: what `backtick-tsc` reports for
// a fixture is what plain tsc reports for its virtual code, so typechecking
// the virtualized fixtures simulates the language tooling without depending
// on it.
//
// The virtual code is produced in-memory from the fixture sources — not read
// from the `*.virtual.tsx` snapshots, whose (re)generation order in an
// UPDATE_SNAPSHOTS run is not guaranteed — and served to the program at the
// snapshot paths, so diagnostics land on the same file names and module
// resolution walks the same directories. The compiler suite separately
// asserts that those snapshots match this same virtualization.
const fixturesRoot = join(import.meta.dirname, "fixtures");
const dirNames = ["valid", "typecheck-error"];

const COMPILER_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  jsx: ts.JsxEmit.ReactJSX,
  jsxImportSource: "@backtickjs/core",
  strict: true,
  noEmit: true,
  skipLibCheck: true,
  types: [],
};

const fixturesByDir = new Map(
  dirNames.map((dirName) => [
    dirName,
    readdirSync(join(fixturesRoot, dirName))
      .filter(
        (file) =>
          [".ts", ".tsx"].includes(extname(file)) &&
          !file.includes(".virtual.tsx"),
      )
      .sort(),
  ]),
);

const virtualFile = (dirName: string, base: string): string =>
  join(fixturesRoot, dirName, `${base}.virtual.tsx`);

const virtualSources = new Map<string, string>(
  [...fixturesByDir].flatMap(([dirName, files]) =>
    files.map((file): [string, string] => {
      const base = file.slice(0, -extname(file).length);
      const sourceText = readFileSync(
        join(fixturesRoot, dirName, file),
        "utf8",
      );
      const { virtualCode } = virtualize(ts, file, sourceText);
      return [virtualFile(dirName, base), virtualCode];
    }),
  ),
);

// One program covers every fixture's virtual code; the test-only intrinsic
// elements come from `fixtures/jsx.d.ts`, exactly as when the test project
// typechecks the virtual snapshots. The host serves the in-memory virtual
// code for the snapshot paths and defers to the real filesystem for
// everything else.
const host = ts.createCompilerHost(COMPILER_OPTIONS);
const readSourceFile = host.getSourceFile;
host.getSourceFile = (fileName, languageVersion, ...rest) => {
  const virtualCode = virtualSources.get(fileName);
  if (virtualCode !== undefined) {
    return ts.createSourceFile(fileName, virtualCode, languageVersion);
  }
  return readSourceFile.call(host, fileName, languageVersion, ...rest);
};
const readFile = host.readFile;
host.readFile = (fileName) =>
  virtualSources.get(fileName) ?? readFile.call(host, fileName);
const fileExists = host.fileExists;
host.fileExists = (fileName) =>
  virtualSources.has(fileName) || fileExists.call(host, fileName);

const program = ts.createProgram(
  [...virtualSources.keys(), join(import.meta.dirname, "fixtures/jsx.d.ts")],
  COMPILER_OPTIONS,
  host,
);

// Render each diagnostic as `<line>:<col>-<line>:<col> <category> <code>:
// <message>`, matching the `*.diagnostics` convention.
function renderTypecheck(sourceFile: ts.SourceFile): string {
  const diagnostics = [
    ...program.getSyntacticDiagnostics(sourceFile),
    ...program.getSemanticDiagnostics(sourceFile),
  ];
  if (diagnostics.length === 0) {
    return "No diagnostics.\n";
  }

  const position = (offset: number): string => {
    const { line, character } =
      sourceFile.getLineAndCharacterOfPosition(offset);
    return `${line + 1}:${character + 1}`;
  };

  return `${diagnostics
    .map((diagnostic) => {
      const start = position(diagnostic.start ?? 0);
      const end = position((diagnostic.start ?? 0) + (diagnostic.length ?? 0));
      const category = ts.DiagnosticCategory[diagnostic.category].toLowerCase();
      const message = ts.flattenDiagnosticMessageText(
        diagnostic.messageText,
        "\n  ",
      );
      return `${start}-${end} ${category} TS${diagnostic.code}: ${message}`;
    })
    .join("\n")}\n`;
}

describe("typecheck", () => {
  for (const [dirName, files] of fixturesByDir) {
    describe(dirName, () => {
      for (const file of files) {
        it(file, () => {
          const base = file.slice(0, -extname(file).length);
          const sourceFile = program.getSourceFile(virtualFile(dirName, base));
          assert.ok(sourceFile, `missing virtual code for ${file}`);
          matchFileSnapshot(
            renderTypecheck(sourceFile),
            join(fixturesRoot, dirName, `${base}.typecheck`),
          );
        });
      }
    });
  }

  it("has no program-level diagnostics", () => {
    const global = [
      ...program.getOptionsDiagnostics(),
      ...program.getGlobalDiagnostics(),
    ];
    assert.deepStrictEqual(
      global.map((diagnostic) =>
        ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
      ),
      [],
    );
  });
});
