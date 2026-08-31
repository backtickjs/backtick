import assert from "node:assert/strict";
import { test } from "node:test";
import { SyntaxKind } from "@backtickjs/boundary";
import { NodeKind } from "../dist/bundle/Bundle.js";
import { buildBundle } from "../dist/bundle/buildBundle.js";
import type { AstScript } from "../dist/ast/Ast.js";

// One script, `1`, written at 3:7 of a file hashing to `abc`.
const script: AstScript = {
  kind: "AstScript",
  loc: [3, 7, 3, 8],
  fileHash: "abc",
  splices: {},
  captures: [],
  spliceParams: {},
  expression: { kind: SyntaxKind.NumericLiteral, loc: [3, 7, 3, 8], value: 1 },
};

test("labels an entry by its table position by default", () => {
  assert.deepEqual(Object.keys(buildBundle(script).functions), ["0"]);
});

test("labels an entry by where its script was written on request", () => {
  const located = buildBundle(script, { stableFunctionLabels: true });
  assert.deepEqual(Object.keys(located.functions), ["abc:3:7"]);
  // The reference names the same thing, so a bundle reads on its own.
  assert.deepEqual(located.root, [NodeKind.ApplyFunction, "abc:3:7", []]);
});
