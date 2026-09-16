import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { extname, join } from "node:path";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { createFixtureLoader, fixturesRoot } from "./importFixture.ts";
import { matchFileSnapshot } from "./matchFileSnapshot.ts";
import { renderBundleDebug } from "./renderBundleDebug.ts";
import { renderDrawing } from "./renderMarkup.ts";
import { renderValue } from "./renderValue.ts";
import { evaluate, isNode, render } from "@backtickjs/test-vm";

// End-to-end snapshot tests over the shared fixtures: each fixture exports a
// client — a script or a JSX tree — compiled here with the same transform the
// compiler suite snapshots as `*.js`, then executed by importing the emitted
// module. A `valid/` fixture's bundle payload is snapshotted to a sibling
// `*.bundle` file (with a human-readable rendering of the same payload in
// `*.bundle-debug` — see `renderBundleDebug`), then executed by the
// test VM (`@backtickjs/test-vm`) and what it produced snapshotted to
// `*.value`: the page a fixture that draws was rendered into, or the value one
// that does not answered with. A `bundle-error/`
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

// Whether a root is a drawing: an element, or a stretch of them beside the
// lists and conditions that draw more.
function draws(value: unknown): boolean {
  return isNode(value) || (Array.isArray(value) && value.some(isNode));
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
        const value = evaluate(bundle);
        const snapshot = draws(value)
          ? renderDrawing((await render(script)).container)
          : renderValue(value);
        matchFileSnapshot(`${snapshot}\n`, join(dir, `${base}.value`));
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
