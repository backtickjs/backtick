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
      {
        code: "export default () => 1;",
        map: '{"version":3,"file":"constant.test.jsx","sourceRoot":"","sources":["expressions/constant.test.tsx"],"names":[],"mappings":"eAKuC,MAAA,CAAC"}',
      },
    ),
  );
});
