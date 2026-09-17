import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
// js-framework-benchmark's "partial update": every other row's label grows,
// and each label is a cell of its own. Writing one is a write to that row's
// text, and nothing else: no row is rebuilt, and no other row hears of it.
async function Labels() {
  return cs.create(
    [12, 10, 39, 5],
    {
      version: "0.0.0",
      filePath: "dom-writes/partial-update.test.tsx",
      fileHash: "2tlccuo5yvrz7",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [12, 13, 39, 4],
      statements: [
        {
          kind: "const",
          loc: [13, 5, 16, 9],
          name: {
            kind: "id",
            loc: [13, 11, 13, 15],
            text: "rows",
            bindingKey: "rows$2tlccuo5yvrz7$0",
          },
          initializer: {
            kind: "()",
            loc: [13, 18, 16, 8],
            expression: {
              kind: ".",
              loc: [13, 18, 13, 34],
              expression: {
                kind: "arr",
                loc: [13, 18, 13, 30],
                elements: [
                  {
                    kind: "number",
                    loc: [13, 19, 13, 20],
                    value: 1,
                  },
                  {
                    kind: "number",
                    loc: [13, 22, 13, 23],
                    value: 2,
                  },
                  {
                    kind: "number",
                    loc: [13, 25, 13, 26],
                    value: 3,
                  },
                  {
                    kind: "number",
                    loc: [13, 28, 13, 29],
                    value: 4,
                  },
                ],
              },
              name: "map",
            },
            arguments: [
              {
                kind: "=>",
                loc: [13, 35, 16, 7],
                parameters: [
                  {
                    kind: "param",
                    loc: [13, 36, 13, 46],
                    name: {
                      kind: "id",
                      loc: [13, 36, 13, 38],
                      text: "id",
                      bindingKey: "id$2tlccuo5yvrz7$2",
                    },
                  },
                ],
                body: {
                  kind: "obj",
                  loc: [13, 52, 16, 6],
                  properties: [
                    {
                      kind: ":",
                      loc: [14, 7, 14, 13],
                      name: "id",
                      initializer: {
                        kind: "id",
                        loc: [14, 11, 14, 13],
                        text: "id",
                        bindingKey: "id$2tlccuo5yvrz7$2",
                      },
                    },
                    {
                      kind: ":",
                      loc: [15, 7, 15, 33],
                      name: "label",
                      initializer: {
                        kind: "()",
                        loc: [15, 14, 15, 33],
                        expression: {
                          kind: "splice",
                          loc: [15, 14, 15, 20],
                          key: "$state",
                        },
                        arguments: [
                          {
                            kind: "binop",
                            loc: [15, 21, 15, 32],
                            left: {
                              kind: "string",
                              loc: [15, 21, 15, 27],
                              text: "row ",
                            },
                            operatorToken: "+",
                            right: {
                              kind: "id",
                              loc: [15, 30, 15, 32],
                              text: "id",
                              bindingKey: "id$2tlccuo5yvrz7$2",
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [17, 5, 22, 7],
          name: {
            kind: "id",
            loc: [17, 11, 17, 17],
            text: "update",
            bindingKey: "update$2tlccuo5yvrz7$1",
          },
          initializer: {
            kind: "=>",
            loc: [17, 20, 22, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [17, 26, 22, 6],
              statements: [
                {
                  kind: "for",
                  loc: [18, 7, 21, 8],
                  initializer: {
                    kind: "let",
                    loc: [18, 12, 18, 25],
                    name: {
                      kind: "id",
                      loc: [18, 16, 18, 21],
                      text: "index",
                      bindingKey: "index$2tlccuo5yvrz7$3",
                    },
                    initializer: {
                      kind: "number",
                      loc: [18, 24, 18, 25],
                      value: 0,
                    },
                  },
                  condition: {
                    kind: "binop",
                    loc: [18, 27, 18, 46],
                    left: {
                      kind: "id",
                      loc: [18, 27, 18, 32],
                      text: "index",
                      bindingKey: "index$2tlccuo5yvrz7$3",
                    },
                    operatorToken: "<",
                    right: {
                      kind: ".",
                      loc: [18, 35, 18, 46],
                      expression: {
                        kind: "id",
                        loc: [18, 35, 18, 39],
                        text: "rows",
                        bindingKey: "rows$2tlccuo5yvrz7$0",
                      },
                      name: "length",
                    },
                  },
                  incrementor: {
                    kind: "binop",
                    loc: [18, 48, 18, 65],
                    left: {
                      kind: "id",
                      loc: [18, 48, 18, 53],
                      text: "index",
                      bindingKey: "index$2tlccuo5yvrz7$3",
                    },
                    operatorToken: "=",
                    right: {
                      kind: "binop",
                      loc: [18, 56, 18, 65],
                      left: {
                        kind: "id",
                        loc: [18, 56, 18, 61],
                        text: "index",
                        bindingKey: "index$2tlccuo5yvrz7$3",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "number",
                        loc: [18, 64, 18, 65],
                        value: 2,
                      },
                    },
                  },
                  statement: {
                    kind: "{}",
                    loc: [18, 67, 21, 8],
                    statements: [
                      {
                        kind: "const",
                        loc: [19, 9, 19, 41],
                        name: {
                          kind: "id",
                          loc: [19, 15, 19, 20],
                          text: "label",
                          bindingKey: "label$2tlccuo5yvrz7$4",
                        },
                        initializer: {
                          kind: ".",
                          loc: [19, 23, 19, 40],
                          expression: {
                            kind: "[]",
                            loc: [19, 23, 19, 34],
                            expression: {
                              kind: "id",
                              loc: [19, 23, 19, 27],
                              text: "rows",
                              bindingKey: "rows$2tlccuo5yvrz7$0",
                            },
                            argumentExpression: {
                              kind: "id",
                              loc: [19, 28, 19, 33],
                              text: "index",
                              bindingKey: "index$2tlccuo5yvrz7$3",
                            },
                          },
                          name: "label",
                        },
                      },
                      {
                        kind: "()",
                        loc: [20, 9, 20, 40],
                        expression: {
                          kind: ".",
                          loc: [20, 9, 20, 18],
                          expression: {
                            kind: "id",
                            loc: [20, 9, 20, 14],
                            text: "label",
                            bindingKey: "label$2tlccuo5yvrz7$4",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: "binop",
                            loc: [20, 19, 20, 39],
                            left: {
                              kind: "()",
                              loc: [20, 19, 20, 30],
                              expression: {
                                kind: ".",
                                loc: [20, 19, 20, 28],
                                expression: {
                                  kind: "id",
                                  loc: [20, 19, 20, 24],
                                  text: "label",
                                  bindingKey: "label$2tlccuo5yvrz7$4",
                                },
                                name: "get",
                              },
                              arguments: [],
                            },
                            operatorToken: "+",
                            right: {
                              kind: "string",
                              loc: [20, 33, 20, 39],
                              text: " !!!",
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        {
          kind: "return",
          loc: [23, 5, 38, 7],
          expression: {
            kind: "jsx",
            loc: [24, 7, 37, 13],
            type: {
              kind: "string",
              loc: [24, 8, 24, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [25, 9, 25, 49],
                type: {
                  kind: "string",
                  loc: [25, 10, 25, 16],
                  text: "button",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "id",
                      loc: [25, 26, 25, 32],
                      text: "update",
                      bindingKey: "update$2tlccuo5yvrz7$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [25, 34, 25, 40],
                    text: "update",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [26, 9, 36, 17],
                type: {
                  kind: "string",
                  loc: [26, 10, 26, 15],
                  text: "table",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [27, 11, 35, 19],
                    type: {
                      kind: "string",
                      loc: [27, 12, 27, 17],
                      text: "tbody",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "jsx",
                        loc: [28, 13, 34, 19],
                        type: {
                          kind: "splice",
                          loc: [28, 14, 28, 17],
                          key: "$For",
                        },
                        attributes: [
                          {
                            name: "each",
                            initializer: {
                              kind: "id",
                              loc: [28, 24, 28, 28],
                              text: "rows",
                              bindingKey: "rows$2tlccuo5yvrz7$0",
                            },
                          },
                        ],
                        children: [
                          {
                            kind: "=>",
                            loc: [29, 16, 33, 16],
                            parameters: [
                              {
                                kind: "param",
                                loc: [29, 17, 29, 58],
                                name: {
                                  kind: "id",
                                  loc: [29, 17, 29, 20],
                                  text: "row",
                                  bindingKey: "row$2tlccuo5yvrz7$5",
                                },
                              },
                            ],
                            body: {
                              kind: "jsx",
                              loc: [30, 17, 32, 22],
                              type: {
                                kind: "string",
                                loc: [30, 18, 30, 20],
                                text: "tr",
                              },
                              attributes: [
                                {
                                  name: "id",
                                  initializer: {
                                    kind: "binop",
                                    loc: [30, 25, 30, 40],
                                    left: {
                                      kind: "string",
                                      loc: [30, 25, 30, 31],
                                      text: "row-",
                                    },
                                    operatorToken: "+",
                                    right: {
                                      kind: ".",
                                      loc: [30, 34, 30, 40],
                                      expression: {
                                        kind: "id",
                                        loc: [30, 34, 30, 37],
                                        text: "row",
                                        bindingKey: "row$2tlccuo5yvrz7$5",
                                      },
                                      name: "id",
                                    },
                                  },
                                },
                              ],
                              children: [
                                {
                                  kind: "jsx",
                                  loc: [31, 19, 31, 45],
                                  type: {
                                    kind: "string",
                                    loc: [31, 20, 31, 22],
                                    text: "td",
                                  },
                                  attributes: [],
                                  children: [
                                    {
                                      kind: "()",
                                      loc: [31, 24, 31, 39],
                                      expression: {
                                        kind: ".",
                                        loc: [31, 24, 31, 37],
                                        expression: {
                                          kind: ".",
                                          loc: [31, 24, 31, 33],
                                          expression: {
                                            kind: "id",
                                            loc: [31, 24, 31, 27],
                                            text: "row",
                                            bindingKey: "row$2tlccuo5yvrz7$5",
                                          },
                                          name: "label",
                                        },
                                        name: "get",
                                      },
                                      arguments: [],
                                    },
                                  ],
                                },
                              ],
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  );
}
it("a label written changes that label's text and nothing else", async () => {
  const { container } = await render(_jsx(Labels, {}));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "update" }));
  assert.deepEqual(written(), [
    'text: "row 1" → "row 1 !!!"',
    'text: "row 3" → "row 3 !!!"',
  ]);
});
