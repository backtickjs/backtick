import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { defineClient } from "@backtickjs/web-page/client";
import { renderToString } from "@backtickjs/web-page/server";
afterEach(() => {
  document.body.replaceChildren();
});
describe("defineClient", () => {
  it("draws every bundle on the page", async () => {
    document.body.innerHTML =
      (await renderToString(_jsx("p", { children: "first" }), "/client.js")) +
      (await renderToString(_jsx("p", { children: "second" }), "/client.js"));
    defineClient({ window });
    const drawn = [...document.querySelectorAll("p")].map((p) => p.textContent);
    assert.deepEqual(drawn, ["first", "second"]);
  });
  it("leaves a bundle another client already drew", async () => {
    document.body.innerHTML = await renderToString(
      _jsx("p", { children: "once" }),
      "/client.js",
    );
    defineClient({ window });
    defineClient({ window });
    assert.equal(document.querySelectorAll("p").length, 1);
  });
});
