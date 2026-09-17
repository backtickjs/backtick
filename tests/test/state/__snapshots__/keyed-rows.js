import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, text } from "./dom.ts";
// A keyed list driven by a cell. Every write hands back a new array of new
// rows, so nothing about the list is the object it was — the keys are the only
// thing saying which row is which.
async function SwappableRows() {
  return cs.create(
    [12, 10, 32, 5],
    {
      version: "0.0.0",
      filePath: "state/keyed-rows.test.tsx",
      fileHash: "89rxx0ivccc7",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [12, 13, 32, 4],
      statements: [
        {
          kind: "const",
          loc: [13, 5, 13, 45],
          name: {
            kind: "id",
            loc: [13, 11, 13, 14],
            text: "ids",
            bindingKey: "ids$89rxx0ivccc7$0",
          },
          initializer: {
            kind: "()",
            loc: [13, 17, 13, 44],
            expression: {
              kind: "splice",
              loc: [13, 17, 13, 23],
              key: "$state",
            },
            arguments: [
              {
                kind: "arr",
                loc: [13, 34, 13, 43],
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
            bindingKey: "swap$89rxx0ivccc7$1",
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
                    bindingKey: "held$89rxx0ivccc7$3",
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
                        bindingKey: "ids$89rxx0ivccc7$0",
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
                      bindingKey: "ids$89rxx0ivccc7$0",
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
                              bindingKey: "held$89rxx0ivccc7$3",
                            },
                            name: "with",
                          },
                          arguments: [
                            {
                              kind: "number",
                              loc: [16, 25, 16, 26],
                              value: 0,
                            },
                            {
                              kind: "[]",
                              loc: [16, 28, 16, 35],
                              expression: {
                                kind: "id",
                                loc: [16, 28, 16, 32],
                                text: "held",
                                bindingKey: "held$89rxx0ivccc7$3",
                              },
                              argumentExpression: {
                                kind: "number",
                                loc: [16, 33, 16, 34],
                                value: 2,
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
                          value: 2,
                        },
                        {
                          kind: "[]",
                          loc: [16, 45, 16, 52],
                          expression: {
                            kind: "id",
                            loc: [16, 45, 16, 49],
                            text: "held",
                            bindingKey: "held$89rxx0ivccc7$3",
                          },
                          argumentExpression: {
                            kind: "number",
                            loc: [16, 50, 16, 51],
                            value: 0,
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
          kind: "const",
          loc: [18, 5, 20, 7],
          name: {
            kind: "id",
            loc: [18, 11, 18, 15],
            text: "drop",
            bindingKey: "drop$89rxx0ivccc7$2",
          },
          initializer: {
            kind: "=>",
            loc: [18, 18, 20, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [18, 24, 20, 6],
              statements: [
                {
                  kind: "()",
                  loc: [19, 7, 19, 50],
                  expression: {
                    kind: ".",
                    loc: [19, 7, 19, 14],
                    expression: {
                      kind: "id",
                      loc: [19, 7, 19, 10],
                      text: "ids",
                      bindingKey: "ids$89rxx0ivccc7$0",
                    },
                    name: "set",
                  },
                  arguments: [
                    {
                      kind: "()",
                      loc: [19, 15, 19, 49],
                      expression: {
                        kind: ".",
                        loc: [19, 15, 19, 31],
                        expression: {
                          kind: "()",
                          loc: [19, 15, 19, 24],
                          expression: {
                            kind: ".",
                            loc: [19, 15, 19, 22],
                            expression: {
                              kind: "id",
                              loc: [19, 15, 19, 18],
                              text: "ids",
                              bindingKey: "ids$89rxx0ivccc7$0",
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
                          loc: [19, 32, 19, 48],
                          parameters: [
                            {
                              kind: "param",
                              loc: [19, 33, 19, 35],
                              name: {
                                kind: "id",
                                loc: [19, 33, 19, 35],
                                text: "id",
                                bindingKey: "id$89rxx0ivccc7$4",
                              },
                            },
                          ],
                          body: {
                            kind: "binop",
                            loc: [19, 40, 19, 48],
                            left: {
                              kind: "id",
                              loc: [19, 40, 19, 42],
                              text: "id",
                              bindingKey: "id$89rxx0ivccc7$4",
                            },
                            operatorToken: "!==",
                            right: {
                              kind: "number",
                              loc: [19, 47, 19, 48],
                              value: 2,
                            },
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
          loc: [21, 5, 31, 7],
          expression: {
            kind: "jsx",
            loc: [22, 7, 30, 13],
            type: {
              kind: "string",
              loc: [22, 8, 22, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [23, 9, 23, 41],
                type: {
                  kind: "string",
                  loc: [23, 10, 23, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "id",
                      loc: [23, 24, 23, 28],
                      text: "swap",
                      bindingKey: "swap$89rxx0ivccc7$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [23, 30, 23, 34],
                    text: "swap",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [24, 9, 24, 41],
                type: {
                  kind: "string",
                  loc: [24, 10, 24, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "id",
                      loc: [24, 24, 24, 28],
                      text: "drop",
                      bindingKey: "drop$89rxx0ivccc7$2",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [24, 30, 24, 34],
                    text: "drop",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [25, 9, 29, 15],
                type: {
                  kind: "string",
                  loc: [25, 10, 25, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [26, 11, 28, 17],
                    type: {
                      kind: "splice",
                      loc: [26, 12, 26, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: "()",
                          loc: [26, 22, 26, 31],
                          expression: {
                            kind: ".",
                            loc: [26, 22, 26, 29],
                            expression: {
                              kind: "id",
                              loc: [26, 22, 26, 25],
                              text: "ids",
                              bindingKey: "ids$89rxx0ivccc7$0",
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
                        loc: [27, 14, 27, 56],
                        parameters: [
                          {
                            kind: "param",
                            loc: [27, 15, 27, 25],
                            name: {
                              kind: "id",
                              loc: [27, 15, 27, 17],
                              text: "id",
                              bindingKey: "id$89rxx0ivccc7$5",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [27, 30, 27, 56],
                          type: {
                            kind: "string",
                            loc: [27, 31, 27, 35],
                            text: "span",
                          },
                          attributes: [],
                          children: [
                            {
                              kind: "binop",
                              loc: [27, 37, 27, 48],
                              left: {
                                kind: "string",
                                loc: [27, 37, 27, 43],
                                text: "row ",
                              },
                              operatorToken: "+",
                              right: {
                                kind: "id",
                                loc: [27, 46, 27, 48],
                                text: "id",
                                bindingKey: "id$89rxx0ivccc7$5",
                              },
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
describe("local state", () => {
  // A list is declared, so the client walks the array itself and a member is
  // named by its own identity. What that has to buy is node identity: a row
  // that moved is the node it was, and a row that went took its own node with
  // it — neither is anything a snapshot of the drawn markup can see, so both
  // are asserted on the nodes these hold across the write.
  it("a reordered list moves the rows it already built", async () => {
    const view = await drawn(_jsx(SwappableRows, {}));
    const [swap, , list] = children(view);
    assert.ok(swap !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), ["row 1", "row 2", "row 3"]);
    const [first, , third] = [...list.children];
    await userEvent.click(swap);
    assert.deepEqual([...list.children].map(text), ["row 3", "row 2", "row 1"]);
    // The two that swapped are the nodes they were, at each other's places.
    assert.equal([...list.children][0], third);
    assert.equal([...list.children][2], first);
  });
  it("a list a row was dropped from draws the rest", async () => {
    const view = await drawn(_jsx(SwappableRows, {}));
    const [, drop, list] = children(view);
    assert.ok(drop !== undefined && list !== undefined);
    const [first, , third] = [...list.children];
    await userEvent.click(drop);
    assert.deepEqual([...list.children].map(text), ["row 1", "row 3"]);
    // Only the row that went was touched; the rest kept their nodes.
    assert.deepEqual([...list.children], [first, third]);
  });
});
it("SwappableRows", async (t) => {
  await snapshotCase(t, "SwappableRows", _jsx(SwappableRows, {}));
});
