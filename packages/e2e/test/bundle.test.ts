import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import { matchFileSnapshot } from "./matchFileSnapshot.ts";
import { renderBundleDebug } from "./renderBundleDebug.ts";
import { renderValue } from "./renderValue.ts";
import { evaluate } from "./test-client/index.ts";

// End-to-end snapshot tests over the shared fixtures: each fixture exports a
// client — a script or a JSX tree — compiled here with the same transform the
// compiler suite snapshots as `*.js`, then executed by importing the emitted
// module. A `valid/` fixture's bundle payload is snapshotted to a sibling
// `*.bundle` file (with a human-readable rendering of the same payload in
// `*.bundle-debug` — see `renderBundleDebug`), then executed by the
// reference test-client and the resulting runtime value snapshotted to
// `*.value`. A `bundle-error/`
// fixture compiles and imports cleanly but exports a client the bundler must
// reject: its error message is snapshotted to a sibling `*.error` file. Run
// with UPDATE_SNAPSHOTS=1 to (re)generate the snapshots.
//
const bundleErrorDir = join(fixturesRoot, "bundle-error");
const importFixture = createFixtureLoader("bundler");

function listFixtures(dir: string): string[] {
  return readdirSync(dir)
    .filter(
      (file) =>
        [".ts", ".tsx"].includes(extname(file)) &&
        !file.includes(".virtual.tsx"),
    )
    .sort();
}

describe("bundle", () => {
  describe("valid", () => {
    const dir = join(fixturesRoot, "valid");
    for (const file of listFixtures(dir)) {
      it(file, async () => {
        const base = file.slice(0, -extname(file).length);
        const script = await importFixture(dir, file);
        const bundle = await bundler.run(script);
        matchFileSnapshot(
          JSON.stringify(bundle, null, 2),
          join(dir, `${base}.bundle`),
        );
        matchFileSnapshot(
          renderBundleDebug(bundle),
          join(dir, `${base}.bundle-debug`),
        );
        matchFileSnapshot(
          `${renderValue(evaluate(bundle))}\n`,
          join(dir, `${base}.value`),
        );
      });
    }
  });

  describe("bundle-error", () => {
    for (const file of listFixtures(bundleErrorDir)) {
      it(file, async () => {
        const base = file.slice(0, -extname(file).length);
        const script = await importFixture(bundleErrorDir, file);
        let message: string | null = null;
        try {
          await bundler.run(script);
        } catch (error) {
          message = error instanceof Error ? error.message : String(error);
        }
        assert.ok(
          message !== null,
          "a bundle-error fixture must fail to bundle; move it to valid/",
        );
        matchFileSnapshot(
          `${message}\n`,
          join(bundleErrorDir, `${base}.error`),
        );
      });
    }
  });
});
