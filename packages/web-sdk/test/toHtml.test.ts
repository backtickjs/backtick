import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { page } from "../dist/page.js";
import { toDataScript } from "../dist/toDataScript.js";
import { client, clientUrl } from "../dist/browserClient.js";
import { toHtml } from "../dist/toHtml.js";

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
  // Two tags: the bundle as data, then the client that reads it. Neither is
  // JavaScript the page wrote, which is why `default-src 'self'` admits it with
  // no hash, no nonce and no exception.
  it("is a whole document: a data block, then the client fetched", () => {
    const doc = toHtml(drawn);
    assert.ok(doc.startsWith("<!doctype html><html><head>"));
    assert.ok(doc.includes('<meta charset="utf-8">'));
    assert.ok(doc.endsWith("</body></html>"));

    const [held, starts] = tags(doc);
    assert.equal(held?.[1], ' type="application/json" data-backtick="body"');
    assert.equal(held?.[2], '{"functions":{},"root":"42"}');
    assert.equal(starts?.[1], ` src="${clientUrl}"`);
    assert.equal(starts?.[2], "", "nothing inline");
    assert.ok(!doc.includes(client), "the client is fetched, not carried");
  });

  // The whole reason a page is small: it carries what it draws, and the client
  // is one cached file however many pages are opened.
  it("costs a page only what it draws", () => {
    assert.ok(toHtml(drawn).length < 400);
  });

  // Named for what is in it, so a build that changes the client changes the
  // URL — which is what makes a year of cache safe rather than reckless.
  it("asks for the client at a URL its bytes decide", () => {
    assert.match(clientUrl, /^\/_backtick\/client-[0-9a-f]{16}\.js$/);
  });

  it("is what `page` builds from a screen", async () => {
    const doc = await page(null as never);
    assert.ok(doc.startsWith("<!doctype html>"));
    assert.ok(doc.includes(`<script src="${clientUrl}">`));
  });
});
