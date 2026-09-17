import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { cs, onMount, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { window } from "@backtickjs/web-sdk";
import { userEvent } from "@testing-library/user-event";
// What the page held each time a script logged, read through the console
// `onMount` reaches from a script.
async function logged(draw) {
  const seen = [];
  const log = globalThis.window.console.log;
  globalThis.window.console.log = () => {
    seen.push(document.body.textContent ?? "");
  };
  try {
    await draw();
  } finally {
    globalThis.window.console.log = log;
  }
  return seen;
}
describe("onMount", () => {
  it("runs once, after the drawing is in the page", async () => {
    const seen = await logged(() =>
      render(
        cs.create(
          [28, 9, 35, 11],
          {
            version: "0.0.0",
            filePath: "render/on-mount.test.tsx",
            fileHash: "tuknevzfkeo4",
            splices: {
              $state: { value: state, params: [] },
              $onMount: { value: onMount, params: [] },
              $window: { value: window, params: [] },
            },
            captures: [],
          },
          () => ({
            kind: "{}",
            loc: [28, 12, 35, 10],
            statements: [
              {
                kind: "const",
                loc: [29, 11, 29, 35],
                name: {
                  kind: "id",
                  loc: [29, 17, 29, 22],
                  text: "count",
                  bindingKey: "count$tuknevzfkeo4$0",
                },
                initializer: {
                  kind: "()",
                  loc: [29, 25, 29, 34],
                  expression: {
                    kind: "splice",
                    loc: [29, 25, 29, 31],
                    key: "$state",
                  },
                  arguments: [
                    {
                      kind: "number",
                      loc: [29, 32, 29, 33],
                      value: 0,
                    },
                  ],
                },
              },
              {
                kind: "()",
                loc: [30, 11, 33, 13],
                expression: {
                  kind: "splice",
                  loc: [30, 11, 30, 19],
                  key: "$onMount",
                },
                arguments: [
                  {
                    kind: "=>",
                    loc: [30, 20, 33, 12],
                    parameters: [],
                    body: {
                      kind: "{}",
                      loc: [30, 26, 33, 12],
                      statements: [
                        {
                          kind: "()",
                          loc: [31, 13, 31, 34],
                          expression: {
                            kind: ".",
                            loc: [31, 13, 31, 32],
                            expression: {
                              kind: ".",
                              loc: [31, 13, 31, 28],
                              expression: {
                                kind: "splice",
                                loc: [31, 13, 31, 20],
                                key: "$window",
                              },
                              name: "console",
                            },
                            name: "log",
                          },
                          arguments: [],
                        },
                        {
                          kind: "()",
                          loc: [32, 13, 32, 39],
                          expression: {
                            kind: ".",
                            loc: [32, 13, 32, 25],
                            expression: {
                              kind: "id",
                              loc: [32, 13, 32, 18],
                              text: "count",
                              bindingKey: "count$tuknevzfkeo4$0",
                            },
                            name: "update",
                          },
                          arguments: [
                            {
                              kind: "=>",
                              loc: [32, 26, 32, 38],
                              parameters: [
                                {
                                  kind: "param",
                                  loc: [32, 27, 32, 28],
                                  name: {
                                    kind: "id",
                                    loc: [32, 27, 32, 28],
                                    text: "n",
                                    bindingKey: "n$tuknevzfkeo4$1",
                                  },
                                },
                              ],
                              body: {
                                kind: "binop",
                                loc: [32, 33, 32, 38],
                                left: {
                                  kind: "id",
                                  loc: [32, 33, 32, 34],
                                  text: "n",
                                  bindingKey: "n$tuknevzfkeo4$1",
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "number",
                                  loc: [32, 37, 32, 38],
                                  value: 1,
                                },
                              },
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
              {
                kind: "return",
                loc: [34, 11, 34, 53],
                expression: {
                  kind: "jsx",
                  loc: [34, 18, 34, 52],
                  type: {
                    kind: "string",
                    loc: [34, 19, 34, 20],
                    text: "p",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "binop",
                      loc: [34, 22, 34, 47],
                      left: {
                        kind: "string",
                        loc: [34, 22, 34, 32],
                        text: "mounted ",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "()",
                        loc: [34, 35, 34, 47],
                        expression: {
                          kind: ".",
                          loc: [34, 35, 34, 45],
                          expression: {
                            kind: "id",
                            loc: [34, 35, 34, 40],
                            text: "count",
                            bindingKey: "count$tuknevzfkeo4$0",
                          },
                          name: "read",
                        },
                        arguments: [],
                      },
                    },
                  ],
                },
              },
            ],
          }),
        ),
      ),
    );
    assert.deepEqual(seen, ["mounted 0"]);
    assert.equal(screen.getByText(/mounted/).textContent, "mounted 1");
  });
  it("runs at once when called from a handler", async () => {
    await render(
      cs.create(
        [44, 7, 51, 9],
        {
          version: "0.0.0",
          filePath: "render/on-mount.test.tsx",
          fileHash: "tuknevzfkeo4",
          splices: {
            $state: { value: state, params: [] },
            $onMount: { value: onMount, params: [] },
          },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [44, 10, 51, 8],
          statements: [
            {
              kind: "const",
              loc: [45, 9, 45, 40],
              name: {
                kind: "id",
                loc: [45, 15, 45, 19],
                text: "said",
                bindingKey: "said$tuknevzfkeo4$2",
              },
              initializer: {
                kind: "()",
                loc: [45, 22, 45, 39],
                expression: {
                  kind: "splice",
                  loc: [45, 22, 45, 28],
                  key: "$state",
                },
                arguments: [
                  {
                    kind: "string",
                    loc: [45, 29, 45, 38],
                    text: "not yet",
                  },
                ],
              },
            },
            {
              kind: "return",
              loc: [46, 9, 50, 11],
              expression: {
                kind: "jsx",
                loc: [47, 11, 49, 20],
                type: {
                  kind: "string",
                  loc: [47, 12, 47, 18],
                  text: "button",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "=>",
                      loc: [47, 28, 47, 67],
                      parameters: [],
                      body: {
                        kind: "()",
                        loc: [47, 34, 47, 67],
                        expression: {
                          kind: "splice",
                          loc: [47, 34, 47, 42],
                          key: "$onMount",
                        },
                        arguments: [
                          {
                            kind: "=>",
                            loc: [47, 43, 47, 66],
                            parameters: [],
                            body: {
                              kind: "()",
                              loc: [47, 49, 47, 66],
                              expression: {
                                kind: ".",
                                loc: [47, 49, 47, 59],
                                expression: {
                                  kind: "id",
                                  loc: [47, 49, 47, 53],
                                  text: "said",
                                  bindingKey: "said$tuknevzfkeo4$2",
                                },
                                name: "write",
                              },
                              arguments: [
                                {
                                  kind: "string",
                                  loc: [47, 60, 47, 65],
                                  text: "ran",
                                },
                              ],
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
                    loc: [48, 14, 48, 25],
                    expression: {
                      kind: ".",
                      loc: [48, 14, 48, 23],
                      expression: {
                        kind: "id",
                        loc: [48, 14, 48, 18],
                        text: "said",
                        bindingKey: "said$tuknevzfkeo4$2",
                      },
                      name: "read",
                    },
                    arguments: [],
                  },
                ],
              },
            },
          ],
        }),
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    assert.equal(screen.getByRole("button").textContent, "ran");
  });
});
