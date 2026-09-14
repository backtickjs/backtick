import assert from "node:assert/strict";
import { test } from "node:test";
import { createJsxElement } from "@backtickjs/ui";
import { bundler } from "../dist/bundler.js";

// Every character an HTML parser treats specially inside a `<script>`.
const text = `& < > " ' </script> <!-- -->`;

test("writes no `<` a script's parser could read", async () => {
  const bundle = await bundler.run(createJsxElement("p", { children: text }));
  // The text is in there to escape, or this proves nothing.
  assert.ok(JSON.stringify(bundle).includes("</script>"));
  assert.ok(!bundler.stringify(bundle).includes("<"));
});

test("parses back to the same bundle", async () => {
  const bundle = await bundler.run(createJsxElement("p", { children: text }));
  assert.deepEqual(JSON.parse(bundler.stringify(bundle)), bundle);
});
