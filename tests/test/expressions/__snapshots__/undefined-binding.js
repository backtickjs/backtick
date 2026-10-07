import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
import { createRoot } from "@backtickjs/solid-js";
import { evaluate } from "../evaluate.ts";
const $module0 = {
  id: "39pisanvrmq3l:13:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    const undefined = 1;\n    return undefined;\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAYWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb,MAAMC,SAAS,GAAG,CAAC;IACnB,OAAOA,SAAS;AAClB,CAAC,CAAC","names":["$splice0","undefined"],"ignoreList":[],"sources":["expressions/undefined-binding.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module1 = {
  id: "39pisanvrmq3l:22:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => (undefined => undefined + 1)(2));\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAqBWA,QAAA,IAAAA,QAAA,EAAW,CAAC,MAAM,CAAEC,SAAiB,IAAKA,SAAS,GAAG,CAAC,EAAE,CAAC,CAAC,CAAC","names":["$splice0","undefined"],"ignoreList":[],"sources":["expressions/undefined-binding.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module2 = {
  id: "39pisanvrmq3l:31:8",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => $splice0()(() => {\n    {\n        const undefined = 1;\n    }\n    return undefined;\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBA8BWA,QAAA,IAAAA,QAAA,EAAW,CAAC;IACb;QACE,MAAMC,SAAS,GAAG,CAAC;IACrB;IACA,OAAOA,SAAS;AAClB,CAAC,CAAC","names":["$splice0","undefined"],"ignoreList":[],"sources":["expressions/undefined-binding.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
// A script may bind `undefined`, as a JavaScript function may: in its scope the
// name is that binding, and outside it `undefined` is the value it always is.
describe("a script's own `undefined`", () => {
  it("is what it was bound to, in its scope", async () => {
    assert.equal(await evaluate(cs.create($module0, [createRoot])), 1);
    assert.equal(await evaluate(cs.create($module1, [createRoot])), 3);
  });
  it("leaves `undefined` the value outside it", async () => {
    assert.equal(await evaluate(cs.create($module2, [createRoot])), undefined);
  });
});
