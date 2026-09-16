import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { render } from "@backtickjs/web-testing";
// How a prop lands on the element it was drawn on: as the attribute a page's
// own markup would have written.
const SVG = "http://www.w3.org/2000/svg";
const HTML = "http://www.w3.org/1999/xhtml";
async function drawn(value) {
  const { container } = await render(value);
  return container.firstElementChild;
}
// Every attribute an element holds, by the name it was written under.
function attributes(element) {
  return Object.fromEntries(
    [...element.attributes].map((attribute) => [
      attribute.name,
      attribute.value,
    ]),
  );
}
describe("a prop", () => {
  it("is written as an attribute", async () => {
    const link = await drawn(
      _jsx("a", { href: "/counter", id: "press", children: "go" }),
    );
    assert.deepEqual(attributes(link), { href: "/counter", id: "press" });
  });
});
describe("an svg tag", () => {
  // `document.createElement("path")` is an `HTMLUnknownElement`: it parses, it
  // inserts, and it draws nothing. The prefix, which the interpreter adds to a
  // tag drawn inside an `svg`, is what says which namespace it is from.
  it("is made in the SVG namespace, without its prefix", async () => {
    const root = await drawn(
      _jsx("div", { children: _jsx("svg", { children: _jsx("path", {}) }) }),
    );
    const path = root.querySelector("path");
    assert.equal(path.namespaceURI, SVG);
    assert.equal(path.localName, "path");
    assert.equal(root.namespaceURI, HTML);
  });
});
describe("an attribute's case", () => {
  // HTML's attribute names are case-insensitive and SVG's are not, so one rule
  // cannot serve both: lowercasing is what makes a prop and an attribute the
  // same name in HTML, and what loses `viewBox` in SVG.
  it("is kept in the SVG namespace", async () => {
    const svg = await drawn(_jsx("svg", { viewBox: "0 0 279 38" }));
    assert.deepEqual(attributes(svg), { viewBox: "0 0 279 38" });
  });
  // The schema spells these the way SVG does, so a prop, the name on the wire
  // and the string handed to `setAttribute` are one name — nothing here has a
  // table to get from one to another.
  it("writes a hyphenated presentation name straight through", async () => {
    const svg = await drawn(
      _jsxs("svg", {
        children: [
          _jsx("path", { "stroke-width": 2, "fill-rule": "evenodd" }),
          _jsx("filter", { "color-interpolation-filters": "sRGB" }),
        ],
      }),
    );
    assert.deepEqual(attributes(svg.querySelector("path")), {
      "stroke-width": "2",
      "fill-rule": "evenodd",
    });
    assert.deepEqual(attributes(svg.querySelector("filter")), {
      "color-interpolation-filters": "sRGB",
    });
  });
  // And the ones SVG spells camel itself, which lowercasing would lose.
  it("leaves an attribute SVG spells camel alone", async () => {
    const svg = await drawn(
      _jsxs("svg", {
        children: [
          _jsx("linearGradient", { gradientTransform: "rotate(90)" }),
          _jsx("feTurbulence", { numOctaves: 3 }),
        ],
      }),
    );
    assert.deepEqual(attributes(svg.children[0]), {
      gradientTransform: "rotate(90)",
    });
    assert.deepEqual(attributes(svg.children[1]), { numOctaves: "3" });
  });
  it("is still folded down in HTML", async () => {
    // @ts-expect-error: the schema declares no `tabIndex` on a `div`
    const div = await drawn(_jsx("div", { tabIndex: 2 }));
    assert.deepEqual(attributes(div), { tabindex: "2" });
  });
});
