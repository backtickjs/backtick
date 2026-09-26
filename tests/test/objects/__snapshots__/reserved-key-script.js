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
      "28g09xvp2p10c:8:45",
      { params: [] },
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
      {
        code: 'export default () => ({ "#": "value" });',
        map: '{"version":3,"file":"reserved-key-script.test.jsx","sourceRoot":"","sources":["reserved-key-script.test.tsx"],"names":[],"mappings":"eAOgD,MAAA,CAAC,EAAE,GAAG,EAAE,OAAO,EAAE,CAAC"}',
        imports: [],
        exportAt: 0,
      },
    ),
  );
});
