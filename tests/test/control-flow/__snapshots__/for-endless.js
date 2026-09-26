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
        code: "export default () => {\n  let i = 0;\n  for (;;) {\n    if (i === 4) {\n      break;\n    }\n    i = i + 1;\n  }\n  return i;\n};",
        map: '{"version":3,"mappings":"eASO;EACD,IAAIA,CAAC,GAAG,CAAC;EACT,SAAS;IACP,IAAIA,CAAC,KAAK,CAAC,EAAE;MACX;IACF;IACAA,CAAC,GAAGA,CAAC,GAAG,CAAC;EACX;EACA,OAAOA,CAAC;AACV,CAAC","names":["i"],"ignoreList":[],"sources":["for-endless.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
