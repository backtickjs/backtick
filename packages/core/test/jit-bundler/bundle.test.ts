import assert from "node:assert/strict";
import { test } from "node:test";
import { cs } from "../../dist/cs-runtime/index.js";
import { bundle } from "../../dist/jit-bundler/index.js";
import { jsx } from "../../dist/jsx-runtime/index.js";

// The happy paths are covered end-to-end by the `e2e/jit-bundler` snapshot
// fixtures; only the fail-loudly cases live here.

test("a plain object prop can't use a reserved key", () => {
  const element = jsx("flexbox", { data: { "#call": "#f0" } });
  assert.throws(() => bundle(element), /reserved/);
});

test("a plain object prop can't look like an element node", () => {
  const element = jsx("flexbox", { data: { type: "x", key: null, props: {} } });
  assert.throws(() => bundle(element), /element node/);
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
