import assert from "node:assert";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it } from "node:test";
import ts from "typescript";
import compileFile from "../src/compileFile.ts";

const fixturesDir = join(import.meta.dirname, "fixtures");

const printer = ts.createPrinter();

function print(node: ts.Node, sourceFile: ts.SourceFile): string {
  return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
}

function matchFileSnapshot(actual: string, file: string): void {
  if (process.env.UPDATE_SNAPSHOTS) {
    writeFileSync(file, actual);
    return;
  }

  assert.strictEqual(actual, readFileSync(file, "utf8"));
}

const fixtureNames = readdirSync(fixturesDir)
  .filter((f) => f.endsWith(".bt"))
  .map((f) => f.slice(0, -".bt".length))
  .sort();

describe("compileFile", () => {
  for (const name of fixtureNames) {
    it(name, () => {
      const input = readFileSync(join(fixturesDir, `${name}.bt`), "utf8");
      const sourceFile = ts.createSourceFile(
        `${name}.tsx`,
        input,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      );

      const result = compileFile(ts, sourceFile);

      matchFileSnapshot(
        print(result.runtime, sourceFile),
        join(fixturesDir, `${name}.runtime`),
      );
    });
  }
});
