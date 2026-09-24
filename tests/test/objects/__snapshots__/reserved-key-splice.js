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
      { start: { line: 8, column: 45 }, end: { line: 8, column: 68 } },
      {
        filePath: "objects/reserved-key-splice.test.tsx",
        fileHash: "2dryy6my0qubf",
        splices: { $0splice0: { value: { "#": "value" }, params: [] } },
        captures: [],
      },
      () => ({
        type: "Splice",
        loc: { start: { line: 8, column: 48 }, end: { line: 8, column: 67 } },
        key: "$0splice0",
      }),
      "$0 => $0()",
      '{"version":3,"file":"reserved-key-splice.test.jsx","sourceRoot":"","sources":["reserved-key-splice.test.tsx"],"names":[],"mappings":"AAOgD,MAAA,IAAC,CAAA"}',
    ),
  );
});
