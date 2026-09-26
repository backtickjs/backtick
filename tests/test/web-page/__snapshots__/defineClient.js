import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { defineClient } from "@backtickjs/web-page/client";
import { renderToString } from "@backtickjs/web-page/server";
import { pageOf } from "./page.ts";
describe("defineClient", () => {
  it("draws every bundle on the page", async () => {
    const window = await pageOf(
      (await renderToString(_jsx("p", { children: "first" }), "/client.js")) +
        (await renderToString(_jsx("p", { children: "second" }), "/client.js")),
    );
    defineClient({ window });
    const drawn = [...window.document.querySelectorAll("p")].map(
      (p) => p.textContent,
    );
    assert.deepEqual(drawn, ["first", "second"]);
  });
  it("leaves a bundle another client already drew", async () => {
    const window = await pageOf(
      await renderToString(_jsx("p", { children: "once" }), "/client.js"),
    );
    defineClient({ window });
    defineClient({ window });
    assert.equal(window.document.querySelectorAll("p").length, 1);
  });
  it("draws a bundle queued after it started", async () => {
    const window = await pageOf("");
    defineClient({ window });
    const script = window.document.createElement("script");
    script.textContent = (
      await renderToString(_jsx("p", { children: "later" }), "/client.js")
    )
      .replace(/^<script>/, "")
      .replace(/<\/script>.*$/, "");
    window.document.body.append(script);
    assert.equal(window.document.querySelector("p")?.textContent, "later");
  });
});
