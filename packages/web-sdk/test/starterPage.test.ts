import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundle } from "@backtickjs/core";
import { client } from "../dist/index.js";
import { jsx } from "../dist/jsx-runtime/index.js";
import { starterPage } from "../dist/starterPage.js";

const bundled = await bundle(jsx("p", { children: "hi" }));
const page = starterPage(bundled);
const titled = starterPage(bundled, "<title>Shop</title>");

describe("starterPage", () => {
  it("is a whole document", () => {
    assert.match(page, /^<!DOCTYPE html>/i);
    assert.ok(page.includes(`<meta charset="utf-8">`));
  });

  it("carries the client, rather than asking for one", () => {
    const inline = /<script>([\s\S]*?)<\/script>/.exec(page)?.[1];
    assert.equal(inline, client.source);
    // Nothing to fetch: no `src` anywhere in the document.
    assert.doesNotMatch(page, /<script[^>]+src=/);
  });

  it("writes `head` as it stands, after the charset and before the client", () => {
    const head = /<head>([\s\S]*?)<\/head>/.exec(titled)?.[1] ?? "";
    assert.ok(head.includes("<title>Shop</title>"));
    assert.ok(head.indexOf(`<meta charset="utf-8">`) < head.indexOf("<title>"));
    assert.ok(head.indexOf("<title>") < head.indexOf("<script>"));
  });

  it("writes no head of its own when given none", () => {
    assert.doesNotMatch(page, /<title>/);
  });

  it("carries the bundle it was given, in the body", () => {
    const body = /<body>([\s\S]*)<\/body>/.exec(page)?.[1] ?? "";
    assert.ok(body.includes("<backtick-bundle></backtick-bundle>"));
    const held = /<script type="application\/json">([\s\S]*?)<\/script>/.exec(
      body,
    )?.[1];
    assert.deepEqual(JSON.parse(held!.replaceAll("\\u003c", "<")), bundled);
  });
});
