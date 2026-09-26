import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { fireEvent, render, screen } from "@backtickjs/solid-js/testing";
import { userEvent } from "@testing-library/user-event";
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
  // inserts, and it draws nothing. The prefix, which the runtime adds to a
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
    const div = await drawn(_jsx("div", { tabIndex: 2 }));
    assert.deepEqual(attributes(div), { tabindex: "2" });
  });
});
describe("a field's value", () => {
  // Once a field is edited, its `value` and `checked` attributes are only its
  // defaults, so a write that reaches the attribute changes nothing shown.
  async function Field() {
    return cs.create(
      "wz2l9fdwjjts:111:11",
      { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
      {
        code: 'export default ($0) => {\n    const text = $0()("first");\n    const isOn = $0()(false);\n    return (<div>\n          <input aria-label="text" value={text[0]()}/>\n          <input type="checkbox" aria-label="on" checked={isOn[0]()}/>\n          <button onclick={() => {\n            text[1]("second");\n            isOn[1](true);\n        }}>\n            write\n          </button>\n        </div>);\n};',
        map: '{"version":3,"file":"attributes.test.jsx","sourceRoot":"","sources":["attributes.test.tsx"],"names":[],"mappings":"eA8Gc;IACR,MAAM,IAAI,GAAG,IAAa,CAAC,OAAO,CAAC,CAAC;IACpC,MAAM,IAAI,GAAG,IAAa,CAAC,KAAK,CAAC,CAAC;IAClC,OAAO,CACL,CAAC,GAAG,CACF;UAAA,CAAC,KAAK,CAAC,UAAU,CAAC,MAAM,CAAC,KAAK,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,EAC1C;UAAA,CAAC,KAAK,CAAC,IAAI,CAAC,UAAU,CAAC,UAAU,CAAC,IAAI,CAAC,OAAO,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,EAAE,CAAC,EAC1D;UAAA,CAAC,MAAM,CACL,OAAO,CAAC,CAAC,GAAG,EAAE;YACZ,IAAI,CAAC,CAAC,CAAC,CAAC,QAAQ,CAAC,CAAC;YAClB,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC;QAChB,CAAC,CAAC,CAEF;;UACF,EAAE,MAAM,CACV;QAAA,EAAE,GAAG,CAAC,CACP,CAAC;AACJ,CAAC"}',
      },
    );
  }
  it("follows a write after the field was edited", async () => {
    await render(_jsx(Field, {}));
    const text = screen.getByLabelText("text");
    const on = screen.getByLabelText("on");
    fireEvent.input(text, { target: { value: "typed" } });
    await userEvent.click(on);
    await userEvent.click(on);
    await userEvent.click(screen.getByRole("button", { name: "write" }));
    assert.equal(text.value, "second");
    assert.equal(on.checked, true);
  });
});
