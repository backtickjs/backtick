import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { cs, onMount, state } from "@backtickjs/core";
import { render, screen } from "@backtickjs/web-testing";
import { window } from "@backtickjs/web-sdk";
import { userEvent } from "@testing-library/user-event";
// `ref` hands a script the element it is written on.
describe("ref", () => {
  it("keeps the element for a handler to use", async () => {
    await render(
      cs.create(
        [12, 7, 20, 9],
        {
          version: "0.0.0",
          filePath: "render/ref.test.tsx",
          fileHash: "1omn3ou0fqxtc",
          splices: { $state: { value: state, params: [] } },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [12, 10, 20, 8],
          statements: [
            {
              kind: "const",
              loc: [13, 9, 13, 61],
              name: {
                kind: "id",
                loc: [13, 15, 13, 20],
                text: "field",
                bindingKey: "field$1omn3ou0fqxtc$0",
              },
              initializer: {
                kind: "()",
                loc: [13, 23, 13, 60],
                expression: {
                  kind: "splice",
                  loc: [13, 23, 13, 29],
                  key: "$state",
                },
                arguments: [
                  {
                    kind: "null",
                    loc: [13, 55, 13, 59],
                  },
                ],
              },
            },
            {
              kind: "return",
              loc: [14, 9, 19, 11],
              expression: {
                kind: "jsx",
                loc: [15, 11, 18, 17],
                type: {
                  kind: "string",
                  loc: [15, 12, 15, 15],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [16, 13, 16, 78],
                    type: {
                      kind: "string",
                      loc: [16, 14, 16, 19],
                      text: "input",
                    },
                    attributes: [
                      {
                        name: "aria-label",
                        initializer: {
                          kind: "string",
                          loc: [16, 31, 16, 37],
                          text: "name",
                        },
                      },
                      {
                        name: "ref",
                        initializer: {
                          kind: "=>",
                          loc: [16, 43, 16, 74],
                          parameters: [
                            {
                              kind: "param",
                              loc: [16, 44, 16, 51],
                              name: {
                                kind: "id",
                                loc: [16, 44, 16, 51],
                                text: "element",
                                bindingKey: "element$1omn3ou0fqxtc$1",
                              },
                            },
                          ],
                          body: {
                            kind: "()",
                            loc: [16, 56, 16, 74],
                            expression: {
                              kind: ".",
                              loc: [16, 56, 16, 65],
                              expression: {
                                kind: "id",
                                loc: [16, 56, 16, 61],
                                text: "field",
                                bindingKey: "field$1omn3ou0fqxtc$0",
                              },
                              name: "set",
                            },
                            arguments: [
                              {
                                kind: "id",
                                loc: [16, 66, 16, 73],
                                text: "element",
                                bindingKey: "element$1omn3ou0fqxtc$1",
                              },
                            ],
                          },
                        },
                      },
                    ],
                    children: [],
                  },
                  {
                    kind: "jsx",
                    loc: [17, 13, 17, 71],
                    type: {
                      kind: "string",
                      loc: [17, 14, 17, 20],
                      text: "button",
                    },
                    attributes: [
                      {
                        name: "onclick",
                        initializer: {
                          kind: "=>",
                          loc: [17, 30, 17, 56],
                          parameters: [],
                          body: {
                            kind: "()",
                            loc: [17, 36, 17, 56],
                            expression: {
                              kind: "?.",
                              loc: [17, 36, 17, 54],
                              expression: {
                                kind: "()",
                                loc: [17, 36, 17, 47],
                                expression: {
                                  kind: ".",
                                  loc: [17, 36, 17, 45],
                                  expression: {
                                    kind: "id",
                                    loc: [17, 36, 17, 41],
                                    text: "field",
                                    bindingKey: "field$1omn3ou0fqxtc$0",
                                  },
                                  name: "get",
                                },
                                arguments: [],
                              },
                              name: "focus",
                            },
                            arguments: [],
                          },
                        },
                      },
                    ],
                    children: [
                      {
                        kind: "string",
                        loc: [17, 58, 17, 62],
                        text: "edit",
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
    await userEvent.click(screen.getByRole("button"));
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });
  it("focuses once in place, through onMount", async () => {
    await render(
      cs.create(
        [28, 7, 35, 9],
        {
          version: "0.0.0",
          filePath: "render/ref.test.tsx",
          fileHash: "1omn3ou0fqxtc",
          splices: { $onMount: { value: onMount, params: [] } },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [28, 10, 35, 8],
          statements: [
            {
              kind: "return",
              loc: [29, 9, 34, 11],
              expression: {
                kind: "jsx",
                loc: [30, 11, 33, 13],
                type: {
                  kind: "string",
                  loc: [30, 12, 30, 17],
                  text: "input",
                },
                attributes: [
                  {
                    name: "aria-label",
                    initializer: {
                      kind: "string",
                      loc: [31, 24, 31, 30],
                      text: "name",
                    },
                  },
                  {
                    name: "ref",
                    initializer: {
                      kind: "=>",
                      loc: [32, 18, 32, 62],
                      parameters: [
                        {
                          kind: "param",
                          loc: [32, 19, 32, 26],
                          name: {
                            kind: "id",
                            loc: [32, 19, 32, 26],
                            text: "element",
                            bindingKey: "element$1omn3ou0fqxtc$2",
                          },
                        },
                      ],
                      body: {
                        kind: "()",
                        loc: [32, 31, 32, 62],
                        expression: {
                          kind: "splice",
                          loc: [32, 31, 32, 39],
                          key: "$onMount",
                        },
                        arguments: [
                          {
                            kind: "=>",
                            loc: [32, 40, 32, 61],
                            parameters: [],
                            body: {
                              kind: "()",
                              loc: [32, 46, 32, 61],
                              expression: {
                                kind: ".",
                                loc: [32, 46, 32, 59],
                                expression: {
                                  kind: "id",
                                  loc: [32, 46, 32, 53],
                                  text: "element",
                                  bindingKey: "element$1omn3ou0fqxtc$2",
                                },
                                name: "focus",
                              },
                              arguments: [],
                            },
                          },
                        ],
                      },
                    },
                  },
                ],
                children: [],
              },
            },
          ],
        }),
      ),
    );
    assert.equal(document.activeElement, screen.getByLabelText("name"));
  });
  it("is not written as an attribute", async () => {
    await render(
      cs.create(
        [41, 18, 41, 64],
        {
          version: "0.0.0",
          filePath: "render/ref.test.tsx",
          fileHash: "1omn3ou0fqxtc",
          splices: {},
          captures: [],
        },
        () => ({
          kind: "jsx",
          loc: [41, 21, 41, 63],
          type: {
            kind: "string",
            loc: [41, 22, 41, 27],
            text: "input",
          },
          attributes: [
            {
              name: "aria-label",
              initializer: {
                kind: "string",
                loc: [41, 39, 41, 45],
                text: "name",
              },
            },
            {
              name: "ref",
              initializer: {
                kind: "=>",
                loc: [41, 51, 41, 59],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [41, 57, 41, 59],
                  statements: [],
                },
              },
            },
          ],
          children: [],
        }),
      ),
    );
    assert.equal(screen.getByLabelText("name").hasAttribute("ref"), false);
  });
  describe("is called once", () => {
    let calls = 0;
    const log = globalThis.window.console.log;
    beforeEach(() => {
      calls = 0;
      globalThis.window.console.log = () => {
        calls = calls + 1;
      };
    });
    afterEach(() => {
      globalThis.window.console.log = log;
    });
    // Drawn by a conditional, whose computation re-runs whenever it reads
    // something that changes, so a tracked read in `ref` would draw the
    // element again.
    it("even when a signal it read changes", async () => {
      await render(
        cs.create(
          [63, 9, 76, 11],
          {
            version: "0.0.0",
            filePath: "render/ref.test.tsx",
            fileHash: "1omn3ou0fqxtc",
            splices: {
              $state: { value: state, params: [] },
              $window: { value: window, params: [] },
            },
            captures: [],
          },
          () => ({
            kind: "{}",
            loc: [63, 12, 76, 10],
            statements: [
              {
                kind: "const",
                loc: [64, 11, 64, 38],
                name: {
                  kind: "id",
                  loc: [64, 17, 64, 22],
                  text: "shown",
                  bindingKey: "shown$1omn3ou0fqxtc$3",
                },
                initializer: {
                  kind: "()",
                  loc: [64, 25, 64, 37],
                  expression: {
                    kind: "splice",
                    loc: [64, 25, 64, 31],
                    key: "$state",
                  },
                  arguments: [
                    {
                      kind: "true",
                      loc: [64, 32, 64, 36],
                    },
                  ],
                },
              },
              {
                kind: "const",
                loc: [65, 11, 65, 31],
                name: {
                  kind: "id",
                  loc: [65, 17, 65, 18],
                  text: "n",
                  bindingKey: "n$1omn3ou0fqxtc$4",
                },
                initializer: {
                  kind: "()",
                  loc: [65, 21, 65, 30],
                  expression: {
                    kind: "splice",
                    loc: [65, 21, 65, 27],
                    key: "$state",
                  },
                  arguments: [
                    {
                      kind: "number",
                      loc: [65, 28, 65, 29],
                      value: 0,
                    },
                  ],
                },
              },
              {
                kind: "return",
                loc: [66, 11, 75, 13],
                expression: {
                  kind: "jsx",
                  loc: [67, 13, 74, 19],
                  type: {
                    kind: "string",
                    loc: [67, 14, 67, 17],
                    text: "div",
                  },
                  attributes: [],
                  children: [
                    {
                      kind: "jsx",
                      loc: [68, 15, 70, 24],
                      type: {
                        kind: "string",
                        loc: [68, 16, 68, 22],
                        text: "button",
                      },
                      attributes: [
                        {
                          name: "onclick",
                          initializer: {
                            kind: "=>",
                            loc: [68, 32, 68, 56],
                            parameters: [],
                            body: {
                              kind: "()",
                              loc: [68, 38, 68, 56],
                              expression: {
                                kind: ".",
                                loc: [68, 38, 68, 43],
                                expression: {
                                  kind: "id",
                                  loc: [68, 38, 68, 39],
                                  text: "n",
                                  bindingKey: "n$1omn3ou0fqxtc$4",
                                },
                                name: "set",
                              },
                              arguments: [
                                {
                                  kind: "binop",
                                  loc: [68, 44, 68, 55],
                                  left: {
                                    kind: "()",
                                    loc: [68, 44, 68, 51],
                                    expression: {
                                      kind: ".",
                                      loc: [68, 44, 68, 49],
                                      expression: {
                                        kind: "id",
                                        loc: [68, 44, 68, 45],
                                        text: "n",
                                        bindingKey: "n$1omn3ou0fqxtc$4",
                                      },
                                      name: "get",
                                    },
                                    arguments: [],
                                  },
                                  operatorToken: "+",
                                  right: {
                                    kind: "number",
                                    loc: [68, 54, 68, 55],
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
                          kind: "binop",
                          loc: [69, 18, 69, 32],
                          left: {
                            kind: "string",
                            loc: [69, 18, 69, 22],
                            text: "n ",
                          },
                          operatorToken: "+",
                          right: {
                            kind: "()",
                            loc: [69, 25, 69, 32],
                            expression: {
                              kind: ".",
                              loc: [69, 25, 69, 30],
                              expression: {
                                kind: "id",
                                loc: [69, 25, 69, 26],
                                text: "n",
                                bindingKey: "n$1omn3ou0fqxtc$4",
                              },
                              name: "get",
                            },
                            arguments: [],
                          },
                        },
                      ],
                    },
                    {
                      kind: "?:",
                      loc: [71, 16, 73, 23],
                      condition: {
                        kind: "()",
                        loc: [71, 16, 71, 27],
                        expression: {
                          kind: ".",
                          loc: [71, 16, 71, 25],
                          expression: {
                            kind: "id",
                            loc: [71, 16, 71, 21],
                            text: "shown",
                            bindingKey: "shown$1omn3ou0fqxtc$3",
                          },
                          name: "get",
                        },
                        arguments: [],
                      },
                      whenTrue: {
                        kind: "jsx",
                        loc: [72, 17, 72, 70],
                        type: {
                          kind: "string",
                          loc: [72, 18, 72, 19],
                          text: "p",
                        },
                        attributes: [
                          {
                            name: "ref",
                            initializer: {
                              kind: "=>",
                              loc: [72, 25, 72, 59],
                              parameters: [],
                              body: {
                                kind: "()",
                                loc: [72, 31, 72, 59],
                                expression: {
                                  kind: ".",
                                  loc: [72, 31, 72, 50],
                                  expression: {
                                    kind: ".",
                                    loc: [72, 31, 72, 46],
                                    expression: {
                                      kind: "splice",
                                      loc: [72, 31, 72, 38],
                                      key: "$window",
                                    },
                                    name: "console",
                                  },
                                  name: "log",
                                },
                                arguments: [
                                  {
                                    kind: "()",
                                    loc: [72, 51, 72, 58],
                                    expression: {
                                      kind: ".",
                                      loc: [72, 51, 72, 56],
                                      expression: {
                                        kind: "id",
                                        loc: [72, 51, 72, 52],
                                        text: "n",
                                        bindingKey: "n$1omn3ou0fqxtc$4",
                                      },
                                      name: "get",
                                    },
                                    arguments: [],
                                  },
                                ],
                              },
                            },
                          },
                        ],
                        children: [
                          {
                            kind: "string",
                            loc: [72, 61, 72, 66],
                            text: "shown",
                          },
                        ],
                      },
                      whenFalse: {
                        kind: "null",
                        loc: [73, 19, 73, 23],
                      },
                    },
                  ],
                },
              },
            ],
          }),
        ),
      );
      const shownText = screen.getByText("shown");
      await userEvent.click(screen.getByRole("button"));
      assert.equal(screen.getByRole("button").textContent, "n 1");
      assert.equal(calls, 1);
      assert.equal(screen.getByText("shown"), shownText);
    });
  });
});
