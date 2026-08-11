import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundle } from "@backtickjs/core";
import { insert } from "../dist/insert.js";
import { jsx } from "../dist/jsx-runtime/index.js";

const held =
  `<!doctype html><html><head><title>Shop</title></head><body>` +
  `<header>a shop</header>` +
  `<div id="cart">loading…</div>` +
  `<footer><div class="subscribe"></div></footer>` +
  `</body></html>`;

const drawn = await bundle(jsx("p", { children: "hi" }));
const other = await bundle(jsx("p", { children: "there" }));

describe("insert", () => {
  it("draws into what the selector names, keeping what was there", () => {
    const html = insert(held, "#cart", drawn);
    const cart = /<div id="cart">([\s\S]*?)<\/div>/.exec(html)?.[1];
    assert.ok(cart !== undefined);
    // After what it already held, not instead of it.
    assert.ok(cart.startsWith("loading…"));
    assert.ok(cart.includes(`<script type="application/json">`));
  });

  it("leaves the rest of the document alone", () => {
    const html = insert(held, "#cart", drawn);
    assert.match(html, /^<!doctype html>/i);
    assert.ok(html.includes("<title>Shop</title>"));
    assert.ok(html.includes("<header>a shop</header>"));
    assert.equal(html.split(`<script type="application/json">`).length - 1, 1);
  });

  it("draws more than one by calling again with what came back", () => {
    const html = insert(
      insert(held, "#cart", drawn),
      "footer .subscribe",
      other,
    );
    assert.equal(html.split(`<script type="application/json">`).length - 1, 2);
    const cart = /<div id="cart">([\s\S]*?)<\/div>/.exec(html)?.[1] ?? "";
    const subscribe =
      /<div class="subscribe">([\s\S]*?)<\/div>/.exec(html)?.[1] ?? "";
    assert.ok(cart.includes("hi") && !cart.includes("there"));
    assert.ok(subscribe.includes("there") && !subscribe.includes("hi"));
  });

  it("writes data and nothing that draws it", () => {
    // The document asks for the client itself; what goes in is the bundle and
    // an element saying to draw it, and neither fetches anything.
    const html = insert(held, "#cart", drawn);
    assert.ok(!html.includes("src="));
    assert.ok(!html.includes("_backtick"));
  });

  it("says so when the selector names nothing", () => {
    assert.throws(
      () => insert(held, "#nowhere", drawn),
      /nothing in the document matches `#nowhere`/,
    );
  });

  it("carries the bundle through the parser intact", async () => {
    // The document is parsed and written out again, and a `<script>` is raw
    // text: what goes in comes out unescaped, or the bundle is not JSON any
    // more.
    const risky = await bundle(
      jsx("p", { children: "</script> & <b> ünïcode" }),
    );
    const html = insert(held, "#cart", risky);
    const carried =
      /<script type="application\/json">([\s\S]*?)<\/script>/.exec(html)?.[1];
    assert.ok(carried !== undefined);
    assert.deepEqual(JSON.parse(carried), risky);
  });

  it("writes the bundle and then the element that draws it", () => {
    // The order is the whole of how the client finds its work: the bundle is the
    // element in front, which the parser finished before it reached this one.
    const html = insert(held, "#cart", drawn);
    assert.match(
      html,
      /<script type="application\/json">[\s\S]*?<\/script><backtick-bundle><\/backtick-bundle>/,
    );
  });

  it("costs no more than the bundle it carries", () => {
    // Raw text in a script, so nothing about it is escaped for an attribute.
    const html = insert(held, "#cart", drawn);
    const carried =
      /<script type="application\/json">([\s\S]*?)<\/script>/.exec(html)?.[1];
    assert.ok(carried !== undefined);
    assert.equal(carried.length, JSON.stringify(drawn).length);
  });

  it("carries the bundle as a type no browser runs", () => {
    // A data block: never executed, and never checked by a content policy. What
    // is drawn is whatever script the element follows, so nothing is looked up
    // by this type and an app's own json is none of backtick's business.
    assert.ok(
      insert(held, "#cart", drawn).includes(`<script type="application/json">`),
    );
  });
});
