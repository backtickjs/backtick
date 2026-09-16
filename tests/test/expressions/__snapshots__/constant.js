import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("constant", async (t) => {
  await snapshotCase(
    t,
    "constant",
    cs.create(
      [6, 37, 6, 42],
      {
        version: "0.0.0",
        filePath: "expressions/constant.test.tsx",
        fileHash: "1e4ingeabxazf",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "number",
        loc: [6, 40, 6, 41],
        value: 1,
      }),
    ),
  );
});
