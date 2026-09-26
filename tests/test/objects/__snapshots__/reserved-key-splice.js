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
      "2dryy6my0qubf:8:45",
      { params: [{ kind: "splice", value: { "#": "value" }, bindings: [] }] },
      () => ({
        type: "Splice",
        loc: { start: { line: 8, column: 48 }, end: { line: 8, column: 67 } },
        param: 0,
      }),
      {
        code: "export default ($0) => $0();",
        map: '{"version":3,"file":"reserved-key-splice.test.jsx","sourceRoot":"","sources":["reserved-key-splice.test.tsx"],"names":[],"mappings":"eAOgD,QAAA,IAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
