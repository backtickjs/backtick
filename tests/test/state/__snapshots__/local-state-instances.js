import { jsx as _jsx, jsxs as _jsxs } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { children, drawn, fontSize } from "./dom.ts";
// State belongs to the script that declares it, and a script entry is applied
// once per place that reaches it — so two `<OwnCounter />` tags are two
// applications of one entry, and each declares a cell of its own.
async function OwnCounter() {
  return cs.create(
    [12, 10, 24, 5],
    {
      version: "0.0.0",
      filePath: "state/local-state-instances.test.tsx",
      fileHash: "4rab33ccyjy9",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [12, 13, 24, 4],
      statements: [
        {
          kind: "const",
          loc: [13, 5, 13, 29],
          name: {
            kind: "id",
            loc: [13, 11, 13, 15],
            text: "size",
            bindingKey: "size$4rab33ccyjy9$0",
          },
          initializer: {
            kind: "()",
            loc: [13, 18, 13, 28],
            expression: {
              kind: "splice",
              loc: [13, 18, 13, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [13, 25, 13, 27],
                value: 16,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [14, 5, 23, 7],
          expression: {
            kind: "jsx",
            loc: [15, 7, 22, 14],
            type: {
              kind: "string",
              loc: [15, 8, 15, 12],
              text: "span",
            },
            attributes: [
              {
                name: "style",
                initializer: {
                  kind: "binop",
                  loc: [16, 16, 16, 49],
                  left: {
                    kind: "binop",
                    loc: [16, 16, 16, 42],
                    left: {
                      kind: "string",
                      loc: [16, 16, 16, 29],
                      text: "font-size: ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [16, 32, 16, 42],
                      expression: {
                        kind: ".",
                        loc: [16, 32, 16, 40],
                        expression: {
                          kind: "id",
                          loc: [16, 32, 16, 36],
                          text: "size",
                          bindingKey: "size$4rab33ccyjy9$0",
                        },
                        name: "get",
                      },
                      arguments: [],
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "string",
                    loc: [16, 45, 16, 49],
                    text: "px",
                  },
                },
              },
              {
                name: "onclick",
                initializer: {
                  kind: "=>",
                  loc: [17, 18, 19, 10],
                  parameters: [],
                  body: {
                    kind: "{}",
                    loc: [17, 24, 19, 10],
                    statements: [
                      {
                        kind: "()",
                        loc: [18, 11, 18, 35],
                        expression: {
                          kind: ".",
                          loc: [18, 11, 18, 19],
                          expression: {
                            kind: "id",
                            loc: [18, 11, 18, 15],
                            text: "size",
                            bindingKey: "size$4rab33ccyjy9$0",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: "binop",
                            loc: [18, 20, 18, 34],
                            left: {
                              kind: "()",
                              loc: [18, 20, 18, 30],
                              expression: {
                                kind: ".",
                                loc: [18, 20, 18, 28],
                                expression: {
                                  kind: "id",
                                  loc: [18, 20, 18, 24],
                                  text: "size",
                                  bindingKey: "size$4rab33ccyjy9$0",
                                },
                                name: "get",
                              },
                              arguments: [],
                            },
                            operatorToken: "+",
                            right: {
                              kind: "number",
                              loc: [18, 33, 18, 34],
                              value: 1,
                            },
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
                loc: [21, 9, 22, 7],
                text: "press",
              },
            ],
          },
        },
      ],
    }),
  );
}
const instances = _jsxs("div", {
  children: [_jsx(OwnCounter, {}), _jsx(OwnCounter, {})],
});
describe("local state", () => {
  it("two invocations of one component hold independent cells", async () => {
    const view = await drawn(instances);
    const [first, second] = children(view);
    assert.ok(first !== undefined && second !== undefined);
    assert.equal(fontSize(first), 16);
    assert.equal(fontSize(second), 16);
    await userEvent.click(first);
    assert.equal(fontSize(first), 17);
    assert.equal(fontSize(second), 16);
  });
});
it("instances", async (t) => {
  await snapshotCase(t, "instances", instances);
});
