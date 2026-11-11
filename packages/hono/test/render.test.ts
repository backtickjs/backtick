import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { test } from "node:test";
import ts from "typescript";

// fixtures/render.ts against this package's own types, as built: the errors
// are on the lines marked `// refused: …`, saying so, and nowhere else.
test("context.render takes what each kind of route draws", () => {
  const file = join(import.meta.dirname, "fixtures/render.ts");
  const program = ts.createProgram([file], {
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    target: ts.ScriptTarget.ESNext,
    types: [],
  });
  const source = program.getSourceFile(file)!;
  const errors = ts.getPreEmitDiagnostics(program, source).map((diagnostic) => {
    const { line } = source.getLineAndCharacterOfPosition(diagnostic.start!);
    return `${line + 1}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n")}`;
  });
  const refused = readFileSync(file, "utf8")
    .split("\n")
    .flatMap((text, index) => {
      const message = /\/\/ refused: (.+)$/.exec(text)?.[1];
      return message === undefined ? [] : [{ line: index + 1, message }];
    });
  assert.deepEqual(
    errors.map((error) => Number(error.split(":")[0])),
    refused.map(({ line }) => line),
    errors.join("\n"),
  );
  for (const [index, { message }] of refused.entries()) {
    assert.ok(errors[index]!.includes(message), errors[index]);
  }
});
