import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "oeocksjd9384:10:13",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>never`);\nexports.default = () => {\n    throw new Error("boom");\n    return props => _tmpl$();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBASgB;IACd,MAAM,IAAIA,KAAK,CAAC,MAAM,CAAC;IACvB,OAAQC,KAAS,IAAAC,MAAA,EAAiB;AACpC,CAAC","names":["Error","props","_tmpl$"],"ignoreList":[],"sources":["jsx/host-tag-evaluation.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module1 = {
  id: "oeocksjd9384:15:16",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<b>counted`);\nexports.default = () => {\n    const counter = globalThis;\n    counter.evaluations = (counter.evaluations ?? 0) + 1;\n    return props => _tmpl$();\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAcmB;IACjB,MAAMA,OAAO,GAAGC,UAAiD;IACjED,OAAO,CAACE,WAAW,GAAG,CAACF,OAAO,CAACE,WAAW,IAAI,CAAC,IAAI,CAAC;IACpD,OAAQC,KAAS,IAAAC,MAAA,EAAmB;AACtC,CAAC","names":["counter","globalThis","evaluations","props","_tmpl$"],"ignoreList":[],"sources":["jsx/host-tag-evaluation.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [],
};
const $module2 = {
  id: "oeocksjd9384:21:18",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>ok`);\nexports.default = $splice0 => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAoBqBA,QAAA,IAAAC,MAAA,EAAiC","names":["$splice0","_tmpl$"],"ignoreList":[],"sources":["jsx/host-tag-evaluation.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
const $module3 = {
  id: "oeocksjd9384:22:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nconst web_2 = require("solid-js/web");\nconst web_3 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>`);\nexports.default = $splice0 => (() => {\n    var _el$ = _tmpl$();\n    (0, web_3.insert)(_el$, () => ($Counted => (0, web_2.createComponent)($Counted, {}))($splice0()), null);\n    (0, web_3.insert)(_el$, () => ($Counted => (0, web_2.createComponent)($Counted, {}))($splice0()), null);\n    return _el$;\n})();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;;;kBAqBiBA,QAAA;IAAA,IAAAC,IAAA,GAAAC,MAAA;IAAAC,gBAAA,EAAAF,IAAA,QAEb,CAAAG,QAAA,IAAAC,yBAAA,EAACD,QAAQ,KAAG,EAAXJ,QAAA,EAAQ,CACT;IAAAG,gBAAA,EAAAF,IAAA,SAAAG,QAAA,IAAAC,yBAAA,EAACD,QAAQ,KAAG,EAAXJ,QAAA,EAAQ,CACX;IAAA,OAAAC,IAAA;AAAA,IACD","names":["$splice0","_el$","_tmpl$","_$insert","$Counted","_$createComponent"],"ignoreList":[],"sources":["jsx/host-tag-evaluation.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
};
// A host tag is a splice: its script is evaluated where the tag stands, each
// time it is reached, as a value splice is.
const Boom = cs.create($module0, []);
const Counted = cs.create($module1, []);
const unreached = cs.create($module2, [Boom]);
const twice = cs.create($module3, [Counted]);
it("hostTagEvaluation", async (t) => {
  await snapshotCase(t, "hostTagEvaluation", { unreached, twice });
});
describe("a host tag", () => {
  it("is not evaluated where it isn't reached", async () => {
    const { container } = render(await evaluate(() => unreached));
    assert.equal(container.textContent, "ok");
  });
  it("is evaluated each time it is reached", async () => {
    const counter = globalThis;
    counter.evaluations = 0;
    const { container } = render(await evaluate(() => twice));
    assert.equal(container.textContent?.replace(/\s/g, ""), "countedcounted");
    assert.equal(counter.evaluations, 2);
  });
});
