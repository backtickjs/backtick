import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, evaluate, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A function the script holds that draws a bundle it is still waiting for.
//
// Read inside the drawing, so the condition follows the cell: when the bundle
// arrives the child runs again and calls `Badge`, and `count` stays a prop the
// badge reads on access rather than a value handed over once.
const loadedBadge = await bundler.run(
  cs.create(
    [16, 3, 16, 68],
    {
      version: "0.0.0",
      filePath: "render/script-bound-tag-loading.test.tsx",
      fileHash: "1urfcbdx87m7k",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [16, 6, 16, 67],
      parameters: [
        {
          kind: "param",
          loc: [16, 7, 16, 31],
          name: {
            kind: "id",
            loc: [16, 7, 16, 12],
            text: "props",
            bindingKey: "props$1urfcbdx87m7k$0",
          },
        },
      ],
      body: {
        kind: "jsx",
        loc: [16, 36, 16, 67],
        type: {
          kind: "string",
          loc: [16, 37, 16, 38],
          text: "b",
        },
        attributes: [],
        children: [
          {
            kind: "binop",
            loc: [16, 40, 16, 62],
            left: {
              kind: "string",
              loc: [16, 40, 16, 48],
              text: "count ",
            },
            operatorToken: "+",
            right: {
              kind: ".",
              loc: [16, 51, 16, 62],
              expression: {
                kind: "id",
                loc: [16, 51, 16, 56],
                text: "props",
                bindingKey: "props$1urfcbdx87m7k$0",
              },
              name: "count",
            },
          },
        ],
      },
    }),
  ),
);
const scriptBoundTagLoading = cs.create(
  [19, 31, 36, 3],
  {
    version: "0.0.0",
    filePath: "render/script-bound-tag-loading.test.tsx",
    fileHash: "1urfcbdx87m7k",
    splices: {
      $state: { value: state, params: [] },
      $evaluate: { value: evaluate, params: [] },
      $loadedBadge: { value: loadedBadge, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [19, 34, 36, 2],
    statements: [
      {
        kind: "const",
        loc: [20, 3, 20, 27],
        name: {
          kind: "id",
          loc: [20, 9, 20, 14],
          text: "count",
          bindingKey: "count$1urfcbdx87m7k$1",
        },
        initializer: {
          kind: "()",
          loc: [20, 17, 20, 26],
          expression: {
            kind: "splice",
            loc: [20, 17, 20, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [20, 24, 20, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [21, 3, 23, 19],
        name: {
          kind: "id",
          loc: [21, 9, 21, 14],
          text: "drawn",
          bindingKey: "drawn$1urfcbdx87m7k$2",
        },
        initializer: {
          kind: "()",
          loc: [21, 17, 23, 18],
          expression: {
            kind: "splice",
            loc: [21, 17, 21, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "null",
              loc: [23, 13, 23, 17],
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [24, 3, 27, 5],
        name: {
          kind: "id",
          loc: [24, 9, 24, 14],
          text: "Badge",
          bindingKey: "Badge$1urfcbdx87m7k$3",
        },
        initializer: {
          kind: "=>",
          loc: [24, 17, 27, 4],
          parameters: [
            {
              kind: "param",
              loc: [24, 18, 24, 42],
              name: {
                kind: "id",
                loc: [24, 18, 24, 23],
                text: "props",
                bindingKey: "props$1urfcbdx87m7k$4",
              },
            },
          ],
          body: {
            kind: "{}",
            loc: [24, 47, 27, 4],
            statements: [
              {
                kind: "const",
                loc: [25, 5, 25, 30],
                name: {
                  kind: "id",
                  loc: [25, 11, 25, 15],
                  text: "held",
                  bindingKey: "held$1urfcbdx87m7k$5",
                },
                initializer: {
                  kind: "()",
                  loc: [25, 18, 25, 29],
                  expression: {
                    kind: ".",
                    loc: [25, 18, 25, 27],
                    expression: {
                      kind: "id",
                      loc: [25, 18, 25, 23],
                      text: "drawn",
                      bindingKey: "drawn$1urfcbdx87m7k$2",
                    },
                    name: "get",
                  },
                  arguments: [],
                },
              },
              {
                kind: "return",
                loc: [26, 5, 26, 58],
                expression: {
                  kind: "?:",
                  loc: [26, 12, 26, 57],
                  condition: {
                    kind: "binop",
                    loc: [26, 12, 26, 25],
                    left: {
                      kind: "id",
                      loc: [26, 12, 26, 16],
                      text: "held",
                      bindingKey: "held$1urfcbdx87m7k$5",
                    },
                    operatorToken: "===",
                    right: {
                      kind: "null",
                      loc: [26, 21, 26, 25],
                    },
                  },
                  whenTrue: {
                    kind: "null",
                    loc: [26, 28, 26, 32],
                  },
                  whenFalse: {
                    kind: "()",
                    loc: [26, 35, 26, 57],
                    expression: {
                      kind: "()",
                      loc: [26, 35, 26, 50],
                      expression: {
                        kind: "splice",
                        loc: [26, 35, 26, 44],
                        key: "$evaluate",
                      },
                      arguments: [
                        {
                          kind: "id",
                          loc: [26, 45, 26, 49],
                          text: "held",
                          bindingKey: "held$1urfcbdx87m7k$5",
                        },
                      ],
                    },
                    arguments: [
                      {
                        kind: "id",
                        loc: [26, 51, 26, 56],
                        text: "props",
                        bindingKey: "props$1urfcbdx87m7k$4",
                      },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
      {
        kind: "return",
        loc: [29, 3, 35, 5],
        expression: {
          kind: "jsx",
          loc: [30, 5, 34, 11],
          type: {
            kind: "string",
            loc: [30, 6, 30, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "?:",
              loc: [31, 8, 31, 77],
              condition: {
                kind: "binop",
                loc: [31, 8, 31, 28],
                left: {
                  kind: "()",
                  loc: [31, 8, 31, 19],
                  expression: {
                    kind: ".",
                    loc: [31, 8, 31, 17],
                    expression: {
                      kind: "id",
                      loc: [31, 8, 31, 13],
                      text: "drawn",
                      bindingKey: "drawn$1urfcbdx87m7k$2",
                    },
                    name: "get",
                  },
                  arguments: [],
                },
                operatorToken: "===",
                right: {
                  kind: "null",
                  loc: [31, 24, 31, 28],
                },
              },
              whenTrue: {
                kind: "jsx",
                loc: [31, 31, 31, 45],
                type: {
                  kind: "string",
                  loc: [31, 32, 31, 33],
                  text: "i",
                },
                attributes: [],
                children: [
                  {
                    kind: "string",
                    loc: [31, 34, 31, 41],
                    text: "loading",
                  },
                ],
              },
              whenFalse: {
                kind: "jsx",
                loc: [31, 48, 31, 77],
                type: {
                  kind: "id",
                  loc: [31, 49, 31, 54],
                  text: "Badge",
                  bindingKey: "Badge$1urfcbdx87m7k$3",
                },
                attributes: [
                  {
                    name: "count",
                    initializer: {
                      kind: "()",
                      loc: [31, 62, 31, 73],
                      expression: {
                        kind: ".",
                        loc: [31, 62, 31, 71],
                        expression: {
                          kind: "id",
                          loc: [31, 62, 31, 67],
                          text: "count",
                          bindingKey: "count$1urfcbdx87m7k$1",
                        },
                        name: "get",
                      },
                      arguments: [],
                    },
                  },
                ],
                children: [],
              },
            },
            {
              kind: "jsx",
              loc: [32, 7, 32, 68],
              type: {
                kind: "string",
                loc: [32, 8, 32, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [32, 24, 32, 53],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [32, 30, 32, 53],
                      expression: {
                        kind: ".",
                        loc: [32, 30, 32, 39],
                        expression: {
                          kind: "id",
                          loc: [32, 30, 32, 35],
                          text: "drawn",
                          bindingKey: "drawn$1urfcbdx87m7k$2",
                        },
                        name: "set",
                      },
                      arguments: [
                        {
                          kind: "splice",
                          loc: [32, 40, 32, 52],
                          key: "$loadedBadge",
                        },
                      ],
                    },
                  },
                },
              ],
              children: [
                {
                  kind: "string",
                  loc: [32, 55, 32, 59],
                  text: "load",
                },
              ],
            },
            {
              kind: "jsx",
              loc: [33, 7, 33, 71],
              type: {
                kind: "string",
                loc: [33, 8, 33, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [33, 24, 33, 56],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [33, 30, 33, 56],
                      expression: {
                        kind: ".",
                        loc: [33, 30, 33, 39],
                        expression: {
                          kind: "id",
                          loc: [33, 30, 33, 35],
                          text: "count",
                          bindingKey: "count$1urfcbdx87m7k$1",
                        },
                        name: "set",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [33, 40, 33, 55],
                          left: {
                            kind: "()",
                            loc: [33, 40, 33, 51],
                            expression: {
                              kind: ".",
                              loc: [33, 40, 33, 49],
                              expression: {
                                kind: "id",
                                loc: [33, 40, 33, 45],
                                text: "count",
                                bindingKey: "count$1urfcbdx87m7k$1",
                              },
                              name: "get",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [33, 54, 33, 55],
                            value: 1,
                          },
                        },
                      ],
                    },
                  },
                },
              ],
              children: [
                {
                  kind: "string",
                  loc: [33, 58, 33, 62],
                  text: "more",
                },
              ],
            },
          ],
        },
      },
    ],
  }),
);
it("scriptBoundTagLoading", async (t) => {
  await snapshotCase(t, "scriptBoundTagLoading", scriptBoundTagLoading);
});
describe("a tag naming a function the script holds", () => {
  it("draws one that arrives later, and keeps its prop live", async () => {
    await render(scriptBoundTagLoading);
    assert.equal(screen.getByText("loading").tagName.toLowerCase(), "i");
    await userEvent.click(screen.getByRole("button", { name: "load" }));
    const badge = screen.getByText("count 0");
    assert.equal(badge.tagName.toLowerCase(), "b");
    assert.equal(screen.queryByText("loading"), null);
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(
      screen.getByText("count 1"),
      badge,
      "the same <b>, updated in place",
    );
  });
});
