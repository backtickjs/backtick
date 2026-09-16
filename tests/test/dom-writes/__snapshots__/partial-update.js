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
    [12, 10, 38, 5],
    {
      version: "0.0.0",
      filePath: "dom-writes/partial-update.test.tsx",
      fileHash: "prx1kiebqh13",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [12, 13, 38, 4],
      statements: [
        {
          kind: "const",
          loc: [13, 5, 16, 9],
          name: {
            kind: "id",
            loc: [13, 11, 13, 15],
            text: "rows",
            bindingKey: "rows$prx1kiebqh13$0",
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
                      bindingKey: "id$prx1kiebqh13$2",
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
                        bindingKey: "id$prx1kiebqh13$2",
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
                              bindingKey: "id$prx1kiebqh13$2",
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
          loc: [17, 5, 21, 7],
          name: {
            kind: "id",
            loc: [17, 11, 17, 17],
            text: "update",
            bindingKey: "update$prx1kiebqh13$1",
          },
          initializer: {
            kind: "=>",
            loc: [17, 20, 21, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [17, 26, 21, 6],
              statements: [
                {
                  kind: "for",
                  loc: [18, 7, 20, 8],
                  initializer: {
                    kind: "let",
                    loc: [18, 12, 18, 25],
                    name: {
                      kind: "id",
                      loc: [18, 16, 18, 21],
                      text: "index",
                      bindingKey: "index$prx1kiebqh13$3",
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
                      bindingKey: "index$prx1kiebqh13$3",
                    },
                    operatorToken: "<",
                    right: {
                      kind: ".",
                      loc: [18, 35, 18, 46],
                      expression: {
                        kind: "id",
                        loc: [18, 35, 18, 39],
                        text: "rows",
                        bindingKey: "rows$prx1kiebqh13$0",
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
                      bindingKey: "index$prx1kiebqh13$3",
                    },
                    operatorToken: "=",
                    right: {
                      kind: "binop",
                      loc: [18, 56, 18, 65],
                      left: {
                        kind: "id",
                        loc: [18, 56, 18, 61],
                        text: "index",
                        bindingKey: "index$prx1kiebqh13$3",
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
                    loc: [18, 67, 20, 8],
                    statements: [
                      {
                        kind: "()",
                        loc: [19, 9, 19, 68],
                        expression: {
                          kind: ".",
                          loc: [19, 9, 19, 33],
                          expression: {
                            kind: ".",
                            loc: [19, 9, 19, 26],
                            expression: {
                              kind: "[]",
                              loc: [19, 9, 19, 20],
                              expression: {
                                kind: "id",
                                loc: [19, 9, 19, 13],
                                text: "rows",
                                bindingKey: "rows$prx1kiebqh13$0",
                              },
                              argumentExpression: {
                                kind: "id",
                                loc: [19, 14, 19, 19],
                                text: "index",
                                bindingKey: "index$prx1kiebqh13$3",
                              },
                            },
                            name: "label",
                          },
                          name: "update",
                        },
                        arguments: [
                          {
                            kind: "=>",
                            loc: [19, 34, 19, 67],
                            parameters: [
                              {
                                kind: "param",
                                loc: [19, 35, 19, 48],
                                name: {
                                  kind: "id",
                                  loc: [19, 35, 19, 40],
                                  text: "label",
                                  bindingKey: "label$prx1kiebqh13$4",
                                },
                              },
                            ],
                            body: {
                              kind: "binop",
                              loc: [19, 53, 19, 67],
                              left: {
                                kind: "id",
                                loc: [19, 53, 19, 58],
                                text: "label",
                                bindingKey: "label$prx1kiebqh13$4",
                              },
                              operatorToken: "+",
                              right: {
                                kind: "string",
                                loc: [19, 61, 19, 67],
                                text: " !!!",
                              },
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
          loc: [22, 5, 37, 7],
          expression: {
            kind: "jsx",
            loc: [23, 7, 36, 13],
            type: {
              kind: "string",
              loc: [23, 8, 23, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [24, 9, 24, 49],
                type: {
                  kind: "string",
                  loc: [24, 10, 24, 16],
                  text: "button",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "id",
                      loc: [24, 26, 24, 32],
                      text: "update",
                      bindingKey: "update$prx1kiebqh13$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [24, 34, 24, 40],
                    text: "update",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [25, 9, 35, 17],
                type: {
                  kind: "string",
                  loc: [25, 10, 25, 15],
                  text: "table",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [26, 11, 34, 19],
                    type: {
                      kind: "string",
                      loc: [26, 12, 26, 17],
                      text: "tbody",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "jsx",
                        loc: [27, 13, 33, 19],
                        type: {
                          kind: "splice",
                          loc: [27, 14, 27, 17],
                          key: "$For",
                        },
                        attributes: [
                          {
                            name: "each",
                            initializer: {
                              kind: "id",
                              loc: [27, 24, 27, 28],
                              text: "rows",
                              bindingKey: "rows$prx1kiebqh13$0",
                            },
                          },
                        ],
                        children: [
                          {
                            kind: "=>",
                            loc: [28, 16, 32, 16],
                            parameters: [
                              {
                                kind: "param",
                                loc: [28, 17, 28, 58],
                                name: {
                                  kind: "id",
                                  loc: [28, 17, 28, 20],
                                  text: "row",
                                  bindingKey: "row$prx1kiebqh13$5",
                                },
                              },
                            ],
                            body: {
                              kind: "jsx",
                              loc: [29, 17, 31, 22],
                              type: {
                                kind: "string",
                                loc: [29, 18, 29, 20],
                                text: "tr",
                              },
                              attributes: [
                                {
                                  name: "id",
                                  initializer: {
                                    kind: "binop",
                                    loc: [29, 25, 29, 40],
                                    left: {
                                      kind: "string",
                                      loc: [29, 25, 29, 31],
                                      text: "row-",
                                    },
                                    operatorToken: "+",
                                    right: {
                                      kind: ".",
                                      loc: [29, 34, 29, 40],
                                      expression: {
                                        kind: "id",
                                        loc: [29, 34, 29, 37],
                                        text: "row",
                                        bindingKey: "row$prx1kiebqh13$5",
                                      },
                                      name: "id",
                                    },
                                  },
                                },
                              ],
                              children: [
                                {
                                  kind: "jsx",
                                  loc: [30, 19, 30, 46],
                                  type: {
                                    kind: "string",
                                    loc: [30, 20, 30, 22],
                                    text: "td",
                                  },
                                  attributes: [],
                                  children: [
                                    {
                                      kind: "()",
                                      loc: [30, 24, 30, 40],
                                      expression: {
                                        kind: ".",
                                        loc: [30, 24, 30, 38],
                                        expression: {
                                          kind: ".",
                                          loc: [30, 24, 30, 33],
                                          expression: {
                                            kind: "id",
                                            loc: [30, 24, 30, 27],
                                            text: "row",
                                            bindingKey: "row$prx1kiebqh13$5",
                                          },
                                          name: "label",
                                        },
                                        name: "read",
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
