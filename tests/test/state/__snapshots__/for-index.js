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
    [16, 10, 33, 5],
    {
      version: "0.0.0",
      filePath: "state/for-index.test.tsx",
      fileHash: "k0rv1b9bi283",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [16, 13, 33, 4],
      statements: [
        {
          kind: "const",
          loc: [17, 5, 17, 53],
          name: {
            kind: "id",
            loc: [17, 11, 17, 16],
            text: "names",
            bindingKey: "names$k0rv1b9bi283$0",
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
          loc: [18, 5, 20, 7],
          name: {
            kind: "id",
            loc: [18, 11, 18, 17],
            text: "rotate",
            bindingKey: "rotate$k0rv1b9bi283$1",
          },
          initializer: {
            kind: "=>",
            loc: [18, 20, 20, 6],
            parameters: [],
            body: {
              kind: "{}",
              loc: [18, 26, 20, 6],
              statements: [
                {
                  kind: "()",
                  loc: [19, 7, 19, 58],
                  expression: {
                    kind: ".",
                    loc: [19, 7, 19, 19],
                    expression: {
                      kind: "id",
                      loc: [19, 7, 19, 12],
                      text: "names",
                      bindingKey: "names$k0rv1b9bi283$0",
                    },
                    name: "update",
                  },
                  arguments: [
                    {
                      kind: "=>",
                      loc: [19, 20, 19, 57],
                      parameters: [
                        {
                          kind: "param",
                          loc: [19, 21, 19, 25],
                          name: {
                            kind: "id",
                            loc: [19, 21, 19, 25],
                            text: "held",
                            bindingKey: "held$k0rv1b9bi283$2",
                          },
                        },
                      ],
                      body: {
                        kind: "arr",
                        loc: [19, 30, 19, 57],
                        elements: [
                          {
                            kind: "[]",
                            loc: [19, 31, 19, 38],
                            expression: {
                              kind: "id",
                              loc: [19, 31, 19, 35],
                              text: "held",
                              bindingKey: "held$k0rv1b9bi283$2",
                            },
                            argumentExpression: {
                              kind: "number",
                              loc: [19, 36, 19, 37],
                              value: 2,
                            },
                          },
                          {
                            kind: "[]",
                            loc: [19, 40, 19, 47],
                            expression: {
                              kind: "id",
                              loc: [19, 40, 19, 44],
                              text: "held",
                              bindingKey: "held$k0rv1b9bi283$2",
                            },
                            argumentExpression: {
                              kind: "number",
                              loc: [19, 45, 19, 46],
                              value: 0,
                            },
                          },
                          {
                            kind: "[]",
                            loc: [19, 49, 19, 56],
                            expression: {
                              kind: "id",
                              loc: [19, 49, 19, 53],
                              text: "held",
                              bindingKey: "held$k0rv1b9bi283$2",
                            },
                            argumentExpression: {
                              kind: "number",
                              loc: [19, 54, 19, 55],
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
          loc: [21, 5, 32, 7],
          expression: {
            kind: "jsx",
            loc: [22, 7, 31, 13],
            type: {
              kind: "string",
              loc: [22, 8, 22, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [23, 9, 23, 45],
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
                      loc: [23, 24, 23, 30],
                      text: "rotate",
                      bindingKey: "rotate$k0rv1b9bi283$1",
                    },
                  },
                ],
                children: [
                  {
                    kind: "string",
                    loc: [23, 32, 23, 38],
                    text: "rotate",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [24, 9, 30, 15],
                type: {
                  kind: "string",
                  loc: [24, 10, 24, 13],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [25, 11, 29, 17],
                    type: {
                      kind: "splice",
                      loc: [25, 12, 25, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: "()",
                          loc: [25, 22, 25, 34],
                          expression: {
                            kind: ".",
                            loc: [25, 22, 25, 32],
                            expression: {
                              kind: "id",
                              loc: [25, 22, 25, 27],
                              text: "names",
                              bindingKey: "names$k0rv1b9bi283$0",
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
                        loc: [26, 14, 28, 14],
                        parameters: [
                          {
                            kind: "param",
                            loc: [26, 15, 26, 27],
                            name: {
                              kind: "id",
                              loc: [26, 15, 26, 19],
                              text: "name",
                              bindingKey: "name$k0rv1b9bi283$3",
                            },
                          },
                          {
                            kind: "param",
                            loc: [26, 29, 26, 57],
                            name: {
                              kind: "id",
                              loc: [26, 29, 26, 34],
                              text: "index",
                              bindingKey: "index$k0rv1b9bi283$4",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [27, 15, 27, 58],
                          type: {
                            kind: "string",
                            loc: [27, 16, 27, 20],
                            text: "span",
                          },
                          attributes: [],
                          children: [
                            {
                              kind: "binop",
                              loc: [27, 22, 27, 50],
                              left: {
                                kind: "binop",
                                loc: [27, 22, 27, 35],
                                left: {
                                  kind: "id",
                                  loc: [27, 22, 27, 26],
                                  text: "name",
                                  bindingKey: "name$k0rv1b9bi283$3",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "string",
                                  loc: [27, 29, 27, 35],
                                  text: " at ",
                                },
                              },
                              operatorToken: "+",
                              right: {
                                kind: "()",
                                loc: [27, 38, 27, 50],
                                expression: {
                                  kind: ".",
                                  loc: [27, 38, 27, 48],
                                  expression: {
                                    kind: "id",
                                    loc: [27, 38, 27, 43],
                                    text: "index",
                                    bindingKey: "index$k0rv1b9bi283$4",
                                  },
                                  name: "read",
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
