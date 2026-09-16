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

  it("still writes everything else as an attribute", () => {
    const el = node();
    dom().setProperty(el as never, "href", "/counter");
    dom().setProperty(el as never, "id", "press");
    assert.equal(el.attrs["href"], "/counter");
    assert.equal(el.attrs["id"], "press");
    assert.equal(el.style["cssText"], undefined);
  });
});

describe("an svg tag", () => {
  // `document.createElement("path")` is an `HTMLUnknownElement`: it parses, it
  // inserts, and it draws nothing. The prefix, which the interpreter adds to a
  // tag drawn inside an `svg`, is what says which namespace it is from.
  it("is made in the SVG namespace, without its prefix", () => {
    const made: { ns: string | null; tag: string }[] = [];
    const global = globalThis as unknown as { document: unknown };
    const had = global.document;
    global.document = {
      createElement: (tag: string) => {
        made.push({ ns: null, tag });
        return node();
      },
      createElementNS: (ns: string, tag: string) => {
        made.push({ ns, tag });
        return node(ns);
      },
    };
    try {
      dom().createElement("svg:path");
      dom().createElement("div");
    } finally {
      global.document = had;
    }
    assert.deepEqual(made, [
      { ns: SVG, tag: "path" },
      { ns: null, tag: "div" },
    ]);
  });
});

describe("an attribute's case", () => {
  // HTML's attribute names are case-insensitive and SVG's are not, so one rule
  // cannot serve both: lowercasing is what makes a prop and an attribute the
  // same name in HTML, and what loses `viewBox` in SVG.
  it("is kept in the SVG namespace", () => {
    const el = node(SVG);
    dom().setProperty(el as never, "viewBox", "0 0 279 38");
    dom().setProperty(el as never, "gradientTransform", "rotate(90)");
    assert.equal(el.attrs["viewBox"], "0 0 279 38");
    assert.equal(el.attrs["gradientTransform"], "rotate(90)");
    assert.equal(el.attrs["viewbox"], undefined);
  });

  // The schema spells these the way SVG does, so a prop, the name on the wire
  // and the string handed to `setAttribute` are one name — nothing here has a
  // table to get from one to another.
  it("writes a hyphenated presentation name straight through", () => {
    const el = node(SVG);
    dom().setProperty(el as never, "stroke-width", 2);
    dom().setProperty(el as never, "fill-rule", "evenodd");
    dom().setProperty(el as never, "color-interpolation-filters", "sRGB");
    assert.equal(el.attrs["stroke-width"], "2");
    assert.equal(el.attrs["fill-rule"], "evenodd");
    assert.equal(el.attrs["color-interpolation-filters"], "sRGB");
  });

  // And the ones SVG spells camel itself, which lowercasing would lose.
  it("leaves an attribute SVG spells camel alone", () => {
    const el = node(SVG);
    dom().setProperty(el as never, "gradientTransform", "rotate(90)");
    dom().setProperty(el as never, "numOctaves", 3);
    assert.equal(el.attrs["gradientTransform"], "rotate(90)");
    assert.equal(el.attrs["numOctaves"], "3");
    assert.equal(el.attrs["gradienttransform"], undefined);
  });

  it("is still folded down in HTML", () => {
    const el = node();
    dom().setProperty(el as never, "tabIndex", 2);
    assert.equal(el.attrs["tabindex"], "2");
    assert.equal(el.attrs["tabIndex"], undefined);
  });

  it("does not stop a style going through the CSSOM", () => {
    const el = node(SVG);
    dom().setProperty(el as never, "style", "fill: royalblue");
    assert.equal(el.style["cssText"], "fill: royalblue");
    assert.equal(el.attrs["style"], undefined);
  });
});
