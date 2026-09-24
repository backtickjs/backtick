import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Array members that answer a question about an array or build a new one,
// leaving it as it was. `reduceRight` takes its starting value, as `reduce`
// does.
it("arrayQueries", async (t) => {
  await snapshotCase(
    t,
    "arrayQueries",
    cs.create(
      { start: { line: 12, column: 4 }, end: { line: 24, column: 6 } },
      {
        version: "0.0.0",
        filePath: "stdlib/array-queries.test.tsx",
        fileHash: "25lflsbo2zrha",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 24, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 33 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 12 },
                  end: { line: 13, column: 32 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 12 },
                    end: { line: 13, column: 17 },
                  },
                  name: "coins",
                  bindingKey: "coins$25lflsbo2zrha$0",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 13, column: 20 },
                    end: { line: 13, column: 32 },
                  },
                  elements: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 13, column: 21 },
                        end: { line: 13, column: 22 },
                      },
                      value: 1,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 13, column: 24 },
                        end: { line: 13, column: 25 },
                      },
                      value: 2,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 13, column: 27 },
                        end: { line: 13, column: 28 },
                      },
                      value: 3,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 13, column: 30 },
                        end: { line: 13, column: 31 },
                      },
                      value: 4,
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 23, column: 8 },
            },
            argument: {
              type: "ObjectExpression",
              loc: {
                start: { line: 14, column: 13 },
                end: { line: 23, column: 7 },
              },
              properties: [
                {
                  type: "Property",
                  loc: {
                    start: { line: 15, column: 8 },
                    end: { line: 15, column: 52 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 15, column: 8 },
                      end: { line: 15, column: 10 },
                    },
                    name: "at",
                  },
                  value: {
                    type: "ArrayExpression",
                    loc: {
                      start: { line: 15, column: 12 },
                      end: { line: 15, column: 52 },
                    },
                    elements: [
                      {
                        type: "CallExpression",
                        loc: {
                          start: { line: 15, column: 13 },
                          end: { line: 15, column: 24 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 15, column: 13 },
                            end: { line: 15, column: 21 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 13 },
                              end: { line: 15, column: 18 },
                            },
                            name: "coins",
                            bindingKey: "coins$25lflsbo2zrha$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 19 },
                              end: { line: 15, column: 21 },
                            },
                            name: "at",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "Literal",
                            loc: {
                              start: { line: 15, column: 22 },
                              end: { line: 15, column: 23 },
                            },
                            value: 0,
                          },
                        ],
                        optional: false,
                      },
                      {
                        type: "CallExpression",
                        loc: {
                          start: { line: 15, column: 26 },
                          end: { line: 15, column: 38 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 15, column: 26 },
                            end: { line: 15, column: 34 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 26 },
                              end: { line: 15, column: 31 },
                            },
                            name: "coins",
                            bindingKey: "coins$25lflsbo2zrha$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 32 },
                              end: { line: 15, column: 34 },
                            },
                            name: "at",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "UnaryExpression",
                            loc: {
                              start: { line: 15, column: 35 },
                              end: { line: 15, column: 37 },
                            },
                            operator: "-",
                            prefix: true,
                            argument: {
                              type: "Literal",
                              loc: {
                                start: { line: 15, column: 36 },
                                end: { line: 15, column: 37 },
                              },
                              value: 1,
                            },
                          },
                        ],
                        optional: false,
                      },
                      {
                        type: "CallExpression",
                        loc: {
                          start: { line: 15, column: 40 },
                          end: { line: 15, column: 51 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 15, column: 40 },
                            end: { line: 15, column: 48 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 40 },
                              end: { line: 15, column: 45 },
                            },
                            name: "coins",
                            bindingKey: "coins$25lflsbo2zrha$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 46 },
                              end: { line: 15, column: 48 },
                            },
                            name: "at",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "Literal",
                            loc: {
                              start: { line: 15, column: 49 },
                              end: { line: 15, column: 50 },
                            },
                            value: 9,
                          },
                        ],
                        optional: false,
                      },
                    ],
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 16, column: 8 },
                    end: { line: 16, column: 40 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 16, column: 8 },
                      end: { line: 16, column: 13 },
                    },
                    name: "every",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 16, column: 15 },
                      end: { line: 16, column: 40 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 16, column: 15 },
                        end: { line: 16, column: 26 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 15 },
                          end: { line: 16, column: 20 },
                        },
                        name: "coins",
                        bindingKey: "coins$25lflsbo2zrha$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 21 },
                          end: { line: 16, column: 26 },
                        },
                        name: "every",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 16, column: 27 },
                          end: { line: 16, column: 39 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 16, column: 28 },
                              end: { line: 16, column: 29 },
                            },
                            name: "n",
                            bindingKey: "n$25lflsbo2zrha$1",
                          },
                        ],
                        body: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 16, column: 34 },
                            end: { line: 16, column: 39 },
                          },
                          operator: ">",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 16, column: 34 },
                              end: { line: 16, column: 35 },
                            },
                            name: "n",
                            bindingKey: "n$25lflsbo2zrha$1",
                          },
                          right: {
                            type: "Literal",
                            loc: {
                              start: { line: 16, column: 38 },
                              end: { line: 16, column: 39 },
                            },
                            value: 0,
                          },
                        },
                        expression: true,
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 17, column: 8 },
                    end: { line: 17, column: 38 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 8 },
                      end: { line: 17, column: 12 },
                    },
                    name: "some",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 17, column: 14 },
                      end: { line: 17, column: 38 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 17, column: 14 },
                        end: { line: 17, column: 24 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 17, column: 14 },
                          end: { line: 17, column: 19 },
                        },
                        name: "coins",
                        bindingKey: "coins$25lflsbo2zrha$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 17, column: 20 },
                          end: { line: 17, column: 24 },
                        },
                        name: "some",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 17, column: 25 },
                          end: { line: 17, column: 37 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 26 },
                              end: { line: 17, column: 27 },
                            },
                            name: "n",
                            bindingKey: "n$25lflsbo2zrha$2",
                          },
                        ],
                        body: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 17, column: 32 },
                            end: { line: 17, column: 37 },
                          },
                          operator: ">",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 32 },
                              end: { line: 17, column: 33 },
                            },
                            name: "n",
                            bindingKey: "n$25lflsbo2zrha$2",
                          },
                          right: {
                            type: "Literal",
                            loc: {
                              start: { line: 17, column: 36 },
                              end: { line: 17, column: 37 },
                            },
                            value: 3,
                          },
                        },
                        expression: true,
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 18, column: 8 },
                    end: { line: 18, column: 46 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 18, column: 8 },
                      end: { line: 18, column: 16 },
                    },
                    name: "findLast",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 18, column: 18 },
                      end: { line: 18, column: 46 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 18, column: 18 },
                        end: { line: 18, column: 32 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 18 },
                          end: { line: 18, column: 23 },
                        },
                        name: "coins",
                        bindingKey: "coins$25lflsbo2zrha$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 24 },
                          end: { line: 18, column: 32 },
                        },
                        name: "findLast",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 18, column: 33 },
                          end: { line: 18, column: 45 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 18, column: 34 },
                              end: { line: 18, column: 35 },
                            },
                            name: "n",
                            bindingKey: "n$25lflsbo2zrha$3",
                          },
                        ],
                        body: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 18, column: 40 },
                            end: { line: 18, column: 45 },
                          },
                          operator: "<",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 18, column: 40 },
                              end: { line: 18, column: 41 },
                            },
                            name: "n",
                            bindingKey: "n$25lflsbo2zrha$3",
                          },
                          right: {
                            type: "Literal",
                            loc: {
                              start: { line: 18, column: 44 },
                              end: { line: 18, column: 45 },
                            },
                            value: 3,
                          },
                        },
                        expression: true,
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 19, column: 8 },
                    end: { line: 19, column: 56 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 19, column: 8 },
                      end: { line: 19, column: 21 },
                    },
                    name: "findLastIndex",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 19, column: 23 },
                      end: { line: 19, column: 56 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 19, column: 23 },
                        end: { line: 19, column: 42 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 19, column: 23 },
                          end: { line: 19, column: 28 },
                        },
                        name: "coins",
                        bindingKey: "coins$25lflsbo2zrha$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 19, column: 29 },
                          end: { line: 19, column: 42 },
                        },
                        name: "findLastIndex",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 19, column: 43 },
                          end: { line: 19, column: 55 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 44 },
                              end: { line: 19, column: 45 },
                            },
                            name: "n",
                            bindingKey: "n$25lflsbo2zrha$4",
                          },
                        ],
                        body: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 19, column: 50 },
                            end: { line: 19, column: 55 },
                          },
                          operator: "<",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 50 },
                              end: { line: 19, column: 51 },
                            },
                            name: "n",
                            bindingKey: "n$25lflsbo2zrha$4",
                          },
                          right: {
                            type: "Literal",
                            loc: {
                              start: { line: 19, column: 54 },
                              end: { line: 19, column: 55 },
                            },
                            value: 3,
                          },
                        },
                        expression: true,
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 20, column: 8 },
                    end: { line: 20, column: 50 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 20, column: 8 },
                      end: { line: 20, column: 15 },
                    },
                    name: "flatMap",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 20, column: 17 },
                      end: { line: 20, column: 50 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 20, column: 17 },
                        end: { line: 20, column: 30 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 20, column: 17 },
                          end: { line: 20, column: 22 },
                        },
                        name: "coins",
                        bindingKey: "coins$25lflsbo2zrha$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 20, column: 23 },
                          end: { line: 20, column: 30 },
                        },
                        name: "flatMap",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 20, column: 31 },
                          end: { line: 20, column: 49 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 20, column: 32 },
                              end: { line: 20, column: 33 },
                            },
                            name: "n",
                            bindingKey: "n$25lflsbo2zrha$5",
                          },
                        ],
                        body: {
                          type: "ArrayExpression",
                          loc: {
                            start: { line: 20, column: 38 },
                            end: { line: 20, column: 49 },
                          },
                          elements: [
                            {
                              type: "Identifier",
                              loc: {
                                start: { line: 20, column: 39 },
                                end: { line: 20, column: 40 },
                              },
                              name: "n",
                              bindingKey: "n$25lflsbo2zrha$5",
                            },
                            {
                              type: "BinaryExpression",
                              loc: {
                                start: { line: 20, column: 42 },
                                end: { line: 20, column: 48 },
                              },
                              operator: "*",
                              left: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 20, column: 42 },
                                  end: { line: 20, column: 43 },
                                },
                                name: "n",
                                bindingKey: "n$25lflsbo2zrha$5",
                              },
                              right: {
                                type: "Literal",
                                loc: {
                                  start: { line: 20, column: 46 },
                                  end: { line: 20, column: 48 },
                                },
                                value: 10,
                              },
                            },
                          ],
                        },
                        expression: true,
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 21, column: 8 },
                    end: { line: 21, column: 65 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 21, column: 8 },
                      end: { line: 21, column: 19 },
                    },
                    name: "reduceRight",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 21, column: 21 },
                      end: { line: 21, column: 65 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 21, column: 21 },
                        end: { line: 21, column: 38 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 21, column: 21 },
                          end: { line: 21, column: 26 },
                        },
                        name: "coins",
                        bindingKey: "coins$25lflsbo2zrha$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 21, column: 27 },
                          end: { line: 21, column: 38 },
                        },
                        name: "reduceRight",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 21, column: 39 },
                          end: { line: 21, column: 60 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 21, column: 40 },
                              end: { line: 21, column: 44 },
                            },
                            name: "text",
                            bindingKey: "text$25lflsbo2zrha$6",
                          },
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 21, column: 46 },
                              end: { line: 21, column: 47 },
                            },
                            name: "n",
                            bindingKey: "n$25lflsbo2zrha$7",
                          },
                        ],
                        body: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 21, column: 52 },
                            end: { line: 21, column: 60 },
                          },
                          operator: "+",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 21, column: 52 },
                              end: { line: 21, column: 56 },
                            },
                            name: "text",
                            bindingKey: "text$25lflsbo2zrha$6",
                          },
                          right: {
                            type: "Identifier",
                            loc: {
                              start: { line: 21, column: 59 },
                              end: { line: 21, column: 60 },
                            },
                            name: "n",
                            bindingKey: "n$25lflsbo2zrha$7",
                          },
                        },
                        expression: true,
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 21, column: 62 },
                          end: { line: 21, column: 64 },
                        },
                        value: "",
                      },
                    ],
                    optional: false,
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
                {
                  type: "Property",
                  loc: {
                    start: { line: 22, column: 8 },
                    end: { line: 22, column: 24 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 22, column: 8 },
                      end: { line: 22, column: 17 },
                    },
                    name: "unchanged",
                  },
                  value: {
                    type: "Identifier",
                    loc: {
                      start: { line: 22, column: 19 },
                      end: { line: 22, column: 24 },
                    },
                    name: "coins",
                    bindingKey: "coins$25lflsbo2zrha$0",
                  },
                  kind: "init",
                  computed: false,
                  method: false,
                  shorthand: false,
                },
              ],
            },
          },
        ],
      }),
    ),
  );
});
