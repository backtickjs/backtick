import assert from "node:assert/strict";
import { test } from "node:test";
import { type Bundle, createRuntime } from "../dist/index.js";

// Bundles written out as the bundler writes them: CommonJS, `$value` reading
// `module.values` as its runtime hands it.
const bundle = <T>(code: string) => `"use strict";\n${code}` as Bundle<T>;
const counter = bundle<number>(`
const $values = module.values ?? new Map();
if (!$values.has("count")) {
  $values.set("count", { count: 0 });
}
module.exports = ++$values.get("count").count;
`);

test("exec runs a bundle with the runtime's modules", async () => {
  const runtime = createRuntime({ app: { answer: 41 } });
  const value = await runtime.exec(
    bundle<number>('module.exports = require("app").answer + 1;'),
  );
  assert.equal(value, 42);
});

test("a module the runtime doesn't provide fails with its name", async () => {
  await assert.rejects(
    createRuntime({}).exec(bundle('module.exports = require("app");')),
    /The bundle requires "app", which this app doesn't provide\./,
  );
});

test("the bundles a runtime runs share its values", async () => {
  const runtime = createRuntime({});
  assert.equal(await runtime.exec(counter), 1);
  assert.equal(await runtime.exec(counter), 2);
});

test("two runtimes keep their own values", async () => {
  assert.equal(await createRuntime({}).exec(counter), 1);
  assert.equal(await createRuntime({}).exec(counter), 1);
});
