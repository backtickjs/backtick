import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { renderToString } from "@backtickjs/web-page/server";
import { render, screen } from "@backtickjs/web-testing";
import { snapshotCase } from "../snapshotCase.ts";

// A bundle written into a page's `<script>`, which must not end it early.

// Every character an HTML parser treats specially inside a `<script>`, as text
// a bundle carries. The tests below check none of it survives unescaped.
const scriptCloseText = <p>{`& < > " ' </script> <!-- -->`}</p>;

const text = `& < > " ' </script> <!-- -->`;

const open = `<script type="application/json" data-backtick>`;
const close = `</script><script type="module" src="/client.js"></script>`;

// What `renderToString` put in its bundle script, checking the client follows.
function contentOf(scripts: string): string {
  assert.ok(scripts.startsWith(open) && scripts.endsWith(close));
  return scripts.slice(open.length, -close.length);
}

describe("renderToString", () => {
  it("writes no `<` a script's parser could read", async () => {
    const bundle = await bundler.run(scriptCloseText);
    // The text is in there to escape, or this proves nothing.
    assert.ok(JSON.stringify(bundle).includes("</script>"));
    const scripts = await renderToString(scriptCloseText, "/client.js");
    assert.ok(!contentOf(scripts).includes("<"));
  });

  it("parses back to the same bundle", async () => {
    const json = contentOf(await renderToString(scriptCloseText, "/client.js"));
    assert.deepEqual(JSON.parse(json), await bundler.run(scriptCloseText));
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
