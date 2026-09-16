import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// An element a script writes, rather than one the host wrote and the script
// spliced in. What it lowers to is the node a tree entry builds, so the two
// spellings draw the same thing — the difference is where the element is
// written, not what it is.
async function Card() {
  return cs.create(
    [10, 10, 32, 5],
    {
      version: "0.0.0",
      filePath: "jsx/script-element.test.tsx",
      fileHash: "3hkmsn4zssih0",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [10, 13, 32, 4],
      statements: [
        {
          kind: "const",
          loc: [11, 5, 11, 32],
          name: {
            kind: "id",
            loc: [11, 11, 11, 16],
            text: "label",
            bindingKey: "label$3hkmsn4zssih0$0",
          },
          initializer: {
            kind: "()",
            loc: [11, 19, 11, 31],
            expression: {
              kind: "splice",
              loc: [11, 19, 11, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "string",
                loc: [11, 26, 11, 30],
                text: "hi",
              },
            ],
          },
        },
        {
          kind: "const",
          loc: [15, 5, 29, 7],
          name: {
            kind: "id",
            loc: [15, 11, 15, 14],
            text: "row",
            bindingKey: "row$3hkmsn4zssih0$1",
          },
          initializer: {
            kind: "=>",
            loc: [15, 17, 29, 6],
            parameters: [
              {
                kind: "param",
                loc: [15, 18, 15, 30],
                name: {
                  kind: "id",
                  loc: [15, 18, 15, 22],
                  text: "size",
                  bindingKey: "size$3hkmsn4zssih0$2",
                },
              },
            ],
            body: {
              kind: "{}",
              loc: [15, 35, 29, 6],
              statements: [
                {
                  kind: "const",
                  loc: [16, 7, 16, 47],
                  name: {
                    kind: "id",
                    loc: [16, 13, 16, 16],
                    text: "css",
                    bindingKey: "css$3hkmsn4zssih0$3",
                  },
                  initializer: {
                    kind: "binop",
                    loc: [16, 19, 16, 46],
                    left: {
                      kind: "binop",
                      loc: [16, 19, 16, 39],
                      left: {
                        kind: "string",
                        loc: [16, 19, 16, 32],
                        text: "font-size: ",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "id",
                        loc: [16, 35, 16, 39],
                        text: "size",
                        bindingKey: "size$3hkmsn4zssih0$2",
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [16, 42, 16, 46],
                      text: "px",
                    },
                  },
                },
                {
                  kind: "const",
                  loc: [17, 7, 17, 47],
                  name: {
                    kind: "id",
                    loc: [17, 13, 17, 18],
                    text: "press",
                    bindingKey: "press$3hkmsn4zssih0$4",
                  },
                  initializer: {
                    kind: "=>",
                    loc: [17, 21, 17, 46],
                    parameters: [],
                    body: {
                      kind: "()",
                      loc: [17, 27, 17, 46],
                      expression: {
                        kind: ".",
                        loc: [17, 27, 17, 38],
                        expression: {
                          kind: "id",
                          loc: [17, 27, 17, 32],
                          text: "label",
                          bindingKey: "label$3hkmsn4zssih0$0",
                        },
                        name: "write",
                      },
                      arguments: [
                        {
                          kind: "string",
                          loc: [17, 39, 17, 45],
                          text: "held",
                        },
                      ],
                    },
                  },
                },
                {
                  kind: "return",
                  loc: [18, 7, 28, 9],
                  expression: {
                    kind: "jsx",
                    loc: [19, 9, 27, 15],
                    type: {
                      kind: "string",
                      loc: [19, 10, 19, 13],
                      text: "div",
                    },
                    attributes: [
                      {
                        name: "style",
                        initializer: {
                          kind: "id",
                          loc: [19, 21, 19, 24],
                          text: "css",
                          bindingKey: "css$3hkmsn4zssih0$3",
                        },
                      },
                    ],
                    children: [
                      {
                        kind: "jsx",
                        loc: [20, 11, 22, 18],
                        type: {
                          kind: "string",
                          loc: [20, 12, 20, 16],
                          text: "span",
                        },
                        attributes: [
                          {
                            name: "style",
                            initializer: {
                              kind: "id",
                              loc: [20, 24, 20, 27],
                              text: "css",
                              bindingKey: "css$3hkmsn4zssih0$3",
                            },
                          },
                          {
                            name: "onclick",
                            initializer: {
                              kind: "=>",
                              loc: [20, 38, 20, 66],
                              parameters: [],
                              body: {
                                kind: "()",
                                loc: [20, 44, 20, 66],
                                expression: {
                                  kind: ".",
                                  loc: [20, 44, 20, 55],
                                  expression: {
                                    kind: "id",
                                    loc: [20, 44, 20, 49],
                                    text: "label",
                                    bindingKey: "label$3hkmsn4zssih0$0",
                                  },
                                  name: "write",
                                },
                                arguments: [
                                  {
                                    kind: "string",
                                    loc: [20, 56, 20, 65],
                                    text: "pressed",
                                  },
                                ],
                              },
                            },
                          },
                        ],
                        children: [
                          {
                            kind: "()",
                            loc: [21, 14, 21, 26],
                            expression: {
                              kind: ".",
                              loc: [21, 14, 21, 24],
                              expression: {
                                kind: "id",
                                loc: [21, 14, 21, 19],
                                text: "label",
                                bindingKey: "label$3hkmsn4zssih0$0",
                              },
                              name: "read",
                            },
                            arguments: [],
                          },
                        ],
                      },
                      {
                        kind: "jsx",
                        loc: [23, 11, 23, 52],
                        type: {
                          kind: "string",
                          loc: [23, 12, 23, 16],
                          text: "span",
                        },
                        attributes: [
                          {
                            name: "style",
                            initializer: {
                              kind: "string",
                              loc: [23, 23, 23, 39],
                              text: "font-size: 8px",
                            },
                          },
                        ],
                        children: [
                          {
                            kind: "string",
                            loc: [23, 40, 23, 45],
                            text: "fixed",
                          },
                        ],
                      },
                      {
                        kind: "jsx",
                        loc: [24, 11, 26, 18],
                        type: {
                          kind: "string",
                          loc: [24, 12, 24, 16],
                          text: "span",
                        },
                        attributes: [
                          {
                            name: "style",
                            initializer: {
                              kind: "id",
                              loc: [24, 24, 24, 27],
                              text: "css",
                              bindingKey: "css$3hkmsn4zssih0$3",
                            },
                          },
                          {
                            name: "onclick",
                            initializer: {
                              kind: "id",
                              loc: [24, 38, 24, 43],
                              text: "press",
                              bindingKey: "press$3hkmsn4zssih0$4",
                            },
                          },
                        ],
                        children: [
                          {
                            kind: "string",
                            loc: [25, 13, 26, 11],
                            text: "held",
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        {
          kind: "return",
          loc: [31, 5, 31, 52],
          expression: {
            kind: "jsx",
            loc: [31, 12, 31, 51],
            type: {
              kind: "string",
              loc: [31, 13, 31, 16],
              text: "div",
            },
            attributes: [
              {
                name: "style",
                initializer: {
                  kind: "string",
                  loc: [31, 23, 31, 35],
                  text: "padding: 0",
                },
              },
            ],
            children: [
              {
                kind: "()",
                loc: [31, 37, 31, 44],
                expression: {
                  kind: "id",
                  loc: [31, 37, 31, 40],
                  text: "row",
                  bindingKey: "row$3hkmsn4zssih0$1",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [31, 41, 31, 43],
                    value: 12,
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
it("Card", async (t) => {
  await snapshotCase(t, "Card", _jsx(Card, {}));
});
