import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { computed, cs, state } from "@backtickjs/core";
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
describe("computed", () => {
  it("runs once per change, however many read it", async () => {
    await render(
      cs.create(
        [25, 7, 39, 9],
        {
          version: "0.0.0",
          filePath: "state/computed.test.tsx",
          fileHash: "p5ya93p4wb8",
          splices: {
            $state: { value: state, params: [] },
            $computed: { value: computed, params: [] },
            $window: { value: window, params: [] },
          },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [25, 10, 39, 8],
          statements: [
            {
              kind: "const",
              loc: [26, 9, 26, 29],
              name: {
                kind: "id",
                loc: [26, 15, 26, 16],
                text: "n",
                bindingKey: "n$p5ya93p4wb8$0",
              },
              initializer: {
                kind: "()",
                loc: [26, 19, 26, 28],
                expression: {
                  kind: "splice",
                  loc: [26, 19, 26, 25],
                  key: "$state",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [26, 26, 26, 27],
                    value: 1,
                  },
                ],
              },
            },
            {
              kind: "const",
              loc: [27, 9, 30, 12],
              name: {
                kind: "id",
                loc: [27, 15, 27, 22],
                text: "doubled",
                bindingKey: "doubled$p5ya93p4wb8$1",
              },
              initializer: {
                kind: "()",
                loc: [27, 25, 30, 11],
                expression: {
                  kind: "splice",
                  loc: [27, 25, 27, 34],
                  key: "$computed",
                },
                arguments: [
                  {
                    kind: "=>",
                    loc: [27, 35, 30, 10],
                    parameters: [],
                    body: {
                      kind: "{}",
                      loc: [27, 41, 30, 10],
                      statements: [
                        {
                          kind: "()",
                          loc: [28, 11, 28, 32],
                          expression: {
                            kind: ".",
                            loc: [28, 11, 28, 30],
                            expression: {
                              kind: ".",
                              loc: [28, 11, 28, 26],
                              expression: {
                                kind: "splice",
                                loc: [28, 11, 28, 18],
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
                          loc: [29, 11, 29, 30],
                          expression: {
                            kind: "binop",
                            loc: [29, 18, 29, 29],
                            left: {
                              kind: "()",
                              loc: [29, 18, 29, 25],
                              expression: {
                                kind: ".",
                                loc: [29, 18, 29, 23],
                                expression: {
                                  kind: "id",
                                  loc: [29, 18, 29, 19],
                                  text: "n",
                                  bindingKey: "n$p5ya93p4wb8$0",
                                },
                                name: "get",
                              },
                              arguments: [],
                            },
                            operatorToken: "*",
                            right: {
                              kind: "number",
                              loc: [29, 28, 29, 29],
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
              loc: [31, 9, 38, 11],
              expression: {
                kind: "jsx",
                loc: [32, 11, 37, 17],
                type: {
                  kind: "string",
                  loc: [32, 12, 32, 15],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [33, 13, 33, 68],
                    type: {
                      kind: "string",
                      loc: [33, 14, 33, 20],
                      text: "button",
                    },
                    attributes: [
                      {
                        name: "onclick",
                        initializer: {
                          kind: "=>",
                          loc: [33, 30, 33, 54],
                          parameters: [],
                          body: {
                            kind: "()",
                            loc: [33, 36, 33, 54],
                            expression: {
                              kind: ".",
                              loc: [33, 36, 33, 41],
                              expression: {
                                kind: "id",
                                loc: [33, 36, 33, 37],
                                text: "n",
                                bindingKey: "n$p5ya93p4wb8$0",
                              },
                              name: "set",
                            },
                            arguments: [
                              {
                                kind: "binop",
                                loc: [33, 42, 33, 53],
                                left: {
                                  kind: "()",
                                  loc: [33, 42, 33, 49],
                                  expression: {
                                    kind: ".",
                                    loc: [33, 42, 33, 47],
                                    expression: {
                                      kind: "id",
                                      loc: [33, 42, 33, 43],
                                      text: "n",
                                      bindingKey: "n$p5ya93p4wb8$0",
                                    },
                                    name: "get",
                                  },
                                  arguments: [],
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "number",
                                  loc: [33, 52, 33, 53],
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
                        loc: [33, 56, 33, 59],
                        text: "add",
                      },
                    ],
                  },
                  {
                    kind: "jsx",
                    loc: [34, 13, 34, 42],
                    type: {
                      kind: "string",
                      loc: [34, 14, 34, 15],
                      text: "p",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "binop",
                        loc: [34, 17, 34, 37],
                        left: {
                          kind: "string",
                          loc: [34, 17, 34, 21],
                          text: "a ",
                        },
                        operatorToken: "+",
                        right: {
                          kind: "()",
                          loc: [34, 24, 34, 37],
                          expression: {
                            kind: ".",
                            loc: [34, 24, 34, 35],
                            expression: {
                              kind: "id",
                              loc: [34, 24, 34, 31],
                              text: "doubled",
                              bindingKey: "doubled$p5ya93p4wb8$1",
                            },
                            name: "get",
                          },
                          arguments: [],
                        },
                      },
                    ],
                  },
                  {
                    kind: "jsx",
                    loc: [35, 13, 35, 42],
                    type: {
                      kind: "string",
                      loc: [35, 14, 35, 15],
                      text: "p",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "binop",
                        loc: [35, 17, 35, 37],
                        left: {
                          kind: "string",
                          loc: [35, 17, 35, 21],
                          text: "b ",
                        },
                        operatorToken: "+",
                        right: {
                          kind: "()",
                          loc: [35, 24, 35, 37],
                          expression: {
                            kind: ".",
                            loc: [35, 24, 35, 35],
                            expression: {
                              kind: "id",
                              loc: [35, 24, 35, 31],
                              text: "doubled",
                              bindingKey: "doubled$p5ya93p4wb8$1",
                            },
                            name: "get",
                          },
                          arguments: [],
                        },
                      },
                    ],
                  },
                  {
                    kind: "jsx",
                    loc: [36, 13, 36, 42],
                    type: {
                      kind: "string",
                      loc: [36, 14, 36, 15],
                      text: "p",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "binop",
                        loc: [36, 17, 36, 37],
                        left: {
                          kind: "string",
                          loc: [36, 17, 36, 21],
                          text: "c ",
                        },
                        operatorToken: "+",
                        right: {
                          kind: "()",
                          loc: [36, 24, 36, 37],
                          expression: {
                            kind: ".",
                            loc: [36, 24, 36, 35],
                            expression: {
                              kind: "id",
                              loc: [36, 24, 36, 31],
                              text: "doubled",
                              bindingKey: "doubled$p5ya93p4wb8$1",
                            },
                            name: "get",
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
      ),
    );
    assert.equal(runs, 1);
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 2);
    assert.ok(screen.getByText("a 4"));
    assert.ok(screen.getByText("c 4"));
  });
  it("passes a change on only when its value changes", async () => {
    await render(
      cs.create(
        [51, 7, 64, 9],
        {
          version: "0.0.0",
          filePath: "state/computed.test.tsx",
          fileHash: "p5ya93p4wb8",
          splices: {
            $state: { value: state, params: [] },
            $computed: { value: computed, params: [] },
            $window: { value: window, params: [] },
          },
          captures: [],
        },
        () => ({
          kind: "{}",
          loc: [51, 10, 64, 8],
          statements: [
            {
              kind: "const",
              loc: [52, 9, 52, 29],
              name: {
                kind: "id",
                loc: [52, 15, 52, 16],
                text: "n",
                bindingKey: "n$p5ya93p4wb8$2",
              },
              initializer: {
                kind: "()",
                loc: [52, 19, 52, 28],
                expression: {
                  kind: "splice",
                  loc: [52, 19, 52, 25],
                  key: "$state",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [52, 26, 52, 27],
                    value: 1,
                  },
                ],
              },
            },
            {
              kind: "const",
              loc: [53, 9, 53, 52],
              name: {
                kind: "id",
                loc: [53, 15, 53, 20],
                text: "isBig",
                bindingKey: "isBig$p5ya93p4wb8$3",
              },
              initializer: {
                kind: "()",
                loc: [53, 23, 53, 51],
                expression: {
                  kind: "splice",
                  loc: [53, 23, 53, 32],
                  key: "$computed",
                },
                arguments: [
                  {
                    kind: "=>",
                    loc: [53, 33, 53, 50],
                    parameters: [],
                    body: {
                      kind: "binop",
                      loc: [53, 39, 53, 50],
                      left: {
                        kind: "()",
                        loc: [53, 39, 53, 46],
                        expression: {
                          kind: ".",
                          loc: [53, 39, 53, 44],
                          expression: {
                            kind: "id",
                            loc: [53, 39, 53, 40],
                            text: "n",
                            bindingKey: "n$p5ya93p4wb8$2",
                          },
                          name: "get",
                        },
                        arguments: [],
                      },
                      operatorToken: ">",
                      right: {
                        kind: "number",
                        loc: [53, 49, 53, 50],
                        value: 2,
                      },
                    },
                  },
                ],
              },
            },
            {
              kind: "const",
              loc: [54, 9, 57, 11],
              name: {
                kind: "id",
                loc: [54, 15, 54, 20],
                text: "label",
                bindingKey: "label$p5ya93p4wb8$4",
              },
              initializer: {
                kind: "=>",
                loc: [54, 23, 57, 10],
                parameters: [],
                body: {
                  kind: "{}",
                  loc: [54, 29, 57, 10],
                  statements: [
                    {
                      kind: "()",
                      loc: [55, 11, 55, 32],
                      expression: {
                        kind: ".",
                        loc: [55, 11, 55, 30],
                        expression: {
                          kind: ".",
                          loc: [55, 11, 55, 26],
                          expression: {
                            kind: "splice",
                            loc: [55, 11, 55, 18],
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
                      loc: [56, 11, 56, 48],
                      expression: {
                        kind: "?:",
                        loc: [56, 18, 56, 47],
                        condition: {
                          kind: "()",
                          loc: [56, 18, 56, 29],
                          expression: {
                            kind: ".",
                            loc: [56, 18, 56, 27],
                            expression: {
                              kind: "id",
                              loc: [56, 18, 56, 23],
                              text: "isBig",
                              bindingKey: "isBig$p5ya93p4wb8$3",
                            },
                            name: "get",
                          },
                          arguments: [],
                        },
                        whenTrue: {
                          kind: "string",
                          loc: [56, 32, 56, 37],
                          text: "big",
                        },
                        whenFalse: {
                          kind: "string",
                          loc: [56, 40, 56, 47],
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
              loc: [58, 9, 63, 11],
              expression: {
                kind: "jsx",
                loc: [59, 11, 62, 17],
                type: {
                  kind: "string",
                  loc: [59, 12, 59, 15],
                  text: "div",
                },
                attributes: [],
                children: [
                  {
                    kind: "jsx",
                    loc: [60, 13, 60, 68],
                    type: {
                      kind: "string",
                      loc: [60, 14, 60, 20],
                      text: "button",
                    },
                    attributes: [
                      {
                        name: "onclick",
                        initializer: {
                          kind: "=>",
                          loc: [60, 30, 60, 54],
                          parameters: [],
                          body: {
                            kind: "()",
                            loc: [60, 36, 60, 54],
                            expression: {
                              kind: ".",
                              loc: [60, 36, 60, 41],
                              expression: {
                                kind: "id",
                                loc: [60, 36, 60, 37],
                                text: "n",
                                bindingKey: "n$p5ya93p4wb8$2",
                              },
                              name: "set",
                            },
                            arguments: [
                              {
                                kind: "binop",
                                loc: [60, 42, 60, 53],
                                left: {
                                  kind: "()",
                                  loc: [60, 42, 60, 49],
                                  expression: {
                                    kind: ".",
                                    loc: [60, 42, 60, 47],
                                    expression: {
                                      kind: "id",
                                      loc: [60, 42, 60, 43],
                                      text: "n",
                                      bindingKey: "n$p5ya93p4wb8$2",
                                    },
                                    name: "get",
                                  },
                                  arguments: [],
                                },
                                operatorToken: "+",
                                right: {
                                  kind: "number",
                                  loc: [60, 52, 60, 53],
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
                        loc: [60, 56, 60, 59],
                        text: "add",
                      },
                    ],
                  },
                  {
                    kind: "jsx",
                    loc: [61, 13, 61, 29],
                    type: {
                      kind: "string",
                      loc: [61, 14, 61, 15],
                      text: "p",
                    },
                    attributes: [],
                    children: [
                      {
                        kind: "()",
                        loc: [61, 17, 61, 24],
                        expression: {
                          kind: "id",
                          loc: [61, 17, 61, 22],
                          text: "label",
                          bindingKey: "label$p5ya93p4wb8$4",
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
    assert.equal(runs, 1);
    // 1 to 2: still small, so the reader doesn't run.
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 1);
    // 2 to 3: big now.
    await userEvent.click(screen.getByRole("button"));
    assert.equal(runs, 2);
    assert.ok(screen.getByText("big"));
  });
});
