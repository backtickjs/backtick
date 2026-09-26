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
        code: "export default () => {\n  let n = 0;\n  if (n === 0) {\n    return;\n  }\n  n = 1;\n};",
        map: '{"version":3,"mappings":"eASO;EACD,IAAIA,CAAC,GAAG,CAAC;EACT,IAAIA,CAAC,KAAK,CAAC,EAAE;IACX;EACF;EACAA,CAAC,GAAG,CAAC;AACP,CAAC","names":["n"],"ignoreList":[],"sources":["early-return.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
