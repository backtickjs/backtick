import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
// A cell a script declares, and a button that writes it.
async function Counter() {
  return cs.create(
    [10, 10, 18, 5],
    {
      version: "0.0.0",
      filePath: "web-testing/counter.test.tsx",
      fileHash: "1mkfpekdj7tcq",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [10, 13, 18, 4],
      statements: [
        {
          kind: "const",
          loc: [11, 5, 11, 29],
          name: {
            kind: "id",
            loc: [11, 11, 11, 16],
            text: "count",
            bindingKey: "count$1mkfpekdj7tcq$0",
          },
          initializer: {
            kind: "()",
            loc: [11, 19, 11, 28],
            expression: {
              kind: "splice",
              loc: [11, 19, 11, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [11, 26, 11, 27],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [12, 5, 17, 7],
          expression: {
            kind: "jsx",
            loc: [13, 7, 16, 13],
            type: {
              kind: "string",
              loc: [13, 8, 13, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [14, 9, 14, 75],
                type: {
                  kind: "string",
                  loc: [14, 10, 14, 16],
                  text: "button",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "=>",
                      loc: [14, 26, 14, 61],
                      parameters: [],
                      body: {
                        kind: "()",
                        loc: [14, 32, 14, 61],
                        expression: {
                          kind: ".",
                          loc: [14, 32, 14, 43],
                          expression: {
                            kind: "id",
                            loc: [14, 32, 14, 37],
                            text: "count",
                            bindingKey: "count$1mkfpekdj7tcq$0",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "binop",
                            loc: [14, 44, 14, 60],
                            left: {
                              kind: "()",
                              loc: [14, 44, 14, 56],
                              expression: {
                                kind: ".",
                                loc: [14, 44, 14, 54],
                                expression: {
                                  kind: "id",
                                  loc: [14, 44, 14, 49],
                                  text: "count",
                                  bindingKey: "count$1mkfpekdj7tcq$0",
                                },
                                name: "read",
                              },
                              arguments: [],
                            },
                            operatorToken: "+",
                            right: {
                              kind: "number",
                              loc: [14, 59, 14, 60],
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
                    loc: [14, 63, 14, 66],
                    text: "Add",
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [15, 9, 15, 42],
                type: {
                  kind: "string",
                  loc: [15, 10, 15, 11],
                  text: "p",
                },
                attributes: [],
                children: [
                  {
                    kind: "binop",
                    loc: [15, 13, 15, 37],
                    left: {
                      kind: "string",
                      loc: [15, 13, 15, 22],
                      text: "Count: ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [15, 25, 15, 37],
                      expression: {
                        kind: ".",
                        loc: [15, 25, 15, 35],
                        expression: {
                          kind: "id",
                          loc: [15, 25, 15, 30],
                          text: "count",
                          bindingKey: "count$1mkfpekdj7tcq$0",
                        },
                        name: "read",
                      },
                      arguments: [],
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
describe("a counter", () => {
  it("Counter", async (t) => {
    await snapshotCase(t, "Counter", _jsx(Counter, {}));
  });
  it("increments on a click", async () => {
    await render(_jsx(Counter, {}));
    await userEvent.click(screen.getByRole("button", { name: /add/i }));
    assert.ok(screen.getByText("Count: 1"));
  });
});
