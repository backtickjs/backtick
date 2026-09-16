import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { render, screen } from "@backtickjs/web-testing";
import { snapshotCase } from "./snapshotCase.ts";

// A bundle written into a page's `<script>`, which must not end it early.

// Every character an HTML parser treats specially inside a `<script>`, as text
// a bundle carries. The tests below check none of it survives unescaped.
const scriptCloseText = <p>{`& < > " ' </script> <!-- -->`}</p>;

const text = `& < > " ' </script> <!-- -->`;

describe("bundler.stringify", () => {
  it("writes no `<` a script's parser could read", async () => {
    const bundle = await bundler.run(scriptCloseText);
    // The text is in there to escape, or this proves nothing.
    assert.ok(JSON.stringify(bundle).includes("</script>"));
    assert.ok(!bundler.stringify(bundle).includes("<"));
  });

  it("parses back to the same bundle", async () => {
    const bundle = await bundler.run(scriptCloseText);
    assert.deepEqual(JSON.parse(bundler.stringify(bundle)), bundle);
  });

  it("draws the text as written", async () => {
    await render(scriptCloseText);
    assert.ok(screen.getByText(text));
  });
});

describe("what each case compiles and bundles to", () => {
  it("scriptCloseText", async (t) => {
    await snapshotCase(t, "scriptCloseText", scriptCloseText);
  });
});
