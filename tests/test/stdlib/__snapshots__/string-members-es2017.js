import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// The string members after ES2015 that read a string without changing
// anything: padding, trimming one end, reading by position, and replacing
// every occurrence.
it("stringMembersEs2017", async (t) => {
  await snapshotCase(
    t,
    "stringMembersEs2017",
    cs.create(
      "376ffut9l2xr3:12:4",
      { params: [] },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 12, column: 7 }, end: { line: 21, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 13, column: 6 },
              end: { line: 13, column: 24 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 13, column: 12 },
                  end: { line: 13, column: 23 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 13, column: 12 },
                    end: { line: 13, column: 16 },
                  },
                  name: "word",
                  key: "word$376ffut9l2xr3$0",
                },
                init: {
                  type: "Literal",
                  loc: {
                    start: { line: 13, column: 19 },
                    end: { line: 13, column: 23 },
                  },
                  value: "ab",
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 20, column: 8 },
            },
            argument: {
              type: "ObjectExpression",
              loc: {
                start: { line: 14, column: 13 },
                end: { line: 20, column: 7 },
              },
              properties: [
                {
                  type: "Property",
                  loc: {
                    start: { line: 15, column: 8 },
                    end: { line: 15, column: 61 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 15, column: 8 },
                      end: { line: 15, column: 14 },
                    },
                    name: "padded",
                  },
                  value: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 15, column: 16 },
                      end: { line: 15, column: 61 },
                    },
                    operator: "+",
                    left: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 15, column: 16 },
                        end: { line: 15, column: 38 },
                      },
                      operator: "+",
                      left: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 15, column: 16 },
                          end: { line: 15, column: 32 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 15, column: 16 },
                            end: { line: 15, column: 29 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 16 },
                              end: { line: 15, column: 20 },
                            },
                            name: "word",
                            key: "word$376ffut9l2xr3$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 15, column: 21 },
                              end: { line: 15, column: 29 },
                            },
                            name: "padStart",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [
                          {
                            type: "Literal",
                            loc: {
                              start: { line: 15, column: 30 },
                              end: { line: 15, column: 31 },
                            },
                            value: 4,
                          },
                        ],
                        optional: false,
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 15, column: 35 },
                          end: { line: 15, column: 38 },
                        },
                        value: "|",
                      },
                    },
                    right: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 15, column: 41 },
                        end: { line: 15, column: 61 },
                      },
                      callee: {
                        type: "MemberExpression",
                        loc: {
                          start: { line: 15, column: 41 },
                          end: { line: 15, column: 52 },
                        },
                        object: {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 41 },
                            end: { line: 15, column: 45 },
                          },
                          name: "word",
                          key: "word$376ffut9l2xr3$0",
                        },
                        property: {
                          type: "Identifier",
                          loc: {
                            start: { line: 15, column: 46 },
                            end: { line: 15, column: 52 },
                          },
                          name: "padEnd",
                        },
                        computed: false,
                        optional: false,
                      },
                      arguments: [
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 15, column: 53 },
                            end: { line: 15, column: 54 },
                          },
                          value: 5,
                        },
                        {
                          type: "Literal",
                          loc: {
                            start: { line: 15, column: 56 },
                            end: { line: 15, column: 60 },
                          },
                          value: "-=",
                        },
                      ],
                      optional: false,
                    },
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
                    end: { line: 16, column: 68 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 16, column: 8 },
                      end: { line: 16, column: 15 },
                    },
                    name: "trimmed",
                  },
                  value: {
                    type: "BinaryExpression",
                    loc: {
                      start: { line: 16, column: 17 },
                      end: { line: 16, column: 68 },
                    },
                    operator: "+",
                    left: {
                      type: "BinaryExpression",
                      loc: {
                        start: { line: 16, column: 17 },
                        end: { line: 16, column: 62 },
                      },
                      operator: "+",
                      left: {
                        type: "BinaryExpression",
                        loc: {
                          start: { line: 16, column: 17 },
                          end: { line: 16, column: 42 },
                        },
                        operator: "+",
                        left: {
                          type: "CallExpression",
                          loc: {
                            start: { line: 16, column: 17 },
                            end: { line: 16, column: 36 },
                          },
                          callee: {
                            type: "MemberExpression",
                            loc: {
                              start: { line: 16, column: 17 },
                              end: { line: 16, column: 34 },
                            },
                            object: {
                              type: "Literal",
                              loc: {
                                start: { line: 16, column: 17 },
                                end: { line: 16, column: 24 },
                              },
                              value: "  x  ",
                            },
                            property: {
                              type: "Identifier",
                              loc: {
                                start: { line: 16, column: 25 },
                                end: { line: 16, column: 34 },
                              },
                              name: "trimStart",
                            },
                            computed: false,
                            optional: false,
                          },
                          arguments: [],
                          optional: false,
                        },
                        right: {
                          type: "Literal",
                          loc: {
                            start: { line: 16, column: 39 },
                            end: { line: 16, column: 42 },
                          },
                          value: "|",
                        },
                      },
                      right: {
                        type: "CallExpression",
                        loc: {
                          start: { line: 16, column: 45 },
                          end: { line: 16, column: 62 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 16, column: 45 },
                            end: { line: 16, column: 60 },
                          },
                          object: {
                            type: "Literal",
                            loc: {
                              start: { line: 16, column: 45 },
                              end: { line: 16, column: 52 },
                            },
                            value: "  x  ",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 16, column: 53 },
                              end: { line: 16, column: 60 },
                            },
                            name: "trimEnd",
                          },
                          computed: false,
                          optional: false,
                        },
                        arguments: [],
                        optional: false,
                      },
                    },
                    right: {
                      type: "Literal",
                      loc: {
                        start: { line: 16, column: 65 },
                        end: { line: 16, column: 68 },
                      },
                      value: "|",
                    },
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
                    end: { line: 17, column: 49 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 8 },
                      end: { line: 17, column: 10 },
                    },
                    name: "at",
                  },
                  value: {
                    type: "ArrayExpression",
                    loc: {
                      start: { line: 17, column: 12 },
                      end: { line: 17, column: 49 },
                    },
                    elements: [
                      {
                        type: "CallExpression",
                        loc: {
                          start: { line: 17, column: 13 },
                          end: { line: 17, column: 23 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 17, column: 13 },
                            end: { line: 17, column: 20 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 13 },
                              end: { line: 17, column: 17 },
                            },
                            name: "word",
                            key: "word$376ffut9l2xr3$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 18 },
                              end: { line: 17, column: 20 },
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
                              start: { line: 17, column: 21 },
                              end: { line: 17, column: 22 },
                            },
                            value: 0,
                          },
                        ],
                        optional: false,
                      },
                      {
                        type: "CallExpression",
                        loc: {
                          start: { line: 17, column: 25 },
                          end: { line: 17, column: 36 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 17, column: 25 },
                            end: { line: 17, column: 32 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 25 },
                              end: { line: 17, column: 29 },
                            },
                            name: "word",
                            key: "word$376ffut9l2xr3$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 30 },
                              end: { line: 17, column: 32 },
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
                              start: { line: 17, column: 33 },
                              end: { line: 17, column: 35 },
                            },
                            operator: "-",
                            prefix: true,
                            argument: {
                              type: "Literal",
                              loc: {
                                start: { line: 17, column: 34 },
                                end: { line: 17, column: 35 },
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
                          start: { line: 17, column: 38 },
                          end: { line: 17, column: 48 },
                        },
                        callee: {
                          type: "MemberExpression",
                          loc: {
                            start: { line: 17, column: 38 },
                            end: { line: 17, column: 45 },
                          },
                          object: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 38 },
                              end: { line: 17, column: 42 },
                            },
                            name: "word",
                            key: "word$376ffut9l2xr3$0",
                          },
                          property: {
                            type: "Identifier",
                            loc: {
                              start: { line: 17, column: 43 },
                              end: { line: 17, column: 45 },
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
                              start: { line: 17, column: 46 },
                              end: { line: 17, column: 47 },
                            },
                            value: 5,
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
                    start: { line: 18, column: 8 },
                    end: { line: 18, column: 46 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 18, column: 8 },
                      end: { line: 18, column: 16 },
                    },
                    name: "replaced",
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
                        end: { line: 18, column: 36 },
                      },
                      object: {
                        type: "Literal",
                        loc: {
                          start: { line: 18, column: 18 },
                          end: { line: 18, column: 25 },
                        },
                        value: "a.b.c",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 26 },
                          end: { line: 18, column: 36 },
                        },
                        name: "replaceAll",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 18, column: 37 },
                          end: { line: 18, column: 40 },
                        },
                        value: ".",
                      },
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 18, column: 42 },
                          end: { line: 18, column: 45 },
                        },
                        value: "/",
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
                    end: { line: 19, column: 73 },
                  },
                  key: {
                    type: "Identifier",
                    loc: {
                      start: { line: 19, column: 8 },
                      end: { line: 19, column: 18 },
                    },
                    name: "replacedBy",
                  },
                  value: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 19, column: 20 },
                      end: { line: 19, column: 73 },
                    },
                    callee: {
                      type: "MemberExpression",
                      loc: {
                        start: { line: 19, column: 20 },
                        end: { line: 19, column: 36 },
                      },
                      object: {
                        type: "Literal",
                        loc: {
                          start: { line: 19, column: 20 },
                          end: { line: 19, column: 25 },
                        },
                        value: "a.b",
                      },
                      property: {
                        type: "Identifier",
                        loc: {
                          start: { line: 19, column: 26 },
                          end: { line: 19, column: 36 },
                        },
                        name: "replaceAll",
                      },
                      computed: false,
                      optional: false,
                    },
                    arguments: [
                      {
                        type: "Literal",
                        loc: {
                          start: { line: 19, column: 37 },
                          end: { line: 19, column: 40 },
                        },
                        value: ".",
                      },
                      {
                        type: "ArrowFunctionExpression",
                        loc: {
                          start: { line: 19, column: 42 },
                          end: { line: 19, column: 72 },
                        },
                        params: [
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 43 },
                              end: { line: 19, column: 48 },
                            },
                            name: "found",
                            key: "found$376ffut9l2xr3$1",
                          },
                          {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 50 },
                              end: { line: 19, column: 56 },
                            },
                            name: "offset",
                            key: "offset$376ffut9l2xr3$2",
                          },
                        ],
                        body: {
                          type: "BinaryExpression",
                          loc: {
                            start: { line: 19, column: 61 },
                            end: { line: 19, column: 72 },
                          },
                          operator: "+",
                          left: {
                            type: "Literal",
                            loc: {
                              start: { line: 19, column: 61 },
                              end: { line: 19, column: 63 },
                            },
                            value: "",
                          },
                          right: {
                            type: "Identifier",
                            loc: {
                              start: { line: 19, column: 66 },
                              end: { line: 19, column: 72 },
                            },
                            name: "offset",
                            key: "offset$376ffut9l2xr3$2",
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
      {
        code: 'export default () => {\n    const word = "ab";\n    return {\n        padded: word.padStart(4) + "|" + word.padEnd(5, "-="),\n        trimmed: "  x  ".trimStart() + "|" + "  x  ".trimEnd() + "|",\n        at: [word.at(0), word.at(-1), word.at(5)],\n        replaced: "a.b.c".replaceAll(".", "/"),\n        replacedBy: "a.b".replaceAll(".", (found, offset) => "" + offset),\n    };\n};',
        map: '{"version":3,"file":"string-members-es2017.test.jsx","sourceRoot":"","sources":["string-members-es2017.test.tsx"],"names":[],"mappings":"eAWO;IACD,MAAM,IAAI,GAAG,IAAI,CAAC;IAClB,OAAO;QACL,MAAM,EAAE,IAAI,CAAC,QAAQ,CAAC,CAAC,CAAC,GAAG,GAAG,GAAG,IAAI,CAAC,MAAM,CAAC,CAAC,EAAE,IAAI,CAAC;QACrD,OAAO,EAAE,OAAO,CAAC,SAAS,EAAE,GAAG,GAAG,GAAG,OAAO,CAAC,OAAO,EAAE,GAAG,GAAG;QAC5D,EAAE,EAAE,CAAC,IAAI,CAAC,EAAE,CAAC,CAAC,CAAC,EAAE,IAAI,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,EAAE,IAAI,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC;QACzC,QAAQ,EAAE,OAAO,CAAC,UAAU,CAAC,GAAG,EAAE,GAAG,CAAC;QACtC,UAAU,EAAE,KAAK,CAAC,UAAU,CAAC,GAAG,EAAE,CAAC,KAAK,EAAE,MAAM,EAAE,EAAE,CAAC,EAAE,GAAG,MAAM,CAAC;KAClE,CAAC;AACJ,CAAC"}',
      },
    ),
  );
});
