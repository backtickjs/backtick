import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { toHtml } from "../dist/toHtml.js";
import { page } from "../dist/server/page.js";

// The bundle is opaque here: what this writes around it is the whole subject,
// and `JSON.stringify` is what puts it in.
const drawn = { functions: {}, root: "42" } as never;

const scripts = (html: string) =>
  [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((each) => each[1]);

const client = readFileSync(
  new URL("../dist/browser/backtick.js", import.meta.url),
  "utf8",
);

describe("a page that draws itself", () => {
  it("carries the client and the call that draws, in that order", () => {
    const [carried, draws] = scripts(toHtml(drawn));
    assert.equal(carried, client);
    assert.equal(
      draws,
      `backtick.render({"functions":{},"root":"42"},` +
        `backtick.dom,document.body);`,
    );
  });

  // Nothing is fetched once the document arrives, so there is no URL for a page
  // and a server to agree on and no way for them to disagree.
  it("asks for nothing else", () => {
    const html = toHtml(drawn);
    assert.equal(html.match(/<script/g)?.length, 2);
    assert.ok(!html.includes("src="));
    assert.ok(!html.includes("modulepreload"));
  });

  // Two tags, not one: this way the client's bytes are the same on every page,
  // so a hash of it is worth pinning in a content policy.
  it("keeps the client identical whatever it draws", () => {
    assert.equal(scripts(toHtml(drawn))[0], scripts(toHtml(null as never))[0]);
  });

  it("is a whole document, doctype and all", () => {
    const html = toHtml(drawn);
    assert.ok(html.startsWith("<!doctype html><html><head>"));
    assert.ok(html.includes('<meta charset="utf-8">'));
    assert.ok(html.endsWith("</body></html>"));
  });
});

// A script element ends at the first `</script` in its text, whoever wrote it.
describe("what cannot end the page early", () => {
  it("a bundle that holds a closing tag", () => {
    const html = toHtml({
      root: "</script><img src=x onerror=alert(1)>",
    } as never);
    assert.ok(!scripts(html)[1]?.includes("</script"));
    assert.ok(scripts(html)[1]?.includes("\\u003c/script>"));
  });

  // The client is JavaScript at large, where `\u003c` would be a syntax error
  // outside a string — so only the one sequence that ends a script is touched.
  it("the client, if it ever held one", () => {
    assert.ok(!scripts(toHtml(drawn))[0]?.includes("</script"));
  });
});

describe("a page as an answer", () => {
  it("is the document, said to be one", async () => {
    const answer = await page(null);
    assert.equal(answer.headers.get("content-type"), "text/html");
    const html = await answer.text();
    assert.ok(html.startsWith("<!doctype html>"));
    assert.ok(html.includes("backtick.dom,document.body);"));
  });
});
