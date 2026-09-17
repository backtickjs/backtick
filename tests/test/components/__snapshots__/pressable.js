import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A drawing read the way Testing Library reads one: by role and by text, with
// a click a user would make.
// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  return cs.create(
    [15, 10, 27, 5],
    {
      version: "0.0.0",
      filePath: "components/pressable.test.tsx",
      fileHash: "7huprcub5nk3",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [15, 13, 27, 4],
      statements: [
        {
          kind: "const",
          loc: [16, 5, 16, 29],
          name: {
            kind: "id",
            loc: [16, 11, 16, 16],
            text: "count",
            bindingKey: "count$7huprcub5nk3$0",
          },
          initializer: {
            kind: "()",
            loc: [16, 19, 16, 28],
            expression: {
              kind: "splice",
              loc: [16, 19, 16, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [16, 26, 16, 27],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [17, 5, 26, 7],
          expression: {
            kind: "jsx",
            loc: [18, 7, 25, 16],
            type: {
              kind: "string",
              loc: [18, 8, 18, 14],
              text: "button",
            },
            attributes: [
              {
                name: "id",
                initializer: {
                  kind: "string",
                  loc: [19, 12, 19, 17],
                  text: "row",
                },
              },
              {
                name: "style",
                initializer: {
                  kind: "string",
                  loc: [20, 15, 20, 40],
                  text: "display: flex; gap: 8px",
                },
              },
              {
                name: "onclick",
                initializer: {
                  kind: "=>",
                  loc: [21, 18, 21, 50],
                  parameters: [],
                  body: {
                    kind: "()",
                    loc: [21, 24, 21, 50],
                    expression: {
                      kind: ".",
                      loc: [21, 24, 21, 33],
                      expression: {
                        kind: "id",
                        loc: [21, 24, 21, 29],
                        text: "count",
                        bindingKey: "count$7huprcub5nk3$0",
                      },
                      name: "set",
                    },
                    arguments: [
                      {
                        kind: "binop",
                        loc: [21, 34, 21, 49],
                        left: {
                          kind: "()",
                          loc: [21, 34, 21, 45],
                          expression: {
                            kind: ".",
                            loc: [21, 34, 21, 43],
                            expression: {
                              kind: "id",
                              loc: [21, 34, 21, 39],
                              text: "count",
                              bindingKey: "count$7huprcub5nk3$0",
                            },
                            name: "get",
                          },
                          arguments: [],
                        },
                        operatorToken: "+",
                        right: {
                          kind: "number",
                          loc: [21, 48, 21, 49],
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
                kind: "jsx",
                loc: [23, 9, 23, 76],
                type: {
                  kind: "string",
                  loc: [23, 10, 23, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "style",
                    initializer: {
                      kind: "string",
                      loc: [23, 21, 23, 39],
                      text: "font-weight: 700",
                    },
                  },
                ],
                children: [
                  {
                    kind: "?:",
                    loc: [23, 41, 23, 68],
                    condition: {
                      kind: "binop",
                      loc: [23, 41, 23, 56],
                      left: {
                        kind: "()",
                        loc: [23, 41, 23, 52],
                        expression: {
                          kind: ".",
                          loc: [23, 41, 23, 50],
                          expression: {
                            kind: "id",
                            loc: [23, 41, 23, 46],
                            text: "count",
                            bindingKey: "count$7huprcub5nk3$0",
                          },
                          name: "get",
                        },
                        arguments: [],
                      },
                      operatorToken: ">",
                      right: {
                        kind: "number",
                        loc: [23, 55, 23, 56],
                        value: 0,
                      },
                    },
                    whenTrue: {
                      kind: "string",
                      loc: [23, 59, 23, 62],
                      text: "\u2611",
                    },
                    whenFalse: {
                      kind: "string",
                      loc: [23, 65, 23, 68],
                      text: "\u2610",
                    },
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [24, 9, 24, 59],
                type: {
                  kind: "string",
                  loc: [24, 10, 24, 14],
                  text: "span",
                },
                attributes: [],
                children: [
                  {
                    kind: "binop",
                    loc: [24, 16, 24, 51],
                    left: {
                      kind: "binop",
                      loc: [24, 16, 24, 40],
                      left: {
                        kind: "string",
                        loc: [24, 16, 24, 26],
                        text: "pressed ",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "()",
                        loc: [24, 29, 24, 40],
                        expression: {
                          kind: ".",
                          loc: [24, 29, 24, 38],
                          expression: {
                            kind: "id",
                            loc: [24, 29, 24, 34],
                            text: "count",
                            bindingKey: "count$7huprcub5nk3$0",
                          },
                          name: "get",
                        },
                        arguments: [],
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [24, 43, 24, 51],
                      text: " times",
                    },
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
describe("screen", () => {
  it("increments the counter", async () => {
    await render(_jsx(Row, {}));
    await userEvent.click(screen.getByRole("button", { name: /pressed/ }));
    assert.ok(screen.getByText("pressed 1 times"));
  });
  it("reads a fresh page in each test", async () => {
    await render(_jsx(Row, {}));
    assert.ok(screen.getByText("pressed 0 times"));
  });
});
describe("what each case compiles and bundles to", () => {
  it("Row", async (t) => {
    await snapshotCase(t, "Row", _jsx(Row, {}));
  });
});
