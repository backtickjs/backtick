import { jsx as _jsx } from "@backtickjs/jsx-solid/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs } from "@backtickjs/core";
const createRoot = {
  "@backtickjs": "ClientImport",
  name: "createRoot",
  from: "solid-js",
  version: "1.9.14",
};
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "3hglixhjhta7u:14:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => "default";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAaY,eAAS","names":[],"ignoreList":[],"sources":["once/expanded.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
  scope: "function",
};
const $module1 = {
  id: "3hglixhjhta7u:17:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => ({\n    fallback: $splice0()\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAgBiBA,QAAA,KAAC;IAAEC,QAAQ,EAAED,QAAA;CAAkB,CAAC","names":["$splice0","fallback"],"ignoreList":[],"sources":["once/expanded.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
  scope: "module",
};
const $module2 = {
  id: "3hglixhjhta7u:18:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => [$splice0(), $splice1()];\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAiBiB,CAAAA,QAAA,EAAAC,QAAA,MAACD,QAAA,EAAM,EAAEC,QAAA,EAAM,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["once/expanded.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
  scope: "module",
};
const $module3 = {
  id: "3hglixhjhta7u:23:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(() => $splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAsBoC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAW,CAAC,MAAMC,QAAA,EAAM,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["once/expanded.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
  scope: "function",
};
// A server component spliced into a script: the script is one value, so the
// component runs once however many places read the value.
let runs = 0;
async function Default() {
  runs = runs + 1;
  return cs.create($module0, []);
}
const theme = cs.create($module1, [_jsx(Default, {})]);
const twice = cs.create($module2, [theme, theme]);
describe("a server component in a script", () => {
  it("runs once for the bundle", async () => {
    runs = 0;
    const pair = await evaluate(cs.create($module3, [createRoot, twice]));
    assert.equal(runs, 1);
    assert.equal(pair[0], pair[1]);
    assert.equal(pair[0].fallback, "default");
  });
});
it("expanded", async (t) => {
  await snapshotCase(t, "expanded", twice);
});
