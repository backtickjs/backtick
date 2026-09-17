import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { it } from "node:test";
import { cs, For, state } from "@backtickjs/core";
import { snapshotCase } from "../snapshotCase.ts";
// A list whose members carry storage of their own: `build` declares a cell per
// row, and the cell the list reads holds those cells along with the rows. A
// press writes into one row's cell, so only what read that cell runs again —
// the array is the array it was, and no other row moves.
//
// What a cell starts at is the other half of this: the initial is a call here,
// not data, which is what a cell declared where it is evaluated allows.
async function MemberRows() {
  return cs.create(
    [19, 10, 41, 5],
    {
      version: "0.0.0",
      filePath: "state/member-state.test.tsx",
      fileHash: "30ur5mgzea4v6",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [19, 13, 41, 4],
      statements: [
        {
          kind: "const",
          loc: [20, 5, 24, 7],
          name: {
            kind: "id",
            loc: [20, 11, 20, 16],
            text: "build",
            bindingKey: "build$30ur5mgzea4v6$0",
          },
          initializer: {
            kind: "=>",
            loc: [20, 19, 24, 6],
            parameters: [
              {
                kind: "param",
                loc: [20, 20, 20, 32],
                name: {
                  kind: "id",
                  loc: [20, 20, 20, 24],
                  text: "from",
                  bindingKey: "from$30ur5mgzea4v6$2",
                },
              },
            ],
            body: {
              kind: "{}",
              loc: [20, 37, 24, 6],
              statements: [
                {
                  kind: "return",
                  loc: [21, 7, 23, 10],
                  expression: {
                    kind: "()",
                    loc: [21, 14, 23, 9],
                    expression: {
                      kind: "bltn",
                      loc: [21, 14, 21, 24],
                      name: "Array.from",
                    },
                    arguments: [
                      {
                        kind: "obj",
                        loc: [21, 25, 21, 38],
                        properties: [
                          {
                            kind: ":",
                            loc: [21, 27, 21, 36],
                            name: {
                              kind: "string",
                              loc: [21, 27, 21, 33],
                              text: "length",
                            },
                            initializer: {
                              kind: "number",
                              loc: [21, 35, 21, 36],
                              value: 3,
                            },
                          },
                        ],
                      },
                      {
                        kind: "=>",
                        loc: [21, 40, 23, 8],
                        parameters: [
                          {
                            kind: "param",
                            loc: [21, 41, 21, 42],
                            name: {
                              kind: "id",
                              loc: [21, 41, 21, 42],
                              text: "_",
                              bindingKey: "_$30ur5mgzea4v6$3",
                            },
                          },
                          {
                            kind: "param",
                            loc: [21, 44, 21, 46],
                            name: {
                              kind: "id",
                              loc: [21, 44, 21, 46],
                              text: "at",
                              bindingKey: "at$30ur5mgzea4v6$4",
                            },
                          },
                        ],
                        body: {
                          kind: "{}",
                          loc: [21, 51, 23, 8],
                          statements: [
                            {
                              kind: "return",
                              loc: [22, 9, 22, 71],
                              expression: {
                                kind: "obj",
                                loc: [22, 16, 22, 70],
                                properties: [
                                  {
                                    kind: ":",
                                    loc: [22, 18, 22, 31],
                                    name: {
                                      kind: "string",
                                      loc: [22, 18, 22, 20],
                                      text: "id",
                                    },
                                    initializer: {
                                      kind: "binop",
                                      loc: [22, 22, 22, 31],
                                      left: {
                                        kind: "id",
                                        loc: [22, 22, 22, 26],
                                        text: "from",
                                        bindingKey: "from$30ur5mgzea4v6$2",
                                      },
                                      operatorToken: "+",
                                      right: {
                                        kind: "id",
                                        loc: [22, 29, 22, 31],
                                        text: "at",
                                        bindingKey: "at$30ur5mgzea4v6$4",
                                      },
                                    },
                                  },
                                  {
                                    kind: ":",
                                    loc: [22, 33, 22, 68],
                                    name: {
                                      kind: "string",
                                      loc: [22, 33, 22, 38],
                                      text: "label",
                                    },
                                    initializer: {
                                      kind: "()",
                                      loc: [22, 40, 22, 68],
                                      expression: {
                                        kind: "splice",
                                        loc: [22, 40, 22, 46],
                                        key: "$state",
                                      },
                                      arguments: [
                                        {
                                          kind: "binop",
                                          loc: [22, 47, 22, 67],
                                          left: {
                                            kind: "string",
                                            loc: [22, 47, 22, 53],
                                            text: "row ",
                                          },
                                          operatorToken: "+",
                                          right: {
                                            kind: "binop",
                                            loc: [22, 57, 22, 66],
                                            left: {
                                              kind: "id",
                                              loc: [22, 57, 22, 61],
                                              text: "from",
                                              bindingKey:
                                                "from$30ur5mgzea4v6$2",
                                            },
                                            operatorToken: "+",
                                            right: {
                                              kind: "id",
                                              loc: [22, 64, 22, 66],
                                              text: "at",
                                              bindingKey: "at$30ur5mgzea4v6$4",
                                            },
                                          },
                                        },
                                      ],
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        },
        {
          kind: "const",
          loc: [26, 5, 26, 35],
          name: {
            kind: "id",
            loc: [26, 11, 26, 15],
            text: "held",
            bindingKey: "held$30ur5mgzea4v6$1",
          },
          initializer: {
            kind: "()",
            loc: [26, 18, 26, 34],
            expression: {
              kind: "splice",
              loc: [26, 18, 26, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "()",
                loc: [26, 25, 26, 33],
                expression: {
                  kind: "id",
                  loc: [26, 25, 26, 30],
                  text: "build",
                  bindingKey: "build$30ur5mgzea4v6$0",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [26, 31, 26, 32],
                    value: 1,
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [28, 5, 40, 7],
          expression: {
            kind: "jsx",
            loc: [29, 7, 39, 13],
            type: {
              kind: "string",
              loc: [29, 8, 29, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [30, 9, 38, 14],
                type: {
                  kind: "string",
                  loc: [30, 10, 30, 12],
                  text: "ul",
                },
                attributes: [
                  {
                    name: "class",
                    initializer: {
                      kind: "string",
                      loc: [30, 19, 30, 25],
                      text: "rows",
                    },
                  },
                ],
                children: [
                  {
                    kind: "jsx",
                    loc: [31, 11, 37, 17],
                    type: {
                      kind: "splice",
                      loc: [31, 12, 31, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: "()",
                          loc: [31, 22, 31, 32],
                          expression: {
                            kind: ".",
                            loc: [31, 22, 31, 30],
                            expression: {
                              kind: "id",
                              loc: [31, 22, 31, 26],
                              text: "held",
                              bindingKey: "held$30ur5mgzea4v6$1",
                            },
                            name: "get",
                          },
                          arguments: [],
                        },
                      },
                    ],
                    children: [
                      {
                        kind: "=>",
                        loc: [32, 14, 36, 14],
                        parameters: [
                          {
                            kind: "param",
                            loc: [32, 15, 32, 23],
                            name: {
                              kind: "id",
                              loc: [32, 15, 32, 18],
                              text: "row",
                              bindingKey: "row$30ur5mgzea4v6$5",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [33, 15, 35, 20],
                          type: {
                            kind: "string",
                            loc: [33, 16, 33, 18],
                            text: "li",
                          },
                          attributes: [
                            {
                              name: "onclick",
                              initializer: {
                                kind: "=>",
                                loc: [33, 28, 33, 58],
                                parameters: [],
                                body: {
                                  kind: "()",
                                  loc: [33, 34, 33, 58],
                                  expression: {
                                    kind: ".",
                                    loc: [33, 34, 33, 47],
                                    expression: {
                                      kind: ".",
                                      loc: [33, 34, 33, 43],
                                      expression: {
                                        kind: "id",
                                        loc: [33, 34, 33, 37],
                                        text: "row",
                                        bindingKey: "row$30ur5mgzea4v6$5",
                                      },
                                      name: "label",
                                    },
                                    name: "set",
                                  },
                                  arguments: [
                                    {
                                      kind: "string",
                                      loc: [33, 48, 33, 57],
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
                              loc: [34, 18, 34, 33],
                              expression: {
                                kind: ".",
                                loc: [34, 18, 34, 31],
                                expression: {
                                  kind: ".",
                                  loc: [34, 18, 34, 27],
                                  expression: {
                                    kind: "id",
                                    loc: [34, 18, 34, 21],
                                    text: "row",
                                    bindingKey: "row$30ur5mgzea4v6$5",
                                  },
                                  name: "label",
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
                ],
              },
            ],
          },
        },
      ],
    }),
  );
}
it("MemberRows", async (t) => {
  await snapshotCase(t, "MemberRows", _jsx(MemberRows, {}));
});
