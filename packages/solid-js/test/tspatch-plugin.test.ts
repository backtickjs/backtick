import assert from "node:assert/strict";
import { describe, it } from "node:test";
import ts from "typescript";
import tspatchPlugin from "../dist/tspatch-plugin.js";

// A tsconfig's `{ "transform": "@backtickjs/solid-js/tspatch-plugin" }`, as `tspc`
// runs it: the file's scripts come out compiled by Solid's compiler.
describe("tspatch-plugin", () => {
  it("compiles each script with Solid's compiler", () => {
    const diagnostics: ts.Diagnostic[] = [];
    const source = `import { cs } from "@backtickjs/core";
export const hello = cs\`<b>hello</b>\`;
`;
    const { outputText } = ts.transpileModule(source, {
      fileName: "host.tsx",
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ESNext,
        jsx: ts.JsxEmit.Preserve,
        verbatimModuleSyntax: true,
      },
      transformers: {
        before: [
          tspatchPlugin(undefined as never, {}, {
            ts,
            addDiagnostic: (diagnostic: ts.Diagnostic) =>
              diagnostics.push(diagnostic),
          } as never),
        ],
      },
    });
    assert.deepEqual(diagnostics, []);
    assert.match(outputText, /template as _\$template/);
    assert.match(outputText, /<b>hello/);
  });
});
