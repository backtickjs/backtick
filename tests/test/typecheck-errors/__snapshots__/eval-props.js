import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { bundler } from "@backtickjs/bundler";
import { cs } from "@backtickjs/core";
// Built rather than written out: what a bundle looks like is the bundler's, and
// a fixture that spelled one would pin the format twice. The claim about what
// each takes is still written, because that is what is under test.
async function Row({ count }) {
  return cs.create(
    { start: { line: 14, column: 9 }, end: { line: 14, column: 40 } },
    {
      filePath: "typecheck-errors/eval-props.test.tsx",
      fileHash: "3og7hp7gm9m5d",
      splices: { $count: { value: count, params: [] } },
      captures: [],
    },
    () => ({
      type: "JSXElement",
      loc: { start: { line: 14, column: 12 }, end: { line: 14, column: 39 } },
      openingElement: {
        type: "JSXOpeningElement",
        loc: { start: { line: 14, column: 12 }, end: { line: 14, column: 16 } },
        name: {
          type: "JSXIdentifier",
          loc: {
            start: { line: 14, column: 13 },
            end: { line: 14, column: 15 },
          },
          name: "em",
        },
        attributes: [],
        selfClosing: false,
      },
      children: [
        {
          type: "JSXExpressionContainer",
          loc: {
            start: { line: 14, column: 16 },
            end: { line: 14, column: 34 },
          },
          expression: {
            type: "BinaryExpression",
            loc: {
              start: { line: 14, column: 17 },
              end: { line: 14, column: 33 },
            },
            operator: "+",
            left: {
              type: "Literal",
              loc: {
                start: { line: 14, column: 17 },
                end: { line: 14, column: 24 },
              },
              value: "rows ",
            },
            right: {
              type: "Splice",
              loc: {
                start: { line: 14, column: 27 },
                end: { line: 14, column: 33 },
              },
              key: "$count",
            },
          },
        },
      ],
      closingElement: {
        type: "JSXClosingElement",
        loc: { start: { line: 14, column: 34 }, end: { line: 14, column: 39 } },
        name: {
          type: "JSXIdentifier",
          loc: {
            start: { line: 14, column: 36 },
            end: { line: 14, column: 38 },
          },
          name: "em",
        },
      },
    }),
  );
}
async function Nothing() {
  return cs.create(
    { start: { line: 18, column: 9 }, end: { line: 18, column: 44 } },
    {
      filePath: "typecheck-errors/eval-props.test.tsx",
      fileHash: "3og7hp7gm9m5d",
      splices: {},
      captures: [],
    },
    () => ({
      type: "JSXElement",
      loc: { start: { line: 18, column: 12 }, end: { line: 18, column: 43 } },
      openingElement: {
        type: "JSXOpeningElement",
        loc: { start: { line: 18, column: 12 }, end: { line: 18, column: 16 } },
        name: {
          type: "JSXIdentifier",
          loc: {
            start: { line: 18, column: 13 },
            end: { line: 18, column: 15 },
          },
          name: "em",
        },
        attributes: [],
        selfClosing: false,
      },
      children: [
        {
          type: "JSXExpressionContainer",
          loc: {
            start: { line: 18, column: 16 },
            end: { line: 18, column: 38 },
          },
          expression: {
            type: "Literal",
            loc: {
              start: { line: 18, column: 17 },
              end: { line: 18, column: 37 },
            },
            value: "nothing to hand it",
          },
        },
      ],
      closingElement: {
        type: "JSXClosingElement",
        loc: { start: { line: 18, column: 38 }, end: { line: 18, column: 43 } },
        name: {
          type: "JSXIdentifier",
          loc: {
            start: { line: 18, column: 40 },
            end: { line: 18, column: 42 },
          },
          name: "em",
        },
      },
    }),
  );
}
const rows = await bundler.run(
  cs.create(
    { start: { line: 22, column: 2 }, end: { line: 22, column: 72 } },
    {
      filePath: "typecheck-errors/eval-props.test.tsx",
      fileHash: "3og7hp7gm9m5d",
      splices: {
        $0splice0: {
          value: _jsx(Row, {
            count: cs.create(
              {
                start: { line: 22, column: 50 },
                end: { line: 22, column: 65 },
              },
              {
                filePath: "typecheck-errors/eval-props.test.tsx",
                fileHash: "3og7hp7gm9m5d",
                splices: {},
                captures: ["props$3og7hp7gm9m5d$0"],
              },
              () => ({
                type: "MemberExpression",
                loc: {
                  start: { line: 22, column: 53 },
                  end: { line: 22, column: 64 },
                },
                object: {
                  type: "Identifier",
                  loc: {
                    start: { line: 22, column: 53 },
                    end: { line: 22, column: 58 },
                  },
                  name: "props",
                  key: "props$3og7hp7gm9m5d$0",
                },
                property: {
                  type: "Identifier",
                  loc: {
                    start: { line: 22, column: 59 },
                    end: { line: 22, column: 64 },
                  },
                  name: "count",
                },
                computed: false,
                optional: false,
              }),
            ),
          }),
          params: ["props$3og7hp7gm9m5d$0"],
        },
      },
      captures: [],
    },
    () => ({
      type: "ArrowFunctionExpression",
      loc: { start: { line: 22, column: 5 }, end: { line: 22, column: 71 } },
      params: [
        {
          type: "Identifier",
          loc: {
            start: { line: 22, column: 6 },
            end: { line: 22, column: 11 },
          },
          name: "props",
          key: "props$3og7hp7gm9m5d$0",
        },
      ],
      body: {
        type: "Splice",
        loc: { start: { line: 22, column: 35 }, end: { line: 22, column: 71 } },
        key: "$0splice0",
      },
      expression: true,
    }),
  ),
);
const empty = await bundler.run(_jsx(Nothing, {}));
export default cs.create(
  { start: { line: 27, column: 15 }, end: { line: 59, column: 2 } },
  {
    filePath: "typecheck-errors/eval-props.test.tsx",
    fileHash: "3og7hp7gm9m5d",
    splices: {
      $rows: { value: rows, params: [] },
      $empty: { value: empty, params: [] },
    },
    captures: [],
  },
  () => ({
    type: "BlockStatement",
    loc: { start: { line: 27, column: 18 }, end: { line: 59, column: 1 } },
    body: [
      {
        type: "VariableDeclaration",
        loc: { start: { line: 28, column: 2 }, end: { line: 28, column: 27 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 28, column: 8 },
              end: { line: 28, column: 26 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 28, column: 8 },
                end: { line: 28, column: 12 },
              },
              name: "Rows",
              key: "Rows$3og7hp7gm9m5d$1",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 28, column: 15 },
                end: { line: 28, column: 26 },
              },
              callee: {
                type: "Identifier",
                loc: {
                  start: { line: 28, column: 15 },
                  end: { line: 28, column: 19 },
                },
                name: "eval",
              },
              arguments: [
                {
                  type: "Splice",
                  loc: {
                    start: { line: 28, column: 20 },
                    end: { line: 28, column: 25 },
                  },
                  key: "$rows",
                },
              ],
              optional: false,
            },
          },
        ],
      },
      {
        type: "VariableDeclaration",
        loc: { start: { line: 29, column: 2 }, end: { line: 29, column: 29 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 29, column: 8 },
              end: { line: 29, column: 28 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 29, column: 8 },
                end: { line: 29, column: 13 },
              },
              name: "Empty",
              key: "Empty$3og7hp7gm9m5d$2",
            },
            init: {
              type: "CallExpression",
              loc: {
                start: { line: 29, column: 16 },
                end: { line: 29, column: 28 },
              },
              callee: {
                type: "Identifier",
                loc: {
                  start: { line: 29, column: 16 },
                  end: { line: 29, column: 20 },
                },
                name: "eval",
              },
              arguments: [
                {
                  type: "Splice",
                  loc: {
                    start: { line: 29, column: 21 },
                    end: { line: 29, column: 27 },
                  },
                  key: "$empty",
                },
              ],
              optional: false,
            },
          },
        ],
      },
      {
        type: "VariableDeclaration",
        loc: { start: { line: 33, column: 2 }, end: { line: 33, column: 43 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 33, column: 8 },
              end: { line: 33, column: 42 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 33, column: 8 },
                end: { line: 33, column: 17 },
              },
              name: "wrongType",
              key: "wrongType$3og7hp7gm9m5d$3",
            },
            init: {
              type: "JSXElement",
              loc: {
                start: { line: 33, column: 20 },
                end: { line: 33, column: 42 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 33, column: 20 },
                  end: { line: 33, column: 42 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 33, column: 21 },
                    end: { line: 33, column: 25 },
                  },
                  name: "Rows",
                  key: "Rows$3og7hp7gm9m5d$1",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 33, column: 26 },
                      end: { line: 33, column: 39 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 33, column: 26 },
                        end: { line: 33, column: 31 },
                      },
                      name: "count",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 33, column: 32 },
                        end: { line: 33, column: 39 },
                      },
                      expression: {
                        type: "Literal",
                        loc: {
                          start: { line: 33, column: 33 },
                          end: { line: 33, column: 38 },
                        },
                        value: "one",
                      },
                    },
                  },
                ],
                selfClosing: true,
              },
              children: [],
              closingElement: null,
            },
          },
        ],
      },
      {
        type: "VariableDeclaration",
        loc: { start: { line: 35, column: 2 }, end: { line: 35, column: 40 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 35, column: 8 },
              end: { line: 35, column: 39 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 35, column: 8 },
                end: { line: 35, column: 19 },
              },
              name: "unknownName",
              key: "unknownName$3og7hp7gm9m5d$4",
            },
            init: {
              type: "JSXElement",
              loc: {
                start: { line: 35, column: 22 },
                end: { line: 35, column: 39 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 35, column: 22 },
                  end: { line: 35, column: 39 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 35, column: 23 },
                    end: { line: 35, column: 27 },
                  },
                  name: "Rows",
                  key: "Rows$3og7hp7gm9m5d$1",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 35, column: 28 },
                      end: { line: 35, column: 36 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 35, column: 28 },
                        end: { line: 35, column: 32 },
                      },
                      name: "nope",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 35, column: 33 },
                        end: { line: 35, column: 36 },
                      },
                      expression: {
                        type: "Literal",
                        loc: {
                          start: { line: 35, column: 34 },
                          end: { line: 35, column: 35 },
                        },
                        value: 1,
                      },
                    },
                  },
                ],
                selfClosing: true,
              },
              children: [],
              closingElement: null,
            },
          },
        ],
      },
      {
        type: "VariableDeclaration",
        loc: { start: { line: 37, column: 2 }, end: { line: 37, column: 27 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 37, column: 8 },
              end: { line: 37, column: 26 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 37, column: 8 },
                end: { line: 37, column: 15 },
              },
              name: "missing",
              key: "missing$3og7hp7gm9m5d$5",
            },
            init: {
              type: "JSXElement",
              loc: {
                start: { line: 37, column: 18 },
                end: { line: 37, column: 26 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 37, column: 18 },
                  end: { line: 37, column: 26 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 37, column: 19 },
                    end: { line: 37, column: 23 },
                  },
                  name: "Rows",
                  key: "Rows$3og7hp7gm9m5d$1",
                },
                attributes: [],
                selfClosing: true,
              },
              children: [],
              closingElement: null,
            },
          },
        ],
      },
      {
        type: "VariableDeclaration",
        loc: { start: { line: 41, column: 2 }, end: { line: 41, column: 37 } },
        kind: "const",
        declarations: [
          {
            type: "VariableDeclarator",
            loc: {
              start: { line: 41, column: 8 },
              end: { line: 41, column: 36 },
            },
            id: {
              type: "Identifier",
              loc: {
                start: { line: 41, column: 8 },
                end: { line: 41, column: 14 },
              },
              name: "called",
              key: "called$3og7hp7gm9m5d$6",
            },
            init: {
              type: "JSXElement",
              loc: {
                start: { line: 41, column: 17 },
                end: { line: 41, column: 36 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 41, column: 17 },
                  end: { line: 41, column: 36 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 41, column: 18 },
                    end: { line: 41, column: 23 },
                  },
                  name: "Empty",
                  key: "Empty$3og7hp7gm9m5d$2",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 41, column: 24 },
                      end: { line: 41, column: 33 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 41, column: 24 },
                        end: { line: 41, column: 29 },
                      },
                      name: "count",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 41, column: 30 },
                        end: { line: 41, column: 33 },
                      },
                      expression: {
                        type: "Literal",
                        loc: {
                          start: { line: 41, column: 31 },
                          end: { line: 41, column: 32 },
                        },
                        value: 1,
                      },
                    },
                  },
                ],
                selfClosing: true,
              },
              children: [],
              closingElement: null,
            },
          },
        ],
      },
      {
        type: "ReturnStatement",
        loc: { start: { line: 43, column: 2 }, end: { line: 58, column: 4 } },
        argument: {
          type: "JSXElement",
          loc: {
            start: { line: 44, column: 4 },
            end: { line: 57, column: 10 },
          },
          openingElement: {
            type: "JSXOpeningElement",
            loc: {
              start: { line: 44, column: 4 },
              end: { line: 44, column: 9 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 44, column: 5 },
                end: { line: 44, column: 8 },
              },
              name: "div",
            },
            attributes: [],
            selfClosing: false,
          },
          children: [
            {
              type: "JSXText",
              loc: {
                start: { line: 45, column: 6 },
                end: { line: 45, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 45, column: 6 },
                end: { line: 45, column: 73 },
              },
              expression: {
                type: "JSXEmptyExpression",
                loc: {
                  start: { line: 45, column: 6 },
                  end: { line: 45, column: 73 },
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 46, column: 6 },
                end: { line: 46, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXElement",
              loc: {
                start: { line: 46, column: 6 },
                end: { line: 46, column: 24 },
              },
              openingElement: {
                type: "JSXOpeningElement",
                loc: {
                  start: { line: 46, column: 6 },
                  end: { line: 46, column: 24 },
                },
                name: {
                  type: "JSXIdentifier",
                  loc: {
                    start: { line: 46, column: 7 },
                    end: { line: 46, column: 11 },
                  },
                  name: "Rows",
                  key: "Rows$3og7hp7gm9m5d$1",
                },
                attributes: [
                  {
                    type: "JSXAttribute",
                    loc: {
                      start: { line: 46, column: 12 },
                      end: { line: 46, column: 21 },
                    },
                    name: {
                      type: "JSXIdentifier",
                      loc: {
                        start: { line: 46, column: 12 },
                        end: { line: 46, column: 17 },
                      },
                      name: "count",
                    },
                    value: {
                      type: "JSXExpressionContainer",
                      loc: {
                        start: { line: 46, column: 18 },
                        end: { line: 46, column: 21 },
                      },
                      expression: {
                        type: "Literal",
                        loc: {
                          start: { line: 46, column: 19 },
                          end: { line: 46, column: 20 },
                        },
                        value: 1,
                      },
                    },
                  },
                ],
                selfClosing: true,
              },
              children: [],
              closingElement: null,
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 47, column: 6 },
                end: { line: 47, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 47, column: 6 },
                end: { line: 47, column: 13 },
              },
              expression: {
                type: "Identifier",
                loc: {
                  start: { line: 47, column: 7 },
                  end: { line: 47, column: 12 },
                },
                name: "Empty",
                key: "Empty$3og7hp7gm9m5d$2",
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 48, column: 6 },
                end: { line: 48, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 48, column: 6 },
                end: { line: 48, column: 17 },
              },
              expression: {
                type: "Identifier",
                loc: {
                  start: { line: 48, column: 7 },
                  end: { line: 48, column: 16 },
                },
                name: "wrongType",
                key: "wrongType$3og7hp7gm9m5d$3",
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 49, column: 6 },
                end: { line: 49, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 49, column: 6 },
                end: { line: 49, column: 19 },
              },
              expression: {
                type: "Identifier",
                loc: {
                  start: { line: 49, column: 7 },
                  end: { line: 49, column: 18 },
                },
                name: "unknownName",
                key: "unknownName$3og7hp7gm9m5d$4",
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 50, column: 6 },
                end: { line: 50, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 50, column: 6 },
                end: { line: 50, column: 15 },
              },
              expression: {
                type: "Identifier",
                loc: {
                  start: { line: 50, column: 7 },
                  end: { line: 50, column: 14 },
                },
                name: "missing",
                key: "missing$3og7hp7gm9m5d$5",
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 51, column: 6 },
                end: { line: 51, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 51, column: 6 },
                end: { line: 51, column: 14 },
              },
              expression: {
                type: "Identifier",
                loc: {
                  start: { line: 51, column: 7 },
                  end: { line: 51, column: 13 },
                },
                name: "called",
                key: "called$3og7hp7gm9m5d$6",
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 52, column: 6 },
                end: { line: 52, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 52, column: 6 },
                end: { line: 52, column: 78 },
              },
              expression: {
                type: "JSXEmptyExpression",
                loc: {
                  start: { line: 52, column: 6 },
                  end: { line: 52, column: 78 },
                },
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 53, column: 6 },
                end: { line: 53, column: 6 },
              },
              value: "\n      ",
              raw: "\n      ",
            },
            {
              type: "JSXExpressionContainer",
              loc: {
                start: { line: 53, column: 6 },
                end: { line: 56, column: 7 },
              },
              expression: {
                type: "CallExpression",
                loc: {
                  start: { line: 55, column: 8 },
                  end: { line: 55, column: 18 },
                },
                callee: {
                  type: "Identifier",
                  loc: {
                    start: { line: 55, column: 8 },
                    end: { line: 55, column: 12 },
                  },
                  name: "eval",
                },
                arguments: [
                  {
                    type: "Literal",
                    loc: {
                      start: { line: 55, column: 13 },
                      end: { line: 55, column: 17 },
                    },
                    value: null,
                  },
                ],
                optional: false,
              },
            },
            {
              type: "JSXText",
              loc: {
                start: { line: 57, column: 4 },
                end: { line: 57, column: 4 },
              },
              value: "\n    ",
              raw: "\n    ",
            },
          ],
          closingElement: {
            type: "JSXClosingElement",
            loc: {
              start: { line: 57, column: 4 },
              end: { line: 57, column: 10 },
            },
            name: {
              type: "JSXIdentifier",
              loc: {
                start: { line: 57, column: 6 },
                end: { line: 57, column: 9 },
              },
              name: "div",
            },
          },
        },
      },
    ],
  }),
);
