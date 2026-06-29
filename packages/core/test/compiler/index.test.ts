import assert from "node:assert";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, it } from "node:test";
import ts from "typescript";
import { compile } from "../../dist/compiler/compile.js";
import { virtualize } from "../../dist/compiler/virtualize.js";
import StringifyVisitor from "./StringifyVisitor.ts";

const fixturesDir = join(import.meta.dirname, "fixtures");

const COMPILER_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  sourceMap: false,
};

function matchFileSnapshot(actual: string, file: string): void {
  if (process.env.UPDATE_SNAPSHOTS) {
    writeFileSync(file, actual);
    return;
  }

  assert.strictEqual(actual, readFileSync(file, "utf8"));
}

const sourceExtensions = [".ts", ".tsx", ".jsx"];

const fixtureNames = readdirSync(fixturesDir)
  .filter(
    (file) =>
      sourceExtensions.includes(extname(file)) &&
      !file.includes(".virtual.tsx"),
  )
  .sort();

describe("compileFile", () => {
  for (const fileName of fixtureNames) {
    it(fileName, () => {
      const base = fileName.slice(0, -extname(fileName).length);
      const sourceText = readFileSync(join(fixturesDir, fileName), "utf8");

      matchFileSnapshot(
        virtualize(ts, fileName, sourceText).virtualCode,
        join(fixturesDir, `${fileName}.virtual.tsx`),
      );
      matchFileSnapshot(
        compile(ts, fileName, sourceText, COMPILER_OPTIONS).runtimeCode,
        join(fixturesDir, `${base}.js`),
      );
    });
  }
});

describe("visit", () => {
  for (const name of fixtureNames) {
    it(name, async () => {
      const base = name.slice(0, -extname(name).length);
      const { default: client } = await import(`./fixtures/${base}.js`);

      matchFileSnapshot(
        client.visit(new StringifyVisitor()),
        join(fixturesDir, `${name}.stringify`),
      );
    });
  }
});
