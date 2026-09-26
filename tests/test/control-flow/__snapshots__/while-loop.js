import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("whileLoop", async (t) => {
  await snapshotCase(
    t,
    "whileLoop",
    cs.create(
      "1qmqxi23sdk0m:9:4",
      { params: [] },
      {
        code: "export default () => {\n  let i = 0;\n  let total = 0;\n  while (i < 5) {\n    total = total + i;\n    if (i === 3) {\n      return total;\n    }\n    i = i + 1;\n  }\n  return total;\n};",
        map: '{"version":3,"mappings":"eAQO;EACD,IAAIA,CAAC,GAAG,CAAC;EACT,IAAIC,KAAK,GAAG,CAAC;EACb,OAAOD,CAAC,GAAG,CAAC,EAAE;IACZC,KAAK,GAAGA,KAAK,GAAGD,CAAC;IACjB,IAAIA,CAAC,KAAK,CAAC,EAAE;MACX,OAAOC,KAAK;IACd;IACAD,CAAC,GAAGA,CAAC,GAAG,CAAC;EACX;EACA,OAAOC,KAAK;AACd,CAAC","names":["i","total"],"ignoreList":[],"sources":["while-loop.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
