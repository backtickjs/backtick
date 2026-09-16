import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, For, state } from "@backtickjs/core";
// A list whose members carry storage of their own: `build` declares a cell per
// row, and the cell the list reads holds those cells along with the rows. A
// press writes into one row's cell, so only what read that cell runs again —
// the array is the array it was, and no other row moves.
//
// What a cell starts at is the other half of this: the initial is a call here,
// not data, which is what a cell declared where it is evaluated allows.
async function Rows() {
  return cs.create(
    [16, 10, 38, 5],
    {
      version: "0.0.0",
      filePath: "member-state.tsx",
      fileHash: "2rpyn3ijclm5s",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [16, 13, 38, 4],
      statements: [
        {
          kind: "const",
          loc: [17, 5, 21, 7],
          name: {
            kind: "id",
            loc: [17, 11, 17, 16],
            text: "build",
            bindingKey: "build$2rpyn3ijclm5s$0",
          },
          initializer: {
            kind: "=>",
            loc: [17, 19, 21, 6],
            parameters: [
              {
                kind: "param",
                loc: [17, 20, 17, 32],
                name: {
                  kind: "id",
                  loc: [17, 20, 17, 24],
                  text: "from",
                  bindingKey: "from$2rpyn3ijclm5s$2",
                },
              },
            ],
            body: {
              kind: "{}",
              loc: [17, 37, 21, 6],
              statements: [
                {
                  kind: "return",
                  loc: [18, 7, 20, 10],
                  expression: {
                    kind: "()",
                    loc: [18, 14, 20, 9],
                    expression: {
                      kind: "bltn",
                      loc: [18, 14, 18, 24],
                      name: "Array.from",
                    },
                    arguments: [
                      {
                        kind: "obj",
                        loc: [18, 25, 18, 38],
                        properties: [
                          {
                            kind: ":",
                            loc: [18, 27, 18, 36],
                            name: "length",
                            initializer: {
                              kind: "number",
                              loc: [18, 35, 18, 36],
                              value: 3,
                            },
                          },
                        ],
                      },
                      {
                        kind: "=>",
                        loc: [18, 40, 20, 8],
                        parameters: [
                          {
                            kind: "param",
                            loc: [18, 41, 18, 42],
                            name: {
                              kind: "id",
                              loc: [18, 41, 18, 42],
                              text: "_",
                              bindingKey: "_$2rpyn3ijclm5s$3",
                            },
                          },
                          {
                            kind: "param",
                            loc: [18, 44, 18, 46],
                            name: {
                              kind: "id",
                              loc: [18, 44, 18, 46],
                              text: "at",
                              bindingKey: "at$2rpyn3ijclm5s$4",
                            },
                          },
                        ],
                        body: {
                          kind: "{}",
                          loc: [18, 51, 20, 8],
                          statements: [
                            {
                              kind: "return",
                              loc: [19, 9, 19, 71],
                              expression: {
                                kind: "obj",
                                loc: [19, 16, 19, 70],
                                properties: [
                                  {
                                    kind: ":",
                                    loc: [19, 18, 19, 31],
                                    name: "id",
                                    initializer: {
                                      kind: "binop",
                                      loc: [19, 22, 19, 31],
                                      left: {
                                        kind: "id",
                                        loc: [19, 22, 19, 26],
                                        text: "from",
                                        bindingKey: "from$2rpyn3ijclm5s$2",
                                      },
                                      operatorToken: "+",
                                      right: {
                                        kind: "id",
                                        loc: [19, 29, 19, 31],
                                        text: "at",
                                        bindingKey: "at$2rpyn3ijclm5s$4",
                                      },
                                    },
                                  },
                                  {
                                    kind: ":",
                                    loc: [19, 33, 19, 68],
                                    name: "label",
                                    initializer: {
                                      kind: "()",
                                      loc: [19, 40, 19, 68],
                                      expression: {
                                        kind: "splice",
                                        loc: [19, 40, 19, 46],
                                        key: "$state",
                                      },
                                      arguments: [
                                        {
                                          kind: "binop",
                                          loc: [19, 47, 19, 67],
                                          left: {
                                            kind: "string",
                                            loc: [19, 47, 19, 53],
                                            text: "row ",
                                          },
                                          operatorToken: "+",
                                          right: {
                                            kind: "binop",
                                            loc: [19, 57, 19, 66],
                                            left: {
                                              kind: "id",
                                              loc: [19, 57, 19, 61],
                                              text: "from",
                                              bindingKey:
                                                "from$2rpyn3ijclm5s$2",
                                            },
                                            operatorToken: "+",
                                            right: {
                                              kind: "id",
                                              loc: [19, 64, 19, 66],
                                              text: "at",
                                              bindingKey: "at$2rpyn3ijclm5s$4",
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
          loc: [23, 5, 23, 35],
          name: {
            kind: "id",
            loc: [23, 11, 23, 15],
            text: "held",
            bindingKey: "held$2rpyn3ijclm5s$1",
          },
          initializer: {
            kind: "()",
            loc: [23, 18, 23, 34],
            expression: {
              kind: "splice",
              loc: [23, 18, 23, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "()",
                loc: [23, 25, 23, 33],
                expression: {
                  kind: "id",
                  loc: [23, 25, 23, 30],
                  text: "build",
                  bindingKey: "build$2rpyn3ijclm5s$0",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [23, 31, 23, 32],
                    value: 1,
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [25, 5, 37, 7],
          expression: {
            kind: "jsx",
            loc: [26, 7, 36, 13],
            type: {
              kind: "string",
              loc: [26, 8, 26, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [27, 9, 35, 14],
                type: {
                  kind: "string",
                  loc: [27, 10, 27, 12],
                  text: "ul",
                },
                attributes: [
                  {
                    name: "class",
                    initializer: {
                      kind: "string",
                      loc: [27, 19, 27, 25],
                      text: "rows",
                    },
                  },
                ],
                children: [
                  {
                    kind: "jsx",
                    loc: [28, 11, 34, 17],
                    type: {
                      kind: "splice",
                      loc: [28, 12, 28, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: "()",
                          loc: [28, 22, 28, 33],
                          expression: {
                            kind: ".",
                            loc: [28, 22, 28, 31],
                            expression: {
                              kind: "id",
                              loc: [28, 22, 28, 26],
                              text: "held",
                              bindingKey: "held$2rpyn3ijclm5s$1",
                            },
                            name: "read",
                          },
                          arguments: [],
                        },
                      },
                    ],
                    children: [
                      {
                        kind: "=>",
                        loc: [29, 14, 33, 14],
                        parameters: [
                          {
                            kind: "param",
                            loc: [29, 15, 29, 23],
                            name: {
                              kind: "id",
                              loc: [29, 15, 29, 18],
                              text: "row",
                              bindingKey: "row$2rpyn3ijclm5s$5",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [30, 15, 32, 20],
                          type: {
                            kind: "string",
                            loc: [30, 16, 30, 18],
                            text: "li",
                          },
                          attributes: [
                            {
                              name: "onclick",
                              initializer: {
                                kind: "=>",
                                loc: [30, 28, 30, 60],
                                parameters: [],
                                body: {
                                  kind: "()",
                                  loc: [30, 34, 30, 60],
                                  expression: {
                                    kind: ".",
                                    loc: [30, 34, 30, 49],
                                    expression: {
                                      kind: ".",
                                      loc: [30, 34, 30, 43],
                                      expression: {
                                        kind: "id",
                                        loc: [30, 34, 30, 37],
                                        text: "row",
                                        bindingKey: "row$2rpyn3ijclm5s$5",
                                      },
                                      name: "label",
                                    },
                                    name: "write",
                                  },
                                  arguments: [
                                    {
                                      kind: "string",
                                      loc: [30, 50, 30, 59],
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
                              loc: [31, 18, 31, 34],
                              expression: {
                                kind: ".",
                                loc: [31, 18, 31, 32],
                                expression: {
                                  kind: ".",
                                  loc: [31, 18, 31, 27],
                                  expression: {
                                    kind: "id",
                                    loc: [31, 18, 31, 21],
                                    text: "row",
                                    bindingKey: "row$2rpyn3ijclm5s$5",
                                  },
                                  name: "label",
                                },
                                name: "read",
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
export default _jsx(Rows, {});
