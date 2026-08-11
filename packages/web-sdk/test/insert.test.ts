import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundle } from "@backtickjs/core";
import { clientUrl } from "../dist/browserClient.js";
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
    const html = insert(held, "#cart", drawn, clientUrl);
    const cart = /<div id="cart">([\s\S]*?)<\/div>/.exec(html)?.[1];
    assert.ok(cart !== undefined);
    // After what it already held, not instead of it.
    assert.ok(cart.startsWith("loading…"));
    assert.ok(cart.includes(`<script type="application/json">`));
    assert.ok(cart.includes(`<script defer src="${clientUrl}"></script>`));
  });

  it("leaves the rest of the document alone", () => {
    const html = insert(held, "#cart", drawn, clientUrl);
    assert.match(html, /^<!doctype html>/i);
    assert.ok(html.includes("<title>Shop</title>"));
    assert.ok(html.includes("<header>a shop</header>"));
    assert.equal(html.split('<script type="application/json">').length - 1, 1);
  });

  it("draws more than one by calling again with what came back", () => {
    const html = insert(
      insert(held, "#cart", drawn, clientUrl),
      "footer .subscribe",
      other,
      clientUrl,
    );
    assert.equal(html.split('<script type="application/json">').length - 1, 2);
    const cart = /<div id="cart">([\s\S]*?)<\/div>/.exec(html)?.[1] ?? "";
    const subscribe =
      /<div class="subscribe">([\s\S]*?)<\/div>/.exec(html)?.[1] ?? "";
    assert.ok(cart.includes("hi") && !cart.includes("there"));
    assert.ok(subscribe.includes("there") && !subscribe.includes("hi"));
  });

  it("asks for the client where it is told to", () => {
    const asked = `.${clientUrl}`;
    const html = insert(held, "#cart", drawn, asked);
    assert.ok(html.includes(`<script defer src="${asked}"></script>`));
    assert.ok(!html.includes(`<script defer src="${clientUrl}"></script>`));
  });

  it("says so when the selector names nothing", () => {
    assert.throws(
      () => insert(held, "#nowhere", drawn, clientUrl),
      /nothing in the document matches `#nowhere`/,
    );
  });

  it("carries the bundle through the parser intact", async () => {
    // A `<script>` is raw text: what goes in has to come out unescaped, or the
    // bundle is not JSON any more.
    const risky = await bundle(
      jsx("p", { children: "</script> & <b> ünïcode" }),
    );
    const html = insert(held, "#cart", risky, clientUrl);
    const carried =
      /<script type="application\/json">([\s\S]*?)<\/script>/.exec(html)?.[1];
    assert.ok(carried !== undefined);
    const read = JSON.parse(carried) as { root: unknown };
    assert.ok(read.root !== undefined);
    assert.ok(carried.includes("\\u003c/script"));
    assert.ok(!carried.includes("&amp;amp;"));
  });
});
