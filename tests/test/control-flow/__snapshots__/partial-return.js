import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A value body that falls off the end completes with `undefined`.
it("partialReturnScript", async (t) => {
  await snapshotCase(
    t,
    "partialReturnScript",
    cs.create(
      [10, 5, 15, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/partial-return.test.tsx",
        fileHash: "x79h35ggz599",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [10, 8, 15, 6],
        statements: [
          {
            kind: "let",
            loc: [11, 7, 11, 17],
            name: {
              kind: "id",
              loc: [11, 11, 11, 12],
              text: "n",
              bindingKey: "n$x79h35ggz599$0",
            },
            initializer: {
              kind: "number",
              loc: [11, 15, 11, 16],
              value: 1,
            },
          },
          {
            kind: "if",
            loc: [12, 7, 14, 8],
            expression: {
              kind: "binop",
              loc: [12, 11, 12, 18],
              left: {
                kind: "id",
                loc: [12, 11, 12, 12],
                text: "n",
                bindingKey: "n$x79h35ggz599$0",
              },
              operatorToken: "===",
              right: {
                kind: "number",
                loc: [12, 17, 12, 18],
                value: 2,
              },
            },
            thenStatement: {
              kind: "{}",
              loc: [12, 20, 14, 8],
              statements: [
                {
                  kind: "return",
                  loc: [13, 9, 13, 23],
                  expression: {
                    kind: "string",
                    loc: [13, 16, 13, 22],
                    text: "some",
                  },
                },
              ],
            },
            elseStatement: null,
          },
        ],
      }),
    ),
  );
});
it("partialReturnArrow", async (t) => {
  await snapshotCase(
    t,
    "partialReturnArrow",
    cs.create(
      [23, 5, 30, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/partial-return.test.tsx",
        fileHash: "x79h35ggz599",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [23, 8, 30, 6],
        statements: [
          {
            kind: "const",
            loc: [24, 7, 28, 9],
            name: {
              kind: "id",
              loc: [24, 13, 24, 17],
              text: "pick",
              bindingKey: "pick$x79h35ggz599$1",
            },
            initializer: {
              kind: "=>",
              loc: [24, 20, 28, 8],
              parameters: [
                {
                  kind: "param",
                  loc: [24, 21, 24, 31],
                  name: {
                    kind: "id",
                    loc: [24, 21, 24, 22],
                    text: "b",
                    bindingKey: "b$x79h35ggz599$2",
                  },
                },
              ],
              body: {
                kind: "{}",
                loc: [24, 36, 28, 8],
                statements: [
                  {
                    kind: "if",
                    loc: [25, 9, 27, 10],
                    expression: {
                      kind: "id",
                      loc: [25, 13, 25, 14],
                      text: "b",
                      bindingKey: "b$x79h35ggz599$2",
                    },
                    thenStatement: {
                      kind: "{}",
                      loc: [25, 16, 27, 10],
                      statements: [
                        {
                          kind: "return",
                          loc: [26, 11, 26, 26],
                          expression: {
                            kind: "string",
                            loc: [26, 18, 26, 25],
                            text: "taken",
                          },
                        },
                      ],
                    },
                    elseStatement: null,
                  },
                ],
              },
            },
          },
          {
            kind: "return",
            loc: [29, 7, 29, 40],
            expression: {
              kind: "arr",
              loc: [29, 14, 29, 39],
              elements: [
                {
                  kind: "()",
                  loc: [29, 15, 29, 25],
                  expression: {
                    kind: "id",
                    loc: [29, 15, 29, 19],
                    text: "pick",
                    bindingKey: "pick$x79h35ggz599$1",
                  },
                  arguments: [
                    {
                      kind: "true",
                      loc: [29, 20, 29, 24],
                    },
                  ],
                },
                {
                  kind: "()",
                  loc: [29, 27, 29, 38],
                  expression: {
                    kind: "id",
                    loc: [29, 27, 29, 31],
                    text: "pick",
                    bindingKey: "pick$x79h35ggz599$1",
                  },
                  arguments: [
                    {
                      kind: "false",
                      loc: [29, 32, 29, 37],
                    },
                  ],
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
