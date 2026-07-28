import assert from "node:assert/strict";
import { test } from "node:test";
import { buildBundle } from "../dist/bundle/buildBundle.js";
import type { Ir, IrScriptEntry } from "../dist/ir/Ir.js";

// One script, `1`, written at 3:7 of a file hashing to `abc`.
const entry: IrScriptEntry = {
  kind: "IrScriptEntry",
  loc: [3, 7, 3, 8],
  fileHash: "abc",
  splices: [],
  captures: [],
  spliceParams: {},
  body: { kind: "AstScriptNumber", loc: [3, 7, 3, 8], value: 1 },
};

const ir: Ir = {
  scripts: [entry],
  trees: [],
  root: { kind: "IrScriptRef", target: entry, args: [] },
};

test("labels an entry by its table position by default", () => {
  assert.deepEqual(Object.keys(buildBundle(ir).functions), ["0"]);
});

test("labels an entry by where its script was written on request", () => {
  const located = buildBundle(ir, { functionLabels: "location" });
  assert.deepEqual(Object.keys(located.functions), ["abc:3:7"]);
  // The reference names the same thing, so a bundle reads on its own.
  assert.deepEqual(located.root, { "#": 6, f: "abc:3:7" });
});
