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
        code: "export default () => {\n    let i = 0;\n    let total = 0;\n    while (i < 5) {\n        total = total + i;\n        if (i === 3) {\n            return total;\n        }\n        i = i + 1;\n    }\n    return total;\n};",
        map: '{"version":3,"file":"while-loop.test.jsx","sourceRoot":"","sources":["control-flow/while-loop.test.tsx"],"names":[],"mappings":"eAQO;IACD,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,IAAI,KAAK,GAAG,CAAC,CAAC;IACd,OAAO,CAAC,GAAG,CAAC,EAAE,CAAC;QACb,KAAK,GAAG,KAAK,GAAG,CAAC,CAAC;QAClB,IAAI,CAAC,KAAK,CAAC,EAAE,CAAC;YACZ,OAAO,KAAK,CAAC;QACf,CAAC;QACD,CAAC,GAAG,CAAC,GAAG,CAAC,CAAC;IACZ,CAAC;IACD,OAAO,KAAK,CAAC;AACf,CAAC"}',
      },
    ),
  );
});
