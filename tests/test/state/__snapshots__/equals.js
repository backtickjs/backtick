import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { computed, cs, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { window } from "@backtickjs/web-sdk";
import { userEvent } from "@testing-library/user-event";
// Each reader logs when it runs, so a test counts the runs by counting the
// logs, and reads what was logged.
let logged = [];
const log = globalThis.window.console.log;
beforeEach(() => {
  logged = [];
  globalThis.window.console.log = (...values) => {
    logged.push(values);
  };
});
afterEach(() => {
  globalThis.window.console.log = log;
});
const press = () => userEvent.click(screen.getByRole("button"));
describe("equals", () => {
  it("keeps a computed's readers from updating for an equal value", async () => {
    await render(
      cs.create(
        [27, 7, 42, 9],
        {
          version: "0.0.0",
          filePath: "state/equals.test.tsx",
          fileHash: "96w30i9eqr9l",
          splices: {
            $state: { value: state, params: [] },
            $computed: { value: computed, params: [] },
            $window: { value: window, params: [] },
          },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [27, 10, 42, 8],
          statements: [
            {
              kind: "const",
              loc: [28, 9, 28, 29],
              name: {
                kind: "id",
                loc: [28, 15, 28, 16],
                text: "n",
                bindingKey: "n$96w30i9eqr9l$0",
              },
              initializer: {
                kind: "()",
                loc: [28, 19, 28, 28],
                expression: {
                  kind: "splice",
                  loc: [28, 19, 28, 25],
                  key: "$state",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [28, 26, 28, 27],
                    value: 1,
                  },
                ],
              },
            },
            {
              kind: "const",
              loc: [29, 9, 31, 12],
              name: {
                kind: "id",
                loc: [29, 15, 29, 19],
                text: "size",
                bindingKey: "size$96w30i9eqr9l$1",
              },
              initializer: {
                kind: "()",
                loc: [29, 22, 31, 11],
                expression: {
                  kind: "splice",
                  loc: [29, 22, 29, 31],
                  key: "$computed",
                },
                arguments: [
                  {
                    kind: "=>",
                    loc: [29, 32, 29, 74],
                    parameters: [],
                    body: {
                      kind: "obj",
                      loc: [29, 39, 29, 73],
                      properties: [
                        {
                          kind: ":",
                          loc: [29, 41, 29, 59],
                          name: {
                            kind: "string",
                            loc: [29, 41, 29, 46],
                            text: "isBig",
                          },
                          initializer: {
                            kind: "binop",
                            loc: [29, 48, 29, 59],
                            left: {
                              kind: "()",
                              loc: [29, 48, 29, 55],
                              expression: {
                                kind: ".",
                                loc: [29, 48, 29, 53],
                                expression: {
                                  kind: "id",
                                  loc: [29, 48, 29, 49],
                                  text: "n",
                                  bindingKey: "n$96w30i9eqr9l$0",
                                },
                                name: "get",
                              },
                              arguments: [],
                            },
                            operatorToken: ">",
                            right: {
                              kind: "number",
                              loc: [29, 58, 29, 59],
                              value: 2,
                            },
                          },
                        },
                        {
                          kind: ":",
                          loc: [29, 61, 29, 71],
                          name: {
                            kind: "string",
                            loc: [29, 61, 29, 62],
                            text: "n",
                          },
                          initializer: {
                            kind: "()",
                            loc: [29, 64, 29, 71],
                            expression: {
                              kind: ".",
                              loc: [29, 64, 29, 69],
                              expression: {
                                kind: "id",
                                loc: [29, 64, 29, 65],
                                text: "n",
                                bindingKey: "n$96w30i9eqr9l$0",
                              },
                              name: "get",
                            },
                            arguments: [],
                          },
                        },
                      ],
                    },
                  },
                  {
                    kind: "obj",
                    loc: [29, 76, 31, 10],
                    properties: [
                      {
                        kind: ":",
                        loc: [30, 11, 30, 68],
                        name: {
                          kind: "string",
                          loc: [30, 11, 30, 17],
                          text: "equals",
                        },
                        initializer: {
                          kind: "=>",
                          loc: [30, 19, 30, 68],
                          parameters: [
                            {
                              kind: "param",
                              loc: [30, 20, 30, 28],
                              name: {
                                kind: "id",
                                loc: [30, 20, 30, 28],
                                text: "previous",
                                bindingKey: "previous$96w30i9eqr9l$3",
                              },
                            },
                            {
                              kind: "param",
                              loc: [30, 30, 30, 34],
                              name: {
                                kind: "id",
                                loc: [30, 30, 30, 34],
                                text: "next",
                                bindingKey: "next$96w30i9eqr9l$4",
                              },
                            },
                          ],
                          body: {
                            kind: "binop",
                            loc: [30, 39, 30, 68],
                            left: {
                              kind: ".",
                              loc: [30, 39, 30, 53],
                              expression: {
                                kind: "id",
                                loc: [30, 39, 30, 47],
                                text: "previous",
                                bindingKey: "previous$96w30i9eqr9l$3",
                              },
                              name: "isBig",
                            },
                            operatorToken: "===",
                            right: {
                              kind: ".",
                              loc: [30, 58, 30, 68],
                              expression: {
                                kind: "id",
                                loc: [30, 58, 30, 62],
                                text: "next",
                                bindingKey: "next$96w30i9eqr9l$4",
                              },
                              name: "isBig",
                            },
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              kind: "const",
              loc: [32, 9, 35, 11],
              name: {
                kind: "id",
                loc: [32, 15, 32, 20],
                text: "label",
                bindingKey: "label$96w30i9eqr9l$2",
              },
              initializer: {
                kind: "=>",
                loc: [32, 23, 35, 10],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [32, 29, 35, 10],
                  statements: [
                    {
                      kind: "()",
                      loc: [33, 11, 33, 32],
                      expression: {
                        kind: ".",
                        loc: [33, 11, 33, 30],
                        expression: {
                          kind: ".",
                          loc: [33, 11, 33, 26],
                          expression: {
                            kind: "splice",
                            loc: [33, 11, 33, 18],
                            key: "$window",
                          },
                          name: "console",
                        },
                        name: "log",
                      },
                      arguments: [],
                    },
                    {
                      kind: "return",
                      loc: [34, 11, 34, 53],
                      expression: {
                        kind: "?:",
                        loc: [34, 18, 34, 52],
                        condition: {
                          kind: ".",
                          loc: [34, 18, 34, 34],
                          expression: {
                            kind: "()",
                            loc: [34, 18, 34, 28],
                            expression: {
                              kind: ".",
                              loc: [34, 18, 34, 26],
                              expression: {
                                kind: "id",
                                loc: [34, 18, 34, 22],
                                text: "size",
                                bindingKey: "size$96w30i9eqr9l$1",
                              },
                              name: "get",
                            },
                            arguments: [],
                          },
                          name: "isBig",
                        },
                        whenTrue: {
                          kind: "string",
                          loc: [34, 37, 34, 42],
                          text: "big",
                        },
                        whenFalse: {
                          kind: "string",
                          loc: [34, 45, 34, 52],
                          text: "small",
                        },
                      },
                    },
                  ],
                },
              },
            },
            {
              kind: "return",
              loc: [36, 9, 41, 11],
              expression: {
                kind: "jsx",
                loc: [37, 11, 40, 17],
                type: {
                  kind: "string",
                  loc: [37, 12, 37, 15],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [38, 13, 38, 68],
                    type: {
                      kind: "string",
                      loc: [38, 14, 38, 20],
                      text: "button",
                    },
                    attributes: [
                      {
                        name: "onclick",
                        initializer: {
                          kind: "=>",
                          loc: [38, 30, 38, 54],
                          parameters: [],
                          body: {
                            kind: "()",
                            loc: [38, 36, 38, 54],
                            expression: {
                              kind: ".",
                              loc: [38, 36, 38, 41],
                              expression: {
                                kind: "id",
                                loc: [38, 36, 38, 37],
                                text: "n",
                                bindingKey: "n$96w30i9eqr9l$0",
                              },
                              name: "set",
                            },
                            arguments: [
                              {
                                kind: "binop",
                                loc: [38, 42, 38, 53],
                                left: {
                                  kind: "()",
                                  loc: [38, 42, 38, 49],
                                  expression: {
                                    kind: ".",
                                    loc: [38, 42, 38, 47],
                                    expression: {
                                      kind: "id",
                                      loc: [38, 42, 38, 43],
                                      text: "n",
                                      bindingKey: "n$96w30i9eqr9l$0",
                                    },
                                    name: "get",
                                  },
                                  arguments: [],
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "number",
                                  loc: [38, 52, 38, 53],
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
                        loc: [38, 56, 38, 59],
                        text: "add",
                      },
                    ],
                  },
                  {
                    kind: "jsx",
                    loc: [39, 13, 39, 29],
                    type: {
                      kind: "string",
                      loc: [39, 14, 39, 15],
                      text: "p",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "()",
                        loc: [39, 17, 39, 24],
                        expression: {
                          kind: "id",
                          loc: [39, 17, 39, 22],
                          text: "label",
                          bindingKey: "label$96w30i9eqr9l$2",
                        },
                        arguments: [],
                      },
                    ],
                  },
                ],
              },
            },
          ],
        }),
      ),
    );
    assert.equal(logged.length, 1);
    // A new object, but `isBig` is still false.
    await press();
    assert.equal(logged.length, 1);
    await press();
    assert.equal(logged.length, 2);
    assert.ok(screen.getByText("big"));
  });
  it("keeps a state's readers from updating for an equal value", async () => {
    await render(
      cs.create(
        [57, 7, 74, 9],
        {
          version: "0.0.0",
          filePath: "state/equals.test.tsx",
          fileHash: "96w30i9eqr9l",
          splices: {
            $state: { value: state, params: [] },
            $window: { value: window, params: [] },
          },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [57, 10, 74, 8],
          statements: [
            {
              kind: "const",
              loc: [58, 9, 61, 11],
              name: {
                kind: "id",
                loc: [58, 15, 58, 20],
                text: "point",
                bindingKey: "point$96w30i9eqr9l$5",
              },
              initializer: {
                kind: "()",
                loc: [58, 23, 61, 10],
                expression: {
                  kind: "splice",
                  loc: [58, 23, 58, 29],
                  key: "$state",
                },
                arguments: [
                  {
                    kind: "obj",
                    loc: [59, 11, 59, 19],
                    properties: [
                      {
                        kind: ":",
                        loc: [59, 13, 59, 17],
                        name: {
                          kind: "string",
                          loc: [59, 13, 59, 14],
                          text: "x",
                        },
                        initializer: {
                          kind: "number",
                          loc: [59, 16, 59, 17],
                          value: 1,
                        },
                      },
                    ],
                  },
                  {
                    kind: "obj",
                    loc: [60, 11, 60, 64],
                    properties: [
                      {
                        kind: ":",
                        loc: [60, 13, 60, 62],
                        name: {
                          kind: "string",
                          loc: [60, 13, 60, 19],
                          text: "equals",
                        },
                        initializer: {
                          kind: "=>",
                          loc: [60, 21, 60, 62],
                          parameters: [
                            {
                              kind: "param",
                              loc: [60, 22, 60, 30],
                              name: {
                                kind: "id",
                                loc: [60, 22, 60, 30],
                                text: "previous",
                                bindingKey: "previous$96w30i9eqr9l$7",
                              },
                            },
                            {
                              kind: "param",
                              loc: [60, 32, 60, 36],
                              name: {
                                kind: "id",
                                loc: [60, 32, 60, 36],
                                text: "next",
                                bindingKey: "next$96w30i9eqr9l$8",
                              },
                            },
                          ],
                          body: {
                            kind: "binop",
                            loc: [60, 41, 60, 62],
                            left: {
                              kind: ".",
                              loc: [60, 41, 60, 51],
                              expression: {
                                kind: "id",
                                loc: [60, 41, 60, 49],
                                text: "previous",
                                bindingKey: "previous$96w30i9eqr9l$7",
                              },
                              name: "x",
                            },
                            operatorToken: "===",
                            right: {
                              kind: ".",
                              loc: [60, 56, 60, 62],
                              expression: {
                                kind: "id",
                                loc: [60, 56, 60, 60],
                                text: "next",
                                bindingKey: "next$96w30i9eqr9l$8",
                              },
                              name: "x",
                            },
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              kind: "const",
              loc: [62, 9, 65, 11],
              name: {
                kind: "id",
                loc: [62, 15, 62, 20],
                text: "label",
                bindingKey: "label$96w30i9eqr9l$6",
              },
              initializer: {
                kind: "=>",
                loc: [62, 23, 65, 10],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [62, 29, 65, 10],
                  statements: [
                    {
                      kind: "()",
                      loc: [63, 11, 63, 32],
                      expression: {
                        kind: ".",
                        loc: [63, 11, 63, 30],
                        expression: {
                          kind: ".",
                          loc: [63, 11, 63, 26],
                          expression: {
                            kind: "splice",
                            loc: [63, 11, 63, 18],
                            key: "$window",
                          },
                          name: "console",
                        },
                        name: "log",
                      },
                      arguments: [],
                    },
                    {
                      kind: "return",
                      loc: [64, 11, 64, 39],
                      expression: {
                        kind: "binop",
                        loc: [64, 18, 64, 38],
                        left: {
                          kind: "string",
                          loc: [64, 18, 64, 22],
                          text: "x ",
                        },
                        operatorToken: "+",
                        right: {
                          kind: ".",
                          loc: [64, 25, 64, 38],
                          expression: {
                            kind: "()",
                            loc: [64, 25, 64, 36],
                            expression: {
                              kind: ".",
                              loc: [64, 25, 64, 34],
                              expression: {
                                kind: "id",
                                loc: [64, 25, 64, 30],
                                text: "point",
                                bindingKey: "point$96w30i9eqr9l$5",
                              },
                              name: "get",
                            },
                            arguments: [],
                          },
                          name: "x",
                        },
                      },
                    },
                  ],
                },
              },
            },
            {
              kind: "return",
              loc: [66, 9, 73, 11],
              expression: {
                kind: "jsx",
                loc: [67, 11, 72, 17],
                type: {
                  kind: "string",
                  loc: [67, 12, 67, 15],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [68, 13, 70, 22],
                    type: {
                      kind: "string",
                      loc: [68, 14, 68, 20],
                      text: "button",
                    },
                    attributes: [
                      {
                        name: "onclick",
                        initializer: {
                          kind: "=>",
                          loc: [68, 30, 68, 67],
                          parameters: [],
                          body: {
                            kind: "()",
                            loc: [68, 36, 68, 67],
                            expression: {
                              kind: ".",
                              loc: [68, 36, 68, 45],
                              expression: {
                                kind: "id",
                                loc: [68, 36, 68, 41],
                                text: "point",
                                bindingKey: "point$96w30i9eqr9l$5",
                              },
                              name: "set",
                            },
                            arguments: [
                              {
                                kind: "obj",
                                loc: [68, 46, 68, 66],
                                properties: [
                                  {
                                    kind: ":",
                                    loc: [68, 48, 68, 64],
                                    name: {
                                      kind: "string",
                                      loc: [68, 48, 68, 49],
                                      text: "x",
                                    },
                                    initializer: {
                                      kind: ".",
                                      loc: [68, 51, 68, 64],
                                      expression: {
                                        kind: "()",
                                        loc: [68, 51, 68, 62],
                                        expression: {
                                          kind: ".",
                                          loc: [68, 51, 68, 60],
                                          expression: {
                                            kind: "id",
                                            loc: [68, 51, 68, 56],
                                            text: "point",
                                            bindingKey: "point$96w30i9eqr9l$5",
                                          },
                                          name: "get",
                                        },
                                        arguments: [],
                                      },
                                      name: "x",
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
                        loc: [69, 15, 70, 13],
                        text: "same",
                      },
                    ],
                  },
                  {
                    kind: "jsx",
                    loc: [71, 13, 71, 29],
                    type: {
                      kind: "string",
                      loc: [71, 14, 71, 15],
                      text: "p",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "()",
                        loc: [71, 17, 71, 24],
                        expression: {
                          kind: "id",
                          loc: [71, 17, 71, 22],
                          text: "label",
                          bindingKey: "label$96w30i9eqr9l$6",
                        },
                        arguments: [],
                      },
                    ],
                  },
                ],
              },
            },
          ],
        }),
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });
  it("is handed the previous and the next value", async () => {
    await render(
      cs.create(
        [82, 7, 90, 9],
        {
          version: "0.0.0",
          filePath: "state/equals.test.tsx",
          fileHash: "96w30i9eqr9l",
          splices: {
            $state: { value: state, params: [] },
            $window: { value: window, params: [] },
          },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [82, 10, 90, 8],
          statements: [
            {
              kind: "const",
              loc: [83, 9, 88, 12],
              name: {
                kind: "id",
                loc: [83, 15, 83, 16],
                text: "n",
                bindingKey: "n$96w30i9eqr9l$9",
              },
              initializer: {
                kind: "()",
                loc: [83, 19, 88, 11],
                expression: {
                  kind: "splice",
                  loc: [83, 19, 83, 25],
                  key: "$state",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [83, 26, 83, 27],
                    value: 1,
                  },
                  {
                    kind: "obj",
                    loc: [83, 29, 88, 10],
                    properties: [
                      {
                        kind: ":",
                        loc: [84, 11, 87, 12],
                        name: {
                          kind: "string",
                          loc: [84, 11, 84, 17],
                          text: "equals",
                        },
                        initializer: {
                          kind: "=>",
                          loc: [84, 19, 87, 12],
                          parameters: [
                            {
                              kind: "param",
                              loc: [84, 20, 84, 28],
                              name: {
                                kind: "id",
                                loc: [84, 20, 84, 28],
                                text: "previous",
                                bindingKey: "previous$96w30i9eqr9l$10",
                              },
                            },
                            {
                              kind: "param",
                              loc: [84, 30, 84, 34],
                              name: {
                                kind: "id",
                                loc: [84, 30, 84, 34],
                                text: "next",
                                bindingKey: "next$96w30i9eqr9l$11",
                              },
                            },
                          ],
                          body: {
                            kind: "{}",
                            loc: [84, 39, 87, 12],
                            statements: [
                              {
                                kind: "()",
                                loc: [85, 13, 85, 48],
                                expression: {
                                  kind: ".",
                                  loc: [85, 13, 85, 32],
                                  expression: {
                                    kind: ".",
                                    loc: [85, 13, 85, 28],
                                    expression: {
                                      kind: "splice",
                                      loc: [85, 13, 85, 20],
                                      key: "$window",
                                    },
                                    name: "console",
                                  },
                                  name: "log",
                                },
                                arguments: [
                                  {
                                    kind: "id",
                                    loc: [85, 33, 85, 41],
                                    text: "previous",
                                    bindingKey: "previous$96w30i9eqr9l$10",
                                  },
                                  {
                                    kind: "id",
                                    loc: [85, 43, 85, 47],
                                    text: "next",
                                    bindingKey: "next$96w30i9eqr9l$11",
                                  },
                                ],
                              },
                              {
                                kind: "return",
                                loc: [86, 13, 86, 38],
                                expression: {
                                  kind: "binop",
                                  loc: [86, 20, 86, 37],
                                  left: {
                                    kind: "id",
                                    loc: [86, 20, 86, 28],
                                    text: "previous",
                                    bindingKey: "previous$96w30i9eqr9l$10",
                                  },
                                  operatorToken: "===",
                                  right: {
                                    kind: "id",
                                    loc: [86, 33, 86, 37],
                                    text: "next",
                                    bindingKey: "next$96w30i9eqr9l$11",
                                  },
                                },
                              },
                            ],
                          },
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              kind: "return",
              loc: [89, 9, 89, 75],
              expression: {
                kind: "jsx",
                loc: [89, 16, 89, 74],
                type: {
                  kind: "string",
                  loc: [89, 17, 89, 23],
                  text: "button",
                },
                attributes: [
                  {
                    name: "onclick",
                    initializer: {
                      kind: "=>",
                      loc: [89, 33, 89, 47],
                      parameters: [],
                      body: {
                        kind: "()",
                        loc: [89, 39, 89, 47],
                        expression: {
                          kind: ".",
                          loc: [89, 39, 89, 44],
                          expression: {
                            kind: "id",
                            loc: [89, 39, 89, 40],
                            text: "n",
                            bindingKey: "n$96w30i9eqr9l$9",
                          },
                          name: "set",
                        },
                        arguments: [
                          {
                            kind: "number",
                            loc: [89, 45, 89, 46],
                            value: 2,
                          },
                        ],
                      },
                    },
                  },
                ],
                children: [
                  {
                    kind: "binop",
                    loc: [89, 50, 89, 64],
                    left: {
                      kind: "string",
                      loc: [89, 50, 89, 54],
                      text: "n ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [89, 57, 89, 64],
                      expression: {
                        kind: ".",
                        loc: [89, 57, 89, 62],
                        expression: {
                          kind: "id",
                          loc: [89, 57, 89, 58],
                          text: "n",
                          bindingKey: "n$96w30i9eqr9l$9",
                        },
                        name: "get",
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
    );
    await press();
    assert.deepEqual(logged, [[1, 2]]);
    assert.equal(screen.getByRole("button").textContent, "n 2");
  });
  it("is `===` when left out, so the same number doesn't update", async () => {
    await render(
      cs.create(
        [99, 7, 111, 9],
        {
          version: "0.0.0",
          filePath: "state/equals.test.tsx",
          fileHash: "96w30i9eqr9l",
          splices: {
            $state: { value: state, params: [] },
            $window: { value: window, params: [] },
          },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [99, 10, 111, 8],
          statements: [
            {
              kind: "const",
              loc: [100, 9, 100, 29],
              name: {
                kind: "id",
                loc: [100, 15, 100, 16],
                text: "n",
                bindingKey: "n$96w30i9eqr9l$12",
              },
              initializer: {
                kind: "()",
                loc: [100, 19, 100, 28],
                expression: {
                  kind: "splice",
                  loc: [100, 19, 100, 25],
                  key: "$state",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [100, 26, 100, 27],
                    value: 1,
                  },
                ],
              },
            },
            {
              kind: "const",
              loc: [101, 9, 104, 11],
              name: {
                kind: "id",
                loc: [101, 15, 101, 20],
                text: "label",
                bindingKey: "label$96w30i9eqr9l$13",
              },
              initializer: {
                kind: "=>",
                loc: [101, 23, 104, 10],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [101, 29, 104, 10],
                  statements: [
                    {
                      kind: "()",
                      loc: [102, 11, 102, 32],
                      expression: {
                        kind: ".",
                        loc: [102, 11, 102, 30],
                        expression: {
                          kind: ".",
                          loc: [102, 11, 102, 26],
                          expression: {
                            kind: "splice",
                            loc: [102, 11, 102, 18],
                            key: "$window",
                          },
                          name: "console",
                        },
                        name: "log",
                      },
                      arguments: [],
                    },
                    {
                      kind: "return",
                      loc: [103, 11, 103, 33],
                      expression: {
                        kind: "binop",
                        loc: [103, 18, 103, 32],
                        left: {
                          kind: "string",
                          loc: [103, 18, 103, 22],
                          text: "n ",
                        },
                        operatorToken: "+",
                        right: {
                          kind: "()",
                          loc: [103, 25, 103, 32],
                          expression: {
                            kind: ".",
                            loc: [103, 25, 103, 30],
                            expression: {
                              kind: "id",
                              loc: [103, 25, 103, 26],
                              text: "n",
                              bindingKey: "n$96w30i9eqr9l$12",
                            },
                            name: "get",
                          },
                          arguments: [],
                        },
                      },
                    },
                  ],
                },
              },
            },
            {
              kind: "return",
              loc: [105, 9, 110, 11],
              expression: {
                kind: "jsx",
                loc: [106, 11, 109, 17],
                type: {
                  kind: "string",
                  loc: [106, 12, 106, 15],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [107, 13, 107, 59],
                    type: {
                      kind: "string",
                      loc: [107, 14, 107, 20],
                      text: "button",
                    },
                    attributes: [
                      {
                        name: "onclick",
                        initializer: {
                          kind: "=>",
                          loc: [107, 30, 107, 44],
                          parameters: [],
                          body: {
                            kind: "()",
                            loc: [107, 36, 107, 44],
                            expression: {
                              kind: ".",
                              loc: [107, 36, 107, 41],
                              expression: {
                                kind: "id",
                                loc: [107, 36, 107, 37],
                                text: "n",
                                bindingKey: "n$96w30i9eqr9l$12",
                              },
                              name: "set",
                            },
                            arguments: [
                              {
                                kind: "number",
                                loc: [107, 42, 107, 43],
                                value: 1,
                              },
                            ],
                          },
                        },
                      },
                    ],
                    children: [
                      {
                        kind: "string",
                        loc: [107, 46, 107, 50],
                        text: "same",
                      },
                    ],
                  },
                  {
                    kind: "jsx",
                    loc: [108, 13, 108, 29],
                    type: {
                      kind: "string",
                      loc: [108, 14, 108, 15],
                      text: "p",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "()",
                        loc: [108, 17, 108, 24],
                        expression: {
                          kind: "id",
                          loc: [108, 17, 108, 22],
                          text: "label",
                          bindingKey: "label$96w30i9eqr9l$13",
                        },
                        arguments: [],
                      },
                    ],
                  },
                ],
              },
            },
          ],
        }),
      ),
    );
    await press();
    assert.equal(logged.length, 1);
  });
  it("is `===` when left out, so a new object always updates", async () => {
    await render(
      cs.create(
        [119, 7, 133, 9],
        {
          version: "0.0.0",
          filePath: "state/equals.test.tsx",
          fileHash: "96w30i9eqr9l",
          splices: {
            $state: { value: state, params: [] },
            $window: { value: window, params: [] },
          },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [119, 10, 133, 8],
          statements: [
            {
              kind: "const",
              loc: [120, 9, 120, 40],
              name: {
                kind: "id",
                loc: [120, 15, 120, 20],
                text: "point",
                bindingKey: "point$96w30i9eqr9l$14",
              },
              initializer: {
                kind: "()",
                loc: [120, 23, 120, 39],
                expression: {
                  kind: "splice",
                  loc: [120, 23, 120, 29],
                  key: "$state",
                },
                arguments: [
                  {
                    kind: "obj",
                    loc: [120, 30, 120, 38],
                    properties: [
                      {
                        kind: ":",
                        loc: [120, 32, 120, 36],
                        name: {
                          kind: "string",
                          loc: [120, 32, 120, 33],
                          text: "x",
                        },
                        initializer: {
                          kind: "number",
                          loc: [120, 35, 120, 36],
                          value: 1,
                        },
                      },
                    ],
                  },
                ],
              },
            },
            {
              kind: "const",
              loc: [121, 9, 124, 11],
              name: {
                kind: "id",
                loc: [121, 15, 121, 20],
                text: "label",
                bindingKey: "label$96w30i9eqr9l$15",
              },
              initializer: {
                kind: "=>",
                loc: [121, 23, 124, 10],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [121, 29, 124, 10],
                  statements: [
                    {
                      kind: "()",
                      loc: [122, 11, 122, 32],
                      expression: {
                        kind: ".",
                        loc: [122, 11, 122, 30],
                        expression: {
                          kind: ".",
                          loc: [122, 11, 122, 26],
                          expression: {
                            kind: "splice",
                            loc: [122, 11, 122, 18],
                            key: "$window",
                          },
                          name: "console",
                        },
                        name: "log",
                      },
                      arguments: [],
                    },
                    {
                      kind: "return",
                      loc: [123, 11, 123, 39],
                      expression: {
                        kind: "binop",
                        loc: [123, 18, 123, 38],
                        left: {
                          kind: "string",
                          loc: [123, 18, 123, 22],
                          text: "x ",
                        },
                        operatorToken: "+",
                        right: {
                          kind: ".",
                          loc: [123, 25, 123, 38],
                          expression: {
                            kind: "()",
                            loc: [123, 25, 123, 36],
                            expression: {
                              kind: ".",
                              loc: [123, 25, 123, 34],
                              expression: {
                                kind: "id",
                                loc: [123, 25, 123, 30],
                                text: "point",
                                bindingKey: "point$96w30i9eqr9l$14",
                              },
                              name: "get",
                            },
                            arguments: [],
                          },
                          name: "x",
                        },
                      },
                    },
                  ],
                },
              },
            },
            {
              kind: "return",
              loc: [125, 9, 132, 11],
              expression: {
                kind: "jsx",
                loc: [126, 11, 131, 17],
                type: {
                  kind: "string",
                  loc: [126, 12, 126, 15],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [127, 13, 129, 22],
                    type: {
                      kind: "string",
                      loc: [127, 14, 127, 20],
                      text: "button",
                    },
                    attributes: [
                      {
                        name: "onclick",
                        initializer: {
                          kind: "=>",
                          loc: [127, 30, 127, 67],
                          parameters: [],
                          body: {
                            kind: "()",
                            loc: [127, 36, 127, 67],
                            expression: {
                              kind: ".",
                              loc: [127, 36, 127, 45],
                              expression: {
                                kind: "id",
                                loc: [127, 36, 127, 41],
                                text: "point",
                                bindingKey: "point$96w30i9eqr9l$14",
                              },
                              name: "set",
                            },
                            arguments: [
                              {
                                kind: "obj",
                                loc: [127, 46, 127, 66],
                                properties: [
                                  {
                                    kind: ":",
                                    loc: [127, 48, 127, 64],
                                    name: {
                                      kind: "string",
                                      loc: [127, 48, 127, 49],
                                      text: "x",
                                    },
                                    initializer: {
                                      kind: ".",
                                      loc: [127, 51, 127, 64],
                                      expression: {
                                        kind: "()",
                                        loc: [127, 51, 127, 62],
                                        expression: {
                                          kind: ".",
                                          loc: [127, 51, 127, 60],
                                          expression: {
                                            kind: "id",
                                            loc: [127, 51, 127, 56],
                                            text: "point",
                                            bindingKey: "point$96w30i9eqr9l$14",
                                          },
                                          name: "get",
                                        },
                                        arguments: [],
                                      },
                                      name: "x",
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
                        loc: [128, 15, 129, 13],
                        text: "same",
                      },
                    ],
                  },
                  {
                    kind: "jsx",
                    loc: [130, 13, 130, 29],
                    type: {
                      kind: "string",
                      loc: [130, 14, 130, 15],
                      text: "p",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "()",
                        loc: [130, 17, 130, 24],
                        expression: {
                          kind: "id",
                          loc: [130, 17, 130, 22],
                          text: "label",
                          bindingKey: "label$96w30i9eqr9l$15",
                        },
                        arguments: [],
                      },
                    ],
                  },
                ],
              },
            },
          ],
        }),
      ),
    );
    await press();
    assert.equal(logged.length, 2);
  });
});
