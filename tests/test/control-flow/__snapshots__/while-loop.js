import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
it("whileLoop", async (t) => {
  await snapshotCase(
    t,
    "whileLoop",
    cs.create(
      { start: { line: 9, column: 4 }, end: { line: 20, column: 6 } },
      {
        version: "0.0.0",
        filePath: "control-flow/while-loop.test.tsx",
        fileHash: "1qmqxi23sdk0m",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 9, column: 7 }, end: { line: 20, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 10, column: 6 },
              end: { line: 10, column: 16 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 10, column: 10 },
                  end: { line: 10, column: 15 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 10, column: 10 },
                    end: { line: 10, column: 11 },
                  },
                  name: "i",
                  key: "i$1qmqxi23sdk0m$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 10, column: 14 },
                    end: { line: 10, column: 15 },
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 11, column: 6 },
              end: { line: 11, column: 20 },
            },
            kind: "let",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 11, column: 10 },
                  end: { line: 11, column: 19 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 11, column: 10 },
                    end: { line: 11, column: 15 },
                  },
                  name: "total",
                  key: "total$1qmqxi23sdk0m$1",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 11, column: 18 },
                    end: { line: 11, column: 19 },
                  },
                  value: 0,
                },
              },
            ],
          },
          {
            type: "WhileStatement",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 18, column: 7 },
            },
            test: {
              type: "BinaryExpression",
              loc: {
                start: { line: 12, column: 13 },
                end: { line: 12, column: 18 },
              },
              operator: "<",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 12, column: 13 },
                  end: { line: 12, column: 14 },
                },
                name: "i",
                key: "i$1qmqxi23sdk0m$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 12, column: 17 },
                  end: { line: 12, column: 18 },
                },
                value: 5,
              },
            },
            body: {
              type: "BlockStatement",
              loc: {
                start: { line: 12, column: 20 },
                end: { line: 18, column: 7 },
              },
              body: [
                {
                  type: "ExpressionStatement",
                  loc: {
                    start: { line: 13, column: 8 },
                    end: { line: 13, column: 26 },
                  },
                  expression: {
                    type: "AssignmentExpression",
                    loc: {
                      start: { line: 13, column: 8 },
                      end: { line: 13, column: 25 },
                    },
                    operator: "=",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 13, column: 8 },
                        end: { line: 13, column: 13 },
                      },
                      name: "total",
                      key: "total$1qmqxi23sdk0m$1",
                    },
                    right: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 13, column: 16 },
                        end: { line: 13, column: 25 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 13, column: 16 },
                          end: { line: 13, column: 21 },
                        },
                        name: "total",
                        key: "total$1qmqxi23sdk0m$1",
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 13, column: 24 },
                          end: { line: 13, column: 25 },
                        },
                        name: "i",
                        key: "i$1qmqxi23sdk0m$0",
                      },
                    },
                  },
                },
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
                      end: { line: 14, column: 19 },
                    },
                    operator: "===",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 14, column: 12 },
                        end: { line: 14, column: 13 },
                      },
                      name: "i",
                      key: "i$1qmqxi23sdk0m$0",
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 14, column: 18 },
                        end: { line: 14, column: 19 },
                      },
                      value: 3,
                    },
                  },
                  consequent: {
                    type: "BlockStatement",
                    loc: {
                      start: { line: 14, column: 21 },
                      end: { line: 16, column: 9 },
                    },
                    body: [
                      {
                        type: "ReturnStatement",
                        loc: {
                          start: { line: 15, column: 10 },
                          end: { line: 15, column: 23 },
                        },
                        argument: {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 17 },
                            end: { line: 15, column: 22 },
                          },
                          name: "total",
                          key: "total$1qmqxi23sdk0m$1",
                        },
                      },
                    ],
                  },
                  alternate: null,
                },
                {
                  type: "ExpressionStatement",
                  loc: {
                    start: { line: 17, column: 8 },
                    end: { line: 17, column: 18 },
                  },
                  expression: {
                    type: "AssignmentExpression",
                    loc: {
                      start: { line: 17, column: 8 },
                      end: { line: 17, column: 17 },
                    },
                    operator: "=",
                    left: {
                      type: "Identifier",
                      loc: {
                        start: { line: 17, column: 8 },
                        end: { line: 17, column: 9 },
                      },
                      name: "i",
                      key: "i$1qmqxi23sdk0m$0",
                    },
                    right: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 17, column: 12 },
                        end: { line: 17, column: 17 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 17, column: 12 },
                          end: { line: 17, column: 13 },
                        },
                        name: "i",
                        key: "i$1qmqxi23sdk0m$0",
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 17, column: 16 },
                          end: { line: 17, column: 17 },
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
              start: { line: 19, column: 6 },
              end: { line: 19, column: 19 },
            },
            argument: {
              type: "Identifier",
              loc: {
                start: { line: 19, column: 13 },
                end: { line: 19, column: 18 },
              },
              name: "total",
              key: "total$1qmqxi23sdk0m$1",
            },
          },
        ],
      }),
    ),
  );
});
