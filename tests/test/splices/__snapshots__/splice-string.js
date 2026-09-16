import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A runtime string splice inlines as itself — quotes, newlines, and
// backslashes intact.
const value = 'say "hi"\n\\done';
it("spliceString", async (t) => {
  await snapshotCase(
    t,
    "spliceString",
    cs.create(
      [10, 41, 10, 51],
      {
        version: "0.0.0",
        filePath: "splices/splice-string.test.tsx",
        fileHash: "6r4m74y7k80e",
        splices: { $value: { value: value, params: [] } },
        captures: [],
      },
      () => ({
        kind: "splice",
        loc: [10, 44, 10, 50],
        key: "$value",
      }),
    ),
  );
});
