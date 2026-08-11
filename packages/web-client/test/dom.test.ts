import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { dom } from "../src/dom.ts";

// A node that records which route a value took onto it.
function node() {
  const attrs: { [name: string]: string } = {};
  const style: { [name: string]: string } = {};
  return {
    attrs,
    style,
    setAttribute: (name: string, value: string) => {
      attrs[name] = value;
    },
    removeAttribute: (name: string) => {
      delete attrs[name];
    },
    addEventListener: () => {},
  };
}

describe("writing a style", () => {
  // `style-src` blocks writing a `style` attribute and says nothing about
  // `cssText`, so the route matters: through the attribute a page needs
  // `unsafe-inline`, and through the CSSOM it needs no `style-src` at all.
  it("goes through the CSSOM, never the attribute", () => {
    const el = node();
    dom.setProperty(el as never, "style", "color: royalblue");
    assert.equal(el.style["cssText"], "color: royalblue");
    assert.equal(el.attrs["style"], undefined);
  });

  it("still writes everything else as an attribute", () => {
    const el = node();
    dom.setProperty(el as never, "href", "/counter");
    dom.setProperty(el as never, "id", "press");
    assert.equal(el.attrs["href"], "/counter");
    assert.equal(el.attrs["id"], "press");
    assert.equal(el.style["cssText"], undefined);
  });
});
