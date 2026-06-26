import assert from "node:assert";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { register } from "node:module";
import { extname, join } from "node:path";
import { describe, it } from "node:test";
import ts from "typescript";
import { parseFile } from "../../dist/compiler/parseFile.js";
import { printRuntimeCode } from "../../dist/compiler/printRuntimeCode.js";
import { printVirtualCode } from "../../dist/compiler/printVirtualCode.js";
import { rewriteFile } from "../../dist/compiler/rewriteFile.js";
import StringifyVisitor from "./StringifyVisitor.ts";

register("./tsxLoader.mjs", import.meta.url);

const fixturesDir = join(import.meta.dirname, "fixtures");

function matchFileSnapshot(actual: string, file: string): void {
  if (process.env.UPDATE_SNAPSHOTS) {
    writeFileSync(file, actual);
    return;
  }

  assert.strictEqual(actual, readFileSync(file, "utf8"));
}

const sourceExtensions = [".ts", ".tsx", ".js", ".jsx"];

const fixtureNames = readdirSync(fixturesDir)
  .filter(
    (file) =>
      sourceExtensions.includes(extname(file)) &&
      !file.includes(".virtual.tsx") &&
      !file.includes(".runtime.tsx"),
  )
  .sort();

describe("compileFile", () => {
  for (const name of fixtureNames) {
    it(name, () => {
      // const base = name.slice(0, -extname(name).length);
      const input = readFileSync(join(fixturesDir, name), "utf8");
      const parsed = parseFile(ts, name, input);
      const rewritten = rewriteFile(ts, parsed);

      matchFileSnapshot(
        printVirtualCode(ts, parsed, rewritten).virtualCode,
        join(fixturesDir, `${name}.virtual.tsx`),
      );
      matchFileSnapshot(
        printRuntimeCode(ts, rewritten),
        join(fixturesDir, `${name}.runtime.tsx`),
      );
    });
  }
});

describe("visit", () => {
  for (const name of fixtureNames) {
    it(name, async () => {
      // const base = name.slice(0, -extname(name).length);
      const { default: client } = await import(
        `./fixtures/${name}.runtime.tsx`
      );

      matchFileSnapshot(
        client.visit(new StringifyVisitor()),
        join(fixturesDir, `${name}.stringify`),
      );
    });
  }
});
