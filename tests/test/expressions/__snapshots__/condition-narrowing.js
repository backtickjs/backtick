import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A condition narrows in the virtual code: `text !== null` narrows `text` in
// the branch it guards and from a `&&` left operand into the right, a braced
// splice included.
const flags = {
  strict: cs.create(
    "g29mnwu0pbnr:8:24",
    { params: [] },
    () => ({
      type: "Literal",
      loc: { start: { line: 8, column: 27 }, end: { line: 8, column: 31 } },
      value: true,
    }),
    "() => true",
    '{"version":3,"file":"condition-narrowing.test.jsx","sourceRoot":"","sources":["condition-narrowing.test.tsx"],"names":[],"mappings":"AAO2B,MAAA,IAAI,CAAA"}',
  ),
};
const label = cs.create(
  "g29mnwu0pbnr:10:71",
  { params: [{ kind: "splice", value: flags.strict, bindings: [] }] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 10, column: 74 }, end: { line: 21, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 11, column: 2 }, end: { line: 11, column: 6 } },
        name: "text",
        key: "text$g29mnwu0pbnr$0",
      },
      {
        type: "Identifier",
        loc: { start: { line: 12, column: 2 }, end: { line: 12, column: 7 } },
        name: "upper",
        key: "upper$g29mnwu0pbnr$1",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 13, column: 5 }, end: { line: 21, column: 1 } },
      body: [
        {
          type: "IfStatement",
          loc: { start: { line: 14, column: 2 }, end: { line: 16, column: 3 } },
          test: {
            type: "LogicalExpression",
            loc: {
              start: { line: 14, column: 6 },
              end: { line: 14, column: 28 },
            },
            operator: "&&",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 14, column: 6 },
                end: { line: 14, column: 11 },
              },
              name: "upper",
              key: "upper$g29mnwu0pbnr$1",
            },
            right: {
              type: "BinaryExpression",
              loc: {
                start: { line: 14, column: 15 },
                end: { line: 14, column: 28 },
              },
              operator: "!==",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 14, column: 15 },
                  end: { line: 14, column: 19 },
                },
                name: "text",
                key: "text$g29mnwu0pbnr$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 14, column: 24 },
                  end: { line: 14, column: 28 },
                },
                value: null,
              },
            },
          },
          consequent: {
            type: "BlockStatement",
            loc: {
              start: { line: 14, column: 30 },
              end: { line: 16, column: 3 },
            },
            body: [
              {
                type: "ReturnStatement",
                loc: {
                  start: { line: 15, column: 4 },
                  end: { line: 15, column: 30 },
                },
                argument: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 15, column: 11 },
                    end: { line: 15, column: 29 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 15, column: 11 },
                      end: { line: 15, column: 27 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 11 },
                        end: { line: 15, column: 15 },
                      },
                      name: "text",
                      key: "text$g29mnwu0pbnr$0",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 15, column: 16 },
                        end: { line: 15, column: 27 },
                      },
                      name: "toUpperCase",
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
          alternate: null,
        },
        {
          type: "IfStatement",
          loc: { start: { line: 17, column: 2 }, end: { line: 19, column: 3 } },
          test: {
            type: "LogicalExpression",
            loc: {
              start: { line: 17, column: 6 },
              end: { line: 17, column: 64 },
            },
            operator: "&&",
            left: {
              type: "LogicalExpression",
              loc: {
                start: { line: 17, column: 6 },
                end: { line: 17, column: 38 },
              },
              operator: "&&",
              left: {
                type: "Splice",
                loc: {
                  start: { line: 17, column: 6 },
                  end: { line: 17, column: 21 },
                },
                param: 0,
              },
              right: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 17, column: 25 },
                  end: { line: 17, column: 38 },
                },
                operator: "!==",
                left: {
                  type: "Identifier",
                  loc: {
                    start: { line: 17, column: 25 },
                    end: { line: 17, column: 29 },
                  },
                  name: "text",
                  key: "text$g29mnwu0pbnr$0",
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 17, column: 34 },
                    end: { line: 17, column: 38 },
                  },
                  value: null,
                },
              },
            },
            right: {
              type: "BinaryExpression",
              loc: {
                start: { line: 17, column: 42 },
                end: { line: 17, column: 64 },
              },
              operator: "===",
              left: {
                type: "CallExpression",
                loc: {
                  start: { line: 17, column: 42 },
                  end: { line: 17, column: 56 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 17, column: 42 },
                    end: { line: 17, column: 53 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 42 },
                      end: { line: 17, column: 46 },
                    },
                    name: "text",
                    key: "text$g29mnwu0pbnr$0",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 17, column: 47 },
                      end: { line: 17, column: 53 },
                    },
                    name: "charAt",
                  },
                  computed: false,
                  optional: false,
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 17, column: 54 },
                      end: { line: 17, column: 55 },
                    },
                    value: 0,
                  },
                ],
                optional: false,
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 17, column: 61 },
                  end: { line: 17, column: 64 },
                },
                value: "!",
              },
            },
          },
          consequent: {
            type: "BlockStatement",
            loc: {
              start: { line: 17, column: 66 },
              end: { line: 19, column: 3 },
            },
            body: [
              {
                type: "ReturnStatement",
                loc: {
                  start: { line: 18, column: 4 },
                  end: { line: 18, column: 28 },
                },
                argument: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 18, column: 11 },
                    end: { line: 18, column: 27 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 18, column: 11 },
                      end: { line: 18, column: 22 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 18, column: 11 },
                        end: { line: 18, column: 15 },
                      },
                      name: "text",
                      key: "text$g29mnwu0pbnr$0",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 18, column: 16 },
                        end: { line: 18, column: 22 },
                      },
                      name: "concat",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 18, column: 23 },
                        end: { line: 18, column: 26 },
                      },
                      value: "?",
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          alternate: null,
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 20, column: 2 },
            end: { line: 20, column: 16 },
          },
          argument: {
            type: "Literal",
            loc: {
              start: { line: 20, column: 9 },
              end: { line: 20, column: 15 },
            },
            value: "none",
          },
        },
      ],
    },
    expression: false,
  }),
  '$0 => (text, upper) => {\n    if (upper && text !== null) {\n        return text.toUpperCase();\n    }\n    if ($0() && text !== null && text.charAt(0) === "!") {\n        return text.concat("?");\n    }\n    return "none";\n}',
  '{"version":3,"file":"condition-narrowing.test.jsx","sourceRoot":"","sources":["condition-narrowing.test.tsx"],"names":[],"mappings":"AAS0E,MAAA,CACxE,IAAmB,EACnB,KAAc,EACd,EAAE;IACF,IAAI,KAAK,IAAI,IAAI,KAAK,IAAI,EAAE,CAAC;QAC3B,OAAO,IAAI,CAAC,WAAW,EAAE,CAAC;IAC5B,CAAC;IACD,IAAI,IAAC,IAAkB,IAAI,KAAK,IAAI,IAAI,IAAI,CAAC,MAAM,CAAC,CAAC,CAAC,KAAK,GAAG,EAAE,CAAC;QAC/D,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC;IAC1B,CAAC;IACD,OAAO,MAAM,CAAC;AAChB,CAAC,CAAA"}',
);
it("conditionNarrowing", async (t) => {
  await snapshotCase(
    t,
    "conditionNarrowing",
    cs.create(
      "g29mnwu0pbnr:27:4",
      { params: [{ kind: "splice", value: label, bindings: [] }] },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 27, column: 8 }, end: { line: 32, column: 5 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 28, column: 6 },
              end: { line: 28, column: 33 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 28, column: 6 },
                end: { line: 28, column: 13 },
              },
              name: "missing",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 28, column: 15 },
                end: { line: 28, column: 33 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 28, column: 15 },
                  end: { line: 28, column: 21 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 22 },
                    end: { line: 28, column: 26 },
                  },
                  value: null,
                },
                {
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 28 },
                    end: { line: 28, column: 32 },
                  },
                  value: true,
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
              start: { line: 29, column: 6 },
              end: { line: 29, column: 31 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 29, column: 6 },
                end: { line: 29, column: 10 },
              },
              name: "loud",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 29, column: 12 },
                end: { line: 29, column: 31 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 29, column: 12 },
                  end: { line: 29, column: 18 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 29, column: 19 },
                    end: { line: 29, column: 24 },
                  },
                  value: "!hi",
                },
                {
                  type: "Literal",
                  loc: {
                    start: { line: 29, column: 26 },
                    end: { line: 29, column: 30 },
                  },
                  value: true,
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
              start: { line: 30, column: 6 },
              end: { line: 30, column: 33 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 30, column: 6 },
                end: { line: 30, column: 11 },
              },
              name: "quiet",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 30, column: 13 },
                end: { line: 30, column: 33 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 30, column: 13 },
                  end: { line: 30, column: 19 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 30, column: 20 },
                    end: { line: 30, column: 25 },
                  },
                  value: "!hi",
                },
                {
                  type: "Literal",
                  loc: {
                    start: { line: 30, column: 27 },
                    end: { line: 30, column: 32 },
                  },
                  value: false,
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
              start: { line: 31, column: 6 },
              end: { line: 31, column: 32 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 31, column: 6 },
                end: { line: 31, column: 11 },
              },
              name: "plain",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 31, column: 13 },
                end: { line: 31, column: 32 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 31, column: 13 },
                  end: { line: 31, column: 19 },
                },
                param: 0,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 31, column: 20 },
                    end: { line: 31, column: 24 },
                  },
                  value: "zz",
                },
                {
                  type: "Literal",
                  loc: {
                    start: { line: 31, column: 26 },
                    end: { line: 31, column: 31 },
                  },
                  value: false,
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
      }),
      '$0 => ({\n    missing: $0()(null, true),\n    loud: $0()("!hi", true),\n    quiet: $0()("!hi", false),\n    plain: $0()("zz", false),\n})',
      '{"version":3,"file":"condition-narrowing.test.jsx","sourceRoot":"","sources":["condition-narrowing.test.tsx"],"names":[],"mappings":"AA0BO,MAAA,CAAC;IACF,OAAO,EAAE,IAAM,CAAC,IAAI,EAAE,IAAI,CAAC;IAC3B,IAAI,EAAE,IAAM,CAAC,KAAK,EAAE,IAAI,CAAC;IACzB,KAAK,EAAE,IAAM,CAAC,KAAK,EAAE,KAAK,CAAC;IAC3B,KAAK,EAAE,IAAM,CAAC,IAAI,EAAE,KAAK,CAAC;CAC3B,CAAC,CAAA"}',
    ),
  );
});
