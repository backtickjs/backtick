import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `#` stays reserved inside a script body: an object literal serializes as
// the plain object it spells, so it can't carry the discriminant key.
it("reservedKeyScript", async (t) => {
  await snapshotCase(
    t,
    "reservedKeyScript",
    cs.create(
      { start: { line: 8, column: 45 }, end: { line: 8, column: 67 } },
      {
        version: "0.0.0",
        filePath: "objects/reserved-key-script.test.tsx",
        fileHash: "28g09xvp2p10c",
        splices: {},
        captures: [],
      },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 8, column: 49 }, end: { line: 8, column: 65 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 8, column: 51 },
              end: { line: 8, column: 63 },
            },
            key: {
              type: "Literal",
              loc: {
                start: { line: 8, column: 51 },
                end: { line: 8, column: 54 },
              },
              value: "#",
            },
            value: {
              type: "Literal",
              loc: {
                start: { line: 8, column: 56 },
                end: { line: 8, column: 63 },
              },
              value: "value",
            },
            kind: "init",
            computed: false,
            method: false,
            shorthand: false,
          },
        ],
      }),
    ),
  );
});
