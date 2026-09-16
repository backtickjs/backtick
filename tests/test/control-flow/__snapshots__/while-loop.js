import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("whileLoop", async (t) => {
  await snapshotCase(
    t,
    "whileLoop",
    cs.create(
      [9, 5, 20, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/while-loop.test.tsx",
        fileHash: "1qmqxi23sdk0m",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [9, 8, 20, 6],
        statements: [
          {
            kind: "let",
            loc: [10, 7, 10, 17],
            name: {
              kind: "id",
              loc: [10, 11, 10, 12],
              text: "i",
              bindingKey: "i$1qmqxi23sdk0m$0",
            },
            initializer: {
              kind: "number",
              loc: [10, 15, 10, 16],
              value: 0,
            },
          },
          {
            kind: "let",
            loc: [11, 7, 11, 21],
            name: {
              kind: "id",
              loc: [11, 11, 11, 16],
              text: "total",
              bindingKey: "total$1qmqxi23sdk0m$1",
            },
            initializer: {
              kind: "number",
              loc: [11, 19, 11, 20],
              value: 0,
            },
          },
          {
            kind: "while",
            loc: [12, 7, 18, 8],
            expression: {
              kind: "binop",
              loc: [12, 14, 12, 19],
              left: {
                kind: "id",
                loc: [12, 14, 12, 15],
                text: "i",
                bindingKey: "i$1qmqxi23sdk0m$0",
              },
              operatorToken: "<",
              right: {
                kind: "number",
                loc: [12, 18, 12, 19],
                value: 5,
              },
            },
            statement: {
              kind: "{}",
              loc: [12, 21, 18, 8],
              statements: [
                {
                  kind: "binop",
                  loc: [13, 9, 13, 26],
                  left: {
                    kind: "id",
                    loc: [13, 9, 13, 14],
                    text: "total",
                    bindingKey: "total$1qmqxi23sdk0m$1",
                  },
                  operatorToken: "=",
                  right: {
                    kind: "binop",
                    loc: [13, 17, 13, 26],
                    left: {
                      kind: "id",
                      loc: [13, 17, 13, 22],
                      text: "total",
                      bindingKey: "total$1qmqxi23sdk0m$1",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "id",
                      loc: [13, 25, 13, 26],
                      text: "i",
                      bindingKey: "i$1qmqxi23sdk0m$0",
                    },
                  },
                },
                {
                  kind: "if",
                  loc: [14, 9, 16, 10],
                  expression: {
                    kind: "binop",
                    loc: [14, 13, 14, 20],
                    left: {
                      kind: "id",
                      loc: [14, 13, 14, 14],
                      text: "i",
                      bindingKey: "i$1qmqxi23sdk0m$0",
                    },
                    operatorToken: "===",
                    right: {
                      kind: "number",
                      loc: [14, 19, 14, 20],
                      value: 3,
                    },
                  },
                  thenStatement: {
                    kind: "{}",
                    loc: [14, 22, 16, 10],
                    statements: [
                      {
                        kind: "return",
                        loc: [15, 11, 15, 24],
                        expression: {
                          kind: "id",
                          loc: [15, 18, 15, 23],
                          text: "total",
                          bindingKey: "total$1qmqxi23sdk0m$1",
                        },
                      },
                    ],
                  },
                  elseStatement: null,
                },
                {
                  kind: "binop",
                  loc: [17, 9, 17, 18],
                  left: {
                    kind: "id",
                    loc: [17, 9, 17, 10],
                    text: "i",
                    bindingKey: "i$1qmqxi23sdk0m$0",
                  },
                  operatorToken: "=",
                  right: {
                    kind: "binop",
                    loc: [17, 13, 17, 18],
                    left: {
                      kind: "id",
                      loc: [17, 13, 17, 14],
                      text: "i",
                      bindingKey: "i$1qmqxi23sdk0m$0",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "number",
                      loc: [17, 17, 17, 18],
                      value: 1,
                    },
                  },
                },
              ],
            },
          },
          {
            kind: "return",
            loc: [19, 7, 19, 20],
            expression: {
              kind: "id",
              loc: [19, 14, 19, 19],
              text: "total",
              bindingKey: "total$1qmqxi23sdk0m$1",
            },
          },
        ],
      }),
    ),
  );
});
