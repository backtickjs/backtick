import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A script that returns a value may still run an action: what a statement
// discards has to be nothing, and an action is what answers with nothing.
//
// The check is `cs.statement`'s and not the compiler's — the position is what
// decides, not the kind of script it sits in. A value in statement position is
// a mistake wherever it stands (see `discarded-value`), and an action is the
// point of the position rather than something a value script has to go without.
const valueScriptEffects = cs.create(
  { start: { line: 13, column: 41 }, end: { line: 15, column: 2 } },
  {
    version: "0.0.0",
    filePath: "control-flow/action-in-value-script.test.tsx",
    fileHash: "cliqugg05c8d",
    splices: {},
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 13, column: 44 }, end: { line: 15, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 14, column: 2 }, end: { line: 14, column: 14 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 14, column: 8 },
              end: { line: 14, column: 13 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 14, column: 8 },
                end: { line: 14, column: 9 },
              },
              name: "x",
              bindingKey: "x$cliqugg05c8d$0",
            },
            init: {
              type: "Literal",
              loc: {
                start: { line: 14, column: 12 },
                end: { line: 14, column: 13 },
              },
              value: 1,
            },
          },
        ],
      },
    ],
  }),
);
const ping = cs.create(
  { start: { line: 17, column: 33 }, end: { line: 20, column: 2 } },
  {
    version: "0.0.0",
    filePath: "control-flow/action-in-value-script.test.tsx",
    fileHash: "cliqugg05c8d",
    splices: {},
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 17, column: 36 }, end: { line: 20, column: 1 } },
    params: [],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 17, column: 42 }, end: { line: 20, column: 1 } },
      body: [
        {
          type: "VariableDeclaration",
          loc: {
            start: { line: 18, column: 2 },
            end: { line: 18, column: 12 },
          },
          kind: "let",
          declarations: [
            {
              type: "VariableDeclarator",
              loc: {
                start: { line: 18, column: 6 },
                end: { line: 18, column: 11 },
              },
              id: {
                type: "Identifier",
                loc: {
                  start: { line: 18, column: 6 },
                  end: { line: 18, column: 7 },
                },
                name: "n",
                bindingKey: "n$cliqugg05c8d$1",
              },
              init: {
                type: "Literal",
                loc: {
                  start: { line: 18, column: 10 },
                  end: { line: 18, column: 11 },
                },
                value: 0,
              },
            },
          ],
        },
        {
          type: "ExpressionStatement",
          loc: { start: { line: 19, column: 2 }, end: { line: 19, column: 8 } },
          expression: {
            type: "AssignmentExpression",
            loc: {
              start: { line: 19, column: 2 },
              end: { line: 19, column: 7 },
            },
            operator: "=",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 19, column: 2 },
                end: { line: 19, column: 3 },
              },
              name: "n",
              bindingKey: "n$cliqugg05c8d$1",
            },
            right: {
              type: "Literal",
              loc: {
                start: { line: 19, column: 6 },
                end: { line: 19, column: 7 },
              },
              value: 1,
            },
          },
        },
      ],
    },
    expression: false,
  }),
);
it("actionInValueScript", async (t) => {
  await snapshotCase(
    t,
    "actionInValueScript",
    cs.create(
      { start: { line: 26, column: 4 }, end: { line: 34, column: 6 } },
      {
        version: "0.0.0",
        filePath: "control-flow/action-in-value-script.test.tsx",
        fileHash: "cliqugg05c8d",
        splices: {
          $valueScriptEffects: { value: valueScriptEffects, params: [] },
          $ping: { value: ping, params: [] },
        },
        captures: [],
      },
      () => ({
        type: "ArrowFunctionExpression",
        loc: { start: { line: 26, column: 7 }, end: { line: 34, column: 5 } },
        params: [
          {
            type: "Identifier",
            loc: {
              start: { line: 26, column: 8 },
              end: { line: 26, column: 9 },
            },
            name: "b",
            bindingKey: "b$cliqugg05c8d$2",
          },
        ],
        body: {
          type: "BlockStatement",
          loc: {
            start: { line: 26, column: 23 },
            end: { line: 34, column: 5 },
          },
          body: [
            {
              type: "VariableDeclaration",
              loc: {
                start: { line: 27, column: 6 },
                end: { line: 27, column: 16 },
              },
              kind: "let",
              declarations: [
                {
                  type: "VariableDeclarator",
                  loc: {
                    start: { line: 27, column: 10 },
                    end: { line: 27, column: 15 },
                  },
                  id: {
                    type: "Identifier",
                    loc: {
                      start: { line: 27, column: 10 },
                      end: { line: 27, column: 11 },
                    },
                    name: "n",
                    bindingKey: "n$cliqugg05c8d$3",
                  },
                  init: {
                    type: "Literal",
                    loc: {
                      start: { line: 27, column: 14 },
                      end: { line: 27, column: 15 },
                    },
                    value: 0,
                  },
                },
              ],
            },
            {
              type: "ExpressionStatement",
              loc: {
                start: { line: 28, column: 6 },
                end: { line: 28, column: 26 },
              },
              expression: {
                type: "Splice",
                loc: {
                  start: { line: 28, column: 6 },
                  end: { line: 28, column: 25 },
                },
                key: "$valueScriptEffects",
              },
            },
            {
              type: "IfStatement",
              loc: {
                start: { line: 29, column: 6 },
                end: { line: 32, column: 7 },
              },
              test: {
                type: "Identifier",
                loc: {
                  start: { line: 29, column: 10 },
                  end: { line: 29, column: 11 },
                },
                name: "b",
                bindingKey: "b$cliqugg05c8d$2",
              },
              consequent: {
                type: "BlockStatement",
                loc: {
                  start: { line: 29, column: 13 },
                  end: { line: 32, column: 7 },
                },
                body: [
                  {
                    type: "ExpressionStatement",
                    loc: {
                      start: { line: 30, column: 8 },
                      end: { line: 30, column: 16 },
                    },
                    expression: {
                      type: "CallExpression",
                      loc: {
                        start: { line: 30, column: 8 },
                        end: { line: 30, column: 15 },
                      },
                      callee: {
                        type: "Splice",
                        loc: {
                          start: { line: 30, column: 8 },
                          end: { line: 30, column: 13 },
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
                      start: { line: 31, column: 8 },
                      end: { line: 31, column: 14 },
                    },
                    expression: {
                      type: "AssignmentExpression",
                      loc: {
                        start: { line: 31, column: 8 },
                        end: { line: 31, column: 13 },
                      },
                      operator: "=",
                      left: {
                        type: "Identifier",
                        loc: {
                          start: { line: 31, column: 8 },
                          end: { line: 31, column: 9 },
                        },
                        name: "n",
                        bindingKey: "n$cliqugg05c8d$3",
                      },
                      right: {
                        type: "Literal",
                        loc: {
                          start: { line: 31, column: 12 },
                          end: { line: 31, column: 13 },
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
                start: { line: 33, column: 6 },
                end: { line: 33, column: 15 },
              },
              argument: {
                type: "Identifier",
                loc: {
                  start: { line: 33, column: 13 },
                  end: { line: 33, column: 14 },
                },
                name: "n",
                bindingKey: "n$cliqugg05c8d$3",
              },
            },
          ],
        },
        expression: false,
      }),
    ),
  );
});
