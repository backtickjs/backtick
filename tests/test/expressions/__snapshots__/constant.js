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
      "() => 1",
      '{"version":3,"file":"constant.test.jsx","sourceRoot":"","sources":["expressions/constant.test.tsx"],"names":[],"mappings":"AAKuC,MAAA,CAAC"}',
    ),
  );
});
