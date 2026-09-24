import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// `typeof` answers JavaScript's names, since TypeScript narrows by them: every
// kind of value a script can hold, a host's own value among them.
it("typeofTable", async (t) => {
  await snapshotCase(
    t,
    "typeofTable",
    cs.create(
      "1jdryi4es12ui:11:4",
      { splices: { $state: { value: state, params: [] } }, captures: [] },
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
                  name: "count",
                  key: "count$1jdryi4es12ui$0",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 12, column: 20 },
                    end: { line: 12, column: 29 },
                  },
                  callee: {
                    type: "Splice",
                    loc: {
                      start: { line: 12, column: 20 },
                      end: { line: 12, column: 26 },
                    },
                    key: "$state",
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 12, column: 27 },
                        end: { line: 12, column: 28 },
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
            type: "ReturnStatement",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 24, column: 8 },
            },
            argument: {
              type: "ArrayExpression",
              loc: {
                start: { line: 13, column: 13 },
                end: { line: 24, column: 7 },
              },
              elements: [
                {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 14, column: 8 },
                    end: { line: 14, column: 24 },
                  },
                  operator: "typeof",
                  prefix: true,
                  argument: {
                    type: "Identifier",
                    loc: {
                      start: { line: 14, column: 15 },
                      end: { line: 14, column: 24 },
                    },
                    name: "undefined",
                  },
                },
                {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 15, column: 8 },
                    end: { line: 15, column: 19 },
                  },
                  operator: "typeof",
                  prefix: true,
                  argument: {
                    type: "Literal",
                    loc: {
                      start: { line: 15, column: 15 },
                      end: { line: 15, column: 19 },
                    },
                    value: null,
                  },
                },
                {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 16, column: 8 },
                    end: { line: 16, column: 19 },
                  },
                  operator: "typeof",
                  prefix: true,
                  argument: {
                    type: "Literal",
                    loc: {
                      start: { line: 16, column: 15 },
                      end: { line: 16, column: 19 },
                    },
                    value: true,
                  },
                },
                {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 17, column: 8 },
                    end: { line: 17, column: 16 },
                  },
                  operator: "typeof",
                  prefix: true,
                  argument: {
                    type: "Literal",
                    loc: {
                      start: { line: 17, column: 15 },
                      end: { line: 17, column: 16 },
                    },
                    value: 1,
                  },
                },
                {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 18, column: 8 },
                    end: { line: 18, column: 18 },
                  },
                  operator: "typeof",
                  prefix: true,
                  argument: {
                    type: "Literal",
                    loc: {
                      start: { line: 18, column: 15 },
                      end: { line: 18, column: 18 },
                    },
                    value: "a",
                  },
                },
                {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 19, column: 8 },
                    end: { line: 19, column: 18 },
                  },
                  operator: "typeof",
                  prefix: true,
                  argument: {
                    type: "ArrayExpression",
                    loc: {
                      start: { line: 19, column: 15 },
                      end: { line: 19, column: 18 },
                    },
                    elements: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 19, column: 16 },
                          end: { line: 19, column: 17 },
                        },
                        value: 1,
                      },
                    ],
                  },
                },
                {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 20, column: 8 },
                    end: { line: 20, column: 23 },
                  },
                  operator: "typeof",
                  prefix: true,
                  argument: {
                    type: "ObjectExpression",
                    loc: {
                      start: { line: 20, column: 15 },
                      end: { line: 20, column: 23 },
                    },
                    properties: [
                      {
                        type: "Property",
                        loc: {
                          start: { line: 20, column: 17 },
                          end: { line: 20, column: 21 },
                        },
                        key: {
                          type: "Identifier",
                          loc: {
                            start: { line: 20, column: 17 },
                            end: { line: 20, column: 18 },
                          },
                          name: "a",
                        },
                        value: {
                          type: "Literal",
                          loc: {
                            start: { line: 20, column: 20 },
                            end: { line: 20, column: 21 },
                          },
                          value: 1,
                        },
                        kind: "init",
                        computed: false,
                        method: false,
                        shorthand: false,
                      },
                    ],
                  },
                },
                {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 21, column: 8 },
                    end: { line: 21, column: 33 },
                  },
                  operator: "typeof",
                  prefix: true,
                  argument: {
                    type: "ArrowFunctionExpression",
                    loc: {
                      start: { line: 21, column: 16 },
                      end: { line: 21, column: 32 },
                    },
                    params: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 21, column: 17 },
                          end: { line: 21, column: 18 },
                        },
                        name: "n",
                        key: "n$1jdryi4es12ui$1",
                      },
                    ],
                    body: {
                      type: "Identifier",
                      loc: {
                        start: { line: 21, column: 31 },
                        end: { line: 21, column: 32 },
                      },
                      name: "n",
                      key: "n$1jdryi4es12ui$1",
                    },
                    expression: true,
                  },
                },
                {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 22, column: 8 },
                    end: { line: 22, column: 25 },
                  },
                  operator: "typeof",
                  prefix: true,
                  argument: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 22, column: 15 },
                      end: { line: 22, column: 25 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 22, column: 15 },
                        end: { line: 22, column: 19 },
                      },
                      name: "Math",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 22, column: 20 },
                        end: { line: 22, column: 25 },
                      },
                      name: "floor",
                    },
                    computed: false,
                    optional: false,
                  },
                },
                {
                  type: "UnaryExpression",
                  loc: {
                    start: { line: 23, column: 8 },
                    end: { line: 23, column: 20 },
                  },
                  operator: "typeof",
                  prefix: true,
                  argument: {
                    type: "Identifier",
                    loc: {
                      start: { line: 23, column: 15 },
                      end: { line: 23, column: 20 },
                    },
                    name: "count",
                    key: "count$1jdryi4es12ui$0",
                  },
                },
              ],
            },
          },
        ],
      }),
      '$0 => {\n    const count = $0()(0);\n    return [\n        typeof undefined,\n        typeof null,\n        typeof true,\n        typeof 1,\n        typeof "a",\n        typeof [1],\n        typeof { a: 1 },\n        typeof ((n) => n),\n        typeof Math.floor,\n        typeof count,\n    ];\n}',
      '{"version":3,"file":"typeof.test.jsx","sourceRoot":"","sources":["typeof.test.tsx"],"names":[],"mappings":"AAUO;IACD,MAAM,KAAK,GAAG,IAAM,CAAC,CAAC,CAAC,CAAC;IACxB,OAAO;QACL,OAAO,SAAS;QAChB,OAAO,IAAI;QACX,OAAO,IAAI;QACX,OAAO,CAAC;QACR,OAAO,GAAG;QACV,OAAO,CAAC,CAAC,CAAC;QACV,OAAO,EAAE,CAAC,EAAE,CAAC,EAAE;QACf,OAAO,CAAC,CAAC,CAAS,EAAE,EAAE,CAAC,CAAC,CAAC;QACzB,OAAO,IAAI,CAAC,KAAK;QACjB,OAAO,KAAK;KACb,CAAC;AACJ,CAAC,CAAA"}',
    ),
  );
});
// And narrows: a string's length, or a number doubled.
it("typeofNarrows", async (t) => {
  await snapshotCase(
    t,
    "typeofNarrows",
    cs.create(
      "1jdryi4es12ui:34:4",
      { splices: {}, captures: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 34, column: 7 }, end: { line: 38, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 35, column: 6 },
              end: { line: 36, column: 49 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 35, column: 12 },
                  end: { line: 36, column: 48 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 35, column: 12 },
                    end: { line: 35, column: 19 },
                  },
                  name: "measure",
                  key: "measure$1jdryi4es12ui$2",
                },
                init: {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 35, column: 22 },
                    end: { line: 36, column: 48 },
                  },
                  params: [
                    {
                      type: "Identifier",
                      loc: {
                        start: { line: 35, column: 23 },
                        end: { line: 35, column: 24 },
                      },
                      name: "v",
                      key: "v$1jdryi4es12ui$3",
                    },
                  ],
                  body: {
                    type: "ConditionalExpression",
                    loc: {
                      start: { line: 36, column: 8 },
                      end: { line: 36, column: 48 },
                    },
                    test: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 36, column: 8 },
                        end: { line: 36, column: 29 },
                      },
                      operator: "===",
                      left: {
                        type: "UnaryExpression",
                        loc: {
                          start: { line: 36, column: 8 },
                          end: { line: 36, column: 16 },
                        },
                        operator: "typeof",
                        prefix: true,
                        argument: {
                          type: "Identifier",
                          loc: {
                            start: { line: 36, column: 15 },
                            end: { line: 36, column: 16 },
                          },
                          name: "v",
                          key: "v$1jdryi4es12ui$3",
                        },
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 36, column: 21 },
                          end: { line: 36, column: 29 },
                        },
                        value: "string",
                      },
                    },
                    consequent: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 36, column: 32 },
                        end: { line: 36, column: 40 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 36, column: 32 },
                          end: { line: 36, column: 33 },
                        },
                        name: "v",
                        key: "v$1jdryi4es12ui$3",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 36, column: 34 },
                          end: { line: 36, column: 40 },
                        },
                        name: "length",
                      },
                      computed: false,
                      optional: false,
                    },
                    alternate: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 36, column: 43 },
                        end: { line: 36, column: 48 },
                      },
                      operator: "*",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 36, column: 43 },
                          end: { line: 36, column: 44 },
                        },
                        name: "v",
                        key: "v$1jdryi4es12ui$3",
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 36, column: 47 },
                          end: { line: 36, column: 48 },
                        },
                        value: 2,
                      },
                    },
                  },
                  expression: true,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 37, column: 6 },
              end: { line: 37, column: 42 },
            },
            argument: {
              type: "ArrayExpression",
              loc: {
                start: { line: 37, column: 13 },
                end: { line: 37, column: 41 },
              },
              elements: [
                {
                  type: "CallExpression",
                  loc: {
                    start: { line: 37, column: 14 },
                    end: { line: 37, column: 28 },
                  },
                  callee: {
                    type: "Identifier",
                    loc: {
                      start: { line: 37, column: 14 },
                      end: { line: 37, column: 21 },
                    },
                    name: "measure",
                    key: "measure$1jdryi4es12ui$2",
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 37, column: 22 },
                        end: { line: 37, column: 27 },
                      },
                      value: "abc",
                    },
                  ],
                  optional: false,
                },
                {
                  type: "CallExpression",
                  loc: {
                    start: { line: 37, column: 30 },
                    end: { line: 37, column: 40 },
                  },
                  callee: {
                    type: "Identifier",
                    loc: {
                      start: { line: 37, column: 30 },
                      end: { line: 37, column: 37 },
                    },
                    name: "measure",
                    key: "measure$1jdryi4es12ui$2",
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 37, column: 38 },
                        end: { line: 37, column: 39 },
                      },
                      value: 4,
                    },
                  ],
                  optional: false,
                },
              ],
            },
          },
        ],
      }),
      '() => {\n    const measure = (v) => typeof v === "string" ? v.length : v * 2;\n    return [measure("abc"), measure(4)];\n}',
      '{"version":3,"file":"typeof.test.jsx","sourceRoot":"","sources":["typeof.test.tsx"],"names":[],"mappings":"AAiCO;IACD,MAAM,OAAO,GAAG,CAAC,CAAkB,EAAE,EAAE,CACrC,OAAO,CAAC,KAAK,QAAQ,CAAC,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;IAC3C,OAAO,CAAC,OAAO,CAAC,KAAK,CAAC,EAAE,OAAO,CAAC,CAAC,CAAC,CAAC,CAAC;AACtC,CAAC,CAAA"}',
    ),
  );
});
