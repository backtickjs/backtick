import { jsx as _jsx } from "@backtickjs/solid-js/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, once } from "@backtickjs/core";
const createRoot = {
  "@backtickjs": "ClientImport",
  name: "createRoot",
  from: "solid-js",
  version: "1.9.14",
};
import { evaluate } from "../evaluate.ts";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "2oga2ilvg6xob:15:9",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => "default";\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAcY,eAAS","names":[],"ignoreList":[],"sources":["once/expanded.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "expression",
};
const $module1 = {
  id: "2oga2ilvg6xob:18:19",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = $splice0 => ({\n    fallback: $splice0()\n});\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAiBsBA,QAAA,KAAC;IAAEC,QAAQ,EAAED,QAAA;CAAkB,CAAC","names":["$splice0","fallback"],"ignoreList":[],"sources":["once/expanded.test.tsx"]}',
  dependencies: [],
  params: [{ kind: "splice", bindings: [] }],
  kind: "expression",
};
const $module2 = {
  id: "2oga2ilvg6xob:19:14",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => [$splice0(), $splice1()];\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAkBiB,CAAAA,QAAA,EAAAC,QAAA,MAACD,QAAA,EAAM,EAAEC,QAAA,EAAM,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["once/expanded.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
const $module3 = {
  id: "2oga2ilvg6xob:24:33",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = ($splice0, $splice1) => $splice0()(() => $splice1());\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAuBoC,CAAAA,QAAA,EAAAC,QAAA,KAAAD,QAAA,EAAW,CAAC,MAAMC,QAAA,EAAM,CAAC","names":["$splice0","$splice1"],"ignoreList":[],"sources":["once/expanded.test.tsx"]}',
  dependencies: [],
  params: [
    { kind: "splice", bindings: [] },
    { kind: "splice", bindings: [] },
  ],
  kind: "expression",
};
// A server component spliced into a `once` script: the script is one value,
// so the component runs once however many places read the value, where an
// element drawn in two places runs its component twice.
let runs = 0;
async function Default() {
  runs = runs + 1;
  return cs.create($module0, []);
}
const theme = once(cs.create($module1, [_jsx(Default, {})]));
const twice = cs.create($module2, [theme, theme]);
describe("a server component in a once script", () => {
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
