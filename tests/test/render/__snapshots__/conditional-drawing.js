import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { window } from "@backtickjs/web-sdk";
import { render, screen } from "@backtickjs/web-testing";
import { snapshotCase } from "../snapshotCase.ts";
// A block whose drawing is a conditional, and a write that answers it.
//
// Two claims, because a fix that only meets one is worse than none: the
// component is built once, and what it draws changes. Stopping the rebuild by
// never running the block again would pass the first and leave the page on the
// branch it started with.
// A component whose whole drawing is a conditional on a cell of its own, which
// something writes once from outside the block.
//
// The fragment is what makes this work, and it is why a drawing answers with an
// element: a conditional standing at a block's root has nowhere to be watched,
// so `insert` reads it inside the computation it makes — and the write that
// answers the condition re-runs that computation, which is this component
// again, with a cell that has never been written and a timer that has never
// fired. Under `<>` the conditional is a child, and a child position owns a
// computation of its own.
//
// `builds` is the page's, so it survives a rebuild and counts them. It also
// ends one: once it stops saying yes, nothing is written and nothing runs
// again. Without that, this case does not stop.
async function Held({ again }) {
  return cs.create(
    [31, 10, 41, 5],
    {
      version: "0.0.0",
      filePath: "render/conditional-drawing.test.tsx",
      fileHash: "3j6zwb92hg5s",
      splices: {
        $state: { value: state, params: [] },
        $window: { value: window, params: [] },
        $again: { value: again, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [31, 13, 41, 4],
      statements: [
        {
          kind: "const",
          loc: [32, 5, 32, 33],
          name: {
            kind: "id",
            loc: [32, 11, 32, 16],
            text: "shown",
            bindingKey: "shown$3j6zwb92hg5s$0",
          },
          initializer: {
            kind: "()",
            loc: [32, 19, 32, 32],
            expression: {
              kind: "splice",
              loc: [32, 19, 32, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "false",
                loc: [32, 26, 32, 31],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [34, 5, 38, 11],
          name: {
            kind: "id",
            loc: [34, 11, 34, 18],
            text: "started",
            bindingKey: "started$3j6zwb92hg5s$1",
          },
          initializer: {
            kind: "()",
            loc: [34, 21, 38, 10],
            expression: {
              kind: ".",
              loc: [34, 21, 34, 39],
              expression: {
                kind: "splice",
                loc: [34, 21, 34, 28],
                key: "$window",
              },
              name: "setTimeout",
            },
            arguments: [
              {
                kind: "=>",
                loc: [34, 40, 38, 6],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [34, 46, 38, 6],
                  statements: [
                    {
                      kind: "if",
                      loc: [35, 7, 37, 8],
                      expression: {
                        kind: "()",
                        loc: [35, 11, 35, 19],
                        expression: {
                          kind: "splice",
                          loc: [35, 11, 35, 17],
                          key: "$again",
                        },
                        arguments: [],
                      },
                      thenStatement: {
                        kind: "{}",
                        loc: [35, 21, 37, 8],
                        statements: [
                          {
                            kind: "()",
                            loc: [36, 9, 36, 26],
                            expression: {
                              kind: ".",
                              loc: [36, 9, 36, 20],
                              expression: {
                                kind: "id",
                                loc: [36, 9, 36, 14],
                                text: "shown",
                                bindingKey: "shown$3j6zwb92hg5s$0",
                              },
                              name: "write",
                            },
                            arguments: [
                              {
                                kind: "true",
                                loc: [36, 21, 36, 25],
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
                loc: [38, 8, 38, 9],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [40, 5, 40, 66],
          expression: {
            kind: "jsx",
            loc: [40, 12, 40, 65],
            type: {
              kind: "string",
              loc: [40, 12, 40, 65],
              text: "Fragment",
            },
            attributes: [],
            children: [
              {
                kind: "?:",
                loc: [40, 15, 40, 61],
                condition: {
                  kind: "()",
                  loc: [40, 15, 40, 27],
                  expression: {
                    kind: ".",
                    loc: [40, 15, 40, 25],
                    expression: {
                      kind: "id",
                      loc: [40, 15, 40, 20],
                      text: "shown",
                      bindingKey: "shown$3j6zwb92hg5s$0",
                    },
                    name: "read",
                  },
                  arguments: [],
                },
                whenTrue: {
                  kind: "jsx",
                  loc: [40, 30, 40, 44],
                  type: {
                    kind: "string",
                    loc: [40, 31, 40, 33],
                    text: "em",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "string",
                      loc: [40, 34, 40, 39],
                      text: "shown",
                    },
                  ],
                },
                whenFalse: {
                  kind: "jsx",
                  loc: [40, 47, 40, 61],
                  type: {
                    kind: "string",
                    loc: [40, 48, 40, 49],
                    text: "i",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "string",
                      loc: [40, 50, 40, 57],
                      text: "waiting",
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
const conditionalDrawing = cs.create(
  [44, 28, 60, 3],
  {
    version: "0.0.0",
    filePath: "render/conditional-drawing.test.tsx",
    fileHash: "3j6zwb92hg5s",
    splices: {
      $state: { value: state, params: [] },
      $Held: { value: Held, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [44, 31, 60, 2],
    statements: [
      {
        kind: "const",
        loc: [45, 3, 45, 28],
        name: {
          kind: "id",
          loc: [45, 9, 45, 15],
          text: "builds",
          bindingKey: "builds$3j6zwb92hg5s$2",
        },
        initializer: {
          kind: "()",
          loc: [45, 18, 45, 27],
          expression: {
            kind: "splice",
            loc: [45, 18, 45, 24],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [45, 25, 45, 26],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [47, 3, 59, 5],
        expression: {
          kind: "jsx",
          loc: [48, 5, 58, 11],
          type: {
            kind: "string",
            loc: [48, 6, 48, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [49, 7, 49, 47],
              type: {
                kind: "string",
                loc: [49, 8, 49, 12],
                text: "span",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [49, 14, 49, 39],
                  left: {
                    kind: "string",
                    loc: [49, 14, 49, 23],
                    text: "builds ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [49, 26, 49, 39],
                    expression: {
                      kind: ".",
                      loc: [49, 26, 49, 37],
                      expression: {
                        kind: "id",
                        loc: [49, 26, 49, 32],
                        text: "builds",
                        bindingKey: "builds$3j6zwb92hg5s$2",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                },
              ],
            },
            {
              kind: "jsx",
              loc: [50, 7, 57, 17],
              type: {
                kind: "string",
                loc: [50, 8, 50, 15],
                text: "section",
              },
              attributes: [],
              children: [
                {
                  kind: "jsx",
                  loc: [51, 9, 56, 11],
                  type: {
                    kind: "splice",
                    loc: [51, 10, 51, 14],
                    key: "$Held",
                  },
                  attributes: [
                    {
                      name: "again",
                      initializer: {
                        kind: "=>",
                        loc: [52, 18, 55, 12],
                        parameters: [],
                        body: {
                          kind: "{}",
                          loc: [52, 24, 55, 12],
                          statements: [
                            {
                              kind: "()",
                              loc: [53, 13, 53, 44],
                              expression: {
                                kind: ".",
                                loc: [53, 13, 53, 25],
                                expression: {
                                  kind: "id",
                                  loc: [53, 13, 53, 19],
                                  text: "builds",
                                  bindingKey: "builds$3j6zwb92hg5s$2",
                                },
                                name: "write",
                              },
                              arguments: [
                                {
                                  kind: "binop",
                                  loc: [53, 26, 53, 43],
                                  left: {
                                    kind: "()",
                                    loc: [53, 26, 53, 39],
                                    expression: {
                                      kind: ".",
                                      loc: [53, 26, 53, 37],
                                      expression: {
                                        kind: "id",
                                        loc: [53, 26, 53, 32],
                                        text: "builds",
                                        bindingKey: "builds$3j6zwb92hg5s$2",
                                      },
                                      name: "read",
                                    },
                                    arguments: [],
                                  },
                                  operatorToken: "+",
                                  right: {
                                    kind: "number",
                                    loc: [53, 42, 53, 43],
                                    value: 1,
                                  },
                                },
                              ],
                            },
                            {
                              kind: "return",
                              loc: [54, 13, 54, 38],
                              expression: {
                                kind: "binop",
                                loc: [54, 20, 54, 37],
                                left: {
                                  kind: "()",
                                  loc: [54, 20, 54, 33],
                                  expression: {
                                    kind: ".",
                                    loc: [54, 20, 54, 31],
                                    expression: {
                                      kind: "id",
                                      loc: [54, 20, 54, 26],
                                      text: "builds",
                                      bindingKey: "builds$3j6zwb92hg5s$2",
                                    },
                                    name: "read",
                                  },
                                  arguments: [],
                                },
                                operatorToken: "<",
                                right: {
                                  kind: "number",
                                  loc: [54, 36, 54, 37],
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
          ],
        },
      },
    ],
  }),
);
describe("a component whose drawing is a conditional", () => {
  it("is built once, and draws the branch the write chose", async () => {
    await render(conditionalDrawing);
    // Nothing has answered the condition yet: the count is of blocks that have
    // reached their timer, and the first has not.
    assert.ok(screen.getByText("builds 0"));
    assert.ok(screen.getByText("waiting"));
    // Long enough for the timer the component set, and for a component built
    // again to have set another.
    await new Promise((settle) => setTimeout(settle, 100));
    assert.ok(
      screen.queryByText("builds 1"),
      "the component was built again for what it drew",
    );
    assert.ok(
      screen.queryByText("shown"),
      "the conditional did not draw the branch the write chose",
    );
    assert.equal(screen.queryByText("waiting"), null);
  });
});
describe("what each case compiles and bundles to", () => {
  it("conditionalDrawing", async (t) => {
    await snapshotCase(t, "conditionalDrawing", conditionalDrawing);
  });
});
