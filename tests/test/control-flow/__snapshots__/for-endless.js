import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `for (;;)` has no condition, so `break` is the only way out.
it("forEndless", async (t) => {
  await snapshotCase(
    t,
    "forEndless",
    cs.create(
      "3voddrkfnxnd9:10:4",
      { params: [] },
      {
        code: "export default () => {\n    let i = 0;\n    for (;;) {\n        if (i === 4) {\n            break;\n        }\n        i = i + 1;\n    }\n    return i;\n};",
        map: '{"version":3,"file":"for-endless.test.jsx","sourceRoot":"","sources":["for-endless.test.tsx"],"names":[],"mappings":"eASO;IACD,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,SAAS,CAAC;QACR,IAAI,CAAC,KAAK,CAAC,EAAE,CAAC;YACZ,MAAM;QACR,CAAC;QACD,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC;IACZ,CAAC;IACD,OAAO,CAAC,CAAC;AACX,CAAC"}',
      },
    ),
  );
});
