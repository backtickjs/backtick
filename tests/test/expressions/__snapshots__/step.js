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
        code: "export default () => {\n  let total = 0;\n  for (let i = 0; i < 3; i++) {\n    total = total + i;\n  }\n  let n = 0.1;\n  const before = n++;\n  const after = ++n;\n  const down = n--;\n  return [total, before, after, down, n];\n};",
        map: '{"version":3,"mappings":"eAWO;EACD,IAAIA,KAAK,GAAG,CAAC;EACb,KAAK,IAAIC,CAAC,GAAG,CAAC,EAAEA,CAAC,GAAG,CAAC,EAAEA,CAAC,EAAE,EAAE;IAC1BD,KAAK,GAAGA,KAAK,GAAGC,CAAC;EACnB;EACA,IAAIC,CAAC,GAAG,GAAG;EACX,MAAMC,MAAM,GAAGD,CAAC,EAAE;EAClB,MAAME,KAAK,GAAG,EAAEF,CAAC;EACjB,MAAMG,IAAI,GAAGH,CAAC,EAAE;EAChB,OAAO,CAACF,KAAK,EAAEG,MAAM,EAAEC,KAAK,EAAEC,IAAI,EAAEH,CAAC,CAAC;AACxC,CAAC","names":["total","i","n","before","after","down"],"ignoreList":[],"sources":["step.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
