import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("methodCall", async (t) => {
  await snapshotCase(
    t,
    "methodCall",
    cs.create(
      "163oncfaq7kkj:9:4",
      { params: [] },
      {
        code: 'export default () => {\n    const greeting = "Hello";\n    return greeting.concat(", ", "World").toUpperCase();\n};',
        map: '{"version":3,"file":"method-call.test.jsx","sourceRoot":"","sources":["expressions/method-call.test.tsx"],"names":[],"mappings":"eAQO;IACD,MAAM,QAAQ,GAAG,OAAO,CAAC;IACzB,OAAO,QAAQ,CAAC,MAAM,CAAC,IAAI,EAAE,OAAO,CAAC,CAAC,WAAW,EAAE,CAAC;AACtD,CAAC"}',
      },
    ),
  );
});
