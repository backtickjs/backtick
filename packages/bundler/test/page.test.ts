import assert from "node:assert/strict";
import { test } from "node:test";
import { createRuntime, cs } from "@backtickjs/core";
import { bundler } from "../dist/index.js";

// What a page holds inside a `<script>`: anything that ends it early, or
// changes where it ends, in any case.
const closing = /<\/script|<!--/i;
const hostile = `</script><script>steal()</script> </SCRIPT <!-- --> & "'`;

async function generate(input: Parameters<typeof bundler.build>[0]["input"]) {
  const built = await bundler.build({ input, modules: {} });
  return built.generate().code;
}

test("spliced text never closes a page's script, and still arrives as written", async () => {
  const code = await generate(cs`${hostile}`);
  assert.doesNotMatch(code, closing);
  assert.equal(
    await createRuntime({ moduleMap: {}, installedPackages: {} }).exec(code),
    hostile,
  );
});

test("a spliced object's keys never close a page's script either", async () => {
  const value = { [hostile]: hostile };
  const code = await generate(cs`${value}`);
  assert.doesNotMatch(code, closing);
  assert.deepEqual(
    await createRuntime({ moduleMap: {}, installedPackages: {} }).exec(code),
    value,
  );
});
