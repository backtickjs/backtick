import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("constant", async (t) => {
  await snapshotCase(
    t,
    "constant",
    cs.create(
      { start: { line: 6, column: 36 }, end: { line: 6, column: 41 } },
      {
        version: "0.0.0",
        filePath: "expressions/constant.test.tsx",
        fileHash: "1e4ingeabxazf",
        splices: {},
        captures: [],
      },
      () => ({
        type: "Literal",
        loc: { start: { line: 6, column: 39 }, end: { line: 6, column: 40 } },
        value: 1,
      }),
    ),
  );
});
