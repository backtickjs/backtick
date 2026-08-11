import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { clientUrl } from "../dist/browserClient.js";
import { jsx } from "../dist/jsx-runtime/index.js";
import { page } from "../dist/page.js";

const content = jsx("p", { children: "hi" });

describe("page", () => {
  it("writes a document around the one bundle a page is", async () => {
    const html = await page(content);
    assert.match(html, /^<!doctype html>/i);
    assert.ok(html.includes(`<meta charset="utf-8">`));
    assert.match(
      html,
      /<body><script type="application\/json">[\s\S]*<\/body><\/html>$/,
    );
    assert.ok(html.includes(`<script defer src="${clientUrl}"></script>`));
  });

  it("puts what it is given in the head", async () => {
    const html = await page(
      content,
      `<title>Todos</title><link rel="stylesheet" href="/app.css">`,
    );
    assert.ok(html.includes(`<title>Todos</title>`));
    assert.ok(html.includes(`<link rel="stylesheet" href="/app.css">`));
  });

  it("puts nothing in the head that was not asked for", async () => {
    const head = /<head>([\s\S]*?)<\/head>/.exec(await page(content))?.[1];
    assert.equal(
      head,
      `<meta charset="utf-8"><script defer src="${clientUrl}"></script>`,
    );
  });

  it("writes charset whatever it is given, and writes it first", async () => {
    // A bundle is UTF-8 text read back with `JSON.parse`. A document decoded as
    // anything else is every string in the app quietly mangled, and `charset`
    // counts only in the first 1024 bytes.
    for (const head of [undefined, `<title>Todos</title>`, ``]) {
      const html = await page(content, head);
      assert.ok(html.includes(`<head><meta charset="utf-8">`), `head: ${head}`);
      assert.ok(html.indexOf(`charset`) < 1024);
    }
  });

  it("draws in the body, not the head", async () => {
    const html = await page(content, `<title>Todos</title>`);
    assert.ok(html.includes(`<body><script type="application/json">`));
    const head = /<head>([\s\S]*?)<\/head>/.exec(html)?.[1] ?? "";
    assert.equal(
      head,
      `<meta charset="utf-8"><title>Todos</title><script defer src="${clientUrl}"></script>`,
    );
  });
});
