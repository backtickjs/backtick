import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { watchWrites } from "./writes.ts";
// js-framework-benchmark's "remove row": one row in the middle goes. The rows
// after it close up by staying where they are, so what is written is the one
// removal.
async function RemovableRows() {
  return cs.create(
    [12, 10, 35, 5],
    {
      version: "0.0.0",
      filePath: "dom-writes/remove-row.test.tsx",
      fileHash: "1dh0kxf6cd5v6",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [12, 13, 35, 4],
      statements: [
        {
          kind: "const",
          loc: [13, 5, 13, 51],
          name: {
            kind: "id",
            loc: [13, 11, 13, 14],
            text: "ids",
            bindingKey: "ids$1dh0kxf6cd5v6$0",
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
          kind: "return",
          loc: [14, 5, 34, 7],
          expression: {
            kind: "jsx",
            loc: [15, 7, 33, 15],
            type: {
              kind: "string",
              loc: [15, 8, 15, 13],
              text: "table",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [16, 9, 32, 17],
                type: {
                  kind: "string",
                  loc: [16, 10, 16, 15],
                  text: "tbody",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [17, 11, 31, 17],
                    type: {
                      kind: "splice",
                      loc: [17, 12, 17, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: "()",
                          loc: [17, 22, 17, 31],
                          expression: {
                            kind: ".",
                            loc: [17, 22, 17, 29],
                            expression: {
                              kind: "id",
                              loc: [17, 22, 17, 25],
                              text: "ids",
                              bindingKey: "ids$1dh0kxf6cd5v6$0",
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
                        loc: [18, 14, 30, 14],
                        parameters: [
                          {
                            kind: "param",
                            loc: [18, 15, 18, 25],
                            name: {
                              kind: "id",
                              loc: [18, 15, 18, 17],
                              text: "id",
                              bindingKey: "id$1dh0kxf6cd5v6$1",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [19, 15, 29, 20],
                          type: {
                            kind: "string",
                            loc: [19, 16, 19, 18],
                            text: "tr",
                          },
                          attributes: [
                            {
                              name: "id",
                              initializer: {
                                kind: "binop",
                                loc: [19, 23, 19, 34],
                                left: {
                                  kind: "string",
                                  loc: [19, 23, 19, 29],
                                  text: "row-",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "id",
                                  loc: [19, 32, 19, 34],
                                  text: "id",
                                  bindingKey: "id$1dh0kxf6cd5v6$1",
                                },
                              },
                            },
                          ],
                          children: [
                            {
                              kind: "jsx",
                              loc: [20, 17, 28, 22],
                              type: {
                                kind: "string",
                                loc: [20, 18, 20, 20],
                                text: "td",
                              },
                              attributes: [],
                              children: [
                                {
                                  kind: "jsx",
                                  loc: [21, 19, 27, 28],
                                  type: {
                                    kind: "string",
                                    loc: [21, 20, 21, 26],
                                    text: "button",
                                  },
                                  attributes: [
                                    {
                                      name: "onclick",
                                      initializer: {
                                        kind: "=>",
                                        loc: [22, 30, 23, 71],
                                        parameters: [],
                                        body: {
                                          kind: "()",
                                          loc: [23, 23, 23, 71],
                                          expression: {
                                            kind: ".",
                                            loc: [23, 23, 23, 30],
                                            expression: {
                                              kind: "id",
                                              loc: [23, 23, 23, 26],
                                              text: "ids",
                                              bindingKey: "ids$1dh0kxf6cd5v6$0",
                                            },
                                            name: "set",
                                          },
                                          arguments: [
                                            {
                                              kind: "()",
                                              loc: [23, 31, 23, 70],
                                              expression: {
                                                kind: ".",
                                                loc: [23, 31, 23, 47],
                                                expression: {
                                                  kind: "()",
                                                  loc: [23, 31, 23, 40],
                                                  expression: {
                                                    kind: ".",
                                                    loc: [23, 31, 23, 38],
                                                    expression: {
                                                      kind: "id",
                                                      loc: [23, 31, 23, 34],
                                                      text: "ids",
                                                      bindingKey:
                                                        "ids$1dh0kxf6cd5v6$0",
                                                    },
                                                    name: "get",
                                                  },
                                                  arguments: [],
                                                },
                                                name: "filter",
                                              },
                                              arguments: [
                                                {
                                                  kind: "=>",
                                                  loc: [23, 48, 23, 69],
                                                  parameters: [
                                                    {
                                                      kind: "param",
                                                      loc: [23, 49, 23, 53],
                                                      name: {
                                                        kind: "id",
                                                        loc: [23, 49, 23, 53],
                                                        text: "each",
                                                        bindingKey:
                                                          "each$1dh0kxf6cd5v6$2",
                                                      },
                                                    },
                                                  ],
                                                  body: {
                                                    kind: "binop",
                                                    loc: [23, 58, 23, 69],
                                                    left: {
                                                      kind: "id",
                                                      loc: [23, 58, 23, 62],
                                                      text: "each",
                                                      bindingKey:
                                                        "each$1dh0kxf6cd5v6$2",
                                                    },
                                                    operatorToken: "!==",
                                                    right: {
                                                      kind: "id",
                                                      loc: [23, 67, 23, 69],
                                                      text: "id",
                                                      bindingKey:
                                                        "id$1dh0kxf6cd5v6$1",
                                                    },
                                                  },
                                                },
                                              ],
                                            },
                                          ],
                                        },
                                      },
                                    },
                                  ],
                                  children: [
                                    {
                                      kind: "binop",
                                      loc: [26, 22, 26, 36],
                                      left: {
                                        kind: "string",
                                        loc: [26, 22, 26, 31],
                                        text: "remove ",
                                      },
                                      operatorToken: "+",
                                      right: {
                                        kind: "id",
                                        loc: [26, 34, 26, 36],
                                        text: "id",
                                        bindingKey: "id$1dh0kxf6cd5v6$1",
                                      },
                                    },
                                  ],
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
        },
      ],
    }),
  );
}
it("a removal takes out the one row", async () => {
  const { container } = await render(_jsx(RemovableRows, {}));
  const written = watchWrites(container);
  await userEvent.click(screen.getByRole("button", { name: "remove 3" }));
  assert.deepEqual(written(), ["tbody − tr#row-3"]);
});
