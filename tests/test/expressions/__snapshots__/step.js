import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `++` and `--` step a variable by one. A prefix step answers the value after
// the step, and a postfix step the value before it — exactly, for a fraction
// too.
it("step", async (t) => {
  await snapshotCase(
    t,
    "step",
    cs.create(
      "l4vdws2hl3xc:12:4",
      { params: [] },
      {
        code: "export default () => {\n    let total = 0;\n    for (let i = 0; i < 3; i++) {\n        total = total + i;\n    }\n    let n = 0.1;\n    const before = n++;\n    const after = ++n;\n    const down = n--;\n    return [total, before, after, down, n];\n};",
        map: '{"version":3,"file":"step.test.jsx","sourceRoot":"","sources":["expressions/step.test.tsx"],"names":[],"mappings":"eAWO;IACD,IAAI,KAAK,GAAG,CAAC,CAAC;IACd,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,EAAE,EAAE,CAAC;QAC3B,KAAK,GAAG,KAAK,GAAG,CAAC,CAAC;IACpB,CAAC;IACD,IAAI,CAAC,GAAG,GAAG,CAAC;IACZ,MAAM,MAAM,GAAG,CAAC,EAAE,CAAC;IACnB,MAAM,KAAK,GAAG,EAAE,CAAC,CAAC;IAClB,MAAM,IAAI,GAAG,CAAC,EAAE,CAAC;IACjB,OAAO,CAAC,KAAK,EAAE,MAAM,EAAE,KAAK,EAAE,IAAI,EAAE,CAAC,CAAC,CAAC;AACzC,CAAC"}',
      },
    ),
  );
});
