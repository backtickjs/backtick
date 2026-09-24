import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A value body that falls off the end completes with `undefined`.
it("partialReturnScript", async (t) => {
  await snapshotCase(
    t,
    "partialReturnScript",
    cs.create(
      { start: { line: 10, column: 4 }, end: { line: 15, column: 6 } },
      {
        version: "0.0.0",
        filePath: "control-flow/partial-return.test.tsx",
        fileHash: "x79h35ggz599",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 10, column: 7 }, end: { line: 15, column: 5 } },
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
                  name: "n",
                  bindingKey: "n$x79h35ggz599$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 11, column: 14 },
                    end: { line: 11, column: 15 },
                  },
                  value: 1,
                },
              },
            ],
          },
          {
            type: "IfStatement",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 14, column: 7 },
            },
            test: {
              type: "BinaryExpression",
              loc: {
                start: { line: 12, column: 10 },
                end: { line: 12, column: 17 },
              },
              operator: "===",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 12, column: 10 },
                  end: { line: 12, column: 11 },
                },
                name: "n",
                bindingKey: "n$x79h35ggz599$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 12, column: 16 },
                  end: { line: 12, column: 17 },
                },
                value: 2,
              },
            },
            consequent: {
              type: "BlockStatement",
              loc: {
                start: { line: 12, column: 19 },
                end: { line: 14, column: 7 },
              },
              body: [
                {
                  type: "ReturnStatement",
                  loc: {
                    start: { line: 13, column: 8 },
                    end: { line: 13, column: 22 },
                  },
                  argument: {
                    type: "Literal",
                    loc: {
                      start: { line: 13, column: 15 },
                      end: { line: 13, column: 21 },
                    },
                    value: "some",
                  },
                },
              ],
            },
            alternate: null,
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
      { start: { line: 23, column: 4 }, end: { line: 30, column: 6 } },
      {
        version: "0.0.0",
        filePath: "control-flow/partial-return.test.tsx",
        fileHash: "x79h35ggz599",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 23, column: 7 }, end: { line: 30, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 24, column: 6 },
              end: { line: 28, column: 8 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 24, column: 12 },
                  end: { line: 28, column: 7 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 24, column: 12 },
                    end: { line: 24, column: 16 },
                  },
                  name: "pick",
                  bindingKey: "pick$x79h35ggz599$1",
                },
                init: {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 24, column: 19 },
                    end: { line: 28, column: 7 },
                  },
                  params: [
                    {
                      type: "Identifier",
                      loc: {
                        start: { line: 24, column: 20 },
                        end: { line: 24, column: 21 },
                      },
                      name: "b",
                      bindingKey: "b$x79h35ggz599$2",
                    },
                  ],
                  body: {
                    type: "BlockStatement",
                    loc: {
                      start: { line: 24, column: 35 },
                      end: { line: 28, column: 7 },
                    },
                    body: [
                      {
                        type: "IfStatement",
                        loc: {
                          start: { line: 25, column: 8 },
                          end: { line: 27, column: 9 },
                        },
                        test: {
                          type: "Identifier",
                          loc: {
                            start: { line: 25, column: 12 },
                            end: { line: 25, column: 13 },
                          },
                          name: "b",
                          bindingKey: "b$x79h35ggz599$2",
                        },
                        consequent: {
                          type: "BlockStatement",
                          loc: {
                            start: { line: 25, column: 15 },
                            end: { line: 27, column: 9 },
                          },
                          body: [
                            {
                              type: "ReturnStatement",
                              loc: {
                                start: { line: 26, column: 10 },
                                end: { line: 26, column: 25 },
                              },
                              argument: {
                                type: "Literal",
                                loc: {
                                  start: { line: 26, column: 17 },
                                  end: { line: 26, column: 24 },
                                },
                                value: "taken",
                              },
                            },
                          ],
                        },
                        alternate: null,
                      },
                    ],
                  },
                  expression: false,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 29, column: 6 },
              end: { line: 29, column: 39 },
            },
            argument: {
              type: "ArrayExpression",
              loc: {
                start: { line: 29, column: 13 },
                end: { line: 29, column: 38 },
              },
              elements: [
                {
                  type: "CallExpression",
                  loc: {
                    start: { line: 29, column: 14 },
                    end: { line: 29, column: 24 },
                  },
                  callee: {
                    type: "Identifier",
                    loc: {
                      start: { line: 29, column: 14 },
                      end: { line: 29, column: 18 },
                    },
                    name: "pick",
                    bindingKey: "pick$x79h35ggz599$1",
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 29, column: 19 },
                        end: { line: 29, column: 23 },
                      },
                      value: true,
                    },
                  ],
                  optional: false,
                },
                {
                  type: "CallExpression",
                  loc: {
                    start: { line: 29, column: 26 },
                    end: { line: 29, column: 37 },
                  },
                  callee: {
                    type: "Identifier",
                    loc: {
                      start: { line: 29, column: 26 },
                      end: { line: 29, column: 30 },
                    },
                    name: "pick",
                    bindingKey: "pick$x79h35ggz599$1",
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 29, column: 31 },
                        end: { line: 29, column: 36 },
                      },
                      value: false,
                    },
                  ],
                  optional: false,
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
