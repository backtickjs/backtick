import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A tag naming a function an enclosing script holds. The nested script captures
// it the way it captures any binding, and calls it as a component: once, with
// its props read on access.
const scriptBoundTagCapture = cs.create(
  [11, 31, 33, 3],
  {
    version: "0.0.0",
    filePath: "render/script-bound-tag-capture.test.tsx",
    fileHash: "h5jruxcfnavr",
    splices: {
      $state: { value: state, params: [] },
      $0splice0: {
        value: cs.create(
          [17, 10, 17, 39],
          {
            version: "0.0.0",
            filePath: "render/script-bound-tag-capture.test.tsx",
            fileHash: "h5jruxcfnavr",
            splices: {},
            captures: ["Badge$h5jruxcfnavr$1", "count$h5jruxcfnavr$0"],
          },
          () => ({
            kind: "jsx",
            loc: [17, 13, 17, 38],
            type: {
              kind: "id",
              loc: [17, 14, 17, 19],
              text: "Badge",
              bindingKey: "Badge$h5jruxcfnavr$1",
            },
            attributes: [
              {
                name: "n",
                initializer: {
                  kind: "()",
                  loc: [17, 23, 17, 34],
                  expression: {
                    kind: ".",
                    loc: [17, 23, 17, 32],
                    expression: {
                      kind: "id",
                      loc: [17, 23, 17, 28],
                      text: "count",
                      bindingKey: "count$h5jruxcfnavr$0",
                    },
                    name: "get",
                  },
                  arguments: [],
                },
              },
            ],
            children: [],
          }),
        ),
        params: ["count$h5jruxcfnavr$0", "Badge$h5jruxcfnavr$1"],
      },
      $0splice1: {
        value: cs.create(
          [19, 11, 22, 11],
          {
            version: "0.0.0",
            filePath: "render/script-bound-tag-capture.test.tsx",
            fileHash: "h5jruxcfnavr",
            splices: {
              $0splice0: {
                value: cs.create(
                  [21, 20, 21, 55],
                  {
                    version: "0.0.0",
                    filePath: "render/script-bound-tag-capture.test.tsx",
                    fileHash: "h5jruxcfnavr",
                    splices: {},
                    captures: ["Badge$h5jruxcfnavr$1", "count$h5jruxcfnavr$0"],
                  },
                  () => ({
                    kind: "jsx",
                    loc: [21, 23, 21, 54],
                    type: {
                      kind: "id",
                      loc: [21, 24, 21, 29],
                      text: "Badge",
                      bindingKey: "Badge$h5jruxcfnavr$1",
                    },
                    attributes: [
                      {
                        name: "n",
                        initializer: {
                          kind: "binop",
                          loc: [21, 33, 21, 50],
                          left: {
                            kind: "()",
                            loc: [21, 33, 21, 44],
                            expression: {
                              kind: ".",
                              loc: [21, 33, 21, 42],
                              expression: {
                                kind: "id",
                                loc: [21, 33, 21, 38],
                                text: "count",
                                bindingKey: "count$h5jruxcfnavr$0",
                              },
                              name: "get",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [21, 47, 21, 50],
                            value: 100,
                          },
                        },
                      },
                    ],
                    children: [],
                  }),
                ),
                params: [],
              },
            },
            captures: ["Badge$h5jruxcfnavr$1", "count$h5jruxcfnavr$0"],
          },
          () => ({
            kind: "{}",
            loc: [19, 14, 22, 10],
            statements: [
              {
                kind: "const",
                loc: [20, 11, 20, 30],
                name: {
                  kind: "id",
                  loc: [20, 17, 20, 24],
                  text: "skipped",
                  bindingKey: "skipped$h5jruxcfnavr$3",
                },
                initializer: {
                  kind: "number",
                  loc: [20, 27, 20, 29],
                  value: 10,
                },
              },
              {
                kind: "return",
                loc: [21, 11, 21, 57],
                expression: {
                  kind: "splice",
                  loc: [21, 18, 21, 56],
                  key: "$0splice0",
                },
              },
            ],
          }),
        ),
        params: ["count$h5jruxcfnavr$0", "Badge$h5jruxcfnavr$1"],
      },
      $0splice2: {
        value: _jsx("section", {
          children: cs.create(
            [24, 21, 24, 57],
            {
              version: "0.0.0",
              filePath: "render/script-bound-tag-capture.test.tsx",
              fileHash: "h5jruxcfnavr",
              splices: {},
              captures: ["Badge$h5jruxcfnavr$1", "count$h5jruxcfnavr$0"],
            },
            () => ({
              kind: "jsx",
              loc: [24, 24, 24, 56],
              type: {
                kind: "id",
                loc: [24, 25, 24, 30],
                text: "Badge",
                bindingKey: "Badge$h5jruxcfnavr$1",
              },
              attributes: [
                {
                  name: "n",
                  initializer: {
                    kind: "binop",
                    loc: [24, 34, 24, 52],
                    left: {
                      kind: "()",
                      loc: [24, 34, 24, 45],
                      expression: {
                        kind: ".",
                        loc: [24, 34, 24, 43],
                        expression: {
                          kind: "id",
                          loc: [24, 34, 24, 39],
                          text: "count",
                          bindingKey: "count$h5jruxcfnavr$0",
                        },
                        name: "get",
                      },
                      arguments: [],
                    },
                    operatorToken: "+",
                    right: {
                      kind: "number",
                      loc: [24, 48, 24, 52],
                      value: 1000,
                    },
                  },
                },
              ],
              children: [],
            }),
          ),
        }),
        params: ["count$h5jruxcfnavr$0", "Badge$h5jruxcfnavr$1"],
      },
      $0splice3: {
        value: cs.create(
          [26, 11, 28, 16],
          {
            version: "0.0.0",
            filePath: "render/script-bound-tag-capture.test.tsx",
            fileHash: "h5jruxcfnavr",
            splices: { $For: { value: For, params: [] } },
            captures: ["Badge$h5jruxcfnavr$1", "count$h5jruxcfnavr$0"],
          },
          () => ({
            kind: "jsx",
            loc: [26, 14, 28, 15],
            type: {
              kind: "splice",
              loc: [26, 15, 26, 18],
              key: "$For",
            },
            attributes: [
              {
                name: "each",
                initializer: {
                  kind: "arr",
                  loc: [26, 25, 26, 31],
                  elements: [
                    {
                      kind: "number",
                      loc: [26, 26, 26, 27],
                      value: 1,
                    },
                    {
                      kind: "number",
                      loc: [26, 29, 26, 30],
                      value: 2,
                    },
                  ],
                },
              },
            ],
            children: [
              {
                kind: "=>",
                loc: [27, 12, 27, 56],
                parameters: [
                  {
                    kind: "param",
                    loc: [27, 13, 27, 22],
                    name: {
                      kind: "id",
                      loc: [27, 13, 27, 14],
                      text: "m",
                      bindingKey: "m$h5jruxcfnavr$4",
                    },
                  },
                ],
                body: {
                  kind: "jsx",
                  loc: [27, 27, 27, 56],
                  type: {
                    kind: "id",
                    loc: [27, 28, 27, 33],
                    text: "Badge",
                    bindingKey: "Badge$h5jruxcfnavr$1",
                  },
                  attributes: [
                    {
                      name: "n",
                      initializer: {
                        kind: "binop",
                        loc: [27, 37, 27, 52],
                        left: {
                          kind: "id",
                          loc: [27, 37, 27, 38],
                          text: "m",
                          bindingKey: "m$h5jruxcfnavr$4",
                        },
                        operatorToken: "*",
                        right: {
                          kind: "()",
                          loc: [27, 41, 27, 52],
                          expression: {
                            kind: ".",
                            loc: [27, 41, 27, 50],
                            expression: {
                              kind: "id",
                              loc: [27, 41, 27, 46],
                              text: "count",
                              bindingKey: "count$h5jruxcfnavr$0",
                            },
                            name: "get",
                          },
                          arguments: [],
                        },
                      },
                    },
                  ],
                  children: [],
                },
              },
            ],
          }),
        ),
        params: ["count$h5jruxcfnavr$0", "Badge$h5jruxcfnavr$1"],
      },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [11, 34, 33, 2],
    statements: [
      {
        kind: "const",
        loc: [12, 3, 12, 27],
        name: {
          kind: "id",
          loc: [12, 9, 12, 14],
          text: "count",
          bindingKey: "count$h5jruxcfnavr$0",
        },
        initializer: {
          kind: "()",
          loc: [12, 17, 12, 26],
          expression: {
            kind: "splice",
            loc: [12, 17, 12, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [12, 24, 12, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [13, 3, 13, 67],
        name: {
          kind: "id",
          loc: [13, 9, 13, 14],
          text: "Badge",
          bindingKey: "Badge$h5jruxcfnavr$1",
        },
        initializer: {
          kind: "=>",
          loc: [13, 17, 13, 66],
          parameters: [
            {
              kind: "param",
              loc: [13, 18, 13, 38],
              name: {
                kind: "id",
                loc: [13, 18, 13, 23],
                text: "props",
                bindingKey: "props$h5jruxcfnavr$2",
              },
            },
          ],
          body: {
            kind: "jsx",
            loc: [13, 43, 13, 66],
            type: {
              kind: "string",
              loc: [13, 44, 13, 45],
              text: "b",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [13, 47, 13, 61],
                left: {
                  kind: "string",
                  loc: [13, 47, 13, 51],
                  text: "n ",
                },
                operatorToken: "+",
                right: {
                  kind: ".",
                  loc: [13, 54, 13, 61],
                  expression: {
                    kind: "id",
                    loc: [13, 54, 13, 59],
                    text: "props",
                    bindingKey: "props$h5jruxcfnavr$2",
                  },
                  name: "n",
                },
              },
            ],
          },
        },
      },
      {
        kind: "return",
        loc: [15, 3, 32, 5],
        expression: {
          kind: "jsx",
          loc: [16, 5, 31, 11],
          type: {
            kind: "string",
            loc: [16, 6, 16, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "splice",
              loc: [17, 8, 17, 40],
              key: "$0splice0",
            },
            {
              kind: "splice",
              loc: [19, 9, 22, 12],
              key: "$0splice1",
            },
            {
              kind: "splice",
              loc: [24, 8, 24, 70],
              key: "$0splice2",
            },
            {
              kind: "splice",
              loc: [26, 9, 28, 17],
              key: "$0splice3",
            },
            {
              kind: "jsx",
              loc: [30, 7, 30, 71],
              type: {
                kind: "string",
                loc: [30, 8, 30, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [30, 24, 30, 56],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [30, 30, 30, 56],
                      expression: {
                        kind: ".",
                        loc: [30, 30, 30, 39],
                        expression: {
                          kind: "id",
                          loc: [30, 30, 30, 35],
                          text: "count",
                          bindingKey: "count$h5jruxcfnavr$0",
                        },
                        name: "set",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [30, 40, 30, 55],
                          left: {
                            kind: "()",
                            loc: [30, 40, 30, 51],
                            expression: {
                              kind: ".",
                              loc: [30, 40, 30, 49],
                              expression: {
                                kind: "id",
                                loc: [30, 40, 30, 45],
                                text: "count",
                                bindingKey: "count$h5jruxcfnavr$0",
                              },
                              name: "get",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [30, 54, 30, 55],
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
                  loc: [30, 58, 30, 62],
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
it("scriptBoundTagCapture", async (t) => {
  await snapshotCase(t, "scriptBoundTagCapture", scriptBoundTagCapture);
});
describe("a tag naming a function the script holds", () => {
  it("calls one an enclosing script holds, however the call is nested", async () => {
    const { container } = await render(scriptBoundTagCapture);
    const badges = () => [...container.querySelectorAll("b")];
    const before = badges();
    const texts = () => badges().map((b) => b.textContent);
    assert.deepEqual(texts(), ["n 0", "n 100", "n 1000", "n 0", "n 0"]);
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.deepEqual(texts(), ["n 1", "n 101", "n 1001", "n 1", "n 2"]);
    assert.deepEqual(badges(), before, "the same <b>s");
  });
});
