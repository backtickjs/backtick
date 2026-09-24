import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An object with storage of its own, made by a client function: `state` holds
// what it is, arrows are what may be done to it, and the object hands them over
// together. Reading is a value, so it stands in a children position; writing is
// an action, so it stands in a handler.
const counter = cs.create(
  { start: { line: 9, column: 16 }, end: { line: 17, column: 2 } },
  {
    filePath: "state/stateful-object.test.tsx",
    fileHash: "2scghcewx41fn",
    splices: { $state: { value: state, params: [] } },
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 9, column: 19 }, end: { line: 17, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 9, column: 20 }, end: { line: 9, column: 27 } },
        name: "initial",
        key: "initial$2scghcewx41fn$0",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 9, column: 40 }, end: { line: 17, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 10, column: 2 },
            end: { line: 10, column: 32 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 10, column: 8 },
                end: { line: 10, column: 31 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 10, column: 8 },
                  end: { line: 10, column: 13 },
                },
                name: "count",
                key: "count$2scghcewx41fn$1",
              },
              init: {
                type: "CallExpression",
                loc: {
                  start: { line: 10, column: 16 },
                  end: { line: 10, column: 31 },
                },
                callee: {
                  type: "Splice",
                  loc: {
                    start: { line: 10, column: 16 },
                    end: { line: 10, column: 22 },
                  },
                  key: "$state",
                },
                arguments: [
                  {
                    type: "Identifier",
                    loc: {
                      start: { line: 10, column: 23 },
                      end: { line: 10, column: 30 },
                    },
                    name: "initial",
                    key: "initial$2scghcewx41fn$0",
                  },
                ],
                optional: false,
              },
            },
          ],
        },
        {
          type: "ReturnStatement",
          loc: { start: { line: 11, column: 2 }, end: { line: 16, column: 4 } },
          argument: {
            type: "ObjectExpression",
            loc: {
              start: { line: 11, column: 9 },
              end: { line: 16, column: 3 },
            },
            properties: [
              {
                type: "Property",
                loc: {
                  start: { line: 12, column: 4 },
                  end: { line: 12, column: 26 },
                },
                key: {
                  type: "Identifier",
                  loc: {
                    start: { line: 12, column: 4 },
                    end: { line: 12, column: 7 },
                  },
                  name: "get",
                },
                value: {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 12, column: 9 },
                    end: { line: 12, column: 26 },
                  },
                  params: [],
                  body: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 12, column: 15 },
                      end: { line: 12, column: 26 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 12, column: 15 },
                        end: { line: 12, column: 24 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 12, column: 15 },
                          end: { line: 12, column: 20 },
                        },
                        name: "count",
                        key: "count$2scghcewx41fn$1",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 12, column: 21 },
                          end: { line: 12, column: 24 },
                        },
                        name: "get",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [],
                    optional: false,
                  },
                  expression: true,
                },
                kind: "init",
                computed: false,
                method: false,
                shorthand: false,
              },
              {
                type: "Property",
                loc: {
                  start: { line: 13, column: 4 },
                  end: { line: 15, column: 5 },
                },
                key: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 4 },
                    end: { line: 13, column: 7 },
                  },
                  name: "add",
                },
                value: {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 13, column: 9 },
                    end: { line: 15, column: 5 },
                  },
                  params: [
                    {
                      type: "Identifier",
                      loc: {
                        start: { line: 13, column: 10 },
                        end: { line: 13, column: 11 },
                      },
                      name: "n",
                      key: "n$2scghcewx41fn$2",
                    },
                  ],
                  body: {
                    type: "BlockStatement",
                    loc: {
                      start: { line: 13, column: 24 },
                      end: { line: 15, column: 5 },
                    },
                    body: [
                      {
                        type: "ExpressionStatement",
                        loc: {
                          start: { line: 14, column: 6 },
                          end: { line: 14, column: 33 },
                        },
                        expression: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 14, column: 6 },
                            end: { line: 14, column: 32 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 14, column: 6 },
                              end: { line: 14, column: 15 },
                            },
                            object: {
                              type: "Identifier",
                              loc: {
                                start: { line: 14, column: 6 },
                                end: { line: 14, column: 11 },
                              },
                              name: "count",
                              key: "count$2scghcewx41fn$1",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 14, column: 12 },
                                end: { line: 14, column: 15 },
                              },
                              name: "set",
                            },
                            computed: false,
                            optional: false,
                          },
                          arguments: [
                            {
                              type: "BinaryExpression",
                              loc: {
                                start: { line: 14, column: 16 },
                                end: { line: 14, column: 31 },
                              },
                              operator: "+",
                              left: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 14, column: 16 },
                                  end: { line: 14, column: 27 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 14, column: 16 },
                                    end: { line: 14, column: 25 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 14, column: 16 },
                                      end: { line: 14, column: 21 },
                                    },
                                    name: "count",
                                    key: "count$2scghcewx41fn$1",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 14, column: 22 },
                                      end: { line: 14, column: 25 },
                                    },
                                    name: "get",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [],
                                optional: false,
                              },
                              right: {
                                type: "Identifier",
                                loc: {
                                  start: { line: 14, column: 30 },
                                  end: { line: 14, column: 31 },
                                },
                                name: "n",
                                key: "n$2scghcewx41fn$2",
                              },
                            },
                          ],
                          optional: false,
                        },
                      },
                    ],
                  },
                  expression: false,
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
    },
    expression: false,
  }),
  "$0 => (initial) => {\n    const count = $0()(initial);\n    return {\n        get: () => count.get(),\n        add: (n) => {\n            count.set(count.get() + n);\n        },\n    };\n}",
  '{"version":3,"file":"stateful-object.test.jsx","sourceRoot":"","sources":["stateful-object.test.tsx"],"names":[],"mappings":"AAQmB,MAAA,CAAC,OAAe,EAAE,EAAE;IACrC,MAAM,KAAK,GAAG,IAAM,CAAC,OAAO,CAAC,CAAC;IAC9B,OAAO;QACL,GAAG,EAAE,GAAG,EAAE,CAAC,KAAK,CAAC,GAAG,EAAE;QACtB,GAAG,EAAE,CAAC,CAAS,EAAE,EAAE;YACjB,KAAK,CAAC,GAAG,CAAC,KAAK,CAAC,GAAG,EAAE,GAAG,CAAC,CAAC,CAAC;QAC7B,CAAC;KACF,CAAC;AACJ,CAAC,CAAA"}',
);
it("statefulObject", async (t) => {
  await snapshotCase(
    t,
    "statefulObject",
    cs.create(
      { start: { line: 23, column: 4 }, end: { line: 34, column: 6 } },
      {
        filePath: "state/stateful-object.test.tsx",
        fileHash: "2scghcewx41fn",
        splices: { $counter: { value: counter, params: [] } },
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 23, column: 7 }, end: { line: 34, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 24, column: 6 },
              end: { line: 24, column: 29 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 24, column: 12 },
                  end: { line: 24, column: 28 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 24, column: 12 },
                    end: { line: 24, column: 13 },
                  },
                  name: "c",
                  key: "c$2scghcewx41fn$3",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 24, column: 16 },
                    end: { line: 24, column: 28 },
                  },
                  callee: {
                    type: "Splice",
                    loc: {
                      start: { line: 24, column: 16 },
                      end: { line: 24, column: 24 },
                    },
                    key: "$counter",
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 24, column: 25 },
                        end: { line: 24, column: 27 },
                      },
                      value: 10,
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
              start: { line: 25, column: 6 },
              end: { line: 33, column: 8 },
            },
            argument: {
              type: "JSXElement",
              loc: {
                start: { line: 26, column: 8 },
                end: { line: 32, column: 17 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 26, column: 8 },
                  end: { line: 30, column: 9 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 26, column: 9 },
                    end: { line: 26, column: 15 },
                  },
                  name: "button",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 27, column: 10 },
                      end: { line: 29, column: 12 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 27, column: 10 },
                        end: { line: 27, column: 17 },
                      },
                      name: "onclick",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 27, column: 18 },
                        end: { line: 29, column: 12 },
                      },
                      expression: {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 27, column: 19 },
                          end: { line: 29, column: 11 },
                        },
                        params: [],
                        body: {
                          type: "BlockStatement",
                          loc: {
                            start: { line: 27, column: 25 },
                            end: { line: 29, column: 11 },
                          },
                          body: [
                            {
                              type: "ExpressionStatement",
                              loc: {
                                start: { line: 28, column: 12 },
                                end: { line: 28, column: 21 },
                              },
                              expression: {
                                type: "CallExpression",
                                loc: {
                                  start: { line: 28, column: 12 },
                                  end: { line: 28, column: 20 },
                                },
                                callee: {
                                  type: "MemberExpression",
                                  loc: {
                                    start: { line: 28, column: 12 },
                                    end: { line: 28, column: 17 },
                                  },
                                  object: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 28, column: 12 },
                                      end: { line: 28, column: 13 },
                                    },
                                    name: "c",
                                    key: "c$2scghcewx41fn$3",
                                  },
                                  property: {
                                    type: "Identifier",
                                    loc: {
                                      start: { line: 28, column: 14 },
                                      end: { line: 28, column: 17 },
                                    },
                                    name: "add",
                                  },
                                  computed: false,
                                  optional: false,
                                },
                                arguments: [
                                  {
                                    type: "Literal",
                                    loc: {
                                      start: { line: 28, column: 18 },
                                      end: { line: 28, column: 19 },
                                    },
                                    value: 5,
                                  },
                                ],
                                optional: false,
                              },
                            },
                          ],
                        },
                        expression: false,
                      },
                    },
                  },
                ],
                selfClosing: false,
              },
              children: [
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 31, column: 10 },
                    end: { line: 31, column: 10 },
                  },
                  value: "\n          ",
                  raw: "\n          ",
                },
                {
                  type: "JSXExpressionContainer",
                  loc: {
                    start: { line: 31, column: 10 },
                    end: { line: 31, column: 19 },
                  },
                  expression: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 31, column: 11 },
                      end: { line: 31, column: 18 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 31, column: 11 },
                        end: { line: 31, column: 16 },
                      },
                      object: {
                        type: "Identifier",
                        loc: {
                          start: { line: 31, column: 11 },
                          end: { line: 31, column: 12 },
                        },
                        name: "c",
                        key: "c$2scghcewx41fn$3",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 31, column: 13 },
                          end: { line: 31, column: 16 },
                        },
                        name: "get",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [],
                    optional: false,
                  },
                },
                {
                  type: "JSXText",
                  loc: {
                    start: { line: 32, column: 8 },
                    end: { line: 32, column: 8 },
                  },
                  value: "\n        ",
                  raw: "\n        ",
                },
              ],
              closingElement: {
                type: "JSXClosingElement",
                loc: {
                  start: { line: 32, column: 8 },
                  end: { line: 32, column: 17 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 32, column: 10 },
                    end: { line: 32, column: 16 },
                  },
                  name: "button",
                },
              },
            },
          },
        ],
      }),
      "$0 => {\n    const c = $0()(10);\n    return (<button onclick={() => {\n            c.add(5);\n        }}>\n          {c.get()}\n        </button>);\n}",
      '{"version":3,"file":"stateful-object.test.jsx","sourceRoot":"","sources":["stateful-object.test.tsx"],"names":[],"mappings":"AAsBO;IACD,MAAM,CAAC,GAAG,IAAQ,CAAC,EAAE,CAAC,CAAC;IACvB,OAAO,CACL,CAAC,MAAM,CACL,OAAO,CAAC,CAAC,GAAG,EAAE;YACZ,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;QACX,CAAC,CAAC,CAEF;UAAA,CAAC,CAAC,CAAC,GAAG,EAAE,CACV;QAAA,EAAE,MAAM,CAAC,CACV,CAAC;AACJ,CAAC,CAAA"}',
    ),
  );
});
