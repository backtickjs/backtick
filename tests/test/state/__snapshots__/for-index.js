import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, text } from "./dom.ts";
// A list whose drawing reads where a member sits as well as what it is.
//
// The index is storage, not a number: a rotation moves every member without
// changing any of them, so a row keeps the node it had and only what read
// `index` runs again. Reading it eagerly — the number at the moment the row was
// drawn — leaves all three stale.
async function RotatingRows() {
  return cs.create(
    [16, 10, 34, 5],
    {
      version: "0.0.0",
      filePath: "state/for-index.test.tsx",
      fileHash: "3hac73x1hhg8m",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [16, 13, 34, 4],
      statements: [
        {
          kind: "const",
          loc: [17, 5, 17, 53],
          name: {
            kind: "id",
            loc: [17, 11, 17, 16],
            text: "names",
            bindingKey: "names$3hac73x1hhg8m$0",
          },
          initializer: {
            kind: "()",
            loc: [17, 19, 17, 52],
            expression: {
              kind: "splice",
              loc: [17, 19, 17, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "arr",
                loc: [17, 36, 17, 51],
                elements: [
                  {
                    kind: "string",
                    loc: [17, 37, 17, 40],
                    text: "a",
                  },
                  {
                    kind: "string",
                    loc: [17, 42, 17, 45],
                    text: "b",
                  },
                  {
                    kind: "string",
                    loc: [17, 47, 17, 50],
                    text: "c",
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [18, 5, 21, 7],
          name: {
            kind: "id",
            loc: [18, 11, 18, 17],
            text: "rotate",
            bindingKey: "rotate$3hac73x1hhg8m$1",
          },
          initializer: {
            kind: "=>",
            loc: [18, 20, 21, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [18, 26, 21, 6],
              statements: [
                {
                  kind: "const",
                  loc: [19, 7, 19, 32],
                  name: {
                    kind: "id",
                    loc: [19, 13, 19, 17],
                    text: "held",
                    bindingKey: "held$3hac73x1hhg8m$2",
                  },
                  initializer: {
                    kind: "()",
                    loc: [19, 20, 19, 31],
                    expression: {
                      kind: ".",
                      loc: [19, 20, 19, 29],
                      expression: {
                        kind: "id",
                        loc: [19, 20, 19, 25],
                        text: "names",
                        bindingKey: "names$3hac73x1hhg8m$0",
                      },
                      name: "get",
                    },
                    arguments: [],
                  },
                },
                {
                  kind: "()",
                  loc: [20, 7, 20, 45],
                  expression: {
                    kind: ".",
                    loc: [20, 7, 20, 16],
                    expression: {
                      kind: "id",
                      loc: [20, 7, 20, 12],
                      text: "names",
                      bindingKey: "names$3hac73x1hhg8m$0",
                    },
                    name: "set",
                  },
                  arguments: [
                    {
                      kind: "arr",
                      loc: [20, 17, 20, 44],
                      elements: [
                        {
                          kind: "[]",
                          loc: [20, 18, 20, 25],
                          expression: {
                            kind: "id",
                            loc: [20, 18, 20, 22],
                            text: "held",
                            bindingKey: "held$3hac73x1hhg8m$2",
                          },
                          argumentExpression: {
                            kind: "number",
                            loc: [20, 23, 20, 24],
                            value: 2,
                          },
                        },
                        {
                          kind: "[]",
                          loc: [20, 27, 20, 34],
                          expression: {
                            kind: "id",
                            loc: [20, 27, 20, 31],
                            text: "held",
                            bindingKey: "held$3hac73x1hhg8m$2",
                          },
                          argumentExpression: {
                            kind: "number",
                            loc: [20, 32, 20, 33],
                            value: 0,
                          },
                        },
                        {
                          kind: "[]",
                          loc: [20, 36, 20, 43],
                          expression: {
                            kind: "id",
                            loc: [20, 36, 20, 40],
                            text: "held",
                            bindingKey: "held$3hac73x1hhg8m$2",
                          },
                          argumentExpression: {
                            kind: "number",
                            loc: [20, 41, 20, 42],
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
          loc: [22, 5, 33, 7],
          expression: {
            kind: "jsx",
            loc: [23, 7, 32, 13],
            type: {
              kind: "string",
              loc: [23, 8, 23, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [24, 9, 24, 45],
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
                      loc: [24, 24, 24, 30],
                      text: "rotate",
                      bindingKey: "rotate$3hac73x1hhg8m$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [24, 32, 24, 38],
                    text: "rotate",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [25, 9, 31, 15],
                type: {
                  kind: "string",
                  loc: [25, 10, 25, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [26, 11, 30, 17],
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
                          loc: [26, 22, 26, 33],
                          expression: {
                            kind: ".",
                            loc: [26, 22, 26, 31],
                            expression: {
                              kind: "id",
                              loc: [26, 22, 26, 27],
                              text: "names",
                              bindingKey: "names$3hac73x1hhg8m$0",
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
                        loc: [27, 14, 29, 14],
                        parameters: [
                          {
                            kind: "param",
                            loc: [27, 15, 27, 27],
                            name: {
                              kind: "id",
                              loc: [27, 15, 27, 19],
                              text: "name",
                              bindingKey: "name$3hac73x1hhg8m$3",
                            },
                          },
                          {
                            kind: "param",
                            loc: [27, 29, 27, 50],
                            name: {
                              kind: "id",
                              loc: [27, 29, 27, 34],
                              text: "index",
                              bindingKey: "index$3hac73x1hhg8m$4",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [28, 15, 28, 57],
                          type: {
                            kind: "string",
                            loc: [28, 16, 28, 20],
                            text: "span",
                          },
                          attributes: [],
                          children: [
                            {
                              kind: "binop",
                              loc: [28, 22, 28, 49],
                              left: {
                                kind: "binop",
                                loc: [28, 22, 28, 35],
                                left: {
                                  kind: "id",
                                  loc: [28, 22, 28, 26],
                                  text: "name",
                                  bindingKey: "name$3hac73x1hhg8m$3",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "string",
                                  loc: [28, 29, 28, 35],
                                  text: " at ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: "()",
                                loc: [28, 38, 28, 49],
                                expression: {
                                  kind: ".",
                                  loc: [28, 38, 28, 47],
                                  expression: {
                                    kind: "id",
                                    loc: [28, 38, 28, 43],
                                    text: "index",
                                    bindingKey: "index$3hac73x1hhg8m$4",
                                  },
                                  name: "get",
                                },
                                arguments: [],
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
  it("a moved row keeps its node and reads its new index", async () => {
    const view = await drawn(_jsx(RotatingRows, {}));
    const [rotate, list] = children(view);
    assert.ok(rotate !== undefined && list !== undefined);
    assert.deepEqual([...list.children].map(text), [
      "a at 0",
      "b at 1",
      "c at 2",
    ]);
    const held = [...list.children][0];
    await userEvent.click(rotate);
    // Nothing about a member changed, so every row is the node it was — and
    // the index each one draws is the position it now sits at.
    assert.deepEqual([...list.children].map(text), [
      "c at 0",
      "a at 1",
      "b at 2",
    ]);
    assert.equal(list.children[1], held);
  });
});
it("RotatingRows", async (t) => {
  await snapshotCase(t, "RotatingRows", _jsx(RotatingRows, {}));
});
