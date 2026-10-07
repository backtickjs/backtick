import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "1qmqxi23sdk0m:9:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let i = 0;\n    let total = 0;\n    while (i < 5) {\n        total = total + i;\n        if (i === 3) {\n            return total;\n        }\n        i = i + 1;\n    }\n    return total;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAQO;IACD,IAAIA,CAAC,GAAG,CAAC;IACT,IAAIC,KAAK,GAAG,CAAC;IACb,OAAOD,CAAC,GAAG,CAAC,EAAE;QACZC,KAAK,GAAGA,KAAK,GAAGD,CAAC;QACjB,IAAIA,CAAC,KAAK,CAAC,EAAE;YACX,OAAOC,KAAK;QACd;QACAD,CAAC,GAAGA,CAAC,GAAG,CAAC;IACX;IACA,OAAOC,KAAK;AACd,CAAC","names":["i","total"],"ignoreList":[],"sources":["control-flow/while-loop.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
it("whileLoop", async (t) => {
  await snapshotCase(t, "whileLoop", cs.create($module0, []));
});
