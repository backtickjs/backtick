import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
const $module0 = {
  id: "28bjtc1esuow3:12:4",
  code: '(module, exports, require) => {\n"use strict";\nObject.defineProperty(exports, "__esModule", { value: true });\nexports.default = () => {\n    let out = "";\n    for (let i = 0; i < 5; i = i + 1) {\n        if (i === 1) {\n            continue;\n        }\n        while (true) {\n            out = out + i;\n            break;\n        }\n        if (i === 3) {\n            break;\n        }\n    }\n    return out;\n};\n}',
  map: '{"version":3,"file":"module.jsx","mappings":";;;kBAWO;IACD,IAAIA,GAAG,GAAG,EAAE;IACZ,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAGA,CAAC,GAAG,CAAC,EAAE;QAChC,IAAIA,CAAC,KAAK,CAAC,EAAE;YACX;QACF;QACA,OAAO,IAAI,EAAE;YACXD,GAAG,GAAGA,GAAG,GAAGC,CAAC;YACb;QACF;QACA,IAAIA,CAAC,KAAK,CAAC,EAAE;YACX;QACF;IACF;IACA,OAAOD,GAAG;AACZ,CAAC","names":["out","i"],"ignoreList":[],"sources":["control-flow/loop-jumps.test.tsx"]}',
  dependencies: [],
  params: [],
  kind: "block",
};
// `continue` runs the update before the next turn — a loop that skipped it
// would never end — and each jump means the loop it is written in, the inner
// one here.
it("loopJumps", async (t) => {
  await snapshotCase(t, "loopJumps", cs.create($module0, []));
});
