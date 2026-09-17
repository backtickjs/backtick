import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A splice prints as an expression ending in a type, and a `<` after a type is
// where type arguments start — so a spliced value to the left of `<` is the
// one place the virtual file could stop being the program it stands for.
const low = 3;
const high = 9;
it("splicedComparison", async (t) => {
  await snapshotCase(
    t,
    "splicedComparison",
    cs.create(
      [15, 5, 20, 8],
      {
        version: "0.0.0",
        filePath: "splices/spliced-comparison.test.tsx",
        fileHash: "3jdm2y7f9tpf",
        splices: {
          $low: { value: low, params: [] },
          $high: { value: high, params: [] },
        },
        captures: [],
      },
      () => ({
        kind: "obj",
        loc: [15, 9, 20, 6],
        properties: [
          {
            kind: ":",
            loc: [16, 7, 16, 26],
            name: {
              kind: "string",
              loc: [16, 7, 16, 12],
              text: "under",
            },
            initializer: {
              kind: "binop",
              loc: [16, 14, 16, 26],
              left: {
                kind: "splice",
                loc: [16, 14, 16, 18],
                key: "$low",
              },
              operatorToken: "<",
              right: {
                kind: "splice",
                loc: [16, 21, 16, 26],
                key: "$high",
              },
            },
          },
          {
            kind: ":",
            loc: [17, 7, 17, 28],
            name: {
              kind: "string",
              loc: [17, 7, 17, 13],
              text: "atMost",
            },
            initializer: {
              kind: "binop",
              loc: [17, 15, 17, 28],
              left: {
                kind: "splice",
                loc: [17, 15, 17, 19],
                key: "$low",
              },
              operatorToken: "<=",
              right: {
                kind: "splice",
                loc: [17, 23, 17, 28],
                key: "$high",
              },
            },
          },
          {
            kind: ":",
            loc: [18, 7, 18, 25],
            name: {
              kind: "string",
              loc: [18, 7, 18, 11],
              text: "over",
            },
            initializer: {
              kind: "binop",
              loc: [18, 13, 18, 25],
              left: {
                kind: "splice",
                loc: [18, 13, 18, 18],
                key: "$high",
              },
              operatorToken: ">",
              right: {
                kind: "splice",
                loc: [18, 21, 18, 25],
                key: "$low",
              },
            },
          },
          {
            kind: ":",
            loc: [19, 7, 19, 44],
            name: {
              kind: "string",
              loc: [19, 7, 19, 14],
              text: "between",
            },
            initializer: {
              kind: "binop",
              loc: [19, 16, 19, 44],
              left: {
                kind: "binop",
                loc: [19, 16, 19, 28],
                left: {
                  kind: "splice",
                  loc: [19, 16, 19, 20],
                  key: "$low",
                },
                operatorToken: "<",
                right: {
                  kind: "splice",
                  loc: [19, 23, 19, 28],
                  key: "$high",
                },
              },
              operatorToken: "&&",
              right: {
                kind: "binop",
                loc: [19, 32, 19, 44],
                left: {
                  kind: "splice",
                  loc: [19, 32, 19, 37],
                  key: "$high",
                },
                operatorToken: ">",
                right: {
                  kind: "splice",
                  loc: [19, 40, 19, 44],
                  key: "$low",
                },
              },
            },
          },
        ],
      }),
    ),
  );
});
