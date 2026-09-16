import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A runtime object spliced into a script inlines as the plain data it is, so
// it can't carry `#` — the bundle's one reserved key — either.
it("reservedKeySplice", async (t) => {
  await snapshotCase(
    t,
    "reservedKeySplice",
    cs.create(
      [8, 46, 8, 69],
      {
        version: "0.0.0",
        filePath: "objects/reserved-key-splice.test.tsx",
        fileHash: "2dryy6my0qubf",
        splices: { $0splice0: { value: { "#": "value" }, params: [] } },
        captures: [],
      },
      () => ({
        kind: "splice",
        loc: [8, 49, 8, 68],
        key: "$0splice0",
      }),
    ),
  );
});
