import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundle } from "@backtickjs/core";
import { island } from "../dist/island.js";
import { jsx } from "../dist/jsx-runtime/index.js";
import { page } from "../dist/page.js";

const content = jsx("p", { children: "hi" });

describe("page", () => {
  it("writes a document around the one island a page is", async () => {
    const html = await page(content);
    assert.match(html, /^<!doctype html><html><head>/);
    assert.match(html, /<\/head><body><slot>.*<\/slot><\/body><\/html>$/s);
    assert.ok(html.includes(`<meta charset="utf-8">`));
  });

  it("draws what it was given", async () => {
    assert.equal(
      await page(content, (backtick) => backtick),
      island(await bundle(content)),
    );
  });

  it("hands a template the island, and returns what it wrote", async () => {
    const html = await page(
      content,
      (backtick) =>
        `<!doctype html><html><head><title>Todos</title></head>` +
        `<body><main>${backtick}</main></body></html>`,
    );
    assert.ok(html.includes("<title>Todos</title>"));
    assert.ok(html.includes(`<main><slot><script type="application/json">`));
    assert.ok(html.includes(`</script></slot></main>`));
    // The default document is gone entirely, not wrapped around this one.
    assert.ok(!html.includes("viewport"));
  });
});
