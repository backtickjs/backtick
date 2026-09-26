import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bare `return` exits an action early; the completion is null either way.
it("earlyReturn", async (t) => {
  await snapshotCase(
    t,
    "earlyReturn",
    cs.create(
      "33mpmt8iae2c7:10:4",
      { params: [] },
      {
        code: "export default () => {\n    let n = 0;\n    if (n === 0) {\n        return;\n    }\n    n = 1;\n};",
        map: '{"version":3,"file":"early-return.test.jsx","sourceRoot":"","sources":["early-return.test.tsx"],"names":[],"mappings":"eASO;IACD,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,IAAI,CAAC,KAAK,CAAC,EAAE,CAAC;QACZ,OAAO;IACT,CAAC;IACD,CAAC,GAAG,CAAC,CAAC;AACR,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
