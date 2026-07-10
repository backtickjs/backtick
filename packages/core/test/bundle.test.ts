import assert from "node:assert/strict";
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { extname, join } from "node:path";
import { describe, it, test } from "node:test";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { transform } from "../dist/compiler/transform.js";
import {
  type Client,
  type ClientUnknown,
  cs,
} from "../dist/cs-runtime/index.js";
import { bundle } from "../dist/jit-bundler/index.js";
import { jsx } from "../dist/jsx-runtime/index.js";

// End-to-end snapshot tests over the shared fixtures: each valid fixture
// exports a client — a script or a JSX tree — compiled here with the same
// transform the compiler suite snapshots as `*.js`, then executed by
// importing the emitted module, and its bundled payload is snapshotted to a
// sibling `*.bundle` file. Run with UPDATE_SNAPSHOTS=1 to (re)generate the
// snapshots.
//
// The emitted modules land in a cache directory inside the package so their
// `@backtickjs/core` imports resolve through node's package self-reference.
const fixturesDir = join(import.meta.dirname, "fixtures/valid");
const cacheDir = join(import.meta.dirname, "../.cache/jit-bundler");

const COMPILER_OPTIONS: ts.CompilerOptions = {
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.ESNext,
  jsx: ts.JsxEmit.ReactJSX,
  jsxImportSource: "@backtickjs/core",
  sourceMap: false,
};

function matchFileSnapshot(actual: string, file: string): void {
  if (process.env.UPDATE_SNAPSHOTS) {
    writeFileSync(file, actual);
    return;
  }

  assert.strictEqual(actual, readFileSync(file, "utf8"));
}

rmSync(cacheDir, { recursive: true, force: true });
mkdirSync(cacheDir, { recursive: true });

const fixtures = readdirSync(fixturesDir)
  .filter(
    (file) =>
      [".ts", ".tsx"].includes(extname(file)) && !file.includes(".virtual.tsx"),
  )
  .sort();

describe("bundle", () => {
  for (const file of fixtures) {
    it(file, async () => {
      const base = file.slice(0, -extname(file).length);
      const sourceText = readFileSync(join(fixturesDir, file), "utf8");
      const { outputText } = ts.transpileModule(sourceText, {
        fileName: file,
        compilerOptions: COMPILER_OPTIONS,
        transformers: { before: [transform(ts)] },
      });
      const compiled = join(cacheDir, `${base}.js`);
      writeFileSync(compiled, outputText);
      const { default: script } = (await import(
        pathToFileURL(compiled).href
      )) as { default: Client<ClientUnknown> };
      matchFileSnapshot(
        JSON.stringify(bundle(script), null, 2),
        join(fixturesDir, `${base}.bundle`),
      );
    });
  }
});

// The happy paths are covered end-to-end by the fixture snapshots above; only
// the fail-loudly cases live here.

test("a plain object prop can't use a reserved key", () => {
  const element = jsx("flexbox", { data: { "#call": "#f0" } });
  assert.throws(() => bundle(element), /reserved/);
});

test("a plain object prop can't look like an element node", () => {
  const element = jsx("flexbox", { data: { type: "x", key: null, props: {} } });
  assert.throws(() => bundle(element), /element node/);
});

test("a plain object prop that mimics an IR node stays data", () => {
  const element = jsx("flexbox", { data: { kind: "IrScriptRef", target: 0 } });
  const { trees } = bundle(element);
  assert.deepStrictEqual(trees["#t0"], {
    element: {
      type: "flexbox",
      key: null,
      props: { data: { kind: "IrScriptRef", target: 0 } },
    },
  });
});

test("a runtime string splice inlines as a value node", () => {
  const value = 'say "hi"\n\\done';
  const loc = {
    path: "test.ts",
    start: { line: 1, character: 1 },
    end: { line: 1, character: 9 },
  };
  const client = cs.create(
    loc,
    "hash",
    { splices: [value], captures: [], declarations: [] },
    (v) => v.splice(loc, 0),
  );
  const { functions } = bundle(client);
  assert.deepStrictEqual(functions["#f0"], {
    kind: "arrow",
    params: [],
    body: { kind: "value", value },
  });
});
