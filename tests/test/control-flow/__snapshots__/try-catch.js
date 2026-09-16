import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("tryCatch", async (t) => {
  await snapshotCase(
    t,
    "tryCatch",
    cs.create(
      [9, 5, 19, 7],
      {
        version: "0.0.0",
        filePath: "control-flow/try-catch.test.tsx",
        fileHash: "3s3xo1kodgmhm",
        splices: {},
        captures: [],
      },
      () => ({
        kind: "{}",
        loc: [9, 8, 19, 6],
        statements: [
          {
            kind: "const",
            loc: [10, 7, 10, 30],
            name: {
              kind: "id",
              loc: [10, 13, 10, 20],
              text: "message",
              bindingKey: "message$3s3xo1kodgmhm$0",
            },
            initializer: {
              kind: "string",
              loc: [10, 23, 10, 29],
              text: "boom",
            },
          },
          {
            kind: "try",
            loc: [11, 7, 18, 8],
            tryBlock: {
              kind: "{}",
              loc: [11, 11, 13, 8],
              statements: [
                {
                  kind: "throw",
                  loc: [12, 9, 12, 23],
                  expression: {
                    kind: "id",
                    loc: [12, 15, 12, 22],
                    text: "message",
                    bindingKey: "message$3s3xo1kodgmhm$0",
                  },
                },
              ],
            },
            catchClause: {
              kind: "catch",
              loc: [13, 9, 18, 8],
              variableDeclaration: {
                kind: "id",
                loc: [13, 16, 13, 21],
                text: "error",
                bindingKey: "error$3s3xo1kodgmhm$1",
              },
              block: {
                kind: "{}",
                loc: [13, 23, 18, 8],
                statements: [
                  {
                    kind: "if",
                    loc: [14, 9, 16, 10],
                    expression: {
                      kind: "binop",
                      loc: [14, 13, 14, 30],
                      left: {
                        kind: "id",
                        loc: [14, 13, 14, 18],
                        text: "error",
                        bindingKey: "error$3s3xo1kodgmhm$1",
                      },
                      operatorToken: "===",
                      right: {
                        kind: "id",
                        loc: [14, 23, 14, 30],
                        text: "message",
                        bindingKey: "message$3s3xo1kodgmhm$0",
                      },
                    },
                    thenStatement: {
                      kind: "{}",
                      loc: [14, 32, 16, 10],
                      statements: [
                        {
                          kind: "return",
                          loc: [15, 11, 15, 32],
                          expression: {
                            kind: "string",
                            loc: [15, 18, 15, 31],
                            text: "caught boom",
                          },
                        },
                      ],
                    },
                    elseStatement: null,
                  },
                  {
                    kind: "return",
                    loc: [17, 9, 17, 40],
                    expression: {
                      kind: "string",
                      loc: [17, 16, 17, 39],
                      text: "caught something else",
                    },
                  },
                ],
              },
            },
          },
        ],
      }),
    ),
  );
});
