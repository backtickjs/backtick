import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/core";
import { parseHTML } from "linkedom";
import { insert } from "../dist/insert.js";
import { jsx } from "../dist/jsx-runtime/index.js";

const held =
  `<!doctype html><html><head><title>Shop</title></head><body>` +
  `<header>a shop</header>` +
  `<div id="cart">loading…</div>` +
  `<footer><div class="subscribe"></div></footer>` +
  `</body></html>`;

const bundle = await bundler.run(jsx("p", { children: "hi" }));
const other = await bundler.run(jsx("p", { children: "there" }));

describe("insert", () => {
  it("draws into what the selector names, keeping what was there", () => {
    const html = insert(held, "#cart", bundle);
    const cart = /<div id="cart">([\s\S]*?)<\/div>/.exec(html)?.[1];
    assert.ok(cart !== undefined);
    // After what it already held, not instead of it.
    assert.ok(cart.startsWith("loading…"));
    assert.ok(cart.includes("<backtick-renderer"));
  });

  it("leaves the rest of the document alone", () => {
    const html = insert(held, "#cart", bundle);
    assert.match(html, /^<!doctype html>/i);
    assert.ok(html.includes("<title>Shop</title>"));
    assert.ok(html.includes("<header>a shop</header>"));
    assert.equal(html.split("<backtick-renderer").length - 1, 1);
  });

  it("draws more than one by calling again with what came back", () => {
    const html = insert(
      insert(held, "#cart", bundle),
      "footer .subscribe",
      other,
    );
    assert.equal(html.split("<backtick-renderer").length - 1, 2);
    const cart = /<div id="cart">([\s\S]*?)<\/div>/.exec(html)?.[1] ?? "";
    const subscribe =
      /<div class="subscribe">([\s\S]*?)<\/div>/.exec(html)?.[1] ?? "";
    assert.ok(cart.includes("hi") && !cart.includes("there"));
    assert.ok(subscribe.includes("there") && !subscribe.includes("hi"));
  });

  it("writes data and nothing that draws it", () => {
    // The document asks for the client itself; what goes in is the bundle and
    // an element saying to draw it, and neither fetches anything.
    const html = insert(held, "#cart", bundle);
    assert.ok(!html.includes("src="));
    assert.ok(!html.includes("_backtick"));
  });

  it("says so when the selector names nothing", () => {
    assert.throws(
      () => insert(held, "#nowhere", bundle),
      /nothing in the document matches `#nowhere`/,
    );
  });

  it("carries the bundle through the parser intact", async () => {
    // The document is parsed and written out again, and the bundle rides in an
    // attribute: what a serializer escapes there a parser reads back, or the
    // bundle is not JSON any more.
    const risky = await bundler.run(
      jsx("p", { children: "</script> & <b> ünïcode" }),
    );
    const html = insert(held, "#cart", risky);
    const carried = parseHTML(html)
      .document.querySelector("backtick-renderer")
      ?.getAttribute("bundle");
    assert.ok(carried !== undefined && carried !== null);
    assert.deepEqual(JSON.parse(carried), risky);
  });

  it("writes one element, carrying the bundle it draws", () => {
    // The bundle is a prop rather than something beside it: nothing about where
    // the element sits decides what it draws, so a second bundle is a second
    // value rather than a second element.
    const html = insert(held, "#cart", bundle);
    assert.match(html, /<backtick-renderer bundle="[\s\S]*?"><\/backtick-renderer>/);
  });

  it("reads back exactly the bundle it was given", () => {
    // An attribute is escaped where a script's raw text was not, so what this
    // holds is longer than the JSON — what has to be equal is what comes back.
    const html = insert(held, "#cart", bundle);
    const carried = parseHTML(html)
      .document.querySelector("backtick-renderer")
      ?.getAttribute("bundle");
    assert.equal(carried, JSON.stringify(bundle));
  });

  it("writes no script of any kind", () => {
    // The bundle rides on the element that draws it. Nothing here is a script
    // tag, so a content policy has nothing to say about what this wrote, and an
    // app's own json in the document is none of backtick's business.
    const html = insert(held, "#cart", bundle);
    assert.ok(!html.includes("<script"));
  });
});
