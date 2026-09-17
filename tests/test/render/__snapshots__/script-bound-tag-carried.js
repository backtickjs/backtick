import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A host component whose script declares its own `Badge`, and draws what it was
// handed beside it.
async function Panel(props) {
  return cs.create(
    [12, 10, 20, 5],
    {
      version: "0.0.0",
      filePath: "render/script-bound-tag-carried.test.tsx",
      fileHash: "2nh9ihk3oddge",
      splices: { $props: { value: props, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [12, 13, 20, 4],
      statements: [
        {
          kind: "const",
          loc: [13, 5, 13, 65],
          name: {
            kind: "id",
            loc: [13, 11, 13, 16],
            text: "Badge",
            bindingKey: "Badge$2nh9ihk3oddge$0",
          },
          initializer: {
            kind: "=>",
            loc: [13, 19, 13, 64],
            parameters: [
              {
                kind: "param",
                loc: [13, 20, 13, 36],
                name: {
                  kind: "id",
                  loc: [13, 20, 13, 21],
                  text: "p",
                  bindingKey: "p$2nh9ihk3oddge$1",
                },
              },
            ],
            body: {
              kind: "jsx",
              loc: [13, 41, 13, 64],
              type: {
                kind: "string",
                loc: [13, 42, 13, 43],
                text: "i",
              },
              attributes: [],
              children: [
                {
                  kind: "binop",
                  loc: [13, 45, 13, 59],
                  left: {
                    kind: "string",
                    loc: [13, 45, 13, 53],
                    text: "panel ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: ".",
                    loc: [13, 56, 13, 59],
                    expression: {
                      kind: "id",
                      loc: [13, 56, 13, 57],
                      text: "p",
                      bindingKey: "p$2nh9ihk3oddge$1",
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
          loc: [14, 5, 19, 7],
          expression: {
            kind: "jsx",
            loc: [15, 7, 18, 17],
            type: {
              kind: "string",
              loc: [15, 8, 15, 15],
              text: "section",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [16, 9, 16, 24],
                type: {
                  kind: "id",
                  loc: [16, 10, 16, 15],
                  text: "Badge",
                  bindingKey: "Badge$2nh9ihk3oddge$0",
                },
                attributes: [
                  {
                    name: "n",
                    initializer: {
                      kind: "number",
                      loc: [16, 19, 16, 20],
                      value: 0,
                    },
                  },
                ],
                children: [],
              },
              {
                kind: ".",
                loc: [17, 10, 17, 21],
                expression: {
                  kind: "splice",
                  loc: [17, 10, 17, 16],
                  key: "$props",
                },
                name: "body",
              },
            ],
          },
        },
      ],
    }),
  );
}
// A script handed to `Panel` as a prop, naming a function the script around it
// holds. It lands inside `Panel`'s script, whose own `Badge` is in scope there
// — and still calls the one it was written under, since that is the binding it
// carries. The tag holds children too, read through the same record.
const scriptBoundTagCarried = cs.create(
  [27, 31, 48, 3],
  {
    version: "0.0.0",
    filePath: "render/script-bound-tag-carried.test.tsx",
    fileHash: "2nh9ihk3oddge",
    splices: {
      $state: { value: state, params: [] },
      $0splice0: {
        value: cs.create(
          [40, 13, 42, 20],
          {
            version: "0.0.0",
            filePath: "render/script-bound-tag-carried.test.tsx",
            fileHash: "2nh9ihk3oddge",
            splices: {},
            captures: ["Badge$2nh9ihk3oddge$3", "count$2nh9ihk3oddge$2"],
          },
          () => ({
            kind: "jsx",
            loc: [40, 16, 42, 19],
            type: {
              kind: "id",
              loc: [40, 17, 40, 22],
              text: "Badge",
              bindingKey: "Badge$2nh9ihk3oddge$3",
            },
            attributes: [
              {
                name: "n",
                initializer: {
                  kind: "()",
                  loc: [40, 26, 40, 37],
                  expression: {
                    kind: ".",
                    loc: [40, 26, 40, 35],
                    expression: {
                      kind: "id",
                      loc: [40, 26, 40, 31],
                      text: "count",
                      bindingKey: "count$2nh9ihk3oddge$2",
                    },
                    name: "get",
                  },
                  arguments: [],
                },
              },
            ],
            children: [
              {
                kind: "jsx",
                loc: [41, 13, 41, 42],
                type: {
                  kind: "string",
                  loc: [41, 14, 41, 15],
                  text: "u",
                },
                attributes: [],
                children: [
                  {
                    kind: "binop",
                    loc: [41, 17, 41, 37],
                    left: {
                      kind: "string",
                      loc: [41, 17, 41, 23],
                      text: "kid ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [41, 26, 41, 37],
                      expression: {
                        kind: ".",
                        loc: [41, 26, 41, 35],
                        expression: {
                          kind: "id",
                          loc: [41, 26, 41, 31],
                          text: "count",
                          bindingKey: "count$2nh9ihk3oddge$2",
                        },
                        name: "get",
                      },
                      arguments: [],
                    },
                  },
                ],
              },
            ],
          }),
        ),
        params: ["count$2nh9ihk3oddge$2", "Badge$2nh9ihk3oddge$3"],
      },
      $Panel: { value: Panel, params: [] },
    },
    captures: [],
  },
  () => ({
    kind: "{}",
    loc: [27, 34, 48, 2],
    statements: [
      {
        kind: "const",
        loc: [28, 3, 28, 27],
        name: {
          kind: "id",
          loc: [28, 9, 28, 14],
          text: "count",
          bindingKey: "count$2nh9ihk3oddge$2",
        },
        initializer: {
          kind: "()",
          loc: [28, 17, 28, 26],
          expression: {
            kind: "splice",
            loc: [28, 17, 28, 23],
            key: "$state",
          },
          arguments: [
            {
              kind: "number",
              loc: [28, 24, 28, 25],
              value: 0,
            },
          ],
        },
      },
      {
        kind: "const",
        loc: [29, 3, 34, 5],
        name: {
          kind: "id",
          loc: [29, 9, 29, 14],
          text: "Badge",
          bindingKey: "Badge$2nh9ihk3oddge$3",
        },
        initializer: {
          kind: "=>",
          loc: [29, 17, 34, 4],
          parameters: [
            {
              kind: "param",
              loc: [29, 18, 29, 61],
              name: {
                kind: "id",
                loc: [29, 18, 29, 19],
                text: "p",
                bindingKey: "p$2nh9ihk3oddge$4",
              },
            },
          ],
          body: {
            kind: "jsx",
            loc: [30, 5, 33, 9],
            type: {
              kind: "string",
              loc: [30, 6, 30, 7],
              text: "b",
            },
            attributes: [],
            children: [
              {
                kind: "binop",
                loc: [31, 8, 31, 22],
                left: {
                  kind: "string",
                  loc: [31, 8, 31, 16],
                  text: "outer ",
                },
                operatorToken: "+",
                right: {
                  kind: ".",
                  loc: [31, 19, 31, 22],
                  expression: {
                    kind: "id",
                    loc: [31, 19, 31, 20],
                    text: "p",
                    bindingKey: "p$2nh9ihk3oddge$4",
                  },
                  name: "n",
                },
              },
              {
                kind: ".",
                loc: [32, 8, 32, 18],
                expression: {
                  kind: "id",
                  loc: [32, 8, 32, 9],
                  text: "p",
                  bindingKey: "p$2nh9ihk3oddge$4",
                },
                name: "children",
              },
            ],
          },
        },
      },
      {
        kind: "return",
        loc: [36, 3, 47, 5],
        expression: {
          kind: "jsx",
          loc: [37, 5, 46, 11],
          type: {
            kind: "string",
            loc: [37, 6, 37, 9],
            text: "div",
          },
          attributes: [],
          children: [
            {
              kind: "jsx",
              loc: [38, 7, 44, 9],
              type: {
                kind: "splice",
                loc: [38, 8, 38, 13],
                key: "$Panel",
              },
              attributes: [
                {
                  name: "body",
                  initializer: {
                    kind: "splice",
                    loc: [40, 11, 42, 21],
                    key: "$0splice0",
                  },
                },
              ],
              children: [],
            },
            {
              kind: "jsx",
              loc: [45, 7, 45, 71],
              type: {
                kind: "string",
                loc: [45, 8, 45, 14],
                text: "button",
              },
              attributes: [
                {
                  name: "onclick",
                  initializer: {
                    kind: "=>",
                    loc: [45, 24, 45, 56],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [45, 30, 45, 56],
                      expression: {
                        kind: ".",
                        loc: [45, 30, 45, 39],
                        expression: {
                          kind: "id",
                          loc: [45, 30, 45, 35],
                          text: "count",
                          bindingKey: "count$2nh9ihk3oddge$2",
                        },
                        name: "set",
                      },
                      arguments: [
                        {
                          kind: "binop",
                          loc: [45, 40, 45, 55],
                          left: {
                            kind: "()",
                            loc: [45, 40, 45, 51],
                            expression: {
                              kind: ".",
                              loc: [45, 40, 45, 49],
                              expression: {
                                kind: "id",
                                loc: [45, 40, 45, 45],
                                text: "count",
                                bindingKey: "count$2nh9ihk3oddge$2",
                              },
                              name: "get",
                            },
                            arguments: [],
                          },
                          operatorToken: "+",
                          right: {
                            kind: "number",
                            loc: [45, 54, 45, 55],
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
                  loc: [45, 58, 45, 62],
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
it("scriptBoundTagCarried", async (t) => {
  await snapshotCase(t, "scriptBoundTagCarried", scriptBoundTagCarried);
});
describe("a tag naming a function the script holds", () => {
  it("calls the one it was written under, drawn where another is in scope", async () => {
    await render(scriptBoundTagCarried);
    const panel = screen.getByText("panel 0");
    const badge = screen.getByText("outer 0");
    assert.equal(badge.tagName.toLowerCase(), "b");
    await userEvent.click(screen.getByRole("button", { name: "more" }));
    assert.equal(screen.getByText("outer 1"), badge, "the same <b>");
    assert.ok(screen.getByText("kid 1"));
    assert.equal(
      screen.getByText("panel 0"),
      panel,
      "the panel's own, untouched",
    );
  });
});
