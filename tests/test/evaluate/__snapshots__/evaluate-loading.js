import { it } from "node:test";
import { cs, evaluate, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A bundle a page does not have yet, and what stands in until it does.
//
// Both reads are where they stand, inside the drawing: that is what makes the
// condition follow the cell. Reading it once into a `const` would narrow the
// type and freeze the drawing — the script body runs once, so the loading
// state would never resolve. So the second read is asserted instead, which
// the condition beside it is what makes true.
it("evaluateLoading", async (t) => {
  await snapshotCase(
    t,
    "evaluateLoading",
    cs.create(
      [17, 5, 29, 7],
      {
        version: "0.0.0",
        filePath: "evaluate/evaluate-loading.test.tsx",
        fileHash: "1gdv44vu88h3n",
        splices: {
          $state: { value: state, params: [] },
          $evaluate: { value: evaluate, params: [] },
        },
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [17, 8, 29, 6],
        statements: [
          {
            kind: "const",
            loc: [18, 7, 18, 65],
            name: {
              kind: "id",
              loc: [18, 13, 18, 17],
              text: "held",
              bindingKey: "held$1gdv44vu88h3n$0",
            },
            initializer: {
              kind: "()",
              loc: [18, 20, 18, 64],
              expression: {
                kind: "splice",
                loc: [18, 20, 18, 26],
                key: "$state",
              },
              arguments: [
                {
                  kind: "null",
                  loc: [18, 59, 18, 63],
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [20, 7, 28, 9],
            expression: {
              kind: "jsx",
              loc: [21, 9, 27, 15],
              type: {
                kind: "string",
                loc: [21, 10, 21, 13],
                text: "div",
              },
              attributes: [],
              children: [
                {
                  kind: "?:",
                  loc: [22, 12, 26, 12],
                  condition: {
                    kind: "binop",
                    loc: [22, 12, 22, 31],
                    left: {
                      kind: "()",
                      loc: [22, 12, 22, 22],
                      expression: {
                        kind: ".",
                        loc: [22, 12, 22, 20],
                        expression: {
                          kind: "id",
                          loc: [22, 12, 22, 16],
                          text: "held",
                          bindingKey: "held$1gdv44vu88h3n$0",
                        },
                        name: "get",
                      },
                      arguments: [],
                    },
                    operatorToken: "===",
                    right: {
                      kind: "null",
                      loc: [22, 27, 22, 31],
                    },
                  },
                  whenTrue: {
                    kind: "jsx",
                    loc: [23, 13, 23, 34],
                    type: {
                      kind: "string",
                      loc: [23, 14, 23, 18],
                      text: "span",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "string",
                        loc: [23, 19, 23, 27],
                        text: "loading\u2026",
                      },
                    ],
                  },
                  whenFalse: {
                    kind: "()",
                    loc: [25, 13, 25, 61],
                    expression: {
                      kind: "splice",
                      loc: [25, 13, 25, 22],
                      key: "$evaluate",
                    },
                    arguments: [
                      {
                        kind: "()",
                        loc: [25, 23, 25, 33],
                        expression: {
                          kind: ".",
                          loc: [25, 23, 25, 31],
                          expression: {
                            kind: "id",
                            loc: [25, 23, 25, 27],
                            text: "held",
                            bindingKey: "held$1gdv44vu88h3n$0",
                          },
                          name: "get",
                        },
                        arguments: [],
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
