import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("tryCatch", async (t) => {
  await snapshotCase(
    t,
    "tryCatch",
    cs.create(
      { start: { line: 9, column: 4 }, end: { line: 19, column: 6 } },
      {
        version: "0.0.0",
        filePath: "control-flow/try-catch.test.tsx",
        fileHash: "3s3xo1kodgmhm",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 9, column: 7 }, end: { line: 19, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 10, column: 6 },
              end: { line: 10, column: 29 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 10, column: 12 },
                  end: { line: 10, column: 28 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 10, column: 12 },
                    end: { line: 10, column: 19 },
                  },
                  name: "message",
                  bindingKey: "message$3s3xo1kodgmhm$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 10, column: 22 },
                    end: { line: 10, column: 28 },
                  },
                  value: "boom",
                },
              },
            ],
          },
          {
            type: "TryStatement",
            loc: {
              start: { line: 11, column: 6 },
              end: { line: 18, column: 7 },
            },
            block: {
              type: "BlockStatement",
              loc: {
                start: { line: 11, column: 10 },
                end: { line: 13, column: 7 },
              },
              body: [
                {
                  type: "ThrowStatement",
                  loc: {
                    start: { line: 12, column: 8 },
                    end: { line: 12, column: 22 },
                  },
                  argument: {
                    type: "Identifier",
                    loc: {
                      start: { line: 12, column: 14 },
                      end: { line: 12, column: 21 },
                    },
                    name: "message",
                    bindingKey: "message$3s3xo1kodgmhm$0",
                  },
                },
              ],
            },
            handler: {
              type: "CatchClause",
              loc: {
                start: { line: 13, column: 8 },
                end: { line: 18, column: 7 },
              },
              param: {
                type: "Identifier",
                loc: {
                  start: { line: 13, column: 15 },
                  end: { line: 13, column: 20 },
                },
                name: "error",
                bindingKey: "error$3s3xo1kodgmhm$1",
              },
              body: {
                type: "BlockStatement",
                loc: {
                  start: { line: 13, column: 22 },
                  end: { line: 18, column: 7 },
                },
                body: [
                  {
                    type: "IfStatement",
                    loc: {
                      start: { line: 14, column: 8 },
                      end: { line: 16, column: 9 },
                    },
                    test: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 14, column: 12 },
                        end: { line: 14, column: 29 },
                      },
                      operator: "===",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 14, column: 12 },
                          end: { line: 14, column: 17 },
                        },
                        name: "error",
                        bindingKey: "error$3s3xo1kodgmhm$1",
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 14, column: 22 },
                          end: { line: 14, column: 29 },
                        },
                        name: "message",
                        bindingKey: "message$3s3xo1kodgmhm$0",
                      },
                    },
                    consequent: {
                      type: "BlockStatement",
                      loc: {
                        start: { line: 14, column: 31 },
                        end: { line: 16, column: 9 },
                      },
                      body: [
                        {
                          type: "ReturnStatement",
                          loc: {
                            start: { line: 15, column: 10 },
                            end: { line: 15, column: 31 },
                          },
                          argument: {
                            type: "Literal",
                            loc: {
                              start: { line: 15, column: 17 },
                              end: { line: 15, column: 30 },
                            },
                            value: "caught boom",
                          },
                        },
                      ],
                    },
                    alternate: null,
                  },
                  {
                    type: "ReturnStatement",
                    loc: {
                      start: { line: 17, column: 8 },
                      end: { line: 17, column: 39 },
                    },
                    argument: {
                      type: "Literal",
                      loc: {
                        start: { line: 17, column: 15 },
                        end: { line: 17, column: 38 },
                      },
                      value: "caught something else",
                    },
                  },
                ],
              },
            },
            finalizer: null,
          },
        ],
      }),
    ),
  );
});
