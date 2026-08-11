import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { clientUrl } from "../dist/browserClient.js";
import { embed } from "../dist/embed.js";
import { jsx } from "../dist/jsx-runtime/index.js";

const held =
  `<!doctype html><html><head><title>Shop</title></head><body>` +
  `<header>a shop</header>` +
  `<div id="cart">loading…</div>` +
  `<footer><div class="subscribe"></div></footer>` +
  `</body></html>`;

describe("embed", () => {
  it("draws into what a selector names, keeping what was there", async () => {
    const html = await embed(
      held,
      { "#cart": jsx("p", { children: "hi" }) },
      clientUrl,
    );
    const cart = /<div id="cart">([\s\S]*?)<\/div>/.exec(html)?.[1];
    assert.ok(cart !== undefined);
    // After what it already held, not instead of it.
    assert.ok(cart.startsWith("loading…"));
    assert.ok(cart.includes(`<script type="application/json">`));
    assert.ok(cart.includes(`<script defer src="${clientUrl}"></script>`));
  });

  it("leaves the rest of the document alone", async () => {
    const html = await embed(
      held,
      { "#cart": jsx("p", { children: "hi" }) },
      clientUrl,
    );
    assert.match(html, /^<!doctype html>/i);
    assert.ok(html.includes("<title>Shop</title>"));
    assert.ok(html.includes("<header>a shop</header>"));
    assert.equal(html.split('<script type="application/json">').length - 1, 1);
  });

  it("draws as many islands as it is given, each where it was named", async () => {
    const html = await embed(
      held,
      {
        "#cart": jsx("p", { children: "cart" }),
        "footer .subscribe": jsx("p", { children: "subscribe" }),
      },
      clientUrl,
    );
    assert.equal(html.split('<script type="application/json">').length - 1, 2);
    const cart = /<div id="cart">([\s\S]*?)<\/div>/.exec(html)?.[1] ?? "";
    const subscribe =
      /<div class="subscribe">([\s\S]*?)<\/div>/.exec(html)?.[1] ?? "";
    assert.ok(cart.includes("cart") && !cart.includes("subscribe"));
    assert.ok(subscribe.includes("subscribe") && !subscribe.includes("cart"));
  });

  it("asks for the client where it is told to", async () => {
    // A document served under somebody else's prefix asks relatively.
    const asked = `.${clientUrl}`;
    const html = await embed(
      held,
      { "#cart": jsx("p", { children: "hi" }) },
      asked,
    );
    assert.ok(html.includes(`<script defer src="${asked}"></script>`));
    assert.ok(!html.includes(`<script defer src="${clientUrl}"></script>`));
  });

  it("says so when a selector names nothing", async () => {
    await assert.rejects(
      () =>
        embed(held, { "#nowhere": jsx("p", { children: "hi" }) }, clientUrl),
      /nothing in the document matches `#nowhere`/,
    );
  });

  it("carries the bundle through the parser intact", async () => {
    // The document is parsed and written out again, and a `<script>` is raw
    // text: what goes in has to come out unescaped, or the bundle is not JSON
    // any more.
    const html = await embed(
      held,
      { "#cart": jsx("p", { children: "</script> & <b> ünïcode" }) },
      clientUrl,
    );
    const carried =
      /<script type="application\/json">([\s\S]*?)<\/script>/.exec(html)?.[1];
    assert.ok(carried !== undefined);
    const read = JSON.parse(carried) as { root: unknown };
    assert.ok(read.root !== undefined);
    assert.ok(carried.includes("\\u003c/script"));
    assert.ok(!carried.includes("&amp;amp;"));
  });

  it("changes nothing when it is given nothing to draw", async () => {
    const html = await embed(held, {}, clientUrl);
    assert.ok(!html.includes('<script type="application/json">'));
    assert.ok(html.includes("<title>Shop</title>"));
  });
});
