import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { it } from "node:test";
import { virtualize } from "@backtickjs/compiler";
import ts from "typescript";

// Scripts checked as an editor checks them: the file's virtual code, against
// React's types through this package.
it("checks a tag in a script with React's tag attributes", () => {
  const file = join(import.meta.dirname, "fixtures", "tag-attributes.tsx");
  const { virtualCode, diagnostics } = virtualize(
    ts,
    file,
    readFileSync(file, "utf8"),
  );
  assert.deepEqual(diagnostics, []);
  const options: ts.CompilerOptions = {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    target: ts.ScriptTarget.ESNext,
    jsx: ts.JsxEmit.ReactJSX,
    jsxImportSource: "@backtickjs/react",
    lib: ["lib.esnext.d.ts", "lib.dom.d.ts"],
    types: [],
  };
  const host = ts.createCompilerHost(options);
  const read = host.readFile;
  host.readFile = (name) => (name === file ? virtualCode : read(name));
  const getSourceFile = host.getSourceFile;
  host.getSourceFile = (name, ...rest) =>
    name === file
      ? ts.createSourceFile(name, virtualCode, ts.ScriptTarget.ESNext, true)
      : getSourceFile(name, ...rest);
  const program = ts.createProgram([file], options, host);
  assert.deepEqual(
    ts
      .getPreEmitDiagnostics(program)
      .map((diagnostic) =>
        ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"),
      ),
    [],
  );
});
