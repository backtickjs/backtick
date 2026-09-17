import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { window } from "@backtickjs/web-sdk";
import { render, screen } from "@backtickjs/web-testing";
import { snapshotCase } from "../snapshotCase.ts";
import { settled } from "./dom.ts";
// The same claim as `vmEvalBuildsOnce`, with no bundle in it.
//
// A component is built once, however what it drew changes afterwards. `<For />`
// answers with a way of asking, the way a drawn bundle does, so if the fault
// were the drawn bundle's this would be untouched — and it is not.
//
// `asked` is the page's, so it survives a rebuild and counts them, and it ends
// one: once it stops saying yes, nothing is written and nothing runs again.
const answerItems = ["one", "two"];
async function WaitingList({ more }) {
  return cs.create(
    [21, 10, 31, 5],
    {
      version: "0.0.0",
      filePath: "render/for-builds-once.test.tsx",
      fileHash: "bv4vczxvw8r3",
      splices: {
        $state: { value: state, params: [] },
        $window: { value: window, params: [] },
        $more: { value: more, params: [] },
        $answerItems: { value: answerItems, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [21, 13, 31, 4],
      statements: [
        {
          kind: "const",
          loc: [22, 5, 22, 40],
          name: {
            kind: "id",
            loc: [22, 11, 22, 16],
            text: "items",
            bindingKey: "items$bv4vczxvw8r3$0",
          },
          initializer: {
            kind: "()",
            loc: [22, 19, 22, 39],
            expression: {
              kind: "splice",
              loc: [22, 19, 22, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "arr",
                loc: [22, 36, 22, 38],
                elements: [],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [24, 5, 28, 11],
          name: {
            kind: "id",
            loc: [24, 11, 24, 18],
            text: "started",
            bindingKey: "started$bv4vczxvw8r3$1",
          },
          initializer: {
            kind: "()",
            loc: [24, 21, 28, 10],
            expression: {
              kind: ".",
              loc: [24, 21, 24, 39],
              expression: {
                kind: "splice",
                loc: [24, 21, 24, 28],
                key: "$window",
              },
              name: "setTimeout",
            },
            arguments: [
              {
                kind: "=>",
                loc: [24, 40, 28, 6],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [24, 46, 28, 6],
                  statements: [
                    {
                      kind: "if",
                      loc: [25, 7, 27, 8],
                      expression: {
                        kind: "()",
                        loc: [25, 11, 25, 18],
                        expression: {
                          kind: "splice",
                          loc: [25, 11, 25, 16],
                          key: "$more",
                        },
                        arguments: [],
                      },
                      thenStatement: {
                        kind: "{}",
                        loc: [25, 20, 27, 8],
                        statements: [
                          {
                            kind: "()",
                            loc: [26, 9, 26, 32],
                            expression: {
                              kind: ".",
                              loc: [26, 9, 26, 18],
                              expression: {
                                kind: "id",
                                loc: [26, 9, 26, 14],
                                text: "items",
                                bindingKey: "items$bv4vczxvw8r3$0",
                              },
                              name: "set",
                            },
                            arguments: [
                              {
                                kind: "splice",
                                loc: [26, 19, 26, 31],
                                key: "$answerItems",
                              },
                            ],
                          },
                        ],
                      },
                      elseStatement: null,
                    },
                  ],
                },
              },
              {
                kind: "number",
                loc: [28, 8, 28, 9],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [30, 5, 30, 78],
          expression: {
            kind: "jsx",
            loc: [30, 12, 30, 77],
            type: {
              kind: "splice",
              loc: [30, 13, 30, 16],
              key: "$For",
            },
            attributes: [
              {
                name: "each",
                initializer: {
                  kind: "()",
                  loc: [30, 23, 30, 34],
                  expression: {
                    kind: ".",
                    loc: [30, 23, 30, 32],
                    expression: {
                      kind: "id",
                      loc: [30, 23, 30, 28],
                      text: "items",
                      bindingKey: "items$bv4vczxvw8r3$0",
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
                loc: [30, 37, 30, 70],
                parameters: [
                  {
                    kind: "param",
                    loc: [30, 38, 30, 50],
                    name: {
                      kind: "id",
                      loc: [30, 38, 30, 42],
                      text: "item",
                      bindingKey: "item$bv4vczxvw8r3$2",
                    },
                  },
                ],
                body: {
                  kind: "jsx",
                  loc: [30, 55, 30, 70],
                  type: {
                    kind: "string",
                    loc: [30, 56, 30, 58],
                    text: "em",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "id",
                      loc: [30, 60, 30, 64],
                      text: "item",
                      bindingKey: "item$bv4vczxvw8r3$2",
                    },
                  ],
                },
              },
            ],
          },
        },
      ],
    }),
  );
}
const forBuildsOnce = cs.create(
  [34, 23, 48, 3],
  {
    version: "0.0.0",
    filePath: "render/for-builds-once.test.tsx",
    fileHash: "bv4vczxvw8r3",
    splices: {
      $state: { value: state, params: [] },
      $WaitingList: { value: WaitingList, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [34, 26, 48, 2],
    statements: [
      {
        kind: "const",
        loc: [35, 3, 35, 27],
        name: {
          kind: "id",
          loc: [35, 9, 35, 14],
          text: "asked",
          bindingKey: "asked$bv4vczxvw8r3$3",
        },
        initializer: {
          kind: "()",
          loc: [35, 17, 35, 26],
          expression: {
            kind: "splice",
            loc: [35, 17, 35, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [35, 24, 35, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [37, 3, 47, 5],
        expression: {
          kind: "jsx",
          loc: [38, 5, 46, 11],
          type: {
            kind: "string",
            loc: [38, 6, 38, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [39, 7, 39, 44],
              type: {
                kind: "string",
                loc: [39, 8, 39, 12],
                text: "span",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [39, 14, 39, 36],
                  left: {
                    kind: "string",
                    loc: [39, 14, 39, 22],
                    text: "asked ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [39, 25, 39, 36],
                    expression: {
                      kind: ".",
                      loc: [39, 25, 39, 34],
                      expression: {
                        kind: "id",
                        loc: [39, 25, 39, 30],
                        text: "asked",
                        bindingKey: "asked$bv4vczxvw8r3$3",
                      },
                      name: "get",
                    },
                    arguments: [],
                  },
                },
              ],
            },
            {
              kind: "jsx",
              loc: [40, 7, 45, 9],
              type: {
                kind: "splice",
                loc: [40, 8, 40, 19],
                key: "$WaitingList",
              },
              attributes: [
                {
                  name: "more",
                  initializer: {
                    kind: "=>",
                    loc: [41, 15, 44, 10],
                    parameters: [],
                    body: {
                      kind: "{}",
                      loc: [41, 21, 44, 10],
                      statements: [
                        {
                          kind: "()",
                          loc: [42, 11, 42, 37],
                          expression: {
                            kind: ".",
                            loc: [42, 11, 42, 20],
                            expression: {
                              kind: "id",
                              loc: [42, 11, 42, 16],
                              text: "asked",
                              bindingKey: "asked$bv4vczxvw8r3$3",
                            },
                            name: "set",
                          },
                          arguments: [
                            {
                              kind: "binop",
                              loc: [42, 21, 42, 36],
                              left: {
                                kind: "()",
                                loc: [42, 21, 42, 32],
                                expression: {
                                  kind: ".",
                                  loc: [42, 21, 42, 30],
                                  expression: {
                                    kind: "id",
                                    loc: [42, 21, 42, 26],
                                    text: "asked",
                                    bindingKey: "asked$bv4vczxvw8r3$3",
                                  },
                                  name: "get",
                                },
                                arguments: [],
                              },
                              operatorToken: "+",
                              right: {
                                kind: "number",
                                loc: [42, 35, 42, 36],
                                value: 1,
                              },
                            },
                          ],
                        },
                        {
                          kind: "return",
                          loc: [43, 11, 43, 34],
                          expression: {
                            kind: "binop",
                            loc: [43, 18, 43, 33],
                            left: {
                              kind: "()",
                              loc: [43, 18, 43, 29],
                              expression: {
                                kind: ".",
                                loc: [43, 18, 43, 27],
                                expression: {
                                  kind: "id",
                                  loc: [43, 18, 43, 23],
                                  text: "asked",
                                  bindingKey: "asked$bv4vczxvw8r3$3",
                                },
                                name: "get",
                              },
                              arguments: [],
                            },
                            operatorToken: "<",
                            right: {
                              kind: "number",
                              loc: [43, 32, 43, 33],
                              value: 5,
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              ],
              children: [],
            },
          ],
        },
      },
    ],
  }),
);
it("forBuildsOnce", async (t) => {
  await snapshotCase(t, "forBuildsOnce", forBuildsOnce);
});
describe("a component that draws a list", () => {
  // The same claim with no bundle in it: `<For />` answers with a way of asking
  // too, so a fault in what draws a bundle would leave this alone.
  it("is built once, and draws what arrives", async () => {
    const { container } = await render(forBuildsOnce);
    assert.ok(screen.getByText("asked 0"));
    await settled();
    assert.equal(container.querySelectorAll("em").length, 2);
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
});
