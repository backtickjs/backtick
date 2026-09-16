import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Where the two rules part company, pinned so a client implementer can see
// it: `names[9]` types as `string`, because TypeScript's indexed access says
// the element type, and reads as null, because the runtime read is total.
// Nothing faults; the type simply doesn't mention the floor under it.
it("indexPastEnd", async (t) => {
  await snapshotCase(
    t,
    "indexPastEnd",
    cs.create(
      [13, 5, 16, 7],
      {
        version: "0.0.0",
        filePath: "objects/index-past-end.test.tsx",
        fileHash: "htnzquslk7a0",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [13, 8, 16, 6],
        statements: [
          {
            kind: "const",
            loc: [14, 7, 14, 37],
            name: {
              kind: "id",
              loc: [14, 13, 14, 18],
              text: "names",
              bindingKey: "names$htnzquslk7a0$0",
            },
            initializer: {
              kind: "arr",
              loc: [14, 21, 14, 36],
              elements: [
                {
                  kind: "string",
                  loc: [14, 22, 14, 28],
                  text: "zero",
                },
                {
                  kind: "string",
                  loc: [14, 30, 14, 35],
                  text: "one",
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [15, 7, 15, 23],
            expression: {
              kind: "[]",
              loc: [15, 14, 15, 22],
              expression: {
                kind: "id",
                loc: [15, 14, 15, 19],
                text: "names",
                bindingKey: "names$htnzquslk7a0$0",
              },
              argumentExpression: {
                kind: "number",
                loc: [15, 20, 15, 21],
                value: 9,
              },
            },
          },
        ],
      }),
    ),
  );
});
