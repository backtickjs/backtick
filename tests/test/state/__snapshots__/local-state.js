import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { drawn, fontSize } from "./dom.ts";
// A cell a script declares, read and written by what it draws. The script owns
// the storage, so the display and the handler are two readers of one binding
// and share one cell: `read()` is an input — a value that re-evaluates when the
// cell changes — and `write` is an effect, which only an action can perform.
async function Stepper() {
  return cs.create(
    [13, 10, 25, 5],
    {
      version: "0.0.0",
      filePath: "state/local-state.test.tsx",
      fileHash: "ij35a03b1h8",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [13, 13, 25, 4],
      statements: [
        {
          kind: "const",
          loc: [14, 5, 14, 29],
          name: {
            kind: "id",
            loc: [14, 11, 14, 15],
            text: "size",
            bindingKey: "size$ij35a03b1h8$0",
          },
          initializer: {
            kind: "()",
            loc: [14, 18, 14, 28],
            expression: {
              kind: "splice",
              loc: [14, 18, 14, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [14, 25, 14, 27],
                value: 16,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [15, 5, 24, 7],
          expression: {
            kind: "jsx",
            loc: [16, 7, 23, 14],
            type: {
              kind: "string",
              loc: [16, 8, 16, 12],
              text: "span",
            },
            attributes: [
              {
                name: "style",
                initializer: {
                  kind: "binop",
                  loc: [17, 16, 17, 50],
                  left: {
                    kind: "binop",
                    loc: [17, 16, 17, 43],
                    left: {
                      kind: "string",
                      loc: [17, 16, 17, 29],
                      text: "font-size: ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [17, 32, 17, 43],
                      expression: {
                        kind: ".",
                        loc: [17, 32, 17, 41],
                        expression: {
                          kind: "id",
                          loc: [17, 32, 17, 36],
                          text: "size",
                          bindingKey: "size$ij35a03b1h8$0",
                        },
                        name: "read",
                      },
                      arguments: [],
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "string",
                    loc: [17, 46, 17, 50],
                    text: "px",
                  },
                },
              },
              {
                name: "onclick",
                initializer: {
                  kind: "=>",
                  loc: [18, 18, 20, 10],
                  parameters: [],
                  body: {
                    kind: "{}",
                    loc: [18, 24, 20, 10],
                    statements: [
                      {
                        kind: "()",
                        loc: [19, 11, 19, 38],
                        expression: {
                          kind: ".",
                          loc: [19, 11, 19, 21],
                          expression: {
                            kind: "id",
                            loc: [19, 11, 19, 15],
                            text: "size",
                            bindingKey: "size$ij35a03b1h8$0",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "binop",
                            loc: [19, 22, 19, 37],
                            left: {
                              kind: "()",
                              loc: [19, 22, 19, 33],
                              expression: {
                                kind: ".",
                                loc: [19, 22, 19, 31],
                                expression: {
                                  kind: "id",
                                  loc: [19, 22, 19, 26],
                                  text: "size",
                                  bindingKey: "size$ij35a03b1h8$0",
                                },
                                name: "read",
                              },
                              arguments: [],
                            },
                            operatorToken: "+",
                            right: {
                              kind: "number",
                              loc: [19, 36, 19, 37],
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
                loc: [22, 9, 23, 7],
                text: "press",
              },
            ],
          },
        },
      ],
    }),
  );
}
describe("local state", () => {
  it("renders the cell's initial value", async () => {
    const text = await drawn(_jsx(Stepper, {}));
    assert.equal(fontSize(text), 16);
  });
  it("a write persists and re-renders the instance", async () => {
    const text = await drawn(_jsx(Stepper, {}));
    await userEvent.click(text);
    assert.equal(fontSize(text), 17);
  });
  it("the display and the handler share one cell", async () => {
    const text = await drawn(_jsx(Stepper, {}));
    // Each write reads the value the previous one stored — the handler's
    // `read()` and the display's are the same cell, not two snapshots.
    await userEvent.click(text);
    await userEvent.click(text);
    await userEvent.click(text);
    assert.equal(fontSize(text), 19);
  });
  it("a handle captured before a write keeps working after it", async () => {
    const text = await drawn(_jsx(Stepper, {}));
    // The host holds the handler across re-renders; the handle resolves its
    // cell by name at call time, so the stale closure still writes the
    // instance's live storage. One registration per event, reading whatever
    // the prop holds now — so the click after a write runs the handler the
    // write left behind, not the one that was registered first.
    await userEvent.click(text);
    await userEvent.click(text);
    assert.equal(fontSize(text), 18);
  });
});
it("Stepper", async (t) => {
  await snapshotCase(t, "Stepper", _jsx(Stepper, {}));
});
