import { it } from "node:test";
import { cs } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// Narrowing must survive the boolean-condition checks: the tested condition
// stays in place in the virtual code (its check reads a sequenced
// duplicate), so `text !== null` still narrows `text` in the branch it
// guards and from a `&&` left operand into the right. The conditions cover
// each checked shape: a bare boolean identifier, a braced splice (whose
// duplicate re-renders the host expression), and comparison/`&&` forms that
// are boolean by construction and need no check.
const flags = {
  strict: cs.create(
    { start: { line: 12, column: 24 }, end: { line: 12, column: 32 } },
    {
      version: "0.0.0",
      filePath: "expressions/condition-narrowing.test.tsx",
      fileHash: "2dyt2z4zc0eux",
      splices: {},
      captures: [],
    },
    () => ({
      type: "Literal",
      loc: { start: { line: 12, column: 27 }, end: { line: 12, column: 31 } },
      value: true,
    }),
  ),
};
const label = cs.create(
  { start: { line: 14, column: 71 }, end: { line: 25, column: 2 } },
  {
    version: "0.0.0",
    filePath: "expressions/condition-narrowing.test.tsx",
    fileHash: "2dyt2z4zc0eux",
    splices: { $0splice0: { value: flags.strict, params: [] } },
    captures: [],
  },
  () => ({
    type: "ArrowFunctionExpression",
    loc: { start: { line: 14, column: 74 }, end: { line: 25, column: 1 } },
    params: [
      {
        type: "Identifier",
        loc: { start: { line: 15, column: 2 }, end: { line: 15, column: 6 } },
        name: "text",
        bindingKey: "text$2dyt2z4zc0eux$0",
      },
      {
        type: "Identifier",
        loc: { start: { line: 16, column: 2 }, end: { line: 16, column: 7 } },
        name: "upper",
        bindingKey: "upper$2dyt2z4zc0eux$1",
      },
    ],
    body: {
      type: "BlockStatement",
      loc: { start: { line: 17, column: 5 }, end: { line: 25, column: 1 } },
      body: [
        {
          type: "IfStatement",
          loc: { start: { line: 18, column: 2 }, end: { line: 20, column: 3 } },
          test: {
            type: "LogicalExpression",
            loc: {
              start: { line: 18, column: 6 },
              end: { line: 18, column: 28 },
            },
            operator: "&&",
            left: {
              type: "Identifier",
              loc: {
                start: { line: 18, column: 6 },
                end: { line: 18, column: 11 },
              },
              name: "upper",
              bindingKey: "upper$2dyt2z4zc0eux$1",
            },
            right: {
              type: "BinaryExpression",
              loc: {
                start: { line: 18, column: 15 },
                end: { line: 18, column: 28 },
              },
              operator: "!==",
              left: {
                type: "Identifier",
                loc: {
                  start: { line: 18, column: 15 },
                  end: { line: 18, column: 19 },
                },
                name: "text",
                bindingKey: "text$2dyt2z4zc0eux$0",
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 18, column: 24 },
                  end: { line: 18, column: 28 },
                },
                value: null,
              },
            },
          },
          consequent: {
            type: "BlockStatement",
            loc: {
              start: { line: 18, column: 30 },
              end: { line: 20, column: 3 },
            },
            body: [
              {
                type: "ReturnStatement",
                loc: {
                  start: { line: 19, column: 4 },
                  end: { line: 19, column: 30 },
                },
                argument: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 19, column: 11 },
                    end: { line: 19, column: 29 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 19, column: 11 },
                      end: { line: 19, column: 27 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 19, column: 11 },
                        end: { line: 19, column: 15 },
                      },
                      name: "text",
                      bindingKey: "text$2dyt2z4zc0eux$0",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 19, column: 16 },
                        end: { line: 19, column: 27 },
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
          loc: { start: { line: 21, column: 2 }, end: { line: 23, column: 3 } },
          test: {
            type: "LogicalExpression",
            loc: {
              start: { line: 21, column: 6 },
              end: { line: 21, column: 64 },
            },
            operator: "&&",
            left: {
              type: "LogicalExpression",
              loc: {
                start: { line: 21, column: 6 },
                end: { line: 21, column: 38 },
              },
              operator: "&&",
              left: {
                type: "Splice",
                loc: {
                  start: { line: 21, column: 6 },
                  end: { line: 21, column: 21 },
                },
                key: "$0splice0",
              },
              right: {
                type: "BinaryExpression",
                loc: {
                  start: { line: 21, column: 25 },
                  end: { line: 21, column: 38 },
                },
                operator: "!==",
                left: {
                  type: "Identifier",
                  loc: {
                    start: { line: 21, column: 25 },
                    end: { line: 21, column: 29 },
                  },
                  name: "text",
                  bindingKey: "text$2dyt2z4zc0eux$0",
                },
                right: {
                  type: "Literal",
                  loc: {
                    start: { line: 21, column: 34 },
                    end: { line: 21, column: 38 },
                  },
                  value: null,
                },
              },
            },
            right: {
              type: "BinaryExpression",
              loc: {
                start: { line: 21, column: 42 },
                end: { line: 21, column: 64 },
              },
              operator: "===",
              left: {
                type: "CallExpression",
                loc: {
                  start: { line: 21, column: 42 },
                  end: { line: 21, column: 56 },
                },
                callee: {
                  type: "MemberExpression",
                  loc: {
                    start: { line: 21, column: 42 },
                    end: { line: 21, column: 53 },
                  },
                  object: {
                    type: "Identifier",
                    loc: {
                      start: { line: 21, column: 42 },
                      end: { line: 21, column: 46 },
                    },
                    name: "text",
                    bindingKey: "text$2dyt2z4zc0eux$0",
                  },
                  property: {
                    type: "Identifier",
                    loc: {
                      start: { line: 21, column: 47 },
                      end: { line: 21, column: 53 },
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
                      start: { line: 21, column: 54 },
                      end: { line: 21, column: 55 },
                    },
                    value: 0,
                  },
                ],
                optional: false,
              },
              right: {
                type: "Literal",
                loc: {
                  start: { line: 21, column: 61 },
                  end: { line: 21, column: 64 },
                },
                value: "!",
              },
            },
          },
          consequent: {
            type: "BlockStatement",
            loc: {
              start: { line: 21, column: 66 },
              end: { line: 23, column: 3 },
            },
            body: [
              {
                type: "ReturnStatement",
                loc: {
                  start: { line: 22, column: 4 },
                  end: { line: 22, column: 28 },
                },
                argument: {
                  type: "CallExpression",
                  loc: {
                    start: { line: 22, column: 11 },
                    end: { line: 22, column: 27 },
                  },
                  callee: {
                    type: "MemberExpression",
                    loc: {
                      start: { line: 22, column: 11 },
                      end: { line: 22, column: 22 },
                    },
                    object: {
                      type: "Identifier",
                      loc: {
                        start: { line: 22, column: 11 },
                        end: { line: 22, column: 15 },
                      },
                      name: "text",
                      bindingKey: "text$2dyt2z4zc0eux$0",
                    },
                    property: {
                      type: "Identifier",
                      loc: {
                        start: { line: 22, column: 16 },
                        end: { line: 22, column: 22 },
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
                        start: { line: 22, column: 23 },
                        end: { line: 22, column: 26 },
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
            start: { line: 24, column: 2 },
            end: { line: 24, column: 16 },
          },
          argument: {
            type: "Literal",
            loc: {
              start: { line: 24, column: 9 },
              end: { line: 24, column: 15 },
            },
            value: "none",
          },
        },
      ],
    },
    expression: false,
  }),
);
it("conditionNarrowing", async (t) => {
  await snapshotCase(
    t,
    "conditionNarrowing",
    cs.create(
      { start: { line: 31, column: 4 }, end: { line: 36, column: 7 } },
      {
        version: "0.0.0",
        filePath: "expressions/condition-narrowing.test.tsx",
        fileHash: "2dyt2z4zc0eux",
        splices: { $label: { value: label, params: [] } },
        captures: [],
      },
      () => ({
        type: "ObjectExpression",
        loc: { start: { line: 31, column: 8 }, end: { line: 36, column: 5 } },
        properties: [
          {
            type: "Property",
            loc: {
              start: { line: 32, column: 6 },
              end: { line: 32, column: 33 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 32, column: 6 },
                end: { line: 32, column: 13 },
              },
              name: "missing",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 32, column: 15 },
                end: { line: 32, column: 33 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 32, column: 15 },
                  end: { line: 32, column: 21 },
                },
                key: "$label",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 32, column: 22 },
                    end: { line: 32, column: 26 },
                  },
                  value: null,
                },
                {
                  type: "Literal",
                  loc: {
                    start: { line: 32, column: 28 },
                    end: { line: 32, column: 32 },
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
              start: { line: 33, column: 6 },
              end: { line: 33, column: 31 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 33, column: 6 },
                end: { line: 33, column: 10 },
              },
              name: "loud",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 33, column: 12 },
                end: { line: 33, column: 31 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 33, column: 12 },
                  end: { line: 33, column: 18 },
                },
                key: "$label",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 33, column: 19 },
                    end: { line: 33, column: 24 },
                  },
                  value: "!hi",
                },
                {
                  type: "Literal",
                  loc: {
                    start: { line: 33, column: 26 },
                    end: { line: 33, column: 30 },
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
              start: { line: 34, column: 6 },
              end: { line: 34, column: 33 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 34, column: 6 },
                end: { line: 34, column: 11 },
              },
              name: "quiet",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 34, column: 13 },
                end: { line: 34, column: 33 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 34, column: 13 },
                  end: { line: 34, column: 19 },
                },
                key: "$label",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 34, column: 20 },
                    end: { line: 34, column: 25 },
                  },
                  value: "!hi",
                },
                {
                  type: "Literal",
                  loc: {
                    start: { line: 34, column: 27 },
                    end: { line: 34, column: 32 },
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
              start: { line: 35, column: 6 },
              end: { line: 35, column: 32 },
            },
            key: {
              type: "Identifier",
              loc: {
                start: { line: 35, column: 6 },
                end: { line: 35, column: 11 },
              },
              name: "plain",
            },
            value: {
              type: "CallExpression",
              loc: {
                start: { line: 35, column: 13 },
                end: { line: 35, column: 32 },
              },
              callee: {
                type: "Splice",
                loc: {
                  start: { line: 35, column: 13 },
                  end: { line: 35, column: 19 },
                },
                key: "$label",
              },
              arguments: [
                {
                  type: "Literal",
                  loc: {
                    start: { line: 35, column: 20 },
                    end: { line: 35, column: 24 },
                  },
                  value: "zz",
                },
                {
                  type: "Literal",
                  loc: {
                    start: { line: 35, column: 26 },
                    end: { line: 35, column: 31 },
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
