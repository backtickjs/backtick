import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The one thing the language cannot do for itself: produce a sequence of a
// given length. Everything else about an array is a transformation of one
// that already exists.
//
// The mapper's first argument is always `undefined` — the standard library
// passes the element it found, and against a `{ length }` source there is
// none. `null` would mean the source held one and it was null.
it("arrayFrom", async (t) => {
  await snapshotCase(
    t,
    "arrayFrom",
    cs.create(
      "3pi2uzl7sovgc:16:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 16, column: 7 }, end: { line: 23, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 17, column: 73 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 17, column: 12 },
                  end: { line: 17, column: 72 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 17, column: 12 },
                    end: { line: 17, column: 19 },
                  },
                  name: "doubled",
                  key: "doubled$3pi2uzl7sovgc$0",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 17, column: 22 },
                    end: { line: 17, column: 72 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 17, column: 22 },
                      end: { line: 17, column: 32 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 17, column: 22 },
                        end: { line: 17, column: 27 },
                      },
                      name: "Array",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 17, column: 28 },
                        end: { line: 17, column: 32 },
                      },
                      name: "from",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "ObjectExpression",
                      loc: {
                        start: { line: 17, column: 33 },
                        end: { line: 17, column: 46 },
                      },
                      properties: [
                        {
                          type: "Property",
                          loc: {
                            start: { line: 17, column: 35 },
                            end: { line: 17, column: 44 },
                          },
                          key: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 35 },
                              end: { line: 17, column: 41 },
                            },
                            name: "length",
                          },
                          value: {
                            type: "Literal",
                            loc: {
                              start: { line: 17, column: 43 },
                              end: { line: 17, column: 44 },
                            },
                            value: 4,
                          },
                          kind: "init",
                          computed: false,
                          method: false,
                          shorthand: false,
                        },
                      ],
                    },
                    {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 17, column: 48 },
                        end: { line: 17, column: 71 },
                      },
                      params: [
                        {
                          type: "Identifier",
                          loc: {
                            start: { line: 17, column: 49 },
                            end: { line: 17, column: 50 },
                          },
                          name: "_",
                          key: "_$3pi2uzl7sovgc$3",
                        },
                        {
                          type: "Identifier",
                          loc: {
                            start: { line: 17, column: 52 },
                            end: { line: 17, column: 57 },
                          },
                          name: "index",
                          key: "index$3pi2uzl7sovgc$4",
                        },
                      ],
                      body: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 17, column: 62 },
                          end: { line: 17, column: 71 },
                        },
                        operator: "*",
                        left: {
                          type: "Identifier",
                          loc: {
                            start: { line: 17, column: 62 },
                            end: { line: 17, column: 67 },
                          },
                          name: "index",
                          key: "index$3pi2uzl7sovgc$4",
                        },
                        right: {
                          type: "Literal",
                          loc: {
                            start: { line: 17, column: 70 },
                            end: { line: 17, column: 71 },
                          },
                          value: 2,
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
              start: { line: 18, column: 6 },
              end: { line: 18, column: 67 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 18, column: 12 },
                  end: { line: 18, column: 66 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 18, column: 12 },
                    end: { line: 18, column: 17 },
                  },
                  name: "empty",
                  key: "empty$3pi2uzl7sovgc$1",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 18, column: 20 },
                    end: { line: 18, column: 66 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 18, column: 20 },
                      end: { line: 18, column: 30 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 18, column: 20 },
                        end: { line: 18, column: 25 },
                      },
                      name: "Array",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 18, column: 26 },
                        end: { line: 18, column: 30 },
                      },
                      name: "from",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "ObjectExpression",
                      loc: {
                        start: { line: 18, column: 31 },
                        end: { line: 18, column: 44 },
                      },
                      properties: [
                        {
                          type: "Property",
                          loc: {
                            start: { line: 18, column: 33 },
                            end: { line: 18, column: 42 },
                          },
                          key: {
                            type: "Identifier",
                            loc: {
                              start: { line: 18, column: 33 },
                              end: { line: 18, column: 39 },
                            },
                            name: "length",
                          },
                          value: {
                            type: "Literal",
                            loc: {
                              start: { line: 18, column: 41 },
                              end: { line: 18, column: 42 },
                            },
                            value: 0,
                          },
                          kind: "init",
                          computed: false,
                          method: false,
                          shorthand: false,
                        },
                      ],
                    },
                    {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 18, column: 46 },
                        end: { line: 18, column: 65 },
                      },
                      params: [
                        {
                          type: "Identifier",
                          loc: {
                            start: { line: 18, column: 47 },
                            end: { line: 18, column: 48 },
                          },
                          name: "_",
                          key: "_$3pi2uzl7sovgc$5",
                        },
                        {
                          type: "Identifier",
                          loc: {
                            start: { line: 18, column: 50 },
                            end: { line: 18, column: 55 },
                          },
                          name: "index",
                          key: "index$3pi2uzl7sovgc$6",
                        },
                      ],
                      body: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 60 },
                          end: { line: 18, column: 65 },
                        },
                        name: "index",
                        key: "index$3pi2uzl7sovgc$6",
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
              start: { line: 19, column: 6 },
              end: { line: 21, column: 8 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 19, column: 12 },
                  end: { line: 21, column: 7 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 19, column: 12 },
                    end: { line: 19, column: 18 },
                  },
                  name: "absent",
                  key: "absent$3pi2uzl7sovgc$2",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 19, column: 21 },
                    end: { line: 21, column: 7 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 19, column: 21 },
                      end: { line: 19, column: 31 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 19, column: 21 },
                        end: { line: 19, column: 26 },
                      },
                      name: "Array",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 19, column: 27 },
                        end: { line: 19, column: 31 },
                      },
                      name: "from",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "ObjectExpression",
                      loc: {
                        start: { line: 19, column: 32 },
                        end: { line: 19, column: 45 },
                      },
                      properties: [
                        {
                          type: "Property",
                          loc: {
                            start: { line: 19, column: 34 },
                            end: { line: 19, column: 43 },
                          },
                          key: {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 34 },
                              end: { line: 19, column: 40 },
                            },
                            name: "length",
                          },
                          value: {
                            type: "Literal",
                            loc: {
                              start: { line: 19, column: 42 },
                              end: { line: 19, column: 43 },
                            },
                            value: 2,
                          },
                          kind: "init",
                          computed: false,
                          method: false,
                          shorthand: false,
                        },
                      ],
                    },
                    {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 19, column: 47 },
                        end: { line: 20, column: 40 },
                      },
                      params: [
                        {
                          type: "Identifier",
                          loc: {
                            start: { line: 19, column: 48 },
                            end: { line: 19, column: 53 },
                          },
                          name: "value",
                          key: "value$3pi2uzl7sovgc$7",
                        },
                        {
                          type: "Identifier",
                          loc: {
                            start: { line: 19, column: 55 },
                            end: { line: 19, column: 60 },
                          },
                          name: "index",
                          key: "index$3pi2uzl7sovgc$8",
                        },
                      ],
                      body: {
                        type: "ConditionalExpression",
                        loc: {
                          start: { line: 20, column: 8 },
                          end: { line: 20, column: 40 },
                        },
                        test: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 20, column: 8 },
                            end: { line: 20, column: 27 },
                          },
                          operator: "===",
                          left: {
                            type: "Identifier",
                            loc: {
                              start: { line: 20, column: 8 },
                              end: { line: 20, column: 13 },
                            },
                            name: "value",
                            key: "value$3pi2uzl7sovgc$7",
                          },
                          right: {
                            type: "Identifier",
                            loc: {
                              start: { line: 20, column: 18 },
                              end: { line: 20, column: 27 },
                            },
                            name: "undefined",
                          },
                        },
                        consequent: {
                          type: "Identifier",
                          loc: {
                            start: { line: 20, column: 30 },
                            end: { line: 20, column: 35 },
                          },
                          name: "index",
                          key: "index$3pi2uzl7sovgc$8",
                        },
                        alternate: {
                          type: "UnaryExpression",
                          loc: {
                            start: { line: 20, column: 38 },
                            end: { line: 20, column: 40 },
                          },
                          operator: "-",
                          prefix: true,
                          argument: {
                            type: "Literal",
                            loc: {
                              start: { line: 20, column: 39 },
                              end: { line: 20, column: 40 },
                            },
                            value: 1,
                          },
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
            type: "ReturnStatement",
            loc: {
              start: { line: 22, column: 6 },
              end: { line: 22, column: 77 },
            },
            argument: {
              type: "BinaryExpression",
              loc: {
                start: { line: 22, column: 13 },
                end: { line: 22, column: 76 },
              },
              operator: "+",
              left: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 22, column: 13 },
                  end: { line: 22, column: 57 },
                },
                operator: "+",
                left: {
                  type: "BinaryExpression",
                  loc: {
                    start: { line: 22, column: 13 },
                    end: { line: 22, column: 51 },
                  },
                  operator: "+",
                  left: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 22, column: 13 },
                      end: { line: 22, column: 36 },
                    },
                    operator: "+",
                    left: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 22, column: 13 },
                        end: { line: 22, column: 30 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 22, column: 13 },
                          end: { line: 22, column: 25 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 22, column: 13 },
                            end: { line: 22, column: 20 },
                          },
                          name: "doubled",
                          key: "doubled$3pi2uzl7sovgc$0",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 22, column: 21 },
                            end: { line: 22, column: 25 },
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
                            start: { line: 22, column: 26 },
                            end: { line: 22, column: 29 },
                          },
                          value: ",",
                        },
                      ],
                      optional: false,
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 22, column: 33 },
                        end: { line: 22, column: 36 },
                      },
                      value: "|",
                    },
                  },
                  right: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 22, column: 39 },
                      end: { line: 22, column: 51 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 22, column: 39 },
                        end: { line: 22, column: 44 },
                      },
                      name: "empty",
                      key: "empty$3pi2uzl7sovgc$1",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 22, column: 45 },
                        end: { line: 22, column: 51 },
                      },
                      name: "length",
                    },
                    computed: false,
                    optional: false,
                  },
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 22, column: 54 },
                    end: { line: 22, column: 57 },
                  },
                  value: "|",
                },
              },
              right: {
                type: "CallExpression",
                loc: {
                  start: { line: 22, column: 60 },
                  end: { line: 22, column: 76 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 22, column: 60 },
                    end: { line: 22, column: 71 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 22, column: 60 },
                      end: { line: 22, column: 66 },
                    },
                    name: "absent",
                    key: "absent$3pi2uzl7sovgc$2",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 22, column: 67 },
                      end: { line: 22, column: 71 },
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
                      start: { line: 22, column: 72 },
                      end: { line: 22, column: 75 },
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
        code: 'export default () => {\n    const doubled = Array.from({ length: 4 }, (_, index) => index * 2);\n    const empty = Array.from({ length: 0 }, (_, index) => index);\n    const absent = Array.from({ length: 2 }, (value, index) => value === undefined ? index : -1);\n    return doubled.join(",") + "|" + empty.length + "|" + absent.join(",");\n};',
        map: '{"version":3,"file":"array-from.test.jsx","sourceRoot":"","sources":["array-from.test.tsx"],"names":[],"mappings":"eAeO;IACD,MAAM,OAAO,GAAG,KAAK,CAAC,IAAI,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,EAAE,CAAC,CAAC,EAAE,KAAK,EAAE,EAAE,CAAC,KAAK,GAAG,CAAC,CAAC,CAAC;IACnE,MAAM,KAAK,GAAG,KAAK,CAAC,IAAI,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,EAAE,CAAC,CAAC,EAAE,KAAK,EAAE,EAAE,CAAC,KAAK,CAAC,CAAC;IAC7D,MAAM,MAAM,GAAG,KAAK,CAAC,IAAI,CAAC,EAAE,MAAM,EAAE,CAAC,EAAE,EAAE,CAAC,KAAK,EAAE,KAAK,EAAE,EAAE,CACxD,KAAK,KAAK,SAAS,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CACjC,CAAC;IACF,OAAO,OAAO,CAAC,IAAI,CAAC,GAAG,CAAC,GAAG,GAAG,GAAG,KAAK,CAAC,MAAM,GAAG,GAAG,GAAG,MAAM,CAAC,IAAI,CAAC,GAAG,CAAC,CAAC;AACzE,CAAC"}',
      },
    ),
  );
});
