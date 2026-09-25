import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `#` is the bundle's one reserved key — the discriminant of every node — so
// a plain data object can't carry it.
it("reservedKey", async (t) => {
  await snapshotCase(
    t,
    "reservedKey",
    cs.create(
      "2a27difszbs8:8:39",
      { params: [{ kind: "splice", value: { "#": "value" }, bindings: [] }] },
      () => ({
        type: "ArrowFunctionExpression",
        loc: { start: { line: 8, column: 42 }, end: { line: 8, column: 67 } },
        params: [],
        body: {
          type: "Splice",
          loc: { start: { line: 8, column: 48 }, end: { line: 8, column: 67 } },
          param: 0,
        },
        expression: true,
      }),
      "$0 => () => $0()",
      '{"version":3,"file":"reserved-key.test.jsx","sourceRoot":"","sources":["reserved-key.test.tsx"],"names":[],"mappings":"AAO0C,MAAA,GAAG,EAAE,CAAC,IAAC,CAAA"}',
    ),
  );
});
