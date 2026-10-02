import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, fireEvent, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
// How a prop lands on the element it was drawn on: as the attribute a page's
// own markup would have written.
const SVG = "http://www.w3.org/2000/svg";
const HTML = "http://www.w3.org/1999/xhtml";
async function drawn(value) {
  const { container } = render(await evaluate(() => value));
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
      cs.create(
        "3bxd5p1c8e0pp:32:29",
        { params: [] },
        '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<a href=/counter id=press>go`);\nexports.default = () => _tmpl$();\n}',
        '{"version":3,"file":"module.jsx","mappings":";;;;;kBA+BgC,MAAAA,MAAA,EAExB","names":["_tmpl$"],"ignoreList":[],"sources":["render/attributes.test.tsx"]}',
        ["solid-js/web"],
      ),
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
      cs.create(
        "3bxd5p1c8e0pp:44:29",
        { params: [] },
        '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><svg><path>`);\nexports.default = () => _tmpl$();\n}',
        '{"version":3,"file":"module.jsx","mappings":";;;;;kBA2CgC,MAAAA,MAAA,EAItB","names":["_tmpl$"],"ignoreList":[],"sources":["render/attributes.test.tsx"]}',
        ["solid-js/web"],
      ),
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
    const svg = await drawn(
      cs.create(
        "3bxd5p1c8e0pp:61:28",
        { params: [] },
        '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<svg viewBox="0 0 279 38">`);\nexports.default = () => _tmpl$();\n}',
        '{"version":3,"file":"module.jsx","mappings":";;;;;kBA4D+B,MAAAA,MAAA,EAA4B","names":["_tmpl$"],"ignoreList":[],"sources":["render/attributes.test.tsx"]}',
        ["solid-js/web"],
      ),
    );
    assert.deepEqual(attributes(svg), { viewBox: "0 0 279 38" });
  });
  // The schema spells these the way SVG does, so a prop, the name on the wire
  // and the string handed to `setAttribute` are one name — nothing here has a
  // table to get from one to another.
  it("writes a hyphenated presentation name straight through", async () => {
    const svg = await drawn(
      cs.create(
        "3bxd5p1c8e0pp:69:28",
        { params: [] },
        '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<svg><path stroke-width=2 fill-rule=evenodd></path><filter color-interpolation-filters=sRGB>`);\nexports.default = () => _tmpl$();\n}',
        '{"version":3,"file":"module.jsx","mappings":";;;;;kBAoE+B,MAAAA,MAAA,EAGrB","names":["_tmpl$"],"ignoreList":[],"sources":["render/attributes.test.tsx"]}',
        ["solid-js/web"],
      ),
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
      cs.create(
        "3bxd5p1c8e0pp:84:28",
        { params: [] },
        '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<svg><linearGradient gradientTransform=rotate(90)></linearGradient><feTurbulence numOctaves=3>`);\nexports.default = () => _tmpl$();\n}',
        '{"version":3,"file":"module.jsx","mappings":";;;;;kBAmF+B,MAAAA,MAAA,EAGrB","names":["_tmpl$"],"ignoreList":[],"sources":["render/attributes.test.tsx"]}',
        ["solid-js/web"],
      ),
    );
    assert.deepEqual(attributes(svg.children[0]), {
      gradientTransform: "rotate(90)",
    });
    assert.deepEqual(attributes(svg.children[1]), { numOctaves: "3" });
  });
  it("is still folded down in HTML", async () => {
    const div = await drawn(
      cs.create(
        "3bxd5p1c8e0pp:95:28",
        { params: [] },
        '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div tabindex=2>`);\nexports.default = () => _tmpl$();\n}',
        '{"version":3,"file":"module.jsx","mappings":";;;;;kBA8F+B,MAAAA,MAAA,EAAoB","names":["_tmpl$"],"ignoreList":[],"sources":["render/attributes.test.tsx"]}',
        ["solid-js/web"],
      ),
    );
    assert.deepEqual(attributes(div), { tabindex: "2" });
  });
});
describe("a field's value", () => {
  // Once a field is edited, its `value` and `checked` attributes are only its
  // defaults, so a write that reaches the attribute changes nothing shown.
  async function Field() {
    return cs.create(
      "3bxd5p1c8e0pp:104:11",
      { params: [{ kind: "splice", value: createSignal, bindings: [] }] },
      '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><input aria-label=text><input type=checkbox aria-label=on><button>write`);\nexports.default = $splice0 => {\n    const text = $splice0()("first");\n    const isOn = $splice0()(false);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling;\n        _el$4.$$click = () => {\n            text[1]("second");\n            isOn[1](true);\n        };\n        (0, web_3.effect)(() => _el$2.value = text[0]());\n        (0, web_3.effect)(() => _el$3.checked = isOn[0]());\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
      '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAuGcA,QAAA;IACR,MAAMC,IAAI,GAAGD,QAAA,EAAa,CAAC,OAAO,CAAC;IACnC,MAAME,IAAI,GAAGF,QAAA,EAAa,CAAC,KAAK,CAAC;IACjC;QAAA,IAAAG,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAC,WAAA;QAAAC,KAAA,CAAAC,OAAA,GAKe;YACPT,IAAI,CAAC,CAAC,CAAC,CAAC,QAAQ,CAAC;YACjBC,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC;QACf,CAAC;QAAAS,gBAAA,QAAAN,KAAA,CAAAO,KAAA,GAN6BX,IAAI,CAAC,CAAC,CAAC,EAAE;QAAAU,gBAAA,QAAAJ,KAAA,CAAAM,OAAA,GACOX,IAAI,CAAC,CAAC,CAAC,EAAE;QAAA,OAAAC,IAAA;IAAA;AAW/D,CAAC","names":["$splice0","text","isOn","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","$$click","_$effect","value","checked"],"ignoreList":[],"sources":["render/attributes.test.tsx"]}',
      ["solid-js/web"],
    );
  }
  it("follows a write after the field was edited", async () => {
    render(await evaluate(() => _jsx(Field, {})));
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
