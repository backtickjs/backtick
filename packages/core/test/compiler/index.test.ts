import assert from "node:assert";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, it } from "node:test";
import ts from "typescript";
import { parseFile } from "../../dist/compiler/parseFile.js";
import { rewriteFile } from "../../dist/compiler/rewriteFile.js";

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

describe("rewriteFile", () => {
  const printer = ts.createPrinter();

  for (const name of fixtureNames) {
    it(name, () => {
      const input = readFileSync(join(fixturesDir, name), "utf8");
      const { virtual, runtime } = rewriteFile(ts, parseFile(ts, name, input));

      matchFileSnapshot(
        printer.printFile(virtual),
        join(fixturesDir, `${name}.virtual.tsx`),
      );
      matchFileSnapshot(
        printer.printFile(runtime),
        join(fixturesDir, `${name}.runtime.tsx`),
      );
    });
  }
});
