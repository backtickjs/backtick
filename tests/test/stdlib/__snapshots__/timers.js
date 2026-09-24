import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { window } from "@backtickjs/browser";
import { snapshotCase } from "../snapshotCase.ts";
// A clock, which is the platform's rather than the language's: a script reaches
// one by splicing the browser's `window`, the same as anything else a platform
// hands over.
//
// And the shape of a member read off a handle. `$window.clearInterval` is
// read as a value and handed on, which is what a name has to survive being —
// the call site below reaches it through a variable, not through the window.
//
// An action rather than a value, and not by preference: starting a timer is a
// side effect, and a script that returns one cannot have those. Which is
// where a timer is started anyway — a handler is an action.
//
// Started and stopped in the one body, so nothing is left ticking after this
// is evaluated: what it pins is the lowering and the names, not the waiting.
// And either clear cancels either kind, which is why one of them is reached
// through the other's id.
it("timers", async (t) => {
  await snapshotCase(
    t,
    "timers",
    cs.create(
      { start: { line: 26, column: 4 }, end: { line: 31, column: 6 } },
      {
        filePath: "stdlib/timers.test.tsx",
        fileHash: "18988aj10wskx",
        splices: { $window: { value: window, params: [] } },
        captures: [],
      },
      () => ({
        type: "BlockStatement",
        loc: { start: { line: 26, column: 7 }, end: { line: 31, column: 5 } },
        body: [
          {
            type: "VariableDeclaration",
            loc: {
              start: { line: 27, column: 6 },
              end: { line: 27, column: 41 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 27, column: 12 },
                  end: { line: 27, column: 40 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 27, column: 12 },
                    end: { line: 27, column: 16 },
                  },
                  name: "stop",
                  key: "stop$18988aj10wskx$0",
                },
                init: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 27, column: 19 },
                    end: { line: 27, column: 40 },
                  },
                  object: {
                    type: "Splice",
                    loc: {
                      start: { line: 27, column: 19 },
                      end: { line: 27, column: 26 },
                    },
                    key: "$window",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 27, column: 27 },
                      end: { line: 27, column: 40 },
                    },
                    name: "clearInterval",
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
              start: { line: 28, column: 6 },
              end: { line: 28, column: 59 },
            },
            kind: "const",
            declarations: [
              {
                type: "VariableDeclarator",
                loc: {
                  start: { line: 28, column: 12 },
                  end: { line: 28, column: 58 },
                },
                id: {
                  type: "Identifier",
                  loc: {
                    start: { line: 28, column: 12 },
                    end: { line: 28, column: 21 },
                  },
                  name: "repeating",
                  key: "repeating$18988aj10wskx$1",
                },
                init: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 28, column: 24 },
                    end: { line: 28, column: 58 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 28, column: 24 },
                      end: { line: 28, column: 43 },
                    },
                    object: {
                      type: "Splice",
                      loc: {
                        start: { line: 28, column: 24 },
                        end: { line: 28, column: 31 },
                      },
                      key: "$window",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 28, column: 32 },
                        end: { line: 28, column: 43 },
                      },
                      name: "setInterval",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 28, column: 44 },
                        end: { line: 28, column: 51 },
                      },
                      params: [],
                      body: {
                        type: "Literal",
                        loc: {
                          start: { line: 28, column: 50 },
                          end: { line: 28, column: 51 },
                        },
                        value: 0,
                      },
                      expression: true,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 28, column: 53 },
                        end: { line: 28, column: 57 },
                      },
                      value: 1000,
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
              end: { line: 29, column: 22 },
            },
            expression: {
              type: "CallExpression",
              loc: {
                start: { line: 29, column: 6 },
                end: { line: 29, column: 21 },
              },
              callee: {
                type: "Identifier",
                loc: {
                  start: { line: 29, column: 6 },
                  end: { line: 29, column: 10 },
                },
                name: "stop",
                key: "stop$18988aj10wskx$0",
              },
              arguments: [
                {
                  type: "Identifier",
                  loc: {
                    start: { line: 29, column: 11 },
                    end: { line: 29, column: 20 },
                  },
                  name: "repeating",
                  key: "repeating$18988aj10wskx$1",
                },
              ],
              optional: false,
            },
          },
          {
            type: "ExpressionStatement",
            loc: {
              start: { line: 30, column: 6 },
              end: { line: 30, column: 62 },
            },
            expression: {
              type: "CallExpression",
              loc: {
                start: { line: 30, column: 6 },
                end: { line: 30, column: 61 },
              },
              callee: {
                type: "MemberExpression",
                loc: {
                  start: { line: 30, column: 6 },
                  end: { line: 30, column: 26 },
                },
                object: {
                  type: "Splice",
                  loc: {
                    start: { line: 30, column: 6 },
                    end: { line: 30, column: 13 },
                  },
                  key: "$window",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 30, column: 14 },
                    end: { line: 30, column: 26 },
                  },
                  name: "clearTimeout",
                },
                computed: false,
                optional: false,
              },
              arguments: [
                {
                  type: "CallExpression",
                  loc: {
                    start: { line: 30, column: 27 },
                    end: { line: 30, column: 60 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 30, column: 27 },
                      end: { line: 30, column: 45 },
                    },
                    object: {
                      type: "Splice",
                      loc: {
                        start: { line: 30, column: 27 },
                        end: { line: 30, column: 34 },
                      },
                      key: "$window",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 30, column: 35 },
                        end: { line: 30, column: 45 },
                      },
                      name: "setTimeout",
                    },
                    computed: false,
                    optional: false,
                  },
                  arguments: [
                    {
                      type: "ArrowFunctionExpression",
                      loc: {
                        start: { line: 30, column: 46 },
                        end: { line: 30, column: 53 },
                      },
                      params: [],
                      body: {
                        type: "Literal",
                        loc: {
                          start: { line: 30, column: 52 },
                          end: { line: 30, column: 53 },
                        },
                        value: 0,
                      },
                      expression: true,
                    },
                    {
                      type: "Literal",
                      loc: {
                        start: { line: 30, column: 55 },
                        end: { line: 30, column: 59 },
                      },
                      value: 1000,
                    },
                  ],
                  optional: false,
                },
              ],
              optional: false,
            },
          },
        ],
      }),
    ),
  );
});
