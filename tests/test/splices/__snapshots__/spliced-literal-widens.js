import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// What a splice hands over keeps the width the host gave it.
//
// `const five = 5` has the literal type `5`, and an enum member has its own, so
// a cell built from either would take no other value if the splice retyped what
// it crossed. It does not: `cs.splice` reads its argument unbound, leaving the
// binding to decide the width — `number` for the one, `Color` for the other.
//
// The writes are the assertion, each an error the moment a bound comes back to
// `cs.splice`. An action, so a write is what the script is for: in one that
// returns a value they would be side effects as well, and that error would
// stand beside the one under test.
var Color;
(function (Color) {
  Color[(Color["Red"] = 0)] = "Red";
  Color[(Color["Blue"] = 1)] = "Blue";
})(Color || (Color = {}));
const five = 5;
it("splicedLiteralWidens", async (t) => {
  await snapshotCase(
    t,
    "splicedLiteralWidens",
    cs.create(
      "323oescdizqb0:27:4",
      {
        params: [
          { kind: "splice", value: state, bindings: [] },
          { kind: "splice", value: five, bindings: [] },
          { kind: "splice", value: Color.Red, bindings: [] },
          { kind: "splice", value: Color.Blue, bindings: [] },
        ],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 27, column: 7 }, end: { line: 32, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 28, column: 6 },
              end: { line: 28, column: 30 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 28, column: 12 },
                  end: { line: 28, column: 29 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 28, column: 12 },
                    end: { line: 28, column: 13 },
                  },
                  name: "n",
                  key: "n$323oescdizqb0$0",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 28, column: 16 },
                    end: { line: 28, column: 29 },
                  },
                  callee: {
                    type: "Splice",
                    loc: {
                      start: { line: 28, column: 16 },
                      end: { line: 28, column: 22 },
                    },
                    param: 0,
                  },
                  arguments: [
                    {
                      type: "Splice",
                      loc: {
                        start: { line: 28, column: 23 },
                        end: { line: 28, column: 28 },
                      },
                      param: 1,
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 29, column: 6 },
              end: { line: 29, column: 15 },
            },
            expression: {
              type: "CallExpression",
              loc: {
                start: { line: 29, column: 6 },
                end: { line: 29, column: 14 },
              },
              callee: {
                type: "MemberExpression",
                loc: {
                  start: { line: 29, column: 6 },
                  end: { line: 29, column: 11 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 29, column: 6 },
                    end: { line: 29, column: 7 },
                  },
                  name: "n",
                  key: "n$323oescdizqb0$0",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 29, column: 8 },
                    end: { line: 29, column: 11 },
                  },
                  name: "set",
                },
                computed: false,
                optional: false,
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 29, column: 12 },
                    end: { line: 29, column: 13 },
                  },
                  value: 6,
                },
              ],
              optional: false,
            },
          },
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 30, column: 6 },
              end: { line: 30, column: 37 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 30, column: 12 },
                  end: { line: 30, column: 36 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 30, column: 12 },
                    end: { line: 30, column: 13 },
                  },
                  name: "c",
                  key: "c$323oescdizqb0$1",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 30, column: 16 },
                    end: { line: 30, column: 36 },
                  },
                  callee: {
                    type: "Splice",
                    loc: {
                      start: { line: 30, column: 16 },
                      end: { line: 30, column: 22 },
                    },
                    param: 0,
                  },
                  arguments: [
                    {
                      type: "Splice",
                      loc: {
                        start: { line: 30, column: 23 },
                        end: { line: 30, column: 35 },
                      },
                      param: 2,
                    },
                  ],
                  optional: false,
                },
              },
            ],
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 31, column: 6 },
              end: { line: 31, column: 27 },
            },
            expression: {
              type: "CallExpression",
              loc: {
                start: { line: 31, column: 6 },
                end: { line: 31, column: 26 },
              },
              callee: {
                type: "MemberExpression",
                loc: {
                  start: { line: 31, column: 6 },
                  end: { line: 31, column: 11 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 31, column: 6 },
                    end: { line: 31, column: 7 },
                  },
                  name: "c",
                  key: "c$323oescdizqb0$1",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 31, column: 8 },
                    end: { line: 31, column: 11 },
                  },
                  name: "set",
                },
                computed: false,
                optional: false,
              },
              arguments: [
                {
                  type: "Splice",
                  loc: {
                    start: { line: 31, column: 12 },
                    end: { line: 31, column: 25 },
                  },
                  param: 3,
                },
              ],
              optional: false,
            },
          },
        ],
      }),
      "($0, $1, $2, $3) => {\n    const n = $0()($1());\n    n.set(6);\n    const c = $0()($2());\n    c.set($3());\n}",
      '{"version":3,"file":"spliced-literal-widens.test.jsx","sourceRoot":"","sources":["spliced-literal-widens.test.tsx"],"names":[],"mappings":"AA0BO;IACD,MAAM,CAAC,GAAG,IAAM,CAAC,IAAK,CAAC,CAAC;IACxB,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC;IACT,MAAM,CAAC,GAAG,IAAM,CAAC,IAAC,CAAY,CAAC;IAC/B,CAAC,CAAC,GAAG,CAAC,IAAC,CAAa,CAAC;AACvB,CAAC,CAAA"}',
    ),
  );
});
