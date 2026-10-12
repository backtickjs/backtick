import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { it } from "node:test";
import { virtualize } from "@backtickjs/compiler";
import ts from "typescript";

// Scripts checked as an editor checks them: the file's virtual code, against
// three's types.
it("checks three as values and types in a script", () => {
  const file = join(import.meta.dirname, "fixtures", "scripts.ts");
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
    lib: ["lib.esnext.d.ts", "lib.dom.d.ts"],
    types: [],
  };
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile;
  host.getSourceFile = (name, ...rest) =>
    name === file
      ? ts.createSourceFile(name, virtualCode, ts.ScriptTarget.ESNext, true)
      : getSourceFile(name, ...rest);
  const program = ts.createProgram([file], options, host);
  assert.deepEqual(
    ts
      .getPreEmitDiagnostics(program)
      .map(
        (diagnostic) =>
          `${diagnostic.file ? ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!).line + 1 : "?"}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, " ")}`,
      ),
    [],
  );
});
