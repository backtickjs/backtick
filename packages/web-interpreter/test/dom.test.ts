import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { rendererOptions } from "../src/rendererOptions.ts";

// Built when called: a test puts its own document in place first.
const dom = () => rendererOptions(globalThis.document);

// A node that records which route a value took onto it.
function node(namespace = "http://www.w3.org/1999/xhtml") {
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
    namespaceURI: namespace,
  };
}

const SVG = "http://www.w3.org/2000/svg";

// Everything else a prop does to an element is read off a rendered page in
// `tests/`. The route a style takes is not: a page reads the same attribute
// either way, and only a CSP tells them apart.
describe("writing a style", () => {
  // `style-src` blocks writing a `style` attribute and says nothing about
  // `cssText`, so the route matters: through the attribute a page needs
  // `unsafe-inline`, and through the CSSOM it needs no `style-src` at all.
  it("goes through the CSSOM, never the attribute", () => {
    const el = node();
    dom().setProperty(el as never, "style", "color: royalblue");
    assert.equal(el.style["cssText"], "color: royalblue");
    assert.equal(el.attrs["style"], undefined);
  });

  // SVG keeps an attribute's case, and a style still takes the same route.
  it("goes through the CSSOM in SVG too", () => {
    const el = node(SVG);
    dom().setProperty(el as never, "style", "fill: royalblue");
    assert.equal(el.style["cssText"], "fill: royalblue");
    assert.equal(el.attrs["style"], undefined);
  });
});
