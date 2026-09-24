import assert from "node:assert/strict";
import { test } from "node:test";
import { buildBundle } from "../dist/bundle/buildBundle.js";
import type { AstScript } from "../dist/ast/Ast.js";

// One script, `1`, written at 3:7 of a file hashing to `abc`.
const script: AstScript = {
  kind: "AstScript",
  loc: [3, 7, 3, 8],
  fileHash: "abc",
  splices: {},
  captures: [],
  expression: { kind: "number", loc: [3, 7, 3, 8], value: 1 },
};

const labelsOf = (tree: ReturnType<typeof buildBundle>) =>
  tree.functions.map(([label]) => label);

test("labels an entry by its table position by default", () => {
  assert.deepEqual(labelsOf(buildBundle(script)), ["0"]);
});

test("labels an entry by where its script was written on request", () => {
  const located = buildBundle(script, { stableFunctionLabels: true });
  assert.deepEqual(labelsOf(located), ["abc:3:7"]);
  // The reference names the same thing, so a bundle reads on its own.
  const { root } = located;
  assert.ok(
    root.type === "CallExpression" && root.callee.type === "Identifier",
  );
  assert.equal(located.names.labels.get(root.callee), "abc:3:7");
});
