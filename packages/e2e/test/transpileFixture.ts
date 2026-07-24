import { transform } from "@backtickjs/compiler";
import prettier from "prettier";
import ts from "typescript";

// The one set of options every suite compiles fixtures with, so the `*.js`
// snapshots the compiler suite writes are byte-for-byte the modules the
// bundle suite executes.
const COMPILER_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  jsx: ts.JsxEmit.ReactJSX,
  jsxImportSource: "@backtickjs/core",
  sourceMap: false,
};

export async function transpileFixture(
  fileName: string,
  sourceText: string,
): Promise<string> {
  const { outputText } = ts.transpileModule(sourceText, {
    fileName,
    compilerOptions: COMPILER_OPTIONS,
    transformers: { before: [transform(ts)] },
  });
  // Every script's metadata carries the toolchain version, which would rewrite
  // all of these snapshots on each release. Pinned to one value so a version
  // bump doesn't bury the diff that release actually made. Matched on a semver
  // shape so a fixture of its own with a `version` property is left alone.
  const pinned = outputText.replace(
    /version: "\d+\.\d+\.\d+[^"]*"/g,
    'version: "0.0.0"',
  );
  // The emitted runtime tree prints as one long line per script; formatted,
  // the snapshot reads like code.
  return prettier.format(pinned, { parser: "typescript" });
}
