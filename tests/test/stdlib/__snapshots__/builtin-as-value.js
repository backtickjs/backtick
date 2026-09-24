import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A builtin is a value, not only a callee. The compiler folds `Math.floor`
// into one whole name the client answers — there is no `Math` for a read to
// yield — and that name stands wherever a value does: bound to a variable,
// and handed to something that calls it.
//
// The `math` case reads `Math.PI` as a value too, but a constant is the easy
// half of this. What a builtin *function* is read as has to arrive callable.
it("builtinAsValue", async (t) => {
  await snapshotCase(
    t,
    "builtinAsValue",
    cs.create(
      { start: { line: 16, column: 4 }, end: { line: 20, column: 6 } },
      {
        filePath: "stdlib/builtin-as-value.test.tsx",
        fileHash: "1n7k5w76rpsyr",
        splices: {},
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 16, column: 7 }, end: { line: 20, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 17, column: 31 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 17, column: 12 },
                  end: { line: 17, column: 30 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 17, column: 12 },
                    end: { line: 17, column: 17 },
                  },
                  name: "floor",
                  key: "floor$1n7k5w76rpsyr$0",
                },
                init: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 17, column: 20 },
                    end: { line: 17, column: 30 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 20 },
                      end: { line: 17, column: 24 },
                    },
                    name: "Math",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 25 },
                      end: { line: 17, column: 30 },
                    },
                    name: "floor",
                  },
                  computed: false,
                  optional: false,
                },
              },
            ],
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 66 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 18, column: 12 },
                  end: { line: 18, column: 65 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 18, column: 12 },
                    end: { line: 18, column: 17 },
                  },
                  name: "apply",
                  key: "apply$1n7k5w76rpsyr$1",
                },
                init: {
                  type: "ArrowFunctionExpression",
                  loc: {
                    start: { line: 18, column: 20 },
                    end: { line: 18, column: 65 },
                  },
                  params: [
                    {
                      type: "Identifier",
                      loc: {
                        start: { line: 18, column: 21 },
                        end: { line: 18, column: 22 },
                      },
                      name: "f",
                      key: "f$1n7k5w76rpsyr$2",
                    },
                    {
                      type: "Identifier",
                      loc: {
                        start: { line: 18, column: 47 },
                        end: { line: 18, column: 48 },
                      },
                      name: "n",
                      key: "n$1n7k5w76rpsyr$3",
                    },
                  ],
                  body: {
                    type: "CallExpression",
                    loc: {
                      start: { line: 18, column: 61 },
                      end: { line: 18, column: 65 },
                    },
                    callee: {
                      type: "Identifier",
                      loc: {
                        start: { line: 18, column: 61 },
                        end: { line: 18, column: 62 },
                      },
                      name: "f",
                      key: "f$1n7k5w76rpsyr$2",
                    },
                    arguments: [
                      {
                        type: "Identifier",
                        loc: {
                          start: { line: 18, column: 63 },
                          end: { line: 18, column: 64 },
                        },
                        name: "n",
                        key: "n$1n7k5w76rpsyr$3",
                      },
                    ],
                    optional: false,
                  },
                  expression: true,
                },
              },
            ],
          },
          {
            type: "ReturnStatement",
            loc: {
              start: { line: 19, column: 6 },
              end: { line: 19, column: 48 },
            },
            argument: {
              type: "BinaryExpression",
              loc: {
                start: { line: 19, column: 13 },
                end: { line: 19, column: 47 },
              },
              operator: "+",
              left: {
                type: "CallExpression",
                loc: {
                  start: { line: 19, column: 13 },
                  end: { line: 19, column: 23 },
                },
                callee: {
                  type: "Identifier",
                  loc: {
                    start: { line: 19, column: 13 },
                    end: { line: 19, column: 18 },
                  },
                  name: "floor",
                  key: "floor$1n7k5w76rpsyr$0",
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 19, column: 19 },
                      end: { line: 19, column: 22 },
                    },
                    value: 3.5,
                  },
                ],
                optional: false,
              },
              right: {
                type: "CallExpression",
                loc: {
                  start: { line: 19, column: 26 },
                  end: { line: 19, column: 47 },
                },
                callee: {
                  type: "Identifier",
                  loc: {
                    start: { line: 19, column: 26 },
                    end: { line: 19, column: 31 },
                  },
                  name: "apply",
                  key: "apply$1n7k5w76rpsyr$1",
                },
                arguments: [
                  {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 19, column: 32 },
                      end: { line: 19, column: 41 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 19, column: 32 },
                        end: { line: 19, column: 36 },
                      },
                      name: "Math",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 19, column: 37 },
                        end: { line: 19, column: 41 },
                      },
                      name: "ceil",
                    },
                    computed: false,
                    optional: false,
                  },
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 19, column: 43 },
                      end: { line: 19, column: 46 },
                    },
                    value: 3.5,
                  },
                ],
                optional: false,
              },
            },
          },
        ],
      }),
      "() => {\n    const floor = Math.floor;\n    const apply = (f, n) => f(n);\n    return floor(3.5) + apply(Math.ceil, 3.5);\n}",
      '{"version":3,"file":"builtin-as-value.test.jsx","sourceRoot":"","sources":["builtin-as-value.test.tsx"],"names":[],"mappings":"AAeO;IACD,MAAM,KAAK,GAAG,IAAI,CAAC,KAAK,CAAC;IACzB,MAAM,KAAK,GAAG,CAAC,CAAwB,EAAE,CAAS,EAAE,EAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC;IAC5D,OAAO,KAAK,CAAC,GAAG,CAAC,GAAG,KAAK,CAAC,IAAI,CAAC,IAAI,EAAE,GAAG,CAAC,CAAC;AAC5C,CAAC,CAAA"}',
    ),
  );
});
