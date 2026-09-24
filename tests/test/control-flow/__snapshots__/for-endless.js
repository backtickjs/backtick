import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `for (;;)` has no condition, so `break` is the only way out.
it("forEndless", async (t) => {
  await snapshotCase(
    t,
    "forEndless",
    cs.create(
      { start: { line: 10, column: 4 }, end: { line: 19, column: 6 } },
      {
        version: "0.0.0",
        filePath: "control-flow/for-endless.test.tsx",
        fileHash: "3voddrkfnxnd9",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 10, column: 7 }, end: { line: 19, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 11, column: 6 },
              end: { line: 11, column: 16 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 11, column: 10 },
                  end: { line: 11, column: 15 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 11, column: 10 },
                    end: { line: 11, column: 11 },
                  },
                  name: "i",
                  bindingKey: "i$3voddrkfnxnd9$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 11, column: 14 },
                    end: { line: 11, column: 15 },
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            type: "ForStatement",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 17, column: 7 },
            },
            init: null,
            test: null,
            update: null,
            body: {
              type: "BlockStatement",
              loc: {
                start: { line: 12, column: 15 },
                end: { line: 17, column: 7 },
              },
              body: [
                {
                  type: "IfStatement",
                  loc: {
                    start: { line: 13, column: 8 },
                    end: { line: 15, column: 9 },
                  },
                  test: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 13, column: 12 },
                      end: { line: 13, column: 19 },
                    },
                    operator: "===",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 13, column: 12 },
                        end: { line: 13, column: 13 },
                      },
                      name: "i",
                      bindingKey: "i$3voddrkfnxnd9$0",
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 13, column: 18 },
                        end: { line: 13, column: 19 },
                      },
                      value: 4,
                    },
                  },
                  consequent: {
                    type: "BlockStatement",
                    loc: {
                      start: { line: 13, column: 21 },
                      end: { line: 15, column: 9 },
                    },
                    body: [
                      {
                        type: "BreakStatement",
                        loc: {
                          start: { line: 14, column: 10 },
                          end: { line: 14, column: 16 },
                        },
                        label: null,
                      },
                    ],
                  },
                  alternate: null,
                },
                {
                  type: "ExpressionStatement",
                  loc: {
                    start: { line: 16, column: 8 },
                    end: { line: 16, column: 18 },
                  },
                  expression: {
                    type: "AssignmentExpression",
                    loc: {
                      start: { line: 16, column: 8 },
                      end: { line: 16, column: 17 },
                    },
                    operator: "=",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 16, column: 8 },
                        end: { line: 16, column: 9 },
                      },
                      name: "i",
                      bindingKey: "i$3voddrkfnxnd9$0",
                    },
                    right: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 16, column: 12 },
                        end: { line: 16, column: 17 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 12 },
                          end: { line: 16, column: 13 },
                        },
                        name: "i",
                        bindingKey: "i$3voddrkfnxnd9$0",
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 16, column: 16 },
                          end: { line: 16, column: 17 },
                        },
                        value: 1,
                      },
                    },
                  },
                },
              ],
            },
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 15 },
            },
            argument: {
              type: "Identifier",
              loc: {
                start: { line: 18, column: 13 },
                end: { line: 18, column: 14 },
              },
              name: "i",
              bindingKey: "i$3voddrkfnxnd9$0",
            },
          },
        ],
      }),
    ),
  );
});
