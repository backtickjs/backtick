import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `continue` runs the update before the next turn — a loop that skipped it
// would never end — and each jump means the loop it is written in, the inner
// one here.
it("loopJumps", async (t) => {
  await snapshotCase(
    t,
    "loopJumps",
    cs.create(
      "28bjtc1esuow3:12:4",
      { params: [] },
      {
        code: 'export default () => {\n    let out = "";\n    for (let i = 0; i < 5; i = i + 1) {\n        if (i === 1) {\n            continue;\n        }\n        while (true) {\n            out = out + i;\n            break;\n        }\n        if (i === 3) {\n            break;\n        }\n    }\n    return out;\n};',
        map: '{"version":3,"file":"loop-jumps.test.jsx","sourceRoot":"","sources":["control-flow/loop-jumps.test.tsx"],"names":[],"mappings":"eAWO;IACD,IAAI,GAAG,GAAG,EAAE,CAAC;IACb,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,EAAE,CAAC;QACjC,IAAI,CAAC,KAAK,CAAC,EAAE,CAAC;YACZ,SAAS;QACX,CAAC;QACD,OAAO,IAAI,EAAE,CAAC;YACZ,GAAG,GAAG,GAAG,GAAG,CAAC,CAAC;YACd,MAAM;QACR,CAAC;QACD,IAAI,CAAC,KAAK,CAAC,EAAE,CAAC;YACZ,MAAM;QACR,CAAC;IACH,CAAC;IACD,OAAO,GAAG,CAAC;AACb,CAAC"}',
      },
    ),
  );
});
