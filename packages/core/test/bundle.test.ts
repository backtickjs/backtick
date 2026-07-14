import assert from "node:assert/strict";
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, extname, join } from "node:path";
import { describe, it } from "node:test";
import { pathToFileURL } from "node:url";
import type { Client, ClientUnknown } from "../dist/cs-runtime/index.js";
import { bundle } from "../dist/jit-bundler/index.js";
import { evaluate } from "../dist/test-client/index.js";
import { matchFileSnapshot } from "./matchFileSnapshot.ts";
import { renderBundleDebug } from "./renderBundleDebug.ts";
import { renderValue } from "./renderValue.ts";
import { transpileFixture } from "./transpileFixture.ts";

// End-to-end snapshot tests over the shared fixtures: each fixture exports a
// client — a script or a JSX tree — compiled here with the same transform the
// compiler suite snapshots as `*.js`, then executed by importing the emitted
// module. A `valid/` fixture's bundled payload is snapshotted to a sibling
// `*.bundle` file (with a human-readable rendering of the same payload in
// `*.bundle-debug` — see `renderBundleDebug`), then executed by the
// reference test-client and the resulting runtime value snapshotted to
// `*.value`. A `bundle-error/`
// fixture compiles and imports cleanly but exports a client the bundler must
// reject: its error message is snapshotted to a sibling `*.error` file. Run
// with UPDATE_SNAPSHOTS=1 to (re)generate the snapshots.
//
// The emitted modules land in a cache directory inside the package so their
// `@backtickjs/core` imports resolve through node's package self-reference.
const fixturesRoot = join(import.meta.dirname, "fixtures");
const validDir = join(fixturesRoot, "valid");
const bundleErrorDir = join(fixturesRoot, "bundle-error");
const cacheDir = join(import.meta.dirname, "../.cache/jit-bundler");

rmSync(cacheDir, { recursive: true, force: true });

function listFixtures(dir: string): string[] {
  return readdirSync(dir)
    .filter(
      (file) =>
        [".ts", ".tsx"].includes(extname(file)) &&
        !file.includes(".virtual.tsx"),
    )
    .sort();
}

async function importFixture(
  dir: string,
  file: string,
): Promise<Client<ClientUnknown>> {
  const sourceText = readFileSync(join(dir, file), "utf8");
  const outputText = transpileFixture(file, sourceText);
  const base = file.slice(0, -extname(file).length);
  const compiled = join(cacheDir, basename(dir), `${base}.js`);
  mkdirSync(join(cacheDir, basename(dir)), { recursive: true });
  writeFileSync(compiled, outputText);
  const { default: script } = (await import(pathToFileURL(compiled).href)) as {
    default: Client<ClientUnknown>;
  };
  return script;
}

describe("bundle", () => {
  describe("valid", () => {
    for (const file of listFixtures(validDir)) {
      it(file, async () => {
        const base = file.slice(0, -extname(file).length);
        const script = await importFixture(validDir, file);
        const payload = bundle(script);
        matchFileSnapshot(
          JSON.stringify(payload, null, 2),
          join(validDir, `${base}.bundle`),
        );
        matchFileSnapshot(
          renderBundleDebug(payload),
          join(validDir, `${base}.bundle-debug`),
        );
        matchFileSnapshot(
          `${renderValue(evaluate(payload))}\n`,
          join(validDir, `${base}.value`),
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
          bundle(script);
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
