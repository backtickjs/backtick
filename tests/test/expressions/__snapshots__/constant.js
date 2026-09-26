import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("constant", async (t) => {
  await snapshotCase(
    t,
    "constant",
    cs.create(
      "1e4ingeabxazf:6:36",
      { params: [] },
      () => ({
        type: "Literal",
        loc: { start: { line: 6, column: 39 }, end: { line: 6, column: 40 } },
        value: 1,
      }),
      {
        code: "export default () => 1;",
        map: '{"version":3,"file":"constant.test.jsx","sourceRoot":"","sources":["constant.test.tsx"],"names":[],"mappings":"eAKuC,MAAA,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
