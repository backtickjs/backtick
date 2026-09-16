import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { drawn, fontSize } from "./dom.ts";
// `update` derives the next value from the current one, so a handler needs no
// separate read. It returns `void` like `write`, which is what keeps it out of
// a value body: only a statement position accepts `void`.
async function UpdatingStepper() {
  return cs.create(
    [12, 10, 24, 5],
    {
      version: "0.0.0",
      filePath: "state/local-state-update.test.tsx",
      fileHash: "28k05zcl8xi6m",
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
            bindingKey: "size$28k05zcl8xi6m$0",
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
                  loc: [16, 16, 16, 50],
                  left: {
                    kind: "binop",
                    loc: [16, 16, 16, 43],
                    left: {
                      kind: "string",
                      loc: [16, 16, 16, 29],
                      text: "font-size: ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [16, 32, 16, 43],
                      expression: {
                        kind: ".",
                        loc: [16, 32, 16, 41],
                        expression: {
                          kind: "id",
                          loc: [16, 32, 16, 36],
                          text: "size",
                          bindingKey: "size$28k05zcl8xi6m$0",
                        },
                        name: "read",
                      },
                      arguments: [],
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "string",
                    loc: [16, 46, 16, 50],
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
                        loc: [18, 11, 18, 56],
                        expression: {
                          kind: ".",
                          loc: [18, 11, 18, 22],
                          expression: {
                            kind: "id",
                            loc: [18, 11, 18, 15],
                            text: "size",
                            bindingKey: "size$28k05zcl8xi6m$0",
                          },
                          name: "update",
                        },
                        arguments: [
                          {
                            kind: "=>",
                            loc: [18, 23, 18, 55],
                            parameters: [
                              {
                                kind: "param",
                                loc: [18, 24, 18, 39],
                                name: {
                                  kind: "id",
                                  loc: [18, 24, 18, 31],
                                  text: "current",
                                  bindingKey: "current$28k05zcl8xi6m$1",
                                },
                              },
                            ],
                            body: {
                              kind: "binop",
                              loc: [18, 44, 18, 55],
                              left: {
                                kind: "id",
                                loc: [18, 44, 18, 51],
                                text: "current",
                                bindingKey: "current$28k05zcl8xi6m$1",
                              },
                              operatorToken: "+",
                              right: {
                                kind: "number",
                                loc: [18, 54, 18, 55],
                                value: 1,
                              },
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
describe("local state", () => {
  it("`update` derives the next value from the current one", async () => {
    const text = await drawn(_jsx(UpdatingStepper, {}));
    assert.equal(fontSize(text), 16);
    await userEvent.click(text);
    assert.equal(fontSize(text), 17);
    await userEvent.click(text);
    assert.equal(fontSize(text), 18);
  });
});
it("UpdatingStepper", async (t) => {
  await snapshotCase(t, "UpdatingStepper", _jsx(UpdatingStepper, {}));
});
