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
    [12, 10, 33, 5],
    {
      version: "0.0.0",
      filePath: "dom-writes/swap-rows.test.tsx",
      fileHash: "3sne8kxm3xiwr",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [12, 13, 33, 4],
      statements: [
        {
          kind: "const",
          loc: [13, 5, 13, 51],
          name: {
            kind: "id",
            loc: [13, 11, 13, 14],
            text: "ids",
            bindingKey: "ids$3sne8kxm3xiwr$0",
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
          loc: [14, 5, 16, 7],
          name: {
            kind: "id",
            loc: [14, 11, 14, 15],
            text: "swap",
            bindingKey: "swap$3sne8kxm3xiwr$1",
          },
          initializer: {
            kind: "=>",
            loc: [14, 18, 16, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [14, 24, 16, 6],
              statements: [
                {
                  kind: "()",
                  loc: [15, 7, 15, 67],
                  expression: {
                    kind: ".",
                    loc: [15, 7, 15, 17],
                    expression: {
                      kind: "id",
                      loc: [15, 7, 15, 10],
                      text: "ids",
                      bindingKey: "ids$3sne8kxm3xiwr$0",
                    },
                    name: "update",
                  },
                  arguments: [
                    {
                      kind: "=>",
                      loc: [15, 18, 15, 66],
                      parameters: [
                        {
                          kind: "param",
                          loc: [15, 19, 15, 23],
                          name: {
                            kind: "id",
                            loc: [15, 19, 15, 23],
                            text: "held",
                            bindingKey: "held$3sne8kxm3xiwr$2",
                          },
                        },
                      ],
                      body: {
                        kind: "()",
                        loc: [15, 28, 15, 66],
                        expression: {
                          kind: ".",
                          loc: [15, 28, 15, 54],
                          expression: {
                            kind: "()",
                            loc: [15, 28, 15, 49],
                            expression: {
                              kind: ".",
                              loc: [15, 28, 15, 37],
                              expression: {
                                kind: "id",
                                loc: [15, 28, 15, 32],
                                text: "held",
                                bindingKey: "held$3sne8kxm3xiwr$2",
                              },
                              name: "with",
                            },
                            arguments: [
                              {
                                kind: "number",
                                loc: [15, 38, 15, 39],
                                value: 1,
                              },
                              {
                                kind: "[]",
                                loc: [15, 41, 15, 48],
                                expression: {
                                  kind: "id",
                                  loc: [15, 41, 15, 45],
                                  text: "held",
                                  bindingKey: "held$3sne8kxm3xiwr$2",
                                },
                                argumentExpression: {
                                  kind: "number",
                                  loc: [15, 46, 15, 47],
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
                            loc: [15, 55, 15, 56],
                            value: 3,
                          },
                          {
                            kind: "[]",
                            loc: [15, 58, 15, 65],
                            expression: {
                              kind: "id",
                              loc: [15, 58, 15, 62],
                              text: "held",
                              bindingKey: "held$3sne8kxm3xiwr$2",
                            },
                            argumentExpression: {
                              kind: "number",
                              loc: [15, 63, 15, 64],
                              value: 1,
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          kind: "return",
          loc: [17, 5, 32, 7],
          expression: {
            kind: "jsx",
            loc: [18, 7, 31, 13],
            type: {
              kind: "string",
              loc: [18, 8, 18, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [19, 9, 19, 45],
                type: {
                  kind: "string",
                  loc: [19, 10, 19, 16],
                  text: "button",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "id",
                      loc: [19, 26, 19, 30],
                      text: "swap",
                      bindingKey: "swap$3sne8kxm3xiwr$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [19, 32, 19, 36],
                    text: "swap",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [20, 9, 30, 17],
                type: {
                  kind: "string",
                  loc: [20, 10, 20, 15],
                  text: "table",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [21, 11, 29, 19],
                    type: {
                      kind: "string",
                      loc: [21, 12, 21, 17],
                      text: "tbody",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "jsx",
                        loc: [22, 13, 28, 19],
                        type: {
                          kind: "splice",
                          loc: [22, 14, 22, 17],
                          key: "$For",
                        },
                        attributes: [
                          {
                            name: "each",
                            initializer: {
                              kind: "()",
                              loc: [22, 24, 22, 34],
                              expression: {
                                kind: ".",
                                loc: [22, 24, 22, 32],
                                expression: {
                                  kind: "id",
                                  loc: [22, 24, 22, 27],
                                  text: "ids",
                                  bindingKey: "ids$3sne8kxm3xiwr$0",
                                },
                                name: "read",
                              },
                              arguments: [],
                            },
                          },
                        ],
                        children: [
                          {
                            kind: "=>",
                            loc: [23, 16, 27, 16],
                            parameters: [
                              {
                                kind: "param",
                                loc: [23, 17, 23, 27],
                                name: {
                                  kind: "id",
                                  loc: [23, 17, 23, 19],
                                  text: "id",
                                  bindingKey: "id$3sne8kxm3xiwr$3",
                                },
                              },
                            ],
                            body: {
                              kind: "jsx",
                              loc: [24, 17, 26, 22],
                              type: {
                                kind: "string",
                                loc: [24, 18, 24, 20],
                                text: "tr",
                              },
                              attributes: [
                                {
                                  name: "id",
                                  initializer: {
                                    kind: "binop",
                                    loc: [24, 25, 24, 36],
                                    left: {
                                      kind: "string",
                                      loc: [24, 25, 24, 31],
                                      text: "row-",
                                    },
                                    operatorToken: "+",
                                    right: {
                                      kind: "id",
                                      loc: [24, 34, 24, 36],
                                      text: "id",
                                      bindingKey: "id$3sne8kxm3xiwr$3",
                                    },
                                  },
                                },
                              ],
                              children: [
                                {
                                  kind: "jsx",
                                  loc: [25, 19, 25, 41],
                                  type: {
                                    kind: "string",
                                    loc: [25, 20, 25, 22],
                                    text: "td",
                                  },
                                  attributes: [],
                                  children: [
                                    {
                                      kind: "binop",
                                      loc: [25, 24, 25, 35],
                                      left: {
                                        kind: "string",
                                        loc: [25, 24, 25, 30],
                                        text: "row ",
                                      },
                                      operatorToken: "+",
                                      right: {
                                        kind: "id",
                                        loc: [25, 33, 25, 35],
                                        text: "id",
                                        bindingKey: "id$3sne8kxm3xiwr$3",
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
