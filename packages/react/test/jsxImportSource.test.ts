import assert from "node:assert/strict";
import { join } from "node:path";
import { describe, it } from "node:test";
import ts from "typescript";

// What a project with `"jsxImportSource": "@backtickjs/react"` gets.
describe("as a jsxImportSource", () => {
  it("types JSX with React's own types", () => {
    const file = join(import.meta.dirname, "fixtures", "react-jsx.tsx");
    const program = ts.createProgram([file], {
      strict: true,
      noEmit: true,
      skipLibCheck: true,
      module: ts.ModuleKind.NodeNext,
      moduleResolution: ts.ModuleResolutionKind.NodeNext,
      target: ts.ScriptTarget.ESNext,
      jsx: ts.JsxEmit.Preserve,
      jsxImportSource: "@backtickjs/react",
      lib: ["lib.esnext.d.ts", "lib.dom.d.ts"],
      types: [],
    });
    const diagnostics = ts
      .getPreEmitDiagnostics(program)
      .map((diagnostic) =>
        ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
      );
    assert.deepEqual(diagnostics, []);
  });
});
