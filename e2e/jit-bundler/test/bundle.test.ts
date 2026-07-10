import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { extname, join } from "node:path";
import { expect, test } from "bun:test";
import { bundle } from "@backtickjs/core";
import type { Client, ClientUnknown } from "@backtickjs/core/cs-runtime";

// End-to-end snapshot tests, mirroring the compiler fixtures: each `*.ts(x)`
// fixture exports a client — a script or a JSX tree — compiled at import time
// by the bun plugin, and its bundled payload is snapshotted to a sibling
// `*.bundle` file. Run with UPDATE_SNAPSHOTS=1 to (re)generate the snapshots.
const fixturesDir = join(import.meta.dir, "fixtures");

function matchFileSnapshot(actual: string, file: string): void {
  if (process.env.UPDATE_SNAPSHOTS) {
    writeFileSync(file, actual);
    return;
  }
  expect(actual).toBe(readFileSync(file, "utf8"));
}

const fixtures = readdirSync(fixturesDir)
  .filter((file) => [".ts", ".tsx"].includes(extname(file)))
  .sort();

for (const file of fixtures) {
  test(file, async () => {
    const base = file.slice(0, -extname(file).length);
    const { default: script } = (await import(join(fixturesDir, file))) as {
      default: Client<ClientUnknown>;
    };
    matchFileSnapshot(bundle(script), join(fixturesDir, `${base}.bundle`));
  });
}
