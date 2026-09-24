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
      { start: { line: 8, column: 39 }, end: { line: 8, column: 70 } },
      {
        fileHash: "m50lyvn0wkye",
        splices: { $0splice0: { value: { "#call": "#f0" }, params: [] } },
        captures: [],
      },
      () => ({
        type: "ArrowFunctionExpression",
        loc: { start: { line: 8, column: 42 }, end: { line: 8, column: 69 } },
        params: [],
        body: {
          type: "Splice",
          loc: { start: { line: 8, column: 48 }, end: { line: 8, column: 69 } },
          key: "$0splice0",
        },
        expression: true,
      }),
      "$0 => () => $0()",
      '{"version":3,"file":"hash-key-data.test.jsx","sourceRoot":"","sources":["hash-key-data.test.tsx"],"names":[],"mappings":"AAO0C,MAAA,GAAG,EAAE,CAAC,IAAC,CAAA"}',
    ),
  );
});
