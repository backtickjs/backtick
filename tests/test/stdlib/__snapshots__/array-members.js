import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Arrays expose the curated `ClientArray` API: pure members only, none
// producing `undefined`. Callback parameters are contextually typed.
it("arrayMembers", async (t) => {
  await snapshotCase(
    t,
    "arrayMembers",
    cs.create(
      "139y0n5fpgs82:11:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 11, column: 7 }, end: { line: 25, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 12, column: 6 },
              end: { line: 12, column: 30 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 12, column: 12 },
                  end: { line: 12, column: 29 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 12, column: 12 },
                    end: { line: 12, column: 17 },
                  },
                  name: "coins",
                  key: "coins$139y0n5fpgs82$0",
                },
                init: {
                  type: "ArrayExpression",
                  loc: {
                    start: { line: 12, column: 20 },
                    end: { line: 12, column: 29 },
                  },
                  elements: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 12, column: 21 },
                        end: { line: 12, column: 22 },
                      },
                      value: 1,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 12, column: 24 },
                        end: { line: 12, column: 25 },
                      },
                      value: 2,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 12, column: 27 },
                        end: { line: 12, column: 28 },
                      },
                      value: 3,
                    },
                  ],
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 21 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 12 },
                  end: { line: 13, column: 20 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 12 },
                    end: { line: 13, column: 16 },
                  },
                  name: "four",
                  key: "four$139y0n5fpgs82$1",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 13, column: 19 },
                    end: { line: 13, column: 20 },
                  },
                  value: 4,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 24, column: 8 },
            },
            argument: {
              type: "ObjectExpression",
              loc: {
                start: { line: 14, column: 13 },
                end: { line: 24, column: 7 },
              },
              properties: [
                {
                  type: "Property",
                  loc: {
                    start: { line: 15, column: 8 },
                    end: { line: 15, column: 27 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 15, column: 8 },
                      end: { line: 15, column: 13 },
                    },
                    name: "count",
                  },
                  value: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 15, column: 15 },
                      end: { line: 15, column: 27 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 15 },
                        end: { line: 15, column: 20 },
                      },
                      name: "coins",
                      key: "coins$139y0n5fpgs82$0",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 21 },
                        end: { line: 15, column: 27 },
                      },
                      name: "length",
                    },
                    computed: false,
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
                    start: { line: 16, column: 8 },
                    end: { line: 16, column: 33 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 16, column: 8 },
                      end: { line: 16, column: 11 },
                    },
                    name: "all",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 16, column: 13 },
                      end: { line: 16, column: 33 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 16, column: 13 },
                        end: { line: 16, column: 25 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 13 },
                          end: { line: 16, column: 18 },
                        },
                        name: "coins",
                        key: "coins$139y0n5fpgs82$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 16, column: 19 },
                          end: { line: 16, column: 25 },
                        },
                        name: "concat",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ArrayExpression",
                        loc: {
                          start: { line: 16, column: 26 },
                          end: { line: 16, column: 32 },
                        },
                        elements: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 16, column: 27 },
                              end: { line: 16, column: 31 },
                            },
                            name: "four",
                            key: "four$139y0n5fpgs82$1",
                          },
                        ],
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
                    end: { line: 17, column: 31 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 8 },
                      end: { line: 17, column: 12 },
                    },
                    name: "part",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 17, column: 14 },
                      end: { line: 17, column: 31 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 17, column: 14 },
                        end: { line: 17, column: 25 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 17, column: 14 },
                          end: { line: 17, column: 19 },
                        },
                        name: "coins",
                        key: "coins$139y0n5fpgs82$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 17, column: 20 },
                          end: { line: 17, column: 25 },
                        },
                        name: "slice",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 17, column: 26 },
                          end: { line: 17, column: 27 },
                        },
                        value: 0,
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 17, column: 29 },
                          end: { line: 17, column: 30 },
                        },
                        value: 2,
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
                    end: { line: 18, column: 31 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 18, column: 8 },
                      end: { line: 18, column: 13 },
                    },
                    name: "where",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 18, column: 15 },
                      end: { line: 18, column: 31 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 18, column: 15 },
                        end: { line: 18, column: 28 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 15 },
                          end: { line: 18, column: 20 },
                        },
                        name: "coins",
                        key: "coins$139y0n5fpgs82$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 21 },
                          end: { line: 18, column: 28 },
                        },
                        name: "indexOf",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 18, column: 29 },
                          end: { line: 18, column: 30 },
                        },
                        value: 2,
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
                    end: { line: 19, column: 51 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 19, column: 8 },
                      end: { line: 19, column: 17 },
                    },
                    name: "lastWhere",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 19, column: 19 },
                      end: { line: 19, column: 51 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 19, column: 19 },
                        end: { line: 19, column: 48 },
                      },
                      object: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 19, column: 19 },
                          end: { line: 19, column: 36 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 19, column: 19 },
                            end: { line: 19, column: 31 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 19 },
                              end: { line: 19, column: 24 },
                            },
                            name: "coins",
                            key: "coins$139y0n5fpgs82$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 25 },
                              end: { line: 19, column: 31 },
                            },
                            name: "concat",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "ArrayExpression",
                            loc: {
                              start: { line: 19, column: 32 },
                              end: { line: 19, column: 35 },
                            },
                            elements: [
                              {
                                type: "Literal",
                                loc: {
                                  start: { line: 19, column: 33 },
                                  end: { line: 19, column: 34 },
                                },
                                value: 2,
                              },
                            ],
                          },
                        ],
                        optional: false,
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 19, column: 37 },
                          end: { line: 19, column: 48 },
                        },
                        name: "lastIndexOf",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 19, column: 49 },
                          end: { line: 19, column: 50 },
                        },
                        value: 2,
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
                    end: { line: 20, column: 30 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 20, column: 8 },
                      end: { line: 20, column: 11 },
                    },
                    name: "has",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 20, column: 13 },
                      end: { line: 20, column: 30 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 20, column: 13 },
                        end: { line: 20, column: 27 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 20, column: 13 },
                          end: { line: 20, column: 18 },
                        },
                        name: "coins",
                        key: "coins$139y0n5fpgs82$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 20, column: 19 },
                          end: { line: 20, column: 27 },
                        },
                        name: "includes",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 20, column: 28 },
                          end: { line: 20, column: 29 },
                        },
                        value: 3,
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
                    end: { line: 21, column: 29 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 21, column: 8 },
                      end: { line: 21, column: 12 },
                    },
                    name: "text",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 21, column: 14 },
                      end: { line: 21, column: 29 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 21, column: 14 },
                        end: { line: 21, column: 24 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 21, column: 14 },
                          end: { line: 21, column: 19 },
                        },
                        name: "coins",
                        key: "coins$139y0n5fpgs82$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 21, column: 20 },
                          end: { line: 21, column: 24 },
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
                          start: { line: 21, column: 25 },
                          end: { line: 21, column: 28 },
                        },
                        value: "-",
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
                    end: { line: 22, column: 40 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 22, column: 8 },
                      end: { line: 22, column: 15 },
                    },
                    name: "doubled",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 22, column: 17 },
                      end: { line: 22, column: 40 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 22, column: 17 },
                        end: { line: 22, column: 26 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 22, column: 17 },
                          end: { line: 22, column: 22 },
                        },
                        name: "coins",
                        key: "coins$139y0n5fpgs82$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 22, column: 23 },
                          end: { line: 22, column: 26 },
                        },
                        name: "map",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 22, column: 27 },
                          end: { line: 22, column: 39 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 22, column: 28 },
                              end: { line: 22, column: 29 },
                            },
                            name: "n",
                            key: "n$139y0n5fpgs82$2",
                          },
                        ],
                        body: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 22, column: 34 },
                            end: { line: 22, column: 39 },
                          },
                          operator: "*",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 22, column: 34 },
                              end: { line: 22, column: 35 },
                            },
                            name: "n",
                            key: "n$139y0n5fpgs82$2",
                          },
                          right: {
                            type: "Literal",
                            loc: {
                              start: { line: 22, column: 38 },
                              end: { line: 22, column: 39 },
                            },
                            value: 2,
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
                    start: { line: 23, column: 8 },
                    end: { line: 23, column: 41 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 23, column: 8 },
                      end: { line: 23, column: 13 },
                    },
                    name: "small",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 23, column: 15 },
                      end: { line: 23, column: 41 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 23, column: 15 },
                        end: { line: 23, column: 27 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 23, column: 15 },
                          end: { line: 23, column: 20 },
                        },
                        name: "coins",
                        key: "coins$139y0n5fpgs82$0",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 23, column: 21 },
                          end: { line: 23, column: 27 },
                        },
                        name: "filter",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 23, column: 28 },
                          end: { line: 23, column: 40 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 23, column: 29 },
                              end: { line: 23, column: 30 },
                            },
                            name: "n",
                            key: "n$139y0n5fpgs82$3",
                          },
                        ],
                        body: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 23, column: 35 },
                            end: { line: 23, column: 40 },
                          },
                          operator: "<",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 23, column: 35 },
                              end: { line: 23, column: 36 },
                            },
                            name: "n",
                            key: "n$139y0n5fpgs82$3",
                          },
                          right: {
                            type: "Literal",
                            loc: {
                              start: { line: 23, column: 39 },
                              end: { line: 23, column: 40 },
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
              ],
            },
          },
        ],
      }),
      'export default () => {\n    const coins = [1, 2, 3];\n    const four = 4;\n    return {\n        count: coins.length,\n        all: coins.concat([four]),\n        part: coins.slice(0, 2),\n        where: coins.indexOf(2),\n        lastWhere: coins.concat([2]).lastIndexOf(2),\n        has: coins.includes(3),\n        text: coins.join("-"),\n        doubled: coins.map((n) => n * 2),\n        small: coins.filter((n) => n < 3),\n    };\n};',
      '{"version":3,"file":"array-members.test.jsx","sourceRoot":"","sources":["array-members.test.tsx"],"names":[],"mappings":"eAUO;IACD,MAAM,KAAK,GAAG,CAAC,CAAC,EAAE,CAAC,EAAE,CAAC,CAAC,CAAC;IACxB,MAAM,IAAI,GAAG,CAAC,CAAC;IACf,OAAO;QACL,KAAK,EAAE,KAAK,CAAC,MAAM;QACnB,GAAG,EAAE,KAAK,CAAC,MAAM,CAAC,CAAC,IAAI,CAAC,CAAC;QACzB,IAAI,EAAE,KAAK,CAAC,KAAK,CAAC,CAAC,EAAE,CAAC,CAAC;QACvB,KAAK,EAAE,KAAK,CAAC,OAAO,CAAC,CAAC,CAAC;QACvB,SAAS,EAAE,KAAK,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,WAAW,CAAC,CAAC,CAAC;QAC3C,GAAG,EAAE,KAAK,CAAC,QAAQ,CAAC,CAAC,CAAC;QACtB,IAAI,EAAE,KAAK,CAAC,IAAI,CAAC,GAAG,CAAC;QACrB,OAAO,EAAE,KAAK,CAAC,GAAG,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC;QAChC,KAAK,EAAE,KAAK,CAAC,MAAM,CAAC,CAAC,CAAC,EAAE,EAAE,CAAC,CAAC,GAAG,CAAC,CAAC;KAClC,CAAC;AACJ,CAAC"}',
    ),
  );
});
