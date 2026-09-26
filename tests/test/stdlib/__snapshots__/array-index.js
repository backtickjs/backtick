import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The key is an expression, which is the point: a loop reaches every element
// without one script per position.
it("arrayIndex", async (t) => {
  await snapshotCase(
    t,
    "arrayIndex",
    cs.create(
      "2nqckix5uoswz:11:4",
      { params: [] },
      {
        code: "export default () => {\n    const coins = [5, 31, 7];\n    let total = 0;\n    for (let i = 0; i < coins.length; i = i + 1) {\n        total = total + coins[i];\n    }\n    return total;\n};",
        map: '{"version":3,"file":"array-index.test.jsx","sourceRoot":"","sources":["array-index.test.tsx"],"names":[],"mappings":"eAUO;IACD,MAAM,KAAK,GAAG,CAAC,CAAC,EAAE,EAAE,EAAE,CAAC,CAAC,CAAC;IACzB,IAAI,KAAK,GAAG,CAAC,CAAC;IACd,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,KAAK,CAAC,MAAM,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,EAAE,CAAC;QAC5C,KAAK,GAAG,KAAK,GAAG,KAAK,CAAC,CAAC,CAAC,CAAC;IAC3B,CAAC;IACD,OAAO,KAAK,CAAC;AACf,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
