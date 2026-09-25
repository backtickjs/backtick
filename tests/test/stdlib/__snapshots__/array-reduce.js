import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `reduce` takes its initial value, where the standard library lets it be
// left out: without one the first call is handed an element rather than an
// accumulator, and an empty array has nothing to hand it at all. Naming it is
// what makes the empty case an answer rather than a throw.
it("arrayReduce", async (t) => {
  await snapshotCase(
    t,
    "arrayReduce",
    cs.create(
      "32uyy4dbi2509:13:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 13, column: 7 }, end: { line: 26, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 14, column: 36 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 14, column: 12 },
                  end: { line: 14, column: 35 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 12 },
                    end: { line: 14, column: 18 },
                  },
                  name: "prices",
                  key: "prices$32uyy4dbi2509$0",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 14, column: 21 },
                    end: { line: 14, column: 35 },
                  },
                  elements: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 14, column: 22 },
                        end: { line: 14, column: 25 },
                      },
                      value: 4.5,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 14, column: 27 },
                        end: { line: 14, column: 31 },
                      },
                      value: 3.25,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 14, column: 33 },
                        end: { line: 14, column: 34 },
                      },
                      value: 2,
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 15, column: 6 },
              end: { line: 15, column: 66 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 15, column: 12 },
                  end: { line: 15, column: 65 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 15, column: 12 },
                    end: { line: 15, column: 17 },
                  },
                  name: "total",
                  key: "total$32uyy4dbi2509$1",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 15, column: 20 },
                    end: { line: 15, column: 65 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 15, column: 20 },
                      end: { line: 15, column: 33 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 20 },
                        end: { line: 15, column: 26 },
                      },
                      name: "prices",
                      key: "prices$32uyy4dbi2509$0",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 27 },
                        end: { line: 15, column: 33 },
                      },
                      name: "reduce",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 15, column: 34 },
                        end: { line: 15, column: 61 },
                      },
                      params: [
                        {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 35 },
                            end: { line: 15, column: 38 },
                          },
                          name: "sum",
                          key: "sum$32uyy4dbi2509$5",
                        },
                        {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 40 },
                            end: { line: 15, column: 45 },
                          },
                          name: "price",
                          key: "price$32uyy4dbi2509$6",
                        },
                      ],
                      body: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 15, column: 50 },
                          end: { line: 15, column: 61 },
                        },
                        operator: "+",
                        left: {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 50 },
                            end: { line: 15, column: 53 },
                          },
                          name: "sum",
                          key: "sum$32uyy4dbi2509$5",
                        },
                        right: {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 56 },
                            end: { line: 15, column: 61 },
                          },
                          name: "price",
                          key: "price$32uyy4dbi2509$6",
                        },
                      },
                      expression: true,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 15, column: 63 },
                        end: { line: 15, column: 64 },
                      },
                      value: 0,
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 16, column: 6 },
              end: { line: 16, column: 36 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 16, column: 12 },
                  end: { line: 16, column: 35 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 16, column: 12 },
                    end: { line: 16, column: 17 },
                  },
                  name: "names",
                  key: "names$32uyy4dbi2509$2",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 16, column: 20 },
                    end: { line: 16, column: 35 },
                  },
                  elements: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 16, column: 21 },
                        end: { line: 16, column: 24 },
                      },
                      value: "a",
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 16, column: 26 },
                        end: { line: 16, column: 29 },
                      },
                      value: "b",
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 16, column: 31 },
                        end: { line: 16, column: 34 },
                      },
                      value: "c",
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 17, column: 78 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 17, column: 12 },
                  end: { line: 17, column: 77 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 17, column: 12 },
                    end: { line: 17, column: 18 },
                  },
                  name: "joined",
                  key: "joined$32uyy4dbi2509$3",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 17, column: 21 },
                    end: { line: 17, column: 77 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 17, column: 21 },
                      end: { line: 17, column: 33 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 17, column: 21 },
                        end: { line: 17, column: 26 },
                      },
                      name: "names",
                      key: "names$32uyy4dbi2509$2",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 17, column: 27 },
                        end: { line: 17, column: 33 },
                      },
                      name: "reduce",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 17, column: 34 },
                        end: { line: 17, column: 72 },
                      },
                      params: [
                        {
                          type: "Identifier",
                          loc: {
                            start: { line: 17, column: 35 },
                            end: { line: 17, column: 38 },
                          },
                          name: "all",
                          key: "all$32uyy4dbi2509$7",
                        },
                        {
                          type: "Identifier",
                          loc: {
                            start: { line: 17, column: 40 },
                            end: { line: 17, column: 43 },
                          },
                          name: "one",
                          key: "one$32uyy4dbi2509$8",
                        },
                        {
                          type: "Identifier",
                          loc: {
                            start: { line: 17, column: 45 },
                            end: { line: 17, column: 50 },
                          },
                          name: "index",
                          key: "index$32uyy4dbi2509$9",
                        },
                      ],
                      body: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 17, column: 55 },
                          end: { line: 17, column: 72 },
                        },
                        operator: "+",
                        left: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 17, column: 55 },
                            end: { line: 17, column: 66 },
                          },
                          operator: "+",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 55 },
                              end: { line: 17, column: 58 },
                            },
                            name: "all",
                            key: "all$32uyy4dbi2509$7",
                          },
                          right: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 61 },
                              end: { line: 17, column: 66 },
                            },
                            name: "index",
                            key: "index$32uyy4dbi2509$9",
                          },
                        },
                        right: {
                          type: "Identifier",
                          loc: {
                            start: { line: 17, column: 69 },
                            end: { line: 17, column: 72 },
                          },
                          name: "one",
                          key: "one$32uyy4dbi2509$8",
                        },
                      },
                      expression: true,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 17, column: 74 },
                        end: { line: 17, column: 76 },
                      },
                      value: "",
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 33 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 18, column: 12 },
                  end: { line: 18, column: 32 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 18, column: 12 },
                    end: { line: 18, column: 17 },
                  },
                  name: "empty",
                  key: "empty$32uyy4dbi2509$4",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 18, column: 30 },
                    end: { line: 18, column: 32 },
                  },
                  elements: [],
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 25, column: 8 },
            },
            argument: {
              type: "BinaryExpression",
              loc: {
                start: { line: 20, column: 8 },
                end: { line: 24, column: 48 },
              },
              operator: "+",
              left: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 20, column: 8 },
                  end: { line: 23, column: 11 },
                },
                operator: "+",
                left: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 20, column: 8 },
                    end: { line: 22, column: 14 },
                  },
                  operator: "+",
                  left: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 20, column: 8 },
                      end: { line: 21, column: 11 },
                    },
                    operator: "+",
                    left: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 20, column: 8 },
                        end: { line: 20, column: 24 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 20, column: 8 },
                          end: { line: 20, column: 21 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 20, column: 8 },
                            end: { line: 20, column: 13 },
                          },
                          name: "total",
                          key: "total$32uyy4dbi2509$1",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 20, column: 14 },
                            end: { line: 20, column: 21 },
                          },
                          name: "toFixed",
                        },
                        computed: false,
                        optional: false,
                      },
                      arguments: [
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 20, column: 22 },
                            end: { line: 20, column: 23 },
                          },
                          value: 2,
                        },
                      ],
                      optional: false,
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 21, column: 8 },
                        end: { line: 21, column: 11 },
                      },
                      value: "|",
                    },
                  },
                  right: {
                    type: "Identifier",
                    loc: {
                      start: { line: 22, column: 8 },
                      end: { line: 22, column: 14 },
                    },
                    name: "joined",
                    key: "joined$32uyy4dbi2509$3",
                  },
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 23, column: 8 },
                    end: { line: 23, column: 11 },
                  },
                  value: "|",
                },
              },
              right: {
                type: "CallExpression",
                loc: {
                  start: { line: 24, column: 8 },
                  end: { line: 24, column: 48 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 24, column: 8 },
                    end: { line: 24, column: 20 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 24, column: 8 },
                      end: { line: 24, column: 13 },
                    },
                    name: "empty",
                    key: "empty$32uyy4dbi2509$4",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 24, column: 14 },
                      end: { line: 24, column: 20 },
                    },
                    name: "reduce",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 24, column: 21 },
                      end: { line: 24, column: 44 },
                    },
                    params: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 24, column: 22 },
                          end: { line: 24, column: 25 },
                        },
                        name: "sum",
                        key: "sum$32uyy4dbi2509$10",
                      },
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 24, column: 27 },
                          end: { line: 24, column: 30 },
                        },
                        name: "one",
                        key: "one$32uyy4dbi2509$11",
                      },
                    ],
                    body: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 24, column: 35 },
                        end: { line: 24, column: 44 },
                      },
                      operator: "+",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 24, column: 35 },
                          end: { line: 24, column: 38 },
                        },
                        name: "sum",
                        key: "sum$32uyy4dbi2509$10",
                      },
                      right: {
                        type: "Identifier",
                        loc: {
                          start: { line: 24, column: 41 },
                          end: { line: 24, column: 44 },
                        },
                        name: "one",
                        key: "one$32uyy4dbi2509$11",
                      },
                    },
                    expression: true,
                  },
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 24, column: 46 },
                      end: { line: 24, column: 47 },
                    },
                    value: 0,
                  },
                ],
                optional: false,
              },
            },
          },
        ],
      }),
      '() => {\n    const prices = [4.5, 3.25, 2];\n    const total = prices.reduce((sum, price) => sum + price, 0);\n    const names = ["a", "b", "c"];\n    const joined = names.reduce((all, one, index) => all + index + one, "");\n    const empty = [];\n    return (total.toFixed(2) +\n        "|" +\n        joined +\n        "|" +\n        empty.reduce((sum, one) => sum + one, 0));\n}',
      '{"version":3,"file":"array-reduce.test.jsx","sourceRoot":"","sources":["array-reduce.test.tsx"],"names":[],"mappings":"AAYO;IACD,MAAM,MAAM,GAAG,CAAC,GAAG,EAAE,IAAI,EAAE,CAAC,CAAC,CAAC;IAC9B,MAAM,KAAK,GAAG,MAAM,CAAC,MAAM,CAAC,CAAC,GAAG,EAAE,KAAK,EAAE,EAAE,CAAC,GAAG,GAAG,KAAK,EAAE,CAAC,CAAC,CAAC;IAC5D,MAAM,KAAK,GAAG,CAAC,GAAG,EAAE,GAAG,EAAE,GAAG,CAAC,CAAC;IAC9B,MAAM,MAAM,GAAG,KAAK,CAAC,MAAM,CAAC,CAAC,GAAG,EAAE,GAAG,EAAE,KAAK,EAAE,EAAE,CAAC,GAAG,GAAG,KAAK,GAAG,GAAG,EAAE,EAAE,CAAC,CAAC;IACxE,MAAM,KAAK,GAAa,EAAE,CAAC;IAC3B,OAAO,CACL,KAAK,CAAC,OAAO,CAAC,CAAC,CAAC;QAChB,GAAG;QACH,MAAM;QACN,GAAG;QACH,KAAK,CAAC,MAAM,CAAC,CAAC,GAAG,EAAE,GAAG,EAAE,EAAE,CAAC,GAAG,GAAG,GAAG,EAAE,CAAC,CAAC,CACzC,CAAC;AACJ,CAAC,CAAA"}',
    ),
  );
});
