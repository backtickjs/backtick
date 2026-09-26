import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("arrow", async (t) => {
  await snapshotCase(
    t,
    "arrow",
    cs.create(
      "1qw9q1toh3rnd:9:4",
      { params: [] },
      {
        code: "export default () => {\n    const base = 10;\n    return (one, two) => one + two + base;\n};",
        map: '{"version":3,"file":"arrow.test.jsx","sourceRoot":"","sources":["arrow.test.tsx"],"names":[],"mappings":"eAQO;IACD,MAAM,IAAI,GAAG,EAAE,CAAC;IAChB,OAAO,CAAC,GAAW,EAAE,GAAW,EAAE,EAAE,CAAC,GAAG,GAAG,GAAG,GAAG,IAAI,CAAC;AACxD,CAAC"}',
      },
    ),
  );
});
