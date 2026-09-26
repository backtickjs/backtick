import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `i++` is not an operator in a client script, so the update is an
// assignment.
it("forLoop", async (t) => {
  await snapshotCase(
    t,
    "forLoop",
    cs.create(
      "1z8sn9rs7fbwb:11:4",
      { params: [] },
      "() => {\n    let total = 0;\n    for (let i = 0; i < 5; i = i + 1) {\n        total = total + i;\n    }\n    return total;\n}",
      '{"version":3,"file":"for-loop.test.jsx","sourceRoot":"","sources":["control-flow/for-loop.test.tsx"],"names":[],"mappings":"AAUO;IACD,IAAI,KAAK,GAAG,CAAC,CAAC;IACd,KAAK,IAAI,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,EAAE,CAAC,GAAG,CAAC,GAAG,CAAC,EAAE,CAAC;QACjC,KAAK,GAAG,KAAK,GAAG,CAAC,CAAC;IACpB,CAAC;IACD,OAAO,KAAK,CAAC;AACf,CAAC"}',
    ),
  );
});
