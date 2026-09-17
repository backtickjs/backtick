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
    fileHash: "1brs7fv34j5dk",
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
          bindingKey: "xs$1brs7fv34j5dk$0",
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
          bindingKey: "shown$1brs7fv34j5dk$1",
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
                  loc: [19, 9, 19, 80],
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
                        loc: [19, 20, 19, 28],
                        expression: {
                          kind: ".",
                          loc: [19, 20, 19, 26],
                          expression: {
                            kind: "id",
                            loc: [19, 20, 19, 22],
                            text: "xs",
                            bindingKey: "xs$1brs7fv34j5dk$0",
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
                      loc: [19, 31, 19, 73],
                      parameters: [
                        {
                          kind: "param",
                          loc: [19, 32, 19, 41],
                          name: {
                            kind: "id",
                            loc: [19, 32, 19, 33],
                            text: "x",
                            bindingKey: "x$1brs7fv34j5dk$2",
                          },
                        },
                      ],
                      body: {
                        kind: "jsx",
                        loc: [19, 46, 19, 73],
                        type: {
                          kind: "string",
                          loc: [19, 47, 19, 52],
                          text: "title",
                        },
                        attributes: [],
                        children: [
                          {
                            kind: "binop",
                            loc: [19, 54, 19, 64],
                            left: {
                              kind: "string",
                              loc: [19, 54, 19, 60],
                              text: "dot ",
                            },
                            operatorToken: "+",
                            right: {
                              kind: "id",
                              loc: [19, 63, 19, 64],
                              text: "x",
                              bindingKey: "x$1brs7fv34j5dk$2",
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
                {
                  kind: "?:",
                  loc: [20, 10, 20, 55],
                  condition: {
                    kind: "()",
                    loc: [20, 10, 20, 21],
                    expression: {
                      kind: ".",
                      loc: [20, 10, 20, 19],
                      expression: {
                        kind: "id",
                        loc: [20, 10, 20, 15],
                        text: "shown",
                        bindingKey: "shown$1brs7fv34j5dk$1",
                      },
                      name: "get",
                    },
                    arguments: [],
                  },
                  whenTrue: {
                    kind: "jsx",
                    loc: [20, 24, 20, 48],
                    type: {
                      kind: "string",
                      loc: [20, 25, 20, 30],
                      text: "title",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "string",
                        loc: [20, 32, 20, 39],
                        text: "shown",
                      },
                    ],
                  },
                  whenFalse: {
                    kind: "null",
                    loc: [20, 51, 20, 55],
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
              loc: [23, 7, 23, 60],
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
                    loc: [23, 24, 23, 46],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [23, 30, 23, 46],
                      expression: {
                        kind: ".",
                        loc: [23, 30, 23, 36],
                        expression: {
                          kind: "id",
                          loc: [23, 30, 23, 32],
                          text: "xs",
                          bindingKey: "xs$1brs7fv34j5dk$0",
                        },
                        name: "set",
                      },
                      arguments: [
                        {
                          kind: "arr",
                          loc: [23, 37, 23, 45],
                          elements: [
                            {
                              kind: "number",
                              loc: [23, 38, 23, 40],
                              value: 10,
                            },
                            {
                              kind: "number",
                              loc: [23, 42, 23, 44],
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
                  loc: [23, 48, 23, 51],
                  text: "add",
                },
              ],
            },
            {
              kind: "jsx",
              loc: [24, 7, 24, 60],
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
                    loc: [24, 24, 24, 45],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [24, 30, 24, 45],
                      expression: {
                        kind: ".",
                        loc: [24, 30, 24, 39],
                        expression: {
                          kind: "id",
                          loc: [24, 30, 24, 35],
                          text: "shown",
                          bindingKey: "shown$1brs7fv34j5dk$1",
                        },
                        name: "set",
                      },
                      arguments: [
                        {
                          kind: "true",
                          loc: [24, 40, 24, 44],
                        },
                      ],
                    },
                  },
                },
              ],
              children: [
                {
                  kind: "string",
                  loc: [24, 47, 24, 51],
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
