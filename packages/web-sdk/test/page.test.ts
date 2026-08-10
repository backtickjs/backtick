import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { page } from "../dist/page.js";
import { toHtml } from "../dist/toHtml.js";

const html = (drawn: unknown = null) => toHtml(drawn as never);

const scripts = (html: string) =>
  [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((each) => each[1]);

const client = readFileSync(
  new URL("../dist/browser/backtick.js", import.meta.url),
  "utf8",
);

describe("a page that draws itself", () => {
  it("carries the client and the call that draws, in that order", async () => {
    const [carried, draws] = scripts(html());
    assert.equal(carried, client);
    assert.ok(draws?.startsWith("backtick.render("));
    assert.ok(draws?.endsWith("backtick.dom,document.body);"));
  });

  // Nothing is fetched once the document arrives, so there is no URL for a page
  // and a server to agree on and no way for them to disagree.
  it("asks for nothing else", async () => {
    const doc = html();
    assert.equal(doc.match(/<script/g)?.length, 2);
    assert.ok(!doc.includes("src="));
    assert.ok(!doc.includes("modulepreload"));
  });

  // Two tags, not one: this way the client's bytes are the same on every page,
  // so a hash of it is worth pinning in a content policy.
  it("keeps the client identical whatever it draws", async () => {
    assert.equal(scripts(html("a"))[0], scripts(html("b"))[0]);
  });

  it("is a whole document", async () => {
    const doc = await page(null as never);
    assert.ok(doc.startsWith("<!doctype html><html><head>"));
    assert.ok(doc.includes('<meta charset="utf-8">'));
    assert.ok(doc.endsWith("</body></html>"));
  });
});

// A script element ends at the first `</script` in its text, whoever wrote it.
describe("what cannot end the page early", () => {
  it("a bundle that holds a closing tag", async () => {
    const drawn = scripts(html("</script><img src=x onerror=alert(1)>"))[1];
    assert.ok(!drawn?.includes("</script"));
    assert.ok(drawn?.includes("\\u003c/script>"));
  });

  // The client is JavaScript at large, where `\u003c` would be a syntax error
  // outside a string — so only the one sequence that ends a script is touched.
  it("the client, if it ever held one", async () => {
    assert.ok(!scripts(html())[0]?.includes("</script"));
  });
});
