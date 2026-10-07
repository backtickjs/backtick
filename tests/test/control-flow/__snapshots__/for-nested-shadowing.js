import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "lj6vk8127ex6:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let out = "";\n    for (let i = 0; i < 2; i = i + 1) {\n        const i = "-";\n        for (let j = 0; j < 2; j = j + 1) {\n            out = out + i + j;\n        }\n    }\n    return out;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWO;IACD,IAAIA,GAAG,GAAG,EAAE;IACZ,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAGA,CAAC,GAAG,CAAC,EAAE;QAChC,MAAMA,CAAC,GAAG,GAAG;QACb,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAGA,CAAC,GAAG,CAAC,EAAE;YAChCF,GAAG,GAAGA,GAAG,GAAGC,CAAC,GAAGC,CAAC;QACnB;IACF;IACA,OAAOF,GAAG;AACZ,CAAC","names":["out","i","j"],"ignoreList":[],"sources":["control-flow/for-nested-shadowing.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// Nested headers reusing a name, and a body that shadows the header's own:
// the update still means the header's binding, because names resolve to their
// binding before anything is lowered.
it("forNestedShadowing", async (t) => {
  await snapshotCase(t, "forNestedShadowing", cs.create($module0, []));
});
