import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { namespaced } from "./dom.ts";
// Drawn after the first pass: a row the list adds on a write, and a `title` a
// condition shows, are SVG's because of where they stand, and the `title` after
// the `svg` is HTML's again.
const svgNamespaceLater = cs.create(
  [12, 27, 27, 3],
  {
    version: "0.0.0",
    filePath: "render/svg-namespace-later.test.tsx",
    fileHash: "pkpgemweira2",
    splices: {
      $state: { value: state, params: [] },
      $For: { value: For, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [12, 30, 27, 2],
    statements: [
      {
        kind: "const",
        loc: [13, 3, 13, 27],
        name: {
          kind: "id",
          loc: [13, 9, 13, 11],
          text: "xs",
          bindingKey: "xs$pkpgemweira2$0",
        },
        initializer: {
          kind: "()",
          loc: [13, 14, 13, 26],
          expression: {
            kind: "splice",
            loc: [13, 14, 13, 20],
            key: "$state",
          },
          arguments: [
            {
              kind: "arr",
              loc: [13, 21, 13, 25],
              elements: [
                {
                  kind: "number",
                  loc: [13, 22, 13, 24],
                  value: 10,
                },
              ],
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [14, 3, 14, 31],
        name: {
          kind: "id",
          loc: [14, 9, 14, 14],
          text: "shown",
          bindingKey: "shown$pkpgemweira2$1",
        },
        initializer: {
          kind: "()",
          loc: [14, 17, 14, 30],
          expression: {
            kind: "splice",
            loc: [14, 17, 14, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "false",
              loc: [14, 24, 14, 29],
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [16, 3, 26, 5],
        expression: {
          kind: "jsx",
          loc: [17, 5, 25, 11],
          type: {
            kind: "string",
            loc: [17, 6, 17, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [18, 7, 21, 13],
              type: {
                kind: "string",
                loc: [18, 8, 18, 11],
                text: "svg",
              },
              attributes: [
                {
                  name: "viewBox",
                  initializer: {
                    kind: "string",
                    loc: [18, 20, 18, 31],
                    text: "0 0 30 10",
                  },
                },
              ],
              children: [
                {
                  kind: "jsx",
                  loc: [19, 9, 19, 81],
                  type: {
                    kind: "splice",
                    loc: [19, 10, 19, 13],
                    key: "$For",
                  },
                  attributes: [
                    {
                      name: "each",
                      initializer: {
                        kind: "()",
                        loc: [19, 20, 19, 29],
                        expression: {
                          kind: ".",
                          loc: [19, 20, 19, 27],
                          expression: {
                            kind: "id",
                            loc: [19, 20, 19, 22],
                            text: "xs",
                            bindingKey: "xs$pkpgemweira2$0",
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
                      loc: [19, 32, 19, 74],
                      parameters: [
                        {
                          kind: "param",
                          loc: [19, 33, 19, 42],
                          name: {
                            kind: "id",
                            loc: [19, 33, 19, 34],
                            text: "x",
                            bindingKey: "x$pkpgemweira2$2",
                          },
                        },
                      ],
                      body: {
                        kind: "jsx",
                        loc: [19, 47, 19, 74],
                        type: {
                          kind: "string",
                          loc: [19, 48, 19, 53],
                          text: "title",
                        },
                        attributes: [],
                        children: [
                          {
                            kind: "binop",
                            loc: [19, 55, 19, 65],
                            left: {
                              kind: "string",
                              loc: [19, 55, 19, 61],
                              text: "dot ",
                            },
                            operatorToken: "+",
                            right: {
                              kind: "id",
                              loc: [19, 64, 19, 65],
                              text: "x",
                              bindingKey: "x$pkpgemweira2$2",
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  kind: "?:",
                  loc: [20, 10, 20, 56],
                  condition: {
                    kind: "()",
                    loc: [20, 10, 20, 22],
                    expression: {
                      kind: ".",
                      loc: [20, 10, 20, 20],
                      expression: {
                        kind: "id",
                        loc: [20, 10, 20, 15],
                        text: "shown",
                        bindingKey: "shown$pkpgemweira2$1",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                  whenTrue: {
                    kind: "jsx",
                    loc: [20, 25, 20, 49],
                    type: {
                      kind: "string",
                      loc: [20, 26, 20, 31],
                      text: "title",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "string",
                        loc: [20, 33, 20, 40],
                        text: "shown",
                      },
                    ],
                  },
                  whenFalse: {
                    kind: "null",
                    loc: [20, 52, 20, 56],
                  },
                },
              ],
            },
            {
              kind: "jsx",
              loc: [22, 7, 22, 31],
              type: {
                kind: "string",
                loc: [22, 8, 22, 13],
                text: "title",
              },
              attributes: [],
              children: [
                {
                  kind: "string",
                  loc: [22, 15, 22, 22],
                  text: "after",
                },
              ],
            },
            {
              kind: "jsx",
              loc: [23, 7, 23, 62],
              type: {
                kind: "string",
                loc: [23, 8, 23, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [23, 24, 23, 48],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [23, 30, 23, 48],
                      expression: {
                        kind: ".",
                        loc: [23, 30, 23, 38],
                        expression: {
                          kind: "id",
                          loc: [23, 30, 23, 32],
                          text: "xs",
                          bindingKey: "xs$pkpgemweira2$0",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "arr",
                          loc: [23, 39, 23, 47],
                          elements: [
                            {
                              kind: "number",
                              loc: [23, 40, 23, 42],
                              value: 10,
                            },
                            {
                              kind: "number",
                              loc: [23, 44, 23, 46],
                              value: 20,
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
                  kind: "string",
                  loc: [23, 50, 23, 53],
                  text: "add",
                },
              ],
            },
            {
              kind: "jsx",
              loc: [24, 7, 24, 62],
              type: {
                kind: "string",
                loc: [24, 8, 24, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [24, 24, 24, 47],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [24, 30, 24, 47],
                      expression: {
                        kind: ".",
                        loc: [24, 30, 24, 41],
                        expression: {
                          kind: "id",
                          loc: [24, 30, 24, 35],
                          text: "shown",
                          bindingKey: "shown$pkpgemweira2$1",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "true",
                          loc: [24, 42, 24, 46],
                        },
                      ],
                    },
                  },
                },
              ],
              children: [
                {
                  kind: "string",
                  loc: [24, 49, 24, 53],
                  text: "show",
                },
              ],
            },
          ],
        },
      },
    ],
  }),
);
it("svgNamespaceLater", async (t) => {
  await snapshotCase(t, "svgNamespaceLater", svgNamespaceLater);
});
describe("an element's namespace", () => {
  // Nothing walks down from the top when a list or a condition draws again, so
  // what it draws has to have kept the namespace from the first pass.
  it("is kept by what draws again later", async () => {
    const { container } = await render(svgNamespaceLater);
    assert.deepEqual(namespaced(container).sort(), [
      "button",
      "button",
      "div",
      "svg:svg",
      "svg:title",
      "title",
    ]);
    // What the two writes added, which is the claim: a title drawn later is
    // still SVG's, and the one beside it is still HTML's.
    const before = namespaced(container).sort();
    await userEvent.click(screen.getByRole("button", { name: "add" }));
    await userEvent.click(screen.getByRole("button", { name: "show" }));
    assert.deepEqual(added(before, namespaced(container).sort()), [
      "svg:title",
      "svg:title",
    ]);
  });
  // What the second list holds that the first did not, counting duplicates.
  function added(before, after) {
    const held = [...before];
    return after.filter((tag) => {
      const at = held.indexOf(tag);
      if (at === -1) {
        return true;
      }
      held.splice(at, 1);
      return false;
    });
  }
});
