import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A script that returns a value may still run an action.
const valueScriptEffects = cs.create(
  "1zk77nyjrl50d:7:41",
  { splices: {}, captures: [] },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 7, column: 44 }, end: { line: 9, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 8, column: 2 }, end: { line: 8, column: 14 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 8, column: 8 },
              end: { line: 8, column: 13 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 8, column: 8 },
                end: { line: 8, column: 9 },
              },
              name: "x",
              key: "x$1zk77nyjrl50d$0",
            },
            init: {
              type: "Literal",
              loc: {
                start: { line: 8, column: 12 },
                end: { line: 8, column: 13 },
              },
              value: 1,
            },
          },
        ],
      },
    ],
  }),
  "() => {\n    const x = 1;\n}",
  '{"version":3,"file":"action-in-value-script.test.jsx","sourceRoot":"","sources":["action-in-value-script.test.tsx"],"names":[],"mappings":"AAM4C;IAC1C,MAAM,CAAC,GAAG,CAAC,CAAC;AACd,CAAC,CAAA"}',
);
const ping = cs.create(
  "1zk77nyjrl50d:11:33",
  { splices: {}, captures: [] },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 11, column: 36 }, end: { line: 14, column: 1 } },
    params: [],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 11, column: 42 }, end: { line: 14, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 12, column: 2 },
            end: { line: 12, column: 12 },
          },
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 12, column: 6 },
                end: { line: 12, column: 11 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 12, column: 6 },
                  end: { line: 12, column: 7 },
                },
                name: "n",
                key: "n$1zk77nyjrl50d$1",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 12, column: 10 },
                  end: { line: 12, column: 11 },
                },
                value: 0,
              },
            },
          ],
        },
        {
          type: "ExpressionStatement",
          loc: { start: { line: 13, column: 2 }, end: { line: 13, column: 8 } },
          expression: {
            type: "AssignmentExpression",
            loc: {
              start: { line: 13, column: 2 },
              end: { line: 13, column: 7 },
            },
            operator: "=",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 13, column: 2 },
                end: { line: 13, column: 3 },
              },
              name: "n",
              key: "n$1zk77nyjrl50d$1",
            },
            right: {
              type: "Literal",
              loc: {
                start: { line: 13, column: 6 },
                end: { line: 13, column: 7 },
              },
              value: 1,
            },
          },
        },
      ],
    },
    expression: false,
  }),
  "() => () => {\n    let n = 0;\n    n = 1;\n}",
  '{"version":3,"file":"action-in-value-script.test.jsx","sourceRoot":"","sources":["action-in-value-script.test.tsx"],"names":[],"mappings":"AAUoC,MAAA,GAAG,EAAE;IACvC,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,CAAC,GAAG,CAAC,CAAC;AACR,CAAC,CAAA"}',
);
it("actionInValueScript", async (t) => {
  await snapshotCase(
    t,
    "actionInValueScript",
    cs.create(
      "1zk77nyjrl50d:20:4",
      {
        splices: {
          $valueScriptEffects: { value: valueScriptEffects, params: [] },
          $ping: { value: ping, params: [] },
        },
        captures: [],
      },
      () => ({
        type: "ArrowFunctionExpression",
        loc: { start: { line: 20, column: 7 }, end: { line: 28, column: 5 } },
        params: [
          {
            type: "Identifier",
            loc: {
              start: { line: 20, column: 8 },
              end: { line: 20, column: 9 },
            },
            name: "b",
            key: "b$1zk77nyjrl50d$2",
          },
        ],
        body: {
          type: "BlockStatement",
          loc: {
            start: { line: 20, column: 23 },
            end: { line: 28, column: 5 },
          },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 21, column: 6 },
                end: { line: 21, column: 16 },
              },
              kind: "let",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 21, column: 10 },
                    end: { line: 21, column: 15 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 21, column: 10 },
                      end: { line: 21, column: 11 },
                    },
                    name: "n",
                    key: "n$1zk77nyjrl50d$3",
                  },
                  init: {
                    type: "Literal",
                    loc: {
                      start: { line: 21, column: 14 },
                      end: { line: 21, column: 15 },
                    },
                    value: 0,
                  },
                },
              ],
            },
            {
              type: "ExpressionStatement",
              loc: {
                start: { line: 22, column: 6 },
                end: { line: 22, column: 26 },
              },
              expression: {
                type: "Splice",
                loc: {
                  start: { line: 22, column: 6 },
                  end: { line: 22, column: 25 },
                },
                key: "$valueScriptEffects",
              },
            },
            {
              type: "IfStatement",
              loc: {
                start: { line: 23, column: 6 },
                end: { line: 26, column: 7 },
              },
              test: {
                type: "Identifier",
                loc: {
                  start: { line: 23, column: 10 },
                  end: { line: 23, column: 11 },
                },
                name: "b",
                key: "b$1zk77nyjrl50d$2",
              },
              consequent: {
                type: "BlockStatement",
                loc: {
                  start: { line: 23, column: 13 },
                  end: { line: 26, column: 7 },
                },
                body: [
                  {
                    type: "ExpressionStatement",
                    loc: {
                      start: { line: 24, column: 8 },
                      end: { line: 24, column: 16 },
                    },
                    expression: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 24, column: 8 },
                        end: { line: 24, column: 15 },
                      },
                      callee: {
                        type: "Splice",
                        loc: {
                          start: { line: 24, column: 8 },
                          end: { line: 24, column: 13 },
                        },
                        key: "$ping",
                      },
                      arguments: [],
                      optional: false,
                    },
                  },
                  {
                    type: "ExpressionStatement",
                    loc: {
                      start: { line: 25, column: 8 },
                      end: { line: 25, column: 14 },
                    },
                    expression: {
                      type: "AssignmentExpression",
                      loc: {
                        start: { line: 25, column: 8 },
                        end: { line: 25, column: 13 },
                      },
                      operator: "=",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 25, column: 8 },
                          end: { line: 25, column: 9 },
                        },
                        name: "n",
                        key: "n$1zk77nyjrl50d$3",
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 25, column: 12 },
                          end: { line: 25, column: 13 },
                        },
                        value: 1,
                      },
                    },
                  },
                ],
              },
              alternate: null,
            },
            {
              type: "ReturnStatement",
              loc: {
                start: { line: 27, column: 6 },
                end: { line: 27, column: 15 },
              },
              argument: {
                type: "Identifier",
                loc: {
                  start: { line: 27, column: 13 },
                  end: { line: 27, column: 14 },
                },
                name: "n",
                key: "n$1zk77nyjrl50d$3",
              },
            },
          ],
        },
        expression: false,
      }),
      "($0, $1) => (b) => {\n    let n = 0;\n    $0();\n    if (b) {\n        $1()();\n        n = 1;\n    }\n    return n;\n}",
      '{"version":3,"file":"action-in-value-script.test.jsx","sourceRoot":"","sources":["action-in-value-script.test.tsx"],"names":[],"mappings":"AAmBO,YAAA,CAAC,CAAU,EAAE,EAAE;IAChB,IAAI,CAAC,GAAG,CAAC,CAAC;IACV,IAAmB,CAAC;IACpB,IAAI,CAAC,EAAE,CAAC;QACN,IAAK,EAAE,CAAC;QACR,CAAC,GAAG,CAAC,CAAC;IACR,CAAC;IACD,OAAO,CAAC,CAAC;AACX,CAAC,CAAA"}',
    ),
  );
});
