import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
// js-framework-benchmark's "swap rows": the second row and the second-to-last
// change places. The rows between them stay where they are, so what moves is
// the two rows and nothing else.
async function SwappableRows() {
  return cs.create(
    [12, 10, 34, 5],
    {
      version: "0.0.0",
      filePath: "dom-writes/swap-rows.test.tsx",
      fileHash: "2f4veetc9j0fm",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [12, 13, 34, 4],
      statements: [
        {
          kind: "const",
          loc: [13, 5, 13, 51],
          name: {
            kind: "id",
            loc: [13, 11, 13, 14],
            text: "ids",
            bindingKey: "ids$2f4veetc9j0fm$0",
          },
          initializer: {
            kind: "()",
            loc: [13, 17, 13, 50],
            expression: {
              kind: "splice",
              loc: [13, 17, 13, 23],
              key: "$state",
            },
            arguments: [
              {
                kind: "arr",
                loc: [13, 34, 13, 49],
                elements: [
                  {
                    kind: "number",
                    loc: [13, 35, 13, 36],
                    value: 1,
                  },
                  {
                    kind: "number",
                    loc: [13, 38, 13, 39],
                    value: 2,
                  },
                  {
                    kind: "number",
                    loc: [13, 41, 13, 42],
                    value: 3,
                  },
                  {
                    kind: "number",
                    loc: [13, 44, 13, 45],
                    value: 4,
                  },
                  {
                    kind: "number",
                    loc: [13, 47, 13, 48],
                    value: 5,
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [14, 5, 17, 7],
          name: {
            kind: "id",
            loc: [14, 11, 14, 15],
            text: "swap",
            bindingKey: "swap$2f4veetc9j0fm$1",
          },
          initializer: {
            kind: "=>",
            loc: [14, 18, 17, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [14, 24, 17, 6],
              statements: [
                {
                  kind: "const",
                  loc: [15, 7, 15, 30],
                  name: {
                    kind: "id",
                    loc: [15, 13, 15, 17],
                    text: "held",
                    bindingKey: "held$2f4veetc9j0fm$2",
                  },
                  initializer: {
                    kind: "()",
                    loc: [15, 20, 15, 29],
                    expression: {
                      kind: ".",
                      loc: [15, 20, 15, 27],
                      expression: {
                        kind: "id",
                        loc: [15, 20, 15, 23],
                        text: "ids",
                        bindingKey: "ids$2f4veetc9j0fm$0",
                      },
                      name: "get",
                    },
                    arguments: [],
                  },
                },
                {
                  kind: "()",
                  loc: [16, 7, 16, 54],
                  expression: {
                    kind: ".",
                    loc: [16, 7, 16, 14],
                    expression: {
                      kind: "id",
                      loc: [16, 7, 16, 10],
                      text: "ids",
                      bindingKey: "ids$2f4veetc9j0fm$0",
                    },
                    name: "set",
                  },
                  arguments: [
                    {
                      kind: "()",
                      loc: [16, 15, 16, 53],
                      expression: {
                        kind: ".",
                        loc: [16, 15, 16, 41],
                        expression: {
                          kind: "()",
                          loc: [16, 15, 16, 36],
                          expression: {
                            kind: ".",
                            loc: [16, 15, 16, 24],
                            expression: {
                              kind: "id",
                              loc: [16, 15, 16, 19],
                              text: "held",
                              bindingKey: "held$2f4veetc9j0fm$2",
                            },
                            name: "with",
                          },
                          arguments: [
                            {
                              kind: "number",
                              loc: [16, 25, 16, 26],
                              value: 1,
                            },
                            {
                              kind: "[]",
                              loc: [16, 28, 16, 35],
                              expression: {
                                kind: "id",
                                loc: [16, 28, 16, 32],
                                text: "held",
                                bindingKey: "held$2f4veetc9j0fm$2",
                              },
                              argumentExpression: {
                                kind: "number",
                                loc: [16, 33, 16, 34],
                                value: 3,
                              },
                            },
                          ],
                        },
                        name: "with",
                      },
                      arguments: [
                        {
                          kind: "number",
                          loc: [16, 42, 16, 43],
                          value: 3,
                        },
                        {
                          kind: "[]",
                          loc: [16, 45, 16, 52],
                          expression: {
                            kind: "id",
                            loc: [16, 45, 16, 49],
                            text: "held",
                            bindingKey: "held$2f4veetc9j0fm$2",
                          },
                          argumentExpression: {
                            kind: "number",
                            loc: [16, 50, 16, 51],
                            value: 1,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          kind: "return",
          loc: [18, 5, 33, 7],
          expression: {
            kind: "jsx",
            loc: [19, 7, 32, 13],
            type: {
              kind: "string",
              loc: [19, 8, 19, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [20, 9, 20, 45],
                type: {
                  kind: "string",
                  loc: [20, 10, 20, 16],
                  text: "button",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "id",
                      loc: [20, 26, 20, 30],
                      text: "swap",
                      bindingKey: "swap$2f4veetc9j0fm$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [20, 32, 20, 36],
                    text: "swap",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [21, 9, 31, 17],
                type: {
                  kind: "string",
                  loc: [21, 10, 21, 15],
                  text: "table",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [22, 11, 30, 19],
                    type: {
                      kind: "string",
                      loc: [22, 12, 22, 17],
                      text: "tbody",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "jsx",
                        loc: [23, 13, 29, 19],
                        type: {
                          kind: "splice",
                          loc: [23, 14, 23, 17],
                          key: "$For",
                        },
                        attributes: [
                          {
                            name: "each",
                            initializer: {
                              kind: "()",
                              loc: [23, 24, 23, 33],
                              expression: {
                                kind: ".",
                                loc: [23, 24, 23, 31],
                                expression: {
                                  kind: "id",
                                  loc: [23, 24, 23, 27],
                                  text: "ids",
                                  bindingKey: "ids$2f4veetc9j0fm$0",
                                },
                                name: "get",
                              },
                              arguments: [],
                            },
                          },
                        ],
                        children: [
                          {
                            kind: "=>",
                            loc: [24, 16, 28, 16],
                            parameters: [
                              {
                                kind: "param",
                                loc: [24, 17, 24, 27],
                                name: {
                                  kind: "id",
                                  loc: [24, 17, 24, 19],
                                  text: "id",
                                  bindingKey: "id$2f4veetc9j0fm$3",
                                },
                              },
                            ],
                            body: {
                              kind: "jsx",
                              loc: [25, 17, 27, 22],
                              type: {
                                kind: "string",
                                loc: [25, 18, 25, 20],
                                text: "tr",
                              },
                              attributes: [
                                {
                                  name: "id",
                                  initializer: {
                                    kind: "binop",
                                    loc: [25, 25, 25, 36],
                                    left: {
                                      kind: "string",
                                      loc: [25, 25, 25, 31],
                                      text: "row-",
                                    },
                                    operatorToken: "+",
                                    right: {
                                      kind: "id",
                                      loc: [25, 34, 25, 36],
                                      text: "id",
                                      bindingKey: "id$2f4veetc9j0fm$3",
                                    },
                                  },
                                },
                              ],
                              children: [
                                {
                                  kind: "jsx",
                                  loc: [26, 19, 26, 41],
                                  type: {
                                    kind: "string",
                                    loc: [26, 20, 26, 22],
                                    text: "td",
                                  },
                                  attributes: [],
                                  children: [
                                    {
                                      kind: "binop",
                                      loc: [26, 24, 26, 35],
                                      left: {
                                        kind: "string",
                                        loc: [26, 24, 26, 30],
                                        text: "row ",
                                      },
                                      operatorToken: "+",
                                      right: {
                                        kind: "id",
                                        loc: [26, 33, 26, 35],
                                        text: "id",
                                        bindingKey: "id$2f4veetc9j0fm$3",
                                      },
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
it("a swap moves the two rows it swapped", async () => {
  const { container } = await render(_jsx(SwappableRows, {}));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "swap" }));
  // Each move is the row leaving where it was and arriving where it goes.
  assert.deepEqual(written(), [
    "tbody − tr#row-4",
    "tbody + tr#row-4 before tr#row-3",
    "tbody − tr#row-2",
    "tbody + tr#row-2 before tr#row-5",
  ]);
});
