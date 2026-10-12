import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, once } from "@backtickjs/core";
import { render } from "@solidjs/testing-library";
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1fznrg4z9k9tx:11:21",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    const counter = globalThis;\n    counter.onceRuns = (counter.onceRuns ?? 0) + 1;\n    return "counted";\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAUwB;IACtB,MAAMA,OAAO,GAAGC,UAA8C;IAC9DD,OAAO,CAACE,QAAQ,GAAG,CAACF,OAAO,CAACE,QAAQ,IAAI,CAAC,IAAI,CAAC;IAC9C,OAAO,SAAS;AAClB,CAAC","names":["counter","globalThis","onceRuns"],"ignoreList":[],"sources":["once/eager.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
const $module1 = {
  id: "1fznrg4z9k9tx:17:18",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nconst web_1 = require("solid-js/web");\nvar _tmpl$ = /*#__PURE__*/ (0, web_1.template)(`<p>ok`);\nexports.default = $splice0 => _tmpl$();\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;;;kBAgBqBA,QAAA,IAAAC,MAAA,EAAgC","names":["$splice0","_tmpl$"],"ignoreList":[],"sources":["once/eager.test.tsx"]}',
  dependencies: ["solid-js/web"],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// A `once` script runs when the bundle does, at its top, as module-level code
// runs when its module loads: once, whether or not what reads it is reached.
// An expression written there would never run (`jsx/host-tag-evaluation`).
const counted = once(cs.create($module0, []));
const unreached = cs.create($module1, [counted]);
describe("a once script", () => {
  it("runs once when the bundle does, reached or not", async () => {
    const counter = globalThis;
    counter.onceRuns = 0;
    const { container } = render(await evaluate(() => unreached));
    assert.equal(container.textContent, "ok");
    assert.equal(counter.onceRuns, 1);
  });
});
it("unreached", async (t) => {
  await snapshotCase(t, "unreached", unreached);
});
