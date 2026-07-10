import ts from "typescript";
import { transform } from "../dist/compiler/transform.js";

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

export function transpileFixture(fileName: string, sourceText: string): string {
  return ts.transpileModule(sourceText, {
    fileName,
    compilerOptions: COMPILER_OPTIONS,
    transformers: { before: [transform(ts)] },
  }).outputText;
}
