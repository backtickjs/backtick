import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { bundler } from "@backtickjs/bundler";
import { cs, state, vm } from "@backtickjs/core";
import { window } from "@backtickjs/web-sdk";
import { render, screen } from "@backtickjs/web-testing";
import { settled } from "../render/dom.ts";
import { snapshotCase } from "../snapshotCase.ts";
// A component is built once, however what it drew changes afterwards.
//
// `insert` reads what it was given inside the computation it makes, so a member
// that answers with a way of asking used to tie the two together: what it drew
// changing ran the expression that made it, which was the component again —
// with new cells, and whatever it did on the way in done over.
//
// Two of them answer that way: a bundle drawn where it stands, which is this
// file, and a list, which `render/for-builds-once.test.tsx` covers. The list is
// the one that says where the fault was — a drawn bundle is not special, so
// neither is the fix.
//
// Driven rather than snapshotted, because what is wrong is not what was drawn
// but how many times it was: a drawing that settles and one that never does
// look the same in a snapshot of either.
// A component that draws a bundle it is still waiting for.
//
// What this pins is that it is built once. `insert` reads what it was given
// inside the computation it makes, so a drawing that watches itself used to tie
// the two together: the answer arriving changed the drawing, which ran the
// expression that made it, which was this component again — new cells, and the
// wait started over.
//
// The condition stands under `<>`, where a child position watches it: at the
// block's root it would be read once, when the block ran.
//
// `asked` is the page's, so it survives a rebuild and counts them. It also ends
// one: once it stops answering, a write of `null` over `null` changes nothing
// and nothing runs again — a loop that would otherwise have no end.
async function Answer() {
  return cs.create(
    [42, 10, 42, 35],
    {
      version: "0.0.0",
      filePath: "vm-eval/vm-eval-builds-once.test.tsx",
      fileHash: "1fnjq82l0oo0w",
      splices: {},
      captures: [],
    },
    () => ({
      kind: "jsx",
      loc: [42, 13, 42, 34],
      type: {
        kind: "string",
        loc: [42, 14, 42, 16],
        text: "em",
      },
      attributes: [],
      children: [
        {
          kind: "string",
          loc: [42, 18, 42, 28],
          text: "answered",
        },
      ],
    }),
  );
}
const answer = await bundler.run(_jsx(Answer, {}));
async function Waiting({ ask }) {
  return cs.create(
    [52, 10, 62, 5],
    {
      version: "0.0.0",
      filePath: "vm-eval/vm-eval-builds-once.test.tsx",
      fileHash: "1fnjq82l0oo0w",
      splices: {
        $state: { value: state, params: [] },
        $window: { value: window, params: [] },
        $ask: { value: ask, params: [] },
        $vm: { value: vm, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [52, 13, 62, 4],
      statements: [
        {
          kind: "const",
          loc: [53, 5, 53, 64],
          name: {
            kind: "id",
            loc: [53, 11, 53, 16],
            text: "drawn",
            bindingKey: "drawn$1fnjq82l0oo0w$0",
          },
          initializer: {
            kind: "()",
            loc: [53, 19, 53, 63],
            expression: {
              kind: "splice",
              loc: [53, 19, 53, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "null",
                loc: [53, 58, 53, 62],
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [54, 5, 54, 68],
          name: {
            kind: "id",
            loc: [54, 11, 54, 18],
            text: "started",
            bindingKey: "started$1fnjq82l0oo0w$1",
          },
          initializer: {
            kind: "()",
            loc: [54, 21, 54, 67],
            expression: {
              kind: ".",
              loc: [54, 21, 54, 39],
              expression: {
                kind: "splice",
                loc: [54, 21, 54, 28],
                key: "$window",
              },
              name: "setTimeout",
            },
            arguments: [
              {
                kind: "=>",
                loc: [54, 40, 54, 63],
                parameters: [],
                body: {
                  kind: "()",
                  loc: [54, 46, 54, 63],
                  expression: {
                    kind: ".",
                    loc: [54, 46, 54, 55],
                    expression: {
                      kind: "id",
                      loc: [54, 46, 54, 51],
                      text: "drawn",
                      bindingKey: "drawn$1fnjq82l0oo0w$0",
                    },
                    name: "set",
                  },
                  arguments: [
                    {
                      kind: "()",
                      loc: [54, 56, 54, 62],
                      expression: {
                        kind: "splice",
                        loc: [54, 56, 54, 60],
                        key: "$ask",
                      },
                      arguments: [],
                    },
                  ],
                },
              },
              {
                kind: "number",
                loc: [54, 65, 54, 66],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [55, 5, 61, 7],
          expression: {
            kind: "jsx",
            loc: [56, 7, 60, 10],
            type: {
              kind: "string",
              loc: [56, 7, 60, 10],
              text: "Fragment",
            },
            attributes: [],
            children: [
              {
                kind: "?:",
                loc: [57, 10, 59, 61],
                condition: {
                  kind: "binop",
                  loc: [57, 10, 57, 30],
                  left: {
                    kind: "()",
                    loc: [57, 10, 57, 21],
                    expression: {
                      kind: ".",
                      loc: [57, 10, 57, 19],
                      expression: {
                        kind: "id",
                        loc: [57, 10, 57, 15],
                        text: "drawn",
                        bindingKey: "drawn$1fnjq82l0oo0w$0",
                      },
                      name: "get",
                    },
                    arguments: [],
                  },
                  operatorToken: "===",
                  right: {
                    kind: "null",
                    loc: [57, 26, 57, 30],
                  },
                },
                whenTrue: {
                  kind: "null",
                  loc: [58, 13, 58, 17],
                },
                whenFalse: {
                  kind: "()",
                  loc: [59, 13, 59, 61],
                  expression: {
                    kind: ".",
                    loc: [59, 13, 59, 21],
                    expression: {
                      kind: "splice",
                      loc: [59, 13, 59, 16],
                      key: "$vm",
                    },
                    name: "eval",
                  },
                  arguments: [
                    {
                      kind: "()",
                      loc: [59, 22, 59, 33],
                      expression: {
                        kind: ".",
                        loc: [59, 22, 59, 31],
                        expression: {
                          kind: "id",
                          loc: [59, 22, 59, 27],
                          text: "drawn",
                          bindingKey: "drawn$1fnjq82l0oo0w$0",
                        },
                        name: "get",
                      },
                      arguments: [],
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
const vmEvalBuildsOnce = cs.create(
  [65, 26, 79, 3],
  {
    version: "0.0.0",
    filePath: "vm-eval/vm-eval-builds-once.test.tsx",
    fileHash: "1fnjq82l0oo0w",
    splices: {
      $state: { value: state, params: [] },
      $answer: { value: answer, params: [] },
      $Waiting: { value: Waiting, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [65, 29, 79, 2],
    statements: [
      {
        kind: "const",
        loc: [66, 3, 66, 27],
        name: {
          kind: "id",
          loc: [66, 9, 66, 14],
          text: "asked",
          bindingKey: "asked$1fnjq82l0oo0w$2",
        },
        initializer: {
          kind: "()",
          loc: [66, 17, 66, 26],
          expression: {
            kind: "splice",
            loc: [66, 17, 66, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [66, 24, 66, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "return",
        loc: [68, 3, 78, 5],
        expression: {
          kind: "jsx",
          loc: [69, 5, 77, 11],
          type: {
            kind: "string",
            loc: [69, 6, 69, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [70, 7, 70, 44],
              type: {
                kind: "string",
                loc: [70, 8, 70, 12],
                text: "span",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [70, 14, 70, 36],
                  left: {
                    kind: "string",
                    loc: [70, 14, 70, 22],
                    text: "asked ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "()",
                    loc: [70, 25, 70, 36],
                    expression: {
                      kind: ".",
                      loc: [70, 25, 70, 34],
                      expression: {
                        kind: "id",
                        loc: [70, 25, 70, 30],
                        text: "asked",
                        bindingKey: "asked$1fnjq82l0oo0w$2",
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
              loc: [71, 7, 76, 9],
              type: {
                kind: "splice",
                loc: [71, 8, 71, 15],
                key: "$Waiting",
              },
              attributes: [
                {
                  name: "ask",
                  initializer: {
                    kind: "=>",
                    loc: [72, 14, 75, 10],
                    parameters: [],
                    body: {
                      kind: "{}",
                      loc: [72, 20, 75, 10],
                      statements: [
                        {
                          kind: "()",
                          loc: [73, 11, 73, 37],
                          expression: {
                            kind: ".",
                            loc: [73, 11, 73, 20],
                            expression: {
                              kind: "id",
                              loc: [73, 11, 73, 16],
                              text: "asked",
                              bindingKey: "asked$1fnjq82l0oo0w$2",
                            },
                            name: "set",
                          },
                          arguments: [
                            {
                              kind: "binop",
                              loc: [73, 21, 73, 36],
                              left: {
                                kind: "()",
                                loc: [73, 21, 73, 32],
                                expression: {
                                  kind: ".",
                                  loc: [73, 21, 73, 30],
                                  expression: {
                                    kind: "id",
                                    loc: [73, 21, 73, 26],
                                    text: "asked",
                                    bindingKey: "asked$1fnjq82l0oo0w$2",
                                  },
                                  name: "get",
                                },
                                arguments: [],
                              },
                              operatorToken: "+",
                              right: {
                                kind: "number",
                                loc: [73, 35, 73, 36],
                                value: 1,
                              },
                            },
                          ],
                        },
                        {
                          kind: "return",
                          loc: [74, 11, 74, 51],
                          expression: {
                            kind: "?:",
                            loc: [74, 18, 74, 50],
                            condition: {
                              kind: "binop",
                              loc: [74, 18, 74, 33],
                              left: {
                                kind: "()",
                                loc: [74, 18, 74, 29],
                                expression: {
                                  kind: ".",
                                  loc: [74, 18, 74, 27],
                                  expression: {
                                    kind: "id",
                                    loc: [74, 18, 74, 23],
                                    text: "asked",
                                    bindingKey: "asked$1fnjq82l0oo0w$2",
                                  },
                                  name: "get",
                                },
                                arguments: [],
                              },
                              operatorToken: ">",
                              right: {
                                kind: "number",
                                loc: [74, 32, 74, 33],
                                value: 4,
                              },
                            },
                            whenTrue: {
                              kind: "null",
                              loc: [74, 36, 74, 40],
                            },
                            whenFalse: {
                              kind: "splice",
                              loc: [74, 43, 74, 50],
                              key: "$answer",
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
it("vmEvalBuildsOnce", async (t) => {
  await snapshotCase(t, "vmEvalBuildsOnce", vmEvalBuildsOnce);
});
describe("a component that draws a bundle", () => {
  it("is built once, and draws what arrives", async () => {
    await render(vmEvalBuildsOnce);
    // Nothing to draw yet, and the wait has not been made twice.
    assert.ok(screen.getByText("asked 0"));
    assert.equal(screen.queryByText("answered"), null);
    await settled();
    assert.ok(screen.getByText("answered"));
    assert.ok(
      screen.queryByText("asked 1"),
      "the component was built again for what it drew",
    );
  });
});
