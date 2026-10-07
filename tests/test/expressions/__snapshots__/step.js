import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "l4vdws2hl3xc:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let total = 0;\n    for (let i = 0; i < 3; i++) {\n        total = total + i;\n    }\n    let n = 0.1;\n    const before = n++;\n    const after = ++n;\n    const down = n--;\n    return [total, before, after, down, n];\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWO;IACD,IAAIA,KAAK,GAAG,CAAC;IACb,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,EAAE,EAAE;QAC1BD,KAAK,GAAGA,KAAK,GAAGC,CAAC;IACnB;IACA,IAAIC,CAAC,GAAG,GAAG;IACX,MAAMC,MAAM,GAAGD,CAAC,EAAE;IAClB,MAAME,KAAK,GAAG,EAAEF,CAAC;IACjB,MAAMG,IAAI,GAAGH,CAAC,EAAE;IAChB,OAAO,CAACF,KAAK,EAAEG,MAAM,EAAEC,KAAK,EAAEC,IAAI,EAAEH,CAAC,CAAC;AACxC,CAAC","names":["total","i","n","before","after","down"],"ignoreList":[],"sources":["expressions/step.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// `++` and `--` step a variable by one. A prefix step answers the value after
// the step, and a postfix step the value before it — exactly, for a fraction
// too.
it("step", async (t) => {
  await snapshotCase(t, "step", cs.create($module0, []));
});
