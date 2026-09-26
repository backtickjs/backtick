import assert from "node:assert/strict";
import { test } from "node:test";
import { buildBundle } from "../dist/bundle/buildBundle.js";
import { create } from "@backtickjs/client-script";

// One script, `1`, written at 3:7 of a file hashing to `abc`.
const script = create(
  "abc:3:7",
  { params: [] },
  { code: "export default () => 1;", map: "", imports: [], exportAt: 0 },
) as never;

const labelsOf = (tree: Awaited<ReturnType<typeof buildBundle>>) =>
  tree.functions.map(([label]) => label);

test("labels an entry by its table position by default", async () => {
  assert.deepEqual(labelsOf(await buildBundle(script)), ["0"]);
});

test("labels an entry by where its script was written on request", async () => {
  const located = await buildBundle(script, { stableFunctionLabels: true });
  assert.deepEqual(labelsOf(located), ["abc:3:7"]);
  // The reference names the same thing, so a bundle reads on its own.
  const { root } = located;
  assert.ok(
    root.type === "CallExpression" && root.callee.type === "Identifier",
  );
  assert.equal(located.names.labels.get(root.callee), "abc:3:7");
});
