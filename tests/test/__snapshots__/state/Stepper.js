import { cs, state } from "@backtickjs/core";
// A cell a script declares, read and written by what it draws. The script owns
// the storage, so the display and the handler are two readers of one binding
// and share one cell: `read()` is an input — a value that re-evaluates when the
// cell changes — and `write` is an effect, which only an action can perform.
async function Stepper() {
  return cs.create(
    [8, 10, 20, 5],
    {
      version: "0.0.0",
      filePath: "Stepper.tsx",
      fileHash: "debbcznmi4k7",
      splices: { $state: { value: state, params: [] } },
      captures: [],
    },
    () => ({
      kind: "{}",
      loc: [8, 13, 20, 4],
      statements: [
        {
          kind: "const",
          loc: [9, 5, 9, 29],
          name: {
            kind: "id",
            loc: [9, 11, 9, 15],
            text: "size",
            bindingKey: "size$debbcznmi4k7$0",
          },
          initializer: {
            kind: "()",
            loc: [9, 18, 9, 28],
            expression: {
              kind: "splice",
              loc: [9, 18, 9, 24],
              key: "$state",
            },
            arguments: [
              {
                kind: "number",
                loc: [9, 25, 9, 27],
                value: 16,
              },
            ],
          },
        },
        {
          kind: "return",
          loc: [10, 5, 19, 7],
          expression: {
            kind: "jsx",
            loc: [11, 7, 18, 14],
            type: {
              kind: "string",
              loc: [11, 8, 11, 12],
              text: "span",
            },
            attributes: [
              {
                name: "style",
                initializer: {
                  kind: "binop",
                  loc: [12, 16, 12, 50],
                  left: {
                    kind: "binop",
                    loc: [12, 16, 12, 43],
                    left: {
                      kind: "string",
                      loc: [12, 16, 12, 29],
                      text: "font-size: ",
                    },
                    operatorToken: "+",
                    right: {
                      kind: "()",
                      loc: [12, 32, 12, 43],
                      expression: {
                        kind: ".",
                        loc: [12, 32, 12, 41],
                        expression: {
                          kind: "id",
                          loc: [12, 32, 12, 36],
                          text: "size",
                          bindingKey: "size$debbcznmi4k7$0",
                        },
                        name: "read",
                      },
                      arguments: [],
                    },
                  },
                  operatorToken: "+",
                  right: {
                    kind: "string",
                    loc: [12, 46, 12, 50],
                    text: "px",
                  },
                },
              },
              {
                name: "onclick",
                initializer: {
                  kind: "=>",
                  loc: [13, 18, 15, 10],
                  parameters: [],
                  body: {
                    kind: "{}",
                    loc: [13, 24, 15, 10],
                    statements: [
                      {
                        kind: "()",
                        loc: [14, 11, 14, 38],
                        expression: {
                          kind: ".",
                          loc: [14, 11, 14, 21],
                          expression: {
                            kind: "id",
                            loc: [14, 11, 14, 15],
                            text: "size",
                            bindingKey: "size$debbcznmi4k7$0",
                          },
                          name: "write",
                        },
                        arguments: [
                          {
                            kind: "binop",
                            loc: [14, 22, 14, 37],
                            left: {
                              kind: "()",
                              loc: [14, 22, 14, 33],
                              expression: {
                                kind: ".",
                                loc: [14, 22, 14, 31],
                                expression: {
                                  kind: "id",
                                  loc: [14, 22, 14, 26],
                                  text: "size",
                                  bindingKey: "size$debbcznmi4k7$0",
                                },
                                name: "read",
                              },
                              arguments: [],
                            },
                            operatorToken: "+",
                            right: {
                              kind: "number",
                              loc: [14, 36, 14, 37],
                              value: 1,
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
                loc: [17, 9, 18, 7],
                text: "press",
              },
            ],
          },
        },
      ],
    }),
  );
}
