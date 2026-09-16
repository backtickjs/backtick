import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, state, vm } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A tag naming a function the script holds — here a bundle that takes props,
// evaluated. It is called with its props read on access, the way a component's
// are, so `count` follows the cell without the badge being drawn again.
const badge = await bundler.run(
  cs.create(
    [13, 3, 13, 68],
    {
      version: "0.0.0",
      filePath: "render/script-bound-tag.test.tsx",
      fileHash: "cps5qme0xuqv",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "=>",
      loc: [13, 6, 13, 67],
      parameters: [
        {
          kind: "param",
          loc: [13, 7, 13, 31],
          name: {
            kind: "id",
            loc: [13, 7, 13, 12],
            text: "props",
            bindingKey: "props$cps5qme0xuqv$0",
          },
        },
      ],
      body: {
        kind: "jsx",
        loc: [13, 36, 13, 67],
        type: {
          kind: "string",
          loc: [13, 37, 13, 38],
          text: "b",
        },
        attributes: [],
        children: [
          {
            kind: "binop",
            loc: [13, 40, 13, 62],
            left: {
              kind: "string",
              loc: [13, 40, 13, 48],
              text: "count ",
            },
            operatorToken: "+",
            right: {
              kind: ".",
              loc: [13, 51, 13, 62],
              expression: {
                kind: "id",
                loc: [13, 51, 13, 56],
                text: "props",
                bindingKey: "props$cps5qme0xuqv$0",
              },
              name: "count",
            },
          },
        ],
      },
    }),
  ),
);
const scriptBoundTag = cs.create(
  [16, 24, 26, 3],
  {
    version: "0.0.0",
    filePath: "render/script-bound-tag.test.tsx",
    fileHash: "cps5qme0xuqv",
    splices: {
      $state: { value: state, params: [] },
      $vm: { value: vm, params: [] },
      $badge: { value: badge, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [16, 27, 26, 2],
    statements: [
      {
        kind: "const",
        loc: [17, 3, 17, 27],
        name: {
          kind: "id",
          loc: [17, 9, 17, 14],
          text: "count",
          bindingKey: "count$cps5qme0xuqv$1",
        },
        initializer: {
          kind: "()",
          loc: [17, 17, 17, 26],
          expression: {
            kind: "splice",
            loc: [17, 17, 17, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [17, 24, 17, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [18, 3, 18, 34],
        name: {
          kind: "id",
          loc: [18, 9, 18, 14],
          text: "Badge",
          bindingKey: "Badge$cps5qme0xuqv$2",
        },
        initializer: {
          kind: "()",
          loc: [18, 17, 18, 33],
          expression: {
            kind: ".",
            loc: [18, 17, 18, 25],
            expression: {
              kind: "splice",
              loc: [18, 17, 18, 20],
              key: "$vm",
            },
            name: "eval",
          },
          arguments: [
            {
              kind: "splice",
              loc: [18, 26, 18, 32],
              key: "$badge",
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [20, 3, 25, 5],
        expression: {
          kind: "jsx",
          loc: [21, 5, 24, 11],
          type: {
            kind: "string",
            loc: [21, 6, 21, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [22, 7, 22, 37],
              type: {
                kind: "id",
                loc: [22, 8, 22, 13],
                text: "Badge",
                bindingKey: "Badge$cps5qme0xuqv$2",
              },
              attributes: [
                {
                  name: "count",
                  initializer: {
                    kind: "()",
                    loc: [22, 21, 22, 33],
                    expression: {
                      kind: ".",
                      loc: [22, 21, 22, 31],
                      expression: {
                        kind: "id",
                        loc: [22, 21, 22, 26],
                        text: "count",
                        bindingKey: "count$cps5qme0xuqv$1",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                },
              ],
              children: [],
            },
            {
              kind: "jsx",
              loc: [23, 7, 23, 74],
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
                    loc: [23, 24, 23, 59],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [23, 30, 23, 59],
                      expression: {
                        kind: ".",
                        loc: [23, 30, 23, 41],
                        expression: {
                          kind: "id",
                          loc: [23, 30, 23, 35],
                          text: "count",
                          bindingKey: "count$cps5qme0xuqv$1",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [23, 42, 23, 58],
                          left: {
                            kind: "()",
                            loc: [23, 42, 23, 54],
                            expression: {
                              kind: ".",
                              loc: [23, 42, 23, 52],
                              expression: {
                                kind: "id",
                                loc: [23, 42, 23, 47],
                                text: "count",
                                bindingKey: "count$cps5qme0xuqv$1",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [23, 57, 23, 58],
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
                  loc: [23, 61, 23, 65],
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
it("scriptBoundTag", async (t) => {
  await snapshotCase(t, "scriptBoundTag", scriptBoundTag);
});
describe("a tag naming a function the script holds", () => {
  it("keeps a prop live without drawing the function again", async () => {
    await render(scriptBoundTag);
    const badge = screen.getByText("count 0");
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(
      screen.getByText("count 1"),
      badge,
      "the same <b>, updated rather than drawn again",
    );
  });
});
