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
        code: 'import { template as _$template } from "solid-js/web";\nimport { delegateEvents as _$delegateEvents } from "solid-js/web";\nimport { effect as _$effect } from "solid-js/web";\nvar _tmpl$ = /*#__PURE__*/_$template(`<div><input aria-label=text><input type=checkbox aria-label=on><button>write`);\nexport default $0 => {\n  const text = $0()("first");\n  const isOn = $0()(false);\n  return (() => {\n    var _el$ = _tmpl$(),\n      _el$2 = _el$.firstChild,\n      _el$3 = _el$2.nextSibling,\n      _el$4 = _el$3.nextSibling;\n    _el$4.$$click = () => {\n      text[1]("second");\n      isOn[1](true);\n    };\n    _$effect(() => _el$2.value = text[0]());\n    _$effect(() => _el$3.checked = isOn[0]());\n    return _el$;\n  })();\n};\n_$delegateEvents(["click"]);',
        map: '{"version":3,"mappings":";;;;eA8GcA,EAAA;EACR,MAAMC,IAAI,GAAGD,EAAA,EAAa,CAAC,OAAO,CAAC;EACnC,MAAME,IAAI,GAAGF,EAAA,EAAa,CAAC,KAAK,CAAC;EACjC;IAAA,IAAAG,IAAA,GAAAC,MAAA;MAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA;MAAAC,KAAA,GAAAF,KAAA,CAAAC,WAAA;IAAAC,KAAA,CAAAC,OAAA,GAKe,MAAK;MACZT,IAAI,CAAC,CAAC,CAAC,CAAC,QAAQ,CAAC;MACjBC,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC;IACf,CAAC;IAAAS,QAAA,OAAAN,KAAA,CAAAO,KAAA,GAN6BX,IAAI,CAAC,CAAC,CAAC,EAAE;IAAAU,QAAA,OAAAJ,KAAA,CAAAM,OAAA,GACOX,IAAI,CAAC,CAAC,CAAC,EAAE;IAAA,OAAAC,IAAA;EAAA;AAW/D,CAAC;AAAAW,gBAAA","names":["$0","text","isOn","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","$$click","_$effect","value","checked","_$delegateEvents"],"ignoreList":[],"sources":["attributes.test.tsx"]}',
        imports: [
          {
            from: "solid-js/web",
            range: [0, 54],
            bindings: [{ name: "template", local: "_$template" }],
          },
          {
            from: "solid-js/web",
            range: [55, 121],
            bindings: [{ name: "delegateEvents", local: "_$delegateEvents" }],
          },
          {
            from: "solid-js/web",
            range: [122, 172],
            bindings: [{ name: "effect", local: "_$effect" }],
          },
        ],
        exportAt: 291,
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
