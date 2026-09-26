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
        code: 'export default () => {\n  const greeting = "Hello";\n  return greeting.concat(", ", "World").toUpperCase();\n};',
        map: '{"version":3,"mappings":"eAQO;EACD,MAAMA,QAAQ,GAAG,OAAO;EACxB,OAAOA,QAAQ,CAACC,MAAM,CAAC,IAAI,EAAE,OAAO,CAAC,CAACC,WAAW,EAAE;AACrD,CAAC","names":["greeting","concat","toUpperCase"],"ignoreList":[],"sources":["method-call.test.tsx"]}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
