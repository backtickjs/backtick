import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import assert from "node:assert/strict";
import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { userEvent } from "@testing-library/user-event";
import { snapshotCase } from "../snapshotCase.ts";
import { drawn } from "./dom.ts";
// `set` stores what it is given. A function is a value like any other, so it
// is kept, not called with the previous value.
async function Greeting() {
  return cs.create(
    [11, 10, 18, 5],
    {
      version: "0.0.0",
      filePath: "state/set-stores-function.test.tsx",
      fileHash: "1zi7if3ybm5dh",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [11, 13, 18, 4],
      statements: [
        {
          kind: "const",
          loc: [12, 5, 12, 76],
          name: {
            kind: "id",
            loc: [12, 11, 12, 16],
            text: "greet",
            bindingKey: "greet$1zi7if3ybm5dh$0",
          },
          initializer: {
            kind: "()",
            loc: [12, 19, 12, 75],
            expression: {
              kind: "splice",
              loc: [12, 19, 12, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "=>",
                loc: [12, 52, 12, 74],
                parameters: [
                  {
                    kind: "param",
                    loc: [12, 53, 12, 57],
                    name: {
                      kind: "id",
                      loc: [12, 53, 12, 57],
                      text: "name",
                      bindingKey: "name$1zi7if3ybm5dh$1",
                    },
                  },
                ],
                body: {
                  kind: "binop",
                  loc: [12, 62, 12, 74],
                  left: {
                    kind: "string",
                    loc: [12, 62, 12, 67],
                    text: "hi ",
                  },
                  operatorToken: "+",
                  right: {
                    kind: "id",
                    loc: [12, 70, 12, 74],
                    text: "name",
                    bindingKey: "name$1zi7if3ybm5dh$1",
                  },
                },
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [13, 5, 17, 7],
          expression: {
            kind: "jsx",
            loc: [14, 7, 16, 14],
            type: {
              kind: "string",
              loc: [14, 8, 14, 12],
              text: "span",
            },
            attributes: [
              {
                name: "onclick",
                initializer: {
                  kind: "=>",
                  loc: [14, 22, 14, 62],
                  parameters: [],
                  body: {
                    kind: "()",
                    loc: [14, 28, 14, 62],
                    expression: {
                      kind: ".",
                      loc: [14, 28, 14, 37],
                      expression: {
                        kind: "id",
                        loc: [14, 28, 14, 33],
                        text: "greet",
                        bindingKey: "greet$1zi7if3ybm5dh$0",
                      },
                      name: "set",
                    },
                    arguments: [
                      {
                        kind: "=>",
                        loc: [14, 38, 14, 61],
                        parameters: [
                          {
                            kind: "param",
                            loc: [14, 39, 14, 43],
                            name: {
                              kind: "id",
                              loc: [14, 39, 14, 43],
                              text: "name",
                              bindingKey: "name$1zi7if3ybm5dh$2",
                            },
                          },
                        ],
                        body: {
                          kind: "binop",
                          loc: [14, 48, 14, 61],
                          left: {
                            kind: "string",
                            loc: [14, 48, 14, 54],
                            text: "bye ",
                          },
                          operatorToken: "+",
                          right: {
                            kind: "id",
                            loc: [14, 57, 14, 61],
                            text: "name",
                            bindingKey: "name$1zi7if3ybm5dh$2",
                          },
                        },
                      },
                    ],
                  },
                },
              },
            ],
            children: [
              {
                kind: "()",
                loc: [15, 10, 15, 28],
                expression: {
                  kind: "()",
                  loc: [15, 10, 15, 21],
                  expression: {
                    kind: ".",
                    loc: [15, 10, 15, 19],
                    expression: {
                      kind: "id",
                      loc: [15, 10, 15, 15],
                      text: "greet",
                      bindingKey: "greet$1zi7if3ybm5dh$0",
                    },
                    name: "get",
                  },
                  arguments: [],
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [15, 22, 15, 27],
                    text: "ada",
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
it("`set` stores a function without calling it", async () => {
  const text = await drawn(_jsx(Greeting, {}));
  assert.equal(text.textContent, "hi ada");
  await userEvent.click(text);
  assert.equal(text.textContent, "bye ada");
});
it("Greeting", async (t) => {
  await snapshotCase(t, "Greeting", _jsx(Greeting, {}));
});
