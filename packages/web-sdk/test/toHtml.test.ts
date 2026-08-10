import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { page } from "../dist/page.js";
import { toDataScript } from "../dist/toDataScript.js";
import { client, toHtml } from "../dist/toHtml.js";

const drawn = { functions: {}, root: "42" } as never;

const tags = (html: string) => [
  ...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g),
];

// The attribute name and the escape are the package's contract with its own
// client: a page that spelled either differently would draw nothing.
describe("a bundle as a page carries it", () => {
  it("is data, and says where it goes", () => {
    const [block] = tags(toDataScript(drawn, "#main"));
    assert.equal(block?.[1], ' type="application/json" data-backtick="#main"');
    assert.equal(block?.[2], '{"functions":{},"root":"42"}');
  });

  // A `</script` ends a script element wherever it stands, data block or not.
  it("cannot end its own tag early", () => {
    const html = toDataScript(
      { root: "</script><img src=x onerror=alert(1)>" } as never,
      "body",
    );
    assert.equal(tags(html).length, 1);
    assert.ok(html.includes("\\u003c/script>"));
  });
});

describe("a page that draws itself", () => {
  // Two tags: the bundle as data, then the client that reads it. Nothing here
  // is a call — the client starts itself from what the page carries.
  it("is a whole document: a data block, then the client", () => {
    const doc = toHtml(drawn);
    assert.ok(doc.startsWith("<!doctype html><html><head>"));
    assert.ok(doc.includes('<meta charset="utf-8">'));
    assert.ok(doc.endsWith("</body></html>"));

    const [held, starts] = tags(doc);
    assert.equal(held?.[1], ' type="application/json" data-backtick="body"');
    assert.equal(held?.[2], '{"functions":{},"root":"42"}');
    assert.equal(starts?.[2], client);
  });

  // The bundle is carried once, as data. A page that also wrote it into the
  // script that draws it would be twice its size.
  it("carries the bundle once", () => {
    const doc = toHtml(drawn);
    assert.equal(doc.split('"root":"42"').length - 1, 1);
  });

  it("cannot be ended early by the bundle it holds", () => {
    const doc = toHtml({
      root: "</script><img src=x onerror=alert(1)>",
    } as never);
    assert.equal(tags(doc).length, 2);
    assert.ok(doc.includes("\\u003c/script>"));
  });

  it("is what `page` builds from a screen", async () => {
    assert.ok((await page(null as never)).startsWith("<!doctype html>"));
  });
});
