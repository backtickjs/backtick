import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { describe, it } from "node:test";
import { client, render } from "../dist/render.js";
import { page } from "../dist/page.js";
import { toHtml } from "../dist/toHtml.js";

const drawn = { functions: {}, root: "42" } as never;

const scripts = (html: string) =>
  [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((each) => each[1]);

describe("the call that draws a bundle", () => {
  it("is the call and nothing else", () => {
    assert.equal(
      render(drawn, { into: "body" }),
      `backtick.render({"functions":{},"root":"42"},` +
        `backtick.dom,document.querySelector("body"));`,
    );
  });

  // The whole reason the client is its own export: a document with two things
  // to render carries it once and calls twice.
  it("costs only the call for a second thing to render", () => {
    const one = client + render(drawn, { into: "#a" });
    const two = one + render(drawn, { into: "#b" });
    assert.ok(two.length - one.length < 200);
    assert.equal(two.split("var backtick=").length - 1, 1);
  });

  // A document written by someone else says where this goes.
  it("draws into what it was told", () => {
    assert.ok(
      render(drawn, { into: "#main" }).endsWith(
        `,backtick.dom,document.querySelector("#main"));`,
      ),
    );
  });

  // The selector is written as a string literal, so a quote in it cannot end
  // the argument and start something else.
  it("cannot be escaped through the selector", () => {
    const js = render(drawn, { into: '#a");alert(1);//' });
    assert.ok(js.includes('document.querySelector("#a\\");alert(1);//")'));
  });
});

// A script element ends at the first `</script` in its text, whoever wrote it.
describe("what cannot end a script early", () => {
  it("a bundle that holds a closing tag", () => {
    const js = render(
      { root: "</script><img src=x onerror=alert(1)>" } as never,
      {
        into: "body",
      },
    );
    assert.ok(!js.includes("</script"));
    assert.ok(js.includes("\\u003c/script>"));
  });

  // The client is JavaScript at large, where `\u003c` would be a syntax error
  // outside a string — esbuild writes `<\/script` in string literals instead.
  it("the client, if it ever held one", () => {
    assert.ok(!client.includes("</script"));
  });
});

const tags = (html: string) => [
  ...html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g),
];

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
