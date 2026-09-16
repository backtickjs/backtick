import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { bundler } from "@backtickjs/bundler";
// `undefined` has no form on the wire: a key nobody wrote reads as absent, and
// this language has no value that says otherwise. An optional prop's type lets
// it through, so the refusal is the bundler's, and names the element and the
// prop it came from.
it("refuses an undefined prop", async () => {
  await assert.rejects(bundler.run(_jsx("div", { class: undefined })), {
    message:
      "In the `class` prop of <div />: Can't splice `undefined`: this language has no such value. Use `null` for nothing.",
  });
});
