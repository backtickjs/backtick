import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { computed, cs, onCleanup, onMount, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { window } from "@backtickjs/web-sdk";
import { userEvent } from "@testing-library/user-event";
// Each script logs where it runs, so a test counts the runs by counting the
// logs.
let runs = 0;
const log = globalThis.window.console.log;
beforeEach(() => {
  runs = 0;
  globalThis.window.console.log = () => {
    runs = runs + 1;
  };
});
afterEach(() => {
  globalThis.window.console.log = log;
});
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
describe("onCleanup", () => {
  it("runs when the drawing is removed", async () => {
    const { unmount } = await render(
      cs.create(
        [27, 7, 30, 9],
        {
          version: "0.0.0",
          filePath: "render/on-cleanup.test.tsx",
          fileHash: "29e3pjiy23pgm",
          splices: {
            $onCleanup: { value: onCleanup, params: [] },
            $window: { value: window, params: [] },
          },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [27, 10, 30, 8],
          statements: [
            {
              kind: "()",
              loc: [28, 9, 28, 48],
              expression: {
                kind: "splice",
                loc: [28, 9, 28, 19],
                key: "$onCleanup",
              },
              arguments: [
                {
                  kind: "=>",
                  loc: [28, 20, 28, 47],
                  parameters: [],
                  body: {
                    kind: "()",
                    loc: [28, 26, 28, 47],
                    expression: {
                      kind: ".",
                      loc: [28, 26, 28, 45],
                      expression: {
                        kind: ".",
                        loc: [28, 26, 28, 41],
                        expression: {
                          kind: "splice",
                          loc: [28, 26, 28, 33],
                          key: "$window",
                        },
                        name: "console",
                      },
                      name: "log",
                    },
                    arguments: [],
                  },
                },
              ],
            },
            {
              kind: "return",
              loc: [29, 9, 29, 29],
              expression: {
                kind: "jsx",
                loc: [29, 16, 29, 28],
                type: {
                  kind: "string",
                  loc: [29, 17, 29, 18],
                  text: "p",
                },
                attributes: [],
                children: [
                  {
                    kind: "string",
                    loc: [29, 19, 29, 24],
                    text: "drawn",
                  },
                ],
              },
            },
          ],
        }),
      ),
    );
    assert.equal(runs, 0);
    unmount();
    assert.equal(runs, 1);
  });
  it("runs before a computed calculates again", async () => {
    await render(
      cs.create(
        [39, 7, 48, 9],
        {
          version: "0.0.0",
          filePath: "render/on-cleanup.test.tsx",
          fileHash: "29e3pjiy23pgm",
          splices: {
            $state: { value: state, params: [] },
            $computed: { value: computed, params: [] },
            $onCleanup: { value: onCleanup, params: [] },
            $window: { value: window, params: [] },
          },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [39, 10, 48, 8],
          statements: [
            {
              kind: "const",
              loc: [40, 9, 40, 29],
              name: {
                kind: "id",
                loc: [40, 15, 40, 16],
                text: "n",
                bindingKey: "n$29e3pjiy23pgm$0",
              },
              initializer: {
                kind: "()",
                loc: [40, 19, 40, 28],
                expression: {
                  kind: "splice",
                  loc: [40, 19, 40, 25],
                  key: "$state",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [40, 26, 40, 27],
                    value: 1,
                  },
                ],
              },
            },
            {
              kind: "const",
              loc: [41, 9, 44, 12],
              name: {
                kind: "id",
                loc: [41, 15, 41, 22],
                text: "doubled",
                bindingKey: "doubled$29e3pjiy23pgm$1",
              },
              initializer: {
                kind: "()",
                loc: [41, 25, 44, 11],
                expression: {
                  kind: "splice",
                  loc: [41, 25, 41, 34],
                  key: "$computed",
                },
                arguments: [
                  {
                    kind: "=>",
                    loc: [41, 35, 44, 10],
                    parameters: [],
                    body: {
                      kind: "{}",
                      loc: [41, 41, 44, 10],
                      statements: [
                        {
                          kind: "()",
                          loc: [42, 11, 42, 50],
                          expression: {
                            kind: "splice",
                            loc: [42, 11, 42, 21],
                            key: "$onCleanup",
                          },
                          arguments: [
                            {
                              kind: "=>",
                              loc: [42, 22, 42, 49],
                              parameters: [],
                              body: {
                                kind: "()",
                                loc: [42, 28, 42, 49],
                                expression: {
                                  kind: ".",
                                  loc: [42, 28, 42, 47],
                                  expression: {
                                    kind: ".",
                                    loc: [42, 28, 42, 43],
                                    expression: {
                                      kind: "splice",
                                      loc: [42, 28, 42, 35],
                                      key: "$window",
                                    },
                                    name: "console",
                                  },
                                  name: "log",
                                },
                                arguments: [],
                              },
                            },
                          ],
                        },
                        {
                          kind: "return",
                          loc: [43, 11, 43, 30],
                          expression: {
                            kind: "binop",
                            loc: [43, 18, 43, 29],
                            left: {
                              kind: "()",
                              loc: [43, 18, 43, 25],
                              expression: {
                                kind: ".",
                                loc: [43, 18, 43, 23],
                                expression: {
                                  kind: "id",
                                  loc: [43, 18, 43, 19],
                                  text: "n",
                                  bindingKey: "n$29e3pjiy23pgm$0",
                                },
                                name: "get",
                              },
                              arguments: [],
                            },
                            operatorToken: "*",
                            right: {
                              kind: "number",
                              loc: [43, 28, 43, 29],
                              value: 2,
                            },
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
            {
              kind: "return",
              loc: [45, 9, 47, 11],
              expression: {
                kind: "jsx",
                loc: [46, 11, 46, 78],
                type: {
                  kind: "string",
                  loc: [46, 12, 46, 18],
                  text: "button",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "=>",
                      loc: [46, 28, 46, 52],
                      parameters: [],
                      body: {
                        kind: "()",
                        loc: [46, 34, 46, 52],
                        expression: {
                          kind: ".",
                          loc: [46, 34, 46, 39],
                          expression: {
                            kind: "id",
                            loc: [46, 34, 46, 35],
                            text: "n",
                            bindingKey: "n$29e3pjiy23pgm$0",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: "binop",
                            loc: [46, 40, 46, 51],
                            left: {
                              kind: "()",
                              loc: [46, 40, 46, 47],
                              expression: {
                                kind: ".",
                                loc: [46, 40, 46, 45],
                                expression: {
                                  kind: "id",
                                  loc: [46, 40, 46, 41],
                                  text: "n",
                                  bindingKey: "n$29e3pjiy23pgm$0",
                                },
                                name: "get",
                              },
                              arguments: [],
                            },
                            operatorToken: "+",
                            right: {
                              kind: "number",
                              loc: [46, 50, 46, 51],
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
                    kind: "()",
                    loc: [46, 55, 46, 68],
                    expression: {
                      kind: ".",
                      loc: [46, 55, 46, 66],
                      expression: {
                        kind: "id",
                        loc: [46, 55, 46, 62],
                        text: "doubled",
                        bindingKey: "doubled$29e3pjiy23pgm$1",
                      },
                      name: "get",
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
    assert.equal(runs, 0);
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 1);
    assert.equal(screen.getByRole("button").textContent, "4");
  });
  it("stops what onMount started", async (t) => {
    // Every interval the script starts is cleared once the test ends, so a
    // cleanup that never ran fails the test rather than hanging the run.
    const started = [];
    const setInterval = globalThis.window.setInterval;
    t.mock.method(globalThis.window, "setInterval", (handler, timeout) => {
      const id = setInterval(handler, timeout);
      started.push(id);
      return id;
    });
    t.after(() => started.forEach((id) => globalThis.window.clearInterval(id)));
    const { unmount } = await render(
      cs.create(
        [73, 7, 80, 9],
        {
          version: "0.0.0",
          filePath: "render/on-cleanup.test.tsx",
          fileHash: "29e3pjiy23pgm",
          splices: {
            $state: { value: state, params: [] },
            $onMount: { value: onMount, params: [] },
            $window: { value: window, params: [] },
            $onCleanup: { value: onCleanup, params: [] },
          },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [73, 10, 80, 8],
          statements: [
            {
              kind: "const",
              loc: [74, 9, 74, 33],
              name: {
                kind: "id",
                loc: [74, 15, 74, 20],
                text: "timer",
                bindingKey: "timer$29e3pjiy23pgm$2",
              },
              initializer: {
                kind: "()",
                loc: [74, 23, 74, 32],
                expression: {
                  kind: "splice",
                  loc: [74, 23, 74, 29],
                  key: "$state",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [74, 30, 74, 31],
                    value: 0,
                  },
                ],
              },
            },
            {
              kind: "()",
              loc: [75, 9, 77, 11],
              expression: {
                kind: "splice",
                loc: [75, 9, 75, 17],
                key: "$onMount",
              },
              arguments: [
                {
                  kind: "=>",
                  loc: [75, 18, 77, 10],
                  parameters: [],
                  body: {
                    kind: "{}",
                    loc: [75, 24, 77, 10],
                    statements: [
                      {
                        kind: "()",
                        loc: [76, 11, 76, 73],
                        expression: {
                          kind: ".",
                          loc: [76, 11, 76, 20],
                          expression: {
                            kind: "id",
                            loc: [76, 11, 76, 16],
                            text: "timer",
                            bindingKey: "timer$29e3pjiy23pgm$2",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: "()",
                            loc: [76, 21, 76, 72],
                            expression: {
                              kind: ".",
                              loc: [76, 21, 76, 40],
                              expression: {
                                kind: "splice",
                                loc: [76, 21, 76, 28],
                                key: "$window",
                              },
                              name: "setInterval",
                            },
                            arguments: [
                              {
                                kind: "=>",
                                loc: [76, 41, 76, 68],
                                parameters: [],
                                body: {
                                  kind: "()",
                                  loc: [76, 47, 76, 68],
                                  expression: {
                                    kind: ".",
                                    loc: [76, 47, 76, 66],
                                    expression: {
                                      kind: ".",
                                      loc: [76, 47, 76, 62],
                                      expression: {
                                        kind: "splice",
                                        loc: [76, 47, 76, 54],
                                        key: "$window",
                                      },
                                      name: "console",
                                    },
                                    name: "log",
                                  },
                                  arguments: [],
                                },
                              },
                              {
                                kind: "number",
                                loc: [76, 70, 76, 71],
                                value: 5,
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
            {
              kind: "()",
              loc: [78, 9, 78, 61],
              expression: {
                kind: "splice",
                loc: [78, 9, 78, 19],
                key: "$onCleanup",
              },
              arguments: [
                {
                  kind: "=>",
                  loc: [78, 20, 78, 60],
                  parameters: [],
                  body: {
                    kind: "()",
                    loc: [78, 26, 78, 60],
                    expression: {
                      kind: ".",
                      loc: [78, 26, 78, 47],
                      expression: {
                        kind: "splice",
                        loc: [78, 26, 78, 33],
                        key: "$window",
                      },
                      name: "clearInterval",
                    },
                    arguments: [
                      {
                        kind: "()",
                        loc: [78, 48, 78, 59],
                        expression: {
                          kind: ".",
                          loc: [78, 48, 78, 57],
                          expression: {
                            kind: "id",
                            loc: [78, 48, 78, 53],
                            text: "timer",
                            bindingKey: "timer$29e3pjiy23pgm$2",
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
            {
              kind: "return",
              loc: [79, 9, 79, 31],
              expression: {
                kind: "jsx",
                loc: [79, 16, 79, 30],
                type: {
                  kind: "string",
                  loc: [79, 17, 79, 18],
                  text: "p",
                },
                attributes: [],
                children: [
                  {
                    kind: "string",
                    loc: [79, 19, 79, 26],
                    text: "ticking",
                  },
                ],
              },
            },
          ],
        }),
      ),
    );
    await wait(40);
    assert.ok(runs > 0);
    unmount();
    const stopped = runs;
    await wait(40);
    assert.equal(runs, stopped);
  });
  it("never runs when called from a handler", async () => {
    const { unmount } = await render(
      cs.create(
        [93, 7, 99, 9],
        {
          version: "0.0.0",
          filePath: "render/on-cleanup.test.tsx",
          fileHash: "29e3pjiy23pgm",
          splices: {
            $onCleanup: { value: onCleanup, params: [] },
            $window: { value: window, params: [] },
          },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [93, 10, 99, 8],
          statements: [
            {
              kind: "return",
              loc: [94, 9, 98, 11],
              expression: {
                kind: "jsx",
                loc: [95, 11, 97, 20],
                type: {
                  kind: "string",
                  loc: [95, 12, 95, 18],
                  text: "button",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "=>",
                      loc: [95, 28, 95, 73],
                      parameters: [],
                      body: {
                        kind: "()",
                        loc: [95, 34, 95, 73],
                        expression: {
                          kind: "splice",
                          loc: [95, 34, 95, 44],
                          key: "$onCleanup",
                        },
                        arguments: [
                          {
                            kind: "=>",
                            loc: [95, 45, 95, 72],
                            parameters: [],
                            body: {
                              kind: "()",
                              loc: [95, 51, 95, 72],
                              expression: {
                                kind: ".",
                                loc: [95, 51, 95, 70],
                                expression: {
                                  kind: ".",
                                  loc: [95, 51, 95, 66],
                                  expression: {
                                    kind: "splice",
                                    loc: [95, 51, 95, 58],
                                    key: "$window",
                                  },
                                  name: "console",
                                },
                                name: "log",
                              },
                              arguments: [],
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
                    loc: [96, 13, 97, 11],
                    text: "press",
                  },
                ],
              },
            },
          ],
        }),
      ),
    );
    await userEvent.click(screen.getByRole("button"));
    unmount();
    assert.equal(runs, 0);
  });
});
