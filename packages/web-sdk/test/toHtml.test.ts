import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { CLIENT_URL, toHtml } from "../dist/toHtml.js";
import { page } from "../dist/server/page.js";

// The bundle is opaque here: what this writes around it is the whole subject,
// and `JSON.stringify` is what puts it in.
const drawn = { functions: {}, root: "42" } as never;

const script = (html: string) =>
  html.match(/<script type="module">([\s\S]*)<\/script>/)?.[1] ?? "";

describe("a page that draws itself", () => {
  it("carries a module that mounts the bundle into the body", () => {
    assert.equal(
      script(toHtml(drawn)),
      `import{mount}from"${CLIENT_URL}";` +
        `mount({"functions":{},"root":"42"},{target:document.body});`,
    );
  });

  // `browserAssets()` builds its map from the same constant, so the path a page
  // writes and the path the server answers cannot drift apart.
  it("imports the client from where this SDK serves it", () => {
    const html = toHtml(drawn);
    assert.ok(html.includes(`<link rel="modulepreload" href="${CLIENT_URL}">`));
  });

  // A browser does not read an inline module's imports ahead of running it, so
  // the client would not be asked for until the parse finished.
  it("says to fetch the client while the page is still parsing", () => {
    const html = toHtml(drawn);
    assert.ok(html.indexOf("modulepreload") < html.indexOf("<body>"));
  });

  it("is a whole document, doctype and all", () => {
    const html = toHtml(drawn);
    assert.ok(html.startsWith("<!doctype html><html><head>"));
    assert.ok(html.includes('<meta charset="utf-8">'));
    assert.ok(html.endsWith("</body></html>"));
  });

  // One page shape, so nothing an app said can be in it.
  it("holds nothing but the client and the bundle", () => {
    const html = toHtml(drawn);
    assert.equal(html.match(/<script/g)?.length, 1);
    assert.ok(html.includes(`href="${CLIENT_URL}"></head><body>`));
  });
});

describe("what cannot escape the page", () => {
  // A script element ends at the first `</script>` in its text, whoever wrote
  // it — so no `<` may survive into one. The bundle is the only thing in this
  // document an app controls, which makes it the only thing to get right.
  it("a bundle that contains a closing script tag", () => {
    const html = toHtml({
      root: "</script><img src=x onerror=alert(1)>",
    } as never);
    assert.ok(!script(html).includes("</script>"));
    assert.ok(script(html).includes("\\u003c/script>"));
  });
});

describe("a page as an answer", () => {
  it("is the document, said to be one", async () => {
    const answer = await page(null);
    assert.equal(answer.headers.get("content-type"), "text/html");
    const html = await answer.text();
    assert.ok(html.startsWith("<!doctype html>"));
    assert.ok(script(html).includes("{target:document.body}"));
  });
});
