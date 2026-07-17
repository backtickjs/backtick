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
  // The emitted runtime tree prints as one long line per script; formatted,
  // the snapshot reads like code.
  return prettier.format(outputText, { parser: "typescript" });
}
