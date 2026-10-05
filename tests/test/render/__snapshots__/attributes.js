import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createSignal } from "@backtickjs/solid-js";
import { render, fireEvent, screen } from "@solidjs/testing-library";
import { userEvent } from "@testing-library/user-event";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "3g78mueuhurnr:32:29",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<a href=/counter id=press>go`);\nexports.default = () => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBA+BgC,MAAAA,MAAA,EAI3B","names":["_tmpl$"],"ignoreList":[],"sources":["render/attributes.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module1 = {
  id: "3g78mueuhurnr:46:29",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><svg><path>`);\nexports.default = () => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBA6CgC,MAAAA,MAAA,EAM3B","names":["_tmpl$"],"ignoreList":[],"sources":["render/attributes.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module2 = {
  id: "3g78mueuhurnr:65:28",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<svg viewBox="0 0 279 38">`);\nexports.default = () => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAgE+B,MAAAA,MAAA,EAA4B","names":["_tmpl$"],"ignoreList":[],"sources":["render/attributes.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module3 = {
  id: "3g78mueuhurnr:73:28",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<svg><path stroke-width=2 fill-rule=evenodd></path><filter color-interpolation-filters=sRGB>`);\nexports.default = () => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAwE+B,MAAAA,MAAA,EAK1B","names":["_tmpl$"],"ignoreList":[],"sources":["render/attributes.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module4 = {
  id: "3g78mueuhurnr:90:28",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<svg><linearGradient gradientTransform=rotate(90)></linearGradient><feTurbulence numOctaves=3>`);\nexports.default = () => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAyF+B,MAAAA,MAAA,EAK1B","names":["_tmpl$"],"ignoreList":[],"sources":["render/attributes.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module5 = {
  id: "3g78mueuhurnr:103:28",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div tabindex=2>`);\nexports.default = () => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAsG+B,MAAAA,MAAA,EAAoB","names":["_tmpl$"],"ignoreList":[],"sources":["render/attributes.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module6 = {
  id: "3g78mueuhurnr:112:11",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<div><input aria-label=text><input type=checkbox aria-label=on><button>write`);\nexports.default = $splice0 => {\n    const [text, setText] = $splice0()("first");\n    const [isOn, setIsOn] = $splice0()(false);\n    return (() => {\n        var _el$ = _tmpl$(), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling, _el$4 = _el$3.nextSibling;\n        _el$4.$$click = () => {\n            setText("second");\n            setIsOn(true);\n        };\n        (0, web_3.effect)(() => _el$2.value = text());\n        (0, web_3.effect)(() => _el$3.checked = isOn());\n        return _el$;\n    })();\n};\n(0, web_2.delegateEvents)(["click"]);\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBA+GcA,QAAA;IACR,MAAM,CAACC,IAAI,EAAEC,OAAO,CAAC,GAAGF,QAAA,EAAa,CAAC,OAAO,CAAC;IAC9C,MAAM,CAACG,IAAI,EAAEC,OAAO,CAAC,GAAGJ,QAAA,EAAa,CAAC,KAAK,CAAC;IAC5C;QAAA,IAAAK,IAAA,GAAAC,MAAA,IAAAC,KAAA,GAAAF,IAAA,CAAAG,UAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAG,WAAA,EAAAC,KAAA,GAAAF,KAAA,CAAAC,WAAA;QAAAC,KAAA,CAAAC,OAAA,GAKe;YACPV,OAAO,CAAC,QAAQ,CAAC;YACjBE,OAAO,CAAC,IAAI,CAAC;QACf,CAAC;QAAAS,gBAAA,QAAAN,KAAA,CAAAO,KAAA,GAN6Bb,IAAI,EAAE;QAAAY,gBAAA,QAAAJ,KAAA,CAAAM,OAAA,GACUZ,IAAI,EAAE;QAAA,OAAAE,IAAA;IAAA;AAW5D,CAAC","names":["$splice0","text","setText","isOn","setIsOn","_el$","_tmpl$","_el$2","firstChild","_el$3","nextSibling","_el$4","$$click","_$effect","value","checked"],"ignoreList":[],"sources":["render/attributes.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
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
    const link = await drawn(cs.create($module0, []));
    assert.deepEqual(attributes(link), { href: "/counter", id: "press" });
  });
});
describe("an svg tag", () => {
  // `document.createElement("path")` is an `HTMLUnknownElement`: it parses, it
  // inserts, and it draws nothing. The prefix, which the runtime adds to a
  // tag drawn inside an `svg`, is what says which namespace it is from.
  it("is made in the SVG namespace, without its prefix", async () => {
    const root = await drawn(cs.create($module1, []));
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
    const svg = await drawn(cs.create($module2, []));
    assert.deepEqual(attributes(svg), { viewBox: "0 0 279 38" });
  });
  // The schema spells these the way SVG does, so a prop, the name on the wire
  // and the string handed to `setAttribute` are one name — nothing here has a
  // table to get from one to another.
  it("writes a hyphenated presentation name straight through", async () => {
    const svg = await drawn(cs.create($module3, []));
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
    const svg = await drawn(cs.create($module4, []));
    assert.deepEqual(attributes(svg.children[0]), {
      gradientTransform: "rotate(90)",
    });
    assert.deepEqual(attributes(svg.children[1]), { numOctaves: "3" });
  });
  it("is still folded down in HTML", async () => {
    const div = await drawn(cs.create($module5, []));
    assert.deepEqual(attributes(div), { tabindex: "2" });
  });
});
describe("a field's value", () => {
  // Once a field is edited, its `value` and `checked` attributes are only its
  // defaults, so a write that reaches the attribute changes nothing shown.
  async function Field() {
    return cs.create($module6, [createSignal]);
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
