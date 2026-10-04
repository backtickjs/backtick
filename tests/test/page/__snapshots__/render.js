import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render } from "@backtickjs/solid-js/web";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3ilsptqylvqsp:11:24",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_2.insert)(_el$, $splice0);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;kBAU2BA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,EAAID,QAAA;IAAA,OAAAC,IAAA;AAAA,IAAU","names":["$splice0","_el$","_tmpl$","_$insert"],"ignoreList":[],"sources":["page/render.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
const $module1 = {
  id: "3ilsptqylvqsp:25:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1, $splice2) => $splice0()(() => $splice1(), document.getElementById($splice2()));\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAwBO,CAAAA,QAAA,EAAAC,QAAA,EAAAC,QAAA,KAAAF,QAAA,EAAO,CAAC,MAAMC,QAAA,EAAQ,EAAEE,QAAQ,CAACC,cAAc,CAACF,QAAA,EAAG,CAAgB,CAAC","names":["$splice0","$splice1","$splice2","document","getElementById"],"ignoreList":[],"sources":["page/render.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
};
const $module2 = {
  id: "3ilsptqylvqsp:37:29",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>first`);\nexports.default = () => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAoCgC,MAAAA,MAAA,EAAY","names":["_tmpl$"],"ignoreList":[],"sources":["page/render.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module3 = {
  id: "3ilsptqylvqsp:38:30",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>second`);\nexports.default = () => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAqCiC,MAAAA,MAAA,EAAa","names":["_tmpl$"],"ignoreList":[],"sources":["page/render.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
// Text a page's markup would end early on, were the bundle written into it.
const text = `& < > " ' </script> <!-- -->`;
const scriptCloseText = cs.create($module0, [text]);
const drawn = [];
afterEach(() => drawn.splice(0).forEach((container) => container.remove()));
// A page as its server writes it: a container, and the client entry drawing
// into it, run as its module script would be.
async function draw(element) {
  const id = `app-${drawn.length}`;
  const container = document.createElement("div");
  container.id = id;
  document.body.append(container);
  drawn.push(container);
  await evaluate(cs.create($module1, [render, element, id]));
  return container;
}
describe("a page's client entry", () => {
  it("draws the text as written, where it names", async () => {
    const container = await draw(scriptCloseText);
    assert.equal(container.querySelector("p")?.textContent, text);
  });
  it("draws each bundle into its own container", async () => {
    const first = await draw(cs.create($module2, []));
    const second = await draw(cs.create($module3, []));
    assert.equal(first.textContent, "first");
    assert.equal(second.textContent, "second");
  });
});
describe("what each case compiles and bundles to", () => {
  it("scriptCloseText", async (t) => {
    await snapshotCase(t, "scriptCloseText", scriptCloseText);
  });
});
