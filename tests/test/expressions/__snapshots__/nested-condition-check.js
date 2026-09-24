import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A checked condition containing its own tested positions: `keep(a && b)` is
// checked (a call), and inside it `a` and `b` are checked (identifiers). The
// check's trailing bare duplicate must stay check-free and suppressed — a
// duplicate that re-checked its operands would grow by a copy per nesting
// level and re-report every operand mismatch at a second virtual position —
// so the virtual code and mappings pin the duplicate staying bare.
const gate = cs.create(
  { start: { line: 11, column: 57 }, end: { line: 20, column: 2 } },
  {
    version: "0.0.0",
    filePath: "expressions/nested-condition-check.test.tsx",
    fileHash: "25ylu92dfkakl",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 11, column: 60 }, end: { line: 20, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 12, column: 2 }, end: { line: 12, column: 3 } },
        name: "a",
        bindingKey: "a$25ylu92dfkakl$0",
      },
      {
        type: "Identifier",
        loc: { start: { line: 13, column: 2 }, end: { line: 13, column: 3 } },
        name: "b",
        bindingKey: "b$25ylu92dfkakl$1",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 14, column: 5 }, end: { line: 20, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 15, column: 2 },
            end: { line: 15, column: 35 },
          },
          kind: "const",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 15, column: 8 },
                end: { line: 15, column: 34 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 15, column: 8 },
                  end: { line: 15, column: 12 },
                },
                name: "keep",
                bindingKey: "keep$25ylu92dfkakl$2",
              },
              init: {
                type: "ArrowFunctionExpression",
                loc: {
                  start: { line: 15, column: 15 },
                  end: { line: 15, column: 34 },
                },
                params: [
                  {
                    type: "Identifier",
                    loc: {
                      start: { line: 15, column: 16 },
                      end: { line: 15, column: 18 },
                    },
                    name: "on",
                    bindingKey: "on$25ylu92dfkakl$3",
                  },
                ],
                body: {
                  type: "Identifier",
                  loc: {
                    start: { line: 15, column: 32 },
                    end: { line: 15, column: 34 },
                  },
                  name: "on",
                  bindingKey: "on$25ylu92dfkakl$3",
                },
                expression: true,
              },
            },
          ],
        },
        {
          type: "IfStatement",
          loc: { start: { line: 16, column: 2 }, end: { line: 18, column: 3 } },
          test: {
            type: "CallExpression",
            loc: {
              start: { line: 16, column: 6 },
              end: { line: 16, column: 18 },
            },
            callee: {
              type: "Identifier",
              loc: {
                start: { line: 16, column: 6 },
                end: { line: 16, column: 10 },
              },
              name: "keep",
              bindingKey: "keep$25ylu92dfkakl$2",
            },
            arguments: [
              {
                type: "LogicalExpression",
                loc: {
                  start: { line: 16, column: 11 },
                  end: { line: 16, column: 17 },
                },
                operator: "&&",
                left: {
                  type: "Identifier",
                  loc: {
                    start: { line: 16, column: 11 },
                    end: { line: 16, column: 12 },
                  },
                  name: "a",
                  bindingKey: "a$25ylu92dfkakl$0",
                },
                right: {
                  type: "Identifier",
                  loc: {
                    start: { line: 16, column: 16 },
                    end: { line: 16, column: 17 },
                  },
                  name: "b",
                  bindingKey: "b$25ylu92dfkakl$1",
                },
              },
            ],
            optional: false,
          },
          consequent: {
            type: "BlockStatement",
            loc: {
              start: { line: 16, column: 20 },
              end: { line: 18, column: 3 },
            },
            body: [
              {
                type: "ReturnStatement",
                loc: {
                  start: { line: 17, column: 4 },
                  end: { line: 17, column: 18 },
                },
                argument: {
                  type: "Literal",
                  loc: {
                    start: { line: 17, column: 11 },
                    end: { line: 17, column: 17 },
                  },
                  value: "kept",
                },
              },
            ],
          },
          alternate: null,
        },
        {
          type: "ReturnStatement",
          loc: {
            start: { line: 19, column: 2 },
            end: { line: 19, column: 19 },
          },
          argument: {
            type: "Literal",
            loc: {
              start: { line: 19, column: 9 },
              end: { line: 19, column: 18 },
            },
            value: "dropped",
          },
        },
      ],
    },
    expression: false,
  }),
);
it("nestedConditionCheck", async (t) => {
  await snapshotCase(
    t,
    "nestedConditionCheck",
    cs.create(
      { start: { line: 26, column: 4 }, end: { line: 29, column: 7 } },
      {
        version: "0.0.0",
        filePath: "expressions/nested-condition-check.test.tsx",
        fileHash: "25ylu92dfkakl",
        splices: { $gate: { value: gate, params: [] } },
        captures: [],
      },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 26, column: 8 }, end: { line: 29, column: 5 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 27, column: 6 },
              end: { line: 27, column: 29 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 27, column: 6 },
                end: { line: 27, column: 10 },
              },
              name: "both",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 27, column: 12 },
                end: { line: 27, column: 29 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 27, column: 12 },
                  end: { line: 27, column: 17 },
                },
                key: "$gate",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 27, column: 18 },
                    end: { line: 27, column: 22 },
                  },
                  value: true,
                },
                {
                  type: "Literal",
                  loc: {
                    start: { line: 27, column: 24 },
                    end: { line: 27, column: 28 },
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
              start: { line: 28, column: 6 },
              end: { line: 28, column: 29 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 28, column: 6 },
                end: { line: 28, column: 9 },
              },
              name: "one",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 28, column: 11 },
                end: { line: 28, column: 29 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 28, column: 11 },
                  end: { line: 28, column: 16 },
                },
                key: "$gate",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 17 },
                    end: { line: 28, column: 21 },
                  },
                  value: true,
                },
                {
                  type: "Literal",
                  loc: {
                    start: { line: 28, column: 23 },
                    end: { line: 28, column: 28 },
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
    ),
  );
});
