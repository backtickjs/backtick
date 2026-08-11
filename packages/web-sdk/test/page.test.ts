import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { clientUrl } from "../dist/browserClient.js";
import { jsx } from "../dist/jsx-runtime/index.js";
import { page } from "../dist/page.js";

const content = jsx("p", { children: "hi" });

describe("page", () => {
  it("writes a document around the one island a page is", async () => {
    const html = await page(content);
    assert.match(html, /^<!doctype html>/i);
    assert.ok(html.includes(`<meta charset="utf-8">`));
    assert.match(
      html,
      /<body><script type="application\/json">[\s\S]*<\/body><\/html>$/,
    );
    assert.ok(html.includes(`<script defer src="${clientUrl}"></script>`));
  });

  it("draws into a document it is given, keeping its head", async () => {
    const html = await page(
      content,
      `<!doctype html><html><head><title>Todos</title>` +
        `<link rel="stylesheet" href="/app.css"></head><body></body></html>`,
    );
    assert.ok(html.includes("<title>Todos</title>"));
    assert.ok(html.includes(`<link rel="stylesheet" href="/app.css">`));
    assert.ok(html.includes(`<body><script type="application/json">`));
    // The default document is gone entirely, not wrapped around this one.
    assert.ok(!html.includes("viewport"));
  });

  it("draws after what the body already holds", async () => {
    const html = await page(
      content,
      `<!doctype html><html><head></head><body><h1>Shop</h1></body></html>`,
    );
    assert.ok(
      html.includes('<body><h1>Shop</h1><script type="application/json">'),
    );
  });
});
