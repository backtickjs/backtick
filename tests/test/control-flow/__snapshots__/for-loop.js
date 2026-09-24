import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `i++` is not an operator in a client script, so the update is an
// assignment.
it("forLoop", async (t) => {
  await snapshotCase(
    t,
    "forLoop",
    cs.create(
      { start: { line: 11, column: 4 }, end: { line: 17, column: 6 } },
      {
        version: "0.0.0",
        filePath: "control-flow/for-loop.test.tsx",
        fileHash: "1z8sn9rs7fbwb",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 11, column: 7 }, end: { line: 17, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 12, column: 20 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 12, column: 10 },
                  end: { line: 12, column: 19 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 12, column: 10 },
                    end: { line: 12, column: 15 },
                  },
                  name: "total",
                  bindingKey: "total$1z8sn9rs7fbwb$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 12, column: 18 },
                    end: { line: 12, column: 19 },
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            type: "ForStatement",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 15, column: 7 },
            },
            init: {
              type: "VariableDeclaration",
              loc: {
                start: { line: 13, column: 11 },
                end: { line: 13, column: 20 },
              },
              kind: "let",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 13, column: 15 },
                    end: { line: 13, column: 20 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 13, column: 15 },
                      end: { line: 13, column: 16 },
                    },
                    name: "i",
                    bindingKey: "i$1z8sn9rs7fbwb$1",
                  },
                  init: {
                    type: "Literal",
                    loc: {
                      start: { line: 13, column: 19 },
                      end: { line: 13, column: 20 },
                    },
                    value: 0,
                  },
                },
              ],
            },
            test: {
              type: "BinaryExpression",
              loc: {
                start: { line: 13, column: 22 },
                end: { line: 13, column: 27 },
              },
              operator: "<",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 13, column: 22 },
                  end: { line: 13, column: 23 },
                },
                name: "i",
                bindingKey: "i$1z8sn9rs7fbwb$1",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 13, column: 26 },
                  end: { line: 13, column: 27 },
                },
                value: 5,
              },
            },
            update: {
              type: "AssignmentExpression",
              loc: {
                start: { line: 13, column: 29 },
                end: { line: 13, column: 38 },
              },
              operator: "=",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 13, column: 29 },
                  end: { line: 13, column: 30 },
                },
                name: "i",
                bindingKey: "i$1z8sn9rs7fbwb$1",
              },
              right: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 13, column: 33 },
                  end: { line: 13, column: 38 },
                },
                operator: "+",
                left: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 33 },
                    end: { line: 13, column: 34 },
                  },
                  name: "i",
                  bindingKey: "i$1z8sn9rs7fbwb$1",
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 13, column: 37 },
                    end: { line: 13, column: 38 },
                  },
                  value: 1,
                },
              },
            },
            body: {
              type: "BlockStatement",
              loc: {
                start: { line: 13, column: 40 },
                end: { line: 15, column: 7 },
              },
              body: [
                {
                  type: "ExpressionStatement",
                  loc: {
                    start: { line: 14, column: 8 },
                    end: { line: 14, column: 26 },
                  },
                  expression: {
                    type: "AssignmentExpression",
                    loc: {
                      start: { line: 14, column: 8 },
                      end: { line: 14, column: 25 },
                    },
                    operator: "=",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 14, column: 8 },
                        end: { line: 14, column: 13 },
                      },
                      name: "total",
                      bindingKey: "total$1z8sn9rs7fbwb$0",
                    },
                    right: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 14, column: 16 },
                        end: { line: 14, column: 25 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 14, column: 16 },
                          end: { line: 14, column: 21 },
                        },
                        name: "total",
                        bindingKey: "total$1z8sn9rs7fbwb$0",
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 14, column: 24 },
                          end: { line: 14, column: 25 },
                        },
                        name: "i",
                        bindingKey: "i$1z8sn9rs7fbwb$1",
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
              start: { line: 16, column: 6 },
              end: { line: 16, column: 19 },
            },
            argument: {
              type: "Identifier",
              loc: {
                start: { line: 16, column: 13 },
                end: { line: 16, column: 18 },
              },
              name: "total",
              bindingKey: "total$1z8sn9rs7fbwb$0",
            },
          },
        ],
      }),
    ),
  );
});
