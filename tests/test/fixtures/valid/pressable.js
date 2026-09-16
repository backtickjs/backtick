import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
import { cs, state } from "@backtickjs/core";
// `Pressable` is the row that responds as one thing: `View` lays children out
// and `Text` takes a press, and this takes both — so a checkbox and a label are
// one tap target while staying separately styled.
async function Row() {
  return cs.create(
    [7, 10, 19, 5],
    {
      version: "0.0.0",
      filePath: "pressable.tsx",
      fileHash: "atpxodpi731m",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [7, 13, 19, 4],
      statements: [
        {
          kind: "const",
          loc: [8, 5, 8, 29],
          name: {
            kind: "id",
            loc: [8, 11, 8, 16],
            text: "count",
            bindingKey: "count$atpxodpi731m$0",
          },
          initializer: {
            kind: "()",
            loc: [8, 19, 8, 28],
            expression: {
              kind: "splice",
              loc: [8, 19, 8, 25],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [8, 26, 8, 27],
                value: 0,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [9, 5, 18, 7],
          expression: {
            kind: "jsx",
            loc: [10, 7, 17, 16],
            type: {
              kind: "string",
              loc: [10, 8, 10, 14],
              text: "button",
            },
            attributes: [
              {
                name: "id",
                initializer: {
                  kind: "string",
                  loc: [11, 12, 11, 17],
                  text: "row",
                },
              },
              {
                name: "style",
                initializer: {
                  kind: "string",
                  loc: [12, 15, 12, 40],
                  text: "display: flex; gap: 8px",
                },
              },
              {
                name: "onclick",
                initializer: {
                  kind: "=>",
                  loc: [13, 18, 13, 53],
                  parameters: [],
                  body: {
                    kind: "()",
                    loc: [13, 24, 13, 53],
                    expression: {
                      kind: ".",
                      loc: [13, 24, 13, 35],
                      expression: {
                        kind: "id",
                        loc: [13, 24, 13, 29],
                        text: "count",
                        bindingKey: "count$atpxodpi731m$0",
                      },
                      name: "write",
                    },
                    arguments: [
                      {
                        kind: "binop",
                        loc: [13, 36, 13, 52],
                        left: {
                          kind: "()",
                          loc: [13, 36, 13, 48],
                          expression: {
                            kind: ".",
                            loc: [13, 36, 13, 46],
                            expression: {
                              kind: "id",
                              loc: [13, 36, 13, 41],
                              text: "count",
                              bindingKey: "count$atpxodpi731m$0",
                            },
                            name: "read",
                          },
                          arguments: [],
                        },
                        operatorToken: "+",
                        right: {
                          kind: "number",
                          loc: [13, 51, 13, 52],
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
                kind: "jsx",
                loc: [15, 9, 15, 77],
                type: {
                  kind: "string",
                  loc: [15, 10, 15, 14],
                  text: "span",
                },
                attributes: [
                  {
                    name: "style",
                    initializer: {
                      kind: "string",
                      loc: [15, 21, 15, 39],
                      text: "font-weight: 700",
                    },
                  },
                ],
                children: [
                  {
                    kind: "?:",
                    loc: [15, 41, 15, 69],
                    condition: {
                      kind: "binop",
                      loc: [15, 41, 15, 57],
                      left: {
                        kind: "()",
                        loc: [15, 41, 15, 53],
                        expression: {
                          kind: ".",
                          loc: [15, 41, 15, 51],
                          expression: {
                            kind: "id",
                            loc: [15, 41, 15, 46],
                            text: "count",
                            bindingKey: "count$atpxodpi731m$0",
                          },
                          name: "read",
                        },
                        arguments: [],
                      },
                      operatorToken: ">",
                      right: {
                        kind: "number",
                        loc: [15, 56, 15, 57],
                        value: 0,
                      },
                    },
                    whenTrue: {
                      kind: "string",
                      loc: [15, 60, 15, 63],
                      text: "\u2611",
                    },
                    whenFalse: {
                      kind: "string",
                      loc: [15, 66, 15, 69],
                      text: "\u2610",
                    },
                  },
                ],
              },
              {
                kind: "jsx",
                loc: [16, 9, 16, 60],
                type: {
                  kind: "string",
                  loc: [16, 10, 16, 14],
                  text: "span",
                },
                attributes: [],
                children: [
                  {
                    kind: "binop",
                    loc: [16, 16, 16, 52],
                    left: {
                      kind: "binop",
                      loc: [16, 16, 16, 41],
                      left: {
                        kind: "string",
                        loc: [16, 16, 16, 26],
                        text: "pressed ",
                      },
                      operatorToken: "+",
                      right: {
                        kind: "()",
                        loc: [16, 29, 16, 41],
                        expression: {
                          kind: ".",
                          loc: [16, 29, 16, 39],
                          expression: {
                            kind: "id",
                            loc: [16, 29, 16, 34],
                            text: "count",
                            bindingKey: "count$atpxodpi731m$0",
                          },
                          name: "read",
                        },
                        arguments: [],
                      },
                    },
                    operatorToken: "+",
                    right: {
                      kind: "string",
                      loc: [16, 44, 16, 52],
                      text: " times",
                    },
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
export default _jsx(Row, {});
