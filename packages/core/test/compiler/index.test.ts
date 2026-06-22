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
  .filter((file) => sourceExtensions.includes(extname(file)))
  .sort();

describe("rewriteFile", () => {
  for (const name of fixtureNames) {
    it(name, () => {
      const input = readFileSync(join(fixturesDir, name), "utf8");
      const { virtual, runtime } = rewriteFile(ts, parseFile(ts, name, input));

      const printer = ts.createPrinter();
      const snapshot = `// === source ===\n${input}\n// === virtual ===\n${printer.printFile(
        virtual,
      )}\n// === runtime ===\n${printer.printFile(runtime)}`;

      matchFileSnapshot(snapshot, join(fixturesDir, `${name}.snap`));
    });
  }
});
