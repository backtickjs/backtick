import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Only the bare `#` key is reserved: a plain data object is free to use keys
// that merely start with `#`, even ones spelled like the tagged forms.
it("hashKeyData", async (t) => {
  await snapshotCase(
    t,
    "hashKeyData",
    cs.create(
      [8, 40, 8, 71],
      {
        version: "0.0.0",
        filePath: "objects/hash-key-data.test.tsx",
        fileHash: "m50lyvn0wkye",
        splices: { $0splice0: { value: { "#call": "#f0" }, params: [] } },
        captures: [],
      },
      () => ({
        kind: "=>",
        loc: [8, 43, 8, 70],
        parameters: [],
        body: {
          kind: "splice",
          loc: [8, 49, 8, 70],
          key: "$0splice0",
        },
      }),
    ),
  );
});
