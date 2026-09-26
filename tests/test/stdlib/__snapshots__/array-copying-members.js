import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The copying members: each answers with a new array and leaves the one it
// was given alone, which is what lets an array be a value here. `sort`,
// `reverse` and `splice` — the ones that write into the array instead — are
// absent.
it("arrayCopyingMembers", async (t) => {
  await snapshotCase(
    t,
    "arrayCopyingMembers",
    cs.create(
      "1o1nlczam5nsr:13:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 13, column: 7 }, end: { line: 30, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 14, column: 29 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 14, column: 12 },
                  end: { line: 14, column: 28 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 14, column: 12 },
                    end: { line: 14, column: 16 },
                  },
                  name: "rows",
                  key: "rows$1o1nlczam5nsr$0",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 14, column: 19 },
                    end: { line: 14, column: 28 },
                  },
                  elements: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 14, column: 20 },
                        end: { line: 14, column: 21 },
                      },
                      value: 3,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 14, column: 23 },
                        end: { line: 14, column: 24 },
                      },
                      value: 1,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 14, column: 26 },
                        end: { line: 14, column: 27 },
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
              end: { line: 15, column: 52 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 15, column: 12 },
                  end: { line: 15, column: 51 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 15, column: 12 },
                    end: { line: 15, column: 18 },
                  },
                  name: "sorted",
                  key: "sorted$1o1nlczam5nsr$1",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 15, column: 21 },
                    end: { line: 15, column: 51 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 15, column: 21 },
                      end: { line: 15, column: 34 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 21 },
                        end: { line: 15, column: 25 },
                      },
                      name: "rows",
                      key: "rows$1o1nlczam5nsr$0",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 26 },
                        end: { line: 15, column: 34 },
                      },
                      name: "toSorted",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 15, column: 35 },
                        end: { line: 15, column: 50 },
                      },
                      params: [
                        {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 36 },
                            end: { line: 15, column: 37 },
                          },
                          name: "a",
                          key: "a$1o1nlczam5nsr$5",
                        },
                        {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 39 },
                            end: { line: 15, column: 40 },
                          },
                          name: "b",
                          key: "b$1o1nlczam5nsr$6",
                        },
                      ],
                      body: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 15, column: 45 },
                          end: { line: 15, column: 50 },
                        },
                        operator: "-",
                        left: {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 45 },
                            end: { line: 15, column: 46 },
                          },
                          name: "a",
                          key: "a$1o1nlczam5nsr$5",
                        },
                        right: {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 49 },
                            end: { line: 15, column: 50 },
                          },
                          name: "b",
                          key: "b$1o1nlczam5nsr$6",
                        },
                      },
                      expression: true,
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
              end: { line: 16, column: 41 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 16, column: 12 },
                  end: { line: 16, column: 40 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 16, column: 12 },
                    end: { line: 16, column: 20 },
                  },
                  name: "reversed",
                  key: "reversed$1o1nlczam5nsr$2",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 16, column: 23 },
                    end: { line: 16, column: 40 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 16, column: 23 },
                      end: { line: 16, column: 38 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 16, column: 23 },
                        end: { line: 16, column: 27 },
                      },
                      name: "rows",
                      key: "rows$1o1nlczam5nsr$0",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 16, column: 28 },
                        end: { line: 16, column: 38 },
                      },
                      name: "toReversed",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 17, column: 43 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 17, column: 12 },
                  end: { line: 17, column: 42 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 17, column: 12 },
                    end: { line: 17, column: 19 },
                  },
                  name: "spliced",
                  key: "spliced$1o1nlczam5nsr$3",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 17, column: 22 },
                    end: { line: 17, column: 42 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 17, column: 22 },
                      end: { line: 17, column: 36 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 17, column: 22 },
                        end: { line: 17, column: 26 },
                      },
                      name: "rows",
                      key: "rows$1o1nlczam5nsr$0",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 17, column: 27 },
                        end: { line: 17, column: 36 },
                      },
                      name: "toSpliced",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 17, column: 37 },
                        end: { line: 17, column: 38 },
                      },
                      value: 1,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 17, column: 40 },
                        end: { line: 17, column: 41 },
                      },
                      value: 1,
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
              end: { line: 18, column: 47 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 18, column: 12 },
                  end: { line: 18, column: 46 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 18, column: 12 },
                    end: { line: 18, column: 20 },
                  },
                  name: "inserted",
                  key: "inserted$1o1nlczam5nsr$4",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 18, column: 23 },
                    end: { line: 18, column: 46 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 18, column: 23 },
                      end: { line: 18, column: 37 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 18, column: 23 },
                        end: { line: 18, column: 27 },
                      },
                      name: "rows",
                      key: "rows$1o1nlczam5nsr$0",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 18, column: 28 },
                        end: { line: 18, column: 37 },
                      },
                      name: "toSpliced",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 18, column: 38 },
                        end: { line: 18, column: 39 },
                      },
                      value: 1,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 18, column: 41 },
                        end: { line: 18, column: 42 },
                      },
                      value: 0,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 18, column: 44 },
                        end: { line: 18, column: 45 },
                      },
                      value: 9,
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 29, column: 8 },
            },
            argument: {
              type: "BinaryExpression",
              loc: {
                start: { line: 20, column: 8 },
                end: { line: 28, column: 22 },
              },
              operator: "+",
              left: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 20, column: 8 },
                  end: { line: 27, column: 11 },
                },
                operator: "+",
                left: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 20, column: 8 },
                    end: { line: 26, column: 26 },
                  },
                  operator: "+",
                  left: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 20, column: 8 },
                      end: { line: 25, column: 11 },
                    },
                    operator: "+",
                    left: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 20, column: 8 },
                        end: { line: 24, column: 25 },
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
                            end: { line: 22, column: 26 },
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
                                  end: { line: 20, column: 19 },
                                },
                                object: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 20, column: 8 },
                                    end: { line: 20, column: 14 },
                                  },
                                  name: "sorted",
                                  key: "sorted$1o1nlczam5nsr$1",
                                },
                                property: {
                                  type: "Identifier",
                                  loc: {
                                    start: { line: 20, column: 15 },
                                    end: { line: 20, column: 19 },
                                  },
                                  name: "join",
                                },
                                computed: false,
                                optional: false,
                              },
                              arguments: [
                                {
                                  type: "Literal",
                                  loc: {
                                    start: { line: 20, column: 20 },
                                    end: { line: 20, column: 23 },
                                  },
                                  value: ",",
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
                            type: "CallExpression",
                            loc: {
                              start: { line: 22, column: 8 },
                              end: { line: 22, column: 26 },
                            },
                            callee: {
                              type: "MemberExpression",
                              loc: {
                                start: { line: 22, column: 8 },
                                end: { line: 22, column: 21 },
                              },
                              object: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 22, column: 8 },
                                  end: { line: 22, column: 16 },
                                },
                                name: "reversed",
                                key: "reversed$1o1nlczam5nsr$2",
                              },
                              property: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 22, column: 17 },
                                  end: { line: 22, column: 21 },
                                },
                                name: "join",
                              },
                              computed: false,
                              optional: false,
                            },
                            arguments: [
                              {
                                type: "Literal",
                                loc: {
                                  start: { line: 22, column: 22 },
                                  end: { line: 22, column: 25 },
                                },
                                value: ",",
                              },
                            ],
                            optional: false,
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
                          end: { line: 24, column: 25 },
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
                              end: { line: 24, column: 15 },
                            },
                            name: "spliced",
                            key: "spliced$1o1nlczam5nsr$3",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 24, column: 16 },
                              end: { line: 24, column: 20 },
                            },
                            name: "join",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "Literal",
                            loc: {
                              start: { line: 24, column: 21 },
                              end: { line: 24, column: 24 },
                            },
                            value: ",",
                          },
                        ],
                        optional: false,
                      },
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 25, column: 8 },
                        end: { line: 25, column: 11 },
                      },
                      value: "|",
                    },
                  },
                  right: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 26, column: 8 },
                      end: { line: 26, column: 26 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 26, column: 8 },
                        end: { line: 26, column: 21 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 26, column: 8 },
                          end: { line: 26, column: 16 },
                        },
                        name: "inserted",
                        key: "inserted$1o1nlczam5nsr$4",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 26, column: 17 },
                          end: { line: 26, column: 21 },
                        },
                        name: "join",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 26, column: 22 },
                          end: { line: 26, column: 25 },
                        },
                        value: ",",
                      },
                    ],
                    optional: false,
                  },
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 27, column: 8 },
                    end: { line: 27, column: 11 },
                  },
                  value: "|",
                },
              },
              right: {
                type: "CallExpression",
                loc: {
                  start: { line: 28, column: 8 },
                  end: { line: 28, column: 22 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 28, column: 8 },
                    end: { line: 28, column: 17 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 28, column: 8 },
                      end: { line: 28, column: 12 },
                    },
                    name: "rows",
                    key: "rows$1o1nlczam5nsr$0",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 28, column: 13 },
                      end: { line: 28, column: 17 },
                    },
                    name: "join",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 28, column: 18 },
                      end: { line: 28, column: 21 },
                    },
                    value: ",",
                  },
                ],
                optional: false,
              },
            },
          },
        ],
      }),
      {
        code: 'export default () => {\n    const rows = [3, 1, 2];\n    const sorted = rows.toSorted((a, b) => a - b);\n    const reversed = rows.toReversed();\n    const spliced = rows.toSpliced(1, 1);\n    const inserted = rows.toSpliced(1, 0, 9);\n    return (sorted.join(",") +\n        "|" +\n        reversed.join(",") +\n        "|" +\n        spliced.join(",") +\n        "|" +\n        inserted.join(",") +\n        "|" +\n        rows.join(","));\n};',
        map: '{"version":3,"file":"array-copying-members.test.jsx","sourceRoot":"","sources":["array-copying-members.test.tsx"],"names":[],"mappings":"eAYO;IACD,MAAM,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IACvB,MAAM,MAAM,GAAG,IAAI,CAAC,QAAQ,CAAC,CAAC,CAAC,EAAE,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC;IAC9C,MAAM,QAAQ,GAAG,IAAI,CAAC,UAAU,EAAE,CAAC;IACnC,MAAM,OAAO,GAAG,IAAI,CAAC,SAAS,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC;IACrC,MAAM,QAAQ,GAAG,IAAI,CAAC,SAAS,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IACzC,OAAO,CACL,MAAM,CAAC,IAAI,CAAC,GAAG,CAAC;QAChB,GAAG;QACH,QAAQ,CAAC,IAAI,CAAC,GAAG,CAAC;QAClB,GAAG;QACH,OAAO,CAAC,IAAI,CAAC,GAAG,CAAC;QACjB,GAAG;QACH,QAAQ,CAAC,IAAI,CAAC,GAAG,CAAC;QAClB,GAAG;QACH,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,CACf,CAAC;AACJ,CAAC"}',
      },
    ),
  );
});
