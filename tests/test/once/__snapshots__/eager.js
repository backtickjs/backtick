import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { render } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "ao8286wkty1p:10:16",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const counter = globalThis;\n    counter.scriptRuns = (counter.scriptRuns ?? 0) + 1;\n    return "counted";\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBASmB;IACjB,MAAMA,OAAO,GAAGC,UAAgD;IAChED,OAAO,CAACE,UAAU,GAAG,CAACF,OAAO,CAACE,UAAU,IAAI,CAAC,IAAI,CAAC;IAClD,OAAO,SAAS;AAClB,CAAC","names":["counter","globalThis","scriptRuns"],"ignoreList":[],"sources":["once/eager.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
  scope: "module",
};
const $module1 = {
  id: "ao8286wkty1p:16:18",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>ok`);\nexports.default = $splice0 => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAeqBA,QAAA,IAAAC,MAAA,EAAgC","names":["$splice0","_tmpl$"],"ignoreList":[],"sources":["once/eager.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "module",
};
// A script runs when the bundle does, at its top, as module-level code runs
// when its module loads: once, whether or not what reads it is reached.
const counted = cs.create($module0, []);
const unreached = cs.create($module1, [counted]);
describe("a script", () => {
  it("runs once when the bundle does, reached or not", async () => {
    const counter = globalThis;
    counter.scriptRuns = 0;
    const { container } = render(await evaluate(() => unreached));
    assert.equal(container.textContent, "ok");
    assert.equal(counter.scriptRuns, 1);
  });
});
it("unreached", async (t) => {
  await snapshotCase(t, "unreached", unreached);
});
