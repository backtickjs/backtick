import { cs, For, state } from "@backtickjs/core";
// A list whose members carry storage of their own: `build` declares a cell per
// row, and the cell the list reads holds those cells along with the rows. A
// press writes into one row's cell, so only what read that cell runs again —
// the array is the array it was, and no other row moves.
//
// What a cell starts at is the other half of this: the initial is a call here,
// not data, which is what a cell declared where it is evaluated allows.
async function MemberRows() {
  return cs.create(
    [17, 10, 39, 5],
    {
      version: "0.0.0",
      filePath: "MemberRows.tsx",
      fileHash: "7lxwjo4b898n",
      splices: {
        $state: { value: state, params: [] },
        $For: { value: For, params: [] },
      },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [17, 13, 39, 4],
      statements: [
        {
          kind: "const",
          loc: [18, 5, 22, 7],
          name: {
            kind: "id",
            loc: [18, 11, 18, 16],
            text: "build",
            bindingKey: "build$7lxwjo4b898n$0",
          },
          initializer: {
            kind: "=>",
            loc: [18, 19, 22, 6],
            parameters: [
              {
                kind: "param",
                loc: [18, 20, 18, 32],
                name: {
                  kind: "id",
                  loc: [18, 20, 18, 24],
                  text: "from",
                  bindingKey: "from$7lxwjo4b898n$2",
                },
              },
            ],
            body: {
              kind: "{}",
              loc: [18, 37, 22, 6],
              statements: [
                {
                  kind: "return",
                  loc: [19, 7, 21, 10],
                  expression: {
                    kind: "()",
                    loc: [19, 14, 21, 9],
                    expression: {
                      kind: "bltn",
                      loc: [19, 14, 19, 24],
                      name: "Array.from",
                    },
                    arguments: [
                      {
                        kind: "obj",
                        loc: [19, 25, 19, 38],
                        properties: [
                          {
                            kind: ":",
                            loc: [19, 27, 19, 36],
                            name: "length",
                            initializer: {
                              kind: "number",
                              loc: [19, 35, 19, 36],
                              value: 3,
                            },
                          },
                        ],
                      },
                      {
                        kind: "=>",
                        loc: [19, 40, 21, 8],
                        parameters: [
                          {
                            kind: "param",
                            loc: [19, 41, 19, 42],
                            name: {
                              kind: "id",
                              loc: [19, 41, 19, 42],
                              text: "_",
                              bindingKey: "_$7lxwjo4b898n$3",
                            },
                          },
                          {
                            kind: "param",
                            loc: [19, 44, 19, 46],
                            name: {
                              kind: "id",
                              loc: [19, 44, 19, 46],
                              text: "at",
                              bindingKey: "at$7lxwjo4b898n$4",
                            },
                          },
                        ],
                        body: {
                          kind: "{}",
                          loc: [19, 51, 21, 8],
                          statements: [
                            {
                              kind: "return",
                              loc: [20, 9, 20, 71],
                              expression: {
                                kind: "obj",
                                loc: [20, 16, 20, 70],
                                properties: [
                                  {
                                    kind: ":",
                                    loc: [20, 18, 20, 31],
                                    name: "id",
                                    initializer: {
                                      kind: "binop",
                                      loc: [20, 22, 20, 31],
                                      left: {
                                        kind: "id",
                                        loc: [20, 22, 20, 26],
                                        text: "from",
                                        bindingKey: "from$7lxwjo4b898n$2",
                                      },
                                      operatorToken: "+",
                                      right: {
                                        kind: "id",
                                        loc: [20, 29, 20, 31],
                                        text: "at",
                                        bindingKey: "at$7lxwjo4b898n$4",
                                      },
                                    },
                                  },
                                  {
                                    kind: ":",
                                    loc: [20, 33, 20, 68],
                                    name: "label",
                                    initializer: {
                                      kind: "()",
                                      loc: [20, 40, 20, 68],
                                      expression: {
                                        kind: "splice",
                                        loc: [20, 40, 20, 46],
                                        key: "$state",
                                      },
                                      arguments: [
                                        {
                                          kind: "binop",
                                          loc: [20, 47, 20, 67],
                                          left: {
                                            kind: "string",
                                            loc: [20, 47, 20, 53],
                                            text: "row ",
                                          },
                                          operatorToken: "+",
                                          right: {
                                            kind: "binop",
                                            loc: [20, 57, 20, 66],
                                            left: {
                                              kind: "id",
                                              loc: [20, 57, 20, 61],
                                              text: "from",
                                              bindingKey: "from$7lxwjo4b898n$2",
                                            },
                                            operatorToken: "+",
                                            right: {
                                              kind: "id",
                                              loc: [20, 64, 20, 66],
                                              text: "at",
                                              bindingKey: "at$7lxwjo4b898n$4",
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
          loc: [24, 5, 24, 35],
          name: {
            kind: "id",
            loc: [24, 11, 24, 15],
            text: "held",
            bindingKey: "held$7lxwjo4b898n$1",
          },
          initializer: {
            kind: "()",
            loc: [24, 18, 24, 34],
            expression: {
              kind: "splice",
              loc: [24, 18, 24, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "()",
                loc: [24, 25, 24, 33],
                expression: {
                  kind: "id",
                  loc: [24, 25, 24, 30],
                  text: "build",
                  bindingKey: "build$7lxwjo4b898n$0",
                },
                arguments: [
                  {
                    kind: "number",
                    loc: [24, 31, 24, 32],
                    value: 1,
                  },
                ],
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [26, 5, 38, 7],
          expression: {
            kind: "jsx",
            loc: [27, 7, 37, 13],
            type: {
              kind: "string",
              loc: [27, 8, 27, 11],
              text: "div",
            },
            attributes: [],
            children: [
              {
                kind: "jsx",
                loc: [28, 9, 36, 14],
                type: {
                  kind: "string",
                  loc: [28, 10, 28, 12],
                  text: "ul",
                },
                attributes: [
                  {
                    name: "class",
                    initializer: {
                      kind: "string",
                      loc: [28, 19, 28, 25],
                      text: "rows",
                    },
                  },
                ],
                children: [
                  {
                    kind: "jsx",
                    loc: [29, 11, 35, 17],
                    type: {
                      kind: "splice",
                      loc: [29, 12, 29, 15],
                      key: "$For",
                    },
                    attributes: [
                      {
                        name: "each",
                        initializer: {
                          kind: "()",
                          loc: [29, 22, 29, 33],
                          expression: {
                            kind: ".",
                            loc: [29, 22, 29, 31],
                            expression: {
                              kind: "id",
                              loc: [29, 22, 29, 26],
                              text: "held",
                              bindingKey: "held$7lxwjo4b898n$1",
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
                        loc: [30, 14, 34, 14],
                        parameters: [
                          {
                            kind: "param",
                            loc: [30, 15, 30, 23],
                            name: {
                              kind: "id",
                              loc: [30, 15, 30, 18],
                              text: "row",
                              bindingKey: "row$7lxwjo4b898n$5",
                            },
                          },
                        ],
                        body: {
                          kind: "jsx",
                          loc: [31, 15, 33, 20],
                          type: {
                            kind: "string",
                            loc: [31, 16, 31, 18],
                            text: "li",
                          },
                          attributes: [
                            {
                              name: "onclick",
                              initializer: {
                                kind: "=>",
                                loc: [31, 28, 31, 60],
                                parameters: [],
                                body: {
                                  kind: "()",
                                  loc: [31, 34, 31, 60],
                                  expression: {
                                    kind: ".",
                                    loc: [31, 34, 31, 49],
                                    expression: {
                                      kind: ".",
                                      loc: [31, 34, 31, 43],
                                      expression: {
                                        kind: "id",
                                        loc: [31, 34, 31, 37],
                                        text: "row",
                                        bindingKey: "row$7lxwjo4b898n$5",
                                      },
                                      name: "label",
                                    },
                                    name: "write",
                                  },
                                  arguments: [
                                    {
                                      kind: "string",
                                      loc: [31, 50, 31, 59],
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
                              loc: [32, 18, 32, 34],
                              expression: {
                                kind: ".",
                                loc: [32, 18, 32, 32],
                                expression: {
                                  kind: ".",
                                  loc: [32, 18, 32, 27],
                                  expression: {
                                    kind: "id",
                                    loc: [32, 18, 32, 21],
                                    text: "row",
                                    bindingKey: "row$7lxwjo4b898n$5",
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
